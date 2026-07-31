export default function Lavoriamo() {
  return (
    <section className="lavoriamo" id="lavoriamo">
      <div className="section-head">
        <div>
          <span className="section-label">Come lavoriamo</span>
          <h2 className="section-title">Ascoltiamo, prima di scattare</h2>
        </div>
        <p>
          Il nostro processo parte dall&apos;ascolto e arriva a contenuti pronti
          per ogni canale.
        </p>
      </div>
      <div className="lavoriamo-cards">
        <a
          href="#"
          className="lav-card lav-main"
          style={{
            gridColumn: 1,
            gridRow: "1/3",
            background: "linear-gradient(160deg,#0E7173,#123f40)",
          }}
        >
          <div>
            <h3>Il nostro processo</h3>
            <p>Dall&apos;ascolto alla consegna, passo dopo passo.</p>
            <span className="btn-tertiary on-image">
              Scopri di più <span className="arrow">→</span>
            </span>
          </div>
        </a>
        <div
          className="lav-card"
          style={{
            gridColumn: 2,
            gridRow: 1,
            background: "linear-gradient(135deg,#ED254E33,#f7c9d3)",
          }}
        />
        <div
          className="lav-card lav-colored"
          style={{ gridColumn: 2, gridRow: 2, background: "var(--violet)" }}
        >
          <h3>Sopralluogo e shooting</h3>
          <p>Raccontiamo lo spazio dal vivo.</p>
        </div>
        <a
          href="#"
          className="lav-card lav-main"
          style={{
            gridColumn: 3,
            gridRow: "1/3",
            background: "linear-gradient(160deg,#2C0E37,#54234f)",
          }}
        >
          <div>
            <h3>Consegna e strategia</h3>
            <p>Contenuti pronti per ogni canale.</p>
            <span className="btn-tertiary on-image">
              Richiedi una consulenza <span className="arrow">→</span>
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}
