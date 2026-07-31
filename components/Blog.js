import { blogItems, brandColors } from "../lib/content";

export default function Blog() {
  return (
    <section className="blog">
      <div className="blog-container">
        <div className="section-head">
          <div>
            <span className="section-label">Blog</span>
            <h2 className="section-title">Ultimi articoli</h2>
          </div>
          <p>
            Consigli e riflessioni su fotografia, video e comunicazione per
            l&apos;ospitalità.
          </p>
        </div>
        <div className="blog-grid" id="blogGrid">
          {blogItems.map((post, i) => (
            <div className="b-card" key={post.title}>
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
        <div className="blog-cta">
          <a href="#" className="btn-secondary">
            Vedi tutti gli articoli
          </a>
        </div>
      </div>
    </section>
  );
}
