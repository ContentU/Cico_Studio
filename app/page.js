import Header from "../components/Header";
import MobileMenu from "../components/MobileMenu";
import Hero from "../components/Hero";
import Portfolio from "../components/Portfolio";
import ServiziHome from "../components/ServiziHome";
import Perche from "../components/Perche";
import Blog from "../components/Blog";
import Footer from "../components/Footer";
import Splash from "../components/Splash";
import ClientInteractions from "../components/ClientInteractions";

// Home: Hero tipografica → Portfolio → Servizi → Perché CICO → Blog → CTA (footer)
export default function Home() {
  return (
    <>
      <Splash />
      <Header />
      <MobileMenu />
      <Hero />
      <Portfolio />
      <ServiziHome />
      <Perche />
      <Blog />
      <Footer />
      <ClientInteractions />
    </>
  );
}
