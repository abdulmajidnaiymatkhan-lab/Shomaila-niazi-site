# 005 — Gate the two play-button hover-scale icons to fine pointers

- **Status**: TODO
- **Commit**: 5d07d1c
- **Severity**: LOW
- **Category**: Cohesion & tokens (touch/hover)
- **Estimated scope**: 2 files, same fix pattern

## Problem

Two play-button icons scale up on `:hover` via a plain Tailwind `group-hover:`
class, which compiles to a bare CSS `:hover` selector with no pointer-type
gate. On touch devices, tapping the link fires a synthetic `:hover` state that
sticks until the user taps elsewhere, leaving the icon visibly scaled up with
no way to "unhover" it the way a mouse user naturally does by moving away.

```tsx
// src/components/journal/PostCard.tsx:83 — current
          className={`relative flex h-12 w-12 items-center justify-center rounded-full border border-cream/40 bg-cream/10 backdrop-blur-sm transition-[transform,opacity] duration-200 group-hover:scale-110 ${previewing ? "opacity-0" : "opacity-100"}`}
```

```tsx
// src/components/journal/PostDetail.tsx:162 — current
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-cream/40 bg-cream/10 backdrop-blur-sm transition-transform duration-200 group-hover:scale-110">
```

AUDIT.md §6 names this exact pattern: "ungated `:hover` motion" is a hunt
target, with the fix being `@media (hover: hover) and (pointer: fine)`.

## Target

Tailwind ships a `hover:` variant, but not a fine-pointer-gated one by
default. Rather than reconfigure Tailwind's variant system for two call
sites, wrap the transform-scale rule in a fine-pointer media query in
`globals.css` and swap the two `group-hover:scale-110` classes for a plain
custom class name driven by that query.

```css
/* src/app/globals.css — add near the bottom */
@media (hover: hover) and (pointer: fine) {
  .group:hover .group-hover-scale-fine {
    transform: scale(1.1);
  }
}
```

```tsx
/* src/components/journal/PostCard.tsx:83 — target */
          className={`relative flex h-12 w-12 items-center justify-center rounded-full border border-cream/40 bg-cream/10 backdrop-blur-sm transition-[transform,opacity] duration-200 group-hover-scale-fine ${previewing ? "opacity-0" : "opacity-100"}`}
```

```tsx
/* src/components/journal/PostDetail.tsx:162 — target */
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-cream/40 bg-cream/10 backdrop-blur-sm transition-transform duration-200 group-hover-scale-fine">
```

## Repo conventions to follow

- Both call sites already use Tailwind's `group`/`group-hover:` pattern
  (parent `<a className="group ...">` / `<Link className="group ...">`) —
  confirm the ancestor still carries the `group` class in both files (it
  does, at `PostCard.tsx`'s enclosing `<Link>` and `PostDetail.tsx`'s
  enclosing `<a>`); this plan only changes the child span/div's class, not
  the parent.
- `src/app/globals.css` is the existing home for site-wide CSS beyond
  Tailwind utilities — add the new rule there, not in a new file.

## Steps

1. In `src/app/globals.css`, add the `@media (hover: hover) and
   (pointer: fine) { .group:hover .group-hover-scale-fine { transform:
   scale(1.1); } }` block shown in Target, placed after any existing custom
   rules in the file (append at the end).
2. In `src/components/journal/PostCard.tsx:83`, replace `group-hover:scale-110`
   with `group-hover-scale-fine` in the `className` template string. Leave
   every other class on that element unchanged.
3. In `src/components/journal/PostDetail.tsx:162`, replace
   `group-hover:scale-110` with `group-hover-scale-fine` in the `className`
   string. Leave every other class on that element unchanged.

## Boundaries

- Do NOT touch any other `hover:` or `group-hover:` usage in the codebase —
  this plan is scoped to exactly these two icon buttons, both of which are
  decorative play-button affordances, not the site's general hover-link
  pattern (color/border-color hovers are fine ungated; they don't leave a
  stuck visual displacement the way a scale transform does).
- Do NOT change the `transition` properties, durations, or any other class on
  either element.
- Do NOT add a Tailwind config plugin or variant — a plain CSS media query in
  `globals.css` is sufficient for two call sites.
- If either cited line's current code doesn't match what's quoted here
  (drift since commit `5d07d1c`), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npm run build` completes with no errors; `grep -rn
  "group-hover:scale-110" src` returns no results.
- **Feel check**:
  - On a real trackpad/mouse (or Chrome DevTools with touch emulation
    turned OFF), hover over each play-button icon on `/journal` (card view)
    and a journal post detail page without a YouTube URL match — confirm
    the icon still scales up smoothly on hover, exactly as before.
  - In Chrome DevTools, toggle device toolbar to a touch device (e.g.
    "iPhone 14"), reload, and tap the play-button icon — confirm it does
    NOT visibly scale up (no stuck hover state).
  - Toggle back to desktop/no-touch emulation and confirm the hover-scale
    still works — this must not regress the desktop experience.
- **Done when**: the icon scales on real mouse hover, does not scale on
  touch tap, and no other hover behavior on the site changed.
