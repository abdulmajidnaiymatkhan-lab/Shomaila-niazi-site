// The live site serves from www (the bare domain 308-redirects there), so every
// absolute URL — sitemap, robots, canonical, Open Graph — must use www too.
// Google Search Console's property is https://www.shomailaniazi.com/ and it
// rejects sitemap entries outside that exact prefix.
export const SITE_URL = "https://www.shomailaniazi.com";
