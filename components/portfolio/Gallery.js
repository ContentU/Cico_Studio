import { brandColors } from "../../lib/content";

// Layout a griglia con span variabili, identico al prototipo statico.
// Usa le immagini reali della Gallery ACF quando presenti (item.gallery),
// altrimenti mostra i placeholder colorati "foto in arrivo".
const PLACEHOLDER_LAYOUT = [
  { col: 2, row: 2 },
  { col: 1, row: 1 },
  { col: 1, row: 1 },
  { col: 1, row: 1 },
  { col: 1, row: 1 },
  { col: 2, row: 1 },
];

export default function Gallery({ item }) {
  const images = item.gallery && item.gallery.length ? item.gallery : null;
  const layout = images ? images.map(() => ({ col: 1, row: 1 })) : PLACEHOLDER_LAYOUT;

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
      <div className="gallery-grid">
        {layout.map((g, i) => (
          <div
            className={`g-item${images ? " has-image" : ""}`}
            key={i}
            style={{
              gridColumn: `span ${g.col}`,
              gridRow: `span ${g.row}`,
              ...(images
                ? {
                    backgroundImage: `url(${images[i]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : {
                    background: `linear-gradient(135deg, ${brandColors[i % 4]}2e, ${
                      brandColors[(i + 1) % 4]
                    }55)`,
                  }),
            }}
          />
        ))}
      </div>
    </section>
  );
}
