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

**Last updated:** same session as the animation-improvements work below,
continued into a second, unrelated thread — planning Majid's much bigger
"centralized automation platform" idea (website building + automations as
a service to future clients, not just this site). **This thread is
PAUSED mid-decision, not finished** — no code written yet, still in
Claude Code's plan-mode research/design phase. Working tree is otherwise
clean (nothing from this thread touches the repo yet).

### Automation-platform planning — paused, resume here

**The ask:** Majid wants one centralized automation platform — starting
with the YouTube→My Journal pipeline on this site, but built to extend to
script writing, viral reel ideas, cross-platform video clipping+posting,
and auto-reply chatbots, organized as a team of agents reporting up a
hierarchy to him. He explicitly wants Claude's own expert recommendation
on architecture, not a menu of options — he's non-technical and said so
directly.

**My recommendation, already given to him:** don't make n8n (or Make.com)
the universal hub. Real evidence for this — two podcast episodes Majid
had me transcribe and dig into (a Pakistani podcaster, Muzamil Hasan
Zaidi, building almost exactly this vision) showed the sophisticated part
(agent hierarchy, always-on daemons, autonomy levels) was **all custom
scripts Claude Code wrote directly**, not assembled in a no-code
workflow tool — Make.com only handled the simpler content-publishing
piece. Given Majid already has this same Claude Code working relationship,
that's the stronger default: I build automations directly as scripts/
scheduled jobs/MCP-tool calls, and reach for n8n only later, narrowly, for
its actual strength (pre-built integrations to many platforms) if that
becomes the bottleneck. For the first build specifically (YouTube→Journal),
recommended trigger is Vercel Cron (already-in-place infra, no new
hosting) rather than any external platform.

