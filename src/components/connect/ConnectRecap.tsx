"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";

const echoes = [
  { dot: "#F2C4B8", from: "Home", line: "Self-taught. Self-made." },
  { dot: "#212B23", from: "Her Story", line: "No team. No budget. Just her." },
  { dot: "#8A5CB8", from: "Her Ventures", line: "Two businesses, one belief." },
  { dot: "#9CAF88", from: "Her Journal", line: "Lessons, not just wins." },
];

export default function ConnectRecap() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const split = new SplitText(".connect-headline", {
        type: "words,lines",
        mask: "lines",
      });

      const tl = gsap.timeline({ defaults: { ease: "premiumOut" } });
      tl.from(".connect-kicker", { autoAlpha: 0, y: 12, duration: 0.5 });

      gsap.from(".echo-line", {
        autoAlpha: 0,
        x: -16,
        duration: 0.5,
        stagger: 0.15,
        ease: "premiumOut",
        scrollTrigger: { trigger: ".echo-stack", start: "top 80%" },
      });

      gsap.from(split.words, {
        yPercent: 110,
        opacity: 0,
        duration: 0.85,
        stagger: 0.035,
        ease: "premiumOut",
        scrollTrigger: { trigger: ".connect-headline", start: "top 78%" },
      });

      gsap.from(".connect-sub", {
        autoAlpha: 0,
        y: 14,
        duration: 0.6,
        ease: "premiumOut",
        scrollTrigger: { trigger: ".connect-sub", start: "top 85%" },
      });

      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-[90vh] w-full flex-col justify-center overflow-hidden px-6 py-28 sm:px-10 lg:px-16"
      style={{
        background: "linear-gradient(160deg, #F2C4B8 0%, #F6D9CE 45%, #FAF6F0 100%)",
      }}
    >
      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <p className="connect-kicker mb-10 flex items-center gap-2.5 font-sans text-xs font-semibold uppercase tracking-[0.35em] text-ink/65 sm:text-sm">
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-sage" />
          Connect
        </p>

        <div className="echo-stack space-y-3">
          {echoes.map((echo) => (
            <div key={echo.from} className="echo-line flex items-center gap-3">
              <span
                aria-hidden
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: echo.dot }}
              />
              <span className="font-sans text-xs uppercase tracking-[0.15em] text-ink/40">
                {echo.from}
              </span>
              <span className="font-serif text-lg italic text-ink/70 sm:text-xl">
                {echo.line}
              </span>
            </div>
          ))}
        </div>

        <h1 className="connect-headline mt-10 font-serif text-5xl font-medium leading-[1.05] text-charcoal sm:text-6xl lg:text-7xl">
          This isn&rsquo;t the end of the story.
        </h1>
        <p className="connect-sub mt-6 max-w-xl font-sans text-base leading-relaxed text-ink/65 sm:text-lg">
          It&rsquo;s where you step into it &mdash; as a follower, a client,
          or someone with a question worth asking.
        </p>
      </div>
    </section>
  );
}
