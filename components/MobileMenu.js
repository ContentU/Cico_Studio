"use client";

import Link from "next/link";
import { navLinks } from "../lib/content";

export default function MobileMenu() {
  return (
    <div className="mobile-menu" id="mobileMenu">
      {navLinks.map((link) => (
        <Link key={link.label} href={link.href}>
          {link.label}
        </Link>
      ))}
      <Link href="/#contatti" className="btn-primary">
        Iniziamo un progetto <span className="arrow">→</span>
      </Link>
    </div>
  );
}
