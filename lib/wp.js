// Livello di accesso a WordPress headless per il Custom Post Type
// "Portfolio", via REST API nativa + campi ACF esposti in REST.
//
// Schema di riferimento: 09_WordPress-ACF/scheda-portfolio-acf.md
//
// Questo file è stato verificato contro l'installazione reale
// (https://cms.cicostudio.it, post "Hotel Tumminello", 16/09/2026):
// alcuni nomi/forme dei campi differiscono da quanto originariamente
// ipotizzato nello schema, e sono stati corretti qui di conseguenza:
//
// - Il campo Relationship per gli articoli correlati si chiama
//   `articolo_correlati` (singolare), non `articoli_correlati`.
// - La Gallery non è un campo ACF "Gallery" semplice: è dentro un Group
//   chiamato `photo_gallery` (`acf.photo_gallery.gallery`), con oggetti
//   immagine che hanno chiavi proprie (`full_image_url`,
//   `thumbnail_image_url`, `media_details.sizes...`) invece della forma
//   standard di un campo Image/Gallery ACF.
// - I campi tassonomia (`macroarea`, `tipologia`, `servizi_realizzati`,
//   `tags`) tornano ID numerici (singoli o array), non oggetti termine:
//   i nomi vanno risolti con una chiamata separata (vedi getTermName/
//   getTermNames qui sotto — non ci siamo affidati a `_embed` perché non
//   siamo riusciti a verificarne il comportamento in modo affidabile).
// - `cta_override` non risultava ancora creato in ACF al momento della
//   verifica: gestito come campo opzionale, nessun errore se assente.
// - `video_hero` (oEmbed, URL youtu.be/youtube.com) è confermato e
//   funzionante: vedi extractYouTubeId qui sotto.
//
// Se altri nomi di campo dovessero risultare diversi, va aggiornato SOLO
// l'oggetto ACF_FIELDS/TAXONOMY qui sotto: il resto del progetto lavora
// sulla forma "pulita" restituita da normalizePortfolio(), non sui nomi
// originali dei campi ACF.

import { mockPortfolioItems } from "./mockPortfolio";
import { blogItems } from "./content";

const WP_API_BASE = (
  process.env.WORDPRESS_API_URL || "https://cms.cicostudio.it/wp-json/wp/v2"
).replace(/\/$/, "");

const ACF_FIELDS = {
  macroarea: "macroarea",
  tipologia: "tipologia",
  tipologiaPersonalizzata: "tipologia_personalizzata",
  localita: "localita",
  cliente: "cliente",
  serviziRealizzati: "servizi_realizzati",
  anno: "anno",
  descrizioneBreve: "descrizione_breve",
  tags: "tags",
  portfolioCorrelati: "portfolio_correlati",
  articoliCorrelati: "articolo_correlati", // singolare, confermato su WP live
  ctaOverride: "cta_override", // non ancora creato in ACF al momento della verifica
  videoHero: "video_hero", // oEmbed, confermato su WP live
};

// Slug REST delle tassonomie (diversi, in alcuni casi, dal nome del campo
// ACF che le referenzia) — confermati dai link "acf:term" nella risposta API.
const TAXONOMY = {
  macroarea: "macroarea",
  tipologia: "tipologia",
  servizio: "servizio",
  progettoTag: "progetto_tag",
};

async function wpFetch(path, { revalidate = 3600 } = {}) {
  const res = await fetch(`${WP_API_BASE}${path}`, {
    next: { revalidate },
  });
  if (!res.ok) {
    throw new Error(`WordPress API ha risposto ${res.status} su ${path}`);
  }
  return res.json();
}

// Cache in memoria (a livello di processo) dei nomi termine già risolti, per
// evitare richieste ripetute per lo stesso ID nella stessa build/richiesta.
const termNameCache = new Map();

async function getTermName(taxonomy, id) {
  if (id === null || id === undefined || id === "") return null;
  const key = `${taxonomy}:${id}`;
  if (termNameCache.has(key)) return termNameCache.get(key);
  try {
    const term = await wpFetch(`/${taxonomy}/${id}`);
    const name = term?.name || null;
    termNameCache.set(key, name);
    return name;
  } catch {
    return null;
  }
}

