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
  // Accent sampled from the brand's own mark — drives that tile's glow/
  // border on the brand wall so each card carries real color instead of
  // sitting in an identical flat capsule. Anua/Skin1004 have monochrome
  // marks with no real brand color, so they borrow the site's own sage/
  // peach tokens instead of an invented one.
  accent: string;
};

// Real brand partners. Each renders as a text wordmark until its `logo`
// field is filled in — logo files land in public/images/brands/ as
// Shomaila supplies them, one at a time, no need to wait for the full set.
export const brands: Brand[] = [
  { name: "Unilever", logo: { src: "/images/brands/unilever-logo.png", width: 569, height: 674 }, accent: "#2B3990" },
  { name: "Sunsilk Pakistan", logo: { src: "/images/brands/sunsilk-logo.png", width: 900, height: 600 }, accent: "#8E1D4C" },
  { name: "Nestlé", logo: { src: "/images/brands/nestle-logo.png", width: 800, height: 800 }, accent: "#E30613" },
  { name: "Milo Pakistan", logo: { src: "/images/brands/milo-logo.png", width: 711, height: 517 }, accent: "#B5651D" },
  { name: "Always", logo: { src: "/images/brands/always-logo.png", width: 3840, height: 2160 }, accent: "#1E3A8A" },
  { name: "Garnier", logo: { src: "/images/brands/garnier-logo.png", width: 3840, height: 2160 }, accent: "#2F6E3A" },
  { name: "Anua", logo: { src: "/images/brands/anua-logo.png", width: 847, height: 300 }, accent: "#9CAF88" },
  { name: "Skin1004", logo: { src: "/images/brands/skin1004-logo.png", width: 694, height: 58 }, accent: "#F2C4B8" },
  { name: "Papa John's", logo: { src: "/images/brands/papa-johns-logo.png", width: 603, height: 247 }, accent: "#CE202F" },
  { name: "Coca-Cola Arena", logo: { src: "/images/brands/coca-cola-arena-logo.png", width: 3508, height: 1196 }, accent: "#F40009" },
  { name: "Coke Studio", logo: { src: "/images/brands/coke-studio-logo.png", width: 587, height: 298 }, accent: "#E4002B" },
  { name: "Temu", logo: { src: "/images/brands/temu-logo.png", width: 600, height: 600 }, accent: "#FF6A00" },
  { name: "Trendyol", logo: { src: "/images/brands/trendyol-logo.png", width: 1322, height: 446 }, accent: "#F27A1A" },
  { name: "noon", logo: { src: "/images/brands/noon-logo.png", width: 282, height: 118 }, accent: "#FFE000" },
  { name: "Chicpoint", logo: { src: "/images/brands/chicpoint-logo.png", width: 512, height: 512 }, accent: "#FF5A36" },
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
