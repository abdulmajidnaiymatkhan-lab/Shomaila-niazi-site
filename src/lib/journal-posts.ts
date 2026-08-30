export type JournalPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  videoUrl: string;
  keyPoints: string[];
};

// Real posts, each mapped to an actual YouTube video. Once the YouTube ->
// transcript -> summary pipeline is wired up per CLAUDE.md's "Future
// automation goals," new entries get generated automatically in this same
// shape — key points instead of long-form body text, since the video is the
// primary content here, not a written article.
export const journalPosts: JournalPost[] = [
  {
    slug: "how-i-became-financially-independent",
    title: "How I Became Financially Independent",
    category: "Mindset",
    excerpt:
      "Traditional education demanded conformity; the internet rewarded curiosity. Here is the full story of walking away from standard academic paths to build my own digital blueprint.",
    date: "2026-08-12",
    readTime: "32 min watch",
    videoUrl: "https://youtu.be/eFvhH-npT8k",
    keyPoints: [
      "Two degrees wasn't the answer; trusting the instinct to pivot in 2016 was.",
      "Financial independence didn't happen overnight — it was built one small, consistent experiment at a time.",
      "Learning in public is uncomfortable, but it accelerates growth far faster than waiting for perfection.",
    ],
  },
  {
    slug: "losing-everything-and-still-making-it",
    title: "Losing Everything and Still Making It",
    category: "Lifestyle & Execution",
    excerpt:
      "Relocating internationally isn't just a change of scenery; it's a complete reset. A raw look at navigating massive life shifts, risk-taking, and rebuilding from scratch in Portugal.",
    date: "2026-07-22",
    readTime: "59 min watch",
    videoUrl: "https://youtu.be/2mvKiqCjEPQ",
    keyPoints: [
      "The reality of international relocation is far messier and more chaotic than the aesthetic reels suggest.",
      "Losing everything forces you to strip away the non-essentials and focus purely on resilience.",
      "Building a digital business that can travel with you is the ultimate safety net.",
    ],
  },
  {
    slug: "the-reality-behind-the-screen",
    title: "The Reality Behind the Screen",
    category: "Behind the Scenes",
    excerpt:
      "A brand is only as strong as the foundation supporting it. A personal look at my journey, and how the right partnership fuels the life and business built around it.",
    date: "2026-07-15",
    readTime: "1 hr 8 min watch",
    videoUrl: "https://youtu.be/sUwqhovxAT4",
    keyPoints: [
      "Success is rarely a solo journey; having the right partner fundamentally changes the trajectory of your growth.",
      "Balancing a hyper-visible digital life with a grounded, private offline reality is an active daily practice.",
      "Sometimes the most important connections are right in front of you, just waiting for the right moment.",
    ],
  },
];

export function getJournalPost(slug: string) {
  return journalPosts.find((post) => post.slug === slug);
}