async function getTermNames(taxonomy, ids) {
  if (!Array.isArray(ids) || !ids.length) return [];
  const names = await Promise.all(ids.map((id) => getTermName(taxonomy, id)));
  return names.filter(Boolean);
}

// La Gallery reale è annidata in acf.photo_gallery.gallery e, sull'istanza
// verificata, avvolta in un livello di array extra (una riga di repeater?).
// Gestiamo sia la forma annidata sia una eventuale forma flat futura.
function extractGalleryImages(acf) {
  const raw = acf?.photo_gallery?.gallery;
  if (!Array.isArray(raw) || !raw.length) return [];
  const flat = Array.isArray(raw[0]) ? raw.flat() : raw;
  return flat
    .filter(Boolean)
    .map((img) => {
      const full = img.full_image_url || img.url || null;
      const grid =
        img.media_details?.sizes?.medium_large?.source_url ||
        img.media_details?.sizes?.medium?.source_url ||
        full;
      return { full, grid, alt: img.alt_text || img.title || "" };
    })
    .filter((img) => img.full);
}

// Estrae l'ID YouTube da un URL youtu.be o youtube.com (con o senza
// parametri extra tipo ?si=...), così il componente Video può costruire
// l'embed 16:9 con markup proprio invece di affidarsi all'HTML che
// WordPress genererebbe per l'oEmbed.
function extractYouTubeId(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.split("/").filter(Boolean)[0] || null;
    }
    if (u.hostname.includes("youtube.com")) {
      if (u.pathname === "/watch") return u.searchParams.get("v");
      const parts = u.pathname.split("/").filter(Boolean);
      if (parts[0] === "embed" || parts[0] === "shorts") return parts[1] || null;
    }
    return null;
  } catch {
    return null;
  }
}

async function resolveFeaturedImage(post) {
  const embedded = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  if (embedded) return embedded;
  if (!post.featured_media) return null;
  try {
    const media = await wpFetch(`/media/${post.featured_media}`);
    return media?.source_url || media?.media_details?.sizes?.large?.source_url || null;
  } catch {
    return null;
  }
}

// Converte la risposta grezza di WordPress (post + acf) nella forma "pulita"
// che usano i componenti React della pagina di dettaglio. Asincrona perché
// deve risolvere i nomi delle tassonomie con chiamate separate.
export async function normalizePortfolio(post) {
  const acf = post.acf || {};

  const [macroarea, tipologia, serviziRealizzati, tags, heroImage] = await Promise.all([
    getTermName(TAXONOMY.macroarea, acf[ACF_FIELDS.macroarea]),
    getTermName(TAXONOMY.tipologia, acf[ACF_FIELDS.tipologia]),
    getTermNames(TAXONOMY.servizio, acf[ACF_FIELDS.serviziRealizzati]),
    getTermNames(TAXONOMY.progettoTag, acf[ACF_FIELDS.tags]),
    resolveFeaturedImage(post),
  ]);

  return {
    id: post.id,
    slug: post.slug,
    title: decodeEntities(post.title?.rendered || post.title || ""),
    heroImage,
    macroarea,
    macroareaId: acf[ACF_FIELDS.macroarea] || null,
    tipologia: acf[ACF_FIELDS.tipologiaPersonalizzata] || tipologia || null,
    localita: acf[ACF_FIELDS.localita] || null,
    cliente: acf[ACF_FIELDS.cliente] || null,
    serviziRealizzati,
    anno: acf[ACF_FIELDS.anno] || null,
    descrizioneBreve: acf[ACF_FIELDS.descrizioneBreve] || "",
    tags,
    gallery: extractGalleryImages(acf),
    videoHeroId: extractYouTubeId(acf[ACF_FIELDS.videoHero]),
    portfolioCorrelatiRaw: Array.isArray(acf[ACF_FIELDS.portfolioCorrelati])
      ? acf[ACF_FIELDS.portfolioCorrelati]
      : [],
    articoliCorrelatiRaw: Array.isArray(acf[ACF_FIELDS.articoliCorrelati])
      ? acf[ACF_FIELDS.articoliCorrelati]
      : [],
    ctaOverride: acf[ACF_FIELDS.ctaOverride] || null,
  };
}

// ---------------------------------------------------------------------
// Portfolio: elenco completo (pagina indice), lista slug (per
// generateStaticParams) + singolo progetto
// ---------------------------------------------------------------------

