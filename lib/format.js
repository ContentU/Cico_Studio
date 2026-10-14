const MONTHS = [
  "gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno",
  "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre",
];

// "2026-10-02T10:00:00" → "2 ottobre 2026" (nessuna dipendenza da Intl/locale
// del server, quindi identico in build e a runtime).
export function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

// Testo "ricco" proveniente da WordPress (campi WYSIWYG ACF): conserva solo
// tag di formattazione innocui (p, strong, em, br, liste, link http/https) e
// rimuove tutto il resto (script, attributi, stili). Se il testo non contiene
// HTML, le righe vuote diventano paragrafi.
const ALLOWED = new Set(["p", "strong", "b", "em", "i", "br", "ul", "ol", "li", "a"]);
export function sanitizeRichText(input) {
  let html = (input ?? "").toString();
  if (!/<[a-z][\s\S]*>/i.test(html)) {
    html = html
      .split(/\n{2,}/)
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => `<p>${t.replace(/\n/g, "<br>")}</p>`)
      .join("");
  }
  html = html.replace(/<(script|style)[\s\S]*?<\/\1>/gi, "").replace(/<!--[\s\S]*?-->/g, "");
  return html.replace(/<(\/?)([a-z0-9]+)([^>]*)>/gi, (m, slash, tag, attrs) => {
    const t = tag.toLowerCase();
    if (!ALLOWED.has(t)) return "";
    if (slash) return `</${t}>`;
    if (t === "a") {
      const h = /href\s*=\s*"(https?:\/\/[^"]*|mailto:[^"]*)"/i.exec(attrs);
      return h ? `<a href="${h[1]}" target="_blank" rel="noopener noreferrer">` : "<a>";
    }
    return `<${t}>`;
  });
}

// Versione testo semplice (meta description, anteprime): niente tag, entità base decodificate.
export function stripTags(input) {
  return (input ?? "")
    .toString()
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}
