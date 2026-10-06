"use client";

import { useEffect, useRef } from "react";
import Sparkle from "./Sparkle";

// Hero della home (Figma home_v2): "Hey <parola>!" con la parola che cambia
// ogni ~2,4s e lo spark che ruota di 90° ad ogni cambio. Rispetta
// prefers-reduced-motion (in quel caso resta "Host").
const WORDS = ["Host", "Albergatore", "BnBer", "Property Manager"];
const EVERY = 2400;

export default function Hero() {
  const rotRef = useRef(null);
  const boxRef = useRef(null);
  const sparkRef = useRef(null);

  useEffect(() => {
    const rot = rotRef.current;
    const box = boxRef.current;
    const spark = sparkRef.current;
    if (!rot || !box || !spark) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let i = 0;
    let turn = 0;
    const timers = new Set();
    const later = (fn, ms) => {
      const t = setTimeout(() => {
        timers.delete(t);
        fn();
      }, ms);
      timers.add(t);
    };

    const interval = setInterval(() => {
      if (document.hidden) return;
      rot.classList.add("out");
      later(() => {
        i = (i + 1) % WORDS.length;
        // L'altezza del box viene animata esplicitamente: la nuova parola
        // (es. "Property Manager") può andare a capo su schermi stretti.
        const h0 = box.offsetHeight;
        box.style.height = h0 + "px";
        rot.textContent = WORDS[i];
        rot.classList.add("pre");
        rot.classList.remove("out");
        box.style.height = "auto";
        const h1 = box.offsetHeight;
        box.style.height = h0 + "px";
        void rot.offsetWidth; // forza il reflow prima di far partire la transizione
        rot.classList.remove("pre");
        box.style.height = h1 + "px";
        turn += 90;
        spark.style.transform = `rotate(${turn}deg)`;
        later(() => {
          box.style.height = "";
        }, 600);
      }, 380);
    }, EVERY);

    return () => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <>
      <div className="home-gradient"></div>
      <section className="hero" id="top">
        <div className="hero-row">
          <Sparkle className="hero-spark" ref={sparkRef} />
          <div className="hero-hey" ref={boxRef}>
            <h1>
              Hey{" "}
              <span className="rot" ref={rotRef} suppressHydrationWarning>
                Host
              </span>
              !
            </h1>
          </div>
        </div>
        <p className="hero-sub">
          Fotografia, video e contenuti social per hotel, host e progetti di
          architettura in Sicilia e oltre.
        </p>
        <a href="#portfolio" className="scroll-badge" aria-label="Scopri il portfolio">
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <defs>
              <path
                id="circlePath"
                d="M 50,50 m -41,0 a 41,41 0 1,1 82,0 a 41,41 0 1,1 -82,0"
              />
            </defs>
            <circle cx="50" cy="50" r="31" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <text fontSize="9" letterSpacing="1.2" fill="currentColor">
              <textPath href="#circlePath">Scopri il portfolio · Scopri il portfolio · </textPath>
            </text>
          </svg>
          <span className="arrow">↓</span>
        </a>
      </section>
    </>
  );
}
