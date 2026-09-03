# 007 — Reading-highlight effect on the Home page's Story paragraphs

- **Status**: TODO
- **Commit**: 5d07d1c
- **Severity**: N/A (missed opportunity, not a defect)
- **Category**: Missed opportunities
- **Estimated scope**: 1 file (`src/components/Story.tsx`)

## Problem

`src/components/Story.tsx` (the Home page's "From two degrees to a platform
of my own" section) renders three continuous prose paragraphs:

```tsx
// src/components/Story.tsx:9-13 — current
const paragraphs = [
  "I started down software engineering, then switched to fashion design. Two full degrees, neither one felt like mine.",
  "Then I found digital marketing. No mentor, no course — just a laptop, and a willingness to learn in public, one small win at a time.",
  "What began as an experiment became a platform reaching hundreds of thousands, built on nothing but consistency and the refusal to wait for permission.",
];
```

```tsx
// src/components/Story.tsx:141-150 — current
          <div className="mt-10 space-y-7">
            {paragraphs.map((text) => (
              <p
                key={text}
                className="story-para font-sans text-lg leading-relaxed text-ink/75 sm:text-xl"
              >
                {text}
              </p>
            ))}
          </div>
```

Each paragraph currently gets a one-shot line-mask reveal
(`src/components/Story.tsx:38-51`) that fires once as it crosses 88% of the
viewport, then sits static at full opacity (`text-ink/75`) for the rest of the
scroll. Comparison site aiautomationsociety.ai runs a continuous effect on its
equivalent (`.intro` paragraphs in `app.js`): the paragraph nearest the
vertical center of the viewport reads at full brightness while the others dim,
so the paragraph the visitor is actually reading is visually singled out as
they scroll past the stack. This is a natural fit here because these three
paragraphs are the site's only continuously-flowing (non-card, non-beat)
prose block on the Home page.

This is additive, not a fix — the existing one-shot reveal (lines 38-51)
stays; this plan adds a second, continuous effect on top of it.

## Target

Add a scroll-scrubbed opacity tween per paragraph, driven by each paragraph's
own position relative to the viewport center, using GSAP's `scrub` with a
per-element `ScrollTrigger` (no new state, no manual scroll listener — stay
in GSAP's existing idiom):

```tsx
// src/components/Story.tsx — target, added inside the existing useGSAP callback,
// after the paraSplits block (after line 51) and before the `if (!reduceMotion)` parallax block

      if (!reduceMotion) {
        gsap.utils.toArray<HTMLElement>(".story-para").forEach((para) => {
          gsap.fromTo(
            para,
            { opacity: 0.4 },
            {
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: para,
                start: "top 65%",
                end: "top 35%",
                scrub: 0.4,
              },
            }
          );
          gsap.to(para, {
            opacity: 0.4,
            ease: "none",
            scrollTrigger: {
              trigger: para,
              start: "bottom 35%",
              end: "bottom 5%",
              scrub: 0.4,
            },
          });
        });
      }
```

This brightens each paragraph as it approaches the viewport's reading band
(65%→35% from the top) and dims it again as it leaves that band lower down
(bottom 35%→5%), so at any scroll position the paragraph nearest center reads
at full opacity while its neighbors sit dimmed at `0.4`. `text-ink/75` is the
paragraph's own base color already; multiplying by GSAP's `opacity` tween
compounds correctly since it's animating the element's own opacity on top of
its existing Tailwind text-opacity class, not replacing it.

## Repo conventions to follow

- `ease: "none"` for scrub-driven tweens, matching every other
  `scrollTrigger: { scrub: ... }` block in the codebase (exemplar:
  `src/components/Story.tsx:53-58`'s own `.story-panel-front` parallax,
  three lines below where this plan's code is inserted).
- Gate behind the file's existing `reduceMotion` const (declared at line 20)
  — reuse it, do not redeclare it. This effect is continuous/scroll-linked
  motion, so it belongs inside the same `if (!reduceMotion)` gate as the
  `.story-panel-front` parallax (line 53), not left ungated like the
  one-shot paragraph reveal above it.
- `gsap.utils.toArray<HTMLElement>(...)` for selecting a repeated class into
  an array to `.forEach` over — exemplar: `src/components/Stats.tsx:44`.

## Steps

1. In `src/components/Story.tsx`, locate the `if (!reduceMotion) { gsap.to(".story-panel-front", ...) }`
   block (line 53-58).
2. Immediately before that block (i.e. still inside the same `if
   (!reduceMotion)` braces, or as its own adjacent `if (!reduceMotion) {
   ... }` block — either is fine, keep whichever reads cleaner given the
   surrounding code), insert the `.story-para` forEach loop shown in Target.
3. Do not modify the existing `paraSplits` one-shot reveal block (lines
   38-51) — this plan's effect runs in addition to it, not instead of it.

## Boundaries

- Do NOT touch `.story-headline`, `.story-photo-mobile`, `.story-cta`, or
  `.story-panel-front` — this plan is scoped to the three `.story-para`
  elements only.
- Do NOT apply this pattern to any other page's prose in this plan — this is
  scoped to `Story.tsx` on the Home page only, per the audit's finding that
  this is the site's clearest continuous-prose fit. (`StoryTimeline.tsx` on
  `/story` uses discrete pinned beat-cards, not continuous prose, and should
  not receive this treatment — its existing crossfade-on-pin is the correct
  device for that structure.)
- Do NOT change the base `text-ink/75` Tailwind class or any other styling on
  `.story-para` — only add the GSAP opacity tween.
- If the cited line numbers/content don't match what's quoted here (drift
  since commit `5d07d1c`), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npm run build` completes with no errors.
- **Feel check**:
  - Scroll the Home page slowly through the Story section with reduced
    motion off. Confirm: the paragraph nearest vertical center of the
    viewport is visibly brighter than the ones above/below it, and the
    effect updates smoothly as you scroll (no visible stepping/flicker).
  - Confirm the existing one-shot reveal (each paragraph sliding up from a
    line mask) still fires correctly on first scroll-into-view, unchanged by
    this plan.
  - Scroll fast (flick-scroll) through the section and confirm no paragraph
    gets stuck at 0.4 opacity after scrolling past it and back — the scrub
    binding should always resolve to the correct opacity for the current
    scroll position, not the direction you arrived from.
  - In Chrome DevTools Rendering panel, set `prefers-reduced-motion` to
    "reduce", reload, and confirm all three paragraphs sit at full,
    consistent opacity with no dimming effect — this plan's addition must be
    fully inert under reduced motion.
- **Done when**: the reading-highlight is visible and smooth with reduced
  motion off, fully absent with it on, and the pre-existing one-shot reveal
  is unchanged.
