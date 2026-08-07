import Link from "next/link";
import { brandColors } from "../../lib/content";

// Riusa lo stile ".portfolio-grid"/".p-card" della home, con un modificatore
// ".related" per la variante a 3 colonne senza offset di parallasse (che sulla
// home serve solo alla griglia a 2 colonne con stagger verticale).
export default function RelatedPortfolio({ items }) {
  if (!items.length) return null;
  return (
    <section className="portfolio related">
      <div className="section-head">
        <div>
          <span className="section-label">Portfolio correlati</span>
          <h2 className="section-title">Altri progetti che potrebbero interessarti</h2>
        </div>
      </div>
      <div className="portfolio-grid related">
        {items.map((item, i) => (
          <Link href={`/portfolio/${item.slug}`} className="p-card in-view" key={item.slug}>
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
                {item.cat && <span className="tag cat">{item.cat}</span>}
                {item.macroarea && <span className="tag cat">{item.macroarea}</span>}
                {(item.tags || []).map((t) => (
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
