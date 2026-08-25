# 001 — Make press-feedback scale actually animate on 7 CTAs

- **Status**: DONE
- **Commit**: 52e86f9
- **Severity**: MEDIUM
- **Category**: Physicality & origin
- **Estimated scope**: 5 files, 7 one-line className edits

## Problem

Seven interactive elements use `active:scale-[0.97]` for tactile press
feedback, but their only `transition-*` utility is `transition-colors`.
Tailwind's `transition-colors` sets
`transition-property: color, background-color, border-color, text-decoration-color, fill, stroke`
— it does **not** include `transform`. So when the user presses these,
the `scale(0.97)` applies with **zero animation**: it snaps instantly
instead of easing in, and un-snaps instantly on release. Three
near-identical buttons elsewhere in the same codebase correctly include
`transform` in their transition list and animate smoothly — this is an
inconsistency in an otherwise-established pattern, not a deliberate
choice.

Current code, verbatim, at each location:

```tsx
/* src/components/edit/EditClosing.tsx:36 — current */
className="mt-6 inline-flex items-center gap-2 rounded-full border border-charcoal/25 px-6 py-2.5 font-sans text-sm font-semibold text-ink transition-colors duration-200 hover:border-charcoal active:scale-[0.97]"
```

```tsx
/* src/components/edit/EditShowcase.tsx:113 — current */
className={`rounded-full border px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-200 active:scale-[0.97] ${
  active === f
    ? "border-charcoal bg-charcoal text-cream"
    : "border-charcoal/20 text-ink/60 hover:border-charcoal/40"
}`}
```

```tsx
/* src/components/journal/PostDetail.tsx:187 — current */
className="more-card group rounded-xl border border-charcoal/10 bg-white/40 p-6 transition-colors duration-200 hover:border-sage active:scale-[0.97]"
```

```tsx
/* src/components/story/StoryToday.tsx:117 — current */
className="today-cta mt-10 inline-flex items-center gap-2 rounded-full border border-charcoal/25 px-6 py-2.5 font-sans text-sm font-semibold text-ink transition-colors duration-200 hover:border-charcoal active:scale-[0.97]"
```

```tsx
/* src/components/ventures/VenturesIndex.tsx:150 — current */
className="mt-6 inline-flex items-center gap-2 rounded-full border border-charcoal/25 px-6 py-2.5 font-sans text-sm font-semibold text-ink transition-colors duration-200 hover:border-charcoal active:scale-[0.97]"
```

```tsx
/* src/components/ventures/VentureSection.tsx:167 and :176 — current (both identical) */
className={`venture-cta inline-flex w-fit items-center gap-2 rounded-full border px-5 py-2.5 font-sans text-sm font-semibold transition-colors duration-200 active:scale-[0.97] ${t.ctaBorder} ${t.ctaText}`}
```

## Target

Every location keeps its exact current visual styling and color-crossfade
behavior. The only change: `transition-colors` becomes
`transition-[color,background-color,border-color,transform]`, so `transform`
is animated alongside the existing color properties, at the same existing
`duration-200` (200ms) — no duration change, this is well inside the
100–160ms button-press budget's upper neighbor and matches the site's
existing `duration-200` convention used on every other interactive element.

```tsx
/* target, all 7 locations — replace transition-colors with: */
transition-[color,background-color,border-color,transform]
```

Do not use the bare `transition-transform` utility as a replacement (that
would drop the existing color-crossfade-on-hover behavior these elements
already have) — use the explicit `transition-[...]` arbitrary-property list
so both color and transform animate together.

## Repo conventions to follow

This exact pattern — an explicit transition-property list that includes
`transform` alongside a border/color property — already exists correctly
in two places; imitate their syntax exactly:

- `src/components/Teaser.tsx:129` — `transition-[transform,border-color] duration-200 ease-out active:scale-[0.97]`
- `src/components/journal/PostCard.tsx:43` — `transition-[border-color,transform] duration-200 ease-out active:scale-[0.97]`

Note both exemplars also carry `ease-out` explicitly (Tailwind's bare
`transition-colors`/`transition-[...]` utilities default to
`cubic-bezier(0.4, 0, 0.2, 1)`, close enough to `ease-out` that the two
exemplars adding it explicsee icitly is a minor belt-and-suspenders — matching
this exactly is optional polish, not required for the fix itself. Do not
introduce the project's custom `premiumOut`/`premiumInOut` GSAP eases here;
those are for GSAP-driven scroll/entrance motion, not Tailwind CSS
transitions.

## Steps

1. `src/components/edit/EditClosing.tsx:36` — replace
   `transition-colors duration-200` with
   `transition-[color,background-color,border-color,transform] duration-200`.
2. `src/components/edit/EditShowcase.tsx:113` — same replacement.
3. `src/components/journal/PostDetail.tsx:187` — same replacement.
4. `src/components/story/StoryToday.tsx:117` — same replacement.
5. `src/components/ventures/VenturesIndex.tsx:150` — same replacement.
6. `src/components/ventures/VentureSection.tsx:167` — same replacement.
7. `src/components/ventures/VentureSection.tsx:176` — same replacement.

## Boundaries

- Do NOT touch `src/components/Teaser.tsx` or `src/components/journal/PostCard.tsx` — they are already correct (the exemplars).
- Do NOT change any other class in these className strings — colors, borders, padding, radius, hover states all stay exactly as-is.
- Do NOT change the `duration-200` value or the `active:scale-[0.97]` value.
- Do NOT add new dependencies or new CSS files.
- If any location's surrounding code has drifted from the verbatim snippet shown above (different className entirely, element removed, etc.), STOP and report instead of guessing at the right replacement.

## Verification

- **Mechanical**: `npm run lint` (0 errors) and `next build` (compiles, typechecks, generates all routes) — both must pass clean.
- **Feel check**: run the dev server, visit each of the 5 affected pages (My Studio, My Journal post detail, My Story, My Ventures index, My Ventures venture cards), and for each of the 7 elements:
  - Press and hold (or use DevTools' "Emulate a focused page" + `:active` state pin) and confirm the element visibly shrinks to 97% smoothly over ~200ms, not an instant snap.
  - Release and confirm it eases back to 100% over the same duration, not an instant snap.
  - Confirm the existing hover color-crossfade (border/background color change) still works exactly as before — this fix must not remove it.
  - In DevTools' Animations panel, slow playback to 10% and confirm the scale keyframe is visibly interpolating, not a single jump.
- **Done when**: all 7 locations show a smooth ~200ms scale transition on press/release, the pre-existing color transitions are unchanged, lint and build are clean.
