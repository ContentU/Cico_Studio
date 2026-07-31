import { servizi, brandColors } from "../lib/content";

export default function Servizi() {
  return (
    <section className="servizi-pin" id="servizi">
      <div className="servizi-sticky">
        <div className="servizi-inner">
          <span className="section-label">Servizi</span>
          <div className="servizi-columns">
            <div className="servizi-list" id="serviziList">
              {servizi.map((s, i) => (
                <div
                  className={"s-item" + (i === 0 ? " active" : "")}
                  data-i={i}
                  data-num={s.num}
                  key={s.name}
                >
                  {s.name}
                </div>
              ))}
            </div>
            <div className="servizi-panels" id="serviziTrack">
              {servizi.map((s, i) => (
                <div className={"s-panel" + (i === 0 ? " active" : "")} key={s.name}>
                  <h4>{s.lead}</h4>
                  <p>{s.desc}</p>
                  <div className="tags">
                    {s.tags.map((t) => (
                      <span
                        className="tag"
                        key={t}
                        style={{
                          borderColor: brandColors[i % 3],
                          color: brandColors[i % 3],
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="servizi-progress">
          <div className="servizi-progress-bar" id="serviziProgress"></div>
        </div>
      </div>
    </section>
  );
}
