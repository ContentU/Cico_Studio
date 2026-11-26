import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Endpoint del form Contatti (POST /api/contatti).
//
// Cosa fa: valida i dati (stesse regole del client), scarta i bot tramite il
// campo honeypot `website` e consegna la richiesta.
//
// CONSEGNA (in ordine di priorità):
//   0) SMTP (es. casella Aruba): se sono impostate SMTP_USER e SMTP_PASS
//      (host default smtps.aruba.it, porta 465 SSL) la richiesta parte come email
//      da quella casella verso CONTACT_TO_EMAIL (default = SMTP_USER). Variabili
//      solo su Netlify, mai nel codice né su GitHub.
//   1) Brevo (email transazionale): se sono impostate BREVO_API_KEY e
//      CONTACT_FROM_EMAIL (mittente VERIFICATO in Brevo, es. hello@cicostudio.it)
//      la richiesta arriva per email a CONTACT_TO_EMAIL (default hello@cicostudio.it),
//      con "Rispondi a" = email di chi ha scritto. Variabili solo su Netlify,
//      mai nel codice né su GitHub.
//   2) se è impostata la variabile d'ambiente CONTACT_WEBHOOK_URL, la richiesta
//     viene inviata in POST (JSON) a quell'URL: va bene un webhook di
//     Make/Zapier/n8n, un endpoint WordPress o un servizio email;
//   • in sviluppo (NODE_ENV !== "production") senza webhook la richiesta viene
//     solo loggata in console;
//   • in produzione senza webhook risponde 503, così il form mostra
//     l'errore invece di perdere silenziosamente le richieste.
// Punto di innesto per Brevo/email: sostituire il blocco "CONSEGNA" qui sotto.

export const runtime = "nodejs";

const TIPOLOGIE_MAX = 120;

function clean(v, max = 2000) {
  return String(v ?? "").trim().slice(0, max);
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON non valido" }, { status: 400 });
  }

  // Honeypot: rispondiamo "ok" ai bot senza fare nulla
  if (body.website) return NextResponse.json({ ok: true });

  const data = {
    nome: clean(body.nome, 120),
    telefono: clean(body.telefono, 40),
    email: clean(body.email, 160),
    tipologia: clean(body.tipologia, TIPOLOGIE_MAX),
    messaggio: clean(body.messaggio, 3000),
    preferenza: ["email", "telefono", "whatsapp"].includes(body.preferenza) ? body.preferenza : "",
    privacy: body.privacy === true,
    ricevutaIl: new Date().toISOString(),
  };

  const errors = [];
  if (data.nome.length < 2) errors.push("nome");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) errors.push("email");
  if (data.telefono && !/^[+()\d\s.-]{6,}$/.test(data.telefono)) errors.push("telefono");
  if (!data.tipologia) errors.push("tipologia");
  if (!data.privacy) errors.push("privacy");
  if (errors.length) {
    return NextResponse.json({ error: "Dati non validi", fields: errors }, { status: 422 });
  }

  // ---------------- CONSEGNA ----------------
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const brevoKey = process.env.BREVO_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL || "hello@cicostudio.it";
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  if (smtpUser && smtpPass) {
    const port = Number(process.env.SMTP_PORT) || 465;
    const to = process.env.CONTACT_TO_EMAIL || smtpUser;
    const rows = [
      ["Nome", data.nome],
      ["Email", data.email],
      ["Telefono", data.telefono || "—"],
      ["Tipologia", data.tipologia],
      ["Preferenza di contatto", data.preferenza || "—"],
      ["Messaggio", data.messaggio || "—"],
      ["Ricevuta il", data.ricevutaIl],
    ];
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtps.aruba.it",
        port,
        secure: port === 465,
        auth: { user: smtpUser, pass: smtpPass },
        connectionTimeout: 10000,
        socketTimeout: 15000,
      });
      await transporter.sendMail({
        from: `"Sito CICO" <${process.env.CONTACT_FROM_EMAIL || smtpUser}>`,
        to,
        replyTo: `"${data.nome.replace(/"/g, "")}" <${data.email}>`,
        subject: `Nuova richiesta dal sito — ${data.nome} (${data.tipologia})`,
        text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
        html:
          "<h2>Nuova richiesta dal sito</h2><table cellpadding=\"6\">" +
          rows.map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(v).replace(/\n/g, "<br>")}</td></tr>`).join("") +
          "</table>",
      });
    } catch (err) {
      console.error("[contatti] invio SMTP fallito:", err.message);
      return NextResponse.json({ error: "Consegna non riuscita" }, { status: 502 });
    }
  } else if (brevoKey && fromEmail) {
    const rows = [
      ["Nome", data.nome],
      ["Email", data.email],
      ["Telefono", data.telefono || "—"],
      ["Tipologia", data.tipologia],
      ["Preferenza di contatto", data.preferenza || "—"],
      ["Messaggio", data.messaggio || "—"],
      ["Ricevuta il", data.ricevutaIl],
    ];
    try {
      const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: { "api-key": brevoKey, "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({
          sender: { email: fromEmail, name: "Sito CICO" },
          to: [{ email: toEmail }],
          replyTo: { email: data.email, name: data.nome },
          subject: `Nuova richiesta dal sito — ${data.nome} (${data.tipologia})`,
          htmlContent:
            "<h2>Nuova richiesta dal sito</h2><table cellpadding=\"6\">" +
            rows.map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(v).replace(/\n/g, "<br>")}</td></tr>`).join("") +
            "</table>",
          textContent: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
        }),
      });
      if (!res.ok) {
        const detail = await res.text().catch(() => "");
        throw new Error(`brevo ${res.status} ${detail.slice(0, 300)}`);
      }
    } catch (err) {
      console.error("[contatti] invio Brevo fallito:", err.message);
      return NextResponse.json({ error: "Consegna non riuscita" }, { status: 502 });
    }
  } else if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`webhook ${res.status}`);
    } catch (err) {
      console.error("[contatti] consegna fallita:", err.message);
      return NextResponse.json({ error: "Consegna non riuscita" }, { status: 502 });
    }
  } else if (process.env.NODE_ENV !== "production") {
    console.log("[contatti] (dev) richiesta ricevuta:", data);
  } else {
    console.error("[contatti] CONTACT_WEBHOOK_URL non configurata: richiesta non consegnata");
    return NextResponse.json({ error: "Servizio non configurato" }, { status: 503 });
  }
  // -------------------------------------------

  return NextResponse.json({ ok: true });
}
