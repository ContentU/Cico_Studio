import Link from "next/link";
import Sparkle from "../Sparkle";
import Media from "./Media";

// "Esperienza specifica": card sovrapposte che si impilano allo scroll
// (reference: studiomodular.be/services). Effetto in CSS (`position:sticky`),
// attivato dalla classe `can-sticky` che aggiunge ServiceInteractions solo su
// desktop e solo se la card più alta sta nel viewport. 2 o 3 card (colori
// c1 giallo, c2 anguria, c3 teal).
export default function WhyStack({ why, images }) {
  return (
    <section className="why2">
      <div className="wrap" style={{ textAlign: "center" }}>
        <span className="eyebrow">{why.eyebrow}</span>
      </div>
      {why.statement && <p className="statement wrap">{why.statement}</p>}
      <div className="stack" id="stack" style={{ "--n": why.cards.length }}>
        {why.cards.map((c, i) => (
          <article className={`scard c${i + 1}`} style={{ "--i": i }} key={c.title}>
            <Sparkle className="ico" />
            <h3>{c.title}</h3>
            <Media media={images[i]} className="shot" />
            <div className="foot">
              <p>{c.body}</p>
              <Link href="/contatti" className="more">
                Scopri di più
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
