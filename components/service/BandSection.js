import { Lines } from "./lines";
import PlusIcon from "./PlusIcon";
import Media from "./Media";

// Fascia gialla: eyebrow (CTA), titolo, lead e accordion (chiusi di default;
// il comportamento è in ServiceInteractions.js).
export default function BandSection({ eyebrow, band, images }) {
  return (
    <section className="band">
      <div className="wrap">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="h-display">
          <Lines text={band.title} />
        </h2>
        <p className="lead">{band.lead}</p>
        <div className="rows">
          {band.rows.map((row, ri) => (
            <div className="row" key={row.title}>
              <button className="row-head" type="button" aria-expanded="false">
                <h3>{row.title}</h3>
                <PlusIcon />
              </button>
              <div className="row-body">
                <div className="row-inner">
                  <div className="txt">
                    {row.blocks.map((b, i) =>
                      b.type === "ul" ? (
                        <ul key={i}>
                          {b.items.map((it) => (
                            <li key={it}>{it}</li>
                          ))}
                        </ul>
                      ) : (
                        <p key={i}>{b.text}</p>
                      )
                    )}
                  </div>
                  <Media media={images[ri]} className="row-media" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
