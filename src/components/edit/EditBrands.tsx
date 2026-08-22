"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { brands } from "@/lib/edit-data";

const rowOne = brands.slice(0, 5);
const rowTwo = brands.slice(5);

function Wordmark({ name }: { name: string }) {
  return (
    <div className="flex h-16 shrink-0 items-center rounded-full border border-cream/15 px-8 sm:h-20 sm:px-10">
      <span className="font-serif text-lg font-medium tracking-[0.05em] text-cream/70 sm:text-xl">
        {name}
      </span>
    </div>
  );
}

function BrandRow({ names, reverse = false }: { names: string[]; reverse?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const track = trackRef.current;
    if (!track) return;

    const tween = reverse
      ? gsap.fromTo(
          track,
          { xPercent: -50 },
          { xPercent: 0, duration: 26, ease: "none", repeat: -1 }
        )
      : gsap.to(track, { xPercent: -50, duration: 26, ease: "none", repeat: -1 });

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
      <div ref={trackRef} className="flex w-max gap-4">
        {names.map((n) => (
          <Wordmark key={n} name={n} />
        ))}
        {names.map((n) => (
          <Wordmark key={`${n}-dup`} name={n} />
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
          Placeholder — real logos coming soon
        </p>
        <h2 className="brands-heading mt-3 font-serif text-3xl font-medium leading-[1.05] sm:text-4xl">
          Brands I&rsquo;ve partnered with.
        </h2>
      </div>

      <div className="mt-12 space-y-5">
        <BrandRow names={rowOne} />
        <BrandRow names={rowTwo} reverse />
      </div>
    </section>
  );
}
