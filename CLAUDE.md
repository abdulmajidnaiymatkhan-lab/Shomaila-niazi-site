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
letting all of them weigh in at once, use this hierarchy — **updated per
Majid's explicit request to widen when these actually get pulled in**,
since the earlier tiering left most of them essentially unused in
practice:

- **Enforced:** `impeccable`. Its hook runs automatically on every
  Edit/Write/MultiEdit — no judgment call involved, see below.
- **Consult/use when relevant:** `emil-design-eng`, `animate`,
  `taste-skill`, `ui-ux-pro-max`, `redesign-skill`, `apple-design`. For any
  task that plausibly touches what one of these covers — GSAP/motion work,
  an overall aesthetic/layout call, a font/palette/stack lookup, an
  "upgrade this page" pass, gesture/scroll-physics judgment — check it and
  apply what's relevant *as part of doing the task*, without waiting to be
  asked first. No more sub-ranking within this tier (no "primary" vs.
  "just reference") — treat all six as equally worth reaching for when
  they fit.
- **Ask to use when relevant:** everything else (`brutalist-skill`,
  `minimalist-skill`, `soft-skill`, `stitch-skill`, `gpt-tasteskill`,
  `brandkit`, `banner-design`, `design`, `design-system`, `slides`,
  `dataviz`, `image-to-code-skill`, `imagegen-frontend-web`,
  `imagegen-frontend-mobile`, `ask-sonner`, `animate-expo`,
  `pick-ui-library`, `prototype`, `animation-vocabulary`,
  `find-animation-opportunities`, `improve-animations`, `output-skill`,
  `taste-skill-v1`). **This is a firm rule, not a judgment call to skip
  when it seems minor — Majid is explicitly non-technical and has said he
  cannot be relied on to notice or ask himself.** Whenever a task might
  require, might seem to require, or could plausibly get a better outcome
  from one of these — even a partial or edge-case fit — ask before
  proceeding. Do not decide on your own that it's "probably not worth
  mentioning" and skip the ask; a low-confidence maybe still gets asked.
  Never invoke one of these unprompted either — always ask first, every
  time, no exceptions for "small" tasks. Several of these carry rigid
  presets (bento grids, brutalist/minimalist rules) that would fight the
  sage/peach/cream editorial direction already locked in above — flag that
  tension as part of the ask (not just "want me to use X?") so the brand
  conflict is visible before Majid says yes.

**`impeccable`'s auto-hook is ACTIVE (`.claude/settings.json`).** Re-enabled
once every core page existed and the two full-site polish passes (see
"Where things stand" below) shipped — the noisy-while-actively-building
phase this was originally deferred past is over. What it actually does:
- **After every Edit/Write/MultiEdit**, a fast static check runs against
  just the touched file (raw HTML/CSS-level anti-patterns — hardcoded
  colors, `transition: all`, tiny text, `scale(0)`, etc.) and surfaces
  findings inline, same turn.
- **At the end of each session (Stop)**, a deeper pass re-checks every UI
  file touched that session.
- **What it does NOT do**: render pages in a real browser or measure
  actual on-screen pixel contrast — that needs a live dev server + Puppeteer,
  which is too slow for a per-edit hook. That deeper check is still a
  deliberate `/impeccable audit` (or `/impeccable polish` to also fix what
  it finds) run on request, same as `improve-animations` for motion —
  neither auto-runs, both are for a pre-ship pass or whenever asked.
- **The static check's dependencies (`htmlparser2`, `css-select`,
  `css-tree`, `domutils`) are real `devDependencies` in `package.json`**
  (not a one-off `--no-save` session install) specifically so the hook
  keeps working in fresh containers/sessions instead of silently
  degrading to a regex fallback that misreports "0 issues" — this exact
  failure mode is what made the very first `/impeccable audit` run this
  project ever did come back falsely clean. If the hook ever seems to be
  passing everything suspiciously often again, check for a "DEGRADED —
  HTML parser modules unavailable" message before trusting a clean result.

