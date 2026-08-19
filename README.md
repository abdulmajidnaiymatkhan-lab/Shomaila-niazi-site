# Shomaila Niazi — Site

A Next.js site for Shomaila Niazi, self-taught digital entrepreneur and founder. Built with the App Router, Tailwind CSS, and GSAP (ScrollTrigger) for scroll-driven animation.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Stack

- **Next.js** (App Router)
- **Tailwind CSS v4** — brand palette (sage, peach, charcoal, cream, ink) defined in `src/app/globals.css`
- **GSAP + ScrollTrigger** (`@gsap/react`) — scroll-triggered reveals, hero intro, and stat count-ups, set up in `src/lib/gsap.ts`

## Structure

- `src/app/page.tsx` — homepage, composed of the sections below
- `src/components/Hero.tsx` — full-height intro with animated tagline
- `src/components/Story.tsx` — scroll-revealed narrative section
- `src/components/Stats.tsx` — animated follower counts
- `src/components/Teaser.tsx` — cards linking to future pages (Ventures, Journal, Connect)
