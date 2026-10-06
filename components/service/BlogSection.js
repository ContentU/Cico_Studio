import Link from "next/link";
import { coverProps } from "../../lib/media";

// "Approfondimenti dal Blog": articoli WordPress della stessa categoria (vedi
// getBlogByCategory). Se non ce ne sono, mostra i titoli indicati dal cliente
// nei testi (`fallback`), non cliccabili, così la sezione resta visibile
// finché gli articoli non vengono pubblicati.
export default function BlogSection({ posts, fallback, category }) {
  const items = posts.length ? posts : fallback.map((f) => ({ ...f, cat: category }));
  if (!items.length) return null;
  return (
    <section className="blog">
      <div className="blog-container">
        <div className="section-head">
          <span className="section-label">Approfondimenti dal Blog</span>
          <h2 className="section-title">Per saperne di più</h2>
        </div>
        <div className="blog-grid">
          {items.map((post, i) => {
            const cover = coverProps(post.image, i, ["22", "55"], 2);
            const inner = (
              <>
                <div className={`b-media ${cover.className}`} style={cover.style} />
                <div className="b-meta">{post.cat || category}</div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <span className="btn-tertiary">
                  Leggi l&apos;articolo <span className="arrow">→</span>
                </span>
              </>
            );
            return post.slug ? (
              <Link href={`/blog/${post.slug}`} className="b-card" key={post.slug}>
                {inner}
              </Link>
            ) : (
              <div className="b-card" key={post.title}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
