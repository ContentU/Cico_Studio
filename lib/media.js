import { brandColors } from "./content";

// Stile di copertina per le card (Portfolio e Blog): se c'è un'immagine reale
// (Featured Image di WordPress) la usa come sfondo "cover", altrimenti ricade
// sul gradiente segnaposto di brand. `className` va aggiunto alla card per
// nascondere la scritta "foto in arrivo" quando l'immagine c'è.
export function coverProps(src, i = 0, alpha = ["33", "66"], offset = 1) {
  if (src) {
    return {
      className: "has-image",
      style: {
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
    };
  }
  return {
    className: "",
    style: {
      background: `linear-gradient(135deg, ${brandColors[i % 4]}${alpha[0]}, ${
        brandColors[(i + offset) % 4]
      }${alpha[1]})`,
    },
  };
}
