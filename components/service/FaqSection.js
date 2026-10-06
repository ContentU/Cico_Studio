import PlusIcon from "./PlusIcon";

// FAQ ad accordion. La prima domanda viene aperta da ServiceInteractions
// (attributo data-open-first).
export default function FaqSection({ faq }) {
  return (
    <section className="wrap faq2">
      <span className="eyebrow">Domande frequenti</span>
      <h2 className="h-display">Tutto quello che c&apos;è da sapere</h2>
      <div className="faq-list" data-open-first>
        {faq.map((f) => (
          <div className="faq-item" key={f.q}>
            <button className="faq-head" type="button" aria-expanded="false">
              <h3>{f.q}</h3>
              <PlusIcon />
            </button>
            <div className="faq-body">
              {f.a.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
