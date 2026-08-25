@AGENTS.md

# Project Context — Majid & Shomaila

## Who

- **Majid**: non-technical, learning Claude Code from scratch. Prefers plain-English explanations, scoped small tasks, one thing at a time.
- **Shomaila**: founder, self-taught digital entrepreneur since 2016. 245K Instagram, 340K YouTube, 80K TikTok.

## Businesses

1. **Fulltime Digital Entrepreneur** (fde.global) — education platform, teaches digital marketing/crypto. Built on Lovable + Supabase + Stripe. Live, real payments.
2. **FDE Marketing** (marketing.fde.global) — agency: content creation, social media management, website management, influencer marketing, branding, ads. Built on Lovable. Brand colors: dark purple #33195C, lilac #B9A3E3, pink #F2A0C4, white.

## Current project: Shomaila's personal brand site (shomaila-niazi-site repo)

- Purpose: NOT a portfolio — a personal brand hub/case study, used to sell "personal branding as a service" to future clients.
- Positioning: founder/entrepreneur-credible, not beauty/creator-influencer style.
- Structure: Home (story-first, not stats-first) → Her Story → Journal (future auto-blog from YouTube) → Ventures → Connect.
- Brand colors: sage green #9CAF88, peachy pink #F2C4B8, deep forest charcoal #212B23, warm cream #FAF6F0, ink text #2A2A26.
- Tech: Next.js, Tailwind, GSAP for scroll animations.
- Domain already owned (shomailaniazi.com) — NOT connected yet, hosting/domain comes after site is built.
- Design bar: this site is a sales tool — must look premium/editorial, not generic AI-template output. Push back on bland results, ask for more specific visual direction rather than accepting "average."

## Future automation goals (not built yet, planned)

- Live Instagram follower/stat display on websites.
- YouTube upload → auto-transcribe → auto-publish as blog post in "Journal" section, with key points summarized at top.
- Eventually: Claude Code orchestrating multiple tools/agents (Higgsfield for images/video, deployment, etc.) working together, reporting back to Majid.

## Design skill priority

The repo has ~32 installed design/animation skills across four packages
(ui-ux-pro-max, impeccable, taste-skill, emilkowalski/skills). Rather than
letting all of them weigh in at once, use this hierarchy:

- **Primary for motion (GSAP/scroll work):** `emil-design-eng` + `animate`.
  Matches the "smooth, premium-feeling, not flashy" bar from the original
  brief.
- **Primary for overall aesthetic direction:** `taste-skill`. Matches the
  "not generic AI-template output" bar directly.
- **Reference/lookup only, not primary:** `ui-ux-pro-max` (font pairings,
  palettes, stacks when building a new page), `redesign-skill` (a future
  "upgrade this page" audit pass), `apple-design` (second opinion on
  gesture/scroll physics).
- **Dormant — do not invoke unless explicitly asked:** everything else
  (`brutalist-skill`, `minimalist-skill`, `soft-skill`, `stitch-skill`,
  `gpt-tasteskill`, `brandkit`, `banner-design`, `design`, `design-system`,
  `slides`, `dataviz`, `image-to-code-skill`, `imagegen-frontend-web`,
  `imagegen-frontend-mobile`, `ask-sonner`, `animate-expo`,
  `pick-ui-library`, `prototype`, `animation-vocabulary`,
  `find-animation-opportunities`, `improve-animations`, `output-skill`,
  `taste-skill-v1`). Several of these carry rigid presets (bento grids,
  brutalist/minimalist rules) that would fight the sage/peach/cream
  editorial direction already locked in above.

**`impeccable`'s auto-hook is disabled.** It shipped wired to run after
every Edit/Write/MultiEdit and again at session end — too noisy while
actively building against an already-locked brand direction. The config is
preserved at `.claude/settings.impeccable-hook.json.disabled`; re-enable it
by renaming that file back to `.claude/settings.json` once every core page
exists (Home, Her Story, Journal, Ventures, Connect) and a single full-site
polish/audit pass makes sense — right before connecting the domain. Even
then, prefer running `/impeccable audit` or `/impeccable polish`
deliberately over leaving the hook live indefinitely.

## Real photo integration style

Shomaila's real photos are being added page by page. Confirmed direction,
now applied site-wide: **full-bleed photo as the section's own background,
text overlaid directly on the image** — no "boxed card" treatment (a photo
floating in a small rounded card next to text). The Home hero and Home
story-teaser were originally shipped as boxed cards, then explicitly
redone to full-bleed per Majid's request — so this is no longer just a
"default for new placements," it's been retrofitted everywhere it existed.

