// Accordion generico, riusato sia per le card "obiettivi diversi" delle
// pagine di servizio sia per la FAQ. Markup statico (Server Component): il
// comportamento open/close è gestito in modo generico e difensivo da
// ClientInteractions.js, per restare coerente con il resto del progetto
// (un solo posto per tutta l'interazione client-side).
//
// items: [{ title: string, blocks: [{ type:'p', text } | { type:'ul', items:[...] }] }]
export default function Accordion({ items, className = "" }) {
  return (
    <div className={`accordion ${className}`.trim()}>
      {items.map((item, i) => (
        <div className="accordion-item" key={item.title || i}>
          <button type="button" className="accordion-header">
            <h3>{item.title}</h3>
            <span className="accordion-icon">+</span>
          </button>
          <div className="accordion-body">
            <div className="accordion-body-inner">
              {item.blocks.map((block, j) =>
                block.type === "ul" ? (
                  <ul key={j}>
                    {block.items.map((li, k) => (
                      <li key={k}>{li}</li>
                    ))}
                  </ul>
                ) : (
                  <p key={j}>{block.text}</p>
                )
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
