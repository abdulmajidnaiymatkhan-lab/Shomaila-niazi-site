export type ConnectReel = {
  id: string;
  shortcode: string;
  thumbnail: { src: string; width: number; height: number };
};

// Real Instagram reels for the Connect page's "day-to-day" marquee.
// Thumbnails were fetched automatically (see scripts/fetch-ig-thumbnail.sh)
// by reading the reel page's og:image meta tag and downloading it —
// no login or API key needed. Re-run that script if a reel needs a
// refreshed cover.
export const connectReels: ConnectReel[] = [
  { id: "reel-1", shortcode: "Ddl-4Kzt-i9", thumbnail: { src: "/images/connect/reel-connect-1.jpg", width: 361, height: 640 } },
  { id: "reel-2", shortcode: "Dctcy9JtaOa", thumbnail: { src: "/images/connect/reel-connect-2.jpg", width: 360, height: 640 } },
  { id: "reel-3", shortcode: "DcjgbnfNpeS", thumbnail: { src: "/images/connect/reel-connect-3.jpg", width: 360, height: 640 } },
  { id: "reel-4", shortcode: "DX_9pm3t0CY", thumbnail: { src: "/images/connect/reel-connect-4.jpg", width: 360, height: 640 } },
  { id: "reel-5", shortcode: "DX9gxieN-kL", thumbnail: { src: "/images/connect/reel-connect-5.jpg", width: 361, height: 640 } },
  { id: "reel-6", shortcode: "DX4cuY4tkiq", thumbnail: { src: "/images/connect/reel-connect-6.jpg", width: 361, height: 640 } },
  { id: "reel-7", shortcode: "DXttW8NjZsa", thumbnail: { src: "/images/connect/reel-connect-7.jpg", width: 360, height: 640 } },
  { id: "reel-8", shortcode: "DXPLBPttqJ4", thumbnail: { src: "/images/connect/reel-connect-8.jpg", width: 360, height: 640 } },
];
