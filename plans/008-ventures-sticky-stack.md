# 008 — Sticky-stack the three My Ventures sections on desktop

- **Status**: DONE
- **Commit**: 5d07d1c
- **Severity**: N/A (missed opportunity, not a defect)
- **Category**: Missed opportunities
- **Estimated scope**: 2 files (`VentureSection.tsx`, `VenturesIndex.tsx`)
  — **structural change, not motion-only.** Flag for extra-careful review; see
  Boundaries.

## Problem

`/my-ventures` renders FDE, FDE Marketing, and Eylaskin as three independent
full-width sections in plain document flow
(`src/components/ventures/VenturesIndex.tsx:147-149`):

```tsx
// src/components/ventures/VenturesIndex.tsx:147-149 — current
      <VentureSection venture={ventures[0]} flip={false} />
      <VentureSection venture={ventures[1]} flip={true} />
      <VentureSection venture={ventures[2]} flip={false} />
```

Each one reveals independently as the user scrolls to it, then sits static —
there's no sense of arrival, hierarchy, or transition between the three.
Comparison site aiautomationsociety.ai stacks its four feature cards with
`position: sticky`: each new card slides over the previous one, which scales
down (`scale(1 - pr * 0.05)`) and dims (`brightness(1 - pr * 0.45)`) as it's
covered, `pr` being how far the incoming card has covered the outgoing one
(`app.js:100-110`). This is a strong structural fit for exactly three distinct
ventures where the newest (Eylaskin, "Coming Soon") should read as the
culmination, not just the third item in a list.

This is additive, not a fix — there is no current code to cite as broken.

## Target

**1. Give each `VentureSection` a shared stacking class and sticky
positioning, desktop only** (`lg:` breakpoint — matches this codebase's own
existing desktop-only convention for `StoryTimeline.tsx`'s pin, which uses
`lg:h-screen` / a `gsap.matchMedia` desktop/mobile split):

```tsx
// src/components/ventures/VentureSection.tsx:143-146 — current
    <section
      ref={root}
      className={`w-full overflow-hidden px-6 py-24 sm:px-10 sm:py-32 lg:px-16 ${t.section}`}
      style={SECTION_BG[venture.theme] ? { background: SECTION_BG[venture.theme] } : undefined}
    >
```

```tsx
// target
    <section
      ref={root}
      className={`venture-stack-section w-full overflow-hidden px-6 py-24 sm:px-10 sm:py-32 lg:sticky lg:top-0 lg:flex lg:min-h-screen lg:items-center lg:px-16 lg:py-0 ${t.section}`}
      style={{
        transformOrigin: "50% 0%",
        ...(SECTION_BG[venture.theme] ? { background: SECTION_BG[venture.theme] } : {}),
      }}
    >
```

`lg:flex lg:items-center` centers the existing inner grid vertically inside
the new `lg:min-h-screen` box — without it, content would sit pinned to the
top of the viewport instead of centered the way it reads today. `lg:py-0`
removes the old vertical padding on desktop only (mobile keeps `py-24`/`py-32`
unchanged) since `min-h-screen` + `items-center` now handles vertical spacing.

**2. Drive the cover/dim/scale effect from the parent**, since it needs to see
all three sections together — add this to `VenturesIndex.tsx`'s existing
`useGSAP` callback, after the existing timeline/parallax code (after line 54,
before `return () => split.revert();`):

```tsx
// src/components/ventures/VenturesIndex.tsx — target, appended inside useGSAP, before `return () => split.revert();`

      if (!reduceMotion) {
        const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
        if (isDesktop) {
          const stackSections = gsap.utils.toArray<HTMLElement>(".venture-stack-section");
          stackSections.forEach((section, i) => {
            const next = stackSections[i + 1];
            if (!next) return;
            gsap.to(section, {
              scale: 0.95,
              filter: "brightness(0.55)",
              ease: "none",
              scrollTrigger: {
                trigger: next,
                start: "top bottom",
                end: "top top",
                scrub: true,
              },
            });
          });
        }
      }
```

## Repo conventions to follow

