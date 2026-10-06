"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { coverProps } from "../../lib/media";
import { formatDate } from "../../lib/format";

const BATCH = 6;

// Indice del Blog: pillole per categoria (Macroarea), ultimo articolo in
// evidenza, poi griglia a 3 colonne con infinite scroll (carica altri 6
// articoli quando il fondo della lista entra nel viewport). I dati sono già
// tutti caricati dal Server Component (app/blog/page.js).
export default function BlogIndex({ posts }) {
  const [cat, setCat] = useState("Tutti");
  const [shown, setShown] = useState(BATCH);
  const sentinelRef = useRef(null);

  const cats = useMemo(() => ["Tutti", ...new Set(posts.map((p) => p.cat).filter(Boolean))], [posts]);
  const filtered = useMemo(
    () => posts.filter((p) => cat === "Tutti" || p.cat === cat),
    [posts, cat]
  );
  const featured = filtered[0];
  const list = filtered.slice(1);
  const visible = list.slice(0, shown);
  const hasMore = shown < list.length;

  const selectCat = (c) => {
    setCat(c);
    setShown(BATCH);
  };

  const loadMore = useCallback(() => setShown((n) => n + BATCH), []);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore) return;
    let timer;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) timer = setTimeout(loadMore, 350);
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, [hasMore, loadMore, shown]);

  // Animazione d'ingresso delle card (classe .in-view, come nel prototipo)
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".blog-grid .b-card:not(.in-view)").forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [visible.length, cat]);

  const countFor = (c) => (c === "Tutti" ? posts.length : posts.filter((p) => p.cat === c).length);

  return (
    <>
      <div className="pills" role="group" aria-label="Filtra per tipologia">
        {cats.map((c) => (
          <button
            key={c}
            type="button"
            className={`pill${c === cat ? " active" : ""}`}
            aria-pressed={c === cat}
            onClick={() => selectCat(c)}
          >
            {c}
            <span className="n">{countFor(c)}</span>
          </button>
        ))}
      </div>

      {featured && (
        <article className="featured">
          <div
            className={`f-media ${coverProps(featured.image, 0, ["33", "66"], 1).className}`}
            style={coverProps(featured.image, 0, ["33", "66"], 1).style}
          />
          <div>
            <span className="f-label">Ultimo articolo</span>
            <div className="meta">
              {featured.cat && <span className="tag cat">{featured.cat}</span>}
              <span className="date">{formatDate(featured.date)}</span>
            </div>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <Link href={`/blog/${featured.slug}`} className="btn-primary">
              Leggi tutto <span className="arrow">→</span>
            </Link>
          </div>
        </article>
      )}

      <div className="blog-grid">
        {visible.map((p, k) => {
          const cover = coverProps(p.image, k + 1, ["22", "55"], 2);
          return (
            <Link href={`/blog/${p.slug}`} className="b-card" key={p.slug}>
              <div className={`b-media ${cover.className}`} style={cover.style} />
              <div className="meta">
                {p.cat && <span className="tag cat">{p.cat}</span>}
                <span className="date">{formatDate(p.date)}</span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.excerpt}</p>
              <span className="btn-tertiary">
                Leggi tutto <span className="arrow">→</span>
              </span>
            </Link>
          );
        })}
      </div>

      <div className="loader" aria-live="polite">
        {hasMore ? (
          <>
            <div className="dots">
              <i></i>
              <i></i>
              <i></i>
            </div>
            <div>Caricamento…</div>
          </>
        ) : filtered.length ? (
          "Hai visto tutti gli articoli."
        ) : (
          <span className="empty">Nessun articolo in questa tipologia.</span>
        )}
      </div>
      <div ref={sentinelRef} style={{ height: 1 }} />
    </>
  );
}
