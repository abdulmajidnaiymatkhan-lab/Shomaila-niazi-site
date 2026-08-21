"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import type { Venture } from "@/lib/ventures-data";

const THEME = {
  core: {
    section: "bg-charcoal text-cream",
    tagline: "text-peach",
    label: "text-peach/80",
    body: "text-cream/70",
    meta: "text-cream/50",
    ctaBorder: "border-cream/30 hover:border-peach",
    ctaText: "text-cream",
    ring: "#F2C4B8",
    ring2: "#9CAF88",
    dot: "#F2C4B8",
    panelBorder: "border-cream/15",
  },
  agency: {
    section: "bg-cream text-ink",
    tagline: "text-[#8A5CB8]",
    label: "text-[#8A5CB8]/90",
    body: "text-ink/70",
    meta: "text-ink/50",
    ctaBorder: "border-ink/20 hover:border-[#8A5CB8]",
    ctaText: "text-ink",
    ring: "#B9A3E3",
    ring2: "#F2A0C4",
    dot: "#33195C",
    panelBorder: "border-ink/10",
  },
} as const;

export default function VentureSection({
  venture,
  flip = false,
}: {
  venture: Venture;
  flip?: boolean;
}) {
  const root = useRef<HTMLElement>(null);
  const t = THEME[venture.theme];

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const nameSplit = new SplitText(root.current!.querySelector(".venture-name")!, {
        type: "words,lines",
        mask: "lines",
      });

      gsap.from(nameSplit.words, {
        yPercent: 110,
        opacity: 0,
        duration: 0.8,
        stagger: 0.035,
        ease: "premiumOut",
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });

      gsap.from(".venture-tagline", {
        autoAlpha: 0,
        y: 14,
        duration: 0.6,
        ease: "premiumOut",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });

      gsap.from(".venture-beat", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.12,
        ease: "premiumOut",
        scrollTrigger: { trigger: ".venture-beats", start: "top 82%" },
      });

      gsap.from(".venture-tag", {
        autoAlpha: 0,
        y: 8,
        duration: 0.4,
        stagger: 0.04,
        ease: "premiumOut",
        scrollTrigger: { trigger: ".venture-tags", start: "top 90%" },
      });

      gsap.from(".venture-panel", {
        autoAlpha: 0,
        scale: 0.94,
        duration: 0.9,
        ease: "premiumInOut",
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });

      if (!reduceMotion) {
        gsap.to(".venture-mark", {
          yPercent: -22,
          ease: "none",
          scrollTrigger: { trigger: root.current, scrub: 0.6 },
        });
      }

      return () => nameSplit.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className={`w-full overflow-hidden px-6 py-24 sm:px-10 sm:py-32 lg:px-16 ${t.section}`}>
      <div
        className={`mx-auto grid max-w-6xl gap-14 lg:gap-20 ${
          flip ? "lg:grid-cols-[1fr_0.75fr]" : "lg:grid-cols-[0.75fr_1fr]"
        }`}
      >
        <div className={flip ? "lg:order-2" : ""}>
          <div
            className={`venture-panel relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-[1.5rem] border p-8 ${t.panelBorder}`}
          >
            <div
              aria-hidden
              className="venture-mark pointer-events-none absolute -right-6 -top-6"
            >
              <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
                <circle cx="70" cy="70" r="68" stroke={t.ring} strokeOpacity="0.4" />
                <circle cx="45" cy="45" r="32" stroke={t.ring2} strokeOpacity="0.5" />
                <circle cx="95" cy="95" r="3" fill={t.dot} fillOpacity="0.8" />
              </svg>
            </div>

            <p className={`relative z-10 font-sans text-xs font-semibold uppercase tracking-[0.25em] ${t.meta}`}>
              {venture.meta}
            </p>

            <a
              href={venture.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`venture-cta relative z-10 mt-10 inline-flex w-fit items-center gap-2 rounded-full border px-5 py-2.5 font-sans text-sm font-semibold transition-colors duration-200 active:scale-[0.97] ${t.ctaBorder} ${t.ctaText}`}
            >
              Visit {venture.hrefLabel}
              <span aria-hidden>&#8599;</span>
            </a>
          </div>
        </div>

        <div className={flip ? "lg:order-1" : ""}>
          <h2 className="venture-name font-serif text-4xl font-medium leading-[1.05] sm:text-5xl">
            {venture.name}
          </h2>
          <p className={`venture-tagline mt-4 font-serif text-xl italic leading-snug ${t.tagline}`}>
            {venture.tagline}
          </p>

          <div className="venture-beats mt-10 grid gap-8 sm:grid-cols-2">
            <div className="venture-beat">
              <p className={`font-sans text-xs font-semibold uppercase tracking-[0.25em] ${t.label}`}>
                Why it exists
              </p>
              <p className={`mt-3 font-sans text-base leading-relaxed ${t.body}`}>
                {venture.why}
              </p>
            </div>
            <div className="venture-beat">
              <p className={`font-sans text-xs font-semibold uppercase tracking-[0.25em] ${t.label}`}>
                What it does
              </p>
              <p className={`mt-3 font-sans text-base leading-relaxed ${t.body}`}>
                {venture.what}
              </p>
            </div>
          </div>

          {venture.services && (
            <div className="venture-tags mt-8 flex flex-wrap gap-2">
              {venture.services.map((service) => (
                <span
                  key={service}
                  className={`venture-tag rounded-full border px-3.5 py-1.5 font-sans text-xs font-medium ${t.panelBorder} ${t.body}`}
                >
                  {service}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
