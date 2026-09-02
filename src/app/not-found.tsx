import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found — Shomaila Niazi",
  description: "This page doesn't exist. Find your way back to the story.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-cream px-6 py-32 text-center text-ink sm:px-10">
      <div className="max-w-lg">
        <p className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-ink/50">
          404
        </p>
        <h1 className="mt-4 font-serif text-4xl font-medium leading-[1.15] sm:text-5xl">
          Lost the thread.
        </h1>
        <p className="mt-5 font-sans text-base leading-relaxed text-ink/70">
          This page doesn&apos;t exist, or it&apos;s moved. Let&apos;s get
          you back to the story.
        </p>
        <Link
          href="/"
          className="group mt-10 inline-flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-ink/80 transition-colors duration-200 hover:text-ink"
        >
          Back to Home
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-200 group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </Link>
      </div>
    </main>
  );
}
