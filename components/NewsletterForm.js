"use client";

import { useState } from "react";

// Iscrizione alla newsletter (footer di tutte le pagine) → POST /api/newsletter
// → Brevo. Iscrizione diretta (senza double opt-in), con consenso privacy
// obbligatorio e campo honeypot anti-bot.
export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [state, setState] = useState({ status: "idle", msg: "" });

  async function onSubmit(e) {
    e.preventDefault();
    if (website) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setState({ status: "error", msg: "Inserisci un indirizzo email valido." });
      return;
    }
    if (!consent) {
      setState({ status: "error", msg: "Per iscriverti serve il tuo consenso." });
      return;
    }
    setState({ status: "sending", msg: "" });
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), consent, website }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState({ status: "ok", msg: "Grazie, sei iscritto!" });
      setEmail("");
      setConsent(false);
    } catch {
      setState({ status: "error", msg: "Non siamo riusciti a completare l'iscrizione. Riprova tra poco." });
    }
  }

  return (
    <form className="newsletter-form" onSubmit={onSubmit} noValidate>
      <div className="hp" aria-hidden="true">
        <label>
          Non compilare
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
      </div>
      <div className="nl-row">
        <input
          type="email"
          name="email"
          placeholder="La tua email"
          aria-label="La tua email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="btn-secondary on-dark" disabled={state.status === "sending"}>
          {state.status === "sending" ? "Invio…" : "Iscriviti"}
        </button>
      </div>
      <label className="nl-consent">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>
          Acconsento al trattamento dei dati per ricevere la newsletter. <a href="#">Informativa privacy</a>
        </span>
      </label>
      <p className={`nl-msg${state.status === "ok" ? " ok" : state.status === "error" ? " err" : ""}`} role="status" aria-live="polite">
        {state.msg}
      </p>
    </form>
  );
}
