# Consegna sviluppo — aggiornamento Next.js (ottobre 2026)

Questo aggiornamento porta in Next.js tutte le anteprime HTML approvate
(cartella `07_Output-Sito`). Il progetto compila (`npm run build` OK, 23 pagine
statiche) e funziona anche senza WordPress raggiungibile (fallback ai dati
segnaposto, con warning `[wp] ...` in console).

## Novità

| Area | Dove |
|---|---|
| Home v2 (hero "Hey <parola>!" rotante) | `components/Hero.js`, `components/Sparkle.js`, `app/globals.css` |
| 6 pagine di servizio (layout Hotel v2, card sovrapposte, titolo sticky) | `app/[servizio]/page.js`, `components/service/*`, `lib/serviziContent.js`, `styles/service.css` |
| Blog indice (pillole, ultimo articolo, infinite scroll) | `app/blog/page.js`, `components/blog/BlogIndex.js`, `styles/blog.css` |
| Articolo | `app/blog/[slug]/page.js`, `lib/wp.js` (`getPostBySlug`, `cleanArticleHtml`, `getRelatedPosts`), `styles/article.css` |
| Contatti + API | `app/contatti/page.js`, `components/contatti/ContactForm.js`, `app/api/contatti/route.js`, `styles/contatti.css` |
| WhatsApp flottante | `components/WhatsAppFab.js` (montato in `app/layout.js`), numero in `lib/content.js` |
| Footer con link alle pagine di servizio | `components/Footer.js`, `lib/content.js` (`footerLinks`) |
| Newsletter Brevo (footer di tutte le pagine) | `components/NewsletterForm.js`, `app/api/newsletter/route.js` |
| Foto e video delle pagine di servizio | `public/images/servizi/`, `lib/serviziImages.js`, `components/service/Media.js` |
| Menu con sottomenu (Hotel / B&B / Host non cliccabili) | `lib/content.js` (`navLinks`), `components/Header.js`, `components/MobileMenu.js`, CSS "MENU CON SOTTOVOCI" in `app/globals.css` |
| Pagina Team (squadra + rete di competenze) | `app/team/page.js`, `lib/teamContent.js`, `public/images/team/`, `styles/team.css` |
| CTA fissa mobile "Iniziamo un progetto" | `components/MobileCta.js` (montata in `app/layout.js`) |
| Home: blocco "Ogni immagine secondo una tua esigenza" con hover sulle foto | `components/Lavoriamo.js`, CSS `.lav-card.has-img` in `app/globals.css` |
| Grassetti negli accordion (marcatori `**testo**`) | `components/service/Rich.js`, `lib/serviziContent.js` |
| Galleria portfolio: frecce + descrizione con formattazione | `components/portfolio/Gallery.js`, `components/portfolio/Scheda.js`, `lib/format.js` (`sanitizeRichText`) |
| Favicon (spark) | `public/favicon.svg`, `app/layout.js` |
| Menu senza "Contatti" e senza voci social; sotto 1180px menu burger | `lib/content.js` (`navLinks`), `app/globals.css`, `components/ClientInteractions.js` |
| Footer: telefono e dati legali (P. IVA, REA) su tutte le pagine | `components/Footer.js`, `lib/content.js` (`legalInfo`, `footerLinks`) |
| Home: hook nell'hero, 4 foto + posizionamento, servizi a 3 card, "Perché CICO" con audio, invito CTA nel footer | `components/Hero.js`, `HomeImages.js`, `ServiziHome.js`, `Perche.js`, `TestimonialAudio.js`, `public/images/home/`, `public/audio/` |
| Pagine servizi: nuovi testi processo, Video 16:9 ("Video hospitality"), nuove foto | `lib/serviziContent.js`, `lib/serviziImages.js`, `styles/service.css` (`.pg-video`) |
| Blog filtrabile da indirizzo (`/blog?cat=Hotel`) | `components/blog/BlogIndex.js` |
| Team: foto più piccole + foto del libro | `lib/teamContent.js`, `app/team/page.js`, `styles/team.css` |
| Redirect `/hotel` → `/fotografia-hotel` | `next.config.mjs` |

**Rimossi:** la vecchia pagina `app/hotel` e i vecchi componenti `components/service/*` (v1),
sostituiti dalle versioni v2. Il box "font-note" delle anteprime non c'è più.

## Da sapere

- **CSS per pagina**: `styles/*.css` è limitato al wrapper della pagina (`.pg-service`
  ecc.), estratto dalle anteprime. Le osservazioni CSS generiche del cliente andranno
  applicate lì o in `app/globals.css`.
