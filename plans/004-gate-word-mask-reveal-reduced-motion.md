# 004 — Gate the SplitText word-mask headline reveal behind prefers-reduced-motion

- **Status**: DONE
- **Commit**: 5d07d1c
- **Severity**: MEDIUM
- **Category**: Accessibility
- **Estimated scope**: 10 files, one shared fix pattern repeated per file

## Problem

Every headline on the site uses the same SplitText word-mask entrance: split the
heading into words, mask the lines, then animate the words in from
`yPercent: 110` (i.e. each word starts translated down by its own full line
height, fully hidden behind the line mask, then slides up into place). This is
by far the largest one-shot movement on any page — much bigger than the 12–40px
`y`-offset fades used elsewhere in the same files, which the codebase already
treats as acceptable under reduced motion (they are never gated, in any of the
21 GSAP components, and that appears to be a deliberate, consistent choice, not
an oversight — do not change those).

The `yPercent: 110` word-mask reveal, by contrast, is never gated by
`prefers-reduced-motion` anywhere it appears, in any of these 10 locations:

```tsx
// src/components/Hero.tsx:26-31 — current
      tl.from(".hero-kicker", { autoAlpha: 0, y: 12, duration: 0.5 })
        .from(
          split.words,
          { yPercent: 110, opacity: 0, duration: 0.8, stagger: 0.045 },
          "-=0.15"
        )
```

```tsx
// src/components/story/StoryToday.tsx:25-32 — current
      gsap.from(headlineSplit.words, {
        yPercent: 110,
        opacity: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: "premiumOut",
        scrollTrigger: { trigger: ".today-headline", start: "top 80%" },
      });
```

The same `yPercent: 110` pattern (with only the trigger selector, stagger value,
and duration varying slightly) also appears in:

- `src/components/journal/JournalIndex.tsx:33`
- `src/components/ventures/VenturesIndex.tsx:30`
- `src/components/edit/EditHero.tsx:32`
- `src/components/Story.tsx:29-36` (the `.story-headline` split, not the
  `.story-para` splits — those use `yPercent: 100` on lines and are handled
  the same way, see below)
- `src/components/story/StoryHero.tsx:30`
- `src/components/journal/PostDetail.tsx:31`
- `src/components/ventures/VentureSection.tsx:76-83` (the `.venture-name`
  split)
- `src/components/connect/ConnectRecap.tsx` (grep for `yPercent: 110` to
  confirm the exact line before editing — line numbers were not re-verified
  in this file at write time)

`src/components/Story.tsx:41-51` and `src/components/story/StoryTimeline.tsx`
(the mobile `.beat-text` splits) use the same technique at `yPercent: 100`
instead of 110 (lines, not words) — same finding, same fix, include them.

AUDIT.md §6 is explicit: "Reduced motion means fewer and gentler animations,
not zero — keep transitions that aid comprehension, remove position changes."
A full-line-height vertical translate is a position change, not a gentle fade,
so it should be dropped under reduced motion while the fade-in itself (which
does aid comprehension of new content appearing) stays.

## Target

For every occurrence, branch on `prefers-reduced-motion` and use a plain
opacity-only fade (no `yPercent`) when it's set. Example for
`src/components/Hero.tsx`:

```tsx
// target
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const split = new SplitText(".hero-headline", {
        type: "words,lines",
        mask: "lines",
        linesClass: "hero-line",
      });

      const tl = gsap.timeline({ defaults: { ease: "premiumOut" } });

      tl.from(".hero-kicker", { autoAlpha: 0, y: 12, duration: 0.5 })
        .from(
          split.words,
          reduceMotion
            ? { opacity: 0, duration: 0.5 }
            : { yPercent: 110, opacity: 0, duration: 0.8, stagger: 0.045 },
          "-=0.15"
        )
```

Note `Hero.tsx` already declares `reduceMotion` later in the function (for the
parallax gate) — move that `const reduceMotion = …` declaration to the top of
the `useGSAP` callback (before the timeline is built) so it's available for
both uses, and delete the now-duplicate declaration further down.

For files using `scrollTrigger`-driven `gsap.from()` instead of a timeline
(e.g. `StoryToday.tsx`), the same branch shape applies:

```tsx
// target — src/components/story/StoryToday.tsx
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const headlineSplit = new SplitText(".today-headline", {
        type: "words,lines",
        mask: "lines",
      });

      gsap.from(headlineSplit.words, reduceMotion
        ? { opacity: 0, duration: 0.5, ease: "premiumOut", scrollTrigger: { trigger: ".today-headline", start: "top 80%" } }
        : { yPercent: 110, opacity: 0, duration: 0.8, stagger: 0.03, ease: "premiumOut", scrollTrigger: { trigger: ".today-headline", start: "top 80%" } }
      );
```

