"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import type { JournalPost } from "@/lib/journal-posts";

export default function PostDetail({
  post,
  more,
}: {
  post: JournalPost;
  more: JournalPost[];
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const headlineSplit = new SplitText(".post-headline", {
        type: "words,lines",
        mask: "lines",
      });

      const tl = gsap.timeline({ defaults: { ease: "premiumOut" } });
      tl.from(".post-kicker", { autoAlpha: 0, y: 12, duration: 0.5 })
        .from(
          headlineSplit.words,
          { yPercent: 110, opacity: 0, duration: 0.8, stagger: 0.03 },
          "-=0.15"
        )
        .from(".post-meta", { autoAlpha: 0, y: 10, duration: 0.5 }, "-=0.3");

      gsap.from(".key-points-box", {
        autoAlpha: 0,
        y: 32,
        duration: 0.8,
        ease: "premiumOut",
        scrollTrigger: { trigger: ".key-points-box", start: "top 85%" },
      });
      gsap.from(".key-points-box li", {
        autoAlpha: 0,
        x: -12,
        duration: 0.5,
        stagger: 0.08,
        ease: "premiumOut",
        scrollTrigger: { trigger: ".key-points-box", start: "top 80%" },
      });

      gsap.from(".post-video", {
        autoAlpha: 0,
        y: 24,
        duration: 0.8,
        ease: "premiumOut",
        scrollTrigger: { trigger: ".post-video", start: "top 85%" },
      });

      const paraSplits = gsap.utils
        .toArray<HTMLElement>(".post-para")
        .map((el) => {
          const split = new SplitText(el, { type: "lines", mask: "lines" });
          gsap.from(split.lines, {
            yPercent: 100,
            opacity: 0,
            duration: 0.7,
            stagger: 0.05,
            ease: "premiumOut",
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
          return split;
        });

      gsap.from(".more-card", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        ease: "premiumOut",
        stagger: 0.1,
        scrollTrigger: { trigger: ".more-grid", start: "top 88%" },
      });

      return () => {
        headlineSplit.revert();
        paraSplits.forEach((split) => split.revert());
      };
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      <section
        className="px-6 py-24 sm:px-10 sm:py-32 lg:px-16"
        style={{
          background:
            "linear-gradient(160deg, #F2C4B8 0%, #F6D9CE 45%, #FAF6F0 100%)",
        }}
      >
        <div className="mx-auto max-w-3xl">
          <Link
            href="/journal"
            className="post-kicker mb-8 inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-ink/60 transition-colors hover:text-ink"
          >
            &larr; My Journal
          </Link>
          <p className="post-kicker mb-4 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-sage">
            {post.category}
          </p>
          <h1 className="post-headline font-serif text-4xl font-medium leading-[1.05] text-charcoal sm:text-5xl">
            {post.title}
          </h1>
          <div className="post-meta mt-6 flex items-center gap-4 font-sans text-sm text-ink/55">
            <span>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span aria-hidden>&middot;</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      <section className="bg-cream px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <div className="key-points-box rounded-2xl bg-charcoal p-8 sm:p-10">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-peach">
              Key Points
            </p>
            <p className="mt-2 font-sans text-sm text-cream/50">
              The quick version, for readers short on time.
            </p>
            <ul className="mt-6 space-y-4">
              {post.keyPoints.map((point) => (
                <li key={point} className="flex gap-3 font-sans text-base leading-relaxed text-cream/90">
                  <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-peach" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div
            aria-hidden
            className="post-video relative mt-12 flex aspect-video items-center justify-center overflow-hidden rounded-2xl"
            style={{
              background:
                "linear-gradient(150deg, #212B23 0%, #3a4a3d 55%, #F2C4B8 130%)",
            }}
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-cream/40 bg-cream/10 backdrop-blur-sm">
              <svg width="18" height="20" viewBox="0 0 14 16" fill="none">
                <path d="M0 0.5L14 8L0 15.5V0.5Z" fill="#FAF6F0" fillOpacity="0.9" />
              </svg>
            </span>
            <span className="absolute bottom-4 right-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-cream/70">
              Video coming soon
            </span>
          </div>

          <div className="mt-14 space-y-7">
            {post.body.map((paragraph) => (
              <p
                key={paragraph}
                className="post-para font-sans text-lg leading-relaxed text-ink/80 sm:text-xl"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {more.length > 0 && (
        <section className="bg-cream px-6 pb-28 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-3xl border-t border-charcoal/10 pt-14">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">
              More from the Journal
            </p>
            <div className="more-grid mt-6 grid gap-5 sm:grid-cols-2">
              {more.map((item) => (
                <Link
                  key={item.slug}
                  href={`/journal/${item.slug}`}
                  className="more-card group rounded-xl border border-charcoal/10 bg-white/40 p-6 transition-colors duration-200 hover:border-sage active:scale-[0.97]"
                >
                  <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-sage">
                    {item.category}
                  </p>
                  <h2 className="mt-2 font-serif text-xl font-medium leading-snug text-ink transition-transform duration-200 group-hover:translate-x-1">
                    {item.title}
                  </h2>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
