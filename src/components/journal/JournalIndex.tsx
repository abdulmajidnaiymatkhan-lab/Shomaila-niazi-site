"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import PostCard from "./PostCard";
import type { JournalPost } from "@/lib/journal-posts";

export default function JournalIndex({ posts }: { posts: JournalPost[] }) {
  const root = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const split = new SplitText(".journal-headline", {
        type: "words,lines",
        mask: "lines",
      });

      const tl = gsap.timeline({ defaults: { ease: "premiumOut" } });
      tl.from(
        ".journal-hero-photo",
        { autoAlpha: 0, scale: 1.06, duration: 1.1, ease: "premiumInOut" }
      )
        .from(".journal-kicker", { autoAlpha: 0, y: 12, duration: 0.5 }, "-=0.6")
        .from(
          split.words,
          { yPercent: 110, opacity: 0, duration: 0.8, stagger: 0.04 },
          "-=0.15"
        )
        .from(".journal-sub", { autoAlpha: 0, y: 14, duration: 0.6 }, "-=0.35");

      gsap.from(".journal-card", {
        autoAlpha: 0,
        y: 40,
        duration: 0.8,
        ease: "premiumOut",
        stagger: 0.12,
        scrollTrigger: { trigger: ".journal-grid", start: "top 82%" },
      });

      if (!reduceMotion) {
        gsap.to(".journal-hero-photo", {
          yPercent: -10,
          ease: "none",
          scrollTrigger: { trigger: heroRef.current, scrub: 0.6 },
        });
        gsap.to(".journal-hero-content", {
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
        <div className="journal-hero-photo absolute inset-0">
          <Image
            src="/images/journal-hero.png"
            alt="Shomaila vlogging on a European street"
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
              "linear-gradient(0deg, rgba(33,43,35,0.85) 0%, rgba(33,43,35,0.62) 40%, rgba(33,43,35,0.2) 70%, rgba(33,43,35,0) 100%)",
          }}
        />

        <div className="journal-hero-content relative z-10 mx-auto max-w-3xl">
          <p className="journal-kicker mb-6 flex items-center gap-2.5 font-sans text-xs font-semibold uppercase tracking-[0.35em] text-cream/80 sm:text-sm">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-peach" />
            My Journal
          </p>
          <h1
            className="journal-headline font-serif text-5xl font-medium leading-[1.15] text-cream sm:text-6xl"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.3)" }}
          >
            Lessons, reflections, and the process — unfiltered.
          </h1>
          <p className="journal-sub mt-6 max-w-xl font-sans text-base leading-relaxed text-cream/75 sm:text-lg">
            Every entry here starts as a video. Soon this section publishes
            itself the moment a new one goes up — transcribed, summarized,
            and posted automatically. For now, a preview of what that looks
            like.
          </p>
        </div>
      </section>

      <section className="bg-cream px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
        <div className="journal-grid mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
