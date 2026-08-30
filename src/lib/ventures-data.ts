export type Venture = {
  slug: string;
  name: string;
  logo?: { src: string; width: number; height: number };
  meta: string;
  tagline: string;
  why: string;
  what: string;
  services?: string[];
  href?: string;
  hrefLabel?: string;
  instagramHref?: string;
  comingSoon?: boolean;
  theme: "core" | "agency" | "product";
};

export const ventures: Venture[] = [
  {
    slug: "fde",
    name: "Fulltime Digital Entrepreneur",
    logo: { src: "/images/fde-official-logo.png", width: 1165, height: 451 },
    meta: "Est. 2016 · Digital Education",
    tagline: "The platform that started it all.",
    why: "Back in the day, real digital marketing and crypto education taught by someone actually doing the work — not just talking about it — barely existed. I built the platform I wished I'd had.",
    what: "An active, no-fluff education hub equipping thousands of students with the exact digital marketing and crypto trading frameworks I use daily.",
    href: "https://fde.global",
    hrefLabel: "fde.global",
    instagramHref:
      "https://www.instagram.com/fulltimedigitalentrepreneur?igsi=MXMyNGh3OWlqd3hibw==",
    theme: "core",
  },
  {
    slug: "fde-marketing",
    name: "FDE Marketing",
    logo: { src: "/images/fde-marketing-logo.png", width: 998, height: 122 },
    meta: "Lisbon · Marketing Agency",
    tagline: "For brands who'd rather build than figure it out alone.",
    why: "As my own following grew, so did the requests to help other brands do the same. FDE Marketing became my answer for founders who don't have the time — or patience — to piece together content, ads, and branding from scratch.",
    what: "Operating across three continents with roots in Lisbon, Dubai, and Islamabad, handling the full stack of a brand's public presence, from the first post to the paid campaign behind it.",
    services: [
      "Content Creation",
      "Social Media Management",
      "Website Management",
      "Influencer Marketing",
      "Branding",
      "Ads Management",
    ],
    href: "https://marketing.fde.global",
    hrefLabel: "marketing.fde.global",
    instagramHref: "https://www.instagram.com/fde.marketing?igsi=eWwyOW1heGtleDcy",
    theme: "agency",
  },
  {
    slug: "eylaskin",
    name: "Eylaskin",
    meta: "Coming Soon · Botanical Skincare",
    tagline: "Rooted in tradition, crafted for the future.",
    why: "After years of scaling digital ecosystems, I wanted to build something you could actually hold. Eylaskin was born from a desire to merge organic, botanical ingredients inspired by Arabic and Moroccan beauty practices with uncompromising, eco-friendly design.",
    what: "A forthcoming botanical skincare and body care line wrapped in sustainable glass packaging. Formulated around raw elements like argan oil and natural clays for those who value clean ingredients as much as the planet.",
    comingSoon: true,
    theme: "product",
  },
];
