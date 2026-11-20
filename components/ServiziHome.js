"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

// Servizi della home: intro con foto a tutta larghezza + sezione fissata con
// foto e testo. Lo scroll verticale cambia voce (Hotel, B&B, Host) e foto, su
// desktop e su mobile; cliccando sulla lista si salta alla voce.
const COLORS = ["#0E7173", "#ED254E", "#2C0E37"];
const SERVIZI = [
  {
    num: "01",
    name: "Hotel",
    lead: "Ogni struttura ha un'identità. Facciamola emergere.",
    desc: "Fotografia, video e contenuti visuali per valorizzare architettura, ambienti, servizi ed esperienze, dalle immagini per i portali alla comunicazione del brand.",
    links: [
      { label: "Fotografia per hotel", href: "/fotografia-hotel" },
      { label: "Video per hotel", href: "/video-hotel" },
      { label: "Contenuti social" },
    ],
    img: "/images/servizi/hotel_cover_desktop.webp",
    alt: "Hotel con grande arco affacciato sul tramonto",
  },
  {
    num: "02",
    name: "B&B",
    lead: "Piccole strutture. Grandi prime impressioni.",
    desc: "Immagini e video per mostrare camere, comfort, colazione e caratteristiche della struttura. Una presentazione professionale per Booking e gli altri portali, senza perdere il carattere del tuo B&B.",
    links: [
      { label: "Fotografia per B&B", href: "/fotografia-bb" },
      { label: "Video per B&B", href: "/video-hotel" },
      { label: "Contenuti social" },
    ],
    img: "/images/servizi/bb_cover_desktop.webp",
    alt: "Camera di un B&B",
  },
  {
    num: "03",
    name: "Host",
    lead: "Una casa da scegliere, non solo da guardare.",
    desc: "Fotografia professionale di interni e contenuti pensati per valorizzare l'immobile e costruire gallerie efficaci per Airbnb. Dall'appartamento alla villa, con produzioni dedicate alle proprietà di pregio.",
    links: [
      { label: "Fotografia per appartamenti", href: "/fotografia-appartamenti-airbnb" },
      { label: "Fotografia per ville", href: "/fotografia-ville" },
      { label: "Fotografia per immobili di pregio", href: "/fotografia-immobili-pregio" },
      { label: "Video e contenuti social" },
    ],
    img: "/images/servizi/ville_cover_desktop.webp",
    alt: "Villa con giardino",
  },
];

export default function ServiziHome() {
  const pinRef = useRef(null);
  const progRef = useRef(null);

  useEffect(() => {
    const pin = pinRef.current;
    const prog = progRef.current;
    if (!pin || !prog) return;
    const items = [...pin.querySelectorAll(".s-item")];
    const panels = [...pin.querySelectorAll(".s-panel")];
    const imgs = [...pin.querySelectorAll(".sx-img")];
    const setActive = (i) => {
      imgs.forEach((im, k) => im.classList.toggle("active", k === i));
      items.forEach((it, k) => it.classList.toggle("active", k === i));
      panels.forEach((p, k) => p.classList.toggle("active", k === i));
    };
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = pin.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      prog.style.width = `${progress * 100}%`;
      setActive(Math.min(items.length - 1, Math.floor(progress * items.length)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const handlers = items.map((item, i) => {
      const go = () => {
        setActive(i);
        const rect = pin.getBoundingClientRect();
        const range = rect.height - window.innerHeight;
        window.scrollTo({ top: window.scrollY + rect.top + ((i + 0.5) / items.length) * range, behavior: "smooth" });
      };
      const key = (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          go();
        }
      };
      item.addEventListener("click", go);
      item.addEventListener("keydown", key);
      return { go, key };
    });
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      items.forEach((item, i) => {
        item.removeEventListener("click", handlers[i].go);
        item.removeEventListener("keydown", handlers[i].key);
      });
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <section className="ph-intro" id="servizi-intro">
        <picture>
          <source media="(max-width:760px)" srcSet="/images/home/home-text-mobile.webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/home/home-text-desktop.webp"
            alt="Terrazza di un hotel con giardino di cactus e lettino con telo CICO"
            loading="lazy"
          />
        </picture>
        <div className="ph-in">
          <h2>Le&nbsp;fotografie mostrano molto più di&nbsp;uno&nbsp;spazio.</h2>
          <p>
            Raccontano il carattere di una struttura, fanno percepire la qualità dell&apos;ospitalità e aiutano gli ospiti
            a capire cosa li aspetta.
          </p>
        </div>
      </section>
      <section className="servizi-pin sf-pin" id="servizi" ref={pinRef}>
        <div className="sf-stage">
          <div className="sf-left">
            <div className="sf-labelrow">
              <span className="section-label sf-label">Servizi</span>
              <span className="sf-hint">Scorri per vedere i tre servizi</span>
            </div>
            <div className="servizi-list" id="serviziList">
              {SERVIZI.map((s, i) => (
                <div
                  className={"s-item" + (i === 0 ? " active" : "")}
                  data-i={i}
                  data-num={s.num}
                  role="button"
                  tabIndex={0}
                  key={s.name}
                >
                  {s.name}
                </div>
              ))}
            </div>
            <div className="servizi-panels" id="serviziTrack">
              {SERVIZI.map((s, i) => (
                <div className={"s-panel" + (i === 0 ? " active" : "")} key={s.name}>
                  <h3>{s.lead}</h3>
                  <p>{s.desc}</p>
                  <div className="tags">
                    {s.links.map((l) =>
                      l.href ? (
                        <Link
                          href={l.href}
                          className="tag"
                          style={{ borderColor: COLORS[i], color: COLORS[i] }}
                          key={l.label}
                        >
                          {l.label}
                        </Link>
                      ) : (
                        <span className="tag soft" style={{ borderColor: COLORS[i], color: COLORS[i] }} key={l.label}>
                          {l.label}
                        </span>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="sf-photo">
            {SERVIZI.map((s, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className={"sx-img" + (i === 0 ? " active" : "")}
                src={s.img}
                alt={s.alt}
                loading={i === 0 ? "eager" : "lazy"}
                key={s.name}
              />
            ))}
          </div>
          <div className="servizi-progress">
            <div className="servizi-progress-bar" id="serviziProgress" ref={progRef} />
          </div>
        </div>
      </section>
    </>
  );
}
