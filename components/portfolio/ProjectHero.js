// Hero a piena larghezza. Se il progetto ha una Featured Image su
// WordPress (heroImage), la usa; altrimenti mostra il placeholder
// "foto in arrivo" già usato nel prototipo statico.
export default function ProjectHero({ item }) {
  return (
    <section className="project-hero">
      {item.heroImage ? (
        <div
          className="hero-media has-image"
          style={{
            backgroundImage: `url(${item.heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ) : (
        <div className="hero-media" />
      )}
    </section>
  );
}