- **Pesi tipografici**: Typekit ha solo 400 e 700, quindi Black→700 e DemiBold→400.
- **URL delle pagine di servizio** scelti da noi (vedi chiavi di `servizioPages`): da
  confermare con il cliente prima della messa online.
- **Selezione automatica dei progetti** nelle pagine di servizio: vedi `showcase` in
  `lib/serviziContent.js` (alias di Macroarea/Tipologia + Servizio). Verificato sui termini
  reali di cms.cicostudio.it (Servizio "Foto", Tipologia "Appartamento"/"Villa"). Manca in WP
  il termine **"Immobili di pregio"**: crearlo e assegnarlo ai progetti.
- **Blog correlati nelle pagine di servizio**: Post con Macroarea uguale a `blog.category`;
  se non ce ne sono, titoli del cliente non cliccabili.

## Configurazione (variabili d'ambiente)

Vedi `.env.local.example`. In produzione vanno impostate sull'hosting:

- `WORDPRESS_API_URL` (opzionale, default `https://cms.cicostudio.it/wp-json/wp/v2`)
- `CONTACT_WEBHOOK_URL` — **necessaria** perché il form Contatti consegni le richieste
  (senza, in produzione risponde 503)
- `BREVO_API_KEY` e `BREVO_LIST_ID` — newsletter nel footer (`/api/newsletter`). Chiave mai nel codice né su GitHub; senza queste variabili in produzione il modulo mostra un errore.

