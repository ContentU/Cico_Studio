# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Next.js (App Router, JS not TS) site for CICO — fotografia/video/contenuti per hotel, host e B&B.
Built from an approved static prototype (`07_Output-Sito/`, outside this repo) — same structure and
animations, ported to React components. Portfolio content is wired to a headless WordPress instance;
everything else is still static placeholder data.

## Commands

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run start
npm run lint
```

No test suite exists in this repo.

## Architecture

- `lib/content.js` — Home content (portfolio teasers, blog, servizi) — static, structured to be
  swappable for headless WP data later without touching components.
- `lib/serviziContent.js` — content for service pages (`hotelPage` today; `hostPage`/`bbPage` follow
  the same shape once client copy is provided).
- `lib/mockPortfolio.js` — placeholder Portfolio data in the exact shape of `normalizePortfolio()`
  output; used for local dev and as automatic fallback when WordPress is unreachable.
- `lib/wp.js` — the only place that talks to WordPress. All WP calls happen server-side (Server
  Components / build), so CORS is a non-issue unless client-side fetches are added later.
  - `WORDPRESS_API_URL` (env, `.env.local`) points at `<cms>/wp-json/wp/v2`; falls back to
    `https://cms.cicostudio.it/wp-json/wp/v2` if unset.
  - **If ACF field names in WordPress ever differ from what's expected, only edit `ACF_FIELDS`/
    `TAXONOMY` at the top of this file** — the rest of the app (including all components) consumes
    the normalized shape from `normalizePortfolio()`, never raw ACF field names.
  - Known quirks already reconciled against the live CMS (see file header comment for full detail):
    Gallery lives at `acf.photo_gallery.gallery` (not a plain ACF Gallery field, custom image object
    keys like `full_image_url`); taxonomy fields return numeric term IDs that must be resolved via
    `getTermName`/`getTermNames`; `articolo_correlati` is singular.
  - "Correlati" (Portfolio/Blog): tries a manual ACF Relationship override first, else falls back to
    an automatic query (Portfolio: shared Macroarea; Blog: TODO — `getRelatedBlog` — CPT/rest_base
    for the Blog is not yet known, currently returns mock data).
  - Any failed/empty WP response logs a `[wp] ...` console warning and silently falls back to mock
    data — when WordPress content should be live, grep the console for that prefix to catch pages
    still serving placeholders.

- `components/` — one component per Home section (Header, Hero, Portfolio, Servizi, Lavoriamo, Blog,
  Footer), plus `ClientInteractions.js` which holds all scroll/animation logic ported from the
  prototype in vanilla JS. It's reused across pages and self-disables for any element it can't find
  on a given page (e.g. Home-only scroll-reveal text).
- `components/portfolio/` — Portfolio detail page only: Hero, title+breadcrumb, Scheda (specs),
  Gallery (grid + lightbox, no external lib — vanilla JS in `ClientInteractions.js`), VideoHero
  (youtube-nocookie embed built from the `video_hero` ACF oEmbed field; section omitted if empty),
  RelatedPortfolio, RelatedBlog.
- `components/service/` — generic, prop-driven building blocks shared by all service pages
  (ServiceHero, Accordion, StepsSection, Showcase, WhySection, BlogSection, ServiceCTA). `/hotel` is
  the first page built from these; `/host` and `/bb` are meant to reuse the exact same components —
  add a new content object in `lib/serviziContent.js` + a new `app/<slug>/page.js`, without touching
  CSS or components.

### Routes

- `app/page.js` — Home
- `app/portfolio/page.js` — Portfolio index, all projects from `getAllPortfolio()`, client-side
  filter (Tipologia/Servizio/Tag, combined AND) in `components/portfolio/PortfolioFilterGrid.js`.
  Filtering is client-side because all projects are already loaded server-side; if the catalog grows,
  switch to query-param filtering on taxonomies (already supported by the WP API, see
  `getPortfolioByFilter`/`getRelatedPortfolio` in `lib/wp.js`).
- `app/portfolio/[slug]/page.js` — Portfolio detail, dynamic by WP post slug.
- `app/hotel/page.js` — first service page; template for future `/host`, `/bb`.

### Fonts

Apfel Grotezk is self-hosted in `public/fonts/`; TT Travel Next comes from the Typekit `<link>` in
`app/layout.js`.

## Notes

- `lib/wp.js` was last verified against the live CMS (`cms.cicostudio.it`, post "Hotel Tumminello")
  on 16/09/2026 — check the file's header comment before assuming an ACF field name/shape.
- ACF schema reference doc: `09_WordPress-ACF/scheda-portfolio-acf.md` (outside this repo's tracked
  tree — check the parent project folder if you need it).
- Known gaps (see README "Cosa manca ancora" for the full list): real copy/photos still placeholder
  in most places; 3 vertical 9:16 videos not implemented yet (intentionally, hero video only for
  now); Host/B&B/single Blog article pages don't exist yet; real "Blog correlati" query pending
  Blog CPT/rest_base; no deploy target chosen yet.
