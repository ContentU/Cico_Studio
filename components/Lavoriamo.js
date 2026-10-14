import Link from "next/link";

export default function Lavoriamo() {
  return (
    <section className="lavoriamo" id="lavoriamo">
      <div className="section-head">
        <div>
          <span className="section-label">Cosa realizziamo</span>
          <h2 className="section-title">Ogni immagine secondo una tua esigenza</h2>
        </div>
      </div>
      <div className="lavoriamo-cards">
        <Link href="/fotografia-hotel" className="lav-card lav-main has-img" style={{ "--img": "url(/images/servizi/hotel_brand.webp)" }}>
          <div>
            <h3>Immagini per raccontare</h3>
            <p>Fotografia evocativa per brand e comunicazione.</p>
            <span className="btn-tertiary on-image">
              Scopri di più <span className="arrow">→</span>
            </span>
          </div>
        </Link>
        <Link href="/fotografia-hotel" className="lav-card lav-main has-img" style={{ "--img": "url(/images/servizi/hotel_OTA.webp)" }}>
          <div>
            <h3>Immagini per descrivere</h3>
            <p>Fotografia descrittiva per OTA e prenotazioni.</p>
            <span className="btn-tertiary on-image">
              Scopri di più <span className="arrow">→</span>
            </span>
          </div>
        </Link>
        <Link href="/video-hotel" className="lav-card lav-main has-img" style={{ "--img": "url(/images/servizi/video_1-poster.webp)" }}>
          <span className="lav-play" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 4l14 8-14 8z" /></svg>
          </span>
          <div>
            <h3>Video emozionali</h3>
            <p>Brand film e video per la tua comunicazione.</p>
            <span className="btn-tertiary on-image">
              Scopri di più <span className="arrow">→</span>
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
