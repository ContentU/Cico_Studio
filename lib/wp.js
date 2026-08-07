// Livello di accesso a WordPress headless per il Custom Post Type
// "Portfolio", via REST API nativa + campi ACF esposti in REST (ACF 6+,
// "Show in REST API" abilitato su ogni campo del gruppo).
//
// Schema di riferimento: 09_WordPress-ACF/scheda-portfolio-acf.md
//
// PUNTI DA CONFERMARE LATO WORDPRESS (vedi anche README del progetto):
// 1. Il CPT "Portfolio" deve avere `show_in_rest = true` e un `rest_base`
//    (assumiamo qui "portfolio", cioè endpoint /wp-json/wp/v2/portfolio).
// 2. Ogni campo del field group ACF "Scheda Portfolio" deve avere
//    "Show in REST API" attivo, così compare dentro `post.acf.<nome_campo>`.
// 3. Le tassonomie condivise (macroarea, tipologia, servizio, progetto_tag)
//    devono avere `show_in_rest = true` per poter essere usate come filtro
//    query (es. /wp-json/wp/v2/portfolio?macroarea=<id>).
// 4. CORS: il dominio del frontend Next.js deve poter leggere le risposte
//    JSON da cms.cicostudio.it (header Access-Control-Allow-Origin). Se il
//    fetch avviene solo lato server (come in questo progetto, dentro
//    Server Components), CORS in realtà non è un vincolo — serve solo se in
//    futuro si aggiungono chiamate lato client.
//
// Se in fase di sviluppo si scopre che i nomi dei campi ACF configurati in
// WordPress sono diversi da quelli previsti nello schema, va aggiornato SOLO
// l'oggetto ACF_FIELDS qui sotto: il resto del progetto (componenti inclusi)
// lavora sulla forma di dato restituita da normalizePortfolio(), non sui
// nomi originali dei campi ACF.

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
  photoGallery: "photo_gallery",
  gallery: "gallery",
  portfolioCorrelati: "portfolio_correlati",
  articoliCorrelati: "articoli_correlati",
  ctaOverride: "cta_override",
};

