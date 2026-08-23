"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";

const echoes = [
  { dot: "#F2C4B8", from: "Home", line: "Self-taught. Self-made." },
  { dot: "#212B23", from: "My Story", line: "No team. No budget. Just her." },
  { dot: "#8A5CB8", from: "My Ventures", line: "Two businesses, one belief." },
  { dot: "#9CAF88", from: "My Journal", line: "Lessons, not just wins." },
];

export default function ConnectRecap() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const split = new SplitText(".connect-headline", {
        type: "words,lines",
        mask: "lines",
      });

      const tl = gsap.timeline({ defaults: { ease: "premiumOut" } });
      tl.from(
        ".connect-hero-photo",
        { autoAlpha: 0, scale: 1.06, duration: 1.1, ease: "premiumInOut" }
      ).from(".connect-kicker", { autoAlpha: 0, y: 12, duration: 0.5 }, "-=0.6");

      gsap.from(".echo-line", {
        autoAlpha: 0,
        x: -16,
        duration: 0.5,
        stagger: 0.15,
        ease: "premiumOut",
        scrollTrigger: { trigger: ".echo-stack", start: "top 80%" },
      });

      gsap.from(split.words, {
        yPercent: 110,
        opacity: 0,
        duration: 0.85,
        stagger: 0.035,
        ease: "premiumOut",
        scrollTrigger: { trigger: ".connect-headline", start: "top 78%" },
      });

      gsap.from(".connect-sub", {
        autoAlpha: 0,
        y: 14,
        duration: 0.6,
        ease: "premiumOut",
        scrollTrigger: { trigger: ".connect-sub", start: "top 85%" },
      });

      if (!reduceMotion) {
        gsap.to(".connect-hero-photo", {
          yPercent: -10,
          ease: "none",
          scrollTrigger: { trigger: root.current, scrub: 0.6 },
        });
        gsap.to(".connect-hero-content", {
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
      className="relative flex min-h-[90vh] w-full flex-col justify-end overflow-hidden px-6 pb-16 pt-28 sm:px-10 lg:min-h-[1900px] lg:px-16"
    >
      {/* Full-bleed photo, entire image visible via the section's own frame */}
      <div className="connect-hero-photo absolute inset-0">
        <Image
          src="/images/connect-hero.png"
          alt="Shomaila overlooking the sea on the Portugal coast"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_4%]"
        />
      </div>

      {/* Scrim: keeps the headline legible without hiding the photo */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, rgba(33,43,35,0.85) 0%, rgba(33,43,35,0.6) 40%, rgba(33,43,35,0.18) 70%, rgba(33,43,35,0) 100%)",
        }}
      />

      <div className="connect-hero-content relative z-10 mx-auto w-full max-w-3xl">
        <p className="connect-kicker mb-10 flex items-center gap-2.5 font-sans text-xs font-semibold uppercase tracking-[0.35em] text-cream/80 sm:text-base">
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-peach" />
          Connect
        </p>

        <div className="echo-stack space-y-3">
          {echoes.map((echo) => (
            <div key={echo.from} className="echo-line flex items-center gap-3">
              <span
                aria-hidden
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: echo.dot }}
              />
              <span className="font-sans text-xs uppercase tracking-[0.15em] text-cream/50 sm:text-sm">
                {echo.from}
              </span>
              <span className="font-serif text-lg italic text-cream/85 sm:text-2xl">
                {echo.line}
              </span>
            </div>
          ))}
        </div>

        <h1
          className="connect-headline mt-10 font-serif text-5xl font-medium leading-[1.15] text-cream sm:text-7xl lg:text-8xl"
          style={{ textShadow: "0 2px 24px rgba(0,0,0,0.3)" }}
        >
          This isn&rsquo;t the end of the story.
        </h1>
        <p className="connect-sub mt-6 max-w-xl font-sans text-base leading-relaxed text-cream/80 sm:text-xl">
          It&rsquo;s where you step into it &mdash; as a follower, a client,
          or someone with a question worth asking.
        </p>
      </div>
    </section>
  );
}
