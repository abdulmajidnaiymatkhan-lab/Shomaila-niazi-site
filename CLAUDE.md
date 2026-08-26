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

**Last updated:** session that shipped and confirmed the Connect form
email fix (PR #28, merged into `main`, live on shomailaniazi.com) — Majid
tested the real form on the live site and the email landed in
`shomailaniazi@gmail.com`'s inbox. This bug is fully closed.

**Shipped and live on shomailaniazi.com (main, merged):**
- Full site structure: Home, My Story, My Journal (index + post detail),
  My Ventures, My Studio, Connect — all with nav.
- Real photos integrated on every page. Journal/Studio/Connect use the
  full-bleed background pattern; Ventures/Home use the mask-fade side
  panel. See "Real photo integration style" above for the mask technique.
- Both FDE logos merged into the Ventures contact-card panels
  (`ventures-data.ts`'s `logo` field, rendered by `VentureSection.tsx`).
- My Studio: full-bleed hero (matching My Story's technique) with dynamic
  scroll+pointer tilt and a scroll-tied grayscale-to-color reveal. Dual-axis
  tilt rotation must be driven through a plain `{rx, ry}` state object + one
  shared `gsap.set()`, never two independent `quickTo()` calls on the same
  element (GSAP can't decompose the combined matrix3d back apart).
- Site-wide transparent nav on load, solid on scroll (`Nav.tsx`). **Nav
  legibility and My Studio's head-crop were both real bugs that took
  several rounds each to actually fix** (PRs #20-22) — full history isn't
  worth keeping here since both are now confirmed working on Majid's real
  device, but the lessons are still live and worth knowing before touching
  either area again:
  - **Nav legibility fix**: `Nav.tsx` uses fully opaque cream text + a dark
    drop-shadow (not translucent dark text + white halo — that goes muddy
    against busy photo backgrounds) plus a dark scrim gradient pinned to
    the header itself, not to individual hero photos. If nav legibility is
    ever reported broken again, check `Nav.tsx`'s text/scrim styling
    first, not per-photo vignettes — a vignette-only approach already
    failed here once.
  - **Crop/overlap verification**: for "is X cut off / does X overlap the
    nav" questions specifically, verify with a `sharp` crop-window
    extraction against the source image — a Playwright screenshot can look
    fine while still being wrong by a few dozen pixels relative to where
    the nav actually sits (this is exactly how the head-crop bug slipped
    through two earlier "confirmed fixed" rounds).
- Home desktop hero photo panel spans the full section height (pushing it
  down to clear the nav broke the mask-fade blend with a hard seam —
  reverted, don't retry); mobile's push-down fix is untouched and fine.
- **Connect form sends real email (PR #28).** The old `mailto:` link (only
  opened the visitor's own mail app, delivered nothing) is replaced by
  `src/app/api/contact/route.ts`, a server-side route that validates the
  three fields and sends via **Resend** to `shomailaniazi@gmail.com`
  (`contactEmail` in `social-links.ts`). `ConnectForm.tsx` now `fetch()`s
  that route with a `"sending"` button state and "Message sent." success
  copy. `RESEND_API_KEY` is a Vercel Production env var (never in the
  repo — `.env.example` documents it). Confirmed working end-to-end on the
  live site.

**Design/motion skills — now genuinely used, not just installed.** Earlier
in this project's history, 32 design/animation skill packages were
installed project-level (`.claude/skills/`, see "Design skill priority"
above) but a mid-project audit found no evidence any had actually been
invoked on real work. That changed this session:
- **`impeccable` audit** (`/impeccable audit`) — its bundled detector script
  was actually broken in this environment (missing `htmlparser2`/`css-select`/
  `css-tree`/`domutils`, silently returning "0 issues" instead of erroring).
  Installed those into `node_modules` with `--no-save` (doesn't touch
  `package.json`/lockfile) to get it actually working, then ran it against
  every live rendered page via Puppeteer (needed `PUPPETEER_EXECUTABLE_PATH`
  pointed at the existing Playwright Chromium + `CI=true` for `--no-sandbox`,
  since this container runs as root). Found and fixed 5 real issues (PR
  #23): skipped heading levels (h1→h3) on Story/Journal, My Studio's
  subtext contrast just under WCAG AA, a global `prefers-reduced-motion`
  override that was zeroing *every* transition site-wide (not just the big
  scroll effects — narrowed it to just disable smooth scrolling), a 32px
  mobile hamburger touch target (bumped to 44px), and the mobile nav's
  `max-height` transition (switched to the `grid-template-rows` technique).
  About 90 of the detector's ~100 raw findings were "low-contrast" text
  read off declared CSS colors, not actual rendered pixels — mostly false
  positives from the site's photo-behind-text hero pattern, which the tool
  doesn't account for. Don't trust that class of finding without a direct
  screenshot check.
- **`improve-animations` audit** — read-only advisor, writes plans instead
  of editing directly. Found the codebase's motion was already unusually
  disciplined (exact Emil Kowalski easing curves, transform/opacity-only
  animation, no `scale(0)`, proper reduced-motion handling per component)
  — only 2 real findings: 7 buttons had `active:scale-[0.97]` press
  feedback that never actually animated (`transition-colors` doesn't
  include `transform`), and 2 places (Connect form's success state, My
  Studio's niche-filter marquee) hard-swapped content instantly instead of
  transitioning. Fixed all 3, plans documented under `plans/` (now a
  permanent part of the repo — `plans/README.md` tracks status).

**Explicitly abandoned, don't retry blindly:**
- AI-generating *photos* (not logos) via Higgsfield's `soul_2` — see "Real
  photo integration style" above. Logo generation via `openai_hazel` is a
  different, working use case — don't conflate the two.
- Rebuilding My Studio's photo panel as a mask-fade side panel (matching
  Home/Ventures) instead of full-bleed — explicitly rejected in favor of
  matching My Story's full-bleed technique exactly.
- Reverting `Nav.tsx` to permanently-solid — Majid chose the opaque-text +
  header-scrim approach instead (see above); transparent-on-load nav stays
  site-wide.

**Workflow gotchas learned recently (in addition to the three in "Working
style / rules" above — session/usage hygiene, dev-server restarts,
Next.js image cache):**
- **Branch resets after squash-merge:** each PR merge here uses squash, so
  a feature branch's own history diverges from `main` after merge. Reset
  to `origin/<branch>` (not `origin/main`) when there's unmerged work only
  on the remote feature branch — resetting to `main` silently discards it
  locally. After resetting local to `origin/main`, the remote feature
  branch ref itself is now stale too and needs `push --force-with-lease`
  to catch up (a repo stop-hook will flag "unpushed commits" otherwise —
  that's this gotcha, not new uncommitted work; check `git log
  origin/<branch>..HEAD` before assuming something's actually unpushed).
- **Resend account testing:** a Resend API key created with "Sending
  access" (rather than "Full access") permission produces a persistent
  403 even against the account's own `onboarding@resend.dev` sender — use
  Full access. Separately, **this remote dev container's own sandboxed
  network proxy blocks outbound requests to `api.resend.com` entirely**
  (unrelated to Resend/Vercel/the account — confirmed via `curl -sS
  "$HTTPS_PROXY/__agentproxy/status"` showing a policy-denied
  `connect_rejected` for that host). Any future local `curl`/dev-server
  test against Resend's API from inside this container will falsely 403
  no matter the key — don't re-debug the Resend account over it, test via
  Resend's own dashboard "Send email" button or on the deployed Vercel
  URL instead, both of which are unaffected.
- **PR merge ≠ live site.** Production only deploys from `main` — a merged
  PR into a feature branch (or a Vercel "Redeploy" of the *old* Production
  deployment) does not ship new code. This caused real confusion this
  session: an env var was correctly added and "Redeploy" was clicked, but
  since the code fix was still only on the feature branch (not yet merged
  to `main`), the live site kept showing old behavior. Always confirm
  which branch Production actually tracks (Vercel → Settings →
  Environments) before troubleshooting "why didn't my fix show up."

**Also discovered this session, unconfirmed:** `www.shomailaniazi.com`
already appears as a connected Production domain in Vercel (Project
Settings → Environments → Domains) — this contradicts the "domain NOT
connected yet" note earlier in this file. Worth asking Majid directly
whether it's actually DNS-live or just added in Vercel's config without
DNS pointed yet — don't assume either way, and don't edit that earlier
note until confirmed.

The `impeccable` hook is live and working (see
"Design skill priority" above), design skill priority tiers were widened
per Majid's explicit request (PRs #26, #27) — `emil-design-eng`,
`animate`, `taste-skill`, `ui-ux-pro-max`, `redesign-skill`, `apple-design`
are all now "consult when relevant" (apply proactively, no need to be
asked), and every other installed skill is "ask when relevant" as a firm,
low-threshold rule — **always ask if a task might even plausibly benefit
from one, since Majid is non-technical and has explicitly said not to rely
on him to notice or ask himself.** Don't skip the ask because it seems
minor. Consider the panel-technique option for Journal if more "zoomed
out" photo is ever wanted (not requested yet).
