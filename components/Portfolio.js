import Link from "next/link";
import { getAllPortfolio } from "../lib/wp";
import { coverProps } from "../lib/media";

// Ultimi progetti dal CMS (WordPress): copertina = Featured Image del
// progetto, categoria = Macroarea, tag = Servizi realizzati.
export default async function Portfolio() {
  const items = (await getAllPortfolio()).slice(0, 6);
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
        {items.map((item, i) => {
          const cover = coverProps(item.heroImage, i);
          return (
            <Link href={`/portfolio/${item.slug}`} className="p-card" key={item.slug}>
              <div className={`p-media ${cover.className}`} style={cover.style} />
              <div className="p-body">
                <h3>{item.title}</h3>
                <div className="tags">
                  {item.macroarea && <span className="tag cat">{item.macroarea}</span>}
                  {(item.serviziRealizzati || []).slice(0, 3).map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="portfolio-cta">
        <Link href="/portfolio" className="btn-secondary">
          Vedi tutto il portfolio
        </Link>
      </div>
    </section>
  );
}
