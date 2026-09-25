import Link from "next/link";
import { brandColors } from "../../lib/content";

// Showcase progetti correlati, auto-selezionati per Macroarea+Servizio
// (vedi getPortfolioByFilter in lib/wp.js). Graficamente distinta dal grid
// standard .portfolio-grid: scroll orizzontale, non paginata, pensata per
// scorrere rapidamente una selezione più ampia di lavori dello stesso tipo.
export default function Showcase({ label, title, intro, items, ctaHref, ctaLabel }) {
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
      <div className="showcase-scroll">
        {items.map((item, i) => (
          <Link href={`/portfolio/${item.slug}`} className="showcase-card" key={item.slug}>
            <div
              className="showcase-media"
              style={{
                background: `linear-gradient(135deg, ${brandColors[i % 4]}33, ${
                  brandColors[(i + 1) % 4]
                }66)`,
              }}
            />
            <h3>{item.title}</h3>
          </Link>
        ))}
      </div>
      {ctaHref && (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <Link href={ctaHref} className="btn-tertiary">
            {ctaLabel || "Scopri tutti i progetti"} <span className="arrow">→</span>
          </Link>
        </div>
      )}
    </section>
  );
}
