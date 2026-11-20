import { Thumb } from "../service/VideoGallery";

// Fino a 3 reel verticali (campi ACF reel_1..3). Se non ce ne sono, la
// sezione non viene mostrata.
export default function Reels({ item }) {
  if (!item.reelIds?.length) return null;
  return (
    <section className="video-hero-section reels-section">
      <div className="section-head" style={{ padding: 0, marginBottom: "32px" }}>
        <div>
          <span className="section-label">Reel</span>
          <h2 className="section-title" style={{ fontSize: "clamp(24px,2.6vw,32px)" }}>
            In formato social
          </h2>
        </div>
      </div>
      <div className="vg-grid vg-reel" style={{ marginTop: 0 }}>
        {item.reelIds.map((id, i) => (
          <Thumb key={id} id={id} vertical label={`Reel ${i + 1} — ${item.title}`} />
        ))}
      </div>
    </section>
  );
}
