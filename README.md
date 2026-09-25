# CICO — Next.js

Home page + pagina di dettaglio Portfolio, a partire dal prototipo statico
approvato dal cliente. Stessa struttura, stesse animazioni. Testi e foto
sono ancora segnaposto in attesa dei contenuti definitivi; la pagina
Portfolio è già collegata a WordPress headless (vedi sotto), con fallback
automatico ai dati segnaposto se il CMS non risponde.

## Come avviarlo

```bash
npm install
npm run dev
```

Poi apri http://localhost:3000 (home) e http://localhost:3000/portfolio/villa-igiea-wellness
(esempio di pagina di dettaglio, funziona anche senza WordPress collegato
grazie ai dati segnaposto).

## Cosa c'è dentro

- `app/page.js` — Home (App Router)
- `app/portfolio/page.js` — pagina indice Portfolio: tutti i progetti, con
  filtro per Tipologia/Servizio/Tag (`components/portfolio/PortfolioFilterGrid.js`)
- `app/portfolio/[slug]/page.js` — pagina di dettaglio Portfolio, dinamica
  per slug
- `app/hotel/page.js` — pagina di servizio "Hotel", prima delle pagine
  Hotel/Host/B&B (stessa struttura, testi diversi — vedi sotto)
- `components/` — un componente per ogni sezione della Home (Header, Hero,
  Portfolio, Servizi, Come lavoriamo, Blog, Footer) più
  `ClientInteractions.js`, che contiene tutta la logica di scroll/animazione
  portata dal prototipo (riusata anche nelle pagine interne: si disattiva da
  sola per gli elementi che non trova, es. il testo scroll-reveal della Home)
- `components/portfolio/` — componenti specifici della pagina di dettaglio
  Portfolio (Hero, Titolo+breadcrumb, Scheda tecnica, Gallery con lightbox,
  Video hero, Portfolio correlati, Blog correlati)
- `components/service/` — componenti riusabili delle pagine di servizio
  (ServiceHero, Accordion, StepsSection, Showcase, WhySection, BlogSection,
  ServiceCTA) — pensati per essere riusati identici da /host e /bb
- `lib/content.js` — testi e dati della Home (portfolio, blog, servizi)
- `lib/serviziContent.js` — testi delle pagine di servizio (oggi solo
  `hotelPage`, presi dal documento del cliente; stessa forma prevista per
  `hostPage`/`bbPage` quando arriveranno i rispettivi testi)
- `lib/wp.js` — livello di accesso a WordPress headless per il Portfolio
  (vedi sotto)
- `lib/mockPortfolio.js` — dati segnaposto nella stessa forma dei dati reali,
  usati per sviluppare senza WordPress e come fallback se il CMS non risponde
- `public/fonts/` — Apfel Grotezk in locale; TT Travel Next arriva dal link
  Typekit già inserito in `app/layout.js`

## Collegamento a WordPress headless (Portfolio)

La pagina `/portfolio/[slug]` legge i dati da WordPress tramite REST API
nativa + campi ACF esposti in REST, in `lib/wp.js`. Schema di riferimento:
`09_WordPress-ACF/scheda-portfolio-acf.md`.

`lib/wp.js` è stato verificato il 16/09/2026 contro l'installazione reale
(cms.cicostudio.it, post "Hotel Tumminello") e allineato a quanto
effettivamente configurato in ACF, comprese alcune differenze rispetto allo
schema originale (nomi campo, struttura della Gallery, ID vs nomi per le
tassonomie) — dettagli nei commenti in cima al file e nello schema ACF.

**Configurazione:**

1. Copia `.env.local.example` in `.env.local` e imposta `WORDPRESS_API_URL`
   con l'indirizzo reale (es. `https://cms.cicostudio.it/wp-json/wp/v2`).
   Se non impostata, il progetto usa comunque quell'indirizzo di default.
2. Se il CMS non risponde (non ancora online, rete, slug non trovato), le
   funzioni in `lib/wp.js` ricadono automaticamente sui dati di
   `lib/mockPortfolio.js`, loggando un warning in console — quindi il sito
   non si rompe mai, ma **verificare sempre in console che non ci siano
   warning `[wp] ...` una volta che il CMS è online**, altrimenti significa
   che sta ancora servendo dati segnaposto.

**Requisiti lato WordPress (da verificare/configurare):**

- Il CPT "Portfolio" deve avere REST API attiva con `rest_base: "portfolio"`
  (endpoint atteso: `/wp-json/wp/v2/portfolio`).
- Ogni campo del field group ACF "Scheda Portfolio" deve avere
  **"Show in REST API"** attivo (ACF 6+), così compare dentro
  `post.acf.<nome_campo>` nella risposta JSON.
- Le tassonomie condivise (`macroarea`, `tipologia`, `servizio`,
  `progetto_tag`) devono avere `show_in_rest: true` per essere leggibili nei
  filtri query (es. `/wp-json/wp/v2/portfolio?macroarea=<id>`, usato per i
  "Portfolio correlati" automatici).
- Featured Image nativa per l'hero della pagina di dettaglio (non serve un
  campo ACF dedicato).
- **CORS**: tutte le chiamate a WordPress avvengono lato server (Server
  Components / build), quindi CORS non è un vincolo in questo progetto. Se
  in futuro si aggiungono chiamate lato client, andrà configurato un header
  `Access-Control-Allow-Origin` sul dominio WordPress.
