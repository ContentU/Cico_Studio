"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

// Foto sotto la hero: si allarga allo scroll fino a riempire lo schermo e poi
// diventa uno slider guidato dallo scroll (una slide per tipologia di struttura).
// Con prefers-reduced-motion resta uno slider orizzontale normale (vedi globals.css).
const SLIDES = [
  { title: "Hotel", href: "/fotografia-hotel", img: "/images/servizi/hotel_cover_desktop.webp", alt: "Hotel con piscina e pergolato" },
  { title: "B&B", href: "/fotografia-bb", img: "/images/servizi/bb_cover_desktop.webp", alt: "Camera di un B&B" },
  { title: "Ville", href: "/fotografia-ville", img: "/images/servizi/ville_cover_desktop.webp", alt: "Villa con giardino" },
  { title: "Appartamenti", href: "/fotografia-appartamenti-airbnb", img: "/images/servizi/appartamenti_cover_desktop.webp", alt: "Appartamento per affitti brevi" },
  { title: "Immobili di pregio", href: "/fotografia-immobili-pregio", img: "/images/servizi/pregio_cover_desktop.webp", alt: "Immobile di pregio" },
];
const EXPAND = 0.2;

export default function HeroExpand() {
  const secRef = useRef(null);
  const trackRef = useRef(null);
  const dotsRef = useRef(null);

  useEffect(() => {
    const sec = secRef.current;
    const track = trackRef.current;
    const dots = dotsRef.current ? [...dotsRef.current.children] : [];
    if (!sec || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const scrollable = sec.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -sec.getBoundingClientRect().top / scrollable));
      const e = Math.min(1, p / EXPAND);
      sec.style.setProperty("--e", (e * e * (3 - 2 * e)).toFixed(4));
      const n = dots.length;
      const s = Math.min(1, Math.max(0, (p - EXPAND) / (1 - EXPAND))) * (n - 1);
      const i = Math.min(n - 2, Math.floor(s));
      const f = s - i;
      const k = f < 0.2 ? 0 : f > 0.8 ? 1 : (() => { const t = (f - 0.2) / 0.6; return t * t * (3 - 2 * t); })();
      const idx = i + k;
      track.style.transform = `translate3d(${(-idx * 100).toFixed(3)}%,0,0)`;
      const on = Math.round(idx);
      dots.forEach((d, j) => d.classList.toggle("on", j === on));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hx" id="hx" ref={secRef} aria-label="Le strutture che fotografiamo">
      <div className="hx-stage">
        <div className="hx-frame">
          <div className="hx-track" ref={trackRef}>
            {SLIDES.map((s, i) => (
              <Link className="hx-slide" href={s.href} key={s.title}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt={s.alt} loading={i ? "lazy" : "eager"} />
                <span className="hx-cap">
                  <span>
                    <em>0{i + 1} / 0{SLIDES.length}</em>
                    <strong>{s.title}</strong>
                  </span>
                  <span className="go">Scopri il servizio →</span>
                </span>
              </Link>
            ))}
          </div>
          <div className="hx-dots" ref={dotsRef} aria-hidden="true">
            {SLIDES.map((s) => <i key={s.title} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
