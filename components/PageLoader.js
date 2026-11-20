"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Sparkle from "./Sparkle";

// Transizione tra pagine: una tendina gialla con la scintilla CICO sale dal
// basso al clic su un link interno e, quando la nuova pagina è pronta, scorre
// verso l'alto scoprendola. Dura circa mezzo secondo in entrata + uscita.
const MIN_MS = 620; // tempo minimo dal clic prima di scoprire la nuova pagina

export default function PageLoader() {
  const pathname = usePathname();
  const [phase, setPhase] = useState("idle"); // idle | in | out
  const resetTimer = useRef(null);
  const started = useRef(0);
  const safety = useRef(null);
  const hideTimer = useRef(null);

  const reveal = () => {
    setPhase("out");
    started.current = 0;
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setPhase("idle"), 700);
  };

  useEffect(() => {
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
      if (url.pathname === window.location.pathname) return; // stessa pagina / ancora
      started.current = performance.now();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      clearTimeout(hideTimer.current);
      clearTimeout(resetTimer.current);
      setPhase("in");
      clearTimeout(safety.current);
      safety.current = setTimeout(() => reveal(), 6000);
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      clearTimeout(safety.current);
      clearTimeout(hideTimer.current);
      clearTimeout(resetTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // la nuova pagina è pronta: spegni il loader (almeno MIN_MS dopo il clic)
  useEffect(() => {
    if (!started.current) return;
    const wait = Math.max(0, MIN_MS - (performance.now() - started.current));
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(reveal, wait);
  }, [pathname]);

  return (
    <div className={"page-loader" + (phase === "in" ? " in" : phase === "out" ? " out" : "")} aria-hidden="true">
      <Sparkle />
    </div>
  );
}
