import Link from "next/link";
import Header from "../../components/Header";
import MobileMenu from "../../components/MobileMenu";
import Footer from "../../components/Footer";
import ClientInteractions from "../../components/ClientInteractions";
import { getAllPortfolio, fotoVideoTags } from "../../lib/wp";
import { coverProps } from "../../lib/media";

export const metadata = {
  title: "Portfolio — CICO",
  description: "Tutti i progetti CICO: hotel, B&B e case vacanza raccontati per immagini.",
};

// Pagina indice Portfolio: tutti i progetti, 3 colonne su desktop e 2 su mobile.
// Nessun filtro visibile: i tag di WordPress servono internamente per
// posizionare i progetti nelle pagine (home, servizi). Sulle card restano
// visibili solo i tag Foto/Video.
export default async function PortfolioIndexPage() {
  const items = await getAllPortfolio();
  return (
    <>
      <Header />
      <MobileMenu />
      <section className="portfolio-index-hero portfolio-all">
        <div className="section-head" style={{ marginBottom: "40px" }}>
          <div>
            <span className="section-label">Portfolio</span>
            <h1 className="section-title" style={{ fontSize: "clamp(32px,5vw,56px)" }}>
              Tutti i progetti
            </h1>
          </div>
          <p>Hotel, B&amp;B e case vacanza raccontati per immagini.</p>
        </div>
        <div className="portfolio-grid">
          {items.map((item, i) => {
            const cover = coverProps(item.heroImage, i);
            return (
              <Link href={`/portfolio/${item.slug}`} className="p-card in-view" key={item.slug}>
                <div className={`p-media ${cover.className}`} style={cover.style} />
                <div className="p-body">
                  <h3>{item.title}</h3>
                  <p className="p-meta">
                    {[item.localita, item.tipologia || item.macroarea].filter(Boolean).join(" · ")}
                  </p>
                  <div className="tags">
                    {fotoVideoTags(item).map((t) => (
                      <span className="tag cat" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      <Footer />
      <ClientInteractions />
    </>
  );
}
