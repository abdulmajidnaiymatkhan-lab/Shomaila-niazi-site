"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { brands, type Brand } from "@/lib/edit-data";

const rowOne = brands.slice(0, Math.ceil(brands.length / 2));
const rowTwo = brands.slice(Math.ceil(brands.length / 2));

function Wordmark({ brand }: { brand: Brand }) {
  const accent = brand.accent;

  return (
    <div
      className="flex h-24 w-40 shrink-0 items-center justify-center rounded-2xl border bg-cream px-6 transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-1 sm:h-28 sm:w-48"
      style={{
        borderColor: `${accent}33`,
        boxShadow: `0 12px 28px -14px ${accent}66`,
      }}
    >
      {brand.logo ? (
        <Image
          src={brand.logo.src}
          alt={brand.name}
          width={brand.logo.width}
          height={brand.logo.height}
          unoptimized
          // Every tile is the same fixed box regardless of the logo's native
          // aspect ratio — object-contain fits each one inside it so a tall
          // mark (Unilever) or a wide one (Skin1004) never reads as a
          // different size from its neighbors.
          className="max-h-14 max-w-full object-contain sm:max-h-16"
        />
      ) : (
        <span className="font-serif text-lg font-medium tracking-[0.05em] text-ink/80 sm:text-xl">
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
    <div className="overflow-hidden py-4">
      <div ref={trackRef} className="flex w-max items-center gap-5 sm:gap-6">
        {rowBrands.map((brand) => (
          <Wordmark key={brand.name} brand={brand} />
        ))}
        {rowBrands.map((brand) => (
          <Wordmark key={`${brand.name}-dup`} brand={brand} />
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
