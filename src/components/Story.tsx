"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";

const paragraphs = [
  "I started down software engineering, then switched to fashion design. Two full degrees, neither one felt like mine.",
  "Then I found digital marketing. No mentor, no course — just a laptop, and a willingness to learn in public, one small win at a time.",
  "What began as an experiment became a platform reaching hundreds of thousands, built on nothing but consistency and the refusal to wait for permission.",
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

      gsap.from(
        headlineSplit.words,
        reduceMotion
          ? {
              opacity: 0,
              duration: 0.5,
              ease: "premiumOut",
              scrollTrigger: { trigger: ".story-headline", start: "top 82%" },
            }
          : {
              yPercent: 110,
              opacity: 0,
              duration: 0.8,
              stagger: 0.03,
              ease: "premiumOut",
              scrollTrigger: { trigger: ".story-headline", start: "top 82%" },
            }
      );

      const paraSplits = gsap.utils
        .toArray<HTMLElement>(".story-para")
        .map((el) => {
          const split = new SplitText(el, { type: "lines", mask: "lines" });
          gsap.from(
            split.lines,
            reduceMotion
              ? {
                  opacity: 0,
                  duration: 0.5,
                  ease: "premiumOut",
                  scrollTrigger: { trigger: el, start: "top 88%" },
                }
              : {
                  yPercent: 100,
                  opacity: 0,
                  duration: 0.7,
                  stagger: 0.06,
                  ease: "premiumOut",
                  scrollTrigger: { trigger: el, start: "top 88%" },
                }
          );
          return split;
        });

      if (!reduceMotion) {
        gsap.utils.toArray<HTMLElement>(".story-para").forEach((para) => {
          gsap.fromTo(
            para,
            { opacity: 0.4 },
            {
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: para,
                start: "top 65%",
                end: "top 35%",
                scrub: 0.4,
              },
            }
          );
          gsap.to(para, {
            opacity: 0.4,
            ease: "none",
            scrollTrigger: {
              trigger: para,
              start: "bottom 35%",
              end: "bottom 5%",
              scrub: 0.4,
            },
          });
        });

        gsap.to(".story-panel-front", {
          yPercent: -12,
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
      className="relative w-full overflow-hidden bg-cream px-6 py-28 text-ink sm:px-10 sm:py-36 lg:min-h-[760px] lg:px-16"
    >
      {/* Large, full-height photo panel — same concept as the hero: bleeds to the
          edge, and the photo itself fades to transparent (via mask) so the
          section's own cream background shows through underneath. Cropped so her
          face/head always stay inside the opaque zone, never in the fade. */}
      <div className="story-panel-front absolute inset-y-0 left-0 hidden w-[56%] lg:block">
        {/* The mask lives on this inner layer, not the outer .story-panel-front
            that GSAP slides — CSS masking clips its content to its OWN box
            regardless of how the content inside is transformed, so an
            overscanned image would just get clipped straight back down.
            Oversizing this masked box (top/bottom only — the mask fades
            horizontally) gives it real room once the layer above it slides.
            object-position moves from 38% to ~40.6% to match — enlarging the
            box shifts where each percentage point lands. */}
        <div
          className="absolute -top-[14%] -bottom-[14%] inset-x-0"
          style={{
            maskImage:
              "linear-gradient(90deg, black 0%, black 68%, transparent 96%)",
            WebkitMaskImage:
              "linear-gradient(90deg, black 0%, black 68%, transparent 96%)",
          }}
        >
          <Image
            src="/images/home-story-teaser.png"
            alt="Shomaila working at her desk"
            fill
            sizes="56vw"
            className="object-cover object-[center_40.6%]"
          />
        </div>
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div aria-hidden className="hidden lg:block" />

        <div className="max-w-2xl">
          {/* Compact photo, mobile/tablet only — the large panel is lg:block above */}
          <div className="story-photo-mobile relative mb-10 aspect-square w-full max-w-sm overflow-hidden rounded-[1.5rem] shadow-[0_25px_50px_-15px_rgba(33,43,35,0.35)] lg:hidden">
            <Image
              src="/images/home-story-teaser.png"
              alt="Shomaila working at her desk"
              fill
              sizes="(max-width: 1024px) 90vw, 0px"
              className="object-cover"
            />
          </div>

          <h2 className="story-headline font-serif text-4xl font-medium leading-[1.15] sm:text-5xl">
            From two degrees to a platform of my own.
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
            Read my full story
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
