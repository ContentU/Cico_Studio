// "Scheda" tecnica del progetto: descrizione a sinistra, specifiche
// strutturate a destra. Ogni riga viene mostrata solo se il relativo campo
// ACF è valorizzato, così la scheda si adatta ai progetti con dati parziali.
export default function Scheda({ item }) {
  const rows = [
    { label: "Tipologia", value: item.tipologia },
    { label: "Località", value: item.localita },
    { label: "Cliente", value: item.cliente },
    {
      label: "Servizi realizzati",
      value: item.serviziRealizzati?.length ? item.serviziRealizzati.join(", ") : null,
    },
    { label: "Anno", value: item.anno },
  ].filter((r) => r.value);

  return (
    <section className="scheda-section">
      <div className="scheda-desc">
        <p>{item.descrizioneBreve}</p>
      </div>
      <div className="scheda-specs">
        {rows.map((r) => (
          <div className="spec-row" key={r.label}>
            <span className="label">{r.label}</span>
            <span className="value">{r.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
