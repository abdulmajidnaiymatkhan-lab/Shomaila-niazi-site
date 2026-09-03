# 006 — Add Lenis smooth scroll site-wide

- **Status**: TODO
- **Commit**: 5d07d1c
- **Severity**: N/A (missed opportunity, not a defect)
- **Category**: Missed opportunities
- **Estimated scope**: 1 new dependency, 1 new file, 1 edit to `layout.tsx`

## Problem

The site has no smooth-scroll layer — scrolling is native browser scroll
(instant, wheel-notch-driven), while every entrance/parallax animation on top
of it is built with carefully tuned custom eases (`premiumOut` /
`premiumInOut`, matching Emil Kowalski's exact recommended curves). The
mismatch is a "polished animations, abrupt scroll" feel. Comparison site
aiautomationsociety.ai uses the Lenis library
(`vendor/lenis.min.js` in its production bundle) for exactly this, with a
`lerp: 0.09` inertial smoothing value, and reports it as the single biggest
lever for the site's "premium" feel.

This is additive, not a fix — there is no current code to cite as broken.

## Target

```bash
npm install lenis
```

```tsx
// src/components/SmoothScroll.tsx — new file
"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function SmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      lerp: 0.1,
      autoRaf: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
```

```tsx
// src/app/layout.tsx — target (excerpt)
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
// ...
      <body>
        <SmoothScroll />
        <Nav />
        {children}
        <Footer />
        <Analytics />
      </body>
```

## Repo conventions to follow

- Reduced-motion check: the exact same `window.matchMedia("(prefers-reduced-motion: reduce)").matches`
  pattern used in every other client component (exemplar: `src/components/Hero.tsx:14-16`).
  This component skips Lenis entirely under reduced motion, consistent with
  `src/app/globals.css:27-39`'s existing comment: "Scroll-driven ... motion is
  already skipped in JS per-component via a matchMedia check."
- Import `gsap`/`ScrollTrigger` from `@/lib/gsap` (the shared registration
  module), never straight from the `gsap` package — exemplar: every existing
  component's `import { gsap, ... } from "@/lib/gsap";`.
- `layout.tsx` already mounts always-present, no-visible-markup-of-their-own
  client components as direct children of `<body>` (see `<Analytics />`) —
  `<SmoothScroll />` follows the same placement pattern. Mount it first, before
  `<Nav />`, so it's set up before any page's `useGSAP` scroll triggers run.

## Steps

1. Run `npm install lenis` (adds it to `package.json` dependencies; this is
   the one plan in this batch permitted to add a new dependency — see
   Boundaries).
2. Create `src/components/SmoothScroll.tsx` exactly as shown in Target.
3. Edit `src/app/layout.tsx`: add `import SmoothScroll from
   "@/components/SmoothScroll";` alongside the existing `Nav`/`Footer`
   imports, and add `<SmoothScroll />` as the first child inside `<body>`,
   before `<Nav />`.
4. Do not touch `ScrollTrigger.config()` or add a `scroller:` option to any
   existing `scrollTrigger: { trigger: ... }` call anywhere in the codebase —
   Lenis smooths native `window` scroll without requiring ScrollTrigger to
   target a custom scroller element, so every existing `scrollTrigger` config
   in `Hero.tsx`, `Story.tsx`, `StoryTimeline.tsx`, etc. needs no changes.

## Boundaries

- Do NOT wrap `{children}` in a scrollable container div — Lenis in its
  default mode smooths native document scroll directly; introducing a custom
  scroll container would break every existing `position: sticky` element
  (the `Nav` component) and every `scrollTrigger: { pin: true }` block
  (`StoryTimeline.tsx`), both of which depend on native document scroll
  semantics.
- Do NOT touch any per-component ScrollTrigger config.
- This plan MAY add exactly one new dependency (`lenis`) — this is an
  explicit exception to the usual "no new dependencies" rule, because Lenis
  is the entire point of this plan. Do not add any other new dependency.
- If `npm install lenis` resolves a version whose API differs from what's
  shown here (e.g. `autoRaf` option renamed or removed), STOP and report the
  actual installed API rather than silently adapting — Lenis has changed its
  public API across major versions before.

## Verification

- **Mechanical**: `npm run build` completes with no errors; `npm ls lenis`
  shows it installed.
- **Feel check**:
  - Load the homepage with a real mouse wheel or trackpad (not just
    DevTools) and scroll — motion should now have a short inertial "settle"
    after the wheel stops, rather than stopping dead the instant the wheel
    does.
  - Scroll to `/story` and confirm the `StoryTimeline` pinned section still
    pins and un-pins correctly (Lenis must not break `pin: true`).
  - Confirm `Nav`'s scroll-based state (its scrim/opacity change on scroll,
    if any) still updates correctly while scrolling — Lenis firing
    `ScrollTrigger.update` on every scroll event is what keeps this in sync.
  - In Chrome DevTools Rendering panel, set `prefers-reduced-motion` to
    "reduce", reload, and scroll — confirm scroll is instant/native again
    (Lenis should not have initialized at all; check `window.__lenis` is
    undefined, or add a temporary `console.log` during testing only, removed
    before considering the plan done).
  - Test on a real trackpad AND a real mouse wheel if both are available —
    Lenis's feel can differ meaningfully between input types.
- **Done when**: scrolling feels inertial site-wide with reduced motion off,
  is untouched (native) with reduced motion on, and no existing pinned/sticky
  behavior regressed.
