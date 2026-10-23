"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import ScrollMarquee from "@/components/ScrollMarquee";
import { niches, editItems, gradientFor, type Niche, type EditItem } from "@/lib/edit-data";

const filters: (Niche | "All")[] = ["All", ...niches];

function Tile({ item }: { item: EditItem }) {
  return (
    <a
      href={`https://www.instagram.com/reel/${item.shortcode}/`}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex h-56 w-44 shrink-0 flex-col justify-end overflow-hidden rounded-2xl p-4 sm:h-64 sm:w-52"
      style={item.thumbnail ? undefined : { background: gradientFor(item.niche) }}
    >
      {item.thumbnail && (
        <Image
          src={item.thumbnail.src}
          alt=""
          fill
          sizes="208px"
          loading="eager"
          className="object-cover"
        />
      )}
      {item.thumbnail && (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(33,43,35,0.75) 0%, rgba(33,43,35,0.05) 55%, transparent 80%)",
          }}
        />
      )}
      <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-cream/40 bg-cream/10 backdrop-blur-sm">
        <svg width="10" height="12" viewBox="0 0 14 16" fill="none">
          <path d="M0 0.5L14 8L0 15.5V0.5Z" fill="#FAF6F0" fillOpacity="0.9" />
        </svg>
      </span>
      <p className="relative font-sans text-xs font-semibold uppercase tracking-[0.15em] text-cream/60">
        {item.niche}
      </p>
      <p className="relative mt-1 font-sans text-sm font-medium leading-snug text-cream/95">
        Watch on Instagram
      </p>
    </a>
  );
}

function Marquee({ items }: { items: EditItem[] }) {
  return (
    <ScrollMarquee speed={Math.max(items.length * 4, 14)}>
      {items.map((item) => (
        <Tile key={item.id} item={item} />
      ))}
    </ScrollMarquee>
  );
}

export default function EditShowcase() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<Niche | "All">("All");

  useGSAP(
    () => {
      gsap.from(".showcase-heading", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        ease: "premiumOut",
        scrollTrigger: { trigger: ".showcase-heading", start: "top 85%" },
      });
      gsap.from(".showcase-filters", {
        autoAlpha: 0,
        y: 16,
        duration: 0.6,
        ease: "premiumOut",
        scrollTrigger: { trigger: ".showcase-filters", start: "top 88%" },
      });
    },
    { scope: root }
  );

  useGSAP(
    () => {
      gsap.from(".showcase-marquee-wrap", {
        autoAlpha: 0,
        duration: 0.35,
        ease: "premiumOut",
      });
    },
    { scope: root, dependencies: [active] }
  );

  const filtered =
    active === "All" ? editItems : editItems.filter((item) => item.niche === active);

  return (
    <section
      ref={root}
      className="w-full overflow-hidden bg-cream px-6 py-24 sm:px-10 sm:py-32 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="showcase-heading font-serif text-3xl font-medium leading-[1.05] text-charcoal sm:text-4xl">
          The Portfolio.
        </h2>

        <div className="showcase-filters mt-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              className={`rounded-full border px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.15em] transition-[color,background-color,border-color,transform] duration-200 active:scale-[0.97] ${
                active === f
                  ? "border-charcoal bg-charcoal text-cream"
                  : "border-ink/20 text-ink/60 hover:border-charcoal hover:text-charcoal"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="showcase-marquee-wrap mt-12">
        <Marquee key={active} items={filtered} />
      </div>
    </section>
  );
}