**Where we paused:** I'd just asked which the content backend for Journal
should be — a small database (Supabase, my recommendation) vs. a headless
CMS vs. git-write-back — when Majid said "taking a break." **Next step
when he's back: re-ask that exact question, then decide publish flow
(review-gate vs auto — my standing recommendation is review-gate) and
confirm session scope** (foundation + first workflow only, not the whole
platform at once — matches this project's standing "small scoped
sessions" rule).

**Full research detail — plan file at
`/root/.claude/plans/i-want-to-understand-dreamy-gray.md`.** ⚠️ That file
lives outside the git repo, in Claude Code's local plans directory — it
will **not** survive a sandbox reset the way this CLAUDE.md does. If a
future session can't find it, everything durable is captured below
instead; only lose the very granular blow-by-blow.

**Durable findings worth keeping even if the plan file is gone:**
- Journal data (`src/lib/journal-posts.ts`) is a static hardcoded TS
  array, already shaped for a future transcript pipeline per its own
  comment. No CMS/DB/automation infra anywhere in this repo yet — zero
  API routes beyond `/api/contact`, no `vercel.json`/cron, no GitHub
  Actions.
- **YouTube blocks this sandbox** (datacenter IP → "Sign in to confirm
  you're not a bot" via yt-dlp) — confirmed not video-specific, tried
  multiple workarounds, none fixed it directly. **Real fix found and
  proven**: fetch the podcast's episode audio via Apple Podcasts' public
  iTunes Lookup API (`itunes.apple.com/lookup?id=<applePodcastsID>`) →
  gives the RSS feed URL for free, no auth → the feed (often
  Anchor.fm-hosted) has direct unauthenticated MP3 links per episode,
  totally different CDN from YouTube, zero bot-check. **This is the
  answer for the real YouTube→Journal automation too**, not just a
  one-off workaround — avoids needing YouTube Data API OAuth or cookies.
  Instagram, separately, had zero bot-check issues at all via the same
  tool.
- Installed and verified working this session: the **`bradautomates/
  claude-video`** Claude Code plugin (`/watch` skill) — real capability to
  download/transcribe/analyze video from a URL. Needed `ffmpeg` (apt),
  `yt-dlp` **via `pipx` specifically, not apt** (apt's packaged version is
  too stale and fails against YouTube's current API), and `deno` (yt-dlp's
  JS challenge solver, installed via its official script). **`yt-dlp` and
  `deno` were symlinked into `/usr/local/bin`** because this sandbox's
  Bash tool doesn't persist `~/.bashrc` PATH changes across separate tool
  calls — if either binary "disappears" in a future session, redo the
  pipx install + symlink, it's not a new bug. Also set
  `--remote-components ejs:github` as a persistent default in
  `~/.config/yt-dlp/config` so the skill's internal calls pick it up
  automatically. **None of this setup is committed to git** (it's sandbox
  environment setup, not app code) — a fresh sandbox needs it redone.
- Majid provided a real Groq API key for Whisper transcription — passed
  as an inline env var to individual commands, deliberately never written
  to disk (was mid plan-mode at the time). **Not persisted anywhere** —
  if transcription is needed again, ask Majid for the key again or set it
  up properly in `~/.config/watch/.env` once outside plan mode.
- **Sandcastles.ai** (a real, paid $39-399/mo SaaS with its own Claude
  Desktop MCP connector) does a chunk of the "script writing / viral
  ideas" ask already — channel analysis, outlier-video research, hook
  generation, script writing. Open build-vs-buy question for that specific
  piece of the roadmap, not decided, not urgent (roadmap item, not the
  first build).
- Higgsfield (already connected in this environment) has a real,
  ready-to-use `personal_clipper_create` tool — YouTube URL in, N clips
  out at any aspect ratio (9:16/1:1/16:9) with subtitles. Covers the
  "reformat for each platform" part of the roadmap already; also has real
  TikTok publish tooling, but no equivalent Instagram/YouTube posting
  tools.

---

**Previous entry in this same session — animation-improvements batch,
finished and merged before the above thread started:**

**Shipped this session: animation-improvements plans 006-009 (PR #53).**
Picked up from a prior interrupted session where plans 004 (reduced-motion
gating on the word-mask headline reveals) and 005 (fine-pointer gating on
the two play-button hover-scale icons) were already correctly implemented
but sitting uncommitted. Added:
- **006** — Lenis site-wide smooth scroll: new `src/components/SmoothScroll.tsx`,
  mounted first in `layout.tsx`'s `<body>`, skips initializing entirely
  under `prefers-reduced-motion`.
- **007** — reading-highlight on the Home page's Story paragraphs
  (scroll-scrubbed opacity, brightest paragraph tracks the reading band).
- **008** — sticky-stack transition across the three My Ventures sections,
  desktop (`lg:`) only.
- **009** — subtle ambient drift on the Home hero's background gradient at
  rest, paused via `IntersectionObserver` when scrolled out of view.

All six plans (004-009) marked DONE in `plans/README.md` and their own files.

**Real bug found and fixed post-preview — worth knowing before touching
`VenturesIndex.tsx`'s stacking tween again:** plan 008's cover effect used
`gsap.to(section, { filter: "brightness(0.55)", scrollTrigger: {scrub} })`
with no explicit starting `filter` value. GSAP read the initial computed
`filter: none` and mis-parsed it as `brightness(0)` instead of
`brightness(1)`, so the tween actually animated 0→0.55, not 1→0.55 —
dipping to roughly 27% brightness mid-transition before recovering to the
endpoint. On FDE's dark `core` theme (`bg-charcoal text-cream`), that dip
crushed the cream text into the background and looked like the section was
blacking out — this is what Majid caught after previewing. **General
lesson: when animating `filter` (or any property) whose initial computed
style is a keyword like `none` rather than a parseable function, always
give GSAP an explicit starting value via `gsap.fromTo(el, { filter:
"brightness(1)" }, { filter: "brightness(X)", ... })`** — it can't safely
infer that "no filter" means "brightness(1)" on its own. Also softened the
endpoint itself from 0.55 to 0.8 so even the intended end state reads as a
graceful dim. Confirmed the fix by sweeping scroll positions and checking
the computed `filter` at each step — now rises/falls monotonically between
1.0 and 0.8 with no dip.

**Dev-server preview gotcha, worth checking first in any future sandbox
session before assuming animation code is broken:** Next.js 16 dev mode
blocks browsers from loading JS/HMR when they connect via the sandbox's
public network IP instead of `localhost` — treats it as cross-origin,
silently drops `/_next/static/chunks/*` and the HMR endpoint, so the page
loads with **zero client JS running** (no hydration, no GSAP, no Lenis) and
nothing appears to work even though there are no console errors. Fix:
`allowedDevOrigins: ["<the sandbox's IP>"]` in `next.config.ts`, then
restart the dev server. **Deliberately NOT committed** — the IP is specific
to each ephemeral sandbox and goes stale the moment the sandbox changes, so
this was reverted before committing plans 006-009.

**PR workflow note:** the GitHub token in `~/.git-credentials` was upgraded
mid-session to one with both Contents and Pull Requests write scope (the
prior token could push but 403'd on PR creation). `gh` CLI is **not
installed** in this sandbox — PRs are opened directly via `curl` against
the GitHub REST API using that stored token. If PR creation ever 403s with
"Resource not accessible by personal access token" again, it's this same
class of issue — needs a token with Pull requests: Read and write, not a
code fix.

**Live site verified after merge.** PR #53 squash-merged to `main`. Checked
shomailaniazi.com afterward and confirmed the new deploy is live — `/`,
`/ventures`, `/story`, `/journal` all return 200, and the new markers
(`story-para`, `hero-bg-layer`, `lg:sticky` on the Ventures sections) are
present in the deployed HTML. **Curl gotcha hit while checking**: the root
domain 308-redirects to `www.shomailaniazi.com` — use `curl -L` or the
response body is just a 15-byte "Redirecting..." stub, which looks like an
empty/broken page if you forget `-L`.

**One thing intentionally left unverified:** real trackpad/mouse "feel"
testing (Lenis inertia quality, hero drift subtlety, sticky-stack
smoothness) — this sandbox has no display or browser control, so
verification was headless/DOM-based plus one round of Majid's own live
feedback (which is what caught the brightness bug above). Worth a final
look next time Majid's on the actual site if the scroll feel seems off.

**Host-level note, unrelated to the animation work but from earlier in this
session — won't show up in any diff:** this sandbox instance had only
961Mi RAM and 0 swap, genuinely too little for a Next.js production build
(confirmed a real build using up to 356Mi of swap at its peak). Set up a
2GB swapfile (`/swapfile`, persisted in `/etc/fstab`, `vm.swappiness=10`).
This is host-level, not app-level — a **different or reset sandbox instance
in a future session would need this redone**, it doesn't travel with the
git repo.

---

**Previous session (the "20 things" checklist + Open Graph image saga,
PRs #47–#51) — compressed, durable lessons only:**

Shipped a custom 404, homepage metadata, `robots.ts`/`sitemap.ts`, Vercel
Analytics, a restrained hero "Read My Story →" CTA, a site-wide `Footer.tsx`,
and Privacy/Terms pages. **The OG image took 5 rounds to get right — the
lessons that still matter if `layout.tsx` or `public/og-image.jpg` are
touched again:**
- Next's `opengraph-image.*` file-convention route serves with
  `Transfer-Encoding: chunked` and no `Content-Length` — WhatsApp's crawler
  silently refuses to render an image it can't size up front. Use a real
  static file under `public/` referenced explicitly via `openGraph`/
  `twitter` metadata instead.
- Setting `openGraph.title`/`description` explicitly at the root layout
  breaks per-page inheritance (every page falls back to the generic
  default). Leave those two fields unset at the root.
- **A GitHub squash-merge can silently drop a file deletion** — a PR that
  deletes a file may only capture the deletion in its own local commit, and
  squash-merging can lose it, leaving the "deleted" file quietly alive on
  `main`. This bit the OG image (a stale competing `opengraph-image.png`
  kept winning over the real static file for two PRs before anyone
  noticed). After merging any PR that deletes a file, worth a quick `git
  show origin/main:<path>` check to confirm the deletion actually landed.
- `layout.tsx` now hashes `public/og-image.jpg`'s own bytes at build time
  and appends `?v=<hash>` to the URL — link-preview crawlers cache by URL,
  not content, so overwriting the file in place alone won't bust their
  cache.

WhatsApp preview confirmed working end-to-end. Google search still shows a
stale "coming soon" snippet from an old crawl — confirmed nothing in the
current code produces that text, it's just Google's cache; **explicitly
deferred by Majid**, next step when ready is Search Console → Request
Indexing.

---

**Older sessions — kept for reference:**

**Shipped: fixed a visible gap between page sections while
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
- **A fresh sandbox has no GitHub push credentials** — `git push` fails
  with "could not read Username for 'https://github.com'" (no `gh` CLI,
  no stored credential helper). Hit once, resolved by asking Majid for a
  GitHub personal access token, then `git config --global
  credential.helper store` + writing
  `https://abdulmajidnaiymatkhan-lab:<token>@github.com` to
  `~/.git-credentials` (chmod 600). That file lives outside the repo and
  is never committed. Whether this persists into a later session depends
  on whether the sandbox/container is reused — if push fails the same way
  again, this is the fix, not a sign something is newly broken.
- **Higgsfield-generated assets live on a CDN this sandbox can't reach**
  (`*.cloudfront.net` → `EGRESS_BLOCKED`/403). Have Majid upload the
  file straight to the repo via GitHub's web UI, then pull it with
  `get_file_contents` (GitHub's API is unaffected) — don't re-attempt a
  direct CDN fetch.
- **Higgsfield credit balance was 5.4 as of the favicon session** — check
  `balance` before generating anything and flag it to Majid if a task
  needs more than what's available.

DNS/domain-live question is now resolved (see top of "Where things
stand" above) — the "Current project" section's domain line has been
updated to reflect this.
