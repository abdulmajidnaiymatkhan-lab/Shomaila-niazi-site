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
- Domain (shomailaniazi.com) is live and connected to Vercel Production — confirmed via repeated real-world testing.
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
  `taste-skill-v1`, `scroll-craft`). **This is a firm rule, not a judgment call to skip
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

**`scroll-craft` (installed from github.com/nateherkai/scroll-craft) is a
special case worth flagging every time it comes up, not just at ask-time.**
It's not a lightweight reference skill like the rest of this tier — it's a
full page-builder with its own JS/CSS engine (`scrollcraft.js`/`.css`) that
generates a **standalone HTML page it fully owns**; its own stated rule is
"the engine is never edited per project." That's a different model from
this site's real stack (Next.js components + Tailwind + hand-written GSAP),
so it can't just be dropped into an existing page — using it for real means
either (a) treating its `references/` docs (devices, worlds, taste, feel
curve) as inspiration to hand-translate into this site's actual components,
or (b) building a genuinely separate standalone page outside the Next app.
It also needs a full `ffmpeg` build and `playwright-core` installed to run
its own build/verify scripts, and its asset-generation route (kie.ai) costs
real money per build — none of that is installed or provisioned here yet.
Surface this mismatch as part of the ask, same as a brand-conflict flag.

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

**Last updated:** 4–5 Nov 2026. Majid said "Taking a break now" (sleepy,
continuing next day). Detail from older sessions has been compressed to
durable lessons only — see the bottom of this section.

### Agreed order — Majid asked to be HELD to this; point out diversions

