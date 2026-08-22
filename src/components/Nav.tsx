"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/story", label: "My Story" },
  { href: "/journal", label: "My Journal" },
  { href: "/ventures", label: "My Ventures" },
  { href: "/my-studio", label: "My Studio" },
  { href: "/connect", label: "Connect" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-cream/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-serif text-lg font-medium text-charcoal transition-colors duration-200 hover:text-ink"
        >
          Shomaila Niazi
        </Link>

        <ul className="hidden items-center gap-8 sm:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-sans text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-200 ${
                    active ? "text-charcoal" : "text-ink/60 hover:text-charcoal"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-1.5 sm:hidden"
        >
          <span
            className={`block h-px w-5 bg-charcoal transition-transform duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-charcoal transition-transform duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <div
        className={`overflow-hidden border-t border-ink/10 bg-cream/95 backdrop-blur-md transition-[max-height,opacity] duration-300 ease-out sm:hidden ${
          open ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block py-2.5 font-sans text-sm font-semibold uppercase tracking-[0.15em] transition-colors duration-200 ${
                    active ? "text-charcoal" : "text-ink/60"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
