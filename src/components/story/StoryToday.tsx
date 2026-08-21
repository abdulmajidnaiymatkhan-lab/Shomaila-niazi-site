"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";

const stats = [
  { value: 245, label: "Instagram", accent: "text-peach", size: "text-6xl sm:text-7xl" },
  { value: 340, label: "YouTube", accent: "text-charcoal", size: "text-6xl sm:text-7xl" },
  { value: 80, label: "TikTok", accent: "text-sage", size: "text-6xl sm:text-7xl" },
];

export default function StoryToday() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const headlineSplit = new SplitText(".today-headline", {
        type: "words,lines",
        mask: "lines",
      });

      gsap.from(headlineSplit.words, {
        yPercent: 110,
        opacity: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: "premiumOut",
        scrollTrigger: { trigger: ".today-headline", start: "top 80%" },
      });

      const cards = gsap.utils.toArray<HTMLElement>(".today-stat");
      cards.forEach((card, i) => {
        const numberEl = card.querySelector<HTMLElement>(".today-number");
        const target = stats[i].value;
        const counter = { value: 0 };

        gsap.from(card, {
          autoAlpha: 0,
          y: 28,
          duration: 0.7,
          stagger: 0.1,
          ease: "premiumOut",
          scrollTrigger: { trigger: ".today-stats", start: "top 85%" },
        });

        gsap.to(counter, {
          value: target,
          duration: 1.3,
          ease: "premiumOut",
          scrollTrigger: { trigger: ".today-stats", start: "top 82%", once: true },
          onUpdate: () => {
            if (numberEl) numberEl.textContent = `${Math.round(counter.value)}K`;
          },
        });
      });

      gsap.from(".today-line", {
        autoAlpha: 0,
        y: 16,
        duration: 0.7,
        ease: "premiumOut",
        scrollTrigger: { trigger: ".today-line", start: "top 88%" },
      });

      gsap.from(".today-cta", {
        autoAlpha: 0,
        y: 16,
        duration: 0.7,
        ease: "premiumOut",
        scrollTrigger: { trigger: ".today-cta", start: "top 90%" },
      });

      return () => headlineSplit.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="w-full px-6 py-28 text-center sm:px-10 sm:py-36 lg:px-16"
      style={{ background: "linear-gradient(180deg, #FAF6F0 0%, #F6D9CE 100%)" }}
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="today-headline font-serif text-4xl font-medium leading-[1.05] text-charcoal sm:text-5xl">
          And today —
        </h2>

        <div className="today-stats mt-16 grid grid-cols-3 gap-6 sm:gap-10">
          {stats.map((stat) => (
            <div key={stat.label} className="today-stat">
              <p className={`today-number font-serif font-medium leading-none ${stat.accent} ${stat.size}`}>
                0K
              </p>
              <p className="mt-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ink/55 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <p className="today-line mx-auto mt-16 max-w-lg font-serif text-2xl italic leading-snug text-ink/80 sm:text-3xl">
          Built without a team. Without a budget. Just her, and a refusal to
          wait for permission.
        </p>

        <Link
          href="/ventures"
          className="today-cta mt-10 inline-flex items-center gap-2 rounded-full border border-charcoal/25 px-6 py-2.5 font-sans text-sm font-semibold text-ink transition-colors duration-200 hover:border-charcoal active:scale-[0.97]"
        >
          See what it built
          <span aria-hidden>&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
