export type Niche =
  | "Fashion"
  | "Beauty"
  | "Travel"
  | "Lifestyle"
  | "Food"
  | "Wellness"
  | "Tech & Apps"
  | "Finance & Fintech";

export const niches: Niche[] = [
  "Fashion",
  "Beauty",
  "Travel",
  "Lifestyle",
  "Food",
  "Wellness",
  "Tech & Apps",
  "Finance & Fintech",
];

export type EditItem = {
  id: string;
  niche: Niche;
  caption: string;
  gradient: string;
};

// Placeholder tiles — swap `gradient` for real Instagram post/reel thumbnails
// once available, keyed by niche so the filter above keeps working.
const gradientsByNiche: Record<Niche, string[]> = {
  Fashion: [
    "linear-gradient(140deg, #F2C4B8, #212B23 130%)",
    "linear-gradient(140deg, #212B23, #F2C4B8 130%)",
  ],
  Beauty: [
    "linear-gradient(140deg, #F6D9CE, #3a4a3d 130%)",
    "linear-gradient(140deg, #F2C4B8, #9CAF88 130%)",
  ],
  Travel: [
    "linear-gradient(140deg, #9CAF88, #212B23 130%)",
    "linear-gradient(140deg, #3a4a3d, #F6D9CE 130%)",
  ],
  Lifestyle: [
    "linear-gradient(140deg, #212B23, #9CAF88 130%)",
    "linear-gradient(140deg, #F2C4B8, #FAF6F0 130%)",
  ],
  Food: [
    "linear-gradient(140deg, #F6D9CE, #212B23 130%)",
    "linear-gradient(140deg, #9CAF88, #F2C4B8 130%)",
  ],
  Wellness: [
    "linear-gradient(140deg, #FAF6F0, #9CAF88 130%)",
    "linear-gradient(140deg, #212B23, #F6D9CE 130%)",
  ],
  "Tech & Apps": [
    "linear-gradient(140deg, #212B23, #212B23 60%, #9CAF88 130%)",
    "linear-gradient(140deg, #3a4a3d, #F2C4B8 130%)",
  ],
  "Finance & Fintech": [
    "linear-gradient(140deg, #212B23, #F6D9CE 130%)",
    "linear-gradient(140deg, #9CAF88, #212B23 130%)",
  ],
};

const captionsByNiche: Record<Niche, string[]> = {
  Fashion: ["Editorial styling", "Capsule wardrobe reel", "Runway recap"],
  Beauty: ["Get-ready-with-me", "Product first-look", "Routine breakdown"],
  Travel: ["City guide reel", "Packing edit", "On-location diary"],
  Lifestyle: ["A day in the life", "Home refresh", "Slow morning routine"],
  Food: ["Recipe walkthrough", "Restaurant feature", "Kitchen essentials"],
  Wellness: ["Morning ritual", "Mindset reset", "Workout diary"],
  "Tech & Apps": ["App walkthrough", "Productivity setup", "First impressions"],
  "Finance & Fintech": ["Budgeting breakdown", "Investing basics", "Money myths"],
};

export const editItems: EditItem[] = niches.flatMap((niche) =>
  captionsByNiche[niche].map((caption, i) => ({
    id: `${niche}-${i}`,
    niche,
    caption,
    gradient: gradientsByNiche[niche][i % gradientsByNiche[niche].length],
  }))
);

// Placeholder brand names for the logo wall — swap for real brand logos
// once Shomaila shares them. Keep the wordmark treatment consistent.
export const brands: string[] = [
  "AURELIA",
  "NORTH & CO",
  "STUDIO LUME",
  "MAISON VELA",
  "FERNWEH",
  "OAK & OLIVE",
  "SOLSTICE",
  "PALOMA",
  "BIRCHWOOD",
  "COASTLINE",
];

export type EditStat = {
  label: string;
  value: number;
  suffix: string;
};

// Placeholder figures — replace with Shomaila's real collaboration metrics.
// Manual for now; can wire to a live source later per the automation roadmap.
export const editStats: EditStat[] = [
  { label: "Brand collaborations", value: 25, suffix: "+" },
  { label: "Content pieces delivered", value: 120, suffix: "+" },
  { label: "Niches worked across", value: 8, suffix: "" },
];
