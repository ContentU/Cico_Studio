// Dati della home page.
// Oggi sono valori statici segnaposto: struttura pensata per essere sostituita
// in futuro da chiamate a WordPress headless (REST API o WPGraphQL), mantenendo
// invariata la forma degli oggetti così i componenti non cambiano.

export const brandColors = ["#0E7173", "#ED254E", "#2C0E37", "#FFFD82"];

// Href assoluti ("/#sezione") invece che ancore relative ("#sezione"): così
// i link funzionano sia dalla home sia dalle pagine interne (es. dettaglio
// Portfolio), che condividono Header/MobileMenu/Footer ma non le sezioni
// stesse. Next.js gestisce lo scroll all'ancora anche dopo la navigazione.
export const navLinks = [
  { label: "Home", href: "/#top" },
  { label: "Hotel", href: "/#servizi" },
  { label: "Host", href: "/#servizi" },
  { label: "Architettura", href: "/#servizi" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Contatti", href: "/#contatti" },
];

export const portfolioItems = [
  { slug: "villa-igiea-wellness", title: "Villa Igiea Wellness", cat: "Hotel", tags: ["Fotografia", "Video"] },
  { slug: "casa-marina-host", title: "Casa Marina Host", cat: "Host", tags: ["Fotografia", "Social"] },
  { slug: "loft-kalsa", title: "Loft Kalsa", cat: "Architettura", tags: ["Interior design"] },
  { slug: "borgo-marinaro-resort", title: "Borgo Marinaro Resort", cat: "Hotel", tags: ["Food & drink", "Video"] },
  { slug: "palazzo-ducezio-suites", title: "Palazzo Ducezio Suites", cat: "Host", tags: ["Fotografia", "Annunci Airbnb"] },
  { slug: "studio-luce", title: "Studio Luce", cat: "Architettura", tags: ["Light design"] },
];

export const blogItems = [
  {
    slug: "foto-giuste-annuncio-airbnb",
    cat: "Host",
    title: "Come scegliere le foto giuste per il tuo annuncio Airbnb",
    excerpt: "Le immagini che fanno davvero la differenza nelle prenotazioni.",
  },
  {
    slug: "errori-fotografia-hotel",
    cat: "Hotel",
    title: "5 errori da evitare nella fotografia d'hotel",
    excerpt: "Gli errori più comuni e come evitarli per raccontare al meglio la struttura.",
  },
  {
    slug: "light-design-architettura",
    cat: "Architettura",
    title: "Light design: raccontare l'architettura con la luce",
    excerpt: "Perché la luce è protagonista quanto lo spazio stesso.",
  },
];

export const servizi = [
  {
    name: "Hotel",
    num: "01",
    lead: "Il racconto visivo della tua struttura.",
    desc: "Fotografia, video e contenuti social pensati per raccontare l'esperienza dell'ospitalità: dalle camere agli spazi comuni, fino ai dettagli che fanno la differenza nella scelta di un ospite. Lavoriamo con hotel, resort e strutture ricettive per costruire un'immagine coerente su ogni canale.",
    tags: ["Fotografia per hotel", "Video per hotel", "Contenuti social", "Food and drink"],
  },
  {
    name: "Host",
    num: "02",
    lead: "Annunci che convertono, non solo che piacciono.",
    desc: "Immagini e ottimizzazione degli annunci per far risaltare appartamenti e ville su Airbnb e sulle principali piattaforme. Curiamo ogni dettaglio, dalla luce alla composizione, per aumentare visibilità, fiducia e prenotazioni.",
    tags: ["Fotografie per appartamenti", "Fotografie per ville", "Ottimizzazione annunci Airbnb"],
  },
  {
    name: "Architettura",
    num: "03",
    lead: "Spazi, luce e progetto raccontati insieme.",
    desc: "Fotografia che valorizza spazi, interni e progetti di luce per studi di architettura e interior design. Un racconto visivo pensato per portfolio, pubblicazioni e comunicazione professionale.",
    tags: ["Interior design", "Fotografia di architettura", "Light design"],
  },
];

export const footerLinks = {
  servizi: [
    { label: "Hotel", href: "/#servizi" },
    { label: "Host", href: "/#servizi" },
    { label: "Architettura", href: "/#servizi" },
    { label: "Portfolio", href: "/#portfolio" },
  ],
  sottoServizi: [
    { label: "Fotografia per hotel", href: "#" },
    { label: "Ottimizzazione annunci Airbnb", href: "#" },
    { label: "Fotografia di architettura", href: "#" },
    { label: "Food and drink", href: "#" },
  ],
  contatti: {
    email: "hello@cicostudio.it",
    telefono: "+39 000 000 0000",
    indirizzo: "Via [indirizzo], Palermo",
  },
};
