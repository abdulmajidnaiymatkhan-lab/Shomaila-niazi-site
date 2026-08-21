import type { Metadata } from "next";
import VenturesIndex from "@/components/ventures/VenturesIndex";

export const metadata: Metadata = {
  title: "Her Ventures — Shomaila Niazi",
  description:
    "Fulltime Digital Entrepreneur and FDE Marketing — the education platform and the agency Shomaila Niazi has built.",
};

export default function VenturesPage() {
  return <VenturesIndex />;
}
