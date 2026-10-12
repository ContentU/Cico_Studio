import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import MobileMenu from "../../../components/MobileMenu";
import Footer from "../../../components/Footer";
import ClientInteractions from "../../../components/ClientInteractions";
import { coverProps } from "../../../lib/media";
import { formatDate } from "../../../lib/format";
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from "../../../lib/wp";
import "../../../styles/article.css";

// Una pagina statica per ogni articolo noto alla build; gli articoli nuovi
// vengono generati on-demand alla prima visita (poi rivalidati ogni ora).
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — CICO`,
    description: post.excerpt || undefined,
    openGraph: post.image ? { images: [post.image] } : undefined,
  };
}

// CTA in fondo all'articolo: testo specifico per la categoria Hotel, generico
// per le altre.
const CTA = {
  Hotel: {
    text: "Raccontami come lavora il tuo hotel e capiamo insieme il periodo e il modo giusto per il servizio fotografico.",
    button: "Valutiamo il periodo giusto",
  },
  default: {
    text: "Raccontaci il tuo progetto e capiamo insieme da dove partire.",
    button: "Parliamone",
  },
};

export default async function ArticlePage({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();
  const related = await getRelatedPosts(post, 3);
  const cta = CTA[post.cat] || CTA.default;

  return (
    <div className="pg-article">
      <Header />
      <MobileMenu />
      <main>
        <div className="wrap">
          <div className="art-head">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/blog">Blog</Link>
              {post.cat && (
                <>
                  {" › "}
                  <Link href="/blog">{post.cat}</Link>
                </>
              )}
            </nav>
            <div className="meta">
              {post.cat && <span className="tag cat">{post.cat}</span>}
              <span className="date">{formatDate(post.date)}</span>
              <span className="dot"></span>
              <span className="read">{post.minutes} min di lettura</span>
            </div>
            <h1>{post.title}</h1>
          </div>

          <div className="art-hero">
            {post.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={post.image} alt={post.title} />
            )}
          </div>

          {/* Contenuto reale di WordPress (content.rendered), ripulito in
              lib/wp.js → cleanArticleHtml */}
          <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />

          <aside className="art-cta">
            <div>
              <h2>
                Parliamo della <span className="hl">tua struttura</span>
              </h2>
              <p>{cta.text}</p>
            </div>
            <Link href="/contatti" className="btn-primary on-dark">
              {cta.button} <span className="arrow">→</span>
            </Link>
          </aside>

          {related.length > 0 && (
            <section className="related">
              <span className="section-label">Articoli correlati</span>
              <h2 className="section-title">Continua a leggere</h2>
              <div className="blog-grid">
                {related.map((p, i) => {
                  const cover = coverProps(p.image, i, ["22", "55"], 2);
                  return (
                    <Link href={`/blog/${p.slug}`} className="b-card" key={p.slug}>
                      <div className={`b-media ${cover.className}`} style={cover.style} />
                      <div className="meta">
                        {p.cat && <span className="tag cat">{p.cat}</span>}
                        <span className="date">{formatDate(p.date)}</span>
                      </div>
                      <h3>{p.title}</h3>
                      <p>{p.excerpt}</p>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer
        slim
        claim={
          <>
            Parliamo della <span className="hl">tua struttura</span>
          </>
        }
      />
      <ClientInteractions />
    </div>
  );
}
