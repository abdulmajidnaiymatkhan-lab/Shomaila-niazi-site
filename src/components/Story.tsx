"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const paragraphs = [
  "Shomaila didn't take the expected route. She started down software engineering, then switched to fashion design — two full degrees that taught her plenty, but never quite felt like hers.",
  "In 2016, she found digital marketing, and something clicked. There was no mentor waiting, no course to follow — just curiosity, a laptop, and a willingness to learn in public, one failed post and one small win at a time.",
  "What began as an experiment became a craft, then a career, then platforms reaching millions of people — built from nothing but consistency, and the refusal to wait for permission.",
];

export default function Story() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".story-kicker", {
        autoAlpha: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".story-kicker",
          start: "top 85%",
        },
      });

      gsap.from(".story-heading", {
        autoAlpha: 0,
        y: 32,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".story-heading",
          start: "top 85%",
        },
      });

      const items = gsap.utils.toArray<HTMLElement>(".story-para");
      items.forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 36,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="w-full bg-cream px-6 py-28 text-ink sm:px-10 sm:py-36 lg:px-16"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,220px)_1fr] lg:gap-20">
        <div>
          <p className="story-kicker font-sans text-xs font-semibold uppercase tracking-[0.35em] text-sage">
            01 / Her Story
          </p>
          <h2 className="story-heading mt-6 font-serif text-4xl font-medium leading-tight sm:text-5xl">
            From two degrees to a platform of her own.
          </h2>
        </div>

        <div className="max-w-2xl space-y-8">
          {paragraphs.map((text) => (
            <p
              key={text}
              className="story-para font-sans text-lg leading-relaxed text-ink/80 sm:text-xl"
            >
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
