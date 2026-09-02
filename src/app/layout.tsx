import type { Metadata } from "next";
import { Outfit, Cormorant_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { createHash } from "crypto";
import { readFileSync } from "fs";
import path from "path";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const defaultTitle = "Shomaila Niazi";
const defaultDescription =
  "Self-taught digital entrepreneur and founder — building platforms, brands, and community from nothing.";

// The OG image is served from public/ as a plain static file (not Next's
// opengraph-image.* file convention) on purpose: that convention routes
// through a dynamic handler that streams the response with
// Transfer-Encoding: chunked and no Content-Length header. WhatsApp's
// link-preview crawler silently drops images served that way — it wants
// a known content length before it will render one. A static file under
// public/ gets served with a real Content-Length, which fixes it.
//
// The URL also carries a hash of the file's own bytes, computed once at
// build time. Link-preview crawlers (WhatsApp, Slack, iMessage, ...)
// cache a preview per URL, not per content — overwriting this file in
// place with new bytes but the same URL left WhatsApp showing the old
// image indefinitely. Baking the content hash into the URL means any
// future swap of this file automatically gets a new URL too, so it's
// always treated as unseen instead of relying on a manually-remembered
// cache-busting query param.
const ogImageHash = createHash("md5")
  .update(readFileSync(path.join(process.cwd(), "public/og-image.jpg")))
  .digest("hex")
  .slice(0, 8);

const ogImage = {
  url: `${SITE_URL}/og-image.jpg?v=${ogImageHash}`,
  width: 1200,
  height: 630,
  alt: "Shomaila Niazi",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: defaultTitle,
  description: defaultDescription,
  openGraph: {
    url: SITE_URL,
    siteName: "Shomaila Niazi",
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    images: [ogImage.url],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${cormorant.variable} antialiased`}
    >
      <body>
        <Nav />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
