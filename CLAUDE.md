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

## Working style / rules

- Always work in small, scoped sessions — one page/feature per task, not everything at once.
- Never assume; ask before big structural decisions.
- Security: RLS must be enabled on all Supabase tables; no secret keys in frontend code; prices/amounts always verified server-side, never trusted from client.
- Higgsfield MCP is connected (image/video generation) — remote connector, no local setup needed in Claude Code Web.
- Explain technical steps in plain language — Majid is a beginner.
