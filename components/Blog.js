import Link from "next/link";
import { getLatestPosts } from "../lib/wp";
import { coverProps } from "../lib/media";

// Ultimi articoli dal CMS (Post nativi di WordPress): copertina = Featured
// Image dell'articolo, categoria = Macroarea.
export default async function Blog() {
  const posts = await getLatestPosts(3);
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
          {posts.map((post, i) => {
            const cover = coverProps(post.image, i, ["22", "55"], 2);
            const inner = (
              <>
                <div className={`b-media ${cover.className}`} style={cover.style} />
                <div className="b-meta">{post.cat}</div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <span className="btn-tertiary">
                  Leggi tutto <span className="arrow">→</span>
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
        <div className="blog-cta">
          <Link href="/blog" className="btn-secondary">
            Vedi tutti gli articoli
          </Link>
        </div>
      </div>
    </section>
  );
}
