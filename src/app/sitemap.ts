import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { journalPosts } from "@/lib/journal-posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/story",
    "/journal",
    "/ventures",
    "/my-studio",
    "/connect",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const journalRoutes = journalPosts.map((post) => ({
    url: `${SITE_URL}/journal/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...staticRoutes, ...journalRoutes];
}
