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

**Last updated:** 10 Nov 2026, ~11:30pm (Tuesday). Majid said "Taking a break now".
**🔴 Wed 11 Nov afternoon: Majid sends Sindibad the FINAL OFFER** (link below) — the head
chef asked for it "by tomorrow afternoon". Ask first thing whether it went out / any reply.
If silent by Fri 13 Nov → one gentle PT follow-up. **Next build task: the prospect demos
(list below), starting with Forno d'Aldeia.** Older detail is compressed into durable lessons at the bottom of this section. The
**FDE Marketing repo's own CLAUDE.md** (`/home/user/fde-marketing-site/CLAUDE.md`,
repo `abdulmajidnaiymatkhan-lab/Fde-marketing-site`) holds the full build notes and
page decisions — read it before touching that site.

### Agreed order — Majid asked to be HELD to this; point out diversions

1. **FDE**: (a) fde.global handover → done (PDF + designer salary sent to Urooj 5 Nov).
   (b) **FDE Marketing launch → IN PROGRESS, resume here.**
2. **Finalize the Shomaila website** (list further down).
3. At "Taking a break now": update this file, then suggest `/compact`.

**Parked — only if Majid brings them up:** MASH-Bot (own repo/session), trading reels,
video tooling, FDE reel thumbnails.

### RESUME HERE — FDE Marketing launch

**Why:** FDE's education side is declining; Majid wants agency income now. Team: ads
expert employee; websites Majid + Claude; shoots Majid + Shomaila (own camera);
branding outsourced (NEVER say "freelancers" publicly — Majid's rule).

**Live (Cloudflare Pages project `fde-marketing`, Majid's account, auto-deploys from
`main` in ~2 min):**
- **https://fde-marketing.pages.dev — the landing page is COMPLETE** (EN + European
  PT): hero (photo shrinks into a post, reels fan out in one scroll) → Services →
  Proof (Shomaila's real numbers, shomailaniazi.com Ventures-page case study) →
  **Concepts** (3 fictional sites) → creator brand wall → Reel wall (9 real reels) →
  Pricing (from €X, €900 bundle, 15% offer worded as "partner offer · 5 vagas") →
  How it works → Contact (WhatsApp card + Web3Forms form → marketing@fde.global,
  **tested end to end by Majid**) → footer (legal line, Livro de Reclamações) →
  `/terms/` + `/privacy/` (EN/PT). Share preview (og-image, PT) done.
  - Full Portuguese review done 7 Nov (natural European PT, "você" register).
  - Rules from Majid's reviews: no "freelancers"; no "first/founding clients" or
    anything that says "we're new"; never show live prospects' demos on our page.
  - Fake case studies were proposed by Majid and declined by Claude (deceptive /
    legal risk) → replaced by clearly-labelled fictional concept sites.
- **Spec demos for outreach** (self-contained HTML in `public/demos/`, noindex):
  - `/demos/sindibad/` (Arabic restaurant, Lisbon) and `/demos/alcach/` (bar,
    Alcochete) — **approved by Majid after the "wow" pass** (sunset→night hero with
    clock; walk-through-the-arch portal).
  - `/demos/lume/`, `/demos/brisa/`, `/demos/forja/` — fictional salon / café / gym
    concepts (Unsplash photos), approved. Booking buttons → FDE WhatsApp.
  - **`/demos/albahri/` — v2 APPROVED (Majid checked phone + iPad, 7 Nov).** Dubai
    safety-equipment supplier (al-bahri.com), brothers Khozema & Fakhruddin Manager
    (Majid's close friend's father-in-law). v1's cartoon mannequin was called
    "childish"; v2 = AI worker in full PPE (Higgsfield, ~13 of an approved 35
    credits), scroll-scrubbed camera-orbit film hero, head-to-toe zoom scan with real
    products/specs, industries pan, kit-builder quote, live Dubai open/closed status,
    **full Arabic version `?lang=ar`** (needs a native read-through). Full build
    notes: FDE repo CLAUDE.md. **Next: Al Bahri pitch pack** (forwardable intro
    message, one-page talking points, a price range above the €900 small-business
    bundle) — **waits until Majid's call with his friend (busy till mid next week)**;
    then he either sends a proposal or gets introduced. Open: founding year
    (1987/1991/1993 on their site), whether +971 4 338 0900 takes WhatsApp. Pitch
    points: broken call/chat/quote links on their site, conflicting dates, 2022
    copyright, low-res photos.

**Outreach (Majid sends, WhatsApp):** Sindibad + Alcach on **Mon 9 Nov 3–5pm**, one
follow-up Thursday, then stop. **No link in the first message** (people distrust
links): text + a short phone screen-recording of their demo; the link only when they
ask. **Majid records the videos himself on his phone** — the automated recordings
Claude made (8 Nov) scrolled too abruptly and didn't show the motion effects; don't
remake them unless asked (if ever: slow continuous scroll that lets pinned motion
play out). Ask for a 10-minute visit; price (€550 + IVA site) only if asked.
Nobby (Halal Turkish) is third — WhatsApp dead. Always give Majid English
translations of any Portuguese message.
**Results, Mon 9 Nov (sent ~2:50pm with Majid's own screen recordings):**
- **Sindibad (912 507 038) — WARM.** English follow-up + video sent → a staff member
  CALLED within minutes; he speaks **Portuguese/Arabic, not English** (Majid switched to
  Arabic). Asked where we're based and whether we have camera equipment (→ interest in
  photo/video content, not just the site). Taking it to the **owner, who will call
  back**. Majid then sent a PT recap (agency in the Lisbon area: sites, photo/video shoots
  with our own equipment, social media, ads; happy to visit when the owner can). **All
  future Sindibad messages in Portuguese** (Arabic line optional). If no call by
  **Thu 12 Nov** → one gentle PT follow-up. Offer if they bite: €550 + IVA site; €400/mo
  Content & Social (6–8 posts, 1 shoot day, 4 videos). sindibad.pt is a domain-for-sale
  page (reseller) — suggest a new domain (~€10–15/yr) if buying it back is pricey.
  (History: earlier English intro was seen/unanswered; Majid flagged on 8 Nov that I
  drafted a fresh intro instead of a follow-up — always check prior contact first.)
- **Alcach (Luís Pinto, 919 309 031) — NO (polite).** Voice note: they paid another
  company ~2 months ago for their site, already in progress. Majid replied warmly in PT
  leaving the door open for photo/video, social media and ads. Don't chase.
- **Lesson:** a business with a broken/weak site may already be paying someone to fix
  it — ask a one-line qualifying question before investing hours in a demo.
- **Canaan Garden** (Montijo) demo built 9 Nov (v3 live, Majid liked it) — pitch in person
  with the iPad. Opening hours unconfirmed (IG 10:00 vs Google 8:30; demo uses IG).
- **Detour (9 Nov):** Majid is starting a SEPARATE session + new repo
  (`shomaila-content-studio`) for Shomaila's Instagram content (research, video ideas,
  calendar). Starter message was given to him. Not part of this repo's work.
