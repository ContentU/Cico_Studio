# CICO — Next.js

Home page convertita in progetto Next.js reale, a partire dal prototipo
statico approvato. Stessa struttura, stesse animazioni, stessi contenuti
segnaposto (testi e foto sono ancora da sostituire).

## Come avviarlo

```bash
npm install
npm run dev
```

Poi apri http://localhost:3000

## Cosa c'è dentro

- `app/` — layout e pagina Home (App Router di Next.js)
- `components/` — un componente per ogni sezione (Header, Hero, Portfolio,
  Servizi, Come lavoriamo, Blog, Footer) più `ClientInteractions.js`, che
  contiene tutta la logica di scroll/animazione portata dal prototipo
- `lib/content.js` — tutti i testi e i dati (portfolio, blog, servizi) in un
  unico posto
- `public/fonts/` — i file Apfel Grotezk in locale; TT Travel Next arriva dal
  link Typekit già inserito in `app/layout.js`

## Verso WordPress headless

I dati in `lib/content.js` sono strutturati apposta per essere sostituiti in
un secondo momento con chiamate a WordPress (REST API o WPGraphQL), senza
dover toccare i componenti: basterà cambiare da dove arrivano questi array
(oggi statici, domani da `fetch()`).

## Cosa manca ancora

- Testi e foto definitivi al posto dei segnaposto
- Pagine interne (Hotel, Host, Architettura, Portfolio, Contatti, articoli
  Blog) — oggi esiste solo la Home
- Collegamento reale a WordPress come CMS headless
- Deploy (tipicamente Vercel/Netlify per il frontend, hosting separato per
  WordPress)
