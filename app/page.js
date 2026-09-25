import Header from "../components/Header";
import MobileMenu from "../components/MobileMenu";
import Hero from "../components/Hero";
import MainText from "../components/MainText";
import Portfolio from "../components/Portfolio";
import Servizi from "../components/Servizi";
import Lavoriamo from "../components/Lavoriamo";
import Blog from "../components/Blog";
import Footer from "../components/Footer";
import ClientInteractions from "../components/ClientInteractions";
import { getAllPortfolio } from "../lib/wp";

export default async function Home() {
  const portfolioHome = (await getAllPortfolio()).slice(0, 6);

  return (
    <>
      <div className="font-note">
        Font di brand attivi (TT Travel Next + Apfel Grotezk). Foto e testi sono
        ancora segnaposto.
      </div>
      <Header />
      <MobileMenu />
      <Hero />
      <MainText />
      <Portfolio items={portfolioHome} />
      <Servizi />
      <Lavoriamo />
      <Blog />
      <Footer />
      <ClientInteractions />
    </>
  );
}
