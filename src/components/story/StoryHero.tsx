"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";

export default function StoryHero() {
  const root = useRef<HTMLElement>(null);
  const markRef = useRef<HTMLDivElement>(null);

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
      tl.from(".story-hero-kicker", { autoAlpha: 0, y: 12, duration: 0.5 })
        .from(
          split.words,
          { yPercent: 110, opacity: 0, duration: 0.85, stagger: 0.04 },
          "-=0.15"
        )
        .from(".story-hero-sub", { autoAlpha: 0, y: 14, duration: 0.6 }, "-=0.4")
        .from(
          ".story-hero-mark",
          { autoAlpha: 0, scale: 0.9, duration: 0.9, ease: "premiumInOut" },
          "-=0.75"
        );

      if (!reduceMotion) {
        gsap.to(".story-hero-mark", {
          yPercent: -26,
          ease: "none",
          scrollTrigger: { trigger: root.current, scrub: 0.6 },
        });
        gsap.to(".story-hero-content", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: { trigger: root.current, scrub: 0.6 },
        });

        const xTo = gsap.quickTo(markRef.current, "x", { duration: 0.9, ease: "power3.out" });
        const yTo = gsap.quickTo(markRef.current, "y", { duration: 0.9, ease: "power3.out" });
        const onMove = (e: PointerEvent) => {
          const r = root.current!.getBoundingClientRect();
          xTo(((e.clientX - r.left) / r.width - 0.5) * 20);
          yTo(((e.clientY - r.top) / r.height - 0.5) * 20);
        };
        root.current?.addEventListener("pointermove", onMove);
        return () => {
          root.current?.removeEventListener("pointermove", onMove);
          split.revert();
        };
      }

      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative flex h-[90vh] min-h-[640px] w-full items-end overflow-hidden px-6 pb-16 sm:px-10 lg:px-16"
      style={{
        background: "linear-gradient(160deg, #F2C4B8 0%, #F6D9CE 45%, #FAF6F0 100%)",
      }}
    >
      <div
        ref={markRef}
        aria-hidden
        className="story-hero-mark pointer-events-none absolute right-[8%] top-[14%] hidden sm:block"
      >
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="98" stroke="#212B23" strokeOpacity="0.15" />
          <circle cx="60" cy="140" r="46" stroke="#9CAF88" strokeOpacity="0.5" />
          <circle cx="140" cy="60" r="4" fill="#212B23" fillOpacity="0.4" />
        </svg>
      </div>

      <div className="story-hero-content relative z-10 mx-auto max-w-3xl">
        <p className="story-hero-kicker mb-6 flex items-center gap-2.5 font-sans text-xs font-semibold uppercase tracking-[0.35em] text-ink/65 sm:text-sm">
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-sage" />
          Her Story
        </p>
        <h1 className="story-hero-headline font-serif text-5xl font-medium leading-[1.05] text-charcoal sm:text-6xl lg:text-7xl">
          Before the platforms, there were two degrees she didn&rsquo;t finish.
        </h1>
        <p className="story-hero-sub mt-6 max-w-xl font-sans text-base leading-relaxed text-ink/65 sm:text-lg">
          This is the part that doesn&rsquo;t make it into the highlight reel —
          the false starts, the pivot, and the years of building alone before
          any of it worked.
        </p>
      </div>
    </section>
  );
}
