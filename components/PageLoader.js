"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Sparkle from "./Sparkle";

// Loader tra le pagine: a ogni cambio di pagina lo schermo sfuma in giallo con
// la scintilla CICO che gira e una barra di avanzamento; resta visibile almeno
// MIN_MS e poi sfuma nella nuova pagina. Parte al clic su un link interno (anche
// verso la pagina in cui si è già) e con i tasti avanti/indietro del browser.
const MIN_MS = 900;
const SAFETY_MS = 8000;

export default function PageLoader() {
  const pathname = usePathname();
  const [on, setOn] = useState(false);
  const started = useRef(0);
  const lastPath = useRef(null);
  const hideTimer = useRef(null);
  const safety = useRef(null);

  const show = () => {
    started.current = performance.now();
    clearTimeout(hideTimer.current);
    clearTimeout(safety.current);
    setOn(true);
    safety.current = setTimeout(hide, SAFETY_MS);
  };
  const hide = () => {
    clearTimeout(hideTimer.current);
    clearTimeout(safety.current);
    const wait = Math.max(0, MIN_MS - (performance.now() - started.current));
    hideTimer.current = setTimeout(() => {
      setOn(false);
      started.current = 0;
    }, wait);
  };

  useEffect(() => {
    if (lastPath.current === null) lastPath.current = window.location.pathname;
    const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest && e.target.closest("a[href]");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      let url;
      try {
        url = new URL(a.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.hash) return; // ancora nella stessa pagina
      if (reduce()) return;
      show();
      // stessa pagina senza ancora (es. logo in home): la pagina non cambia, spegni dopo il minimo
      if (url.pathname === window.location.pathname) hide();
    };
    const onPop = () => {
      if (window.location.pathname === lastPath.current) return; // solo hash/scroll
      if (reduce()) return;
      show();
    };
    document.addEventListener("click", onClick);
    window.addEventListener("popstate", onPop);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("popstate", onPop);
      clearTimeout(hideTimer.current);
      clearTimeout(safety.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // la nuova pagina è pronta
  useEffect(() => {
    lastPath.current = window.location.pathname;
    if (started.current) hide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div className={"page-loader" + (on ? " on" : "")} aria-hidden="true">
      <div className="pl-inner">
        <Sparkle />
        <div className="pl-track">
          <div className="pl-bar" />
        </div>
      </div>
    </div>
  );
}
