import type { Metadata } from "next";
import JournalIndex from "@/components/journal/JournalIndex";
import { journalPosts } from "@/lib/journal-posts";

export const metadata: Metadata = {
  title: "My Journal — Shomaila Niazi",
  description:
    "Lessons, reflections, and the unfiltered process behind building platforms from nothing.",
};

export default function JournalPage() {
  return <JournalIndex posts={journalPosts} />;
}
