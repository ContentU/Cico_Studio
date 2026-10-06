import Link from "next/link";
import BrandMark from "./Logo";
import { footerLinks } from "../lib/content";

// Footer condiviso da tutte le pagine.
// - `claim`: contenuto del titolo (default: claim della home)
// - `newsletter`: mostra il campo email (oggi solo segnaposto, in attesa
//   dell'integrazione Brevo)
// - `slim`: nelle pagine di servizio/blog/contatti mostra solo l'email
//   (niente telefono/indirizzo/social segnaposto)
export default function Footer({ claim, newsletter = true, slim = false }) {
  return (
    <footer id="contatti">
      <div className="footer-top">
        <h2 className="footer-claim">
          {claim || (
            <>
              Pronti a raccontare
              <br />
              il <span className="hl">vostro spazio</span>?
            </>
          )}
        </h2>
        <Link href="/contatti" className="btn-primary on-dark">
          Inizia il progetto <span className="arrow">→</span>
        </Link>
      </div>
      <div className="footer-grid">
        <div>
          <Link href="/" className="footer-logo">
            <BrandMark />
          </Link>
          <p className="footer-tagline">
            Centro Immagine e Comunicazione per l&apos;Ospitalità. Palermo, Sicilia.
          </p>
          {newsletter && (
            <div className="newsletter-form">
              <input type="email" placeholder="La tua email" aria-label="La tua email" />
              <a href="#" className="btn-secondary on-dark" style={{ padding: "10px 16px" }}>
                Iscriviti
              </a>
            </div>
          )}
        </div>
        <div className="footer-col">
          <h5>Servizi</h5>
          {footerLinks.servizi.map((l) => (
            <Link href={l.href} key={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
        <div className="footer-col">
          <h5>Esplora</h5>
          {footerLinks.esplora.map((l) => (
            <Link href={l.href} key={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
        <div className="footer-col">
          <h5>Contatti</h5>
          <a href={`mailto:${footerLinks.contatti.email}`}>{footerLinks.contatti.email}</a>
          {!slim && (
            <>
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
            </>
          )}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 CICO. Tutti i diritti riservati.</span>
        <span>Privacy Policy · Termini di servizio</span>
      </div>
    </footer>
  );
}
