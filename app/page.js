import Header from "../components/Header";
import MobileMenu from "../components/MobileMenu";
import Hero from "../components/Hero";
import MainText from "../components/MainText";
import Portfolio from "../components/Portfolio";
import HeroExpand from "../components/HeroExpand";
import PhotoBand from "../components/PhotoBand";
import Perche from "../components/Perche";
import Blog from "../components/Blog";
import Footer from "../components/Footer";
import ClientInteractions from "../components/ClientInteractions";

export default function Home() {
  return (
    <>
      <Header />
      <MobileMenu />
      <Hero />
      <HeroExpand />
      <MainText />
      <Portfolio />
      <Perche />
      <PhotoBand />
      <Blog />
      <Footer />
      <ClientInteractions />
    </>
  );
}
