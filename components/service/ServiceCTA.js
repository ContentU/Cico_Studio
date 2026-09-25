// Paragrafo introduttivo prima del footer/CTA condiviso (che resta lo
// stesso <Footer/> di tutto il sito, non duplicato qui).
export default function ServiceCTA({ text }) {
  if (!text) return null;
  return (
    <div className="service-cta-block">
      <p>{text}</p>
    </div>
  );
}
