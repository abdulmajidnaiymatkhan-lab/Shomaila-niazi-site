"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import type { JournalPost } from "@/lib/journal-posts";
import { getYouTubeEmbedId, getYouTubeThumbnail } from "@/lib/youtube";

export default function PostCard({ post }: { post: JournalPost }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [previewing, setPreviewing] = useState(false);
  const embedId = getYouTubeEmbedId(post.videoUrl);

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
    // Video preview only for real hover (mouse/trackpad) — a touch tap
    // shouldn't start playing a muted clip before navigating away.
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && embedId) setPreviewing(true);
    };
    const onLeavePreview = () => setPreviewing(false);

    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);
    card.addEventListener("pointerenter", onEnter);
    card.addEventListener("pointerleave", onLeavePreview);
    return () => {
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
      card.removeEventListener("pointerenter", onEnter);
      card.removeEventListener("pointerleave", onLeavePreview);
    };
  }, [embedId]);

  return (
    <Link
      ref={cardRef}
      href={`/journal/${post.slug}`}
      className="journal-card group flex flex-col overflow-hidden rounded-2xl border border-charcoal/10 bg-cream transition-[border-color,transform] duration-200 ease-out active:scale-[0.97] hover:border-charcoal/30"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        aria-hidden
        className="relative flex aspect-video items-center justify-center overflow-hidden bg-charcoal"
      >
        {embedId && (
          <Image
            src={getYouTubeThumbnail(embedId)}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        )}
        {previewing && embedId && (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${embedId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${embedId}&modestbranding=1&playsinline=1`}
            title={post.title}
            allow="autoplay; encrypted-media"
            tabIndex={-1}
          />
        )}
        <span
          className={`relative flex h-12 w-12 items-center justify-center rounded-full border border-cream/40 bg-cream/10 backdrop-blur-sm transition-[transform,opacity] duration-200 group-hover:scale-110 ${previewing ? "opacity-0" : "opacity-100"}`}
        >
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
