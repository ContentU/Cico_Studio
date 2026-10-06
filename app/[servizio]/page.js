import { notFound } from "next/navigation";
import Header from "../../components/Header";
import MobileMenu from "../../components/MobileMenu";
import Footer from "../../components/Footer";
import ClientInteractions from "../../components/ClientInteractions";
import ServiceHero from "../../components/service/ServiceHero";
import BandSection from "../../components/service/BandSection";
import StepsSection from "../../components/service/StepsSection";
import Showcase from "../../components/service/Showcase";
import WhyStack from "../../components/service/WhyStack";
import FaqSection from "../../components/service/FaqSection";
import BlogSection from "../../components/service/BlogSection";
import ServiceInteractions from "../../components/service/ServiceInteractions";
import { servizioPages, servizioSlugs } from "../../lib/serviziContent";
import { getPortfolioByFilter, getBlogByCategory } from "../../lib/wp";
import "../../styles/service.css";

// Rotta unica per le 6 pagine di servizio (testi in lib/serviziContent.js):
// /fotografia-hotel, /video-hotel, /fotografia-bb,
// /fotografia-appartamenti-airbnb, /fotografia-ville,
// /fotografia-immobili-pregio. Le rotte statiche (/blog, /portfolio,
// /contatti) hanno la precedenza su questa.
export const dynamicParams = false;

export function generateStaticParams() {
  return servizioSlugs.map((servizio) => ({ servizio }));
}

export function generateMetadata({ params }) {
  const page = servizioPages[params.servizio];
  if (!page) return {};
  return { title: page.meta.title, description: page.meta.description };
}

export default async function ServicePage({ params }) {
  const page = servizioPages[params.servizio];
  if (!page) notFound();

  const [projects, posts] = await Promise.all([
    getPortfolioByFilter({ area: page.showcase.area, servizio: page.showcase.servizio }, 6),
    getBlogByCategory(page.blog.category, 3),
  ]);

  return (
    <div className="pg-service">
      <Header />
      <MobileMenu />
      <main>
        <ServiceHero hero={page.hero} />
        <BandSection eyebrow={page.ctaLabel} band={page.band} />
        <StepsSection title={page.steps.title} items={page.steps.items} />
        {page.stepsExtra && (
          <StepsSection
            title={page.stepsExtra.title}
            intro={page.stepsExtra.intro}
            items={page.stepsExtra.items}
            extra
          />
        )}
        <Showcase
          label={page.showcase.label}
          title={page.showcase.title}
          intro={page.showcase.intro}
          items={projects}
        />
        <WhyStack why={page.why} />
        <FaqSection faq={page.faq} />
      </main>
      <BlogSection posts={posts} fallback={page.blog.fallback} category={page.blog.category} />
      <div className="service-cta-block">
        <p>{page.cta.text}</p>
      </div>
      <Footer
        newsletter={false}
        slim
        claim={
          <>
            {page.cta.claimPre} <span className="hl">{page.cta.claimHl}</span>
          </>
        }
      />
      <ClientInteractions />
      <ServiceInteractions />
    </div>
  );
}
