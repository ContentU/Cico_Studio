"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

// Foto sotto la hero: si allarga allo scroll fino a riempire lo schermo.
// - Desktop (>900px, mouse): lo slider si blocca a schermo e cambia slide in
//   VERTICALE, una slide per gesto di scroll (le rotelle/inerzie ravvicinate
//   vengono ignorate), con frecce da tastiera e puntini cliccabili. Alla
//   prima/ultima slide lo scroll riprende normalmente la pagina.
// - Mobile/tablet o "riduci animazioni": nessun blocco dello scroll, carosello
//   orizzontale da scorrere col dito (vedi globals.css).
const SLIDES = [
  { title: "Hotel", href: "/fotografia-hotel", img: "/images/servizi/hotel_cover_desktop.webp", alt: "Hotel con piscina e pergolato" },
  { title: "B&B", href: "/fotografia-bb", img: "/images/servizi/bb_cover_desktop.webp", alt: "Camera di un B&B" },
  { title: "Ville", href: "/fotografia-ville", img: "/images/servizi/ville_cover_desktop.webp", alt: "Villa con giardino" },
  { title: "Appartamenti", href: "/fotografia-appartamenti-airbnb", img: "/images/servizi/appartamenti_cover_desktop.webp", alt: "Appartamento per affitti brevi" },
  { title: "Immobili di pregio", href: "/fotografia-immobili-pregio", img: "/images/servizi/pregio_cover_desktop.webp", alt: "Immobile di pregio" },
];
const N = SLIDES.length;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

export default function HeroExpand() {
  const secRef = useRef(null);
  const trackRef = useRef(null);
  const dotsRef = useRef(null);

  useEffect(() => {
    const hx = secRef.current;
    const track = trackRef.current;
    if (!hx || !track) return;
    const slides = [...track.querySelectorAll(".hx-slide")];
    const dots = [...dotsRef.current.querySelectorAll("button")];
    const DESK = window.matchMedia("(min-width:901px) and (hover:hover) and (prefers-reduced-motion:no-preference)");
    let idx = 0;
    let lock = false;
    let timer = null;
    let last = 0;
    let raf = 0;

    const geom = () => {
      const vh = window.innerHeight;
      const top = hx.getBoundingClientRect().top + window.scrollY;
      const scrollable = hx.offsetHeight - vh;
      const ex = vh * 0.6;
      const step = (scrollable - ex) / (N - 1);
      return { vh, top, ex, step, startY: top + ex, endY: top + ex + (N - 1) * step };
    };
    const setIdx = (i) => {
      idx = i;
      track.style.transform = `translate3d(0,${-i * 100}%,0)`;
      slides.forEach((s, j) => s.classList.toggle("on", j === i));
      dots.forEach((d, j) => d.classList.toggle("on", j === i));
    };
    const update = () => {
      raf = 0;
      if (!DESK.matches) {
        hx.style.removeProperty("--e");
        track.style.transform = "";
        return;
      }
      const g = geom();
      const p = window.scrollY - g.top;
      const e = clamp(p / g.ex, 0, 1);
      hx.style.setProperty("--e", (e * e * (3 - 2 * e)).toFixed(4));
      if (!lock) setIdx(clamp(Math.round((p - g.ex) / g.step), 0, N - 1));
    };
    const go = (i, y) => {
      lock = true;
      clearTimeout(timer);
      if (i != null) setIdx(i);
      window.scrollTo({ top: y, behavior: "smooth" });
      timer = setTimeout(() => {
        lock = false;
        update();
      }, 1000);
    };
    const stepBy = (dir) => {
      const g = geom();
      const t = clamp(idx + dir, 0, N - 1);
      go(t, g.startY + t * g.step);
    };
    const handle = (dir, ev) => {
      if (!DESK.matches) return;
      const now = performance.now();
      const gap = now - last;
      last = now;
      if (lock) {
        ev.preventDefault();
        return;
      }
      const g = geom();
      const y = window.scrollY;
      // scroll veloce dall'espansione: atterra esattamente sulla prima slide
      if (y < g.startY - 2 && y >= g.top && dir > 0 && ev.deltaY !== undefined && y + ev.deltaY >= g.startY) {
        ev.preventDefault();
        go(0, g.startY);
        return;
      }
      if (y < g.startY - 2 || y > g.endY + 2) return;
      if (dir > 0 && idx >= N - 1) return;
      if (dir < 0 && idx <= 0) return;
      ev.preventDefault();
      if (gap < 160) return; // gesto/inerzia ancora in corso: serve una pausa
      stepBy(dir);
    };

    const onWheel = (e) => {
      if (e.deltaY) handle(e.deltaY > 0 ? 1 : -1, e);
    };
    const onKey = (e) => {
      if (/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName || "")) return;
      const map = { ArrowDown: 1, PageDown: 1, " ": e.shiftKey ? -1 : 1, ArrowUp: -1, PageUp: -1 };
      const dir = map[e.key];
      if (dir) handle(dir, e);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onTrackScroll = () => {
      if (DESK.matches) return;
      const i = Math.round(track.scrollLeft / track.clientWidth);
      dots.forEach((d, j) => d.classList.toggle("on", j === i));
      slides.forEach((s, j) => s.classList.toggle("on", j === i));
    };
    const dotHandlers = dots.map((d, i) => {
      const fn = () => {
        if (!DESK.matches) {
          track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
          return;
        }
        const g = geom();
        go(i, g.startY + i * g.step);
      };
      d.addEventListener("click", fn);
      return fn;
    });

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    track.addEventListener("scroll", onTrackScroll, { passive: true });
    setIdx(0);
    update();
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      track.removeEventListener("scroll", onTrackScroll);
      dots.forEach((d, i) => d.removeEventListener("click", dotHandlers[i]));
      clearTimeout(timer);
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
                    <em>Servizi fotografici per</em>
                    <strong>{s.title}</strong>
                  </span>
                  <span className="go">Scopri il servizio →</span>
                </span>
              </Link>
            ))}
          </div>
          <div className="hx-dots" ref={dotsRef}>
            {SLIDES.map((s, i) => (
              <button type="button" key={s.title} aria-label={`Vai a: ${s.title}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
