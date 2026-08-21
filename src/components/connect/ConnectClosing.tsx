"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { socialLinks } from "@/lib/social-links";

const links = [socialLinks.instagram, socialLinks.youtube, socialLinks.tiktok];

export default function ConnectClosing() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".closing-item", {
        autoAlpha: 0,
        y: 16,
        duration: 0.6,
        stagger: 0.08,
        ease: "premiumOut",
        scrollTrigger: { trigger: root.current, start: "top 88%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="w-full px-6 py-20 text-center sm:px-10 lg:px-16"
      style={{ background: "linear-gradient(180deg, #FAF6F0 0%, #F6D9CE 100%)" }}
    >
      <div className="mx-auto max-w-lg">
        <div className="closing-item flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm font-semibold uppercase tracking-[0.15em] text-ink/70 transition-colors hover:text-charcoal"
            >
              {link.label}
            </a>
          ))}
        </div>

        <p className="closing-item mt-10 font-serif text-xl italic text-ink/70">
          Every story loops back to where it started.
        </p>

        <Link
          href="/"
          className="closing-item mt-4 inline-flex items-center gap-2 font-sans text-sm font-semibold text-ink/80 transition-colors hover:text-charcoal"
        >
          <span aria-hidden>&#8635;</span>
          Start from the beginning
        </Link>
      </div>
    </section>
  );
}
