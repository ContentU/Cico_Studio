import { NextResponse } from "next/server";

// POST /api/newsletter — iscrive un indirizzo alla lista Brevo.
// Iscrizione diretta (senza double opt-in): richiede il consenso privacy.
//
// Variabili d'ambiente (mai nel codice né su GitHub):
//   BREVO_API_KEY   chiave API Brevo (SMTP & API → Chiavi API)
//   BREVO_LIST_ID   ID numerico della lista (Contatti → Liste)
//
// Senza chiave/lista: in sviluppo logga e risponde ok; in produzione risponde 503.
// Se il contatto esiste già viene semplicemente aggiornato (updateEnabled).

export const runtime = "nodejs";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON non valido" }, { status: 400 });
  }

  if (body.website) return NextResponse.json({ ok: true }); // honeypot

  const email = String(body.email ?? "").trim().slice(0, 160);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ error: "Email non valida" }, { status: 422 });
  }
  if (body.consent !== true) {
    return NextResponse.json({ error: "Consenso mancante" }, { status: 422 });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID);
  if (!apiKey || !listId) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[newsletter] (dev, Brevo non configurato) iscrizione:", email);
      return NextResponse.json({ ok: true });
    }
    console.error("[newsletter] BREVO_API_KEY / BREVO_LIST_ID non configurate");
    return NextResponse.json({ error: "Servizio non configurato" }, { status: 503 });
  }

  try {
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({ email, listIds: [listId], updateEnabled: true }),
    });
    // 201 = creato, 204 = già presente e aggiornato
    if (res.status !== 201 && res.status !== 204) {
      const detail = await res.text().catch(() => "");
      console.error("[newsletter] Brevo ha risposto", res.status, detail.slice(0, 300));
      return NextResponse.json({ error: "Iscrizione non riuscita" }, { status: 502 });
    }
  } catch (err) {
    console.error("[newsletter] errore di rete verso Brevo:", err.message);
    return NextResponse.json({ error: "Iscrizione non riuscita" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
