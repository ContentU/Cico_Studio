import Header from "../../components/Header";
import MobileMenu from "../../components/MobileMenu";
import Footer from "../../components/Footer";
import ClientInteractions from "../../components/ClientInteractions";
import BlogIndex from "../../components/blog/BlogIndex";
import { getAllPosts } from "../../lib/wp";
import "../../styles/blog.css";

export const metadata = {
  title: "Blog — CICO",
  description:
    "Consigli e riflessioni su fotografia, video e comunicazione per l'ospitalità.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  return (
    <div className="pg-blog">
      <Header />
      <MobileMenu />
      <main className="blog-page">
        <div className="wrap">
          <span className="section-label">Blog</span>
          <h1>Tutti gli articoli</h1>
          <p className="intro">
            Consigli e riflessioni su fotografia, video e comunicazione per l&apos;ospitalità.
          </p>
          <BlogIndex posts={posts} />
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
