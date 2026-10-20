"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { niches, editItems, type Niche } from "@/lib/edit-data";

const filters: (Niche | "All")[] = ["All", ...niches];

function ReelCard({ shortcode }: { shortcode: string }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-cream shadow-[0_8px_30px_rgba(33,43,35,0.08)]">
      <iframe
        src={`https://www.instagram.com/reel/${shortcode}/embed/`}
        title="Instagram reel"
        className="block h-[660px] w-full"
        loading="lazy"
        allow="encrypted-media"
      />
    </div>
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
      gsap.from(".showcase-grid", {
        autoAlpha: 0,
        y: 16,
        duration: 0.4,
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

        <div
          key={active}
          className="showcase-grid mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((item) => (
            <ReelCard key={item.id} shortcode={item.shortcode} />
          ))}
        </div>
      </div>
    </section>
  );
}
