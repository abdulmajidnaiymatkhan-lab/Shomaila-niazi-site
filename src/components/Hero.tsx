"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

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
          ".hero-photo, .hero-photo-mobile",
          { autoAlpha: 0, scale: 1.04, duration: 1, ease: "premiumInOut" },
          "-=0.7"
        );

      // Layered scroll parallax: background moves slowest, photo fastest.
      if (!reduceMotion) {
        gsap.to(".hero-bg-layer", {
          yPercent: -14,
          ease: "none",
          scrollTrigger: { trigger: root.current, scrub: 0.6 },
        });
        gsap.to(".hero-photo", {
          yPercent: -10,
          ease: "none",
          scrollTrigger: { trigger: root.current, scrub: 0.6 },
        });
        gsap.to(".hero-content", {
          yPercent: -6,
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

      {/* Right-anchored photo. The photo itself fades to transparent (via mask) so the
          section's own background gradient shows through underneath — no separate
          color layer to mismatch, so the blend is always exact. */}
      <div
        className="hero-photo absolute inset-y-0 right-0 hidden w-[64%] sm:block"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent 0%, transparent 4%, black 26%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, transparent 4%, black 26%, black 100%)",
        }}
      >
        <Image
          src="/images/home-hero.png"
          alt="Portrait of Shomaila Niazi"
          fill
          priority
          sizes="64vw"
          className="object-cover object-[center_15%]"
        />
      </div>

      <div className="hero-content relative z-10 w-full max-w-6xl">
        <div className="max-w-xl">
          {/* Compact portrait, mobile only */}
          <div className="hero-photo-mobile relative mx-auto mb-8 aspect-[3/4] w-36 overflow-hidden rounded-[1.5rem] shadow-[0_20px_40px_-15px_rgba(33,43,35,0.35)] sm:hidden">
            <Image
              src="/images/home-hero.png"
              alt="Portrait of Shomaila Niazi"
              fill
              priority
              sizes="144px"
              className="object-cover"
            />
          </div>

          <p className="hero-kicker mb-6 flex items-center gap-2.5 font-sans text-xs font-semibold uppercase tracking-[0.35em] text-ink/65 sm:text-sm">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-sage"
            />
            Shomaila Niazi &middot; Digital Entrepreneur
          </p>
          <h1 className="hero-headline font-serif text-[15vw] font-medium leading-[1.05] text-charcoal sm:text-[10vw] lg:text-[6vw]">
            <span className="block">Self-taught.</span>
            <span className="block italic leading-[1.2] pb-1">
              Self-made.
            </span>
          </h1>
          <p className="hero-sub mt-6 max-w-sm font-sans text-base leading-relaxed text-ink/65">
            Two degrees traded for a laptop and a leap of faith. A platform,
            an audience, and a business built from nothing but curiosity.
          </p>
        </div>
      </div>
    </section>
  );
}