- **Sindibad called back → meeting Tue 10 Nov 6pm.** Prep (9 Nov, the FIRST proposal):
  - **Arabic version of their demo**: `/demos/sindibad/?lang=ar` (RTL, عربي button; PT/EN
    still there; numbers kept LTR).
  - **Proposal page** `/demos/sindibad/proposta/?l=ar` (PT/عربي/EN toggle, FDE purple,
    printable): what we noticed (sindibad.pt is for sale by a reseller, no official
    site/menu online, phone-only bookings) → Option 1 site **€550 + IVA** (PT+EN, mobile,
    WhatsApp/phone booking, Maps, full menu, new domain in their name, hosting in their
    name, ~7 days, 1 round of changes) + **Arabic version +€150** + maintenance from
    €50/mo → Option 2 Content & Social €400/mo → Option 3 bundle €900/mo ("best value") →
    payment **50% start / 50% at launch** → **"Costs after the website (no surprises)"**
    (domain ~€10–20/yr in their name; hosting/https/WhatsApp button/maps/stats free;
    maintenance optional; email free forwarding or ~€7/person/mo Workspace; no hidden
    monthly fees vs Wix/Squarespace €15–30/mo) → what we need → next steps → contact.
    Valid 30 days. The **15% partner discount is NOT on the page** — Majid uses it only
    to close if they hesitate on a monthly package.
  - Meeting plan given to Majid: let the Arabic paper do the explaining; Shomaila's IG as
    proof; Google Translate conversation mode as backup; demo in PT → tap عربي (wow
    moment) → proposal; Syrian-Arabic key phrases + vocabulary; objection table (don't cut
    the €550; if needed include Arabic free instead).
  - **Domain advice:** a **.pt** from a Portuguese registrar (PTisp / Amen.pt /
    Dominios.pt), e.g. **sindibadlisboa.pt** (also free: sindibad.com.pt,
    restaurantesindibad.pt, sindibadrestaurante.pt — DNS check only). Majid had searched
    Vercel/Namecheap/GoDaddy: ignore premium resales (.org €1,701) and first-year teaser
    prices; told him to **remove sindibad.marketing from his GoDaddy cart**. Buy only after
    they choose + pay the deposit, in THEIR name (.pt needs their NIF).
  - **"They said yes" checklist** given: written acceptance on WhatsApp; collect legal
    name, NIF, address, contact; deposit €338.25 (site) or €430.50 (site + Arabic) incl.
    23% IVA via MB Way/transfer to the company account + fatura-recibo; register domain;
    collect menu/photos/logo/hours/delivery links; build ~7 days; preview + 1 round;
    2nd 50%; go live on a free Cloudflare account in their name (Majid as admin); update
    Google Business Profile; offer maintenance.
  - **Majid must call his accountant** (certified invoicing software + confirm IVA on our
    invoice is deductible for the restaurant) — still unconfirmed.
