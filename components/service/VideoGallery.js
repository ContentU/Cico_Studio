"use client";
import { useState } from "react";

// Video YouTube con caricamento al clic (youtube-nocookie): niente iframe
// finche' l'utente non preme play, cosi' la pagina resta leggera.
// Miniature: si usa maxresdefault (1280x720); se YouTube non la ha, si
// ripiega su sddefault e poi su hqdefault.
const STORIE = ["jsZFhVLcR3E", "F4gO7yRvi1g", "FwiLOWozmWU", "gESfYReP7qE"];
const REEL = ["0XFu0dzBAXU", "VlwWYygYX0U", "LNhPWLuP5A0"]; // tutti verticali (shorts)
const THUMBS = ["maxresdefault", "sddefault", "hqdefault"];

export function Thumb({ id, vertical, label }) {
  const [on, setOn] = useState(false);
  const [q, setQ] = useState(0);
  return (
    <div className={"vg-item" + (vertical ? " vg-vertical" : "")}>
      {on ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&vq=hd1080`}
          title={label}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setOn(true)} aria-label={`Riproduci: ${label}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://img.youtube.com/vi/${id}/${THUMBS[q]}.jpg`}
            alt=""
            loading="lazy"
            onLoad={(e) => {
              // YouTube risponde con una miniatura 120x90 se la versione HD non esiste
              if (e.currentTarget.naturalWidth < 400 && q < THUMBS.length - 1) setQ(q + 1);
            }}
            onError={() => q < THUMBS.length - 1 && setQ(q + 1)}
          />
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
        <span className="section-label">Progetti video</span>
        <h2 className="section-title">Storie in movimento</h2>
        <p className="vg-intro">Una selezione di produzioni video, tra racconti emozionali, luoghi ed esperienze.</p>
        <div className="vg-grid">
          {STORIE.map((id, i) => (
            <Thumb key={id} id={id} label={`Video ${i + 1}`} />
          ))}
        </div>
        <h2 className="section-title vg-sub">Video reel per social</h2>
        <div className="vg-grid vg-reel">
          {REEL.map((id, i) => (
            <Thumb key={id} id={id} vertical label={`Reel ${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
