import { NextResponse } from "next/server";

// Endpoint del form Contatti (POST /api/contatti).
//
// Cosa fa: valida i dati (stesse regole del client), scarta i bot tramite il
// campo honeypot `website` e consegna la richiesta.
//
// CONSEGNA — DA DECIDERE/CONFIGURARE (non ancora scelto con il cliente):
//   • se è impostata la variabile d'ambiente CONTACT_WEBHOOK_URL, la richiesta
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
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
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
