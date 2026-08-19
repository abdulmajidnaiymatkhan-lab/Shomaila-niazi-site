"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const cards = [
  {
    title: "Her Ventures",
    description:
      "The brands, businesses, and bold experiments she's built and backed.",
    href: "/ventures",
    accent: "border-sage/40 hover:border-sage",
  },
  {
    title: "Her Journal",
    description:
      "Behind-the-scenes lessons, reflections, and the unfiltered process.",
    href: "/journal",
    accent: "border-peach/50 hover:border-peach",
  },
  {
    title: "Connect",
    description:
      "Collaborations, partnerships, and the ways to reach her directly.",
    href: "/connect",
    accent: "border-sage/40 hover:border-sage",
  },
];

export default function Teaser() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".teaser-kicker", {
        autoAlpha: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".teaser-kicker",
          start: "top 85%",
        },
      });

      gsap.from(".teaser-card", {
        autoAlpha: 0,
        y: 44,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".teaser-grid",
          start: "top 82%",
        },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="w-full bg-cream px-6 py-28 text-ink sm:px-10 sm:py-36 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <p className="teaser-kicker font-sans text-xs font-semibold uppercase tracking-[0.35em] text-sage">
          03 / Explore
        </p>

        <div className="teaser-grid mt-12 grid gap-6 sm:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className={`teaser-card group flex flex-col justify-between rounded-2xl border bg-charcoal/[0.02] p-8 transition-colors duration-300 ${card.accent}`}
            >
              <div>
                <h3 className="font-serif text-2xl font-medium">
                  {card.title}
                </h3>
                <p className="mt-3 font-sans text-base leading-relaxed text-ink/70">
                  {card.description}
                </p>
              </div>
              <span className="mt-8 inline-flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-ink/80 transition-transform duration-300 group-hover:translate-x-1">
                Explore
                <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