**Technique that actually works (learned the hard way — do this, not a
painted gradient overlay):** fade the photo itself to transparent via a
CSS `mask-image` (`linear-gradient(90deg, transparent ... black ...)` on
the photo's own wrapper), so the section's real background shows through
underneath. A separate painted "fade to cream" div on top of the photo
will almost never color-match the actual background (especially a
diagonal gradient) and reads as a visible seam/flare — this was tried and
rejected. Always keep the photo's visible/unmasked zone clear of her
face — check where the face actually lands in the crop before picking
mask stops; a photo that's mostly headshot can force a very tight crop
even at "full bleed," leaving little margin before the fade needs to
resolve.

**AI-generated photos (Higgsfield) — abandoned for now.** Attempted to
generate new photos for My Journal, My Ventures, My Studio, and Connect
using Shomaila's trained Soul ID character ("Dreamer's Whisper",
soul_id `8f36bed2-b8a7-414b-8a69-b1047c3c8b57`, via `soul_2` model).
Repeated rounds still came back with inconsistent facial features and/or
exposed skin (legs/cleavage/midriff) despite explicit prompt constraints —
Majid called it quits after burning real credits on unusable results. Key
technical lessons if this gets revisited: (1) attaching a reference image
to `soul_2` silently hijacks the whole prompt — it auto-captions the
reference photo and ignores the text prompt entirely; keep generations
text-only with `soul_id`, no attached image. (2) For a mostly-good image
with one isolated flaw, use `seedream_v5_pro` with `is_inpaint: true`
pointed at the specific job id to surgically fix just that one thing —
but pin `aspect_ratio` to match the source or it silently stretches to a
square and distorts proportions. **Current status: not pursuing AI
generation further — Majid/Shomaila will supply real photos to
integrate instead.**

## Working style / rules

- Always work in small, scoped sessions — one page/feature per task, not everything at once.
- Never assume; ask before big structural decisions.
- Security: RLS must be enabled on all Supabase tables; no secret keys in frontend code; prices/amounts always verified server-side, never trusted from client.
- Higgsfield MCP is connected (image/video generation) — remote connector, no local setup needed in Claude Code Web.
- Explain technical steps in plain language — Majid is a beginner.
- Git/PR workflow: build on the feature branch, show a preview, wait for explicit approval. Once approved, commit, push, open the PR, and merge it — no manual GitHub steps expected from Majid.
- **Session/usage hygiene:** this project runs as one long-running conversation
  across many sessions, not fresh each time. Run `/compact` proactively at
  natural checkpoints (finishing a page/feature) instead of letting context
  grow unchecked all session. If usage is visibly climbing high, wrap the
  session up properly (write the handoff below) rather than letting it run
  until the limit cuts things off mid-stream — a session that ends abruptly
  drags its *entire* oversized history into the next one instead of starting
  clean from this file. This actually happened once (see log below).
- **Local dev server restarts:** killing a process on a port and immediately
  restarting on the *same* port can fail with EADDRINUSE because the OS
  hasn't released it yet. Verify the port is actually free (empty
  `lsof -ti:PORT`) before reusing it, rather than incrementing to a new port
  each time as a workaround. Prefer one persistent `next dev` (hot-reload)
  server for iterative visual checks over rebuilding+restarting a production
  server for every tweak.
- **Next.js image cache gotcha:** swapping a photo at the same `public/`
  filename can leave `.next/cache/images` serving the old bytes locally even
  after a fresh build — `rm -rf .next/cache/images` before testing any
  same-filename image swap. Local-testing-only; not a production risk since
  Vercel builds fresh each deploy.

## Session handoff — READ THIS FIRST in every new session

This file (`CLAUDE.md`) is the only thing that survives between separate
chat sessions — a new session starts blank except for what's written here.
The **"Where Things Stand"** section right below is a running log of
current state; read it before doing anything else so you're not starting
cold.

**Trigger phrase:** when Majid writes **"Taking a break now"**, that is
the signal to end the session properly:
1. Make sure any in-progress work is either committed/pushed or clearly
   noted as not yet done.
2. Rewrite the "Where Things Stand" section below with: what shipped this
   session, what's mid-flight or was rejected/abandoned (and why, briefly
   — so it isn't retried blindly), and what the natural next step is.
3. Keep it concise — a running summary, not a full transcript. Overwrite
   stale detail rather than appending indefinitely.

## Where things stand (updated each session — see rule above)