// Elenco completo dei progetti Portfolio, normalizzati, per la pagina
// indice /portfolio (griglia + filtri per Tipologia/Servizio/Tag).
export async function getAllPortfolio() {
  try {
    const posts = await wpFetch(`/portfolio?per_page=100&_embed`);
    return Promise.all(posts.map(normalizePortfolio));
  } catch (err) {
    console.warn(
      "[wp] getAllPortfolio: WordPress non raggiungibile, uso i dati segnaposto —",
      err.message
    );
    return mockPortfolioItems;
  }
}

export async function getAllPortfolioSlugs() {
  try {
    const posts = await wpFetch(`/portfolio?per_page=100&_fields=slug`);
    return posts.map((p) => p.slug);
  } catch (err) {
    console.warn(
      "[wp] getAllPortfolioSlugs: WordPress non raggiungibile, uso i dati segnaposto —",
      err.message
    );
    return mockPortfolioItems.map((p) => p.slug);
  }
}

export async function getPortfolioBySlug(slug) {
  try {
    const posts = await wpFetch(`/portfolio?slug=${encodeURIComponent(slug)}&_embed`);
    if (!posts.length) return null;
    return await normalizePortfolio(posts[0]);
  } catch (err) {
    console.warn(
      `[wp] getPortfolioBySlug("${slug}"): WordPress non raggiungibile, uso i dati segnaposto —`,
      err.message
    );
    return mockPortfolioItems.find((p) => p.slug === slug) || null;
  }
}

// ---------------------------------------------------------------------
// Correlati: prima l'eventuale override manuale (campo Relationship),
// altrimenti query automatica per Macroarea in comune.
// ---------------------------------------------------------------------

export async function getRelatedPortfolio(item, limit = 3) {
  try {
    if (Array.isArray(item.portfolioCorrelatiRaw) && item.portfolioCorrelatiRaw.length) {
      const ids = item.portfolioCorrelatiRaw
        .map((p) => (typeof p === "object" ? p.ID ?? p.id : p))
        .slice(0, limit);
      const posts = await Promise.all(ids.map((id) => wpFetch(`/portfolio/${id}?_embed`)));
      return Promise.all(posts.map(normalizePortfolio));
    }
    if (item.macroareaId) {
      const posts = await wpFetch(
        `/portfolio?macroarea=${item.macroareaId}&exclude=${item.id}&per_page=${limit}&_embed`
      );
      return Promise.all(posts.map(normalizePortfolio));
    }
    return [];
  } catch (err) {
    console.warn(
      "[wp] getRelatedPortfolio: WordPress non raggiungibile, uso i dati segnaposto —",
      err.message
    );
    return mockPortfolioItems.filter((p) => p.slug !== item.slug).slice(0, limit);
  }
}

// ---------------------------------------------------------------------
// Selezione automatica per le pagine di servizio (Hotel/Host/B&B): non
// legata a UN progetto corrente come getRelatedPortfolio, ma a una coppia
// Macroarea + Servizio (es. "Progetti fotografici per hotel" nella pagina
// /hotel => Macroarea=Hotel, Servizio=Fotografia). Filtra lato JS su
// getAllPortfolio() invece di usare query taxonomy dirette: il CPT
// "portfolio" ha `servizio` come tassonomia condivisa ma non è detto sia
// registrata come query var filtrabile via REST, mentre filtrare sui nomi
// già risolti da normalizePortfolio() funziona sempre, a costo di una
// chiamata leggermente più pesante (accettabile per una lista di poche
// decine di progetti).
export async function getPortfolioByFilter({ area, macroarea, servizio } = {}, limit = 4) {
  // `area` (pagine di servizio): termine confrontato, senza distinzione di
  // maiuscole, con la Macroarea O con la Tipologia del progetto (es. "Hotel",
  // "B&B", "Ville"). `macroarea` resta supportato per compatibilità.
  const norm = (v) => (v || "").toString().trim().toLowerCase();
  const all = await getAllPortfolio();
  return all
    .filter((p) =>
      area ? [p.macroarea, p.tipologia].map(norm).includes(norm(area)) : true
    )
    .filter((p) => (macroarea ? p.macroarea === macroarea : true))
    .filter((p) =>
      servizio ? (p.serviziRealizzati || []).map(norm).includes(norm(servizio)) : true
    )
    .slice(0, limit);
}

