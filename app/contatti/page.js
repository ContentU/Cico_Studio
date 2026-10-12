import Header from "../../components/Header";
import MobileMenu from "../../components/MobileMenu";
import Footer from "../../components/Footer";
import ClientInteractions from "../../components/ClientInteractions";
import ContactForm from "../../components/contatti/ContactForm";
import { footerLinks } from "../../lib/content";
import "../../styles/contatti.css";

export const metadata = {
  title: "Contatti — CICO",
  description:
    "Raccontaci il tuo progetto: bastano poche righe per cominciare. Ti rispondiamo entro un giorno lavorativo.",
};

export default function ContattiPage() {
  const c = footerLinks.contatti;
  return (
    <div className="pg-contatti">
      <Header />
      <MobileMenu />
      <main className="contact-page">
        <div className="wrap">
          <div className="contact-top">
            <span className="section-label">Contatti</span>
            <h1>
              Raccontaci il tuo <span className="hl">progetto.</span>
            </h1>
            <p className="intro">
              Bastano poche righe per cominciare: dicci chi sei e cosa hai in mente. Ti rispondiamo
              entro un giorno lavorativo e, se serve, ti chiediamo noi i dettagli in un secondo
              momento.
            </p>
          </div>

          <div className="contact-grid">
            <ContactForm />

            <aside>
              <div className="aside-card">
                <h3>Cosa succede dopo</h3>
                <ol className="steps">
                  <li>
                    <div>
                      <b>Ti rispondiamo entro un giorno.</b> Una breve risposta per capire se e come
                      possiamo aiutarti.
                    </div>
                  </li>
                  <li>
                    <div>
                      <b>Ti chiediamo i dettagli.</b> Solo quelli utili: struttura, tempi, utilizzi
                      delle immagini.
                    </div>
                  </li>
                  <li>
                    <div>
                      <b>Ricevi una proposta.</b> Chiara, con tempi e costi, senza impegno.
                    </div>
                  </li>
                </ol>
              </div>
              <div className="aside-card">
                <h3>Preferisci scriverci direttamente?</h3>
                <div className="aside-list">
                  <a href={`mailto:${c.email}`}>
                    <small>Email</small>
                    {c.email}
                  </a>
                  <a href={`tel:${c.telefono.replace(/\s/g, "")}`}>
                    <small>Telefono</small>
                    {c.telefono}
                  </a>
                  <div>
                    <small>Studio</small>
                    {c.indirizzo}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer
        slim
        claim={
          <>
            Parliamo della <span className="hl">tua struttura</span>
          </>
        }
      />
      <ClientInteractions />
    </div>
  );
}
