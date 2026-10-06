"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Sparkle from "../Sparkle";

// Validazione lato client (stesse regole del prototipo) + POST a /api/contatti.
const rules = {
  nome: (f) => f.nome.trim().length > 1,
  email: (f) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim()),
  telefono: (f) => !f.telefono.trim() || /^[+()\d\s.-]{6,}$/.test(f.telefono.trim()),
  tipologia: (f) => !!f.tipologia,
  privacy: (f) => f.privacy,
};

const initial = {
  nome: "",
  telefono: "",
  email: "",
  tipologia: "",
  messaggio: "",
  preferenza: "",
  privacy: false,
  website: "", // honeypot
};

export default function ContactForm() {
  const [values, setValues] = useState(initial);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const cardRef = useRef(null);

  const set = (name, value) => setValues((v) => ({ ...v, [name]: value }));
  const touch = (name) => setTouched((t) => ({ ...t, [name]: true }));
  const invalid = (name) => touched[name] && !rules[name](values);

  async function onSubmit(e) {
    e.preventDefault();
    if (values.website) return; // honeypot: i bot compilano questo campo
    const allTouched = Object.fromEntries(Object.keys(rules).map((k) => [k, true]));
    setTouched(allTouched);
    const firstBad = Object.keys(rules).find((k) => !rules[k](values));
    if (firstBad) {
      document.querySelector(`[name="${firstBad}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contatti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("sent");
      cardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className={`form-card${status === "sent" ? " sent" : ""}`} id="formCard" ref={cardRef}>
      <form id="contactForm" noValidate onSubmit={onSubmit}>
        <div className="hp" aria-hidden="true">
          <label>
            Non compilare questo campo{" "}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={values.website}
              onChange={(e) => set("website", e.target.value)}
            />
          </label>
        </div>

        <div className="row2">
          <label className={`field${invalid("nome") ? " invalid" : ""}`}>
            <span>
              Nome e cognome <b className="req">*</b>
            </span>
            <input
              className="input"
              type="text"
              name="nome"
              autoComplete="name"
              required
              value={values.nome}
              onChange={(e) => set("nome", e.target.value)}
              onBlur={() => touch("nome")}
            />
            <div className="err">Inserisci il tuo nome.</div>
          </label>
          <label className={`field${invalid("telefono") ? " invalid" : ""}`}>
            <span>
              Telefono <em>(facoltativo)</em>
            </span>
            <input
              className="input"
              type="tel"
              name="telefono"
              autoComplete="tel"
              inputMode="tel"
              value={values.telefono}
              onChange={(e) => set("telefono", e.target.value)}
              onBlur={() => touch("telefono")}
            />
            <div className="err">Numero non valido.</div>
          </label>
        </div>

        <label className={`field${invalid("email") ? " invalid" : ""}`}>
          <span>
            Email <b className="req">*</b>
          </span>
          <input
            className="input"
            type="email"
            name="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            onBlur={() => touch("email")}
          />
          <div className="err">Inserisci un indirizzo email valido.</div>
        </label>

        <label className={`field${invalid("tipologia") ? " invalid" : ""}`}>
          <span>
            Di cosa ti occupi? <b className="req">*</b>
          </span>
          <select
            className="input"
            name="tipologia"
            required
            value={values.tipologia}
            onChange={(e) => {
              set("tipologia", e.target.value);
              touch("tipologia");
            }}
            onBlur={() => touch("tipologia")}
          >
            <option value="">Seleziona una tipologia</option>
            <optgroup label="Strutture ricettive">
              <option>Hotel</option>
              <option>Boutique hotel</option>
              <option>Resort</option>
              <option>B&amp;B</option>
              <option>Masseria / dimora storica</option>
            </optgroup>
            <optgroup label="Immobili">
              <option>Appartamento</option>
              <option>Villa</option>
              <option>Immobile di pregio</option>
              <option>Casa vacanze / affitti brevi</option>
              <option>Property manager</option>
            </optgroup>
            <optgroup label="Altro">
              <option>Studio di architettura / interior design</option>
              <option>Ristorante / food &amp; drink</option>
              <option>Altro</option>
            </optgroup>
          </select>
          <div className="err">Seleziona una tipologia.</div>
        </label>

        <label className="field">
          <span>
            Raccontaci in breve cosa ti serve <em>(facoltativo)</em>
          </span>
          <textarea
            className="input"
            name="messaggio"
            placeholder="Es. Stiamo per aprire un nuovo hotel e ci servono foto per sito e OTA entro maggio."
            value={values.messaggio}
            onChange={(e) => set("messaggio", e.target.value)}
          />
        </label>

        <div className="legend">
          Come preferisci essere ricontattato? <em>(facoltativo)</em>
        </div>
        <div className="chips">
          {[
            ["email", "Email"],
            ["telefono", "Telefono"],
            ["whatsapp", "WhatsApp"],
          ].map(([val, label]) => (
            <label className="chip" key={val}>
              <input
                type="radio"
                name="preferenza"
                value={val}
                checked={values.preferenza === val}
                onChange={() => set("preferenza", val)}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>

        <label className={`consent${invalid("privacy") ? " invalid" : ""}`}>
          <input
            type="checkbox"
            name="privacy"
            required
            checked={values.privacy}
            onChange={(e) => {
              set("privacy", e.target.checked);
              touch("privacy");
            }}
          />
          <span>
            Ho letto l&apos;<a href="#">informativa privacy</a> e acconsento al trattamento dei dati
            per essere ricontattato.
          </span>
          <div className="err">Per inviare la richiesta serve il tuo consenso.</div>
        </label>

        <div className="submit-row">
          <button type="submit" className="btn-primary" disabled={status === "sending"}>
            {status === "sending" ? "Invio in corso…" : "Invia richiesta"}{" "}
            <span className="arrow">→</span>
          </button>
          <small>Ci vuole meno di un minuto.</small>
        </div>
        {status === "error" && (
          <p role="alert" style={{ marginTop: 14, color: "var(--watermelon)", fontSize: 14 }}>
            Non siamo riusciti a inviare la richiesta. Riprova tra poco oppure scrivici a
            hello@cicostudio.it.
          </p>
        )}
      </form>

      <div className="success" role="status" aria-live="polite">
        <Sparkle />
        <h2>Grazie, abbiamo ricevuto la tua richiesta.</h2>
        <p>
          Ti rispondiamo entro un giorno lavorativo all&apos;indirizzo che ci hai lasciato. Nel
          frattempo puoi dare un&apos;occhiata ai{" "}
          <Link href="/portfolio" className="btn-tertiary">
            progetti recenti <span className="arrow">→</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