// Wrapper minimo su fetch verso WordPress. Cache disattivata (no-store) sul
// lato Next.js: ogni richiesta va sempre a WordPress senza passare dalla Data
// Cache di Next.
//
// L'hosting di WordPress ha però una cache a livello di infrastruttura
// (nginx/proxy, non un plugin) che tiene in cache le risposte REST per
// stringa di query esatta e non si invalida quando il contenuto cambia. Per
// bypassarla aggiungiamo un parametro con il timestamp corrente a ogni
// richiesta: la query non è mai identica alla precedente, quindi quella
// cache non trova mai corrispondenza e i dati sono sempre freschi. Va
// rimosso (o sostituito con `next: { revalidate: <secondi> }`) quando quella
// cache lato hosting viene sistemata o esclusa per `/wp-json/*`.
async function wpFetch(path) {
  const separator = path.includes("?") ? "&" : "?";
  const res = await fetch(`${WP_API_BASE}${path}${separator}_=${Date.now()}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`WordPress API ha risposto ${res.status} su ${path}`);
  }
  return res.json();
}

// Le tassonomie ACF possono tornare in due formati diversi a seconda del
// "Return Format" impostato sul campo in WordPress:
// - "Term Object" (consigliato): { id, name, slug, ... }
// - "Term ID": solo il numero. In questo caso il nome non è nella risposta
//   del post e va richiesto separatamente all'endpoint della tassonomia
//   (es. /wp-json/wp/v2/macroarea/3) — resolveTermName se ne occupa, con
//   una cache in-memory per evitare richieste duplicate.
const termNameCache = new Map();

async function resolveTermName(taxonomy, id) {
  const cacheKey = `${taxonomy}:${id}`;
  if (termNameCache.has(cacheKey)) return termNameCache.get(cacheKey);
  try {
    const term = await wpFetch(`/${taxonomy}/${id}?_fields=name`);
    const name = term?.name || String(id);
    termNameCache.set(cacheKey, name);
    return name;
  } catch (err) {
    console.warn(
      `[wp] resolveTermName: impossibile risolvere il termine ${cacheKey} —`,
      err.message,
    );
    return String(id);
  }
}

async function termNames(terms, taxonomy) {
  if (!terms) return [];
  const arr = Array.isArray(terms) ? terms : [terms];
  return Promise.all(
    arr
      .filter((t) => t !== null && t !== undefined && t !== "")
      .map((t) =>
        typeof t === "object" ? t.name : resolveTermName(taxonomy, t),
      ),
  );
}

async function singleTermName(term, taxonomy) {
  if (!term) return null;
  if (Array.isArray(term)) term = term[0];
  if (!term) return null;
  return typeof term === "object" ? term.name : resolveTermName(taxonomy, term);
}

// Estrae gli URL delle immagini dal campo ACF "Gallery" nidificato dentro il
// group "photo_gallery". WordPress lo restituisce come array di array (un
// livello di nesting in più del previsto, probabile Repeater/Group con
// sotto-campo Gallery) e ogni immagine può avere forme diverse a seconda
// della configurazione del campo — proviamo tutte in ordine di preferenza.
function extractGalleryUrls(rawGallery) {
  if (!Array.isArray(rawGallery)) return [];
  const flat = rawGallery.flat(Infinity);
  return flat
    .map(
      (img) =>
        img?.full_image_url ||
        img?.media_details?.sizes?.large?.source_url ||
        img?.media_details?.sizes?.medium_large?.source_url ||
        img?.sizes?.large ||
        img?.url ||
        (typeof img === "string" ? img : null),
    )
    .filter(Boolean);
}

function singleTermId(term) {
  if (!term) return null;
  if (Array.isArray(term)) term = term[0];
  return typeof term === "object" ? (term.id ?? term.term_id) : term;
}

// Evitiamo `&_embed` per recuperare l'immagine in evidenza: sull'hosting WP
// una cache/proxy davanti alle REST API tiene in cache le risposte per
// stringa di query esatta, e la variante con `_embed` può restare "congelata"
// su una risposta vecchia anche quando i dati sono stati corretti in
// WordPress. Una richiesta separata su /media/{id} usa una query diversa,
// non soggetta allo stesso problema.
async function resolveFeaturedMediaUrl(post) {
  if (post._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
    return post._embedded["wp:featuredmedia"][0].source_url;
  }
  if (!post.featured_media) return null;
  try {
    const media = await wpFetch(`/media/${post.featured_media}`);
    return media?.source_url || null;
  } catch (err) {
    console.warn(
      `[wp] resolveFeaturedMediaUrl: impossibile recuperare la media ${post.featured_media} —`,
      err.message,
    );
    return null;
  }
}

// Converte la risposta grezza di WordPress (post + acf) nella forma "pulita"
// che usano i componenti React della pagina di dettaglio. Questa è l'UNICA
// funzione da toccare se in WordPress i nomi dei campi risultano diversi.
export async function normalizePortfolio(post) {
  const acf = post.acf || {};
  console.log(`[wp:debug] "${post.slug}" — acf grezzo da WordPress:`, acf);

  const [macroarea, tipologiaTerm, serviziRealizzati, tags, heroImage] =
    await Promise.all([
      singleTermName(acf[ACF_FIELDS.macroarea], "macroarea"),
      singleTermName(acf[ACF_FIELDS.tipologia], "tipologia"),
      termNames(acf[ACF_FIELDS.serviziRealizzati], "servizio"),
      termNames(acf[ACF_FIELDS.tags], "progetto_tag"),
      resolveFeaturedMediaUrl(post),
    ]);
  const result = {
    id: post.id,
    slug: post.slug,
    title: post.title?.rendered || post.title || "",
    heroImage,
    macroarea,
    macroareaId: singleTermId(acf[ACF_FIELDS.macroarea]),
    tipologia: acf[ACF_FIELDS.tipologiaPersonalizzata] || tipologiaTerm || null,
    localita: acf[ACF_FIELDS.localita] || null,
    cliente: acf[ACF_FIELDS.cliente] || null,
    serviziRealizzati,
    anno: acf[ACF_FIELDS.anno] || null,
    descrizioneBreve: acf[ACF_FIELDS.descrizioneBreve] || "",
    tags,
    gallery: extractGalleryUrls(
      acf[ACF_FIELDS.photoGallery]?.[ACF_FIELDS.gallery] ??
        acf[ACF_FIELDS.gallery],
    ),
    portfolioCorrelatiRaw: acf[ACF_FIELDS.portfolioCorrelati] || [],
    articoliCorrelatiRaw: acf[ACF_FIELDS.articoliCorrelati] || [],
    ctaOverride: acf[ACF_FIELDS.ctaOverride] || null,
  };

  console.log(
    `[wp:debug] "${post.slug}" — campi normalizzati per i componenti:`,
    {
      macroarea: result.macroarea,
      macroareaId: result.macroareaId,
      tipologia: result.tipologia,
      localita: result.localita,
      cliente: result.cliente,
      serviziRealizzati: result.serviziRealizzati,
      anno: result.anno,
      descrizioneBreve: result.descrizioneBreve
        ? `${result.descrizioneBreve.slice(0, 40)}…`
        : result.descrizioneBreve,
      tags: result.tags,
      galleryCount: result.gallery.length,
      heroImage: result.heroImage,
    },
  );

  return result;
}

// ---------------------------------------------------------------------
// Portfolio: lista slug (per generateStaticParams) + singolo progetto
// ---------------------------------------------------------------------

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
      `/portfolio?slug=${encodeURIComponent(slug)}`,
    );
    console.log(
      `[wp:debug] getPortfolioBySlug("${slug}"): WordPress ha risposto con ${posts.length} post`,
    );
    if (!posts.length) {
      console.log(
        `[wp:debug] getPortfolioBySlug("${slug}"): nessun post trovato su WP, uso mockPortfolioItems come fallback`,
      );
      return mockPortfolioItems.find((p) => p.slug === slug) || null;
    }
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
// altrimenti query automatica per Macroarea/Tag in comune.
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
        ids.map((id) => wpFetch(`/portfolio/${id}`)),
      );
      return Promise.all(posts.map(normalizePortfolio));
    }
    if (item.macroareaId) {
      const posts = await wpFetch(
        `/portfolio?macroarea=${item.macroareaId}&exclude=${item.id}&per_page=${limit}`,
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
        ids.map((id) => wpFetch(`/posts/${id}`)),
      );
      return Promise.all(
        posts.map(async (p) => ({
          slug: p.slug,
          title: p.title?.rendered || "",
          excerpt: p.excerpt?.rendered?.replace(/<[^>]+>/g, "") || "",
          cat:
            (await singleTermName(
              p.acf?.[ACF_FIELDS.macroarea],
              "macroarea",
            )) || "",
        })),
      );
    }
    // Fallback automatico per tag/progetto_tag in comune: richiede che i
    // Post di Blog condividano la tassonomia `progetto_tag` col Portfolio
    // (vedi nota nello schema ACF). Da adattare al reale rest_base della
    // tassonomia una volta registrata in WordPress.
    return [];
  } catch (err) {
    console.warn(
      "[wp] getRelatedBlog: WordPress non raggiungibile, uso i dati segnaposto —",
      err.message,
    );
    return blogItems.slice(0, limit);
  }
}
