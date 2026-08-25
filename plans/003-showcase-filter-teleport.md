# 003 — Cross-fade the niche-filter marquee instead of hard-swapping it

- **Status**: DONE
- **Commit**: 52e86f9
- **Severity**: LOW
- **Category**: Missed opportunities
- **Estimated scope**: 1 file, 1 new `useGSAP` block + 1 wrapper class

## Problem

`src/components/edit/EditShowcase.tsx` renders a horizontally auto-scrolling
"Marquee" of work tiles, filtered by niche. When a filter button is clicked,
the Marquee is force-remounted via `key={active}`:

```tsx
/* src/components/edit/EditShowcase.tsx:125-127 — current */
<div className="mt-12">
  <Marquee key={active} items={filtered} />
</div>
```

Because `key` changes, React destroys the old `Marquee` instance
(mid-scroll, at whatever position it happened to be) and mounts a brand
new one from scratch, at the start of its scroll loop. The content swap is
instant with zero transition — a content teleport, same category as
finding #2 in this audit, just lower stakes since filter-clicking is a
lighter-weight, more occasional interaction than a form submission.

## Target

Wrap the marquee in a container, and fade it in on every filter change
(including the swap-out feel, since the old instance disappears
instantly regardless — fading the *new* content in masks the jarring cut
without needing to keep two Marquee instances mounted simultaneously,
which would require deeper changes to the `Marquee` component itself and
is out of scope here). Use a shorter duration than the page's scroll-triggered
entrances since this responds to a direct click, not a first reveal:

```tsx
/* target: EditShowcase.tsx, new useGSAP call alongside the existing one */
useGSAP(
  () => {
    gsap.from(".showcase-marquee-wrap", {
      autoAlpha: 0,
      duration: 0.35,
      ease: "premiumOut",
    });
  },
  { scope: root, dependencies: [active] }
);
```

```tsx
/* target: EditShowcase.tsx:125-127 */
<div className="showcase-marquee-wrap mt-12">
  <Marquee key={active} items={filtered} />
</div>
```

## Repo conventions to follow

Same `gsap.from(el, { autoAlpha: 0, duration, ease: "premiumOut" })` shape
used throughout this codebase for entrances, and the same
`useGSAP(..., { scope: root, dependencies: [...] })` re-run-on-state-change
pattern specified in plan `002-connect-form-success-teleport.md` — if that
plan is executed first in the same session, imitate the `useGSAP` call it
adds to `ConnectForm.tsx` directly rather than re-deriving the shape. Do
not consolidate this into a single shared hook — the two components are
unrelated; keep the fixes local to each file per the "Boundaries" below.

- Exemplar for the `gsap.from` entrance shape: `src/components/edit/EditShowcase.tsx:76-89` (same file) — the existing `.showcase-heading` / `.showcase-filters` scroll-triggered entrances, same `autoAlpha`/`ease: "premiumOut"` values, just with a `scrollTrigger` this new call doesn't need.

## Steps

1. In `src/components/edit/EditShowcase.tsx`, add the `showcase-marquee-wrap` class to the wrapper div at line 125, per the Target snippet above. Leave the `Marquee key={active} items={filtered}` line itself unchanged.
2. Add a second `useGSAP(...)` call in the `EditShowcase` component (after the existing one, which currently ends around line 92), with the exact body shown in Target: animating `.showcase-marquee-wrap` with `autoAlpha: 0, duration: 0.35, ease: "premiumOut"`, scoped to `root` with `dependencies: [active]`.

## Boundaries

- Do NOT modify the `Marquee` component itself (lines 31-68) — the fix lives entirely in `EditShowcase`, the parent.
- Do NOT remove or change `key={active}` on the `Marquee` element — the remount-on-filter-change behavior is what this plan works around, not what it fixes at the source (fixing it at the source would mean giving `Marquee` its own internal cross-fade/reflow logic for a changing `items` prop, which is a larger change out of scope here).
- Do NOT change the filter buttons' markup or the `filtered` derivation logic.
- Do NOT add new dependencies — `gsap` and `useGSAP` are already imported in this file.
- If the marquee wrapper's JSX structure has changed since the commit stamp (e.g. no longer a single wrapping div), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npm run lint` (0 errors) and `next build` (compiles, typechecks) must both pass clean.
- **Feel check**: run the dev server, go to `/my-studio`, scroll to the "Work by niche" section, and click through 2-3 different filter pills:
  - Each click should show the new tile set fading in over ~350ms, not an instant cut.
  - The marquee should still auto-scroll and still ease to 15% speed on hover, exactly as before (this fix must not touch that behavior).
  - Rapidly clicking between filters should not cause flicker, stacked fades, or a stuck-invisible marquee.
  - In DevTools' Animations panel, slow playback to 10% and confirm a single clean autoAlpha interpolation per click.
- **Done when**: switching niche filters visibly cross-fades the new tile set in instead of hard-cutting, the marquee's existing scroll/hover behavior is unchanged, lint and build are clean.