- Desktop-only motion gated on `window.matchMedia("(min-width: 1024px)").matches`,
  matching `StoryTimeline.tsx`'s `gsap.matchMedia()` desktop/mobile split
  (exemplar: `src/components/story/StoryTimeline.tsx:37-38`, `.isDesktop`
  condition) — this codebase's established breakpoint for
  pin/scroll-hijack-style effects is `1024px` (Tailwind's `lg:`), reuse it
  exactly, not a different breakpoint.
- `reduceMotion` is already declared in `VenturesIndex.tsx` at line 17-19 —
  reuse it, do not redeclare it.
- `gsap.utils.toArray<HTMLElement>(...)` for selecting a repeated class,
  exemplar `src/components/Stats.tsx:44`.
- `ease: "none"` on scrub-driven tweens, exemplar
  `src/components/ventures/VenturesIndex.tsx:49` (`.ventures-hero-photo`
  parallax, in the same file).

## Steps

1. In `src/components/ventures/VentureSection.tsx`, edit the root
   `<section>`'s `className` and `style` exactly as shown in Target (add
   `venture-stack-section` class, add the `lg:sticky lg:top-0 lg:flex
   lg:min-h-screen lg:items-center lg:py-0` utilities, add `transformOrigin:
   "50% 0%"` inline style). Do not otherwise change this file.
2. In `src/components/ventures/VenturesIndex.tsx`, append the stacking-tween
   block shown in Target inside the existing `useGSAP` callback, after the
   `.ventures-hero-photo` parallax block (after line 54) and before `return
   () => split.revert();`.
3. Do not add `will-change: transform` — GSAP's `scale`/`filter` tweens on an
   already-`position: sticky` element are acceptable without it at this
   scale (3 sections); add it only if the feel-check below reveals jank.

## Boundaries

- **This plan is a deliberate exception to "motion properties only, no
  structure changes"** — the sticky-stack effect requires the layout change
  in Target step 1. Do not extend structural changes any further than what's
  shown (no new wrapper elements, no changes to the grid inside each
  section, no changes to `VenturesIndex.tsx`'s hero or closing-strip
  sections).
- Do NOT apply `venture-stack-section` sticky positioning below `lg:` — on
  mobile/tablet, all three sections must remain in plain normal flow exactly
  as today (this is why every new class in step 1 is `lg:`-prefixed).
  Content height varies too much between the three ventures (Eylaskin has no
  `services` tag row) to make a mobile stack readable inside one viewport.
- Do NOT change `VentureSection`'s internal content, grid, or the
  `venture-mark` decorative SVG.
- Do NOT touch the closing-strip section or the ventures hero — the stack
  effect covers only the three `VentureSection` instances.
- If a cited line's current code doesn't match what's quoted here (drift
  since commit `5d07d1c`), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npm run build` completes with no errors.
- **Feel check** (desktop viewport, e.g. 1440×900, real browser not just
  DevTools device emulation):
  - Scroll from the ventures hero into FDE (venture 1): confirm it sticks at
    the top of the viewport once reached.
  - Continue scrolling: confirm FDE Marketing (venture 2) slides up over FDE
    from below, and FDE visibly scales down slightly and dims as it's
    covered — not an abrupt cut.
  - Continue to Eylaskin (venture 3): same covering behavior over FDE
    Marketing. Confirm Eylaskin itself does NOT get scaled/dimmed (nothing
    comes after it in the stack) and reads as the "final" card.
  - Continue past Eylaskin into the closing-strip: confirm the closing-strip
    scrolls in normally (not stacked/sticky) and Eylaskin's sticky section
    releases and scrolls away normally underneath it.
  - Scroll back UP through all three and confirm the effect reverses
    smoothly (scrub should make this fully reversible with no snapping).
  - Resize to a narrow/mobile viewport (or use DevTools device emulation) and
    confirm all three ventures render in plain stacked normal flow with no
    sticky/scale/dim behavior at all — this must exactly match the
    pre-plan mobile experience.
  - In Chrome DevTools Rendering panel, set `prefers-reduced-motion` to
    "reduce", reload at desktop width, and confirm the stack/scale/dim
    effect does not run (sections may still visually stack via `position:
    sticky` CSS alone since that's not JS-gated, but there must be no
    scale/brightness animation) — if this reads as a problem, note it, but do
    not attempt to also disable the CSS `sticky` under reduced motion in
    this plan without stopping to report the tradeoff first, since removing
    it changes the layout, not just the motion.
- **Done when**: the three ventures visibly stack-and-cover on desktop scroll
  in both directions, mobile is pixel-identical to before this plan, and
  reduced motion has no scale/brightness animation running.
