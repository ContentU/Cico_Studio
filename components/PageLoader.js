"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Sparkle from "./Sparkle";

// Caricamento di mezzo secondo quando si cambia pagina, così si capisce che
// la nuova pagina si sta caricando. Parte al clic su un link interno e
// scompare quando la nuova pagina è pronta (minimo ~0,5 s).
const MIN_MS = 500;

export default function PageLoader() {
  const pathname = usePathname();
  const [on, setOn] = useState(false);
  const started = useRef(0);
  const safety = useRef(null);
  const hideTimer = useRef(null);

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
      clearTimeout(hideTimer.current);
      setOn(true);
      clearTimeout(safety.current);
      safety.current = setTimeout(() => setOn(false), 6000);
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      clearTimeout(safety.current);
      clearTimeout(hideTimer.current);
    };
  }, []);

  // la nuova pagina è pronta: spegni il loader (almeno MIN_MS dopo il clic)
  useEffect(() => {
    if (!started.current) return;
    const wait = Math.max(0, MIN_MS - (performance.now() - started.current));
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      setOn(false);
      started.current = 0;
    }, wait);
  }, [pathname]);

  return (
    <div className={"page-loader" + (on ? " on" : "")} aria-hidden="true">
      <Sparkle />
    </div>
  );
}
