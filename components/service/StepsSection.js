import Link from "next/link";
import Sparkle from "../Sparkle";

// Sezione a due colonne: titolo sticky a sinistra, elenco numerato a destra.
// Il titolo resta fisso durante lo scroll (CSS: `.steps2 h2{position:sticky}`
// con `align-items:start` sulla griglia) e scorre via con l'ultimo elemento.
// Riusata anche per la lista "Cosa può nascere da una produzione" (Video),
// con `intro` sotto il titolo e voci senza testo.
export default function StepsSection({ title, items, intro, extra = false }) {
  return (
    <section className={`wrap steps2${extra ? " steps2-b" : ""}`} style={extra ? { paddingTop: 0 } : undefined}>
      {intro ? (
        <div style={{ position: "sticky", top: 130 }}>
          <h2 className="h-display" style={{ position: "static" }}>
            {title}
          </h2>
          <p style={{ marginTop: 18, fontSize: 18, color: "#5e5e5e", maxWidth: 420 }}>{intro}</p>
        </div>
      ) : (
        <h2 className="h-display">{title}</h2>
      )}
      <div>
        {items.map((it, i) => {
          const item = typeof it === "string" ? { title: it } : it;
          return (
            <div className="step2" key={item.title}>
              <div className="num">
                <Sparkle />
                <b>{String(i + 1).padStart(2, "0")}</b>
              </div>
              <div>
                <h4>{item.title}</h4>
                {item.body && (
                  <p>
                    {item.body}
                    {item.link && (
                      <>
                        {" "}
                        <Link href={item.link.href} className="btn-tertiary" style={{ fontSize: 14 }}>
                          {item.link.label} <span className="arrow">→</span>
                        </Link>
                      </>
                    )}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
