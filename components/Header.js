"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BrandMark from "./Logo";
import { navLinks } from "../lib/content";

export default function Header() {
  const [openSub, setOpenSub] = useState(null);

  // chiude il sottomenu cliccando fuori
  useEffect(() => {
    const close = () => setOpenSub(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <header id="header">
      <div className="nav-pill">
        <Link href="/" className="logo-mark" aria-label="CICO home">
          <BrandMark />
        </Link>
        <nav className="main-links">
          {navLinks.map((link) =>
            link.children ? (
              <div className={`has-sub${openSub === link.label ? " open" : ""}`} key={link.label}>
                <button
                  type="button"
                  className="sub-toggle"
                  aria-haspopup="true"
                  aria-expanded={openSub === link.label}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenSub(openSub === link.label ? null : link.label);
                  }}
                >
                  {link.label}
                  <svg viewBox="0 0 10 6" aria-hidden="true">
                    <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
                <div className="sub">
                  {link.children.map((c) => (
                    <Link key={c.label} href={c.href} onClick={() => setOpenSub(null)}>
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={link.label} href={link.href}>
                {link.label}
              </Link>
            )
          )}
        </nav>
        <button className="burger" id="burgerBtn" aria-label="Apri menu" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <Link href="/contatti" className="btn-primary">
          Iniziamo un progetto <span className="arrow">→</span>
        </Link>
      </div>
    </header>
  );
}
