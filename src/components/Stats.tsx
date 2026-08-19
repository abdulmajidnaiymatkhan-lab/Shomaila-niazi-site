"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const stats = [
  { value: 245, label: "Instagram Followers", accent: "text-sage" },
  { value: 340, label: "YouTube Subscribers", accent: "text-peach" },
  { value: 80, label: "TikTok Followers", accent: "text-sage" },
];

export default function Stats() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".stats-kicker", {
        autoAlpha: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stats-kicker",
          start: "top 85%",
        },
      });

      const cards = gsap.utils.toArray<HTMLElement>(".stat-card");
      cards.forEach((card, i) => {
        const numberEl = card.querySelector<HTMLElement>(".stat-number");
        const target = stats[i].value;
        const counter = { value: 0 };

        gsap.from(card, {
          autoAlpha: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });

        gsap.to(counter, {
          value: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            if (numberEl) {
              numberEl.textContent = `${Math.round(counter.value)}K`;
            }
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="w-full bg-charcoal px-6 py-28 text-cream sm:px-10 sm:py-36 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <p className="stats-kicker font-sans text-xs font-semibold uppercase tracking-[0.35em] text-sage">
          02 / By The Numbers
        </p>

        <div className="mt-16 grid gap-16 sm:grid-cols-3 sm:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card text-center sm:text-left">
              <p
                className={`stat-number font-serif text-6xl font-medium leading-none sm:text-7xl ${stat.accent}`}
              >
                0K
              </p>
              <p className="mt-4 font-sans text-sm uppercase tracking-[0.2em] text-cream/60">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
