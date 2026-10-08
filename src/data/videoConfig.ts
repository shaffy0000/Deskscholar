/**
 * Centralized Cloudflare Stream demo-video configuration.
 *
 * Uses the official Cloudflare Stream iframe embed, which handles playback,
 * CORS, and autoplay internally. Sources are validated centrally and
 * normalised to an iframe URL. Nothing secret is involved — the video UID
 * and URLs are public by design. Never put Cloudflare API tokens here.
 *
 * `VITE_DEMO_VIDEO_EMBED_URL` (optional override) accepts any Cloudflare
 * Stream URL containing the video UID. When unset, the approved demo video
 * below is used.
 */

/** Approved demo video UID — public Cloudflare Stream asset. */
const DEFAULT_VIDEO_UID = 'f35d73e258aa20a6d046bf25f551802d';
const DEFAULT_STREAM_HOST = 'https://customer-uakyqo7kkg4i219y.cloudflarestream.com';

const CUSTOMER_STREAM_HOST = /^[a-z0-9-]+\.cloudflarestream\.com$/;
const UID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9_-]{4,}$/;

export interface DemoVideoEmbed {
  ready: boolean;
  /** Cloudflare Stream iframe embed URL, or null when the source is invalid. */
  iframeSrc: string | null;
  /** Poster/thumbnail URL, or null. */
  posterSrc: string | null;
  /** Non-technical reason (never exposes config details). */
  reason: 'ok' | 'missing' | 'invalid';
}

function iframeFor(origin: string, uid: string): string {
  return `${origin}/${uid}/iframe?poster=${encodeURIComponent(`${origin}/${uid}/thumbnails/thumbnail.jpg?time=&height=600`)}`;
}

function posterFor(origin: string, uid: string): string {
  return `${origin}/${uid}/thumbnails/thumbnail.jpg?time=&height=600`;
}

/** Extract video UID from various Cloudflare Stream URL formats. */
export function parseDemoVideoEmbed(raw: string | undefined): DemoVideoEmbed {
  const value = (raw ?? '').trim();

  // No override — use the default approved video.
  if (!value) {
    return {
      ready: true,
      iframeSrc: iframeFor(DEFAULT_STREAM_HOST, DEFAULT_VIDEO_UID),
      posterSrc: posterFor(DEFAULT_STREAM_HOST, DEFAULT_VIDEO_UID),
      reason: 'ok',
    };
  }

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return { ready: false, iframeSrc: null, posterSrc: null, reason: 'invalid' };
  }
  if (url.protocol !== 'https:') return { ready: false, iframeSrc: null, posterSrc: null, reason: 'invalid' };

  const segments = url.pathname.split('/').filter(Boolean);

  // .../‹uid›/manifest/video.m3u8
  if (
    segments.length === 3 &&
    segments[1] === 'manifest' &&
    segments[2] === 'video.m3u8' &&
    UID_PATTERN.test(segments[0])
  ) {
    const hostOk = url.hostname === 'videodelivery.net' || CUSTOMER_STREAM_HOST.test(url.hostname);
    if (!hostOk) return { ready: false, iframeSrc: null, posterSrc: null, reason: 'invalid' };
    return { ready: true, iframeSrc: iframeFor(url.origin, segments[0]), posterSrc: posterFor(url.origin, segments[0]), reason: 'ok' };
  }

  // https://iframe.videodelivery.net/‹uid›
  if (url.hostname === 'iframe.videodelivery.net' && segments.length === 1 && UID_PATTERN.test(segments[0])) {
    return { ready: true, iframeSrc: `https://iframe.videodelivery.net/${segments[0]}`, posterSrc: null, reason: 'ok' };
  }

  // https://‹sub›.cloudflarestream.com/‹uid›/iframe or /watch
  if (
    CUSTOMER_STREAM_HOST.test(url.hostname) &&
    segments.length === 2 &&
    (segments[1] === 'iframe' || segments[1] === 'watch') &&
    UID_PATTERN.test(segments[0])
  ) {
    return { ready: true, iframeSrc: iframeFor(url.origin, segments[0]), posterSrc: posterFor(url.origin, segments[0]), reason: 'ok' };
  }

  // https://‹sub›.cloudflarestream.com/‹uid› (bare UID path)
  if (
    CUSTOMER_STREAM_HOST.test(url.hostname) &&
    segments.length === 1 &&
    UID_PATTERN.test(segments[0])
  ) {
    return { ready: true, iframeSrc: iframeFor(url.origin, segments[0]), posterSrc: posterFor(url.origin, segments[0]), reason: 'ok' };
  }

  return { ready: false, iframeSrc: null, posterSrc: null, reason: 'invalid' };
}

/** Read live (tests and Vercel builds can change env before render). */
export function getDemoVideoEmbed(): DemoVideoEmbed {
  const envUrl = import.meta.env.MODE === 'test' ? (import.meta.env.VITE_DEMO_VIDEO_EMBED_URL as string | undefined) : undefined;
  return parseDemoVideoEmbed(envUrl);
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
