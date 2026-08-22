import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostDetail from "@/components/journal/PostDetail";
import { getJournalPost, journalPosts } from "@/lib/journal-posts";

export function generateStaticParams() {
  return journalPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: PageProps<"/journal/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getJournalPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — My Journal`,
    description: post.excerpt,
  };
}

export default async function JournalPostPage(
  props: PageProps<"/journal/[slug]">
) {
  const { slug } = await props.params;
  const post = getJournalPost(slug);
  if (!post) notFound();

  const more = journalPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return <PostDetail post={post} more={more} />;
}
