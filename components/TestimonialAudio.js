"use client";

import { useRef, useState } from "react";

// Pulsante "Ascolta la testimonianza": l'audio parte solo al clic (mai in autoplay).
export default function TestimonialAudio({ src }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (a.paused) {
      a.play().catch(() => {});
      setPlaying(true);
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <button type="button" className="btn-primary on-dark pc-audio" aria-pressed={playing} onClick={toggle}>
        <span className="pc-ico" aria-hidden="true">
          {playing ? "❚❚" : "▶"}
        </span>
        <span className="pc-lbl">{playing ? "Metti in pausa" : "Ascolta la testimonianza"}</span>
      </button>
      <audio ref={ref} preload="none" src={src} onEnded={() => setPlaying(false)} />
    </>
  );
}
