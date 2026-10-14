import Link from "next/link";
import { coverProps } from "../../lib/media";

// Progetti correlati (scroll orizzontale). Selezione automatica da WordPress
// per area (Macroarea o Tipologia) + servizio: vedi getPortfolioByFilter in
// lib/wp.js. Se non ci sono progetti corrispondenti la sezione non compare.
export default function Showcase({ label, title, intro, items }) {
  if (!items.length) return null;
  return (
    <section className="showcase-section">
      <div className="showcase-head">
        <div>
          <span className="section-label">{label}</span>
          <h2 className="section-title">{title}</h2>
        </div>
        {intro && <p>{intro}</p>}
      </div>
      <div className="showcase-wrap">
        <button type="button" className="swipe-hint" id="swipeHint" aria-label="Scorri i progetti">
          →
        </button>
        <div className="showcase-scroll" id="showcaseScroll">
        {items.map((item, i) => {
          const cover = coverProps(item.heroImage, i);
          return (
            <Link href={`/portfolio/${item.slug}`} className="showcase-card" key={item.slug}>
              <div className={`showcase-media ${cover.className}`} style={cover.style} />
              <h3>{item.title}</h3>
            </Link>
          );
        })}
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <Link href="/portfolio" className="btn-tertiary">
          Scopri tutti i progetti <span className="arrow">→</span>
        </Link>
      </div>
    </section>
  );
}
