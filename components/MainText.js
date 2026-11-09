const text =
  "Siamo CICO e abbiamo un'ossessione: far venire voglia di prenotare. Foto e video per hotel, B&B, ville e appartamenti che si fanno notare, convincono e vengono scelti.";
const accentWords = ["prenotare.", "notare,", "convincono", "scelti."];

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
