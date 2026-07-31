const text =
  "CICO è il centro immagine e comunicazione per l'ospitalità. Lavoriamo con hotel, host e studi di architettura per trasformare spazi ed esperienze in contenuti che comunicano, convertono e restano.";
const accentWords = ["comunicano,", "convertono", "restano."];

export default function MainText() {
  const words = text.split(" ");
  return (
    <section className="main-text-section" id="main-text">
      <p className="main-text" id="revealText">
        {words.map((w, i) => (
          <span
            className={"word" + (accentWords.includes(w) ? " accent" : "")}
            key={i}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </p>
    </section>
  );
}
