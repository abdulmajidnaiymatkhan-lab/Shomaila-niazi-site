export type Venture = {
  slug: string;
  name: string;
  meta: string;
  tagline: string;
  why: string;
  what: string;
  services?: string[];
  href: string;
  hrefLabel: string;
  instagramHref: string;
  theme: "core" | "agency";
};

export const ventures: Venture[] = [
  {
    slug: "fde",
    name: "Fulltime Digital Entrepreneur",
    meta: "Est. 2016 · Digital Education",
    tagline: "The platform that started it all.",
    why: "In 2016, real digital marketing and crypto education taught by someone actually doing the work — not just talking about it — barely existed. Shomaila built the platform she wished she'd had.",
    what: "A live, growing education platform teaching digital marketing and crypto trading to thousands of students. Practical, no-fluff, and still taught by someone doing the work today.",
    href: "https://fde.global",
    hrefLabel: "fde.global",
    instagramHref:
      "https://www.instagram.com/fulltimedigitalentrepreneur?igsi=MXMyNGh3OWlqd3hibw==",
    theme: "core",
  },
  {
    slug: "fde-marketing",
    name: "FDE Marketing",
    meta: "Lisbon · Marketing Agency",
    tagline: "For brands who'd rather build than figure it out alone.",
    why: "As her own following grew, so did the requests to help other brands do the same. FDE Marketing became the answer for founders who don't have the time — or patience — to piece together content, ads, and brand from scratch.",
    what: "A Lisbon-based agency handling the full stack of a brand's public presence, from the first post to the paid campaign behind it.",
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
];
