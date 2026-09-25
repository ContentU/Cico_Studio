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

async function wpFetch(path, { revalidate = 60 } = {}) {
  // L'hosting di cms.cicostudio.it mette un reverse-proxy cache davanti alle
  // REST API: chiamando due volte lo stesso URL si può ricevere una risposta
  // vecchia (es. un progetto appena pubblicato mancante), anche con
  // revalidate basso qui in Next.js — verificato in modo riproducibile su
  // /portfolio. Aggiungiamo un cache-buster che cambia una volta ogni
  // `revalidate` secondi: stesso URL (quindi stessa cache Next.js) dentro la
  // stessa finestra, URL diverso (quindi bypass del proxy cache WP) alla
  // finestra successiva.
  const cacheBuster = Math.floor(Date.now() / (revalidate * 1000));
  const sep = path.includes("?") ? "&" : "?";
  const res = await fetch(`${WP_API_BASE}${path}${sep}_cb=${cacheBuster}`, {
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
      if (parts[0] === "embed" || parts[0] === "shorts")
        return parts[1] || null;
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
    return (
      media?.source_url ||
      media?.media_details?.sizes?.large?.source_url ||
      null
    );
  } catch {
    return null;
  }
}

// Converte la risposta grezza di WordPress (post + acf) nella forma "pulita"
// che usano i componenti React della pagina di dettaglio. Asincrona perché
// deve risolvere i nomi delle tassonomie con chiamate separate.
export async function normalizePortfolio(post) {
  const acf = post.acf || {};

  const [macroarea, tipologia, serviziRealizzati, tags, heroImage] =
    await Promise.all([
      getTermName(TAXONOMY.macroarea, acf[ACF_FIELDS.macroarea]),
      getTermName(TAXONOMY.tipologia, acf[ACF_FIELDS.tipologia]),
      getTermNames(TAXONOMY.servizio, acf[ACF_FIELDS.serviziRealizzati]),
      getTermNames(TAXONOMY.progettoTag, acf[ACF_FIELDS.tags]),
      resolveFeaturedImage(post),
    ]);

  return {
    id: post.id,
    slug: post.slug,
    title: post.title?.rendered || post.title || "",
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
    // Niente _embed qui: su cms.cicostudio.it, richiedere _embed sull'intero
    // elenco (5+ post insieme) fa sparire silenziosamente uno o più post
    // dalla risposta (bug/limite lato WP, riprodotto in modo consistente —
    // lo stesso post richiesto singolarmente con _embed funziona). Senza
    // _embed, resolveFeaturedImage() sopra ricade sulla chiamata dedicata a
    // /media/{id} per ogni post, che funziona correttamente.
    const posts = await wpFetch(`/portfolio?per_page=100`);
    return Promise.all(posts.map(normalizePortfolio));
  } catch (err) {
    console.warn(
      "[wp] getAllPortfolio: WordPress non raggiungibile, uso i dati segnaposto —",
      err.message,
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
      err.message,
    );
    return mockPortfolioItems.map((p) => p.slug);
  }
}

export async function getPortfolioBySlug(slug) {
  try {
    const posts = await wpFetch(
      `/portfolio?slug=${encodeURIComponent(slug)}&_embed`,
    );
    if (!posts.length) return null;
    return await normalizePortfolio(posts[0]);
  } catch (err) {
    console.warn(
      `[wp] getPortfolioBySlug("${slug}"): WordPress non raggiungibile, uso i dati segnaposto —`,
      err.message,
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
    if (
      Array.isArray(item.portfolioCorrelatiRaw) &&
      item.portfolioCorrelatiRaw.length
    ) {
      const ids = item.portfolioCorrelatiRaw
        .map((p) => (typeof p === "object" ? (p.ID ?? p.id) : p))
        .slice(0, limit);
      const posts = await Promise.all(
        ids.map((id) => wpFetch(`/portfolio/${id}?_embed`)),
      );
      return Promise.all(posts.map(normalizePortfolio));
    }
    if (item.macroareaId) {
      const posts = await wpFetch(
        `/portfolio?macroarea=${item.macroareaId}&exclude=${item.id}&per_page=${limit}&_embed`,
      );
      return Promise.all(posts.map(normalizePortfolio));
    }
    return [];
  } catch (err) {
    console.warn(
      "[wp] getRelatedPortfolio: WordPress non raggiungibile, uso i dati segnaposto —",
      err.message,
    );
    return mockPortfolioItems
      .filter((p) => p.slug !== item.slug)
      .slice(0, limit);
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
export async function getPortfolioByFilter(
  { macroarea, servizio } = {},
  limit = 4,
) {
  const all = await getAllPortfolio();
  return all
    .filter((p) => (macroarea ? p.macroarea === macroarea : true))
    .filter((p) =>
      servizio ? (p.serviziRealizzati || []).includes(servizio) : true,
    )
    .slice(0, limit);
}

export async function getRelatedBlog(item, limit = 2) {
  try {
    if (
      Array.isArray(item.articoliCorrelatiRaw) &&
      item.articoliCorrelatiRaw.length
    ) {
      const ids = item.articoliCorrelatiRaw
        .map((p) => (typeof p === "object" ? (p.ID ?? p.id) : p))
        .slice(0, limit);
      const posts = await Promise.all(
        ids.map((id) => wpFetch(`/posts/${id}?_embed`)),
      );
      return Promise.all(
        posts.map(async (p) => ({
          slug: p.slug,
          title: p.title?.rendered || "",
          excerpt: p.excerpt?.rendered?.replace(/<[^>]+>/g, "") || "",
          cat:
            (await getTermName(
              TAXONOMY.macroarea,
              p.acf?.[ACF_FIELDS.macroarea],
            )) || "",
        })),
      );
    }
    // Fallback automatico per tag/progetto_tag in comune: richiede che i
    // Post di Blog condividano la tassonomia progetto_tag col Portfolio.
    // TODO: implementare quando saranno definiti i primi articoli Blog reali.
    return [];
  } catch (err) {
    console.warn(
      "[wp] getRelatedBlog: WordPress non raggiungibile, uso i dati segnaposto —",
      err.message,
    );
    return blogItems.slice(0, limit);
  }
}

// Selezione automatica del blog per le pagine di servizio (non legata a un
// progetto Portfolio specifico, ma a una categoria, es. "Hotel"). Come
// getRelatedBlog, il CPT/rest_base reale del Blog non è ancora noto: qui è
// un TODO esplicito, con fallback ai dati segnaposto di lib/content.js
// filtrati per categoria nel frattempo.
export async function getBlogByCategory(cat, limit = 3) {
  try {
    // TODO: sostituire con una query reale (es. /wp-json/wp/v2/posts?categories=...
    // o una tassonomia dedicata) una volta noto il CPT/rest_base del Blog.
    throw new Error("Blog headless non ancora collegato");
  } catch (err) {
    console.warn(
      `[wp] getBlogByCategory("${cat}"): WordPress non raggiungibile, uso i dati segnaposto —`,
      err.message,
    );
    const filtered = blogItems.filter((p) => p.cat === cat);
    return (filtered.length ? filtered : blogItems).slice(0, limit);
  }
}
