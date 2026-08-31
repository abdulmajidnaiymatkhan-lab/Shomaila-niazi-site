"use client";

import { useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { socialLinks } from "@/lib/social-links";
import { getYouTubeEmbedId, getYouTubeThumbnail } from "@/lib/youtube";

const instagramTiles = [
  "linear-gradient(140deg, #F2C4B8, #212B23 130%)",
  "linear-gradient(140deg, #9CAF88, #212B23 130%)",
  "linear-gradient(140deg, #F6D9CE, #3a4a3d 130%)",
  "linear-gradient(140deg, #212B23, #F2C4B8 130%)",
  "linear-gradient(140deg, #B9A3E3, #212B23 130%)",
];

// Same 3 videos as My Journal's real posts, plus one not featured there.
const youtubeTiles = [
  {
    title: "How I became financially Independent | MY FULL STORY",
    videoUrl: "https://youtu.be/eFvhH-npT8k",
  },
  {
    title:
      "Our Move To Europe | How We Lost Everything & Still Made It \u{1F1F5}\u{1F1F9}",
    videoUrl: "https://youtu.be/2mvKiqCjEPQ",
  },
  {
    title: "Our Love Story | We Were Strangers in the Same Room for Years♥️",
    videoUrl: "https://youtu.be/sUwqhovxAT4",
  },
  {
    title: "Setting Up Our New Home in Portugal",
    videoUrl: "https://youtu.be/3s4QTCFsbeU",
  },
];

function YouTubeTile({ title, videoUrl }: { title: string; videoUrl: string }) {
  const [previewing, setPreviewing] = useState(false);
  const embedId = getYouTubeEmbedId(videoUrl);

  return (
    <a
      href={videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch "${title}" on YouTube`}
      className="relative flex h-40 w-64 shrink-0 items-end overflow-hidden rounded-2xl bg-charcoal sm:h-44 sm:w-72"
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse" && embedId) setPreviewing(true);
      }}
      onPointerLeave={() => setPreviewing(false)}
    >
      {embedId && (
        <Image
          src={getYouTubeThumbnail(embedId)}
          alt=""
          fill
          sizes="288px"
          className="object-cover"
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, rgba(33,43,35,0.85) 0%, rgba(33,43,35,0.1) 55%, transparent 80%)",
        }}
      />
      {previewing && embedId && (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${embedId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${embedId}&modestbranding=1&playsinline=1`}
          title={title}
          allow="autoplay; encrypted-media"
          tabIndex={-1}
        />
      )}
      <span
        className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-cream/40 bg-cream/10 backdrop-blur-sm transition-opacity duration-200 ${previewing ? "opacity-0" : "opacity-100"}`}
      >
        <svg width="11" height="13" viewBox="0 0 14 16" fill="none">
          <path d="M0 0.5L14 8L0 15.5V0.5Z" fill="#FAF6F0" fillOpacity="0.9" />
        </svg>
      </span>
      <p
        className={`relative p-5 font-sans text-sm font-medium leading-snug text-cream/90 transition-opacity duration-200 ${previewing ? "opacity-0" : "opacity-100"}`}
      >
        {title}
      </p>
    </a>
  );
}

function Marquee({
  children,
  speed = 40,
}: {
  children: ReactNode;
  speed?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const track = trackRef.current;
    if (!track) return;

    const tween = gsap.to(track, {
      xPercent: -50,
      duration: speed,
      ease: "none",
      repeat: -1,
    });

    const onEnter = () => tween.timeScale(0.15);
    const onLeave = () => tween.timeScale(1);
    track.addEventListener("pointerenter", onEnter);
    track.addEventListener("pointerleave", onLeave);
    return () => {
      track.removeEventListener("pointerenter", onEnter);
      track.removeEventListener("pointerleave", onLeave);
    };
  });

  return (
    <div className="overflow-hidden">
      <div ref={trackRef} className="flex w-max gap-5">
        {children}
        {children}
      </div>
    </div>
  );
}

export default function ConnectHighlights() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".highlight-col", {
        autoAlpha: 0,
        y: 32,
        duration: 0.8,
        stagger: 0.15,
        ease: "premiumOut",
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="w-full bg-charcoal px-6 py-28 text-cream sm:px-10 sm:py-32 lg:px-16"
    >
      <div className="mx-auto max-w-6xl space-y-20">
        <div className="highlight-col">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-peach/80">
                245K on Instagram
              </p>
              <h2 className="mt-2 font-serif text-3xl font-medium sm:text-4xl">
                The day-to-day
              </h2>
            </div>
            <a
              href={socialLinks.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden shrink-0 font-sans text-sm font-semibold text-cream/70 transition-colors hover:text-cream sm:inline-flex"
            >
              Follow &rarr;
            </a>
          </div>

          <div className="mt-8">
            <Marquee speed={34}>
              {instagramTiles.map((bg, i) => (
                <div
                  key={i}
                  className="h-40 w-40 shrink-0 rounded-2xl sm:h-48 sm:w-48"
                  style={{ background: bg }}
                />
              ))}
            </Marquee>
          </div>
          <a
            href={socialLinks.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex font-sans text-sm font-semibold text-cream/70 transition-colors hover:text-cream sm:hidden"
          >
            Follow &rarr;
          </a>
        </div>

        <div className="highlight-col">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-sage/90">
                340K on YouTube
              </p>
              <h2 className="mt-2 font-serif text-3xl font-medium sm:text-4xl">
                The full story, on video
              </h2>
            </div>
            <a
              href={socialLinks.youtube.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden shrink-0 font-sans text-sm font-semibold text-cream/70 transition-colors hover:text-cream sm:inline-flex"
            >
              Subscribe &rarr;
            </a>
          </div>

          <div className="mt-8">
            <Marquee speed={46}>
              {youtubeTiles.map((tile) => (
                <YouTubeTile key={tile.videoUrl} title={tile.title} videoUrl={tile.videoUrl} />
              ))}
            </Marquee>
          </div>
          <a
            href={socialLinks.youtube.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex font-sans text-sm font-semibold text-cream/70 transition-colors hover:text-cream sm:hidden"
          >
            Subscribe &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
