"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";

export default function StoryHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const split = new SplitText(".story-hero-headline", {
        type: "words,lines",
        mask: "lines",
      });

      const tl = gsap.timeline({ defaults: { ease: "premiumOut" } });
      tl.from(
        ".story-hero-photo",
        { autoAlpha: 0, scale: 1.06, duration: 1.1, ease: "premiumInOut" }
      )
        .from(".story-hero-kicker", { autoAlpha: 0, y: 12, duration: 0.5 }, "-=0.6")
        .from(
          split.words,
          { yPercent: 110, opacity: 0, duration: 0.85, stagger: 0.04 },
          "-=0.15"
        )
        .from(".story-hero-sub", { autoAlpha: 0, y: 14, duration: 0.6 }, "-=0.4");

      if (!reduceMotion) {
        gsap.to(".story-hero-photo", {
          yPercent: -10,
          ease: "none",
          scrollTrigger: { trigger: root.current, scrub: 0.6 },
        });
        gsap.to(".story-hero-content", {
          yPercent: -8,
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
      className="relative flex h-[90vh] min-h-[640px] w-full items-end overflow-hidden px-6 pb-16 sm:px-10 lg:px-16"
    >
      {/* Full-bleed photo, entire image visible via the section's own frame */}
      <div className="story-hero-photo absolute inset-0">
        <Image
          src="/images/her-story-hero.png"
          alt="Shomaila in a quiet, reflective moment"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_25%]"
        />
      </div>

      {/* Scrim: keeps the headline legible without hiding the photo */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, rgba(33,43,35,0.85) 0%, rgba(33,43,35,0.62) 40%, rgba(33,43,35,0.2) 70%, rgba(33,43,35,0) 100%)",
        }}
      />

      <div className="story-hero-content relative z-10 mx-auto max-w-3xl">
        <p className="story-hero-kicker mb-6 flex items-center gap-2.5 font-sans text-xs font-semibold uppercase tracking-[0.35em] text-cream/80 sm:text-sm">
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-peach" />
          My Story
        </p>
        <h1
          className="story-hero-headline font-serif text-5xl font-medium leading-[1.15] text-cream sm:text-6xl lg:text-7xl"
          style={{ textShadow: "0 2px 24px rgba(0,0,0,0.3)" }}
        >
          Before the platforms, there were two degrees she didn&rsquo;t finish.
        </h1>
        <p className="story-hero-sub mt-6 max-w-xl font-sans text-base leading-relaxed text-cream/75 sm:text-lg">
          This is the part that doesn&rsquo;t make it into the highlight reel —
          the false starts, the pivot, and the years of building alone before
          any of it worked.
        </p>
      </div>
    </section>
  );
}