For the `yPercent: 100` line-mask paragraph splits (`Story.tsx`'s
`.story-para`, `StoryTimeline.tsx`'s `.beat-text`), same branch, just with
`yPercent: 100` on the non-reduced branch instead of 110.

## Repo conventions to follow

- The exact reduced-motion check already used everywhere else in the codebase:
  `window.matchMedia("(prefers-reduced-motion: reduce)").matches`, stored in a
  `const reduceMotion` at the top of the `useGSAP` callback. Exemplar:
  `src/components/Stats.tsx:40-42`.
- Where a file already declares `reduceMotion` further down for a parallax
  gate (`Hero.tsx`, `Story.tsx`, `VenturesIndex.tsx`, `VentureSection.tsx`),
  hoist that single declaration to the top and reuse it — do not declare it
  twice.
- Duration for the reduced-motion fallback: use the file's own existing
  fade-duration convention for non-headline elements in the same file (e.g.
  `Hero.tsx` uses `duration: 0.5` for `.hero-kicker` — reuse that number for
  its headline's reduced-motion fallback) rather than inventing a new number
  per file.

## Steps

1. `src/components/Hero.tsx` — hoist the `reduceMotion` const to the top of
   the `useGSAP` callback (before `const split = new SplitText(...)`); delete
   its later duplicate declaration (currently just before the parallax
   block); branch the `split.words` tween as shown in Target.
2. `src/components/story/StoryHero.tsx` — same shape as Hero.tsx's headline
   branch (this file mirrors Hero.tsx closely); add the reduceMotion check if
   not already present at the top of its `useGSAP` callback.
3. `src/components/story/StoryToday.tsx` — add `reduceMotion` const at the
   top of `useGSAP` (this file currently has none at all); branch the
   `headlineSplit.words` tween as shown in Target.
4. `src/components/Story.tsx` — this file already declares `reduceMotion` at
   line 20 (used later for `.story-panel-front` parallax at line 53); reuse
   it for both the `.story-headline` split (line 29) and the `.story-para`
   splits (line 42), each branching between `yPercent`+stagger and a plain
   opacity fade.
5. `src/components/story/StoryTimeline.tsx` — this file already computes
   `reduceMotion` inside the `isDesktop`/`isMobile` matchMedia context (see
   line ~40); the desktop-reduced-motion branch already exists and sets
   static state (lines 47-54) — leave that alone, it's already correct. Only
   the **mobile** `.beat-text` SplitText block (around line 96) needs the
   same `reduceMotion` variable applied to its `yPercent: 100` tween.
6. `src/components/journal/JournalIndex.tsx` — add/reuse `reduceMotion`,
   branch the word-mask split at line 33.
7. `src/components/journal/PostDetail.tsx` — add `reduceMotion` const at top
   of `useGSAP` (none currently present); branch the `headlineSplit.words`
   tween at line 31.
8. `src/components/ventures/VenturesIndex.tsx` — this file already declares
   `reduceMotion` at line 17 (used for `.ventures-hero-photo` parallax at
   line 48); reuse it for the `split.words` tween at line 30.
9. `src/components/ventures/VentureSection.tsx` — this file already declares
   `reduceMotion` at line 67 (used for `.venture-mark` parallax at line 129);
   reuse it for the `nameSplit.words` tween at line 76.
10. `src/components/edit/EditHero.tsx` — add/reuse `reduceMotion`, branch the
    word-mask split at line 32.
11. `src/components/connect/ConnectRecap.tsx` — this file already declares
    `reduceMotion` at line 28 (used for a parallax gate at line 79); reuse it
    for the `yPercent: 110` word-mask tween at line 55.

## Boundaries

- Do NOT touch the small `y: 12`–`y: 40` fade tweens anywhere (e.g.
  `.hero-kicker`, `.hero-sub`, `.venture-tagline`, all the `gsap.from(el, {
  autoAlpha: 0, y: N, ... })` calls) — those are a separate, already-settled
  pattern per this plan's Problem section. Leave them exactly as they are.
- Do NOT touch any `scrollTrigger: { scrub: … }` parallax blocks — those are
  already correctly gated.
- Do NOT change markup or SplitText config (`type`, `mask`, `linesClass`) —
  only the tween properties passed to `gsap.from()`.
- Do NOT add a new CSS media query or a new easing token — reuse
  `window.matchMedia` + the existing `premiumOut` ease exactly as the rest of
  the codebase does.
- If a cited line's current code doesn't match what's quoted in this plan
  (drift since commit `5d07d1c`), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npm run build` completes with no TypeScript errors.
- **Feel check**: with reduced motion off (default OS setting), scroll each
  of the 10 files' pages and confirm the headline word-mask reveal still
  slides up from behind the mask exactly as before — this plan must not
  change the default experience at all.
  - In Chrome DevTools, open the Rendering panel, set "Emulate CSS media
    feature prefers-reduced-motion" to "reduce", then reload each page and
    scroll to each headline. Confirm the words/lines now simply fade in with
    no vertical movement, and confirm they still end up in the correct final
    position (no residual `yPercent` transform left applied).
  - Confirm the small `y: 12`–`40` fades (kicker, sub-headline, tagline text)
    are unaffected either way — they should still animate with reduced
    motion on, exactly as before this plan.
- **Done when**: all 10 locations branch correctly, reduced-motion mode shows
  no vertical word/line movement anywhere on the site, and default mode is
  visually unchanged from before this plan.