export async function getRelatedBlog(item, limit = 2) {
  try {
    if (Array.isArray(item.articoliCorrelatiRaw) && item.articoliCorrelatiRaw.length) {
      const ids = item.articoliCorrelatiRaw
        .map((p) => (typeof p === "object" ? p.ID ?? p.id : p))
        .slice(0, limit);
      const posts = await Promise.all(ids.map((id) => wpFetch(`/posts/${id}?_embed`)));
      return Promise.all(posts.map(normalizePost));
    }
    // Automatico: articoli della stessa Macroarea del progetto.
    if (item.macroarea) return getBlogByCategory(item.macroarea, limit);
    return [];
  } catch (err) {
    console.warn(
      "[wp] getRelatedBlog: WordPress non raggiungibile, uso i dati segnaposto —",
      err.message
    );
    return blogItems.slice(0, limit);
  }
}

// ---------------------------------------------------------------------
// Blog: gli articoli sono i "Post" nativi di WordPress (rest_base "posts",
// verificato su cms.cicostudio.it). Hanno le tassonomie condivise
// (macroarea, tipologia, servizio, progetto_tag) come array di ID direttamente
// sul post (non dentro acf). L'immagine di copertina è la Featured Image
// nativa (`featured_media`), da risolvere con /media/{id}: se vale 0 l'articolo
// non ha immagine in evidenza.
// ---------------------------------------------------------------------

function decodeEntities(str = "") {
  return str
    .replace(/<[^>]+>/g, "")
    .replace(/&hellip;/g, "…")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&#8216;|&lsquo;/g, "‘")
    .replace(/&#8220;|&ldquo;/g, "“")
    .replace(/&#8221;|&rdquo;/g, "”")
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/&#8230;/g, "…")
    .replace(/&amp;/g, "&")
    .replace(/\[…\]|\[&hellip;\]/g, "…")
    .trim();
}

async function normalizePost(post) {
  const [cat, image] = await Promise.all([
    getTermName(TAXONOMY.macroarea, Array.isArray(post.macroarea) ? post.macroarea[0] : null),
    resolveFeaturedImage(post),
  ]);
  return {
    id: post.id,
    slug: post.slug,
    title: decodeEntities(post.title?.rendered || ""),
    excerpt: decodeEntities(post.excerpt?.rendered || ""),
    cat: cat || "",
    image,
    date: post.date || null,
    tagIds: Array.isArray(post.progetto_tag) ? post.progetto_tag : [],
  };
}

// Ultimi articoli (home page).
export async function getLatestPosts(limit = 3) {
  try {
    const posts = await wpFetch(`/posts?per_page=${limit}&_embed`);
    return Promise.all(posts.map(normalizePost));
  } catch (err) {
    console.warn(
      "[wp] getLatestPosts: WordPress non raggiungibile, uso i dati segnaposto —",
      err.message
    );
    return blogItems.slice(0, limit);
  }
}

// Selezione automatica del blog per le pagine di servizio (non legata a un
// progetto Portfolio specifico, ma a una Macroarea, es. "Hotel").
export async function getBlogByCategory(cat, limit = 3) {
  try {
    const posts = await Promise.all(
      (await wpFetch(`/posts?per_page=50&_embed`)).map(normalizePost)
    );
    const filtered = posts.filter((p) => p.cat === cat);
    return filtered.slice(0, limit);
  } catch (err) {
    console.warn(
      `[wp] getBlogByCategory("${cat}"): WordPress non raggiungibile, uso i dati segnaposto —`,
      err.message
    );
    const filtered = blogItems.filter((p) => p.cat === cat);
    return (filtered.length ? filtered : blogItems).slice(0, limit);
  }
}

// ---------------------------------------------------------------------
// Blog: indice completo, singolo articolo, correlati
// ---------------------------------------------------------------------

// Dati segnaposto per sviluppare senza WordPress (stessa forma di
// normalizePost + `content`).
const mockPosts = blogItems.map((b, i) => ({
  id: 9000 + i,
  slug: b.slug,
  title: b.title,
  excerpt: b.excerpt,
  cat: b.cat,
  image: null,
  date: `2026-0${9 - i}-1${i + 1}T10:00:00`,
  tagIds: [],
  content: `<p>${b.excerpt}</p><p>Contenuto segnaposto: l'articolo reale arriva da WordPress.</p>`,
}));

// Tutti gli articoli (indice /blog), dal più recente. L'infinite scroll è
// lato client sui dati già caricati: con centinaia di articoli conviene
// passare alla paginazione REST (`page=` + header X-WP-TotalPages).
export async function getAllPosts(limit = 100) {
  try {
    const posts = await wpFetch(`/posts?per_page=${limit}&orderby=date&order=desc&_embed`);
    return Promise.all(posts.map(normalizePost));
  } catch (err) {
    console.warn(
      "[wp] getAllPosts: WordPress non raggiungibile, uso i dati segnaposto —",
      err.message
    );
    return mockPosts;
  }
}

export async function getAllPostSlugs() {
  try {
    const posts = await wpFetch(`/posts?per_page=100&_fields=slug`);
    return posts.map((p) => p.slug);
  } catch (err) {
    console.warn("[wp] getAllPostSlugs: WordPress non raggiungibile —", err.message);
    return mockPosts.map((p) => p.slug);
  }
}

// Pulizia del corpo dell'articolo (content.rendered di WordPress), fatta
// lato server. Il resto del contenuto resta invariato ("come da inserimento
// WordPress"):
// 1) rimuove i paragrafi vuoti
// 2) rimuove i segnaposto CTA tra parentesi quadre (es. "[VALUTIAMO IL
//    PERIODO GIUSTO]"): la CTA è già nel blocco in fondo all'articolo
// 3) se la PRIMA immagine del testo è la stessa dell'immagine in evidenza,
//    non la ripete (confronto sul nome file senza suffisso -1024x683)
// 4) riscrive sul dominio del sito i link interni che puntano al CMS
export function cleanArticleHtml(html = "", heroSrc = "") {
  let out = html;
  out = out.replace(/<p>\s*(?:&nbsp;|\u00a0)?\s*<\/p>/gi, "");
  out = out.replace(/<p>\s*(?:<strong>)?\s*\[[^\]<]{2,80}\]\s*(?:<\/strong>)?\s*<\/p>/gi, "");
  const base = (u) => (u || "").split("/").pop().split("?")[0].replace(/-\d+x\d+(?=\.\w+$)/, "");
  const first = out.match(/^\s*<figure[\s\S]*?<\/figure>/i);
  if (first && heroSrc) {
    const src = first[0].match(/<img[^>]*\ssrc="([^"]+)"/i)?.[1];
    if (src && base(src) === base(heroSrc)) out = out.replace(first[0], "");
  }
  out = out.replace(/href="https?:\/\/cms\.cicostudio\.it(\/[^"]*)"/gi, 'href="$1"');
  return out.trim();
}

