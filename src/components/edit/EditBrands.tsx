"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { brands, type Brand } from "@/lib/edit-data";

const rowOne = brands.slice(0, Math.ceil(brands.length / 2));
const rowTwo = brands.slice(Math.ceil(brands.length / 2));

// Deterministic per-tile rhythm (no Math.random — must match on server and
// client render). Cycles independently of row length so the pattern still
// reads as "scattered" rather than a repeating tic. Bounding boxes (not just
// height) so wildly different logo aspect ratios — Skin1004's thin wide
// wordmark vs. Unilever's tall mark — still occupy a comparable footprint.
const BOXES = [
  { h: "h-24 sm:h-28", w: "w-[10.5rem] sm:w-[12.5rem]" },
  { h: "h-16 sm:h-20", w: "w-[8rem] sm:w-[9.5rem]" },
  { h: "h-20 sm:h-24", w: "w-[9rem] sm:w-[10.5rem]" },
];
const ROTATIONS = [-4, 3, -2, 4, -3, 2];
const LIFTS = [-6, 10, 2, -10, 6, -2];

function Wordmark({ brand, index }: { brand: Brand; index: number }) {
  const [hovered, setHovered] = useState(false);
  const box = BOXES[index % BOXES.length];
  const rotate = ROTATIONS[index % ROTATIONS.length];
  const lift = LIFTS[index % LIFTS.length];
  const accent = brand.accent;

  // No card, no background — filter: drop-shadow() hugs each logo's actual
  // alpha shape rather than its bounding box, so the glow can never read as
  // a rectangle. A tight bright-white layer gives dark marks (navy, black)
  // real contrast against the charcoal section; the wider accent-tinted
  // layers carry that brand's own color as ambient light.
  const restFilter = `drop-shadow(0 0 3px rgba(255,255,255,0.85)) drop-shadow(0 0 16px ${accent}B3) drop-shadow(0 0 34px ${accent}59)`;
  const hoverFilter = `drop-shadow(0 0 4px rgba(255,255,255,0.95)) drop-shadow(0 0 24px ${accent}E6) drop-shadow(0 0 48px ${accent}80)`;

  const onEnter = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setHovered(true);
  };

  return (
    <div
      className={`flex ${box.h} ${box.w} shrink-0 items-center justify-center`}
      style={{
        transform: `translateY(${(hovered ? lift - 10 : lift) / 2}px) rotate(${hovered ? 0 : rotate}deg) scale(${hovered ? 1.08 : 1})`,
        transition: "transform 300ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onPointerEnter={onEnter}
      onPointerLeave={() => setHovered(false)}
    >
      {brand.logo ? (
        <Image
          src={brand.logo.src}
          alt={brand.name}
          width={brand.logo.width}
          height={brand.logo.height}
          unoptimized
          className="max-h-full max-w-full object-contain transition-[filter] duration-300 ease-out"
          style={{ filter: hovered ? hoverFilter : restFilter }}
        />
      ) : (
        <span
          className="font-serif text-lg font-medium tracking-[0.05em] text-cream/85 sm:text-xl"
          style={{ filter: hovered ? hoverFilter : restFilter }}
        >
          {brand.name}
        </span>
      )}
    </div>
  );
}

function BrandRow({ brands: rowBrands, reverse = false }: { brands: Brand[]; reverse?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const track = trackRef.current;
    if (!track) return;

    const tween = reverse
      ? gsap.fromTo(
          track,
          { xPercent: -50 },
          { xPercent: 0, duration: 30, ease: "none", repeat: -1 }
        )
      : gsap.to(track, { xPercent: -50, duration: 30, ease: "none", repeat: -1 });

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
    <div className="overflow-hidden py-6">
      <div ref={trackRef} className="flex w-max items-center gap-10 sm:gap-14">
        {rowBrands.map((brand, i) => (
          <Wordmark key={brand.name} brand={brand} index={i} />
        ))}
        {rowBrands.map((brand, i) => (
          <Wordmark key={`${brand.name}-dup`} brand={brand} index={i} />
        ))}
      </div>
    </div>
  );
}

export default function EditBrands() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".brands-heading", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        ease: "premiumOut",
        scrollTrigger: { trigger: ".brands-heading", start: "top 85%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="w-full overflow-hidden bg-charcoal px-6 py-24 text-cream sm:px-10 sm:py-32 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <p className="brands-heading font-sans text-xs font-semibold uppercase tracking-[0.3em] text-peach/80">
          A few brands I&rsquo;ve worked with
        </p>
        <h2 className="brands-heading mt-3 font-serif text-3xl font-medium leading-[1.05] sm:text-4xl">
          Brands I&rsquo;ve partnered with.
        </h2>
      </div>

      <div className="mt-8 space-y-4">
        <BrandRow brands={rowOne} />
        <BrandRow brands={rowTwo} reverse />
      </div>
    </section>
  );
}
