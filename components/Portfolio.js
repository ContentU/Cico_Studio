import Link from "next/link";
import { getHomePortfolio } from "../lib/wp";
import { coverProps } from "../lib/media";

// Selezione di progetti per la home: quelli con tag "homepage" in WordPress
// (in ordine di data di pubblicazione). Copertina = Featured Image del
// progetto; sulle card: titolo, localita' e tipologia cliente (compatte).
export default async function Portfolio() {
  const items = await getHomePortfolio(4);
  return (
    <section className="portfolio portfolio-home" id="portfolio">
      <div className="section-head">
        <div>
          <span className="section-label">Portfolio</span>
          <h2 className="section-title">
            Scopri i nostri progetti <span className="dn">↓</span>
          </h2>
        </div>
        <p>Una selezione dei nostri lavori.</p>
      </div>
      <div className="portfolio-grid" id="portfolioGrid">
        {items.map((item, i) => {
          const cover = coverProps(item.heroImage, i);
          return (
            <Link href={`/portfolio/${item.slug}`} className="p-card" key={item.slug}>
              <div className={`p-media ${cover.className}`} style={cover.style} />
              <div className="p-body">
                <h3>{item.title}</h3>
                <p className="p-meta">
                  {[item.localita, item.tipologia || item.macroarea].filter(Boolean).join(" · ")}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="portfolio-more">
        <Link href="/portfolio" className="btn-tertiary">
          Scopri il portfolio completo <span className="arrow">→</span>
        </Link>
      </div>
    </section>
  );
}
