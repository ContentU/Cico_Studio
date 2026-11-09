"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// "Perché CICO": fascia gialla con 3 card (testimonianza con CTA audio, "2010", team).
// Audio: public/audio/testimonianza.mp3, parte solo al clic. Testo e consenso
// alla pubblicazione della testimonianza vanno confermati con il cliente.
export default function Perche() {
  const audioRef = useRef(null);
  const yearRef = useRef(null);
  const sectionRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play().catch(() => {});
      setPlaying(true);
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const cards = root.querySelectorAll(".pcb-card");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const count = () => {
      const yr = yearRef.current;
      if (!yr || rm) return;
      const t0 = performance.now();
      const step = (t) => {
        const k = Math.min(1, (t - t0) / 1400);
        yr.textContent = Math.round(1960 + 50 * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            if (e.target.classList.contains("pcb-year")) count();
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.25 }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section className="perche pcb" id="perche" ref={sectionRef}>
      <div className="pcb-in">
        <span className="section-label">Perché CICO</span>
        <div className="pcb-grid">
          <article className={"pcb-card pcb-big" + (playing ? " is-playing" : "")}>
            <div>
              <blockquote className="pcb-quote">
                «Sono i soldi meglio spesi <em>nella mia vita.</em>»
              </blockquote>
              <p className="pcb-text">
                «Dopo il tuo servizio fotografico è stata la svolta. [...] Ho lavorato ininterrottamente da marzo [...] È stato un successone.»
              </p>
              <p className="pcb-by">Testimonianza reale di Maria R.</p>
            </div>
            <div className="pcb-cta">
              <small>Non crederci sulla parola</small>
              <button type="button" className={"pc-audio-big" + (playing ? " playing" : "")} aria-pressed={playing} onClick={toggle}>
                <span className="pc-ico" aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
                <span className="pc-lbl">{playing ? "Metti in pausa" : "Ascolta la testimonianza"}</span>
              </button>
              <div className="pc-eq" aria-hidden="true">
                <i /><i /><i /><i /><i /><i /><i />
              </div>
              <audio ref={audioRef} preload="none" src="/audio/testimonianza.mp3" onEnded={() => setPlaying(false)} />
            </div>
          </article>
          <article className="pcb-card pcb-year">
            <div className="pcb-num" ref={yearRef}>2010</div>
            <h3>Da allora, solo ospitalità.</h3>
            <p>
              Fotografiamo hotel, B&amp;B e case per chi accoglie. <strong>Sul campo, nei webinar e in formazione</strong> con i professionisti del settore.
            </p>
          </article>
          <article className="pcb-card pcb-team">
            <h3>Un team, competenze diverse.</h3>
            <p>I professionisti giusti per ogni progetto, dallo scatto alla consegna.</p>
            <div className="skills">
              <span>Fotografia</span><span>Video</span><span>Styling</span><span>Postproduzione</span>
            </div>
            <Link href="/team" className="btn-tertiary">
              Conosci CICO e il team <span className="arrow">→</span>
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
