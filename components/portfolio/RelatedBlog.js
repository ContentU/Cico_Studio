import { brandColors } from "../../lib/content";

// Riusa lo stile ".blog"/".b-card" della home, con un modificatore ".related"
// per la variante a 2 colonne (la home ne ha 3, qui il layout ne prevede 2).
export default function RelatedBlog({ items }) {
  if (!items.length) return null;
  return (
    <section className="blog related">
      <div className="blog-container">
        <div className="section-head">
          <div>
            <span className="section-label">Blog correlati</span>
            <h2 className="section-title">Approfondimenti</h2>
          </div>
        </div>
        <div className="blog-grid related">
          {items.map((post, i) => (
            <div className="b-card" key={post.slug || post.title}>
              <div
                className="b-media"
                style={{
                  background: `linear-gradient(135deg, ${brandColors[i % 4]}22, ${
                    brandColors[(i + 2) % 4]
                  }55)`,
                }}
              />
              <div className="b-meta">{post.cat}</div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <span className="btn-tertiary">
                Leggi tutto <span className="arrow">→</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
