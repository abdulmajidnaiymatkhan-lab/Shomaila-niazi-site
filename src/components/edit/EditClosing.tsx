"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export default function EditClosing() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".edit-closing-content", {
        autoAlpha: 0,
        y: 20,
        duration: 0.7,
        ease: "premiumOut",
        scrollTrigger: { trigger: root.current, start: "top 88%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="w-full px-6 py-20 text-center sm:px-10 lg:px-16"
      style={{ background: "linear-gradient(180deg, #FAF6F0 0%, #F6D9CE 100%)" }}
    >
      <div className="edit-closing-content mx-auto max-w-xl">
        <p className="font-serif text-2xl leading-snug text-charcoal sm:text-3xl">
          Let&rsquo;s build your next campaign together.
        </p>
        <Link
          href="/connect"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-charcoal/25 px-6 py-2.5 font-sans text-sm font-semibold text-ink transition-[color,background-color,border-color,transform] duration-200 hover:border-charcoal active:scale-[0.97]"
        >
          Start a collaboration
          <span aria-hidden>&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
