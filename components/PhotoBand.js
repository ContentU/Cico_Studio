"use client";

import { useEffect, useRef } from "react";

// Blocco fotografico (Home_1..4): righe giustificate, nessun ritaglio
// (la larghezza di ogni foto è proporzionale al suo formato).
const ROWS = [
  [
    { src: "/images/home/home-1-hotel.webp", flex: 1.5, cap: "Hotel", alt: "Fotografia di un hotel" },
    { src: "/images/home/home-2-lifestyle.webp", flex: 0.667, cap: "Lifestyle", alt: "Fotografia lifestyle in una struttura" },
  ],
  [
    { src: "/images/home/home-3-food.webp", flex: 0.667, cap: "Food & beverage", alt: "Fotografia food e beverage" },
    { src: "/images/home/home-4-interior.webp", flex: 1.5, cap: "Interni", alt: "Fotografia di interni" },
  ],
];

export default function PhotoBand() {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = root.querySelectorAll(".pb-item");
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 }
    );
    items.forEach((el, i) => {
      el.style.transitionDelay = (i % 2) * 0.12 + "s";
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <section className="photoband" id="foto" aria-label="Fotografia per l'ospitalità" ref={ref}>
      {ROWS.map((row, r) => (
        <div className="pb-row" key={r}>
          {row.map((f) => (
            <figure className="pb-item" style={{ flex: `${f.flex} 1 0` }} key={f.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.src} alt={f.alt} loading="lazy" />
              <figcaption>{f.cap}</figcaption>
            </figure>
          ))}
        </div>
      ))}
    </section>
  );
}
