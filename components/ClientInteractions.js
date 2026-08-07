"use client";

import { useEffect } from "react";
import { servizi } from "../lib/content";

// Tutta la logica di scroll/interazione della home, portata quasi identica
// dal prototipo statico validato dal cliente. Gira solo lato client, dopo
// il mount, e ripulisce i listener allo smontaggio.
export default function ClientInteractions() {
  useEffect(() => {
    const header = document.getElementById("header");
    const onHeaderScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 40);
    };

    const burgerBtn = document.getElementById("burgerBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const closeMobileMenu = () => {
      mobileMenu.classList.remove("open");
      burgerBtn.classList.remove("open");
      burgerBtn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };
    const onBurgerClick = () => {
      const isOpen = mobileMenu.classList.toggle("open");
      burgerBtn.classList.toggle("open", isOpen);
      burgerBtn.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    };
    burgerBtn.addEventListener("click", onBurgerClick);
    const menuLinks = Array.from(mobileMenu.querySelectorAll("a"));
    menuLinks.forEach((a) => a.addEventListener("click", closeMobileMenu));
    const onResizeCloseMenu = () => {
      if (window.innerWidth > 880) closeMobileMenu();
    };
    window.addEventListener("resize", onResizeCloseMenu);

    // Alcuni elementi (main text, servizi) esistono solo nella home: questo
    // componente viene riusato anche in pagine interne (es. dettaglio
    // Portfolio) che hanno solo header/footer/mobile-menu, quindi ogni
    // blocco qui sotto è "difensivo" e si disattiva da solo se l'elemento
    // di riferimento non è presente nella pagina corrente.
    const revealEl = document.getElementById("revealText");
    const words = revealEl ? revealEl.querySelectorAll(".word") : [];
    const mainTextSection = document.getElementById("main-text");
    function updateReveal() {
      if (!mainTextSection || !words.length) return;
      const rect = mainTextSection.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = -rect.height * 0.3;
      const total = start - end;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / total));
      const activeCount = Math.floor(progress * words.length);
      words.forEach((w, i) => w.classList.toggle("active", i < activeCount));
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in-view");
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".p-card").forEach((c) => io.observe(c));

    const pMediaEls = document.querySelectorAll(".p-media");
    function updatePortfolioParallax() {
      if (window.innerWidth <= 760) {
        pMediaEls.forEach((el) => el.style.setProperty("--py", "0px"));
        return;
      }
      const vh = window.innerHeight;
      const centerY = vh / 2;
      pMediaEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const offset = Math.max(-36, Math.min(36, (centerY - elCenter) * 0.08));
        el.style.setProperty("--py", `${offset}px`);
      });
    }

    const serviziPin = document.getElementById("servizi");
    const serviziProgress = document.getElementById("serviziProgress");
    const serviziListItems = document.querySelectorAll(".s-item");
    const serviziPanelEls = document.querySelectorAll(".s-panel");
    function setActiveServizio(i) {
      serviziListItems.forEach((it, idx) => it.classList.toggle("active", idx === i));
      serviziPanelEls.forEach((p, idx) => p.classList.toggle("active", idx === i));
    }
    function updateServizi() {
      if (!serviziPin || !serviziProgress || window.innerWidth <= 880) return;
      const rect = serviziPin.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = rect.height - vh;
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      serviziProgress.style.width = `${progress * 100}%`;
      const activeIdx = Math.min(servizi.length - 1, Math.floor(progress * servizi.length));
      setActiveServizio(activeIdx);
    }
    const onServiziClick = (i) => () => {
      setActiveServizio(i);
      if (serviziPin && window.innerWidth > 880) {
        const rect = serviziPin.getBoundingClientRect();
        const vh = window.innerHeight;
        const scrollableRange = rect.height - vh;
        const targetProgress = (i + 0.5) / servizi.length;
        const targetScroll = window.scrollY + rect.top + targetProgress * scrollableRange;
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }
    };
    const clickHandlers = [];
    serviziListItems.forEach((item, i) => {
      const handler = onServiziClick(i);
      clickHandlers.push(handler);
      item.addEventListener("click", handler);
    });

    function onScroll() {
      onHeaderScroll();
      updateReveal();
      updateServizi();
      updatePortfolioParallax();
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("resize", onResizeCloseMenu);
      burgerBtn.removeEventListener("click", onBurgerClick);
      menuLinks.forEach((a) => a.removeEventListener("click", closeMobileMenu));
      serviziListItems.forEach((item, i) => item.removeEventListener("click", clickHandlers[i]));
      io.disconnect();
    };
  }, []);

  return null;
}
