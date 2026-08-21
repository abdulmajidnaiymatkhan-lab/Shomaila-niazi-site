"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";

const paragraphs = [
  "She started down software engineering, then switched to fashion design. Two full degrees, neither one felt like hers.",
  "In 2016, she found digital marketing. No mentor, no course, just a laptop and a willingness to learn in public, one small win at a time.",
  "What began as an experiment became a platform reaching millions, built on nothing but consistency and the refusal to wait for permission.",
];

export default function Story() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const headlineSplit = new SplitText(".story-headline", {
        type: "words,lines",
        mask: "lines",
      });

      gsap.from(headlineSplit.words, {
        yPercent: 110,
        opacity: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: "premiumOut",
        scrollTrigger: { trigger: ".story-headline", start: "top 82%" },
      });

      const paraSplits = gsap.utils
        .toArray<HTMLElement>(".story-para")
        .map((el) => {
          const split = new SplitText(el, { type: "lines", mask: "lines" });
          gsap.from(split.lines, {
            yPercent: 100,
            opacity: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: "premiumOut",
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
          return split;
        });

      if (!reduceMotion) {
        gsap.to(".story-panel-back", {
          yPercent: -18,
          ease: "none",
          scrollTrigger: { trigger: root.current, scrub: 0.6 },
        });
        gsap.to(".story-panel-front", {
          yPercent: 10,
          ease: "none",
          scrollTrigger: { trigger: root.current, scrub: 0.6 },
        });
      }

      gsap.from(".story-photo-mobile", {
        autoAlpha: 0,
        y: 24,
        duration: 0.8,
        ease: "premiumOut",
        scrollTrigger: { trigger: ".story-photo-mobile", start: "top 88%" },
      });

      gsap.from(".story-cta", {
        autoAlpha: 0,
        y: 14,
        duration: 0.6,
        ease: "premiumOut",
        scrollTrigger: { trigger: ".story-cta", start: "top 92%" },
      });

      return () => {
        headlineSplit.revert();
        paraSplits.forEach((split) => split.revert());
      };
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="w-full overflow-hidden bg-cream px-6 py-28 text-ink sm:px-10 sm:py-36 lg:px-16"
    >
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="relative hidden min-h-[420px] lg:block">
          <div
            aria-hidden
            className="story-panel-back absolute inset-0 rounded-[2rem]"
            style={{
              background:
                "linear-gradient(155deg, rgba(242,196,184,0.9), rgba(33,43,35,0.85) 78%)",
            }}
          />
          <div className="story-panel-front absolute inset-8 overflow-hidden rounded-[1.5rem] shadow-[0_30px_60px_-15px_rgba(33,43,35,0.4)]">
            <Image
              src="/images/home-story-teaser.png"
              alt="Shomaila working at her desk"
              fill
              sizes="420px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="max-w-2xl">
          {/* Compact photo, mobile/tablet only — the layered card is lg:block above */}
          <div className="story-photo-mobile relative mb-10 aspect-square w-full max-w-sm overflow-hidden rounded-[1.5rem] shadow-[0_25px_50px_-15px_rgba(33,43,35,0.35)] lg:hidden">
            <Image
              src="/images/home-story-teaser.png"
              alt="Shomaila working at her desk"
              fill
              sizes="(max-width: 1024px) 90vw, 0px"
              className="object-cover"
            />
          </div>

          <h2 className="story-headline font-serif text-4xl font-medium leading-[1.05] sm:text-5xl">
            From two degrees to a platform of her own.
          </h2>

          <div className="mt-10 space-y-7">
            {paragraphs.map((text) => (
              <p
                key={text}
                className="story-para font-sans text-lg leading-relaxed text-ink/75 sm:text-xl"
              >
                {text}
              </p>
            ))}
          </div>

          <Link
            href="/story"
            className="story-cta group mt-10 inline-flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-[0.15em] text-ink/80 transition-colors duration-200 hover:text-charcoal"
          >
            Read her full story
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
