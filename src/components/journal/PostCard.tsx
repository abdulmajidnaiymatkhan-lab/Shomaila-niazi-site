"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import type { JournalPost } from "@/lib/journal-posts";

export default function PostCard({ post }: { post: JournalPost }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const xTo = gsap.quickTo(card, "rotateY", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(card, "rotateX", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      const relX = (e.clientX - r.left) / r.width - 0.5;
      const relY = (e.clientY - r.top) / r.height - 0.5;
      xTo(relX * 5);
      yTo(relY * -5);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);
    return () => {
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <Link
      ref={cardRef}
      href={`/journal/${post.slug}`}
      className="journal-card group flex flex-col overflow-hidden rounded-2xl border border-charcoal/10 bg-cream transition-[border-color,transform] duration-200 ease-out active:scale-[0.97] hover:border-charcoal/30"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        aria-hidden
        className="relative flex aspect-video items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(150deg, #212B23 0%, #3a4a3d 55%, #F2C4B8 130%)",
        }}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/40 bg-cream/10 backdrop-blur-sm transition-transform duration-200 group-hover:scale-110">
          <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
            <path d="M0 0.5L14 8L0 15.5V0.5Z" fill="#FAF6F0" fillOpacity="0.9" />
          </svg>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-sage">
          {post.category}
        </p>
        <h2 className="mt-3 font-serif text-2xl font-medium leading-snug text-ink">
          {post.title}
        </h2>
        <p className="mt-3 flex-1 font-sans text-base leading-relaxed text-ink/70">
          {post.excerpt}
        </p>
        <div className="mt-6 flex items-center justify-between font-sans text-xs uppercase tracking-[0.15em] text-ink/45">
          <span>
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </Link>
  );
}
