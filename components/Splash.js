"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import BrandMark from "./Logo";
import Sparkle from "./Sparkle";

// Splash della home (variante B): logo CICO animato con il nome esteso, circa
// 1,9 secondi. Si vede una volta per sessione; con ?splash=1 si rivede.
// Con prefers-reduced-motion non compare. Lo script inline nasconde subito lo
// splash alle visite successive (niente lampo prima dell'idratazione).
const KEY = "cicoSplash";
const GUARD = `(function(){var d=document.documentElement;try{var s=sessionStorage.getItem('${KEY}')==='1';var f=/[?&]splash=1/.test(location.search);var r=matchMedia('(prefers-reduced-motion: reduce)').matches;if((s&&!f)||r){d.classList.add('no-splash')}else{d.classList.add('splash-lock')}}catch(e){d.classList.add('no-splash')}})();`;
const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

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
      d.classList.remove("splash-lock");
      d.classList.add("no-splash");
      setPhase("gone");
      return;
    }
    d.classList.add("splash-lock");
    const t1 = setTimeout(() => {
      setPhase("done");
      d.classList.remove("splash-lock");
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
    }, 1900);
    const t2 = setTimeout(() => setPhase("gone"), 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      d.classList.remove("splash-lock");
    };
  }, []);

  if (phase === "gone") return null;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: GUARD }} />
      <div className={"splash" + (phase === "done" ? " done" : "")} aria-hidden="true">
        <div className="splash-logo-wrap">
          <BrandMark className="splash-logo" />
          <span className="splash-name">Centro Immagine e Comunicazione per l&apos;Ospitalità</span>
          <Sparkle className="splash-spin" />
        </div>
      </div>
    </>
  );
}
