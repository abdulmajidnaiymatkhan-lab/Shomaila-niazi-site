export type JournalPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  keyPoints: string[];
  body: string[];
};

// Placeholder posts. Once the YouTube -> transcript -> summary pipeline is
// wired up, these will be generated automatically per CLAUDE.md's
// "Future automation goals" — this file stays the shape that pipeline writes to.
export const journalPosts: JournalPost[] = [
  {
    slug: "stopped-waiting-for-permission",
    title: "Why I Stopped Waiting for Permission to Start",
    category: "Mindset",
    excerpt:
      "Two degrees told me I needed more credentials before I could call myself anything. The internet disagreed.",
    date: "2026-06-02",
    readTime: "4 min read",
    keyPoints: [
      "Credentials are a starting line, not a finish line — no degree teaches you to actually ship.",
      "The first post, video, or product doesn't need to be good. It needs to exist.",
      "\"Not ready yet\" is usually fear wearing a strategy costume.",
      "Consistency beats a perfect plan you never execute.",
    ],
    body: [
      "I had a software engineering degree, then a fashion design degree, and neither one gave me permission to start the thing I actually wanted to do. I kept waiting for a credential, a mentor, a sign — something external that would make it official.",
      "Nobody was going to hand me that. In 2016 I opened a laptop and posted something imperfect, and that was the whole unlock. Not a course, not a certificate — just doing the thing publicly before I felt ready.",
      "The lesson took years to actually sink in: readiness is a feeling, not a prerequisite. It shows up after you start, not before. Every platform I've built since has followed the same order — act first, feel confident second.",
      "If you're waiting for permission, this is it. Post the thing.",
    ],
  },
  {
    slug: "content-system-behind-the-platforms",
    title: "The Content System Behind Every Platform I've Built",
    category: "Strategy",
    excerpt:
      "245K, 340K, 80K — none of it came from a viral fluke. Here's the unglamorous system underneath the numbers.",
    date: "2026-06-18",
    readTime: "6 min read",
    keyPoints: [
      "One core idea per week, reformatted across every platform — not three different strategies.",
      "Publish before it feels finished; the feed rewards frequency more than polish.",
      "Every piece of content answers one real question a follower actually asked.",
      "Track what people save and share, not just what they like — that's the real signal.",
    ],
    body: [
      "People assume growing three platforms to six figures each requires three separate content strategies. It doesn't. It requires one strong idea a week and the discipline to reshape it for Instagram, YouTube, and TikTok without diluting it three times.",
      "The system is boring on purpose: find the one question my audience is actually asking me, answer it honestly, publish it before I've had time to overthink the edit, then repeat. Virality was never the plan — repetition was.",
      "What actually moved the needle was watching saves and shares, not likes. Likes are a mood. Saves mean someone plans to come back to what you said, which is the entire point of building something people trust.",
      "None of this is secret. It's just unglamorous enough that most people skip it looking for a shortcut.",
    ],
  },
  {
    slug: "what-nobody-tells-you-about-building-in-public",
    title: "What Nobody Tells You About Building in Public",
    category: "Behind the Scenes",
    excerpt:
      "Building in public looks like confidence from the outside. From the inside, it's mostly just discomfort you get used to.",
    date: "2026-07-05",
    readTime: "5 min read",
    keyPoints: [
      "The discomfort of posting unfinished work never fully goes away — you just get faster at moving through it.",
      "Your audience remembers your honesty longer than your wins.",
      "Public feedback is data, not a verdict on your worth.",
      "The version of you that's afraid to post is the same one holding you back from everything else.",
    ],
    body: [
      "From the outside, building in public looks like confidence. From the inside, it's closer to a low hum of discomfort you learn to work alongside — every post is a small risk, and that never fully disappears no matter how big the following gets.",
      "What changed for me wasn't the discomfort going away. It was learning that the version of me flinching before I hit publish is the same version that avoids every other hard, worthwhile thing. Once I saw that pattern, it got easier to post anyway.",
      "The audience doesn't remember your polished wins nearly as long as they remember when you told the truth about a bad month. That honesty is what actually built trust — not the highlight reel.",
      "If you're building something and the idea of posting about it makes your stomach drop a little, that's usually a sign you're onto something real.",
    ],
  },
];

export function getJournalPost(slug: string) {
  return journalPosts.find((post) => post.slug === slug);
}
