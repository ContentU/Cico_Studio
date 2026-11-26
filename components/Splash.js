"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import BrandMark from "./Logo";

// Splash della home (circa 4 secondi, una volta per sessione; ?splash=1 per
// rivederlo; assente con prefers-reduced-motion). Sequenza:
//  1) su viola scuro la scintilla rossa si compone un pezzo alla volta e ruota;
//  2) una forma rossa si allarga dal centro e copre il viola;
//  3) sul rosso compaiono "cico" in giallo, la scintilla viola e il nome esteso;
//  4) l'intera schermata rossa sale scoprendo la home (giallo): il colore cambia.
// Lo scroll si blocca con listener sulla sovrapposizione (NON con overflow:hidden
// su html, che in Safari rompeva lo stage fisso dei Servizi).
const KEY = "cicoSplash";
const HOLD_MS = 4100; // inizio dell'uscita
const GUARD = `(function(){var d=document.documentElement;try{var s=sessionStorage.getItem('${KEY}')==='1';var f=/[?&]splash=1/.test(location.search);var r=matchMedia('(prefers-reduced-motion: reduce)').matches;if((s&&!f)||r){d.classList.add('no-splash')}}catch(e){d.classList.add('no-splash')}})();`;
const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const SPARK = [
  "351 43.33 346.32 46.45 340.7 39.21 339.51 37.67 334.52 31.24 341.49 26.58 351 43.33",
  "328.35 35.32 336.33 37.87 329.17 55.75 323.81 54.03 328.35 35.32",
  "324.29 40.88 305.85 46.42 303.85 41.16 321.31 33.04 324.15 40.5 324.29 40.88",
  "318.71 26.12 314.92 32.52 314.44 33.33 298.61 22.38 301.47 17.53 318.69 26.11 318.71 26.12",
  "342.03 3.87 336.28 10.89 336.14 11.06 329.82 18.77 323.73 13 323.75 12.99 337.94 0 342.03 3.87",
  "354.9 18.52 354.43 24.13 345.36 24.01 337.21 23.9 335.17 23.87 335.88 15.52 354.9 18.52",
  "314.19 20.93 314.19 20.9 312.89 1.71 318.46 .93 322.48 19.71 322.49 19.77 314.19 20.93",
];

export default function Splash() {
  const [phase, setPhase] = useState("show"); // show | done | gone

  useIso(() => {
    const d = document.documentElement;
    const forced = /[?&]splash=1/.test(window.location.search);
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if ((seen && !forced) || reduce) {
      d.classList.add("no-splash");
      setPhase("gone");
      return;
    }
    d.classList.remove("no-splash");
    const stop = (e) => e.preventDefault();
    const keys = (e) => {
      if ([" ", "PageDown", "PageUp", "ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) e.preventDefault();
    };
    window.addEventListener("wheel", stop, { passive: false });
    window.addEventListener("touchmove", stop, { passive: false });
    window.addEventListener("keydown", keys);
    const unlock = () => {
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchmove", stop);
      window.removeEventListener("keydown", keys);
    };
    const t1 = setTimeout(() => {
      setPhase("done");
      window.dispatchEvent(new Event("cico:splash-done"));
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
    }, HOLD_MS);
    const t2 = setTimeout(unlock, HOLD_MS + 350);
    const t3 = setTimeout(() => setPhase("gone"), HOLD_MS + 1000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      unlock();
    };
  }, []);

  if (phase === "gone") return null;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: GUARD }} />
      <div className={"splash" + (phase === "done" ? " done" : "")} aria-hidden="true">
        <svg className="splash-spark" viewBox="298 0 57 57" fill="currentColor">
          {SPARK.map((pts, i) => (
            <polygon key={i} points={pts} style={{ animationDelay: `${0.15 + i * 0.12}s` }} />
          ))}
        </svg>
        <div className="splash-red">
          <div className="splash-logo-wrap">
            <BrandMark className="splash-logo" />
            <span className="splash-name">Centro Immagine e Comunicazione per l&apos;Ospitalità</span>
          </div>
        </div>
      </div>
    </>
  );
}
