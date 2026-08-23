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

**Last updated:** end of the session covering the photo-blend rework, the
scroll-restoration fix, and the FDE logo request.

**Shipped and live on shomailaniazi.com:**
- Full site structure: Home, My Story, My Journal (index + post detail),
  My Ventures, My Studio, Connect — all with nav.
- Photo integration on Home (hero + story-teaser) and My Story (hero) —
  full-bleed, mask-faded, face never touched by the fade. See "Real photo
  integration style" above for the technique.
- Fixes this stretch: watermark/decorative-mark removal, SplitText
  descender-clipping fixes, YouTube link fix, site-wide clickable stats,
  My Studio niche trim + CTA copy, a scroll-restoration bug (My Story was
  opening mid-page instead of at the top — root cause was global
  `scroll-behavior: smooth` fighting GSAP ScrollTrigger), Home's mobile
  hero rebuilt to match My Story's full-bleed mobile treatment, and the
  Home hero's mobile kicker text wrap (was breaking mid-phrase — now
  breaks cleanly after her name into two lines on mobile only).

**Explicitly abandoned, don't retry blindly:**
- AI-generating photos for My Journal / My Ventures / My Studio / Connect
  via Higgsfield — see "Real photo integration style" above for exactly
  why and what was learned. Majid will supply real photos instead.

**Mid-flight / blocked, pick up here:**
- **FDE logo** (purple serif wordmark, "FULLTIME DIGITAL ENTREPRENEUR"
  tagline) needs to go into the site favicon and onto the My Ventures
  page wherever FDE / FDE Marketing are mentioned. Blocked on getting the
  actual logo file: Majid pasted it as a chat image, but this environment
  has no way to save a pasted chat image to disk, and fde.global itself
  is blocked by the network egress proxy from this session — so there's
  no current path to the real asset. Needs Majid to get the file in some
  other way (e.g. into the GitHub repo directly) before this can proceed.
  Explicitly deferred by Majid — "let's do the logos later" — not
  currently being worked on.

**Next up:** integrate real photos (from Majid/Shomaila, not AI-generated)
into My Journal, My Ventures, My Studio, and Connect using the same
full-bleed mask-fade technique already proven on Home and My Story; pick
up the FDE logo work once Majid has a way to get the file across.
