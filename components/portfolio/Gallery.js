import { brandColors } from "../../lib/content";

// Griglia quadrata 1:1: 4 colonne desktop/tablet, 2 su mobile (vedi
// .gallery-grid in globals.css). Con immagini reali (item.gallery, da
// acf.photo_gallery.gallery) ogni tile apre il lightbox a scorrimento
// gestito in ClientInteractions.js; senza immagini reali mostra 8
// placeholder colorati "foto in arrivo", non cliccabili.
const PLACEHOLDER_COUNT = 8;

export default function Gallery({ item }) {
  const images = item.gallery && item.gallery.length ? item.gallery : null;

  return (
    <section className="gallery-section">
      <div className="section-head" style={{ padding: 0, marginBottom: "32px" }}>
        <div>
          <span className="section-label">Gallery</span>
          <h2 className="section-title" style={{ fontSize: "clamp(24px,2.6vw,32px)" }}>
            Il progetto per immagini
          </h2>
        </div>
      </div>

      <div className="gallery-grid" id="galleryGrid">
        {images
          ? images.map((img, i) => (
              <button
                type="button"
                className="g-item has-image"
                key={img.full}
                data-gallery-index={i}
                aria-label={`Apri immagine ${i + 1} di ${images.length}`}
                style={{
                  backgroundImage: `url(${img.grid})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            ))
          : Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
              <div
                className="g-item"
                key={i}
                style={{
                  background: `linear-gradient(135deg, ${brandColors[i % 4]}2e, ${
                    brandColors[(i + 1) % 4]
                  }55)`,
                }}
              />
            ))}
      </div>

      {/* Lightbox a scorrimento: markup sempre presente (nascosto via CSS),
          popolato qui lato server con le immagini full-size; l'interazione
          (apertura/chiusura/scroll-to-index/swipe-up) è in
          ClientInteractions.js, coerente col resto del progetto. */}
      {images && (
        <div className="gallery-lightbox" id="galleryLightbox">
          <button type="button" className="gallery-lightbox-close" id="galleryLightboxClose" aria-label="Chiudi">
            ✕
          </button>
          <div className="gallery-lightbox-track" id="galleryLightboxTrack">
            {images.map((img, i) => (
              <div className="gallery-lightbox-item" key={img.full}>
                <img src={img.full} alt={img.alt || `${item.title} — immagine ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
