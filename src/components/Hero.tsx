"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-kicker", { autoAlpha: 0, y: 16, duration: 0.7 })
        .from(
          ".hero-line",
          { autoAlpha: 0, y: 40, duration: 0.9, stagger: 0.12 },
          "-=0.35"
        )
        .from(".hero-sub", { autoAlpha: 0, y: 20, duration: 0.7 }, "-=0.5")
        .from(
          ".hero-scroll",
          { autoAlpha: 0, y: -10, duration: 0.6 },
          "-=0.3"
        );

      gsap.to(".hero-scroll-dot", {
        y: 14,
        duration: 1.1,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative flex h-screen min-h-[720px] w-full flex-col justify-between overflow-hidden bg-charcoal px-6 pt-28 pb-10 text-cream sm:px-10 lg:px-16"
    >
      <div>
        <p className="hero-kicker font-sans text-xs font-semibold uppercase tracking-[0.35em] text-sage sm:text-sm">
          Digital Entrepreneur &amp; Founder
        </p>
      </div>

      <div className="max-w-5xl">
        <h1 className="font-serif text-[13vw] leading-[0.98] font-medium tracking-tight sm:text-[9vw] lg:text-[6.4vw]">
          <span className="hero-line block overflow-hidden">
            <span className="block">Self-taught.</span>
          </span>
          <span className="hero-line block overflow-hidden">
            <span className="block text-sage italic">Self-made.</span>
          </span>
          <span className="hero-line block overflow-hidden">
            <span className="block">
              This is{" "}
              <span className="text-peach italic">Shomaila</span>.
            </span>
          </span>
        </h1>
        <p className="hero-sub mt-8 max-w-xl font-sans text-base leading-relaxed text-cream/70 sm:text-lg">
          I traded two degrees for a laptop and a leap of faith — and built a
          platform, a following, and a business from nothing but curiosity
          and consistency.
        </p>
      </div>

      <div className="hero-scroll flex items-center gap-3 self-center font-sans text-xs uppercase tracking-[0.3em] text-cream/60">
        <span className="hidden sm:inline">Scroll</span>
        <span className="flex h-9 w-6 items-start justify-center rounded-full border border-cream/30 p-1.5">
          <span className="hero-scroll-dot block h-1.5 w-1.5 rounded-full bg-peach" />
        </span>
      </div>
    </section>
  );
}
