import Header from "../../components/Header";
import MobileMenu from "../../components/MobileMenu";
import Footer from "../../components/Footer";
import ClientInteractions from "../../components/ClientInteractions";

export const metadata = {
  title: "Strumenti AI per l'ospitalità — CICO",
  description:
    "Risorse pratiche sull'intelligenza artificiale per chi gestisce hotel, B&B e alloggi turistici. Il Prompt Kit CICO sta arrivando.",
};

// Pagina in preparazione: introduzione + "Coming soon". Verrà sostituita
// dalla descrizione dei contenuti e dal modulo di iscrizione (opt-in).
export default function StrumentiAiPage() {
  return (
    <>
      <Header />
      <MobileMenu />
      <main className="ai-page">
        <span className="ai-eyebrow">Strumenti AI per l&apos;ospitalità</span>
        <h1 className="ai-title">L&apos;AI è utile quando sai cosa chiederle.</h1>
        <p className="ai-lead">
          L&apos;intelligenza artificiale può aiutarti a scrivere testi, organizzare informazioni e sviluppare idee per
          comunicare meglio la tua struttura.
        </p>
        <p className="ai-lead">
          Questo spazio è dedicato a risorse pratiche, semplici da utilizzare e pensate per chi gestisce hotel, B&amp;B e
          alloggi turistici.
        </p>
        <div className="ai-soon">
          <div>
            <h2>Il Prompt Kit CICO sta arrivando.</h2>
            <p>
              Stiamo preparando una raccolta di prompt per aiutarti a utilizzare l&apos;intelligenza artificiale nel lavoro
              quotidiano.
            </p>
          </div>
          <span className="ai-badge">Coming soon</span>
        </div>
      </main>
      <Footer slim />
      <ClientInteractions />
    </>
  );
}
