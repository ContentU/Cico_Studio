// Dati segnaposto per la pagina di dettaglio Portfolio, nella STESSA forma
// che produce normalizePortfolio() in lib/wp.js una volta collegato a
// WordPress. Servono a due cose:
//
// 1) Permettere di lavorare su `npm run dev` fin da subito, anche prima che
//    https://cms.cicostudio.it sia online o che i contenuti reali siano
//    stati inseriti in ACF.
// 2) Fare da fallback automatico: se una chiamata a WordPress fallisce (rete,
//    CMS non ancora pronto, slug non trovato), lib/wp.js torna questi dati
//    invece di far crashare la pagina — vedi i blocchi try/catch in wp.js.
//
// Quando il CMS sarà popolato, questo file può restare com'è: una volta che
// wpFetch() risponde correttamente, i dati reali hanno la precedenza e
// questo file smette semplicemente di essere usato.

export const mockPortfolioItems = [
  {
    id: 1,
    slug: "villa-igiea-wellness",
    title: "Villa Igiea Wellness",
    heroImage: null,
    macroarea: "Hotel",
    macroareaId: 1,
    tipologia: "Boutique Hotel",
    localita: "Palermo, Sicilia",
    cliente: "Villa Igiea Wellness Resort",
    serviziRealizzati: ["Fotografia", "Video"],
    anno: 2026,
    descrizioneBreve:
      "Un racconto fotografico e video pensato per valorizzare l'anima storica di Villa Igiea, tra terrazze vista mare, dettagli liberty e la piscina a picco sul golfo di Palermo. Un progetto che unisce l'eleganza d'epoca alla luce del Mediterraneo.",
    tags: ["Luxury", "Piscina", "Vista mare", "Storico"],
    gallery: [],
    portfolioCorrelatiRaw: [],
    articoliCorrelatiRaw: [],
    ctaOverride: null,
  },
  {
    id: 2,
    slug: "casa-marina-host",
    title: "Casa Marina Host",
    heroImage: null,
    macroarea: "Host",
    macroareaId: 2,
    tipologia: "Appartamento",
    localita: "Mondello, Palermo",
    cliente: "Casa Marina",
    serviziRealizzati: ["Fotografia", "Contenuti Social"],
    anno: 2025,
    descrizioneBreve:
      "Servizio fotografico e contenuti social per un appartamento fronte mare, pensato per convertire visualizzazioni in prenotazioni su Airbnb.",
    tags: ["Vista mare", "Design"],
    gallery: [],
    portfolioCorrelatiRaw: [],
    articoliCorrelatiRaw: [],
    ctaOverride: null,
  },
  {
    id: 3,
    slug: "loft-kalsa",
    title: "Loft Kalsa",
    heroImage: null,
    macroarea: "Architettura",
    macroareaId: 3,
    tipologia: "Interior",
    localita: "Kalsa, Palermo",
    cliente: "Studio privato",
    serviziRealizzati: ["Fotografia"],
    anno: 2025,
    descrizioneBreve:
      "Reportage fotografico di un progetto di interior design nel cuore della Kalsa, tra volumi storici e un intervento contemporaneo essenziale.",
    tags: ["Design", "Mediterraneo"],
    gallery: [],
    portfolioCorrelatiRaw: [],
    articoliCorrelatiRaw: [],
    ctaOverride: null,
  },
  {
    id: 4,
    slug: "borgo-marinaro-resort",
    title: "Borgo Marinaro Resort",
    heroImage: null,
    macroarea: "Hotel",
    macroareaId: 1,
    tipologia: "Hotel",
    localita: "Cefalù, Sicilia",
    cliente: "Borgo Marinaro Resort",
    serviziRealizzati: ["Fotografia", "Video", "Food & Beverage"],
    anno: 2026,
    descrizioneBreve:
      "Racconto per immagini e video del resort e della sua proposta food & drink, dalla colazione in terrazza alla cena vista mare.",
    tags: ["Vista mare", "Mediterraneo", "Design"],
    gallery: [],
    portfolioCorrelatiRaw: [],
    articoliCorrelatiRaw: [],
    ctaOverride: null,
  },
  {
    id: 5,
    slug: "palazzo-ducezio-suites",
    title: "Palazzo Ducezio Suites",
    heroImage: null,
    macroarea: "Host",
    macroareaId: 2,
    tipologia: "Villa",
    localita: "Noto, Sicilia",
    cliente: "Palazzo Ducezio Suites",
    serviziRealizzati: ["Fotografia"],
    anno: 2025,
    descrizioneBreve:
      "Fotografia e ottimizzazione dell'annuncio per una suite storica nel barocco di Noto, pensata per il mercato Airbnb di fascia alta.",
    tags: ["Luxury", "Storico", "Design"],
    gallery: [],
    portfolioCorrelatiRaw: [],
    articoliCorrelatiRaw: [],
    ctaOverride: null,
  },
  {
    id: 6,
    slug: "studio-luce",
    title: "Studio Luce",
    heroImage: null,
    macroarea: "Architettura",
    macroareaId: 3,
    tipologia: "Architettura",
    localita: "Palermo, Sicilia",
    cliente: "Studio Luce Architetti",
    serviziRealizzati: ["Fotografia"],
    anno: 2024,
    descrizioneBreve:
      "Un progetto di light design raccontato attraverso la fotografia d'architettura, con attenzione al rapporto tra spazio, materia e luce naturale.",
    tags: ["Design"],
    gallery: [],
    portfolioCorrelatiRaw: [],
    articoliCorrelatiRaw: [],
    ctaOverride: null,
  },
];
