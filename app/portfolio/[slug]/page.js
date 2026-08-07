import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import MobileMenu from "../../../components/MobileMenu";
import Footer from "../../../components/Footer";
import ClientInteractions from "../../../components/ClientInteractions";
import ProjectHero from "../../../components/portfolio/ProjectHero";
import ProjectTitle from "../../../components/portfolio/ProjectTitle";
import Scheda from "../../../components/portfolio/Scheda";
import Gallery from "../../../components/portfolio/Gallery";
import RelatedPortfolio from "../../../components/portfolio/RelatedPortfolio";
import RelatedBlog from "../../../components/portfolio/RelatedBlog";
import {
  getAllPortfolioSlugs,
  getPortfolioBySlug,
  getRelatedPortfolio,
  getRelatedBlog,
} from "../../../lib/wp";

// Pre-genera una pagina statica per ogni progetto Portfolio noto al momento
// della build. Se in WordPress viene aggiunto un nuovo progetto dopo il
// deploy, Next lo genera comunque on-demand alla prima visita (fallback via
// ISR, grazie al `revalidate` impostato in lib/wp.js).
export async function generateStaticParams() {
  const slugs = await getAllPortfolioSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const item = await getPortfolioBySlug(params.slug);
  if (!item) return {};
  return {
    title: `${item.title} — CICO Portfolio`,
    description: item.descrizioneBreve || undefined,
  };
}

export default async function PortfolioDetailPage({ params }) {
  const item = await getPortfolioBySlug(params.slug);
  if (!item) notFound();

  const [relatedPortfolio, relatedBlog] = await Promise.all([
    getRelatedPortfolio(item),
    getRelatedBlog(item),
  ]);

  return (
    <>
      <div className="font-note">
        Pagina di dettaglio Portfolio — contenuti da WordPress ({item.slug}),
        con fallback automatico ai dati segnaposto se il CMS non risponde.
      </div>
      <Header />
      <MobileMenu />
      <ProjectHero item={item} />
      <ProjectTitle item={item} />
      <Scheda item={item} />
      <Gallery item={item} />
      <RelatedPortfolio items={relatedPortfolio} />
      <RelatedBlog items={relatedBlog} />
      <Footer />
      <ClientInteractions />
    </>
  );
}