**Setting this up on a *new* project:** none of this travels automatically
— the skill packages live in *this* repo's `.claude/skills/`, and the hook
config lives in *this* repo's `.claude/settings.json`. A brand-new project
starts with neither. At the start of a new project, ask for: (1) the same
skill packages installed project-level (`ui-ux-pro-max`, `impeccable`,
`taste-skill`, `emilkowalski/skills` — however they were sourced originally,
not copied wholesale from this repo), (2) an equivalent "design skill
priority" section written for that project's own brand/stack, and (3) the
`impeccable` hook enabled from the start once the project is past its
initial fast-iteration phase (turning it on too early, before a brand
direction is locked, just produces noisy churn against decisions that
haven't been made yet — that's exactly why it was off for this project's
first stretch).

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

**Last updated:** session that shipped the section-gap scroll bug fix
(PR #45). Working tree clean, everything committed and merged to
`main`, nothing mid-flight.

**Shipped this session: fixed a visible gap between page sections while
scrolling, present on every page.** Majid flagged this with annotated
screenshots (a gap on Home/My Story/My Journal/My Studio, tilted
specifically on My Studio) plus a separate "color mismatch" circled on
Home. Root cause, confirmed by reproducing it on a pre-fix build before
trusting the diagnosis: every hero's full-bleed photo layer is sized to
exactly fill its section, then GSAP slides it upward via scroll-scrubbed
`yPercent` parallax over the section's *entire* viewport transit (no
explicit ScrollTrigger `start`/`end`, so it's not just while the hero is
pinned/fully visible). A layer with zero overscan runs out of coverage
as it slides, exposing the plain page background right where the hero
meets the next section — worse and visibly tilted on My Studio because
that page's `EditHero.tsx` also rotates the same layer in 3D
(`rotateX`/`rotateY`, scroll + pointer tilt combined).

Fix, applied to every hero across Home/My Story/My Journal/My
Studio/My Ventures/Connect: overscan each parallax photo layer so it
always fully covers its section regardless of scroll position or tilt.
Two different techniques were needed, and the difference matters if this
pattern shows up again:
- **Plain full-bleed heroes** (`StoryHero.tsx`, `JournalIndex.tsx`,
  `EditHero.tsx`) — scale the `<Image>` itself up beyond its frame
  (`scale-125`, `scale-150` on My Studio to also cover the 3D tilt).
  Scaling the image (not the wrapping box) keeps `object-position`'s
  crop anchored exactly where it was.
