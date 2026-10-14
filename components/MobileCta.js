"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// CTA fissa in basso al centro su mobile (identica a quella dell'header, che
// su mobile è nascosta). Si nasconde quando il footer è visibile o il menu
// mobile è aperto, così non si sovrappone a nulla. Non compare in /contatti.
export default function MobileCta() {
  const ref = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const footer = document.querySelector("footer");
    const menu = document.getElementById("mobileMenu");
    let inFooter = false;
    const update = () => el.classList.toggle("hide", inFooter || !!menu?.classList.contains("open"));
    let io;
    if (footer && "IntersectionObserver" in window) {
      io = new IntersectionObserver((e) => {
        inFooter = e[0].isIntersecting;
        update();
      });
      io.observe(footer);
    }
    let mo;
    if (menu) {
      mo = new MutationObserver(update);
      mo.observe(menu, { attributes: true, attributeFilter: ["class"] });
    }
    update();
    return () => {
      io && io.disconnect();
      mo && mo.disconnect();
    };
  }, [pathname]);

  if (pathname === "/contatti") return null;
  return (
    <Link href="/contatti" className="btn-primary mobile-cta" ref={ref}>
      Iniziamo un progetto <span className="arrow">→</span>
    </Link>
  );
}
