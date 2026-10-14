"use client";

import { useEffect } from "react";

// Interazioni delle pagine di servizio:
// 1) accordion (righe fascia gialla + FAQ), prima FAQ aperta
// 2) card sovrapposte: `can-sticky` solo desktop e solo se la card più alta
//    sta nel viewport (altrimenti le card scorrono normalmente)
// Header scroll e menu mobile sono gestiti da ClientInteractions.
export default function ServiceInteractions() {
  useEffect(() => {
    const cleanups = [];

    function wire(root, itemSel, bodySel, headSel) {
      const items = Array.from(root.querySelectorAll(itemSel));
      items.forEach((it) => {
        const body = it.querySelector(bodySel);
        const head = it.querySelector(headSel);
        if (!body || !head) return;
        const onClick = () => {
          const open = it.classList.toggle("open");
          body.style.maxHeight = open ? body.scrollHeight + "px" : "0px";
          head.setAttribute("aria-expanded", String(open));
        };
        head.addEventListener("click", onClick);
        cleanups.push(() => head.removeEventListener("click", onClick));
      });
      if (root.hasAttribute("data-open-first") && items[0]) {
        const head = items[0].querySelector(headSel);
        head && head.click();
      }
    }
    document.querySelectorAll(".rows").forEach((r) => wire(r, ".row", ".row-body", ".row-head"));
    document.querySelectorAll(".faq-list").forEach((r) => wire(r, ".faq-item", ".faq-body", ".faq-head"));

    // Ricalcola l'altezza degli accordion aperti al resize
    const onResizeAcc = () =>
      document
        .querySelectorAll(".row.open .row-body, .faq-item.open .faq-body")
        .forEach((b) => (b.style.maxHeight = b.scrollHeight + "px"));
    window.addEventListener("resize", onResizeAcc);
    cleanups.push(() => window.removeEventListener("resize", onResizeAcc));

    const stack = document.getElementById("stack");
    if (stack) {
      const check = () => {
        const tallest = Math.max(...Array.from(stack.children).map((c) => c.offsetHeight));
        stack.classList.toggle(
          "can-sticky",
          window.innerWidth > 880 && tallest + 84 + 18 * (stack.children.length - 1) + 8 <= window.innerHeight
        );
      };
      check();
      window.addEventListener("resize", check);
      cleanups.push(() => window.removeEventListener("resize", check));
    }

    // Hint swipe sul carosello dei lavori (solo mobile via CSS)
    const sc = document.getElementById("showcaseScroll");
    const hint = document.getElementById("swipeHint");
    if (sc && hint) {
      const onHint = () => sc.scrollBy({ left: sc.clientWidth * 0.8, behavior: "smooth" });
      const onSc = () => hint.classList.toggle("gone", sc.scrollLeft > 20);
      hint.addEventListener("click", onHint);
      sc.addEventListener("scroll", onSc, { passive: true });
      cleanups.push(() => {
        hint.removeEventListener("click", onHint);
        sc.removeEventListener("scroll", onSc);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