- **Masked photo panels** (`Hero.tsx`'s hero photo, `Story.tsx`'s
  story-teaser panel, `VenturesIndex.tsx`'s hero photo,
  `ConnectRecap.tsx`'s panel — the four that fade to transparent via
  `mask-image` so the section's own background shows through) — a plain
  image-scale fix **silently fails here**: CSS masking clips its
  element's content to that element's own box no matter how the content
  inside is transformed, so a scaled-up image just gets clipped straight
  back down to the original unmasked size. Caught this only because
  Majid sent a fresh screenshot after the first push showing the gap
  still present on Home specifically — the one class of hero using masks
  — which is what exposed the fix hadn't actually worked there. Real fix:
  restructure so the mask lives on a separate **inner** layer that is
  itself oversized (top/bottom insets, since the mask fades horizontally
  so only height needs covering), nested inside the outer layer GSAP
  actually translates. `object-position` on each was recalculated to
  compensate for the larger box (e.g. Home hero photo 4%→14%, Home
  story-teaser 38%→40.6%, Ventures hero 2%→12.5%, Connect panel
  30%→34.4%) so the crop reads identically to before.

Verified by reproducing the original bug on a pre-fix build (confirming
the test methodology actually catches it), then re-checking post-fix at
the same scroll position — first with a coarse scroll sweep (missed the
masked-panel bug, too coarse-grained), then with a fine-grained ~100px
scroll-step sweep across all 6 pages after Majid's fresh screenshot
caught what the coarse pass missed. All 6 confirmed clean. **The
"color mismatch" Majid circled on Home turned out to be this same gap
bug** (the masked hero photo not covering, revealing the page background
at the Hero→Story boundary) — not a separate issue.

**Content upload — plan agreed, one piece shipped, rest waiting on
Majid.** Majid confirmed the only two things left on the site are (1)
uploading real video content — 3 Journal YouTube videos (already done,
see below), My Studio reels by category, Connect page videos (Reels +
YouTube) — and (2) My Studio's stats. Explicitly said to leave the stats
alone for now.

Resolved via AskUserQuestion before touching anything:
- My Studio's reels and Connect's videos are content **already
  published** on Instagram/YouTube/TikTok, not raw files — so the plan
  is Majid sends links (organized by category for My Studio), and each
  gets embedded directly by URL. **This is a deliberate departure from
  the image-logo pattern**: raw video files must never go into this git
  repo the way the small logo PNGs did — they bloat a repo permanently
  and GitHub has real size limits. Embedding already-public content by
  URL needs no file upload and no hosting at all.
- Journal transcripts (video + key points + full transcript, the CLAUDE.md
  automation-roadmap idea below) are **explicitly on hold** — ship
  video + key points only for now.
- **n8n automation for the transcript pipeline is explicitly deferred**,
  not decided against — revisit once there's a steadier video cadence
  AND once Journal data has moved off static TypeScript files onto
  something an automated pipeline could actually publish to (a git repo
  of `.ts` files isn't a natural target for an automated write-back —
  that data-backend decision has to happen before the automation
  question can be answered, not the same session as this one).
- When transcripts do resume: the free/zero-build path is YouTube's own
  auto-generated transcript (open the video → "Show transcript" → copy-
  paste the raw text over) — Claude cleans it into readable prose
  without changing her actual words. No transcription service or API
  needed for this scale.

**Shipped this session: My Journal's 3 posts embed the real YouTube
player** (PR #41) instead of linking out. `PostDetail.tsx` gained a
`getYouTubeEmbedId()` helper (regex-matches `youtu.be/`, `youtube.com/
watch?v=`, and `/shorts/` URL shapes) and renders a standard
`youtube.com/embed/{id}` iframe inside the existing `aspect-video`
wrapper — falls back to the original gradient link-out card if a future
post's URL doesn't match the expected shape, so this can't silently
break. **Could not visually verify the embed renders in this sandbox**
— confirmed via a direct connectivity test that this environment's
network policy blocks `youtube.com` entirely (`connect_rejected`, same
class of restriction as `api.resend.com` and Higgsfield's cloudfront
CDN earlier in this project) — verified correctness instead via DOM
inspection (`iframe.src` resolves to the right embed URL for all 3
posts) and said so transparently rather than claiming a visual check
that didn't happen. Expect the same blind spot for the next round of
Instagram/TikTok/YouTube embeds — verify src/structure, not a rendered
screenshot, unless testing against the real deployed Vercel URL.

**Waiting on Majid — nothing else to do until this lands:** the actual
Instagram/YouTube/TikTok links for My Studio (by niche: Fashion/Beauty/
Travel/Lifestyle/Food, matching `edit-data.ts`'s existing `Niche` type)
and Connect (Reels + YouTube). Once they arrive, swap `EditShowcase.tsx`
`Tile`'s flat color-gradient placeholder and `ConnectHighlights.tsx`'s
two gradient-tile marquees for real embeds — YouTube iframe, Instagram/
TikTok oEmbed widgets (no API key needed for either, and no CDN/script
allowlist restriction here since this is a real Next.js site, not an
Artifact sandbox).

**Previous session: My Studio's real brand-logo wall** (PRs #36–#39).

**My Studio brand-logo wall — fully shipped this session, hold lifted.**
Majid sent a raw list of 35 real brand/business names; researched each
via WebSearch to confirm what it actually was, then curated a shortlist
of 15 for recognizability + category spread (Unilever, Sunsilk Pakistan,
Nestlé, Milo Pakistan, Always, Garnier, Anua, Skin1004, Papa John's,
Coca-Cola Arena, Coke Studio, Temu, Trendyol, noon, Chicpoint) — approved
via AskUserQuestion before building anything. `Brand` type in
`edit-data.ts` gained `logo?: {src,width,height}` (same shape as
`Venture.logo`) and an `accent` hex per brand (sampled from that brand's
own real color, not invented — Anua/Skin1004 have colorless marks so
those two borrow the site's own sage/peach tokens instead).

Logo files: this sandbox cannot fetch arbitrary logos from the open web
(confirmed — network is allowlisted, blocks Clearbit/Wikimedia/brand
sites) — Majid uploaded them straight to `main` via GitHub's web UI as
generic camera-roll files (`IMG_0588.jpeg` etc.), matched each to its
brand by opening and eyeballing it, then moved/renamed into
`public/images/brands/` with real pixel dimensions read via `sharp`.

**Real bugs hit and fixed, worth knowing before touching these files
again:**
- **Checkerboard baked into fully-opaque RGB pixels** (Papa John's,
  Nestlé, Milo) — not a transparency/alpha issue at all, `sharp` reports
  `hasAlpha:true`/`false` correctly either way. Whoever originally
  exported these files had them open in a tool showing its "no
  background" checker preview, and that grid got flattened permanently
  into opaque pixels. Confirmed via raw pixel sampling (12×12 grid via
  `sharp().raw()`) — alternating white/gray blocks at fixed intervals,
  not logo content. Fix: flatten any low-saturation/high-lightness pixel
  (catches both pure white AND the checker gray) to solid white, *then*
  flood-fill from the border on the now-uniform background to alpha 0.
  A flood-fill using only color-similarity (no pre-flatten step) gets
  stuck at the white→gray checker boundary if the threshold is tighter
  than that color jump — this is why the first attempt at Milo only
  half-worked.
- **This environment's `sharp`/`libwebp` build silently drops the alpha
  channel** converting certain PNGs to WebP (confirmed independent of
  Next.js — a bare `sharp().webp()` call reproduces it; lossless mode
  doesn't help either). Real browsers/Chromium can also disagree with
  `sharp` about a PNG's alpha in some cases — verified this by drawing
  the image to a `<canvas>` in actual Playwright Chromium and reading
  back pixels with `getImageData`, which is the only fully trustworthy
  way to confirm what a browser will really render (sharp metadata and
  a Next.js `/_next/image` fetch both looked fine while the real
  decoded pixels didn't match). Fix that actually worked: re-encode
  through a full raw-pixel roundtrip (`sharp().raw()` → re-`sharp(buffer,
  {raw}).png()`) to normalize the file structure. `<Image unoptimized>`
  alone does NOT fix a bad source file — it only skips Next's own
  pipeline, so a browser-decoder disagreement with the raw file still
  shows through.
- **Dev server can serve stale `public/` assets across rapid successive
  file overwrites** — Turbopack's dev server didn't reliably pick up
  several back-to-back overwrites of the same `public/images/brands/*`
  path within one session. When a screenshot looks wrong right after an
  image swap and the file is verified correct on disk, don't trust the
  dev server — kill it, `rm -rf .next`, `next build && next start`, and
  verify against that clean production server instead.
- **Two design directions were built, shown, and explicitly rejected in
  favor of going back to the original** (session did NOT end on the
  fancier version — worth knowing so it isn't re-proposed unprompted):
  a scattered/rotated card with per-brand colored glow, then a
  card-free "floating" treatment using `filter: drop-shadow()` to hug
  each logo's alpha shape with no box at all. Majid's final call: plain
  white rounded-card treatment (`bg-cream`, fixed identical box size for
  every tile — `h-24/w-40` mobile, `sm:h-28/w-48` — each logo fit inside
  via `object-contain` so a tall mark like Unilever never reads bigger/
  smaller than its neighbors). If asked to redo "more dynamic" again,
  the two rejected directions don't need to be rediscovered from
  scratch — ask what specifically didn't work about them first.

**Still on hold, explicitly — do not touch without real data from
Majid:**
- **My Studio collaboration stats** (25+ / 120+ / 5) — confirmed still
  placeholder, real numbers not yet supplied.

**FDE.global migration exploration — ON HOLD**, per Majid's explicit
instruction this session ("keep it saved... whenever i decide to
resume"). Separate, harder second test case: migrating fde.global +
marketing.fde.global off Lovable while keeping Hostinger/Supabase/Stripe
exactly where they are. Still 100% information-gathering, no code
touched. Findings so far, so this isn't re-discovered from scratch when
it resumes:
- Codebase is downloadable directly from Lovable's Code view (no GitHub
  needed) — answers the "can we get the source out" question.
- Stack: Vite + Supabase (tracked in-repo) + Bun + a `wrangler.jsonc`
  (Cloudflare Workers config — a real wrinkle for staying on Hostinger,
  still unchecked).
- Runs on "Lovable Cloud," not a standalone Supabase account — frontend
  extraction looks easy; backend independence is a separate, bigger
  question.
- Real production scale (29 tables, real Stripe installment plans) —
  not a low-risk migration.
- Majid is a Collaborator, not Owner — actual owner is **Urooj** (FDE
  employee), who'd need to check GitHub-sync status and confirm the
  Lovable Cloud question.
- Lovable's own read-only MCP endpoint (`https://fde.global/mcp`) is a
  possible safe automation on-ramp later — deliberately not connected
  yet (real customer data, wanted explicit go-ahead first).

Don't resume this thread automatically — check with Majid what he's
learned from Urooj/Hostinger first.

**Content copy — fully shipped this session (PRs #33, #34).** Majid's
ask: a full copy pass across every page ("everything is written
generic"). Process used, worth repeating for any future big copy pass:
drafted a full first-pass in one structured Word doc (`docx` skill +
`brand` skill's voice/messaging frameworks), marking hard facts/numbers
`[NEEDS REAL INPUT]` rather than inventing them; Majid/Shomaila edited
that doc directly; reviewed the edit against `brand`'s consistency
checklist before touching code, flagged real issues via AskUserQuestion
rather than implementing blind, then shipped page-by-page once resolved.

What shipped:
- **Site-wide first-person voice** ("she/her" → "I/me/my") across every
  page.
- **My Journal is real now, not placeholder** — 3 real posts with real
  titles/categories/dates/watch-times/YouTube links/key points.
  `JournalPost` type changed `body: string[]` → `videoUrl: string`
  (deliberately video + key-points, not invented long-form paragraphs —
  that's the structure Majid actually supplied).
- **New third venture: Eylaskin** (botanical skincare, "Coming Soon") in
  `ventures-data.ts` + a `product` theme in `VentureSection.tsx`, built
  entirely from the site's existing sage/peach/charcoal/cream tokens (no
  invented brand identity — none exists yet). New `comingSoon?: boolean`
  on `Venture` renders a non-interactive status badge instead of live
  CTAs. Consulted `ui-ux-pro-max` for the coming-soon pattern and color
  pairing before building, per Majid's explicit ask not to skip relevant
  skills.
- **Pivot year resolved with real dates (PR #34).** Three conflicting
  years existed (2016/2020/2021) — Majid clarified: SE degree ran
  2016–2019, and it was *during* that period (freelance social
  media/e-commerce work for brands, also when IG/YouTube started) that
  she found digital marketing, not a single-year moment. Story Beat 3
  ("The Pivot") rewritten accordingly, meta now "2016 – 2019". FDE's
  Ventures meta corrected "Est. 2016" → "Est. 2021" (real launch year).

**Site build itself is done and stable** — full structure (Home, My
Story, My Journal, My Ventures, My Studio, Connect + nav), real photos
site-wide (full-bleed mask-fade technique, see "Real photo integration
style" above), real favicon, Connect form sends real email via Resend.
Nothing here needs revisiting unless something breaks; a few
implementation notes worth knowing before touching these areas again:
`Nav.tsx` legibility relies on opaque cream text + drop-shadow + a
header-pinned scrim (not per-photo vignettes); crop/overlap questions
need a `sharp` crop-window check, not just a Playwright screenshot (a
screenshot can look fine while being off by pixels); GSAP dual-axis tilt
(My Studio, Edit hero) must be driven through one `{rx, ry}` state
object + a single shared `gsap.set()`, never two independent
`quickTo()` calls on the same element.

**Design/motion skills are genuinely in use**, not just installed (see
"Design skill priority" above for the tiering rules). Used `brand`
(voice-framework + consistency-checklist) for the copy work, `ui-ux-pro-max`
for the Eylaskin card design, and — for the brand-wall redesign attempts —
`redesign-skill` (diagnosed the flat cream-pill treatment as the textbook
"uniform border-radius, zero depth" AI pattern before proposing anything)
plus `emil-design-eng` and a `ui-ux-pro-max` GSAP-preset search for the
hover-lift motion. All per Majid's explicit instruction not to skip
relevant skills. An earlier session ran a real `impeccable` audit (fixed
5 issues: heading hierarchy, contrast, an over-broad reduced-motion
override, touch targets, a transition technique) and an
`improve-animations` pass (fixed 3: dead press feedback, instant content
swaps) — both documented under `plans/`.

**Explicitly abandoned, don't retry blindly:**
- AI-generating *photos* (not logos) via Higgsfield's `soul_2` — see
  "Real photo integration style" above.
- Rebuilding My Studio's photo panel as a mask-fade side panel instead
  of full-bleed.
- Reverting `Nav.tsx` to permanently-solid.

**Workflow gotchas (in addition to session/usage hygiene, dev-server
restarts, and Next.js image cache in "Working style / rules" above):**
- **LibreOffice/soffice PDF conversion is broken in this sandbox** —
  fails ("source file could not be loaded") on any input, even a plain
  `.txt` file. Confirmed as a genuine environment bug via multiple
  isolation attempts. Don't re-attempt a soffice-based visual preview of
  a generated docx — verify validity instead via `python
  scripts/office/validate.py` (`pip install defusedxml lxml` first) or
  raw zip/XML text-run extraction, and say so transparently.
- **`docx` (npm), `python-docx` (pip), and `playwright-core` (npm) are
  not preinstalled** despite what their skills claim — `pandoc` isn't
  installed either. Install on demand (`--no-save` / `pip install`).
  Playwright's Chromium path has a version suffix —
  `/opt/pw-browsers/chromium-1194/chrome-linux/chrome` — `find` it if
  unsure.
- **Branch resets after squash-merge:** every PR here squash-merges, so
  the feature branch's history diverges from `main` after each merge.
  Reset to `origin/<branch>`, not `origin/main`, when recovering
  unmerged remote work; after resetting local to `origin/main`, the
  remote branch ref needs `push --force-with-lease` to catch up (check
  `git log origin/<branch>..HEAD` before assuming something's actually
  uncommitted — the stop-hook flagging "unpushed commits" can just be
  this staleness).
- **PR merge ≠ live site.** Production only deploys from `main` — always
  confirm which branch Vercel Production tracks before troubleshooting
  "why didn't my fix show up."
- **Resend testing from inside this sandbox will falsely 403** — the
  container's network proxy blocks `api.resend.com` outbound entirely
  (unrelated to the account/key). Test via Resend's dashboard or the
  deployed Vercel URL instead.
- **Higgsfield-generated assets live on a CDN this sandbox can't reach**
  (`*.cloudfront.net` → `EGRESS_BLOCKED`/403). Have Majid upload the
  file straight to the repo via GitHub's web UI, then pull it with
  `get_file_contents` (GitHub's API is unaffected) — don't re-attempt a
  direct CDN fetch.
- **Higgsfield credit balance was 5.4 as of the favicon session** — check
  `balance` before generating anything and flag it to Majid if a task
  needs more than what's available.

**Also unconfirmed:** `www.shomailaniazi.com` appears as a connected
Production domain in Vercel already — contradicts the older "domain NOT
connected yet" note in this file's "Current project" section above.
Confirm with Majid whether DNS is actually live before editing that note
either way.
