// "Esperienza specifica nell'hospitality" (o equivalente per Host/B&B):
// eyebrow + intro + 3 blocchi affiancati.
export default function WhySection({ label, intro, items }) {
  return (
    <section className="why-section">
      <div className="section-head" style={{ maxWidth: "640px", marginLeft: 0 }}>
        <span className="section-label">{label}</span>
        {intro && <p style={{ marginTop: "14px" }}>{intro}</p>}
      </div>
      <div className="why-grid">
        {items.map((item) => (
          <div className="why-item" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
