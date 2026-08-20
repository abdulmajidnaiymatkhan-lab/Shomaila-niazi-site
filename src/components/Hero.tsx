"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const markRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const split = new SplitText(".hero-headline", {
        type: "words,lines",
        mask: "lines",
        linesClass: "hero-line",
      });

      const tl = gsap.timeline({ defaults: { ease: "premiumOut" } });

      tl.from(".hero-kicker", { autoAlpha: 0, y: 12, duration: 0.5 })
        .from(
          split.words,
          { yPercent: 110, opacity: 0, duration: 0.8, stagger: 0.045 },
          "-=0.15"
        )
        .from(".hero-sub", { autoAlpha: 0, y: 14, duration: 0.6 }, "-=0.35")
        .from(
          ".hero-mark",
          { autoAlpha: 0, scale: 0.9, duration: 0.9, ease: "premiumInOut" },
          "-=0.7"
        )
        .from(".hero-cue", { scaleY: 0, duration: 0.6 }, "-=0.3");

      // Layered scroll parallax: background moves slowest, mark fastest.
      if (!reduceMotion) {
        gsap.to(".hero-bg-layer", {
          yPercent: -14,
          ease: "none",
          scrollTrigger: { trigger: root.current, scrub: 0.6 },
        });
        gsap.to(".hero-mark", {
          yPercent: -32,
          ease: "none",
          scrollTrigger: { trigger: root.current, scrub: 0.6 },
        });
        gsap.to(".hero-content", {
          yPercent: -6,
          ease: "none",
          scrollTrigger: { trigger: root.current, scrub: 0.6 },
        });

        // Subtle mouse-parallax on the decorative mark only (one focal element).
        const xTo = gsap.quickTo(markRef.current, "x", {
          duration: 0.9,
          ease: "power3.out",
        });
        const yTo = gsap.quickTo(markRef.current, "y", {
          duration: 0.9,
          ease: "power3.out",
        });
        const onMove = (e: PointerEvent) => {
          const r = root.current!.getBoundingClientRect();
          const relX = (e.clientX - r.left) / r.width - 0.5;
          const relY = (e.clientY - r.top) / r.height - 0.5;
          xTo(relX * 24);
          yTo(relY * 24);
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
      className="relative flex h-screen min-h-[100dvh] w-full items-end overflow-hidden px-6 pb-14 sm:px-10 lg:px-16"
      style={{
        background:
          "linear-gradient(160deg, #F2C4B8 0%, #F6D9CE 45%, #FAF6F0 100%)",
      }}
    >
      {/* Background parallax layer: slow-moving soft grounding vignette */}
      <div
        aria-hidden
        className="hero-bg-layer pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 12% 100%, rgba(33,43,35,0.06), transparent 65%)",
        }}
      />

      {/* Decorative geometric mark, own parallax speed */}
      <div
        ref={markRef}
        aria-hidden
        className="hero-mark pointer-events-none absolute right-[6%] top-[16%] hidden sm:block"
      >
        <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
          <circle
            cx="110"
            cy="110"
            r="108"
            stroke="#212B23"
            strokeOpacity="0.18"
            strokeWidth="1"
          />
          <circle
            cx="110"
            cy="70"
            r="58"
            stroke="#9CAF88"
            strokeOpacity="0.55"
            strokeWidth="1"
          />
          <circle cx="152" cy="150" r="5" fill="#212B23" fillOpacity="0.5" />
        </svg>
      </div>

      <div className="hero-content relative z-10 grid w-full max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
        <div>
          <p className="hero-kicker mb-6 flex items-center gap-2.5 font-sans text-xs font-semibold uppercase tracking-[0.35em] text-ink/65 sm:text-sm">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-sage"
            />
            Shomaila Niazi &middot; Digital Entrepreneur
          </p>
          <h1 className="hero-headline font-serif text-[15vw] font-medium leading-[0.95] text-charcoal sm:text-[10vw] lg:text-[6vw]">
            <span className="block">Self-taught.</span>
            <span className="block italic leading-[1.1] pb-1">
              Self-made.
            </span>
          </h1>
        </div>

        <p className="hero-sub max-w-sm font-sans text-base leading-relaxed text-ink/65 lg:pb-2">
          Two degrees traded for a laptop and a leap of faith. A platform,
          an audience, and a business built from nothing but curiosity.
        </p>
      </div>

      <div
        aria-hidden
        className="hero-cue absolute bottom-8 left-6 h-14 w-px origin-top bg-ink/25 sm:left-10 lg:left-16"
      />
    </section>
  );
}
