import type { VercelRequest } from '@vercel/node';
import { ApiError } from './errors';

const MAX_BODY_BYTES = 64 * 1024; // 64 KB — generous for the supported forms.

/**
 * Lightweight best-effort in-memory rate limiter.
 *
 * IMPORTANT: Vercel serverless instances do not share memory, so this limiter
 * is per-instance only and is NOT guaranteed across all invocations. Honeypot
 * protection and provider-level abuse controls remain the primary defenses.
 */
interface HitWindow {
  count: number;
  resetAt: number;
}

const hits = new Map<string, HitWindow>();
const MAX_HITS = 12;
const WINDOW_MS = 10 * 60 * 1000;

function rateLimit(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || entry.resetAt <= now) {
    if (hits.size >= 500) {
      for (const [k, v] of hits) {
        if (v.resetAt <= now) hits.delete(k);
      }
    }
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_HITS) return false;
  entry.count += 1;
  return true;
}

function clientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const first = Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0]?.trim();
  return first || req.socket?.remoteAddress || 'unknown';
}

/**
 * Validates the request envelope for form endpoints:
 * - POST only
 * - JSON content type
 * - Best-effort per-instance rate limiting
 * - Body size limit
 * Returns the parsed body object.
 */
export function readFormRequest(req: VercelRequest): Record<string, unknown> {
  if (req.method !== 'POST') {
    throw new ApiError(405, 'Method not allowed. Use POST.');
  }

  const contentType = String(req.headers['content-type'] ?? '');
  if (!contentType.includes('application/json')) {
    throw new ApiError(415, 'Unsupported request type. Please send JSON.');
  }

  if (!rateLimit(`${clientIp(req)}:${req.url ?? 'form'}`)) {
    throw new ApiError(429, 'Too many requests. Please try again in a few minutes.');
  }

  const body = req.body;
  if (body === undefined || body === null || typeof body !== 'object' || Array.isArray(body)) {
    throw new ApiError(400, 'Invalid request body.');
  }

  if (JSON.stringify(body).length > MAX_BODY_BYTES) {
    throw new ApiError(413, 'Request body is too large.');
  }

  return body as Record<string, unknown>;
}
