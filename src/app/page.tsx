import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Stats from "@/components/Stats";
import Teaser from "@/components/Teaser";

export const metadata: Metadata = {
  title: "Shomaila Niazi — Self-Taught. Self-Made.",
  description:
    "Two degrees traded for a laptop and a leap of faith. The personal brand hub of Shomaila Niazi — self-taught digital entrepreneur reaching hundreds of thousands across Instagram, YouTube, and TikTok.",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Story />
      <Stats />
      <Teaser />
    </main>
  );
}
