import type { Metadata } from "next";
import EditIndex from "@/components/edit/EditIndex";

export const metadata: Metadata = {
  title: "My Studio — Shomaila Niazi",
  description:
    "Brands I've partnered with and content I've created — organized by niche.",
};

export default function MyStudioPage() {
  return <EditIndex />;
}
