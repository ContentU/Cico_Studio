import Link from "next/link";
import { portfolioItems, brandColors } from "../lib/content";

export default function Portfolio() {
  return (
    <section className="portfolio" id="portfolio">
      <div className="section-head">
        <div>
          <span className="section-label">Portfolio</span>
          <h2 className="section-title">Gli ultimi progetti</h2>
        </div>
        <p>
          Una selezione dei sei lavori più recenti: hotel, host e architettura
          raccontati per immagini.
        </p>
      </div>
      <div className="portfolio-grid" id="portfolioGrid">
        {portfolioItems.map((item, i) => (
          <Link href={`/portfolio/${item.slug}`} className="p-card" key={item.title}>
            <div
              className="p-media"
              style={{
                background: `linear-gradient(135deg, ${brandColors[i % 4]}33, ${
                  brandColors[(i + 1) % 4]
                }66)`,
              }}
            />
            <div className="p-body">
              <h3>{item.title}</h3>
              <div className="tags">
                <span className="tag cat">{item.cat}</span>
                {item.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
