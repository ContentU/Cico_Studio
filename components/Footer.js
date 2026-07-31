import BrandMark from "./Logo";
import { footerLinks } from "../lib/content";

export default function Footer() {
  return (
    <footer id="contatti">
      <div className="footer-top">
        <h2 className="footer-claim">
          Pronti a raccontare
          <br />
          il <span className="hl">vostro spazio</span>?
        </h2>
        <a href={`mailto:${footerLinks.contatti.email}`} className="btn-primary on-dark">
          Inizia il progetto <span className="arrow">→</span>
        </a>
      </div>
      <div className="footer-grid">
        <div>
          <a href="#top" className="footer-logo">
            <BrandMark />
          </a>
          <p className="footer-tagline">
            Centro Immagine e Comunicazione per l&apos;Ospitalità. Palermo, Sicilia.
          </p>
          <div className="newsletter-form">
            <input type="email" placeholder="La tua email" />
            <a href="#" className="btn-secondary on-dark" style={{ padding: "10px 16px" }}>
              Iscriviti
            </a>
          </div>
        </div>
        <div className="footer-col">
          <h5>Servizi</h5>
          {footerLinks.servizi.map((l) => (
            <a href={l.href} key={l.label}>
              {l.label}
            </a>
          ))}
        </div>
        <div className="footer-col">
          <h5>Sotto-servizi</h5>
          {footerLinks.sottoServizi.map((l) => (
            <a href={l.href} key={l.label}>
              {l.label}
            </a>
          ))}
        </div>
        <div className="footer-col">
          <h5>Contatti</h5>
          <a href={`mailto:${footerLinks.contatti.email}`}>{footerLinks.contatti.email}</a>
          <a href={`tel:${footerLinks.contatti.telefono.replace(/\s/g, "")}`}>
            {footerLinks.contatti.telefono}
          </a>
          <a href="#">{footerLinks.contatti.indirizzo}</a>
          <div className="socials" style={{ marginTop: "14px" }}>
            <a href="#" aria-label="Instagram">
              IG
            </a>
            <a href="#" aria-label="LinkedIn">
              in
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 CICO. Tutti i diritti riservati.</span>
        <span>Privacy Policy · Termini di servizio</span>
      </div>
    </footer>
  );
}
