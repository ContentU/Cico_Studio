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

Rotte (App Router):

- `/` — Home v2 (hero "Hey <parola>!" con parola rotante, Portfolio e Blog da WordPress)
- `/portfolio`, `/portfolio/[slug]` — indice con filtri e dettaglio progetto
- `/fotografia-hotel`, `/video-hotel`, `/fotografia-bb`,
  `/fotografia-appartamenti-airbnb`, `/fotografia-ville`,
  `/fotografia-immobili-pregio` — 6 pagine di servizio, **una sola rotta**
  `app/[servizio]/page.js` + testi in `lib/serviziContent.js`
  (`/hotel` fa redirect 301 a `/fotografia-hotel`, vedi `next.config.mjs`)
- `/blog` — indice: pillole per categoria, ultimo articolo in evidenza,
  griglia a 3 colonne con infinite scroll
- `/blog/[slug]` — articolo (corpo WordPress ripulito lato server), correlati per tag/categoria
- `/contatti` — form di primo contatto → `POST /api/contatti`
- Pulsante WhatsApp flottante su tutte le pagine (`components/WhatsAppFab.js`,
  numero in `lib/content.js` → `siteConfig`)

Struttura:

- `components/` — sezioni della Home, Header/MobileMenu/Footer condivisi,
  `ClientInteractions.js` (scroll, menu mobile, lightbox: vale per tutte le pagine)
- `components/service/` — componenti delle pagine di servizio
  (ServiceHero, BandSection, StepsSection, Showcase, WhyStack, FaqSection,
  BlogSection, `ServiceInteractions.js` per accordion e card sovrapposte)
- `components/blog/BlogIndex.js`, `components/contatti/ContactForm.js`,
  `components/portfolio/*`
- `lib/wp.js` — accesso a WordPress (Portfolio e Blog) con fallback ai dati
  segnaposto; `lib/content.js` (nav, footer, WhatsApp, dati home);
  `lib/serviziContent.js` (testi pagine di servizio); `lib/format.js`;
  `lib/media.js`; `lib/mockPortfolio.js`
- `styles/*.css` — CSS **per pagina**, estratto dalle anteprime HTML approvate
  e limitato al wrapper della pagina (`.pg-service`, `.pg-blog`, `.pg-article`,
  `.pg-contatti`), così non interferisce con le altre pagine.
  `app/globals.css` contiene base, home, portfolio e WhatsApp.
- `public/fonts/` — Apfel Grotezk in locale; TT Travels Next da Typekit (`app/layout.js`)

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

## Pagine di servizio

Le 6 pagine usano lo stesso layout (Hotel v2 da Figma). Per modificare un testo
o aggiungere una pagina si interviene solo su `lib/serviziContent.js` (le chiavi
dell'oggetto `servizioPages` sono gli URL). Il campo `showcase` (`area` + `servizio`, entrambi elenchi di alias) sceglie in automatico
i progetti Portfolio da WordPress: `area` è confrontata (senza maiuscole/accenti) con la
**Macroarea**, il **termine Tipologia** o la Tipologia testuale del progetto; `servizio` con
i **Servizi realizzati**. Nomi reali oggi in WP: Macroarea Hotel/Host/B&B; Tipologia
Appartamento/Villa/Hotel/Boutique Hotel/B&B/Residence; Servizio Foto/Video/Sito Web.
Se in WordPress non ci sono corrispondenze la sezione progetti non compare. **Manca in WP
il termine "Immobili di pregio"** (pagina `/fotografia-immobili-pregio`): va creato (Tipologia)
e assegnato ai progetti, altrimenti quella sezione resta vuota. `blog.category` è la
**Macroarea** dei Post da mostrare; se non ce ne sono, "Approfondimenti dal Blog" mostra i
titoli indicati dal cliente (non cliccabili).

Link provvisori nel footer; il menu di navigazione (`navLinks` in `lib/content.js`)
sarà rivisto con il cliente.

## Blog, articolo e Contatti

- **Blog**: i Post nativi di WordPress. L'infinite scroll lavora sui dati già
  caricati (fino a 100 articoli, `getAllPosts`): oltre quella soglia passare alla
  paginazione REST.
- **Articolo**: `cleanArticleHtml` in `lib/wp.js` rimuove paragrafi vuoti e
  segnaposto CTA tra parentesi quadre (es. "[VALUTIAMO IL PERIODO GIUSTO]"), non
  ripete l'immagine in evidenza se è la prima del testo e riscrive i link interni
  al CMS sul dominio del sito. Resto del corpo invariato.
- **Contatti**: `app/api/contatti/route.js` valida, scarta i bot (honeypot) e
  consegna a `CONTACT_WEBHOOK_URL` (da configurare; vedi `.env.local.example`).
  In produzione senza webhook risponde 503. Metodo di consegna da decidere con il
  cliente (email, WordPress, CRM).

## Newsletter (Brevo)

Modulo nel footer di tutte le pagine (`components/NewsletterForm.js`): solo email, consenso
privacy obbligatorio, honeypot anti-bot. Invia a `POST /api/newsletter`
(`app/api/newsletter/route.js`), che iscrive il contatto alla lista Brevo con
`POST https://api.brevo.com/v3/contacts` (iscrizione diretta, senza double opt-in; se il
contatto esiste viene aggiornato). Variabili d'ambiente: `BREVO_API_KEY` e `BREVO_LIST_ID`
(ID numerico della lista). In sviluppo senza chiave logga e risponde ok; in produzione senza
chiave risponde 503. Il link "Informativa privacy" è ancora un segnaposto.

## Home, Blog e immagini di copertina

Portfolio e Blog della home leggono da WordPress (non più da dati statici):
- **Portfolio**: copertina = Featured Image del progetto, categoria = Macroarea,
  tag = Servizi realizzati (`getAllPortfolio`).
- **Blog**: gli articoli sono i **Post nativi** di WordPress (`/wp/v2/posts`);
  copertina = Featured Image dell'articolo, categoria = Macroarea
  (`getLatestPosts`, `getBlogByCategory`, `normalizePost` in `lib/wp.js`).
  Un articolo senza Featured Image mostra il gradiente segnaposto.
- Helper condiviso per le copertine: `lib/media.js` (`coverProps`).
- Le pagine sono statiche con revalidate di 1 ora: dopo aver caricato nuove
  immagini possono servire fino a un'ora (o un nuovo deploy) per comparire.

**Tipografia**: il kit Typekit di TT Travels Next contiene solo Regular e Bold.
Nel CSS si usa quindi 700 al posto del Black del Figma e 400 al posto del
DemiBold. Se in futuro il kit includerà quei pesi, basta rimettere 900/600.

## Cosa manca ancora

- Foto e testi definitivi (hero, ritratti, card: oggi segnaposto "foto in arrivo")
- Brevo: integrazione pronta ma da attivare con `BREVO_API_KEY` e `BREVO_LIST_ID` (vedi sezione Newsletter)
- Consegna del form Contatti (`CONTACT_WEBHOOK_URL`)
- Numero di telefono e indirizzo definitivi nel footer e in /contatti (`lib/content.js`)
- Informativa privacy e Termini (link oggi segnaposto)
- Rinomina "Architettura" → "B&B" in WordPress da chiarire (Macroarea o Tipologia?)
- Revisione del menu di navigazione con il cliente
- Pagina "Approfondisci come lavoriamo" (link nello step Hotel, oggi punta a /blog)
- Articoli del blog indicati nei testi del cliente da scrivere/pubblicare
- Deploy (Vercel/Netlify per il frontend, hosting separato per WordPress)
