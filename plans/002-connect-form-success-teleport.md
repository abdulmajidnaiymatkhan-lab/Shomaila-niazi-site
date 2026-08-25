# 002 — Animate the Connect form's success state in

- **Status**: DONE
- **Commit**: 52e86f9
- **Severity**: LOW
- **Category**: Missed opportunities
- **Estimated scope**: 1 file, 1 new `useGSAP` block

## Problem

`src/components/connect/ConnectForm.tsx` swaps its entire visible content
via a plain ternary on `status`: the multi-field form disappears and a
confirmation card appears, in the same render, with no transition at all.
This is the site's one real interactive form, and its one success moment —
exactly the "rare, high-emotion moment rendered with none of the delight
budget it's allowed" pattern this category exists to catch.

Current code, verbatim:

```tsx
/* src/components/connect/ConnectForm.tsx:69-81 — current */
{status === "sent" ? (
  <div className="connect-form mt-12 rounded-2xl border border-sage/40 bg-sage/10 p-8">
    <p className="font-serif text-2xl text-charcoal">
      Your email client should be opening now.
    </p>
    <p className="mt-2 font-sans text-ink/65">
      If it didn&rsquo;t, write to her directly at{" "}
      <a href={`mailto:${contactEmail}`} className="underline hover:text-charcoal">
        {contactEmail}
      </a>
      .
    </p>
  </div>
) : (
  <form onSubmit={handleSubmit} noValidate className="connect-form mt-12 space-y-6">
```

Note both branches already share the `connect-form` class — that class is
used by the *existing* scroll-triggered entrance animation
(`.form-field` / `.connect-form` selectors in the `useGSAP` block at
`ConnectForm.tsx:16-35`), not by anything specific to the success card.
Give the success card its own class so it can be targeted independently.

## Target

The confirmation card fades and lifts in exactly like every other
entrance moment on this site (`autoAlpha: 0, y: 16` → visible, `premiumOut`
ease) — reusing this codebase's existing convention rather than inventing
new motion. This is a JS-driven entrance (the card mounts fresh on a state
change, there's no scroll position to trigger off), so it fires from a
second `useGSAP` call keyed on `status`, guarded so it never fires on
first mount (`status` starts as `"idle"`, not `"sent"`) and never fires
again if `status` doesn't change:

```tsx
/* target: new useGSAP call in ConnectForm.tsx, alongside the existing one */
useGSAP(
  () => {
    if (status !== "sent") return;
    gsap.from(".connect-form-success", {
      autoAlpha: 0,
      y: 16,
      duration: 0.6,
      ease: "premiumOut",
    });
  },
  { scope: root, dependencies: [status] }
);
```

```tsx
/* target: success card gets its own class, JSX otherwise unchanged */
<div className="connect-form connect-form-success mt-12 rounded-2xl border border-sage/40 bg-sage/10 p-8">
```

## Repo conventions to follow

This codebase already has dozens of near-identical `gsap.from(el, { autoAlpha: 0, y: ..., duration: ..., ease: "premiumOut" })` entrance calls — this plan reuses that exact shape, just without a `scrollTrigger` (since this fires on a state change, not a scroll position). Exemplar to imitate the values from:

- `src/components/connect/ConnectForm.tsx:25-32` (same file) — `gsap.from(".form-field", { autoAlpha: 0, y: 20, duration: 0.6, stagger: 0.1, ease: "premiumOut", scrollTrigger: {...} })`. Use the same `autoAlpha`/`y`/`duration: 0.6`/`ease: "premiumOut"` shape, just drop `scrollTrigger` and `stagger` (there's only one element to animate, not a list).
- `useGSAP` with a `dependencies` array re-running on state change (not just on mount) is a supported, documented pattern of the `@gsap/react` package already imported in this file (`node_modules/@gsap/react/types/index.d.ts:21-25`) — this file doesn't yet use `dependencies`, so this introduces the pattern for the first time here, but doesn't add any new library.

## Steps

1. In `src/components/connect/ConnectForm.tsx`, add `connect-form-success` to the success card's `className` (alongside the existing `connect-form`), per the Target snippet above.
2. Add a second `useGSAP(...)` call in the component, after the existing one (after line 35), with the exact body shown in Target: guarded on `status !== "sent"`, animating `.connect-form-success` with `autoAlpha: 0, y: 16, duration: 0.6, ease: "premiumOut"`, scoped to `root` with `dependencies: [status]`.

## Boundaries

- Do NOT change `handleSubmit`, validation logic, or any form-field markup.
- Do NOT change the existing first `useGSAP` block (the scroll-triggered entrance for `.form-headline` / `.form-field`) — add a second, separate call.
- Do NOT add a fade-out on the form as it unmounts — React unmounts it synchronously on the ternary flip; animating an exit here would need to hold both branches mounted simultaneously, which is out of scope for this fix. Fading the success card *in* is sufficient.
- Do NOT add new dependencies — `gsap` and `useGSAP` are already imported in this file.
- If the ternary structure or the `status` state shape has changed since the commit stamp, STOP and report instead of improvising.

## Verification

- **Mechanical**: `npm run lint` (0 errors) and `next build` (compiles, typechecks) must both pass clean.
- **Feel check**: run the dev server, go to `/connect`, fill in all three fields with valid values, submit, and confirm:
  - The confirmation card fades and lifts into place over ~600ms — it does not simply appear.
  - The animation runs exactly once per submit (re-submitting, if the form could be shown again, should not double-fire or accumulate).
  - In DevTools' Animations panel, slow playback to 10% and confirm a single clean autoAlpha+y interpolation, not a flash or a snap.
  - Toggle `prefers-reduced-motion` (DevTools Rendering panel) and confirm the card still becomes visible (opacity resolves) even though GSAP's internal reduced-motion handling — if any is active for this call — may drop the `y` movement; at minimum the card must never end up invisible or stuck.
- **Done when**: submitting the form produces a visible, one-time fade/lift entrance on the confirmation card, matching the site's existing entrance motion language, with lint and build clean.