- **Permalink**: lo slug del progetto (`post.slug`) è quello usato nell'URL
  Next.js (`/portfolio/<slug>`) — verificare che la struttura permalink di
  WordPress non aggiunga prefissi imprevisti sull'endpoint REST.

**Se in WordPress i nomi dei campi ACF risultano diversi** da quelli
previsti nello schema, va aggiornato solo l'oggetto `ACF_FIELDS` in cima a
`lib/wp.js`: il resto del progetto (componenti inclusi) lavora sulla forma
di dato "pulita" restituita da `normalizePortfolio()`, non sui nomi originali
dei campi.

**"Correlati" (Portfolio e Blog):** la logica prova prima l'eventuale
override manuale (campo Relationship in ACF); se vuoto, esegue una query
automatica per Macroarea in comune (Portfolio) — per il Blog la query
automatica per tag condivisi (`progetto_tag`) è lasciata come TODO esplicito
in `lib/wp.js` (`getRelatedBlog`), da completare una volta noto il CPT/rest_base
usato per gli articoli del blog.

## Verso WordPress headless (resto del sito)

I dati della Home in `lib/content.js` restano statici per ora, ma sono
strutturati apposta per essere sostituiti allo stesso modo del Portfolio
(stessa forma degli oggetti, così i componenti non cambiano).

## Gallery, lightbox e Video (pagina di dettaglio Portfolio)

- **Gallery**: griglia 1:1, 4 colonne desktop/tablet, 2 su mobile
  (`.gallery-grid` in `globals.css`). Con immagini reali da
  `acf.photo_gallery.gallery`, ogni tile è cliccabile e apre il lightbox.
- **Lightbox**: overlay a scorrimento orizzontale (scroll-snap) su tutte le
  immagini della gallery, aperto sull'immagine cliccata. Chiusura con il
  pulsante X o, solo su mobile/touch, con swipe verso l'alto. Vanilla JS in
  `components/ClientInteractions.js` — nessuna libreria esterna aggiunta.
- **Video**: sezione dopo la Gallery con un solo video hero 16:9, embed da
  `youtube-nocookie.com` costruito a partire dal campo ACF `video_hero`
  (oEmbed). Se il campo è vuoto la sezione non compare. I 3 video verticali
  9:16 discussi in riunione non sono ancora implementati (su richiesta
  esplicita: si parte solo dal video hero) — vedi nota TODO nello schema ACF.

## Pagina indice Portfolio (/portfolio)

Elenco di tutti i progetti (`getAllPortfolio()` in `lib/wp.js`), con filtro
client-side per Tipologia, Servizio e Tag (`PortfolioFilterGrid.js`, tre
select combinati in AND + contatore risultati). Il nav "Portfolio" e il
pulsante "Vedi tutto il portfolio" nella Home puntano qui. Filtro
client-side perché tutti i progetti sono già caricati lato server: se il
catalogo crescesse molto si può passare a un filtro via query param sulle
tassonomie, già supportato dall'API (vedi `getRelatedPortfolio`).

## Pagina Hotel (/hotel) e le prossime pagine di servizio

Prima pagina costruita a partire dal prototipo statico approvato
(`07_Output-Sito/servizio-hotel.html`) e dai testi reali del cliente
(documento "Fotografia per hotel CICO.docx"). Struttura: hero editoriale,
intro, 2 card ad accordion ("Fotografia per OTA" / "Fotografia di brand"),
sezione a due colonne con i 4 step del processo, showcase progetti
correlati (auto-selezionati per Macroarea+Servizio, vedi
`getPortfolioByFilter` in `lib/wp.js`), 3 blocchi "Esperienza specifica",
FAQ (10 domande, stesso Accordion), Blog correlati (auto-selezionato per
categoria, vedi `getBlogByCategory` — oggi con fallback ai dati segnaposto
di `lib/content.js`, query reale da collegare quando sarà noto il CPT del
Blog), CTA finale + footer condiviso.

Tutti i componenti (`components/service/`) sono generici e riusano solo i
dati passati via props: le pagine Host e B&B, quando arriveranno i
rispettivi testi, si costruiscono allo stesso modo aggiungendo un nuovo
oggetto in `lib/serviziContent.js` + una nuova `app/<slug>/page.js` che
richiama gli stessi componenti — senza toccare CSS o componenti esistenti.

## Cosa manca ancora

- Testi e foto definitivi al posto dei segnaposto (Portfolio) e foto reali
  nella pagina Hotel
- Video verticali 9:16 (3x) nella sezione Video, quando richiesti
- Rinomina tassonomica "Architettura" → "B&B" (segnalata dal cliente, da
  chiarire se riguarda la Macroarea o la Tipologia prima di intervenire)
- Pagine Host, B&B e singolo articolo Blog — oggi esistono Home, indice
  Portfolio, dettaglio Portfolio e la pagina Hotel
- Query automatica reale "Blog correlati"/"Approfondimenti dal Blog" per
  tag o categoria in comune (vedi TODO `getRelatedBlog`/`getBlogByCategory`
  in `lib/wp.js`) — oggi entrambe ricadono sui dati segnaposto perché il
  CPT/rest_base del Blog headless non è ancora noto
- Deploy (tipicamente Vercel/Netlify per il frontend, hosting separato per
  WordPress)
