export const SITE_NAME = 'DeskScholar';

/**
 * PRODUCTION SITE URL — single source of truth for canonicals, Open Graph,
 * Twitter and JSON-LD URLs.
 *
 * Set `VITE_SITE_URL` in Vercel (Settings → Environment Variables) to your real
 * production domain, e.g. https://www.your-domain.com — it is baked in at build
 * time and also used by scripts/prerender.mjs for raw HTML meta, robots.txt and
 * sitemap.xml. The fallback only appears in local dev output.
 */
export const SITE_URL = import.meta.env.VITE_SITE_URL?.trim() || 'https://deskscholar.example.com';

export const SITE_TAGLINE = 'Your AI tutor, built into your desk.';

export const DEFAULT_OG_IMAGE = '/assets/deskscholar/og-deskscholar.webp';

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
