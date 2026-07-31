"use client";

import { navLinks } from "../lib/content";

export default function MobileMenu() {
  return (
    <div className="mobile-menu" id="mobileMenu">
      {navLinks.map((link) => (
        <a key={link.label} href={link.href}>
          {link.label}
        </a>
      ))}
      <a href="#contatti" className="btn-primary">
        Iniziamo un progetto <span className="arrow">→</span>
      </a>
    </div>
  );
}
