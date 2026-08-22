"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { editStats } from "@/lib/edit-data";

const accents = ["text-peach", "text-sage", "text-charcoal"];

export default function EditStats() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".edit-stat");
      cards.forEach((card, i) => {
        const numberEl = card.querySelector<HTMLElement>(".edit-stat-number");
        const target = editStats[i].value;
        const counter = { value: 0 };

        gsap.from(card, {
          autoAlpha: 0,
          y: 28,
          duration: 0.7,
          ease: "premiumOut",
          stagger: 0.1,
          scrollTrigger: { trigger: ".edit-stats-grid", start: "top 85%" },
        });

        gsap.to(counter, {
          value: target,
          duration: 1.3,
          ease: "premiumOut",
          scrollTrigger: { trigger: ".edit-stats-grid", start: "top 82%", once: true },
          onUpdate: () => {
            if (numberEl)
              numberEl.textContent = `${Math.round(counter.value)}${editStats[i].suffix}`;
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="w-full bg-cream px-6 py-24 text-ink sm:px-10 sm:py-32 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-ink/50">
          Manually updated — wired to live data later
        </p>
        <div className="edit-stats-grid mt-8 grid gap-12 sm:grid-cols-3">
          {editStats.map((stat, i) => (
            <div key={stat.label} className="edit-stat">
              <p
                className={`edit-stat-number font-serif text-6xl font-medium leading-none sm:text-7xl ${accents[i % accents.length]}`}
              >
                0{stat.suffix}
              </p>
              <p className="mt-4 font-sans text-sm uppercase tracking-[0.2em] text-ink/55">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
