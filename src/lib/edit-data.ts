export type Niche = "Fashion" | "Beauty" | "Travel" | "Lifestyle" | "Food";

export const niches: Niche[] = ["Fashion", "Beauty", "Travel", "Lifestyle", "Food"];

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
};

const captionsByNiche: Record<Niche, string[]> = {
  Fashion: ["Editorial styling", "Capsule wardrobe reel", "Runway recap"],
  Beauty: ["Get-ready-with-me", "Product first-look", "Routine breakdown"],
  Travel: ["City guide reel", "Packing edit", "On-location diary"],
  Lifestyle: ["A day in the life", "Home refresh", "Slow morning routine"],
  Food: ["Recipe walkthrough", "Restaurant feature", "Kitchen essentials"],
};

export const editItems: EditItem[] = niches.flatMap((niche) =>
  captionsByNiche[niche].map((caption, i) => ({
    id: `${niche}-${i}`,
    niche,
    caption,
    gradient: gradientsByNiche[niche][i % gradientsByNiche[niche].length],
  }))
);

export type Brand = {
  name: string;
  logo?: { src: string; width: number; height: number };
};

// Real brand partners. Each renders as a text wordmark until its `logo`
// field is filled in — logo files land in public/images/brands/ as
// Shomaila supplies them, one at a time, no need to wait for the full set.
export const brands: Brand[] = [
  { name: "Unilever" },
  { name: "Sunsilk Pakistan" },
  { name: "Nestlé" },
  { name: "Milo Pakistan" },
  { name: "Always" },
  { name: "Garnier" },
  { name: "Anua" },
  { name: "Skin1004" },
  { name: "Papa John's" },
  { name: "Coca-Cola Arena" },
  { name: "Coke Studio" },
  { name: "Temu" },
  { name: "Trendyol" },
  { name: "noon" },
  { name: "Chicpoint" },
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
  { label: "Niches worked across", value: 5, suffix: "" },
];
