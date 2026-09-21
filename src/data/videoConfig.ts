/**
 * Centralized Cloudflare Stream demo-video configuration.
 *
 * The only source is the VITE_DEMO_VIDEO_EMBED_URL environment variable
 * (.env / Vercel env). Nothing secret is involved — the embed URL/UID is
 * public by design. Never put Cloudflare API tokens here.
 *
 * Supported formats:
 *   https://iframe.videodelivery.net/<video-uid>
 *   https://<customer-subdomain>.cloudflarestream.com/<video-uid>/iframe
 */

const VIDEO_DELIVERY_HOST = 'iframe.videodelivery.net';
const CUSTOMER_STREAM_HOST = /^[a-z0-9-]+\.cloudflarestream\.com$/;
const UID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9_-]{4,}$/;

export interface DemoVideoEmbed {
  ready: boolean;
  /** Sanitized player URL with playback params, or null when unconfigured. */
  playerSrc: string | null;
  /** Non-technical reason for visitors (never exposes config details). */
  reason: 'ok' | 'missing' | 'invalid';
}

/** Validates strictly and rebuilds a clean URL — query strings from config are dropped intentionally. */
export function parseDemoVideoEmbed(raw: string | undefined): DemoVideoEmbed {
  const value = (raw ?? '').trim();
  if (!value) return { ready: false, playerSrc: null, reason: 'missing' };

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return { ready: false, playerSrc: null, reason: 'invalid' };
  }
  if (url.protocol !== 'https:') return { ready: false, playerSrc: null, reason: 'invalid' };

  const hostOk = url.hostname === VIDEO_DELIVERY_HOST || CUSTOMER_STREAM_HOST.test(url.hostname);
  if (!hostOk) return { ready: false, playerSrc: null, reason: 'invalid' };

  const segments = url.pathname.split('/').filter(Boolean);
  const uid = segments[0];
  if (!uid || !UID_PATTERN.test(uid)) return { ready: false, playerSrc: null, reason: 'invalid' };
  if (segments.length > 2 || (segments.length === 2 && segments[1] !== 'iframe')) {
    return { ready: false, playerSrc: null, reason: 'invalid' };
  }

  // Rebuild from validated pieces only. Video is landscape 16:9; autoplay is only ever
  // requested after a deliberate user click (Cloudflare honours autoplay=1 with user gesture).
  const clean = `${url.origin}/${segments.join('/')}`;
  return { ready: true, playerSrc: `${clean}${clean.includes('?') ? '&' : '?'}autoplay=1`, reason: 'ok' };
}

/** Read live (tests and Vercel builds can change env before render). */
export function getDemoVideoEmbed(): DemoVideoEmbed {
  return parseDemoVideoEmbed(import.meta.env.VITE_DEMO_VIDEO_EMBED_URL as string | undefined);
}

let warned = false;
/** One clear dev-mode warning only. Silent in production; visitors see a friendly message. */
export function warnOnceVideoNotConfigured(): void {
  if (import.meta.env.DEV && !warned) {
    warned = true;
    console.warn('Cloudflare Stream demo URL has not been configured.');
  }
}

/** Test hook only. */
export function __resetVideoConfigWarnings(): void {
  warned = false;
}
