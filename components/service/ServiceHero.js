import { Lines } from "./lines";
import Media from "./Media";

// Hero della pagina di servizio (Figma "hotel"): titolo, immagine larga e,
// sotto, testo introduttivo accanto al ritratto verticale. Le immagini sono
// segnaposto (`.ph`) finché non arrivano le foto definitive.
export default function ServiceHero({ hero, images }) {
  return (
    <section className="hero2">
      <div className="wrap" style={{ paddingBottom: 0 }}>
        <h1 className="h-display teal">
          <Lines text={hero.title} />
        </h1>
        <div
          className="hero2-box"
          style={{ marginTop: 28, marginLeft: 0, marginRight: 0, maxWidth: 1145 }}
        >
          <div className="hero2-media media-fill" title={hero.mediaNote || undefined}>
            <picture>
              <source media="(max-width:700px)" srcSet={images.cover.mobile} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={images.cover.desktop} alt={images.cover.alt} width="2000" height="1125" />
            </picture>
          </div>
          <div className="hero2-row">
            <div className="hero2-text">
              <p className="hero2-lead">{hero.lead}</p>
              <p className="hero2-body">
                <span className="cico">cico</span> {hero.body}
              </p>
            </div>
            <Media media={images.portrait} className="hero2-portrait" />
          </div>
        </div>
      </div>
    </section>
  );
}