1. **FDE** — (a) fde.global website handover → **done this session**;
   (b) **FDE Marketing landing page → IN PROGRESS, resume here.** (Majid
   reordered: website first, then marketing page, since they're linked.)
2. **Finalize the Shomaila website** (list further down).
3. At "Taking a break now": update this file, then suggest `/compact`.

**Parked — only discuss if Majid brings them up:** the MEXC trading bot
"MASH-Bot" (now its own repo `abdulmajidnaiymatkhan-lab/mash-bot`, with
its own CLAUDE.md + docs and its own Claude session), trading Instagram
reels, trader-skill, the video-watching tooling, FDE reel thumbnails
(5-day series complete; recipe kept below).

### RESUME HERE — FDE Marketing landing page

**Waiting on Majid (ask in this order):**
1. **Is `fde.global` in HIS Namecheap account?** (Namecheap → Domain List.)
   This decides whether he can take back `marketing.fde.global` himself —
   see "Domain" below.
2. **His price-package document** (services per package) — he'll share it
   for review/changes before any page copy is written.
3. **Domain decision** — he explicitly HELD the fde.marketing purchase
   until he understands the marketing.fde.global route.
4. Optional: work-setting photos of Shomaila (else reuse her site's).

**Current marketing.fde.global (reviewed 4 Nov):** a Lovable one-pager
Urooj built; Majid has lost admin access to that Lovable project (only sees
"FDE Launchpad" now). Fine to abandon — Majid wants a full rebuild and it
holds no data. Findings: no real images/video at all (the "60-sec
showreel" and Travel/Food/Lifestyle/Makeup tiles are gradient blocks with
decorative play icons that do nothing); no client proof (only Shomaila's
follower counts); generic AI-template look (Unbounded + Space Mono + Inter,
grid of identical purple cards); Privacy/Terms links are `#`; form
destination unknown (not submitted). Good: clear message ("Your business.
Everyone's feed."), Portugal targeting, EN/PT toggle works, correct legal
entity, WhatsApp CTA.

**Requirements agreed with Majid:**
- Market: Portugal now (Lisbon), other EU countries later.
- Primary CTA WhatsApp, contact form as backup.
- Contact: **+351 912 321 394** (phone + WhatsApp), **marketing@fde.global**
  (a Hostinger mailbox — unaffected by website hosting), IG **@fde.marketing**.
- Brand-new venture: **no clients, no testimonials.** Honest proof only:
  Shomaila's real platforms (245K IG / 340K YouTube / 80K TikTok; FDE IG
  22.8K) + her creator brand collabs (the 15 logos on My Studio) **clearly
  labelled as her collaborations, not agency clients** + proposed "founding
  client" offer (discount for first ~5 businesses in exchange for
  testimonial/case study — size TBD with the price doc). Never invent
  stats/testimonials.
- No showreel exists → agreed plan: a **wall of Shomaila's real reels by
  category**, each opening the real reel (reuse My Studio's 9 reels +
  `scripts/fetch-ig-thumbnail.sh`). Showreel can slot into the hero later.
- Look: same premium/editorial feel + scroll animations as Shomaila's site,
  in **FDE Marketing colours** (#33195C dark purple, #B9A3E3 lilac,
  #F2A0C4 pink, white). Same family, NOT a copy.
- Bilingual EN + PT; **Claude proofreads the Portuguese.**
- **Separate new project/repo** (same stack: Next.js + Tailwind + GSAP),
  not inside this repo. Needs its own skills + CLAUDE.md + impeccable hook
  per "Setting this up on a new project" above.
- Majid **approved scroll-craft and soft-skill** for this build. Plan told
  to him: borrow scroll-craft's playbook/ideas only, translated into
  Next.js — **no paid kie.ai generation without asking**; soft-skill only
  where it doesn't fight FDE colours.
- First build step once inputs arrive: **hero design preview for
  approval**, then the rest.
- Shomaila's site links to marketing.fde.global in `src/lib/ventures-data.ts`
  (line ~48) — update if the address changes.

**Domain:**
- Prices for **fde.marketing** (Majid checked): Vercel $9.99 then
  **$34/yr** (cheapest over 3 yrs + auto-connects — my recommendation);
  Namecheap €6.24 then €40.68/yr; GoDaddy €16.07 then €58.96/yr.
  fdemarketing.com is taken; fdemarketing.eu / .pt and fde-marketing.com
  looked free (5 Nov).
- **Vercel team "Claude x Shomaila Site" is on Hobby = non-commercial use
  only per Vercel's terms.** The agency site (and arguably Shomaila's) is
  commercial → decide at launch: Vercel Pro (~$20/mo, covers both) vs free
  Cloudflare hosting (commercial allowed). Undecided.
- **Getting marketing.fde.global back — DNS as of 5 Nov:** fde.global
  nameservers `shaz.ns.cloudflare.com` / `braden.ns.cloudflare.com` (a
  Cloudflare account Majid doesn't control — Lovable/Urooj's); A record for
  fde.global AND marketing.fde.global = `185.158.133.1` (Lovable); MX =
  `mx1/mx2.hostinger.com`. Registrar is Namecheap, **whose account is
  unknown**.
  - If Majid's: he makes a free Cloudflare account → add fde.global →
    Claude verifies every record line-by-line against live DNS (Lovable A
    records + `_lovable` verification TXT, Hostinger MX/SPF/DKIM/DMARC,
    anything else) → Majid switches nameservers at Namecheap at a quiet
    hour. Identical records = zero downtime, fde.global stays on Lovable,
    and Majid gains DNS control — which also unblocks Resend for fde.global
    and eases the handover. Give Urooj a heads-up first.
  - If Urooj's: Namecheap's free "push domain" to Majid's account → add to
    handover asks.
  - Recommendation given: if control is regained, launch on
    marketing.fde.global (free); fde.marketing optional later (could
    forward to each other).

### fde.global handover — done this session

- **Live-site audit** (24 pages, desktop + mobile, nothing submitted): no
  broken pages/links/images/JS errors; mobile menu, FAQ, anchors work.
  Real issues: Community-page Instagram feed tiles load slowly and the
  embeds spill out of their boxes over the caption + Risk Disclosure
  (caption also duplicated); Home bottom "Enroll Now" → /contact while top
  one → /enroll; two founder images lack alt text. Staff login is unlinked
  at `/admin-auth` (Majid: drop the "student account" wording point).
  `/services` stats (7-figure budgets, 3.8× ROAS, 62% lower CPL, 24/7
  strategist) are **placeholders Majid never supplied** — fix after
  handover. Founder "around 2013" stays for now; "Direct access to me" is
  fine; legal entity ALVORADA ADMIRÁVEL UNIPESSOAL LDA (NIF 518842703) is
  correct. Majid dropped the social-links point too.
- **Handover PDF for Urooj** (reportlab, FDE purple, Majid's voice, 3pp):
  zero downtime as section 1 → 9-point definition of done (latest code
  incl. post-31-Aug changes into the EXISTING repo
  `abdulmajidnaiymatkhan-lab/fdeglobal` — Majid adds her as collaborator by
  GitHub username, never shares credentials; whole DB incl. logins into
  Majid's Supabase; domain/hosting under FDE; Stripe test purchase;
  emails; all features, no Lovable badge; access handed over and hers
  removed; handover note; cancelling Lovable changes nothing) → 3 pending
  fixes → 7 things to demo working → deadline **27 Nov 2026** (Lovable
  renewal) → full payment only when everything is done, otherwise price
  renegotiated. Majid is sending it **5 Nov together with the pending
  designer salary** (kept separate from the website payment on purpose).
  The PDF lived in the scratchpad (not persistent, deliberately not
  committed — a private doc doesn't belong in this repo); rebuild from this
  summary if needed. Suggested he also ask Urooj to restore his admin
  access to the FDE Marketing Lovable project.
- **fdeglobal repo facts:** last Lovable sync 31 Aug 2026 (newer code only
  in Lovable). PR #1 (Hostinger SMTP swap) is outdated — Cloudflare
  Workers can't reach Hostinger SMTP (it sits behind Cloudflare); decision
  was Resend from `mail.fde.global`, reply-to support@fde.global, blocked
  on DNS control. Cloudflare Workers hosting of the FDE app was proven
  earlier. Lovable roles on the fde.global project: Majid Admin, Urooj
  Owner. Keep the Lovable card active until migration completes or the
  domain drops.

### Shomaila site — state and remaining work (Task 2)

- **Marquee flicker saga is RESOLVED** — PR #70 confirmed fixed by Majid
  on his real iPad. Real final bug: resuming auto-drift reset
  `scrollLeft = 0`, whose own scroll event re-paused the marquee forever;
  fixed with an `ignoreNextScroll` flag. `ScrollMarquee.tsx` final design:
  idle drift = scoped CSS `@keyframes` (survives iOS Low Power Mode);
  interactive mode only pauses the animation (`frozenFrac`) and is entered
  from the native `scroll` event, not pointerdown; mouse drag enters it
  synchronously at a 3px threshold; pointer capture only after the drag
  threshold; `IDLE_MS = 1500`; tile images `loading="eager"`.
- Remaining:
  1. My Ventures sticky-stack: restore for ventures 1 & 2 with the
     Eylaskin → closing-strip overlap fixed — **only when Majid says go**.
  2. My Studio stats (25+ / 120+ / 5) are placeholders — awaiting real
     numbers; don't touch until supplied.
  3. Google still shows a stale "coming soon" snippet → Search Console →
     Request Indexing (deferred by Majid).
  4. YouTube → Journal automation: paused at backend choice. Recommendation
     on record: Supabase + review-gate publish flow + Vercel Cron trigger;
     custom scripts over n8n. Session scope: foundation + first workflow
     only.
  5. Update the FDE Marketing link once its address is decided.

### Durable lessons (compressed from older sessions — keep)

**Marquees / touch / iOS:** a CSS-transform animation can't receive
scroll/touch input — anything both auto-moving and user-scrollable needs a
real `overflow-x: auto` container. `setPointerCapture` on every pointerdown
breaks link clicks in Chromium (click retargets). iOS Low Power Mode
throttles rAF/timers hard; CSS keyframes keep running. Don't write
`scrollLeft` inside touchstart/pointerdown (races native scroll); never let
your own programmatic scroll event re-trigger your own handlers. **This
sandbox has no WebKit and no touchscreen** — Chromium + CDP CPU throttling
simulates Low Power Mode well, touch races not at all. Say plainly when a
fix is only reasoned, not device-verified; for motion bugs Majid reports by
video, compare frames over time.

**GSAP / layout:** animating `filter` from computed `none` → GSAP parses
it as `brightness(0)`; always `fromTo` with an explicit start. Parallax
photo layers need overscan; for `mask-image` panels, scaling the image
fails (mask clips to its own box) — put the mask on an oversized inner
layer and recalc `object-position`. Dual-axis tilt: one `{rx, ry}` state +
one `gsap.set()`, never two `quickTo()`s on one element. Crop/overlap
questions need a `sharp` crop-window check, not just a screenshot.

**OG / SEO:** use a static `public/og-image.jpg` via explicit metadata
(file-convention route serves chunked, WhatsApp refuses it); don't set
`openGraph.title/description` at the root layout; `layout.tsx` appends a
content hash `?v=` to bust crawler caches. Root domain 308-redirects to
`www` — use `curl -L`.

**Images:** checkerboard can be baked into opaque pixels — flatten
low-sat/high-light pixels to white, then flood-fill from the border. This
env's sharp/libwebp can drop alpha; verify real decoded pixels via
Playwright canvas `getImageData`; fix by raw-pixel roundtrip re-encode.
Same-filename swaps: `rm -rf .next/cache/images`; Turbopack dev can serve
stale `public/` files — verify on a clean `next build && next start`.
Raw video never goes in git — embed published content by URL.

**Git / PRs:** every PR squash-merges → expect conflicts on the next PR:
`git fetch origin main && git merge origin/main`, resolve (often `git
checkout --ours <file>`), rebuild, push, merge. A squash-merge can silently
drop a file deletion — after merging a deletion, check `git show
origin/main:<path>`. PRs are opened/merged with the GitHub MCP tools (no
`gh` CLI). A fresh sandbox may lack push creds → ask Majid for a PAT, store
via `credential.helper store` in `~/.git-credentials` (chmod 600, never
committed). Production deploys only from `main`.

**Sandbox environment:** `python3` is 3.11 with a broken
`_distutils_hack`; pip installs go to `python3.13` — use that. Chromium is
at `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`; playwright-core,
docx, python-docx, pandoc aren't preinstalled. Bash commands with
heredocs + nested quotes can trip the rm-safety check — write scripts with
the Write tool instead. Small instances may need a 2GB swapfile for `next
build`. Next 16 dev mode blocks JS when browsed via the sandbox IP — add
`allowedDevOrigins` temporarily, never commit it. Free the port (`lsof
-ti:PORT`) before reusing it. Blocked from here: YouTube (bot check →
use Apple Podcasts iTunes Lookup → RSS → direct MP3s), `api.resend.com`
(false 403s; test on the deployed URL), Higgsfield's cloudfront CDN (have
Majid upload to GitHub), arbitrary logo sites. LibreOffice PDF conversion
is broken here. `SendUserFile` can 500 transiently — wait and retry.
Instagram works without login (og:image fetch script).

**Higgsfield:** AI photos of Shomaila (soul_2, Soul ID "Dreamer's
Whisper") abandoned after inconsistent faces/exposed skin — use real
photos only. If revisited: no reference image with soul_2 (it hijacks the
prompt); fix single flaws with `seedream_v5_pro` inpaint, pinning
`aspect_ratio`. Check `balance` before generating.

**FDE reel-thumbnail recipe (series done; reference only):** composite
text onto the untouched photo with Pillow (never AI-regenerate — garbled
text and face risk). Outfit-Bold from
`.claude/skills/ui-styling/canvas-fonts/`; FDE purple scrim ramping
`t**1.4` from ~y=1280 on 1920px; pill badge "DAY N/5 · SKILL" 28px above
an 80px headline, badge 32px, lilac accent bar; scale all constants by
`H/1920`. Verify the face region is unchanged by pixel-diff. Always get the
real IG caption and propose headline options for sign-off. Local free
transcription: ffmpeg → `openai-whisper` base model.

**Automation research (for the paused platform idea):** Journal data is a
static TS array (`src/lib/journal-posts.ts`); no CMS/cron/DB yet.
Sandcastles.ai covers script/hook writing (paid, build-vs-buy open).
Higgsfield `personal_clipper_create` does YouTube → platform clips;
TikTok publish tooling exists, IG/YouTube posting doesn't. Groq key was
never persisted — ask again if needed.

**Content/copy process that worked:** draft in a structured doc with
`[NEEDS REAL INPUT]` markers → Majid/Shomaila edit → check against the
brand consistency checklist → flag issues via questions → ship page by
page. Site voice is first person. Pivot dates: SE degree 2016–2019, found
digital marketing during it; FDE est. 2021. Brand wall: plain cream cards,
identical box size — two fancier versions were rejected.