- **Meeting happened Tue 10 Nov** (Majid + Shomaila; the **head chef negotiated**, the owner
  handed him the reins without looking himself; chef came across as slow — Majid wants
  everything idiot-proof). Chef: "prices high"; owner rejected €900 bundle but liked
  €550 + monthly; asked 8 Reels + 15 photo posts/month, 2 shoot days, 4 platforms
  (IG, FB, TikTok, Snapchat); refused 3 months upfront; **wanted to pay WITHOUT IVA (called
  it a deal-breaker)**. Majid stalled ("checking with accountant").
  - **IVA decision:** price + IVA, official fatura always. Claude refused to help structure a
    cash/no-invoice deal (undeclared income risk for Alvorada Admirável; Majid had floated
    "no invoice → 3 months cash upfront"). Arguments: IVA is normally deductible for a
    VAT-registered restaurant (accountant to confirm); cash is fine *with* an invoice.
    Legal fallback if they insist: IVA-inclusive price (e.g. €600 total = €487.80 + IVA).
    If they insist on no invoice at all → walk away.
  - **Final offer (Majid approved, LIVE):** `/demos/sindibad/proposta-final/?l=ar` (and
    `?l=pt`/`?l=en`) — a NEW page; the original `/proposta/` was deliberately left untouched
    (Majid: never overwrite a link a client already has). Website **€550 + IVA, Arabic now
    included free**, 50/50. **Option A** (what they asked): 2 shoot days, 8 Reels, 15 photo
    posts, 4 platforms (photos on IG+FB only) — **€600/mo months 1–3, then €750**. **Option
    B**: 1 shoot day, 4 Reels, 4 posts — **€360 then €400**. First payment A €875 / B €635
    (+ IVA); then €275 when the site is ready and online. Month by month in advance;
    3-month commitment but can stop after month 1. Page: two big A/B cards with big-number
    stats, itemised "what you pay" (website / social media / your first payment = sum),
    "+ IVA" next to EVERY price, green "We choose Option A/B" WhatsApp buttons, first-vs-final
    comparison table + link to the first proposal, details in tap-to-open boxes.
  - **Arabic style rule (Majid):** everyday Arabic — NOT formal book Arabic and NOT Syrian
    street slang (no بدكم/شو/منبلّش/اكبسوا/فيكم/يلي/قديش). E.g. "يومين تصوير في الشهر",
    "كم تدفعون", "نختار الخيار A". Write platform names in Arabic letters; wrap € amounts in
    LTR isolates (⁦…⁩) or they render reversed.
  - Economics Majid accepted knowingly: Option A ≈ 45 person-hours/month → ~€11/h each at
    €600 (minus ~€100 travel; no car, ~€50 per Lisbon round trip — check ferry/Navegante).
    Investment for a first client + case study.
  - **After the deal settles:** test one reel edit end to end (Majid shoots → Google Drive →
    Claude rough-cut/captions/9:16 → Majid finishes in CapCut on phone). Not tested yet.
  - Message to send (PT, English given to Majid): short, Arabic link first, "2 opções…
    carregar no botão verde… fatura oficial".
