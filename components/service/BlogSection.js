import { brandColors } from "../../lib/content";

// "Approfondimenti dal Blog" nelle pagine di servizio: stessa estetica del
// Blog della home (griglia a 3 colonne, non la variante ".related" a 2 usata
// nel dettaglio Portfolio). Selezione automatica per categoria — vedi
// getBlogByCategory in lib/wp.js (oggi con fallback ai dati segnaposto,
// query reale ancora da collegare quando sarà definito il CPT del Blog).
export default function BlogSection({ items, label = "Approfondimenti dal Blog", title = "Per saperne di più" }) {
  if (!items.length) return null;
  return (
    <section className="blog">
      <div className="blog-container">
        <div className="section-head">
          <div>
            <span className="section-label">{label}</span>
            <h2 className="section-title">{title}</h2>
          </div>
        </div>
        <div className="blog-grid">
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
                Leggi l&apos;articolo <span className="arrow">→</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
