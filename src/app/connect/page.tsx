import type { Metadata } from "next";
import ConnectIndex from "@/components/connect/ConnectIndex";

export const metadata: Metadata = {
  title: "Connect — Shomaila Niazi",
  description:
    "Follow the day-to-day, watch the full story on video, or send Shomaila Niazi a message directly.",
};

export default function ConnectPage() {
  return <ConnectIndex />;
}
