"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { brandColors } from "../../lib/content";

// Filtro client-side su Tipologia/Servizio/Tag: i progetti sono già tutti
// caricati (arrivano dal Server Component della pagina indice), quindi
// filtrare in-browser è la scelta più semplice e reattiva — niente
// ricaricamento pagina, niente query string da gestire. Se il numero di
// progetti crescesse molto (centinaia), si può passare a un filtro lato
// WordPress via query param sulle tassonomie (?macroarea=, ?tipologia=...),
// già supportato dall'API come mostrato in getRelatedPortfolio in lib/wp.js.
export default function PortfolioFilterGrid({ items, tipologie, servizi, tags }) {
  const [tipologia, setTipologia] = useState("");
  const [servizio, setServizio] = useState("");
  const [tag, setTag] = useState("");

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (tipologia && item.tipologia !== tipologia) return false;
      if (servizio && !(item.serviziRealizzati || []).includes(servizio)) return false;
      if (tag && !(item.tags || []).includes(tag)) return false;
      return true;
    });
  }, [items, tipologia, servizio, tag]);

  const hasActiveFilters = tipologia || servizio || tag;
  const resetAll = () => {
    setTipologia("");
    setServizio("");
    setTag("");
  };

  return (
    <>
      <div className="portfolio-filters">
        <select
          value={tipologia}
          onChange={(e) => setTipologia(e.target.value)}
          aria-label="Filtra per tipologia"
        >
          <option value="">Tutte le tipologie</option>
          {tipologie.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select
          value={servizio}
          onChange={(e) => setServizio(e.target.value)}
          aria-label="Filtra per servizio"
        >
          <option value="">Tutti i servizi</option>
          {servizi.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select value={tag} onChange={(e) => setTag(e.target.value)} aria-label="Filtra per tag">
          <option value="">Tutti i tag</option>
          {tags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {hasActiveFilters && (
          <button type="button" className="btn-tertiary" onClick={resetAll}>
            Azzera filtri
          </button>
        )}
      </div>

      <p className="portfolio-filter-count">
        {filtered.length} progett{filtered.length === 1 ? "o" : "i"}
      </p>

      {filtered.length ? (
        <div className="portfolio-grid related">
          {filtered.map((item, i) => (
            <Link href={`/portfolio/${item.slug}`} className="p-card in-view" key={item.slug}>
              <div
                className="p-media"
                style={{
                  background: `linear-gradient(135deg, ${brandColors[i % 4]}33, ${
                    brandColors[(i + 1) % 4]
                  }66)`,
                }}
              />
              <div className="p-body">
                <h3>{item.title}</h3>
                <div className="tags">
                  {item.macroarea && <span className="tag cat">{item.macroarea}</span>}
                  {(item.tags || []).slice(0, 3).map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="portfolio-empty">Nessun progetto trovato con questi filtri.</p>
      )}
    </>
  );
}
