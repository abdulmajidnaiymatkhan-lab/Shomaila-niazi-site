"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import VentureSection from "./VentureSection";
import { ventures } from "@/lib/ventures-data";

export default function VenturesIndex() {
  const root = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const split = new SplitText(".ventures-headline", {
        type: "words,lines",
        mask: "lines",
      });

      const tl = gsap.timeline({ defaults: { ease: "premiumOut" } });
      tl.from(
        ".ventures-hero-photo",
        { autoAlpha: 0, scale: 1.06, duration: 1.1, ease: "premiumInOut" }
      )
        .from(".ventures-kicker", { autoAlpha: 0, y: 12, duration: 0.5 }, "-=0.6")
        .from(
          split.words,
          { yPercent: 110, opacity: 0, duration: 0.8, stagger: 0.04 },
          "-=0.15"
        )
        .from(".ventures-sub", { autoAlpha: 0, y: 14, duration: 0.6 }, "-=0.35");

      gsap.from(".closing-content", {
        autoAlpha: 0,
        y: 20,
        duration: 0.7,
        ease: "premiumOut",
        scrollTrigger: { trigger: ".closing-strip", start: "top 88%" },
      });

      if (!reduceMotion) {
        gsap.to(".ventures-hero-photo", {
          yPercent: -10,
          ease: "none",
          scrollTrigger: { trigger: heroRef.current, scrub: 0.6 },
        });
        gsap.to(".ventures-hero-content", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: { trigger: heroRef.current, scrub: 0.6 },
        });
      }

      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      <section
        ref={heroRef}
        className="relative flex h-[90vh] min-h-[640px] w-full items-end overflow-hidden px-6 pb-16 sm:px-10 lg:px-16"
      >
        {/* Full-bleed photo, entire image visible via the section's own frame */}
        <div className="ventures-hero-photo absolute inset-0">
          <Image
            src="/images/ventures-hero.png"
            alt="Shomaila working at her desk"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_2%]"
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

        <div className="ventures-hero-content relative z-10 mx-auto max-w-3xl">
          <p className="ventures-kicker mb-6 flex items-center gap-2.5 font-sans text-xs font-semibold uppercase tracking-[0.35em] text-cream/80 sm:text-sm">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-sage" />
            My Ventures
          </p>
          <h1
            className="ventures-headline font-serif text-5xl font-medium leading-[1.15] text-cream sm:text-6xl"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.3)" }}
          >
            Two businesses, one belief: you can build it yourself.
          </h1>
          <p className="ventures-sub mt-6 max-w-xl font-sans text-base leading-relaxed text-cream/85 sm:text-lg">
            One taught her everything. The other exists because people kept
            asking her to build it for them too.
          </p>
        </div>
      </section>

      <VentureSection venture={ventures[0]} flip={false} />
      <VentureSection venture={ventures[1]} flip={true} />

      <section
        className="closing-strip px-6 py-20 text-center sm:px-10 lg:px-16"
        style={{
          background: "linear-gradient(180deg, #FAF6F0 0%, #F6D9CE 100%)",
        }}
      >
        <div className="closing-content mx-auto max-w-xl">
          <p className="font-serif text-2xl leading-snug text-charcoal sm:text-3xl">
            Building something and want a hand with the story around it?
          </p>
          <Link
            href="/connect"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-charcoal/25 px-6 py-2.5 font-sans text-sm font-semibold text-ink transition-colors duration-200 hover:border-charcoal active:scale-[0.97]"
          >
            Connect with her
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
