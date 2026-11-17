"use client";
import { useState } from "react";

// Video YouTube con caricamento al clic (youtube-nocookie): niente iframe
// finché l'utente non preme play, così la pagina resta leggera.
const STORIE = ["jsZFhVLcR3E", "F4gO7yRvi1g", "FwiLOWozmWU", "gESfYReP7qE"];
const REEL = [
  { id: "0XFu0dzBAXU", vertical: false },
  { id: "VlwWYygYX0U", vertical: true },
  { id: "LNhPWLuP5A0", vertical: true },
];

function Thumb({ id, vertical, label }) {
  const [on, setOn] = useState(false);
  return (
    <div className={"vg-item" + (vertical ? " vg-vertical" : "")}>
      {on ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={label}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setOn(true)} aria-label={`Riproduci: ${label}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />
          <span className="vg-play" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

export default function VideoGallery() {
  return (
    <section className="video-gallery">
      <div className="vg-in">
        <div className="vg-grid" style={{ marginTop: 0 }}>
          {STORIE.map((id, i) => (
            <Thumb key={id} id={id} label={`Video ${i + 1}`} />
          ))}
        </div>
        <h2 className="section-title vg-sub">Video reel per social</h2>
        <div className="vg-grid vg-reel">
          {REEL.map((r, i) => (
            <Thumb key={r.id} id={r.id} vertical={r.vertical} label={`Reel ${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
