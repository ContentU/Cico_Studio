// Titolo pagina + intro editoriale (blockquote), condivisi da tutte le
// pagine di servizio (Hotel/Host/B&B — stessa struttura, testi diversi).
export default function ServiceHero({ h1, subtitle, intro }) {
  return (
    <>
      <section className="service-hero">
        <h1>{h1}</h1>
        {subtitle && <p className="subtitle">{subtitle}</p>}
      </section>
      {intro && intro.length > 0 && (
        <section className="service-intro">
          <blockquote>
            {intro.map((para, i) => (
              <span key={i}>
                {para}
                {i < intro.length - 1 && (
                  <>
                    <br />
                    <br />
                  </>
                )}
              </span>
            ))}
          </blockquote>
        </section>
      )}
    </>
  );
}
