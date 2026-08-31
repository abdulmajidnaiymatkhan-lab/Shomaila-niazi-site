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
      tl.from(".ventures-kicker", { autoAlpha: 0, y: 12, duration: 0.5 })
        .from(
          split.words,
          { yPercent: 110, opacity: 0, duration: 0.8, stagger: 0.04 },
          "-=0.15"
        )
        .from(".ventures-sub", { autoAlpha: 0, y: 14, duration: 0.6 }, "-=0.35")
        .from(
          ".ventures-hero-photo, .ventures-hero-photo-mobile",
          { autoAlpha: 0, scale: 1.04, duration: 1, ease: "premiumInOut" },
          "-=0.7"
        );

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
      }

      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      <section
        ref={heroRef}
        className="relative flex h-screen min-h-[100dvh] w-full items-center overflow-hidden px-6 pb-14 sm:px-10 lg:px-16"
        style={{
          background:
            "linear-gradient(160deg, #F2C4B8 0%, #F6D9CE 45%, #FAF6F0 100%)",
        }}
      >
        {/* Right-anchored photo, desktop only. The photo itself fades to transparent
            (via mask) on its left edge so the section's own background gradient
            shows through underneath — same concept as the Home hero. A tall, narrow
            panel like this needs far less crop than a full-bleed photo would, so most
            of the frame (her, the laptop, the desk) stays visible. */}
        <div className="ventures-hero-photo absolute inset-y-0 right-0 hidden w-[64%] sm:block">
          {/* The mask lives on this inner layer, not the outer .ventures-hero-photo
              that GSAP slides — CSS masking clips its content to its OWN box no
              matter how the content inside is transformed, so an overscanned
              image would get clipped straight back down. Oversizing this masked
              box (top/bottom only — the mask fades horizontally, so height is
              the axis that needs covering) gives the mask real room once the
              layer above it slides. object-position moves from 2% to 12.5% to
              match — enlarging the box shifts where each percentage point
              lands, so this keeps the same crop she had at 2% before. */}
          <div
            className="absolute -top-[14%] -bottom-[14%] inset-x-0"
            style={{
              maskImage:
                "linear-gradient(90deg, transparent 0%, transparent 4%, black 26%, black 100%)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent 0%, transparent 4%, black 26%, black 100%)",
            }}
          >
            <Image
              src="/images/ventures-hero.png"
              alt="Shomaila working at her desk"
              fill
              priority
              sizes="64vw"
              className="object-cover object-[center_12.5%]"
            />
          </div>
        </div>

        {/* Full-bleed photo, mobile only — background behind the text */}
        <div className="ventures-hero-photo-mobile absolute inset-0 sm:hidden">
          <Image
            src="/images/ventures-hero.png"
            alt="Shomaila working at her desk"
            fill
            priority
            sizes="(max-width: 639px) 100vw, 0px"
            className="object-cover object-[70%_20%]"
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 sm:hidden"
          style={{
            background:
              "linear-gradient(0deg, rgba(33,43,35,0.85) 0%, rgba(33,43,35,0.6) 38%, rgba(33,43,35,0.18) 68%, rgba(33,43,35,0) 100%)",
          }}
        />

        <div className="ventures-hero-content relative z-10 w-full max-w-6xl">
          <div className="max-w-xl">
            <p className="ventures-kicker mb-6 flex items-center gap-2.5 font-sans text-xs font-semibold uppercase tracking-[0.35em] text-cream/80 sm:text-sm sm:text-ink/65">
              <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-sage" />
              My Ventures
            </p>
            <h1
              className="ventures-headline font-serif text-5xl font-medium leading-[1.15] text-cream sm:text-charcoal sm:text-6xl lg:text-7xl"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.25)" }}
            >
              One belief: you can build it yourself.
            </h1>
            <p className="ventures-sub mt-6 max-w-xl font-sans text-base leading-relaxed text-cream/85 sm:text-ink/65 sm:text-lg">
              One taught me everything. The other exists because everyone
              kept asking me to build it for them too. And the newest is
              proof that digital builders can create physical worlds.
            </p>
          </div>
        </div>
      </section>

      <VentureSection venture={ventures[0]} flip={false} />
      <VentureSection venture={ventures[1]} flip={true} />
      <VentureSection venture={ventures[2]} flip={false} />

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
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-charcoal/25 px-6 py-2.5 font-sans text-sm font-semibold text-ink transition-[color,background-color,border-color,transform] duration-200 hover:border-charcoal active:scale-[0.97]"
          >
            Connect with me
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
