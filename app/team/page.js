import Header from "../../components/Header";
import MobileMenu from "../../components/MobileMenu";
import Footer from "../../components/Footer";
import ClientInteractions from "../../components/ClientInteractions";
import { team, teamIntro, partners } from "../../lib/teamContent";
import "../../styles/team.css";

export const metadata = {
  title: "Team — CICO",
  description:
    "Fotografo, interior designer, set designer e photo editor: la squadra CICO e la rete di professionisti con cui collaboriamo.",
};

function initials(name) {
  const w = name.split(" ");
  return (w[0][0] + (w[1] ? w[1][0] : "")).toUpperCase();
}

export default function TeamPage() {
  return (
    <div className="pg-team">
      <Header />
      <MobileMenu />
      <main className="team-page">
        <section className="team-hero">
          <span className="eyebrow">Team</span>
          <h1>
            La <span className="hl">squadra</span>
          </h1>
        </section>

        <section className="members">
          {team.map((m, i) => (
            <article className={`member${i % 2 ? " rev" : ""}`} key={m.name}>
              <div className="member-photo">
                <img src={m.photo} alt={`${m.name}, ${m.role}`} width="720" height="900" loading="lazy" />
              </div>
              <div className="member-body">
                <span className="member-role">{m.role}</span>
                <h3>{m.name}</h3>
                {m.bio.map((p, k) => (
                  <p key={k}>{p}</p>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="network">
          <h2>
            Una rete di <span className="hl">competenze</span>
          </h2>
          <p className="lead">{teamIntro}</p>
          <ul className="partners">
            {partners.map((p) => (
              <li className="partner" key={p.name}>
                <div className="partner-logo">
                  {p.logo ? <img src={p.logo} alt={`Logo ${p.name}`} loading="lazy" /> : <span className="mono">{initials(p.name)}</span>}
                </div>
                <h3>{p.name}</h3>
                <p>{p.role}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Segnaposto: quando i loghi dei clienti saranno disponibili, sostituire con la griglia di loghi */}
        <section className="clients">
          <h2>
            Hanno scelto il nostro <span className="hl">lavoro</span>
          </h2>
          <div className="clients-ph">Qui andrà una selezione di loghi di clienti</div>
        </section>
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
