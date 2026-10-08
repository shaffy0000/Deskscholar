/**
 * Centralized Cloudflare Stream demo-video configuration.
 *
 * The player uses the HLS manifest directly (native on Safari, hls.js elsewhere)
 * so playback-speed controls are available. Sources are validated centrally and
 * normalised to a manifest URL. Nothing secret is involved — the video UID and
 * URLs are public by design. Never put Cloudflare API tokens here.
 *
 * `VITE_DEMO_VIDEO_EMBED_URL` (optional override) accepts:
 *   https://iframe.videodelivery.net/<video-uid>
 *   https://videodelivery.net/<video-uid>/manifest/video.m3u8
 *   https://<customer-subdomain>.cloudflarestream.com/<video-uid>/iframe
 *   https://<customer-subdomain>.cloudflarestream.com/<video-uid>/manifest/video.m3u8
 * When unset, the approved demo video below is used.
 */

/** Approved demo video — public Cloudflare Stream asset. */
const DEFAULT_DEMO_VIDEO_SRC =
  'https://customer-uakyqo7kkg4i219y.cloudflarestream.com/f35d73e258aa20a6d046bf25f551802d/manifest/video.m3u8';

const CUSTOMER_STREAM_HOST = /^[a-z0-9-]+\.cloudflarestream\.com$/;
const UID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9_-]{4,}$/;

export interface DemoVideoEmbed {
  ready: boolean;
  /** Sanitized HLS manifest URL, or null when the source is invalid. */
  playerSrc: string | null;
  /** Non-technical reason (never exposes config details). */
  reason: 'ok' | 'missing' | 'invalid';
}

function manifestFor(origin: string, uid: string): string {
  return `${origin}/${uid}/manifest/video.m3u8`;
}

/** Validates strictly and rebuilds a clean manifest URL — query strings are dropped intentionally. */
export function parseDemoVideoEmbed(raw: string | undefined): DemoVideoEmbed {
  const value = (raw ?? '').trim() || DEFAULT_DEMO_VIDEO_SRC;

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return { ready: false, playerSrc: null, reason: 'invalid' };
  }
  if (url.protocol !== 'https:') return { ready: false, playerSrc: null, reason: 'invalid' };

  const segments = url.pathname.split('/').filter(Boolean);

  // .../<uid>/manifest/video.m3u8 — already a manifest URL
  if (
    segments.length === 3 &&
    segments[1] === 'manifest' &&
    segments[2] === 'video.m3u8' &&
    UID_PATTERN.test(segments[0])
  ) {
    const hostOk = url.hostname === 'videodelivery.net' || CUSTOMER_STREAM_HOST.test(url.hostname);
    if (!hostOk) return { ready: false, playerSrc: null, reason: 'invalid' };
    return { ready: true, playerSrc: manifestFor(url.origin, segments[0]), reason: 'ok' };
  }

  // https://iframe.videodelivery.net/<uid> → https://videodelivery.net/<uid>/manifest/video.m3u8
  if (url.hostname === 'iframe.videodelivery.net' && segments.length === 1 && UID_PATTERN.test(segments[0])) {
    return { ready: true, playerSrc: manifestFor('https://videodelivery.net', segments[0]), reason: 'ok' };
  }

  // https://<sub>.cloudflarestream.com/<uid>/iframe → same origin manifest
  if (
    CUSTOMER_STREAM_HOST.test(url.hostname) &&
    segments.length === 2 &&
    segments[1] === 'iframe' &&
    UID_PATTERN.test(segments[0])
  ) {
    return { ready: true, playerSrc: manifestFor(url.origin, segments[0]), reason: 'ok' };
  }

  return { ready: false, playerSrc: null, reason: 'invalid' };
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
