"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const cards = [
  {
    title: "My Story",
    description:
      "Two unfinished degrees, a pivot, and the years of building alone.",
    href: "/story",
    wash: false,
  },
  {
    title: "My Ventures",
    description:
      "The platform that taught me everything, and the agency built to teach others.",
    href: "/ventures",
    wash: true,
  },
  {
    title: "My Journal",
    description:
      "Behind-the-scenes lessons, reflections, and the unfiltered process.",
    href: "/journal",
    wash: false,
  },
  {
    title: "My Studio",
    description:
      "Brands I've partnered with and the content behind the collaborations.",
    href: "/my-studio",
    wash: true,
  },
  {
    title: "Connect",
    description:
      "Collaborations, partnerships, and the ways to reach me directly.",
    href: "/connect",
    wash: false,
  },
];

const cardClass = (wash: boolean) =>
  wash
    ? "border-charcoal/25 bg-charcoal/[0.06] hover:border-charcoal/50"
    : "border-charcoal/10 bg-cream hover:border-charcoal/30";

export default function Teaser() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      gsap.from(".teaser-headline", {
        autoAlpha: 0,
        y: 28,
        duration: 0.8,
        ease: "premiumOut",
        scrollTrigger: { trigger: ".teaser-headline", start: "top 85%" },
      });

      gsap.from(".teaser-card", {
        autoAlpha: 0,
        y: 40,
        duration: 0.8,
        ease: "premiumOut",
        stagger: 0.12,
        scrollTrigger: { trigger: ".teaser-grid", start: "top 82%" },
      });

      if (reduceMotion) return;

      gsap.utils.toArray<HTMLElement>(".teaser-card").forEach((card) => {
        const xTo = gsap.quickTo(card, "rotateY", {
          duration: 0.5,
          ease: "power3.out",
        });
        const yTo = gsap.quickTo(card, "rotateX", {
          duration: 0.5,
          ease: "power3.out",
        });

        const onMove = (e: PointerEvent) => {
          const r = card.getBoundingClientRect();
          const relX = (e.clientX - r.left) / r.width - 0.5;
          const relY = (e.clientY - r.top) / r.height - 0.5;
          xTo(relX * 6);
          yTo(relY * -6);
        };
        const onLeave = () => {
          xTo(0);
          yTo(0);
        };

        card.addEventListener("pointermove", onMove);
        card.addEventListener("pointerleave", onLeave);
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="w-full px-6 py-28 text-ink sm:px-10 sm:py-36 lg:px-16"
      style={{
        background: "linear-gradient(180deg, #FAF6F0 0%, #F6D9CE 100%)",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="teaser-headline max-w-lg font-serif text-4xl font-medium leading-[1.15] sm:text-5xl">
          Where to go from here.
        </h2>

        <div
          className="teaser-grid mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          style={{ perspective: "1200px" }}
        >
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className={`teaser-card group flex flex-col justify-between rounded-2xl border p-8 transition-[transform,border-color] duration-200 ease-out active:scale-[0.97] ${cardClass(
                card.wash
              )}`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div>
                <h3 className="font-serif text-2xl font-medium">
                  {card.title}
                </h3>
                <p className="mt-3 font-sans text-base leading-relaxed text-ink/70">
                  {card.description}
                </p>
              </div>
              <span className="mt-8 inline-flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-ink/80 transition-transform duration-200 group-hover:translate-x-1">
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
