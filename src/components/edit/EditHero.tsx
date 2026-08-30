"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";

export default function EditHero() {
  const root = useRef<HTMLElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const split = new SplitText(".edit-headline", {
        type: "words,lines",
        mask: "lines",
      });

      const tl = gsap.timeline({ defaults: { ease: "premiumOut" } });
      tl.from(
        ".edit-hero-photo-outer",
        { autoAlpha: 0, scale: 1.06, duration: 1.1, ease: "premiumInOut" }
      )
        .from(".edit-kicker", { autoAlpha: 0, y: 12, duration: 0.5 }, "-=0.6")
        .from(
          split.words,
          { yPercent: 110, opacity: 0, duration: 0.85, stagger: 0.04 },
          "-=0.15"
        )
        .from(".edit-sub", { autoAlpha: 0, y: 14, duration: 0.6 }, "-=0.4");

      // The photo arrives desaturated and gains its color as it scrolls into
      // view — a one-time "coming alive" moment rather than a continuous
      // effect, on top of the tilt system below.
      gsap.fromTo(
        ".edit-hero-img",
        { filter: "grayscale(85%) saturate(1)" },
        {
          filter: "grayscale(0%) saturate(1)",
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 95%",
            end: "top 45%",
            scrub: 0.4,
          },
        }
      );

      if (!reduceMotion) {
        gsap.to(".edit-hero-photo-outer", {
          yPercent: -10,
          ease: "none",
          scrollTrigger: { trigger: root.current, scrub: 0.6 },
        });
        gsap.to(".edit-hero-content", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: { trigger: root.current, scrub: 0.6 },
        });

        // Scroll-driven tilt on the outer photo wrapper — works on every
        // device (touch included), since it's tied to scroll position
        // rather than a mouse. Layered on top of, not instead of, the
        // pointer-tilt below: the two live on separate nested wrappers so
        // their rotations compose instead of fighting over the same
        // transform.
        gsap.to(".edit-hero-photo-outer", {
          rotateY: 4,
          rotateX: -2,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });

        // Live mouse-tilt on the inner photo layer — the desktop-only
        // interactive touch that sets this client-facing page apart from
        // the site's other static full-bleed heroes.
        //
        // rotateX and rotateY compound into a single matrix3d that GSAP
        // can't always decompose back apart (it'll warn "not eligible for
        // reset" and silently no-op) if each axis is driven by its own
        // quickTo() reading the live DOM transform. Driving a plain state
        // object instead and applying both axes together via gsap.set()
        // sidesteps that read-back entirely.
        const photo = photoRef.current;
        if (photo) {
          const tilt = { rx: 0, ry: 0 };
          const applyTilt = () =>
            gsap.set(photo, { rotateX: tilt.rx, rotateY: tilt.ry });
          const setRx = gsap.quickTo(tilt, "rx", {
            duration: 0.7,
            ease: "power3.out",
            onUpdate: applyTilt,
          });
          const setRy = gsap.quickTo(tilt, "ry", {
            duration: 0.7,
            ease: "power3.out",
            onUpdate: applyTilt,
          });

          const onMove = (e: PointerEvent) => {
            const r = root.current!.getBoundingClientRect();
            const relX = (e.clientX - r.left) / r.width - 0.5;
            const relY = (e.clientY - r.top) / r.height - 0.5;
            setRy(relX * 4);
            setRx(relY * -4);
          };
          const onLeave = () => {
            setRx(0);
            setRy(0);
          };
          root.current?.addEventListener("pointermove", onMove);
          root.current?.addEventListener("pointerleave", onLeave);
          return () => {
            root.current?.removeEventListener("pointermove", onMove);
            root.current?.removeEventListener("pointerleave", onLeave);
            split.revert();
          };
        }
      }

      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative flex h-[95vh] min-h-[760px] w-full items-end overflow-hidden px-6 pb-16 sm:px-10 lg:px-16"
      style={{ perspective: "1400px" }}
    >
      {/* Full-bleed photo, same technique as the My Story hero — entire image
          visible via the section's own frame. A scroll-driven tilt (all
          devices) plus a live mouse-tilt (desktop pointer) layer on top via
          nested wrappers, so the two rotations compose instead of fighting
          over one transform — the dynamic touch that sets this client-facing
          page apart from the site's other static heroes. */}
      <div
        ref={outerRef}
        className="edit-hero-photo-outer absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          ref={photoRef}
          className="edit-hero-photo absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          <Image
            src="/images/studio-hero.png"
            alt="Shomaila enjoying pasta at an outdoor café"
            fill
            priority
            sizes="100vw"
            className="edit-hero-img scale-105 object-cover object-[center_15%]"
          />
        </div>
      </div>

      {/* Scrim: keeps the headline legible without hiding the photo */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, rgba(33,43,35,0.85) 0%, rgba(33,43,35,0.62) 40%, rgba(33,43,35,0.2) 70%, rgba(33,43,35,0) 100%)",
        }}
      />

      {/* Top vignette: keeps the transparent-on-load nav legible over whatever
          sits at the top of the photo (hair, dark clothing, etc.), independent
          of any single photo's crop — no per-photo tuning needed. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-28"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div className="edit-hero-content relative z-10 mx-auto max-w-3xl">
        <p className="edit-kicker mb-6 flex items-center gap-2.5 font-sans text-xs font-semibold uppercase tracking-[0.35em] text-cream/80 sm:text-sm">
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-peach" />
          My Studio
        </p>
        <h1
          className="edit-headline font-serif text-5xl font-medium leading-[1.15] text-cream sm:text-6xl lg:text-7xl"
          style={{ textShadow: "0 2px 24px rgba(0,0,0,0.3)" }}
        >
          Brands I&rsquo;ve worked with, content I&rsquo;ve created.
        </h1>
        <p
          className="edit-sub mt-6 max-w-xl font-sans text-base leading-relaxed text-cream/95 sm:text-lg"
          style={{ textShadow: "0 1px 12px rgba(0,0,0,0.35)" }}
        >
          A curated record of high-converting user-generated content,
          vertical video campaigns, and authentic lifestyle storytelling —
          organized by the worlds they live in.
        </p>
      </div>
    </section>
  );
}