**Last updated:** end of the session that closed out the nav-legibility
decision and merged the whole round (Home/Ventures negative-space, My
Studio full-bleed rebuild, top-vignette nav fix) via PR #20.

**Shipped and live on shomailaniazi.com (main, merged):**
- Full site structure: Home, My Story, My Journal (index + post detail),
  My Ventures, My Studio, Connect — all with nav.
- Real photos integrated on every page. Journal/Studio/Connect use the
  full-bleed background pattern; Ventures/Home use the mask-fade side
  panel. See "Real photo integration style" above for the mask technique.
- Both FDE logos are done and merged: official FDE logo + FDE Marketing
  logo both sit inside the bordered contact-card panels on the Ventures
  page (above the meta line / Visit-Instagram buttons), not as page
  headings. `ventures-data.ts` carries an optional `logo` field per
  venture; `VentureSection.tsx` renders it.
- **My Studio dynamic tilt + scroll-tied grayscale-to-color reveal**:
  scroll-driven tilt (all devices) + desktop mouse-hover tilt compose via
  nested wrapper divs. Dual-axis rotation must be driven through a plain
  `{rx, ry}` state object + one shared `gsap.set()`, never two independent
  `quickTo()` calls on the same element (GSAP can't decompose the combined
  matrix3d back apart — silent no-op).
- Site-wide transparent nav on load, solid on scroll (`Nav.tsx`,
  `scrolled` state from a `window.scrollY > 20` listener; unscrolled state
  uses a white text-shadow halo instead of solid background).
- Connect page rebuilt to the same mask-fade panel technique as Home's
  Story.tsx section (photo left, text right, held down from top).
- Home/Ventures negative-space fix: both heroes now use `items-center` +
  a larger headline instead of `items-end`, filling the space Majid
  flagged as too empty on the left column.
- Home desktop hero photo panel reverted to spanning the full section
  height (see "abandoned" below); mobile's push-down fix is untouched.
- My Studio rebuilt full-bleed (matching My Story's technique/alignment)
  with the café/pasta photo `studio-hero.png`, tuned to `h-[95vh]
  min-h-[760px]` + `object-[center_32%]` so the headline clears her face.
- **Nav top vignette (Majid's chosen fix, PR #20):** a thin, always-present
  dark gradient (`rgba(0,0,0,0.45)` → transparent over the top ~112px,
  `pointer-events-none`) added to every full-bleed hero — `EditHero.tsx`
  (My Studio), `StoryHero.tsx` (My Story), `JournalIndex.tsx` (My
  Journal) — layered above each section's existing bottom scrim, below
  the `z-10` content. Fixes the nav-text-over-dark-hair contrast issue
  confirmed on My Studio, and now protects Story/Journal the same way
  against any future photo swap. The mask-fade panel pages (Home,
  Ventures, Connect) were left alone — the contrast issue was never
  confirmed there. `Nav.tsx`'s transparent-on-load/solid-on-scroll
  behavior itself is unchanged.

**Explicitly abandoned, don't retry blindly:**
- AI-generating *photos* (not logos) via Higgsfield's `soul_2` — see "Real
  photo integration style" above. Logo generation via `openai_hazel` is a
  different, working use case — don't conflate the two.
- Pushing the Home **desktop** hero photo panel down from the top (to
  clear the nav) — tried, reverted: the source photo has almost no
  headroom above her hair, so pushing it down created a hard, unmasked
  seam that broke the mask-fade blend. Home's desktop panel spans the
  full section height instead, accepting that a small amount of hair
  sits under the nav there. (The **mobile** push-down fix is fine and
  stays — mobile has no mask blend to break.)
- Rebuilding My Studio's photo panel as a mask-fade side panel (matching
  Home/Ventures) instead of full-bleed — explicitly rejected in favor of
  matching My Story's full-bleed technique exactly.
- Reverting `Nav.tsx` to permanently-solid as the nav-legibility fix —
  Majid chose the top-vignette approach instead (see above); the
  transparent-on-load nav stays site-wide.

**Workflow gotchas learned recently (in addition to the three in "Working
style / rules" above — session/usage hygiene, dev-server restarts,
Next.js image cache):**
- **Branch resets after squash-merge:** each PR merge here uses squash, so
  a feature branch's own history diverges from `main` after merge. Reset
  to `origin/<branch>` (not `origin/main`) when there's unmerged work only
  on the remote feature branch — resetting to `main` silently discards it
  locally.

**Next up:** nothing blocking — this round is fully shipped. Consider the
panel-technique option for Journal if more "zoomed out" photo is ever
wanted (not requested yet).
