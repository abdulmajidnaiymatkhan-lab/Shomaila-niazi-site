"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { socialLinks } from "@/lib/social-links";

const instagramTiles = [
  "linear-gradient(140deg, #F2C4B8, #212B23 130%)",
  "linear-gradient(140deg, #9CAF88, #212B23 130%)",
  "linear-gradient(140deg, #F6D9CE, #3a4a3d 130%)",
  "linear-gradient(140deg, #212B23, #F2C4B8 130%)",
  "linear-gradient(140deg, #B9A3E3, #212B23 130%)",
];

const youtubeTiles = [
  "How she grew from zero",
  "Behind the 2016 pivot",
  "Building without a team",
  "What she'd tell her past self",
];

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
              {youtubeTiles.map((title, i) => (
                <div
                  key={i}
                  className="relative flex h-40 w-64 shrink-0 items-end overflow-hidden rounded-2xl sm:h-44 sm:w-72"
                  style={{
                    background:
                      "linear-gradient(150deg, #212B23 0%, #3a4a3d 55%, #F2C4B8 130%)",
                  }}
                >
                  <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-cream/40 bg-cream/10 backdrop-blur-sm">
                    <svg width="11" height="13" viewBox="0 0 14 16" fill="none">
                      <path d="M0 0.5L14 8L0 15.5V0.5Z" fill="#FAF6F0" fillOpacity="0.9" />
                    </svg>
                  </span>
                  <p className="p-5 font-sans text-sm font-medium leading-snug text-cream/90">
                    {title}
                  </p>
                </div>
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
