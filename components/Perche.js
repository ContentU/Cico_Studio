import Link from "next/link";
import TestimonialAudio from "./TestimonialAudio";

// "Perché CICO": testimonianza (con audio), esperienza e team.
// Audio: public/audio/testimonianza.mp3. Testo e consenso alla pubblicazione
// della testimonianza vanno confermati con il cliente.
export default function Perche() {
  return (
    <section className="perche" id="perche">
      <div className="pc-head">
        <span className="section-label">Perché CICO</span>
        <h2 className="section-title">Fotografare l&apos;ospitalità è il nostro mestiere.</h2>
      </div>
      <div className="pc-grid">
        <article className="pc-card pc-big">
          <p className="pc-quote">«Sono i soldi meglio spesi nella mia vita.»</p>
          <p className="pc-text">
            «Dopo il tuo servizio fotografico è stata la svolta. [...] Ho lavorato ininterrottamente da marzo [...] È stato un successone.»
          </p>
          <p className="pc-by">Testimonianza reale di Maria R.</p>
          <TestimonialAudio src="/audio/testimonianza.mp3" />
        </article>
        <article className="pc-card pc-small pc-exp">
          <h3>Fotografia per l&apos;ospitalità dal 2010.</h3>
          <p>Esperienza sul campo, webinar e formazione per i professionisti del settore.</p>
        </article>
        <article className="pc-card pc-small pc-team">
          <h3>Un team, competenze diverse.</h3>
          <p>Fotografia, video, styling e postproduzione, con i professionisti giusti per ogni progetto.</p>
          <Link href="/team" className="btn-tertiary">
            Conosci CICO e il team <span className="arrow">→</span>
          </Link>
        </article>
      </div>
    </section>
  );
}
