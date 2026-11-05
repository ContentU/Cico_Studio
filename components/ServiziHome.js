import Link from "next/link";

// Sezione Servizi della home (sostituisce "Cosa realizziamo"): tre card in una
// riga con le proporzioni 42/25/33 (.lavoriamo-cards), sfondo a colore, nessuna foto.
// Il testo è in HTML (grassetti con <strong>) e le card crescono in altezza.
const CARDS = [
  {
    num: "01",
    name: "Hotel",
    title: "Ogni struttura ha un'identità. Facciamola emergere.",
    text: (
      <>
        Fotografia, video e contenuti visuali per valorizzare{" "}
        <strong>architettura, ambienti, servizi ed esperienze</strong>, dalle immagini per i portali alla comunicazione del brand.
      </>
    ),
    links: [
      { label: "Fotografia per hotel", href: "/fotografia-hotel" },
      { label: "Video per hotel", href: "/video-hotel" },
    ],
    bg: "linear-gradient(160deg,#0E7173,#123f40)",
  },
  {
    num: "02",
    name: "B&B",
    title: "Piccole strutture. Grandi prime impressioni.",
    text: (
      <>
        Immagini e video per mostrare <strong>camere, comfort, colazione e caratteristiche della struttura</strong>. Una presentazione professionale per Booking e gli altri portali, senza perdere il carattere del tuo B&amp;B.
      </>
    ),
    links: [
      { label: "Fotografia per B&B", href: "/fotografia-bb" },
      { label: "Video per B&B", href: "/video-hotel" },
    ],
    bg: "linear-gradient(160deg,#D01F47,#8F1433)",
  },
  {
    num: "03",
    name: "Host",
    title: "Una casa da scegliere, non solo da guardare.",
    text: (
      <>
        Fotografia professionale di interni e contenuti pensati per{" "}
        <strong>valorizzare l&apos;immobile e costruire gallerie efficaci per Airbnb</strong>. Dall&apos;appartamento alla villa, con produzioni dedicate alle proprietà di pregio.
      </>
    ),
    links: [
      { label: "Fotografia per appartamenti", href: "/fotografia-appartamenti-airbnb" },
      { label: "Fotografia per ville", href: "/fotografia-ville" },
      { label: "Fotografia per immobili di pregio", href: "/fotografia-immobili-pregio" },
      { label: "Video per host", href: "/video-hotel" },
    ],
    bg: "linear-gradient(160deg,#2C0E37,#54234f)",
  },
];

export default function ServiziHome() {
  return (
    <section className="lavoriamo servizi-new" id="servizi">
      <div className="section-head">
        <div>
          <span className="section-label">Servizi</span>
          <h2 className="section-title">Per ogni tipo di struttura, il racconto giusto</h2>
        </div>
      </div>
      <div className="lavoriamo-cards">
        {CARDS.map((c) => (
          <article className="lav-card sv2" style={{ background: c.bg }} key={c.num}>
            <span className="sv-num">
              {c.num} — {c.name}
            </span>
            <h3>{c.title}</h3>
            <p>{c.text}</p>
            <ul className="sv-links">
              {c.links.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href}>
                    {l.label} <span className="arrow">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