## Come verificare

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # controllo finale
```

Pagine da controllare a mano: `/`, `/fotografia-hotel`, `/video-hotel`, `/fotografia-bb`,
`/fotografia-appartamenti-airbnb`, `/fotografia-ville`, `/fotografia-immobili-pregio`,
`/blog`, un articolo, `/contatti`, `/portfolio`. Controllare anche in console che non
ci siano warning `[wp] ...` (significherebbe dati segnaposto al posto di quelli reali).

## Git (suggerito)

```bash
git checkout -b feature/pagine-servizio-blog-contatti
# copiare i file di questa cartella nel repository (senza node_modules/.next/.env.local),
# poi rimuovere i vecchi: app/hotel e components/service (versione v1)
git add -A
git commit -m "Home v2, pagine di servizio, blog, articolo, contatti, WhatsApp"
git push -u origin feature/pagine-servizio-blog-contatti
```

## Home v8 (novembre 2026)
Ordine: Hero tipografica (3 righe) → Portfolio (2 colonne, foto 3:2, selezione con tag "homepage" in WordPress; se nessun progetto ha il tag mostra i primi 4) → Servizi (`ServiziHome.js`: titolo e testo su sfondo rosato + sezione fissata con foto a destra, lista Hotel/B&B/Host e testo a sinistra; su mobile si tocca la voce) → Perché CICO (`Perche.js`: fascia gialla, 3 card, audio con barra) → Blog → CTA (footer).
- Portfolio /portfolio: 3 colonne desktop / 2 mobile, nessun filtro, tag Foto/Video sulle card.
- Loader di ~0,5 s al cambio pagina (`PageLoader.js`).
- Pagina /strumenti-ai ("Coming soon").
- Footer: "Palermo, Sicilia" + sede legale nella riga legale.
- Rimossi slider hero, testo che si colora, blocco foto, "Cosa realizziamo".
- Da fare in WordPress: creare il tag "homepage" (Progetto Tag) e assegnarlo ai progetti da mostrare in home.

## Aperti

- "Strumenti AI" nel menu: per ora `href: "#"` in `lib/content.js` (pagina da definire). Le voci "social" sono state tolte dal menu finché non esiste la pagina.
- Home: il testo grande (`components/MainText.js`) cita ancora "studi di architettura"; testimonianza di Maria R. da confermare col cliente (testo e consenso); la home mostra il portfolio da WordPress (se il CMS non risponde compaiono i dati segnaposto: controllare il certificato di cms.cicostudio.it).
- Pagina Team: sezione "Hanno scelto il nostro lavoro" è un segnaposto (mancano i loghi clienti); Alberto Di Martino e Luciano Di Biasi non hanno ancora il logo.
- Nuovi testi "Processo" e titoli accordion applicati solo alla pagina Hotel.
- Favicon: solo SVG (eventuali PNG/ico per Safari e iOS da aggiungere).

Vedi "Cosa manca ancora" in `README.md`.

## Media query (novembre 2026)
Breakpoint unificati: **600** (telefoni piccoli), **760** (mobile / picture source hero), **900** (layout mobile: stage Servizi, griglie, soglia JS), **1100** (tablet largo), **1180** (menu/burger), **1400** (schermi grandi), più `hover:hover` e `prefers-reduced-motion`.
Query sull'altezza: `(min-width:901px) and (max-height:820px)` e `(max-height:700px)` per lo stage Servizi (portatili 14" retina ≈ 1512×860, display del cliente). Nuova galleria video YouTube (click-to-load) in `components/service/VideoGallery.js`, mostrata solo su /video-hotel.

**Tipografia fluida:** variabili `--fs-body/--fs-lead/--fs-card/--fs-small` in fondo a `app/globals.css` (da 1100px, ancorate a 1512px, con tetto a ~1920px). Per rendere i testi più grandi/piccoli si cambiano solo questi valori.

## Revisione 18/11 – Portfolio e Video (fasi 1-2)
- **Campi ACF usati:** `sottotitolo` (Text) e `reel_1`, `reel_2`, `reel_3` (oEmbed YouTube/Shorts), tutti facoltativi (`lib/wp.js`).
- **Singolo progetto:** titolo + sottotitolo più piccolo (`.project-subtitle`); sezione "In formato social" con fino a 3 reel (`components/portfolio/Reels.js`).
- **Home:** mostra TUTTI i progetti col tag "homepage" (nessun limite), in ordine di data di pubblicazione; card compatte con titolo e "località · tipologia (Tipologia ACF, ripiego Macroarea)", senza tag Foto/Video. Mobile: margini 14px, angoli 10px.
- **/portfolio:** card con "località · tipologia (Tipologia ACF, ripiego Macroarea)" e tag Foto/Video.
- **Pagina Video:** niente più progetti del portfolio sotto "Storie in movimento": solo i video YouTube (click-to-load, miniature HD con ripiego) e i 3 reel verticali (primo: 0XFu0dzBAXU).

## Revisione 18/11 – Home (fase 4, variante splash B)
- **Splash** (`components/Splash.js`, solo home): logo CICO + nome esteso + scintilla, ~1,9 s, una volta per sessione (`?splash=1` per rivederlo, saltato con `prefers-reduced-motion`).
- **Intro Servizi:** foto a tutta larghezza con testo in sovrimpressione (`public/images/home/home-text-desktop.webp` 16:9, `home-text-mobile.webp` 4:3), al posto del box testo; "CICO realizza…" rimosso. L'etichetta "Servizi" è ora nello stage fisso.
- **Servizi su mobile:** stage fisso con scorrimento verticale (280vh) che cambia Hotel/B&B/Host; barra di avanzamento, hint "Scorri…" e voci cliccabili.
- **Transizione tra pagine:** `PageLoader` ora è una tendina gialla con scintilla (entra al clic, scopre la nuova pagina; minimo ~0,6 s; disattivata con `prefers-reduced-motion`).
- **Hero:** frase di posizionamento più grande/viola; "!" già dentro la parola che ruota.

## Revisione 21/11
- **Splash rifatto** sul video del cliente ("animazione cico.mp4"): viola scuro → scintilla rossa che si compone e ruota → forma rossa che si allarga → "cico" giallo + scintilla viola + nome esteso → l'intera schermata sale (cambio colore rosso→giallo). ~4,1 s prima dell'uscita; tempi in `components/Splash.js` (`HOLD_MS`) e nelle `animation-delay` del blocco `.splash*` in `globals.css`.
- **Safari:** il blocco scroll dello splash non usa più `overflow:hidden` su `html` (rompeva lo stage fisso dei Servizi): listener su wheel/touchmove sulla durata dello splash; `body` usa `overflow-x:clip`. **Da verificare su Safari reale.**
- **Intro con foto:** foto a destra sul fondo crema, bordo sinistro sfumato, testo viola a sinistra; su mobile testo sopra e foto quadrata sotto.
- **Progetto:** sottotitolo sopra il testo descrittivo (`.scheda-sub`); i tag interni "homepage" e "luxury" non si mostrano più.
- **Contatti:** tolto "Ci vuole meno di un minuto."
- **Da fare su WordPress (ACF):** il campo sottotitolo ha il *Nome campo* vuoto (l'API restituisce `"" : "sottotitolo"`) → impostare nome `sottotitolo`; il campo `anno` va cambiato da Numero a **Testo**.
- **Aperto:** invio mail del form Contatti (manca `CONTACT_WEBHOOK_URL`/integrazione Brevo).
