import type { Metadata } from "next";
import { contactEmail } from "@/lib/social-links";

export const metadata: Metadata = {
  title: "Terms — Shomaila Niazi",
  description: "The terms for using shomailaniazi.com.",
};

export default function Terms() {
  return (
    <main className="w-full bg-cream px-6 pb-28 pt-36 text-ink sm:px-10 sm:pt-40 lg:px-16">
      <div className="mx-auto max-w-2xl">
        <p className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-ink/50">
          Terms
        </p>
        <h1 className="mt-4 font-serif text-4xl font-medium leading-[1.15] sm:text-5xl">
          The short version.
        </h1>
        <p className="mt-4 font-sans text-sm text-ink/50">
          Last updated September 2, 2026
        </p>

        <div className="mt-12 space-y-10 font-sans text-base leading-relaxed text-ink/80">
          <p>
            This site (shomailaniazi.com) is a personal brand hub for
            Shomaila Niazi. By using it, you agree to the terms below. They&apos;re
            kept short and plain on purpose — this is a content and
            storytelling site, not a store or a service platform.
          </p>

          <section>
            <h2 className="font-serif text-2xl font-medium text-ink">
              Content
            </h2>
            <p className="mt-3">
              All writing, photos, and content on this site belong to
              Shomaila Niazi unless stated otherwise. You&apos;re welcome to
              share links to this site, but please don&apos;t reproduce or
              republish content from it without permission.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-medium text-ink">
              No professional advice
            </h2>
            <p className="mt-3">
              Anything shared here — the story, the journal, the venture
              descriptions — reflects personal experience and opinion. It
              isn&apos;t financial, business, or professional advice, and
              nothing on this site should be treated as a guarantee of any
              outcome.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-medium text-ink">
              Third-party links
            </h2>
            <p className="mt-3">
              This site links out to Instagram, YouTube, TikTok, and other
              ventures. We aren&apos;t responsible for the content or privacy
              practices of those external sites once you leave
              shomailaniazi.com.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-medium text-ink">
              Contact form
            </h2>
            <p className="mt-3">
              The Connect page&apos;s contact form is provided for genuine
              inquiries. Please don&apos;t use it to send spam, unsolicited
              advertising, or abusive messages.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-medium text-ink">
              Changes
            </h2>
            <p className="mt-3">
              These terms may be updated as the site evolves. Continuing to
              use the site after a change means you accept the updated
              terms.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-medium text-ink">
              Questions
            </h2>
            <p className="mt-3">
              Reach out at{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="font-semibold text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:text-charcoal"
              >
                {contactEmail}
              </a>{" "}
              with any questions about these terms.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
