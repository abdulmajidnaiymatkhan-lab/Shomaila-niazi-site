"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const stats = [
  {
    value: 245,
    label: "Instagram Followers",
    accent: "text-peach",
    size: "text-7xl sm:text-8xl lg:text-9xl",
    parallax: -10,
  },
  {
    value: 340,
    label: "YouTube Subscribers",
    accent: "text-cream",
    size: "text-5xl sm:text-6xl",
    parallax: -22,
  },
  {
    value: 80,
    label: "TikTok Followers",
    accent: "text-cream/70",
    size: "text-4xl sm:text-5xl",
    parallax: -32,
  },
];

export default function Stats() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const cards = gsap.utils.toArray<HTMLElement>(".stat-card");
      cards.forEach((card, i) => {
        const numberEl = card.querySelector<HTMLElement>(".stat-number");
        const target = stats[i].value;
        const counter = { value: 0 };

        gsap.from(card, {
          autoAlpha: 0,
          y: 32,
          duration: 0.8,
          ease: "premiumOut",
          scrollTrigger: { trigger: card, start: "top 88%" },
        });

        gsap.to(counter, {
          value: target,
          duration: 1.4,
          ease: "premiumOut",
          scrollTrigger: { trigger: card, start: "top 85%", once: true },
          onUpdate: () => {
            if (numberEl) numberEl.textContent = `${Math.round(counter.value)}K`;
          },
        });

        if (!reduceMotion) {
          gsap.to(card, {
            yPercent: stats[i].parallax,
            ease: "none",
            scrollTrigger: { trigger: root.current, scrub: 0.6 },
          });
        }
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="w-full overflow-hidden bg-charcoal px-6 py-28 text-cream sm:px-10 sm:py-40 lg:px-16"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-end gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="stat-card">
          <p
            className={`stat-number font-serif font-medium leading-none ${stats[0].accent} ${stats[0].size}`}
          >
            0K
          </p>
          <p className="mt-4 font-sans text-sm uppercase tracking-[0.2em] text-cream/55">
            {stats[0].label}
          </p>
        </div>

        <div className="flex flex-col gap-14 lg:pb-4">
          {stats.slice(1).map((stat) => (
            <div key={stat.label} className="stat-card">
              <p
                className={`stat-number font-serif font-medium leading-none ${stat.accent} ${stat.size}`}
              >
                0K
              </p>
              <p className="mt-3 font-sans text-sm uppercase tracking-[0.2em] text-cream/55">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
