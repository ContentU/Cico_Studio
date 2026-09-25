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

    // Lightbox Gallery (pagina di dettaglio Portfolio): overlay a
    // scorrimento orizzontale con scroll-snap. Esiste solo se ci sono
    // immagini reali (Gallery.js renderizza il markup solo in quel caso),
    // quindi tutto il blocco è difensivo come main-text/servizi sopra.
    const galleryItems = document.querySelectorAll(".g-item[data-gallery-index]");
    const lightbox = document.getElementById("galleryLightbox");
    const lightboxTrack = document.getElementById("galleryLightboxTrack");
    const lightboxClose = document.getElementById("galleryLightboxClose");
    const galleryClickHandlers = [];
    let touchStartX = 0;
    let touchStartY = 0;

    function openLightbox(index) {
      if (!lightbox || !lightboxTrack) return;
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
      const target = lightboxTrack.children[index];
      if (target) {
        lightboxTrack.scrollTo({ left: target.offsetLeft, behavior: "auto" });
      }
    }
    function closeLightbox() {
      if (!lightbox) return;
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
    }
    galleryItems.forEach((el) => {
      const handler = () => openLightbox(Number(el.dataset.galleryIndex));
      galleryClickHandlers.push(handler);
      el.addEventListener("click", handler);
    });
    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    const onLightboxKeydown = (e) => {
      if (e.key === "Escape" && lightbox?.classList.contains("open")) closeLightbox();
    };
    window.addEventListener("keydown", onLightboxKeydown);
    // Swipe up per chiudere, solo su mobile/touch: chiude solo se il gesto è
    // prevalentemente verticale, così non interferisce con lo scroll
    // orizzontale nativo usato per sfogliare le immagini.
    const onLightboxTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };
    const onLightboxTouchEnd = (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (dy < -60 && Math.abs(dy) > Math.abs(dx)) closeLightbox();
    };
    if (lightbox) {
      lightbox.addEventListener("touchstart", onLightboxTouchStart, { passive: true });
      lightbox.addEventListener("touchend", onLightboxTouchEnd, { passive: true });
    }

    // Accordion generico (card "obiettivi diversi" + FAQ nelle pagine di
    // servizio): stesso pattern difensivo, si disattiva da solo se la
    // pagina corrente non ha elementi ".accordion-item".
    const accordionItems = document.querySelectorAll(".accordion-item");
    const accordionHandlers = [];
    accordionItems.forEach((item) => {
      const header = item.querySelector(".accordion-header");
      const body = item.querySelector(".accordion-body");
      if (!header || !body) return;
      const handler = () => {
        const isOpen = item.classList.toggle("open");
        body.style.maxHeight = isOpen ? `${body.scrollHeight}px` : "0px";
      };
      accordionHandlers.push([header, handler]);
      header.addEventListener("click", handler);
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
      galleryItems.forEach((el, i) => el.removeEventListener("click", galleryClickHandlers[i]));
      if (lightboxClose) lightboxClose.removeEventListener("click", closeLightbox);
      window.removeEventListener("keydown", onLightboxKeydown);
      if (lightbox) {
        lightbox.removeEventListener("touchstart", onLightboxTouchStart);
        lightbox.removeEventListener("touchend", onLightboxTouchEnd);
      }
      accordionHandlers.forEach(([header, handler]) => header.removeEventListener("click", handler));
      io.disconnect();
    };
  }, []);

  return null;
}