export function readingMinutes(html = "") {
  const words = html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export async function getPostBySlug(slug) {
  try {
    const list = await wpFetch(`/posts?slug=${encodeURIComponent(slug)}&_embed`);
    const post = list[0];
    if (!post) return null;
    const base = await normalizePost(post);
    const html = post.content?.rendered || "";
    const content = cleanArticleHtml(html, base.image);
    return { ...base, content, minutes: readingMinutes(content) };
  } catch (err) {
    console.warn(
      `[wp] getPostBySlug("${slug}"): WordPress non raggiungibile, uso i dati segnaposto —`,
      err.message
    );
    const m = mockPosts.find((p) => p.slug === slug);
    return m ? { ...m, minutes: readingMinutes(m.content) } : null;
  }
}

// Articoli correlati: prima quelli con più tag (`progetto_tag`) in comune,
// poi quelli della stessa categoria (Macroarea), esclusi l'articolo corrente.
export async function getRelatedPosts(post, limit = 3) {
  const all = await getAllPosts();
  const others = all.filter((p) => p.slug !== post.slug);
  const score = (p) =>
    (p.tagIds || []).filter((t) => (post.tagIds || []).includes(t)).length * 10 +
    (p.cat && p.cat === post.cat ? 1 : 0);
  return others
    .map((p) => ({ p, s: score(p) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((x) => x.p)
    .concat(others)
    .filter((p, i, arr) => arr.findIndex((q) => q.slug === p.slug) === i)
    .slice(0, limit);
}
