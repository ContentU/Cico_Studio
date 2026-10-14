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

## Aperti

- Voci di menu "Social per hotel/B&B", "Video e social per host" e "Strumenti AI": per ora `href: "#"` in `lib/content.js` (pagine da scrivere; le tre voci social devono puntare alla stessa pagina).
- Pagina Team: sezione "Hanno scelto il nostro lavoro" è un segnaposto (mancano i loghi clienti); Alberto Di Martino e Luciano Di Biasi non hanno ancora il logo.
- Nuovi testi "Processo" e titoli accordion applicati solo alla pagina Hotel.
- Favicon: solo SVG (eventuali PNG/ico per Safari e iOS da aggiungere).

Vedi "Cosa manca ancora" in `README.md`.
