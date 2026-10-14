"use client";

import { useState } from "react";
import Link from "next/link";
import { navLinks } from "../lib/content";

export default function MobileMenu() {
  const [openGroup, setOpenGroup] = useState(null);
  return (
    <div className="mobile-menu" id="mobileMenu">
      {navLinks.map((link) =>
        link.children ? (
          <div className={`m-group${openGroup === link.label ? " open" : ""}`} key={link.label}>
            <button
              type="button"
              className="m-toggle"
              aria-expanded={openGroup === link.label}
              onClick={() => setOpenGroup(openGroup === link.label ? null : link.label)}
            >
              {link.label}
              <svg viewBox="0 0 10 6" aria-hidden="true">
                <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
            <div className="m-sub">
              {link.children.map((c) => (
                <Link key={c.label} href={c.href}>
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
      <Link href="/contatti" className="btn-primary">
        Iniziamo un progetto <span className="arrow">→</span>
      </Link>
    </div>
  );
}
