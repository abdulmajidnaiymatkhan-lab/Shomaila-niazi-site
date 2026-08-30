"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";

const beats = [
  {
    meta: "6 semesters",
    label: "Software Engineering",
    text: "Six semesters into a software engineering degree, I already knew it wasn't going to be my career.",
  },
  {
    meta: "5 semesters",
    label: "Fashion Design",
    text: "I switched to fashion design instead. Five semesters later, life had other plans.",
  },
  {
    meta: "2016 – 2019",
    label: "The Pivot",
    text: "While that software engineering degree was still running, I started managing social media and product listings for a few small brands on the side. That's where I found digital marketing — and where I posted my first pieces of content, on Instagram and YouTube, with no idea it would become a career.",
  },
  {
    meta: "No shortcuts",
    label: "The Build",
    text: "No team. No budget. No plan B. Just consistency, one post at a time, for years.",
  },
];

export default function StoryTimeline() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        { isDesktop: "(min-width: 1024px)", isMobile: "(max-width: 1023px)" },
        (context) => {
          const { isDesktop } = context.conditions as { isDesktop: boolean };
          const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches;
          const panels = gsap.utils.toArray<HTMLElement>(".beat-panel");
          const dots = gsap.utils.toArray<HTMLElement>(".beat-dot");

          if (isDesktop && reduceMotion) {
            // --- Desktop, but motion-sensitive: static final state, no pin/scrub ---
            gsap.set(panels, { autoAlpha: 0 });
            gsap.set(panels[panels.length - 1], { autoAlpha: 1 });
            gsap.set(dots, { backgroundColor: "#F2C4B8", borderColor: "#F2C4B8" });
            gsap.set(".spine-line", { scaleY: 1 });
            gsap.set(".mood-layer", { opacity: 1 });
            return;
          }

          if (isDesktop) {
            // --- Desktop: pinned, scrubbed scrollytelling ---
            gsap.set(panels, { autoAlpha: 0, y: 16 });
            gsap.set(panels[0], { autoAlpha: 1, y: 0 });
            gsap.set(dots[0], { backgroundColor: "#F2C4B8", borderColor: "#F2C4B8" });

            const seg = 1;
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: root.current,
                start: "top top",
                end: `+=${beats.length * 100}%`,
                scrub: 0.7,
                pin: true,
                anticipatePin: 1,
              },
            });

            panels.forEach((panel, i) => {
              if (i === 0) return;
              const t = i * seg;
              tl.to(panels[i - 1], { autoAlpha: 0, y: -16, duration: 0.3, ease: "premiumOut" }, t - 0.3)
                .to(panel, { autoAlpha: 1, y: 0, duration: 0.3, ease: "premiumOut" }, t - 0.3)
                .to(
                  dots[i],
                  { backgroundColor: "#F2C4B8", borderColor: "#F2C4B8", duration: 0.3 },
                  t - 0.3
                );
            });

            tl.to(".spine-line", { scaleY: 1, ease: "none", duration: beats.length }, 0);
            tl.to(".mood-layer", { opacity: 1, ease: "none", duration: beats.length }, 0);

            return () => {
              panels.forEach((p) => gsap.set(p, { clearProps: "all" }));
            };
          }

          // --- Mobile: stacked, stepped reveals ---
          const mobileDots = gsap.utils.toArray<HTMLElement>(".beat-dot-mobile");
          const splits = gsap.utils.toArray<HTMLElement>(".beat-text").map((el) => {
            const split = new SplitText(el, { type: "lines", mask: "lines" });
            gsap.from(split.lines, {
              yPercent: 100,
              opacity: 0,
              duration: 0.7,
              stagger: 0.05,
              ease: "premiumOut",
              scrollTrigger: { trigger: el, start: "top 85%" },
            });
            return split;
          });

          gsap.utils.toArray<HTMLElement>(".beat-block").forEach((block, i) => {
            gsap.from(block, {
              autoAlpha: 0,
              y: 24,
              duration: 0.7,
              ease: "premiumOut",
              scrollTrigger: { trigger: block, start: "top 85%" },
            });
            gsap.to(mobileDots[i], {
              backgroundColor: "#F2C4B8",
              borderColor: "#F2C4B8",
              duration: 0.3,
              scrollTrigger: { trigger: block, start: "top 70%", once: true },
            });
          });

          return () => splits.forEach((s) => s.revert());
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative w-full overflow-hidden lg:h-screen"
    >
      {/* Ambient mood layer: charcoal at the start, warms toward peach as the story turns */}
      <div aria-hidden className="absolute inset-0 bg-charcoal" />
      <div
        aria-hidden
        className="mood-layer absolute inset-0 opacity-0"
        style={{
          background:
            "linear-gradient(160deg, #F2C4B8 0%, #E8B9AE 35%, #3a4a3d 75%, #212B23 100%)",
        }}
      />

      {/* Desktop: pinned centered card */}
      <div className="relative z-10 hidden h-full items-center justify-center px-6 lg:flex lg:px-16">
        <div className="w-full max-w-3xl rounded-[2rem] border border-cream/10 bg-charcoal/90 p-14 backdrop-blur-sm">
          <div className="flex gap-10">
            <div className="relative w-px shrink-0 bg-cream/15">
              <div
                aria-hidden
                className="spine-line absolute inset-0 origin-top bg-peach"
                style={{ transform: "scaleY(0)" }}
              />
              {beats.map((beat, i) => (
                <div
                  key={beat.label}
                  aria-hidden
                  className="beat-dot absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-cream/25 bg-charcoal transition-none"
                  style={{ top: `${(i / (beats.length - 1)) * 100}%`, marginTop: i === 0 ? 0 : "-6px" }}
                />
              ))}
            </div>

            <div className="relative min-h-[220px] flex-1">
              {beats.map((beat) => (
                <div key={beat.label} className="beat-panel absolute inset-0">
                  <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-peach/80">
                    {beat.meta}
                  </p>
                  <h2 className="mt-3 font-serif text-2xl font-medium text-cream sm:text-3xl">
                    {beat.label}
                  </h2>
                  <p className="mt-4 font-sans text-lg leading-relaxed text-cream/75">
                    {beat.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: stacked, stepped */}
      <div className="relative z-10 flex flex-col gap-10 px-6 py-24 sm:px-10 lg:hidden">
        {beats.map((beat, i) => (
          <div key={beat.label} className="beat-block flex gap-6">
            <div className="flex shrink-0 flex-col items-center">
              <div
                aria-hidden
                className="beat-dot-mobile h-3 w-3 shrink-0 rounded-full border-2 border-cream/25 bg-charcoal"
              />
              {i < beats.length - 1 && (
                <div aria-hidden className="mt-2 w-px flex-1 bg-cream/15" />
              )}
            </div>
            <div className="pb-2">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-peach/80">
                {beat.meta}
              </p>
              <h2 className="mt-3 font-serif text-2xl font-medium text-cream">
                {beat.label}
              </h2>
              <p className="beat-text mt-4 font-sans text-lg leading-relaxed text-cream/75">
                {beat.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
