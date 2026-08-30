"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";

const echoes = [
  { dot: "#F2C4B8", from: "Home", line: "Self-taught. Self-made." },
  { dot: "#212B23", from: "My Story", line: "No team. No budget. Just me." },
  {
    dot: "#8A5CB8",
    from: "My Ventures",
    line: "One belief: you can build it yourself.",
  },
  {
    dot: "#9CAF88",
    from: "My Journal",
    line: "Lessons, reflections, and the process — unfiltered.",
  },
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

      gsap.from(".connect-kicker", {
        autoAlpha: 0,
        y: 12,
        duration: 0.5,
        ease: "premiumOut",
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });

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

      gsap.from(".connect-photo-mobile", {
        autoAlpha: 0,
        y: 24,
        duration: 0.8,
        ease: "premiumOut",
        scrollTrigger: { trigger: ".connect-photo-mobile", start: "top 88%" },
      });

      if (!reduceMotion) {
        gsap.to(".connect-panel-front", {
          yPercent: -12,
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
      className="relative w-full overflow-hidden bg-cream px-6 py-28 text-ink sm:px-10 sm:py-36 lg:min-h-[760px] lg:px-16"
    >
      {/* Large photo panel — same concept as the Home story-teaser: bleeds to the
          edge, and the photo itself fades to transparent (via mask) so the
          section's own cream background shows through underneath. Held down from
          the top so her head always sits below the nav. */}
      <div
        className="connect-panel-front absolute left-0 top-24 bottom-0 hidden w-[56%] lg:block"
        style={{
          maskImage:
            "linear-gradient(90deg, black 0%, black 68%, transparent 96%)",
          WebkitMaskImage:
            "linear-gradient(90deg, black 0%, black 68%, transparent 96%)",
        }}
      >
        <Image
          src="/images/connect-hero.png"
          alt="Shomaila overlooking the sea on the Portugal coast"
          fill
          priority
          sizes="56vw"
          className="object-cover object-[center_30%]"
        />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div aria-hidden className="hidden lg:block" />

        <div className="max-w-2xl">
          {/* Compact photo, mobile/tablet only — the large panel is lg:block above */}
          <div className="connect-photo-mobile relative mb-10 aspect-square w-full max-w-sm overflow-hidden rounded-[1.5rem] shadow-[0_25px_50px_-15px_rgba(33,43,35,0.35)] lg:hidden">
            <Image
              src="/images/connect-hero.png"
              alt="Shomaila overlooking the sea on the Portugal coast"
              fill
              sizes="(max-width: 1024px) 90vw, 0px"
              className="object-cover object-[center_20%]"
            />
          </div>

          <p className="connect-kicker mb-6 flex items-center gap-2.5 font-sans text-xs font-semibold uppercase tracking-[0.35em] text-ink/65">
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
                <span className="font-sans text-xs uppercase tracking-[0.15em] text-ink/45">
                  {echo.from}
                </span>
                <span className="font-serif text-lg italic text-ink/80 sm:text-xl">
                  {echo.line}
                </span>
              </div>
            ))}
          </div>

          <h1 className="connect-headline mt-10 font-serif text-5xl font-medium leading-[1.15] text-charcoal sm:text-6xl lg:text-7xl">
            This isn&rsquo;t the end of the story.
          </h1>
          <p className="connect-sub mt-6 max-w-xl font-sans text-base leading-relaxed text-ink/70 sm:text-lg">
            It&rsquo;s where you step into it &mdash; as a follower, a client,
            or someone with a question worth asking.
          </p>
        </div>
      </div>
    </section>
  );
}
