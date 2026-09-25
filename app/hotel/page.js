import Header from "../../components/Header";
import MobileMenu from "../../components/MobileMenu";
import Footer from "../../components/Footer";
import ClientInteractions from "../../components/ClientInteractions";
import ServiceHero from "../../components/service/ServiceHero";
import Accordion from "../../components/service/Accordion";
import StepsSection from "../../components/service/StepsSection";
import Showcase from "../../components/service/Showcase";
import WhySection from "../../components/service/WhySection";
import BlogSection from "../../components/service/BlogSection";
import ServiceCTA from "../../components/service/ServiceCTA";
import { hotelPage } from "../../lib/serviziContent";
import { getPortfolioByFilter, getBlogByCategory } from "../../lib/wp";

export const metadata = {
  title: "Fotografia per hotel in Sicilia — CICO",
  description:
    "Servizi fotografici per boutique hotel, resort, masserie e strutture indipendenti in Sicilia: immagini per OTA e fotografia di brand.",
};

// Pagina di servizio "Hotel". Stessa struttura pensata per essere riusata
// identica da /host e /bb (vedi lib/serviziContent.js): cambiano solo i
// contenuti passati ai componenti in components/service/.
export default async function HotelPage() {
  const content = hotelPage;

  const [showcaseItems, blogItems] = await Promise.all([
    getPortfolioByFilter(
      { macroarea: content.showcase.macroarea, servizio: content.showcase.servizio },
      4
    ),
    getBlogByCategory(content.blogCategory, 3),
  ]);

  const faqItems = content.faq.map((f) => ({
    title: f.q,
    blocks: [{ type: "p", text: f.a }],
  }));

  return (
    <>
      <div className="font-note">
        Pagina Hotel — testi definitivi dal cliente, foto e progetti/articoli
        correlati ancora segnaposto in attesa dei dati WordPress reali.
      </div>
      <Header />
      <MobileMenu />

      <ServiceHero h1={content.hero.h1} subtitle={content.hero.subtitle} intro={content.intro} />

      <div className="eyebrow-block">
        <span className="section-label">{content.eyebrow}</span>
      </div>
      <div className="section-head">
        <h2 className="section-title">{content.sectionTitle}</h2>
        <p>{content.sectionIntro}</p>
      </div>
      <Accordion items={content.accordionObiettivi} />

      <StepsSection title={content.steps.title} steps={content.steps.items} />

      <Showcase
        label={content.showcase.label}
        title={content.showcase.title}
        intro={content.showcase.intro}
        items={showcaseItems}
        ctaHref={content.showcase.ctaHref}
        ctaLabel={content.showcase.ctaLabel}
      />

      <WhySection label={content.why.label} intro={content.why.intro} items={content.why.items} />

      <div className="section-head">
        <span className="section-label">Domande frequenti</span>
        <h2 className="section-title">Tutto quello che c&apos;è da sapere</h2>
      </div>
      <Accordion items={faqItems} className="faq-section" />

      <BlogSection items={blogItems} />

      <ServiceCTA text={content.cta.text} />

      <Footer />
      <ClientInteractions />
    </>
  );
}
