export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="blob blob-teal"></div>
      <div className="blob blob-pink"></div>
      <div className="hero-inner">
        <h1>
          Raccontiamo
          <br />
          l&apos;ospitalità che
          <br />
          <span>lascia il sogno.</span>
        </h1>
        <p className="hero-sub">
          Fotografia, video e contenuti social per hotel, host e progetti di
          architettura in Sicilia e oltre.
        </p>
        <div className="hero-actions">
          <a href="#portfolio" className="btn-primary">
            Scopri il portfolio <span className="arrow">→</span>
          </a>
        </div>
      </div>
      <a href="#main-text" className="scroll-badge" aria-label="scorri">
        <svg viewBox="0 0 100 100">
          <defs>
            <path
              id="circlePath"
              d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
            />
          </defs>
          <circle cx="50" cy="50" r="48" fill="var(--cream)" stroke="rgba(44,14,55,0.15)" />
          <text fontSize="9.5" letterSpacing="2" fill="#2C0E37">
            <textPath href="#circlePath">SCROLL · SCROLL · SCROLL · </textPath>
          </text>
        </svg>
        <span className="arrow">↓</span>
      </a>
    </section>
  );
}
