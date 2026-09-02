import Link from "next/link";
import { socialLinks, contactEmail } from "@/lib/social-links";

const socials = [socialLinks.instagram, socialLinks.youtube, socialLinks.tiktok];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-charcoal px-6 py-14 text-cream sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link href="/" className="font-serif text-xl font-medium text-cream">
            Shomaila Niazi
          </Link>
          <p className="mt-2 max-w-xs font-sans text-sm leading-relaxed text-cream/60">
            Self-taught. Self-made. Building platforms, brands, and community
            from nothing.
          </p>
          <a
            href={`mailto:${contactEmail}`}
            className="mt-4 inline-block font-sans text-sm text-cream/70 transition-colors hover:text-cream"
          >
            {contactEmail}
          </a>
        </div>

        <div className="flex flex-col gap-8 sm:items-end">
          <div className="flex flex-wrap gap-x-6 gap-y-2 sm:justify-end">
            {socials.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm font-semibold uppercase tracking-[0.15em] text-cream/70 transition-colors hover:text-cream"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 sm:justify-end">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm text-cream/60 transition-colors hover:text-cream"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <p className="mx-auto mt-12 max-w-6xl font-sans text-xs text-cream/40">
        &copy; {new Date().getFullYear()} Shomaila Niazi. All rights reserved.
      </p>
    </footer>
  );
}
