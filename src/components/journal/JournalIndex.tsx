"use client";

import { useRef } from "react";
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
      tl.from(".journal-kicker", { autoAlpha: 0, y: 12, duration: 0.5 })
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
        gsap.to(".journal-mark", {
          yPercent: -30,
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
        className="relative overflow-hidden px-6 py-28 sm:px-10 sm:py-36 lg:px-16"
        style={{
          background:
            "linear-gradient(160deg, #F2C4B8 0%, #F6D9CE 45%, #FAF6F0 100%)",
        }}
      >
        <div
          aria-hidden
          className="journal-mark pointer-events-none absolute right-[8%] top-[20%] hidden sm:block"
        >
          <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
            <circle cx="90" cy="90" r="88" stroke="#212B23" strokeOpacity="0.15" />
            <circle cx="60" cy="60" r="4" fill="#9CAF88" fillOpacity="0.7" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="journal-kicker mb-6 flex items-center gap-2.5 font-sans text-xs font-semibold uppercase tracking-[0.35em] text-ink/65 sm:text-sm">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-sage" />
            My Journal
          </p>
          <h1 className="journal-headline font-serif text-5xl font-medium leading-[1.05] text-charcoal sm:text-6xl">
            Lessons, reflections, and the process — unfiltered.
          </h1>
          <p className="journal-sub mt-6 max-w-xl font-sans text-base leading-relaxed text-ink/65 sm:text-lg">
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