- **Prospect list (9 Nov)** — Majid prefers building a demo first, then reaching out (no
  cold "do you need a site?" messages). Mostly businesses within walking distance of home
  in Montijo; build one at a time, Majid reviews each:
  1. **Churrasqueira O Forno d'Aldeia** — R. José Joaquim Marques 125a (opposite his
     daughter's school). No website; Uber Eats 4.4★ (900+ ratings) + Glovo; weekly menu on
     Facebook; whole leitão orders by phone 210 820 868. Menu/photos from Uber Eats/Glovo.
     **Start here.**
  2. **Academia Dance Fusion** — 13 yrs, 14 teachers, 3 studios, ~250 students, yearly show
     at the municipal theatre. dancefusion.pt is nearly empty (address + phone only, WP
     5.3). Demo idea: classes by age, timetable, trial-class booking, the show.
  3. **Sued Essence – Cabelo & Estética** (Majid's street) — recently opened, premium,
     extensions/laser/HIFU, team growing; no website; bookings via BUK (buk.pt/suedessence);
     IG @suedessence.pt.
  4. **Evolution Wellness & Fitness** (Shomaila's gym) — 20 yrs; evolution.pt shows
     **"Lorem ipsum" placeholder text** on the homepage + a second site evolution.lpfit.pt
     for plans/signup. Wants photos from Shomaila.
  5. **Creperia 100 Desculpas** (walking distance) — essentially nothing online; needs
     Majid's photos + menu.
  6. **Vila Ceramic** (Majid's street, Rua dos Correios 273, 938 402 009) — tiles/ceramics,
     TikTok only; needs Majid's photos.
  - Lower/skip: Brazil Imperial (has a basic shop site), Unicroissant (franchise, central
    site). Researched but not chosen: Taberna dos Cabrões (29K FB, no site), Osteria
    Bellagio, Joana Come a Tapa, La Cantina, O Victor (old WP site), Girassol (has site).
- Open questions for Majid: certified invoicing software (accountant); Canaan Garden
  opening hours.

Mobile check of the landing page + 3 concepts: **approved** by Majid (7 Nov).

**Urooj (fde.global handover), 8 Nov:** she read the handover PDF and asked for one
email to link everything to (Cloudflare is on her account; she'll "transfer
ownership"). Majid confirmed his own Cloudflare account (the one with the
`fde-marketing` Pages project) and sent her **that account's email**, asking her to
(1) export the DNS records and send the file, (2) add that email as **Super
Administrator** on her Cloudflare account — and NOT to move/delete the domain; the
final zone move into Majid's account is done together at a quiet hour (zero
downtime). Advice given: never use an @fde.global address as the owner email. **Next
when the export arrives:** verify every record against live DNS, then the move,
then point **marketing.fde.global** at Pages (also change `SITE` in
`src/app/layout.tsx` + the Web3Forms website URL). Fallback if nothing by ~12 Nov:
ask Lovable support for the record list. (Full DNS plan: FDE repo notes.)

**Waiting on Majid:**
1. Company **registered address (morada da sede)** for Privacy/Terms.
2. Accountant/lawyer glance at Terms + Privacy; a native PT speaker read-through.
3. Certified invoicing software (accountant). **Decided 9 Nov:** websites 50% start /
   50% at launch; Arabic version = optional +€150; 15% partner offer kept for closing only.
4. Password hygiene: a password he tried was flagged as breached — change it where
   reused; 2FA on Cloudflare and on the Gmail that now owns everything.

**Tooling notes:** GitHub MCP can't create repos (403) → Majid creates, then
`add_repo`. Majid was emailed to accept new Claude GitHub App permissions (repo
creation) — told it's safe; unknown if accepted. Web3Forms rejects server-side
submissions (sandbox IP) — test forms from a real device. `rembg` (pip) works here for
product cutouts; Unsplash photos via `images.unsplash.com/photo-…` URLs found with
Firecrawl image search. Force-push is blocked by the auto-mode classifier: after a
squash-merged PR, merge `origin/main` into the branch instead of resetting it.

### fde.global handover — done (5 Nov)

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
  designer salary** (kept separate from the website payment on purpose) — SENT 5 Nov (v2 adds a "Needed from you now" section: DNS export + FDE Marketing Lovable access/handover).
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
- **Shipped 8 Nov:**
  - **My Ventures stacking cards** (PR #75, approved after preview): ventures 1 & 2
    are `position: sticky` inside `.venture-stack`; the last venture is NOT sticky and
    the closing strip sits outside the wrapper, so the old Eylaskin overlap can't
    recur. Covered card scales to .93 + dims (charcoal overlay .32), driven only by
    the next card's own position; cards taller than the screen stick by their bottom
    edge (`top = vh − height`, set on refreshInit). Verified: Eylaskin bottom ==
    closing-strip top at every scroll stop, desktop + phone.
  - **Google Search Console set up** (property = URL prefix
    `https://www.shomailaniazi.com/`, verified via HTML file
    `public/google0e69de477b8ec0d3.html`, PR #76 — must stay in place). **`SITE_URL`
    is now `https://www.shomailaniazi.com`** (PR #77) — the bare-domain URLs made
    every sitemap entry fall outside the property; sitemap now "Success". Majid
    requested indexing for 9 pages (all except Privacy/Terms). Google should drop
    the stale "coming soon" snippet within days.
- Remaining:
  1. My Studio stats (25+ / 120+ / 5 in `src/lib/edit-data.ts`) are placeholders —
     awaiting real numbers from Majid/Shomaila; don't touch until supplied.
  2. YouTube → Journal automation: paused at backend choice. Recommendation
     on record: Supabase + review-gate publish flow + Vercel Cron trigger;
     custom scripts over n8n. Session scope: foundation + first workflow
     only. Offered to explain options in plain English — Majid hasn't picked yet.
  3. Contact form sends from Resend's test sender `onboarding@resend.dev` →
     possible spam folder. Suggested: Majid sends a test message; proper fix =
     verify shomailaniazi.com in Resend (DNS records, ~15 min, guided).
  4. FDE Marketing link already points to marketing.fde.global — updates itself
     once the new site moves there. Eylaskin "Coming Soon" until it launches.

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
