import Link from "next/link";

// Frase di posizionamento + 4 foto fisse + link al portfolio completo
// (sezione 2 del documento del cliente). Per cambiare le foto: public/images/home/.
const IMAGES = [
  { src: "/images/home/home-hotel.webp", cap: "Fotografia hotel", alt: "Pergolato e piscina di un hotel in luce calda" },
  { src: "/images/home/home-lifestyle.webp", cap: "Lifestyle", alt: "Relax a bordo piscina su un lettino con cappello di paglia" },
  { src: "/images/home/home-food.webp", cap: "Food & beverage", alt: "Colazione con cappuccino, dolci e succo d'arancia" },
  { src: "/images/home/home-interior.webp", cap: "Interior", alt: "Camera con letto a baldacchino e grandi finestre" },
];

export default function HomeImages() {
  return (
    <section className="home-images" id="immagini">
      <p className="positioning">
        Fotografia professionale, video e contenuti visuali per hotel, B&amp;B e alloggi turistici, in Sicilia e oltre.
      </p>
      <div className="hi-grid">
        {IMAGES.map((im) => (
          <figure className="hi-item" key={im.src}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={im.src} alt={im.alt} loading="lazy" />
            <figcaption>{im.cap}</figcaption>
          </figure>
        ))}
      </div>
      <div className="hi-link">
        <Link href="/portfolio" className="btn-tertiary">
          Scopri il portfolio completo <span className="arrow">→</span>
        </Link>
      </div>
    </section>
  );
}
