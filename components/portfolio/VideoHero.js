// Sezione Video, subito dopo la Gallery: un solo video hero 16:9, embed
// YouTube da campo ACF `video_hero` (oEmbed). Se il campo è vuoto o l'URL
// non è riconosciuto, la sezione semplicemente non viene renderizzata.
export default function VideoHero({ item }) {
  if (!item.videoHeroId) return null;

  return (
    <section className="video-hero-section">
      <div className="section-head" style={{ padding: 0, marginBottom: "32px" }}>
        <div>
          <span className="section-label">Video</span>
          <h2 className="section-title" style={{ fontSize: "clamp(24px,2.6vw,32px)" }}>
            Il progetto in movimento
          </h2>
        </div>
      </div>
      <div className="video-hero-frame">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${item.videoHeroId}`}
          title={`Video — ${item.title}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </section>
  );
}
