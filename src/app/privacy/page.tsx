import type { Metadata } from "next";
import { contactEmail } from "@/lib/social-links";

export const metadata: Metadata = {
  title: "Privacy Policy — Shomaila Niazi",
  description:
    "How shomailaniazi.com handles the information you share through this site.",
};

export default function PrivacyPolicy() {
  return (
    <main className="w-full bg-cream px-6 pb-28 pt-36 text-ink sm:px-10 sm:pt-40 lg:px-16">
      <div className="mx-auto max-w-2xl">
        <p className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-ink/50">
          Privacy Policy
        </p>
        <h1 className="mt-4 font-serif text-4xl font-medium leading-[1.15] sm:text-5xl">
          Your privacy, plainly explained.
        </h1>
        <p className="mt-4 font-sans text-sm text-ink/50">
          Last updated September 2, 2026
        </p>

        <div className="mt-12 space-y-10 font-sans text-base leading-relaxed text-ink/80">
          <p>
            This site is a personal brand hub — a place to share Shomaila
            Niazi&apos;s story and work. It doesn&apos;t sell anything or
            process payments, and it collects very little information about
            you. This page explains exactly what is collected and why.
          </p>

          <section>
            <h2 className="font-serif text-2xl font-medium text-ink">
              What we collect
            </h2>
            <p className="mt-3">
              If you use the contact form on the Connect page, we collect the
              name, email address, and message you enter. That information is
              sent directly to Shomaila&apos;s inbox by email — it isn&apos;t
              stored in a database, added to a mailing list, or shared with
              anyone else. It&apos;s used only to read and reply to your
              message.
            </p>
            <p className="mt-3">
              We also use privacy-friendly site analytics (Vercel Analytics)
              to understand overall traffic — things like which pages are
              visited and roughly how many people visit. This analytics
              service doesn&apos;t use cookies and doesn&apos;t track you
              individually across other websites.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-medium text-ink">
              What we don&apos;t do
            </h2>
            <p className="mt-3">
              We don&apos;t sell or rent your information to anyone. We
              don&apos;t run advertising trackers. We don&apos;t process
              payments or store payment details on this site.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-medium text-ink">
              Third parties
            </h2>
            <p className="mt-3">
              Contact form messages are delivered using Resend, an email
              delivery service, solely to get your message into
              Shomaila&apos;s inbox. Site traffic is measured using Vercel
              Analytics, described above.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-medium text-ink">
              Your choices
            </h2>
            <p className="mt-3">
              If you&apos;d like a message you sent removed or have any
              question about how your information is handled, email{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="font-semibold text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:text-charcoal"
              >
                {contactEmail}
              </a>{" "}
              directly.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-medium text-ink">
              Changes to this policy
            </h2>
            <p className="mt-3">
              If this policy changes as the site grows, this page will be
              updated and the date above will reflect the most recent
              revision.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
