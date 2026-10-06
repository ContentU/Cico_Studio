import { Fragment } from "react";

// Spezza una stringa sui "\n" e inserisce <br /> (usato per titoli su più righe).
export function Lines({ text }) {
  const parts = (text || "").split("\n");
  return parts.map((t, i) => (
    <Fragment key={i}>
      {t}
      {i < parts.length - 1 && <br />}
    </Fragment>
  ));
}
