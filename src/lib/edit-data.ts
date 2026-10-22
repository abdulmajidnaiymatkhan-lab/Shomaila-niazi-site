export type Niche = "Fashion" | "Beauty" | "Travel" | "Lifestyle" | "Food";

export const niches: Niche[] = ["Fashion", "Beauty", "Travel", "Lifestyle", "Food"];

export type EditItem = {
  id: string;
  niche: Niche;
  /** Instagram reel shortcode (the id in instagram.com/reel/<shortcode>/) */
  shortcode: string;
  /**
   * Real cover thumbnail, supplied by Shomaila one at a time — lands in
   * public/images/studio/ as they arrive. Until then the tile falls back
   * to a flat niche-colored gradient so the marquee still looks finished.
   * (Instagram blocks unauthenticated thumbnail scraping, and its own
   * embed widget needs full-card width + carries its own branding, which
   * didn't fit this site's small floating-tile look — hence doing this by
   * hand for now. Automating thumbnail fetch is a later roadmap item.)
   */
  thumbnail?: { src: string; width: number; height: number };
};

const gradientByNiche: Record<Niche, string> = {
  Fashion: "linear-gradient(140deg, #F2C4B8, #212B23 130%)",
  Beauty: "linear-gradient(140deg, #F6D9CE, #3a4a3d 130%)",
  Travel: "linear-gradient(140deg, #9CAF88, #212B23 130%)",
  Lifestyle: "linear-gradient(140deg, #212B23, #9CAF88 130%)",
  Food: "linear-gradient(140deg, #F6D9CE, #212B23 130%)",
};

export function gradientFor(niche: Niche): string {
  return gradientByNiche[niche];
}

// Real reels, organized by niche. Each links out to the real Instagram
// reel; `thumbnail` fills in as Shomaila sends real cover images.
export const editItems: EditItem[] = [
  {
    id: "lifestyle-1",
    niche: "Lifestyle",
    shortcode: "DdJmbkANmc0",
    thumbnail: { src: "/images/studio/reel-lifestyle-1.jpg", width: 1836, height: 2448 },
  },
  {
    id: "travel-1",
    niche: "Travel",
    shortcode: "DdBkFkKtDfj",
    thumbnail: { src: "/images/studio/reel-travel-1.jpg", width: 1688, height: 2256 },
  },
  {
    id: "travel-2",
    niche: "Travel",
    shortcode: "DcRE_-it6eV",
    thumbnail: { src: "/images/studio/reel-travel-2.jpg", width: 1836, height: 2448 },
  },
  {
    id: "beauty-1",
    niche: "Beauty",
    shortcode: "DcBgm_ntdd6",
    thumbnail: { src: "/images/studio/reel-beauty-1.jpg", width: 1080, height: 1920 },
  },
  {
    id: "travel-3",
    niche: "Travel",
    shortcode: "DaQfrRDN3lr",
    thumbnail: { src: "/images/studio/reel-travel-3.jpg", width: 1080, height: 1920 },
  },
  {
    id: "travel-4",
    niche: "Travel",
    shortcode: "DZXuuwDNAWt",
    thumbnail: { src: "/images/studio/reel-travel-4.jpg", width: 1761, height: 2448 },
  },
  {
    id: "beauty-2",
    niche: "Beauty",
    shortcode: "DZP-FM8o-3Z",
    thumbnail: { src: "/images/studio/reel-beauty-2.jpg", width: 1836, height: 2448 },
  },
  {
    id: "fashion-1",
    niche: "Fashion",
    shortcode: "DZFmMhst8x0",
    thumbnail: { src: "/images/studio/reel-fashion-1.jpg", width: 1080, height: 1920 },
  },
  {
    id: "food-1",
    niche: "Food",
    shortcode: "DUJGiwLkk77",
    thumbnail: { src: "/images/studio/reel-food-1.jpg", width: 1836, height: 2448 },
  },
];

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
