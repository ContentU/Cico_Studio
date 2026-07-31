"use client";

import BrandMark from "./Logo";
import { navLinks } from "../lib/content";

export default function Header() {
  return (
    <header id="header">
      <div className="nav-pill">
        <a href="#top" className="logo-mark" aria-label="CICO home">
          <BrandMark />
        </a>
        <nav className="main-links">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <button
          className="burger"
          id="burgerBtn"
          aria-label="Apri menu"
          aria-expanded="false"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <a href="#contatti" className="btn-primary">
          Iniziamo un progetto <span className="arrow">→</span>
        </a>
      </div>
    </header>
  );
}
