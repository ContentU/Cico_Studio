import Link from "next/link";

// "Cosa realizziamo": 3 card 42/25/33 alte 400px, testo in basso, sfondo a colore (nessuna foto).
const CARDS = [
  { href: "/fotografia-hotel", title: "Immagini per raccontare", text: "Fotografia evocativa per brand e comunicazione.", bg: "linear-gradient(160deg,#0E7173,#123f40)" },
  { href: "/fotografia-hotel", title: "Immagini per descrivere", text: "Fotografia descrittiva per OTA e prenotazioni.", bg: "linear-gradient(160deg,#D01F47,#8F1433)" },
  { href: "/video-hotel", title: "Video emozionali", text: "Brand film e video per la tua comunicazione.", bg: "linear-gradient(160deg,#2C0E37,#54234f)" },
];

export default function Lavoriamo() {
  return (
    <section className="lavoriamo" id="servizi">
      <div className="section-head">
        <div>
          <span className="section-label">Cosa realizziamo</span>
          <h2 className="section-title">Ogni immagine secondo una tua esigenza</h2>
        </div>
      </div>
      <div className="lavoriamo-cards">
        {CARDS.map((c) => (
          <Link href={c.href} className="lav-card lav-main" style={{ background: c.bg }} key={c.title}>
            <div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <span className="btn-tertiary on-image">
                Scopri di più <span className="arrow">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
