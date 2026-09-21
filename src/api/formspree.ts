/**
 * Central Formspree submission utility — the ONLY place the endpoint is read.
 * Configure via VITE_FORMSPREE_ENDPOINT (.env.local / Vercel env). The endpoint
 * is a public form URL, not a secret; it is still managed centrally here.
 */

const GENERIC_ERROR = "We couldn’t submit your form right now. Please check your connection and try again.";

export class FormspreeError extends Error {
  constructor() {
    super(GENERIC_ERROR);
    this.name = 'FormspreeError';
  }
}

export function getFormspreeEndpoint(): string {
  return ((import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined) ?? '').trim();
}

/**
 * POSTs JSON to Formspree and never exposes raw provider responses.
 * Throws FormspreeError (friendly message only) on missing config,
 * network failure or non-OK response. Logs are status-only, no payloads.
 */
export async function submitToFormspree(payload: Record<string, unknown>): Promise<void> {
  const endpoint = getFormspreeEndpoint();
  if (!endpoint) {
    if (import.meta.env.DEV) {
      console.warn('[formspree] Submission endpoint is not configured (VITE_FORMSPREE_ENDPOINT).');
    }
    throw new FormspreeError();
  }

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch {
    if (import.meta.env.DEV) console.warn('[formspree] Network request failed.');
    throw new FormspreeError();
  }

  if (!response.ok) {
    if (import.meta.env.DEV) console.warn(`[formspree] Submission rejected with status ${response.status}.`);
    throw new FormspreeError();
  }
}

/** Silent honeypot check — returns true when a bot filled the hidden field. */
export function isHoneypotFilled(value: string | undefined): boolean {
  return Boolean(value && value.trim() !== '');
}
