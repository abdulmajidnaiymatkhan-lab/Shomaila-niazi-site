import type { Metadata } from "next";
import StoryIndex from "@/components/story/StoryIndex";

export const metadata: Metadata = {
  title: "My Story — Shomaila Niazi",
  description:
    "The false starts, the pivot, and the years of building alone — Shomaila Niazi's founder journey from two unfinished degrees to platforms reaching hundreds of thousands.",
};

export default function StoryPage() {
  return <StoryIndex />;
}
