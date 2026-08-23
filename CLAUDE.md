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

**Last updated:** end of the session covering real-photo integration for
Journal/Ventures/Studio/Connect, the My Studio tilt fix, and the FDE
Marketing logo.

**Shipped and live on shomailaniazi.com (main, merged):**
- Full site structure: Home, My Story, My Journal (index + post detail),
  My Ventures, My Studio, Connect — all with nav.
- Real photos integrated on every page (Home, My Story, My Journal, My
  Ventures, My Studio, Connect). Journal/Studio/Connect use the full-bleed
  background pattern; Ventures uses the mask-fade side panel (photo on the
  right, mirroring Home) — a full-bleed rebuild of Ventures was tried and
  explicitly rejected ("not liking this at all"), reverted back to the
  panel technique. See "Real photo integration style" above for the mask
  technique itself, still the standard.
- **Hero framing lesson learned the hard way this stretch:** making a hero
  section much taller to reveal more of a tall portrait photo pushes the
  headline/sub below the fold on first load — Majid explicitly does not
  want scrolling required to see text. So full-bleed hero heights are back
  to normal viewport-ish sizing (matching Home/My Story) with just the
  object-position tuned for the best crop that still fits; don't re-attempt
  very tall (1300px+) full-bleed heroes for "more zoomed out" without
  checking text-on-load first. The panel/mask-fade technique (Home,
  Ventures) doesn't have this tradeoff — a narrower photo panel needs far
  less crop, so it shows much more of the image *and* keeps text visible
  in one viewport at normal height. Worth considering for Journal/Studio
  if Majid wants even more of the photo visible later.
- Nav-overlap fix: every full-bleed hero photo (Journal, Studio, Ventures,
  Connect, My Story) repositioned so her head/hair never sits under the
  fixed nav bar — this was a real bug on already-shipped pages too, not
  just new ones, found while responding to feedback on the new photos.
- **My Studio dynamic tilt:** added a scroll-driven tilt (works on every
  device, including touch) layered on top of the existing mouse-hover
  tilt via two nested wrapper divs (so the two rotations compose instead
  of fighting over one transform). While wiring it up, found the
  *original* mouse-hover tilt had never actually rendered at all since it
  was first built — driving `rotateX`/`rotateY` as two independent
  `gsap.quickTo()` calls on the same element hits a real GSAP limitation
  decomposing the resulting matrix3d back apart (silent no-op, "not
  eligible for reset" warning). Fixed by driving a plain `{rx, ry}` state
  object and applying both axes together via `gsap.set()` each frame —
  if a similar dual-axis quickTo tilt/rotation effect gets added anywhere
  else, use this pattern from the start, not two separate quickTo calls.
- **FDE Marketing logo**, generated and integrated into the Ventures page
  (replaces the plain "FDE Marketing" text heading with the logo image).
  Real official FDE logo + a screenshot of the FDE Marketing landing page
  were uploaded to the repo as references; used Higgsfield's
  `openai_hazel` model (its `image_references` role, tagged "best text
  rendering" — much more reliable for logo/wordmark text than `soul_2`)
  to generate 3 concepts blending both. Majid picked the horizontal
  one-line lockup (serif "FDE" from the official mark + the agency's own
  pink "MARKETING", thin lilac divider). Background cleaned to transparent
  via a sharp trim + luminance-threshold alpha script before dropping it
  into the site. **The official FDE logo itself (for the "Fulltime Digital
  Entrepreneur" venture card) and the site favicon are still untouched** —
  only FDE Marketing's mark is done.

**Explicitly abandoned, don't retry blindly:**
- AI-generating *photos* (not logos) for My Journal / My Ventures / My
  Studio / Connect via Higgsfield's `soul_2` character model — see "Real
  photo integration style" above. Majid supplied real photos instead,
  now shipped. Logo generation is a different, working use case (see
  above) — don't conflate the two.

**Mid-flight / blocked, pick up here:**
- The FDE Marketing logo work described above is **committed and pushed
  to the feature branch but not yet merged** — Majid was shown the final
  Ventures-page screenshots and asked to confirm before merge; his answer
  wasn't in before he stepped away. Check the branch state / ask him
  first thing next session rather than assuming it's fine to merge.
- The official FDE (Fulltime Digital Entrepreneur) logo still needs to go
  onto its own Ventures card and into the site favicon. No blocker this
  time — the real logo file is already sitting in git history from this
  session's uploads (it was one of the two Higgsfield reference images);
  it just hasn't been wired into the site yet.

**Workflow gotcha learned this session — branch resets after squash-merge:**
each PR merge on this repo uses squash, which leaves the local/remote
feature branch's own history pointing at commits that no longer match
main (main only has the squashed equivalent). Pushing more commits on top
of the *old* branch tip and then opening a new PR causes a real merge
conflict against main. Fix each time: `git fetch origin main`, then
`git log --oneline <old-merge-base>..<branch>` to find just the commits
made *after* the last merge, `git checkout -B <branch> origin/main`,
cherry-pick only those new commits, then `push --force-with-lease`. Don't
cherry-pick the whole branch history — only what's unmerged.

**Next up:** get Majid's go/no-go on the FDE Marketing logo PR; once
merged, do the official FDE logo (venture card + favicon); consider the
panel-technique option for Journal/Studio if more "zoomed out" photo is
still wanted.
