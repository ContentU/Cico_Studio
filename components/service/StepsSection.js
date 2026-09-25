// Sezione a due colonne "Un servizio costruito intorno alla struttura":
// titolo a sinistra (sticky su desktop), step numerati a destra. L'ultimo
// step può avere un link (es. "Approfondisci come lavoriamo →").
export default function StepsSection({ title, steps }) {
  return (
    <section className="steps-section">
      <div className="steps-title">
        <h2>{title}</h2>
      </div>
      <div className="steps-list">
        {steps.map((step, i) => (
          <div className="step-item" key={step.title}>
            <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h4>{step.title}</h4>
              <p>
                {step.body}
                {step.link && (
                  <>
                    {" "}
                    <a href={step.link.href} className="btn-tertiary" style={{ fontSize: "14px" }}>
                      {step.link.label} <span className="arrow">→</span>
                    </a>
                  </>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
