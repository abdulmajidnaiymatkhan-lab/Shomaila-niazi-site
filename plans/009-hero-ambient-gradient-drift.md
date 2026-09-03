# 009 — Restrained ambient drift on the Home hero's background gradient

- **Status**: TODO
- **Commit**: 5d07d1c
- **Severity**: N/A (missed opportunity, not a defect)
- **Category**: Missed opportunities
- **Estimated scope**: 1 file (`src/components/Hero.tsx`)

## Problem

Every animation on the site is triggered-once-then-still: entrances fire on
load or scroll-into-view, parallax only moves while actively scrolling, and
nothing moves at rest. Comparison site aiautomationsociety.ai keeps one
section alive at rest via a continuously animated canvas gradient behind its
product screenshot (`app.js:217-253`, `cover()` function) — soft radial blobs
drifting on sine/cosine paths, always running.

A literal copy of that (a dark, saturated, multi-blob canvas) would clash with
this site's sage/peach/cream editorial palette and is explicitly not
recommended (flagged during the audit conversation). But the Home hero
already has a static decorative gradient layer that is a natural, much more
restrained place for the same idea — the "alive at rest" quality without any
new visual element:

```tsx
// src/components/Hero.tsx:73-81 — current
      {/* Background parallax layer: slow-moving soft grounding vignette */}
      <div
        aria-hidden
        className="hero-bg-layer pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 12% 100%, rgba(33,43,35,0.06), transparent 65%)",
        }}
      />
```

This div is currently only ever moved by the existing scroll-scrub parallax
(`src/components/Hero.tsx:42-46`, `yPercent: -14` while scrolling) — at rest
(page just loaded, not scrolling) it never moves at all.

## Target

Add a slow, continuous, transform-only drift to this same layer — never
touching the `background` property itself (which would trigger paint on every
frame; AUDIT.md §5 requires `transform`/`opacity` only) — gated behind
`prefers-reduced-motion` and paused while scrolled out of view:

```tsx
// src/components/Hero.tsx — target, added inside the existing useGSAP callback,
// after the parallax block (after line 57), before `return () => split.revert();`

      if (!reduceMotion) {
        const driftTween = gsap.to(".hero-bg-layer", {
          x: 14,
          y: -10,
          scale: 1.06,
          duration: 9,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        const io = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) driftTween.play();
            else driftTween.pause();
          },
          { threshold: 0 }
        );
        if (root.current) io.observe(root.current);

        return () => {
          io.disconnect();
          split.revert();
        };
      }

      return () => split.revert();
```

Note this restructures the function's existing single `return () =>
split.revert();` into two branches (one per `if`) so the `IntersectionObserver`
only gets disconnected when it was actually created. `useGSAP`'s own
`{ scope: root }` cleanup already reverts/kills every tween and ScrollTrigger
created in this callback on unmount regardless (including `driftTween`), so
the manual cleanup here only needs to handle the `IntersectionObserver`, which
`useGSAP` does not know about.

## Repo conventions to follow

- `reduceMotion` is already declared at the top of this file's `useGSAP`
  callback (`src/components/Hero.tsx:14-16`) — reuse it, do not redeclare.
- `ease: "sine.inOut"` for a continuous back-and-forth ambient loop matches
  AUDIT.md's own Loading/Skeleton "Subtle" shimmer exemplar (a continuous
  loop that should feel gentle, not mechanical) — this is the same category
  of motion (ambient, repeat: -1) even though it's not literally a loading
  indicator.
- Amplitude: keep displacement small relative to this being a full-bleed
  background layer, not a foreground element — `x: 14, y: -10, scale: 1.06`
  are deliberately tiny relative to the viewport so this reads as a slow
  ambient shift, not a visible slide. Do not increase these values without
  checking with the user first; this is calibrated to stay "restrained," per
  the brand's premium/editorial bar, not to stand out.

## Steps

1. In `src/components/Hero.tsx`, locate the existing `if (!reduceMotion) {
   ... }` parallax block (lines 41-57).
2. Add the drift tween + `IntersectionObserver` shown in Target inside that
   same `if (!reduceMotion)` block, after the three existing
   `gsap.to(..., { scrollTrigger: ... })` calls.
3. Update the function's final `return` to the two-branch shape shown in
   Target, so the `IntersectionObserver` is disconnected on cleanup when (and
   only when) it was created.

## Boundaries

- Do NOT animate the `background` CSS property directly — only
  `transform` (`x`/`y`/`scale`, which GSAP compiles to a single `transform`)
  on this element.
- Do NOT apply this pattern to any other page's background elements in this
  plan — scoped to `Hero.tsx`'s `.hero-bg-layer` only, since this was
  identified as the single best restrained spot for it, not a site-wide
  pattern to repeat everywhere.
- Do NOT change the gradient's colors, opacity, or shape — this plan adds
  motion only.
- Do NOT increase the drift amplitude or duration beyond what's specified in
  Target without checking back — this value was deliberately chosen to be
  barely-perceptible ambient motion, not a visible effect, to stay
  consistent with the site's restrained editorial tone.
- If the cited lines' current code doesn't match what's quoted here (drift
  since commit `5d07d1c`), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npm run build` completes with no errors.
- **Feel check**:
  - Load the homepage and, without scrolling or interacting, watch the hero
    background for ~10-15 seconds. Confirm a very subtle, slow drift is
    visible if you're looking for it, but it should NOT be the first thing
    you notice about the page — if it reads as obviously animated/gimmicky,
    that's a failure of this plan's calibration, not something to fix by
    guessing new numbers; stop and report instead.
  - Scroll down past the hero (out of view) and use the Performance panel or
    a simple temporary console log to confirm the tween pauses (the
    IntersectionObserver callback fires `driftTween.pause()`); scroll back up
    and confirm it resumes.
  - Confirm the existing scroll-scrub parallax on the same element
    (`.hero-bg-layer` sliding via `yPercent: -14` while scrolling) still
    works correctly alongside the new drift — GSAP composites both
    transforms correctly since they animate different transform components,
    but verify visually there's no visible conflict/jitter when scrolling
    while the drift is mid-cycle.
  - In Chrome DevTools Rendering panel, set `prefers-reduced-motion` to
    "reduce", reload, and confirm the background layer is completely static
    (no drift, no IntersectionObserver created).
- **Done when**: the hero background drifts subtly and continuously at rest
  with reduced motion off, pauses off-screen, is fully static with reduced
  motion on, and the existing scroll parallax is unaffected.
