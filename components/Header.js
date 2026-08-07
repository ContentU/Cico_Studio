"use client";

import Link from "next/link";
import BrandMark from "./Logo";
import { navLinks } from "../lib/content";

export default function Header() {
  return (
    <header id="header">
      <div className="nav-pill">
        <Link href="/" className="logo-mark" aria-label="CICO home">
          <BrandMark />
        </Link>
        <nav className="main-links">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
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
        <Link href="/#contatti" className="btn-primary">
          Iniziamo un progetto <span className="arrow">→</span>
        </Link>
      </div>
    </header>
  );
}
