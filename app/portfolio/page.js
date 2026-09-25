import Header from "../../components/Header";
import MobileMenu from "../../components/MobileMenu";
import Footer from "../../components/Footer";
import ClientInteractions from "../../components/ClientInteractions";
import PortfolioFilterGrid from "../../components/portfolio/PortfolioFilterGrid";
import { getAllPortfolio } from "../../lib/wp";

export const metadata = {
  title: "Portfolio — CICO",
  description:
    "Tutti i progetti CICO: hotel, host e architettura raccontati per immagini. Filtra per tipologia, servizio o tag.",
};

// Pagina indice Portfolio: elenco completo dei progetti con filtro per
// Tipologia/Servizio/Tag (vedi PortfolioFilterGrid, client component).
// L'elenco arriva già interamente da WordPress qui (Server Component);
// il filtro lavora poi lato client sui dati già caricati.
export default async function PortfolioIndexPage() {
  const items = await getAllPortfolio();

  const tipologie = [...new Set(items.map((i) => i.tipologia).filter(Boolean))].sort();
  const servizi = [...new Set(items.flatMap((i) => i.serviziRealizzati || []))].sort();
  const tags = [...new Set(items.flatMap((i) => i.tags || []))].sort();

  return (
    <>
      <Header />
      <MobileMenu />
      <section className="portfolio-index-hero">
        <div className="section-head" style={{ marginBottom: "40px" }}>
          <div>
            <span className="section-label">Portfolio</span>
            <h1 className="section-title" style={{ fontSize: "clamp(32px,5vw,56px)" }}>
              Tutti i progetti
            </h1>
          </div>
          <p>
            Hotel, host e architettura raccontati per immagini: filtra per tipologia, servizio o
            tag.
          </p>
        </div>
        <PortfolioFilterGrid items={items} tipologie={tipologie} servizi={servizi} tags={tags} />
      </section>
      <Footer />
      <ClientInteractions />
    </>
  );
}
