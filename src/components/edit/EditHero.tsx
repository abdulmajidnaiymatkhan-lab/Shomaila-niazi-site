"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";

export default function EditHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const split = new SplitText(".edit-headline", {
        type: "words,lines",
        mask: "lines",
      });

      const tl = gsap.timeline({ defaults: { ease: "premiumOut" } });
      tl.from(".edit-kicker", { autoAlpha: 0, y: 12, duration: 0.5 })
        .from(
          split.words,
          { yPercent: 110, opacity: 0, duration: 0.8, stagger: 0.04 },
          "-=0.15"
        )
        .from(".edit-sub", { autoAlpha: 0, y: 14, duration: 0.6 }, "-=0.35")
        .from(
          ".edit-mark",
          { autoAlpha: 0, scale: 0.9, duration: 0.9, ease: "premiumInOut" },
          "-=0.7"
        );

      if (!reduceMotion) {
        gsap.to(".edit-mark", {
          yPercent: -30,
          ease: "none",
          scrollTrigger: { trigger: root.current, scrub: 0.6 },
        });
      }

      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden px-6 py-28 sm:px-10 sm:py-36 lg:px-16"
      style={{
        background:
          "linear-gradient(160deg, #F2C4B8 0%, #F6D9CE 45%, #FAF6F0 100%)",
      }}
    >
      <div
        aria-hidden
        className="edit-mark pointer-events-none absolute right-[8%] top-[18%] hidden sm:block"
      >
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
          <circle cx="90" cy="90" r="88" stroke="#212B23" strokeOpacity="0.15" />
          <circle cx="60" cy="120" r="34" stroke="#9CAF88" strokeOpacity="0.5" />
          <circle cx="120" cy="60" r="4" fill="#212B23" fillOpacity="0.5" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-3xl">
        <p className="edit-kicker mb-6 flex items-center gap-2.5 font-sans text-xs font-semibold uppercase tracking-[0.35em] text-ink/65 sm:text-sm">
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-sage" />
          My Studio
        </p>
        <h1 className="edit-headline font-serif text-5xl font-medium leading-[1.05] text-charcoal sm:text-6xl">
          Brands I&rsquo;ve worked with, content I&rsquo;ve created.
        </h1>
        <p className="edit-sub mt-6 max-w-xl font-sans text-base leading-relaxed text-ink/65 sm:text-lg">
          A running record of the campaigns, collaborations, and creative
          work behind the platform — organized by the world it lives in.
        </p>
      </div>
    </section>
  );
}
