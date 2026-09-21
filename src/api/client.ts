import type { ApiErrorResponse, ApiSuccessResponse } from '../types';

export class ApiRequestError extends Error {
  readonly fieldErrors: Record<string, string>;

  constructor(message: string, fieldErrors: Record<string, string> = {}) {
    super(message);
    this.name = 'ApiRequestError';
    this.fieldErrors = fieldErrors;
  }
}

const FALLBACK_MESSAGE = 'Something went wrong. Please try again later.';

/**
 * Posts JSON to a same-origin API route (e.g. "/api/contact").
 * Never hardcodes hosts — Vercel serves the frontend and the API from one origin.
 */
export async function postForm(path: string, body: unknown): Promise<ApiSuccessResponse> {
  let response: Response;
  try {
    response = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    throw new ApiRequestError('We could not reach the server. Please check your connection and try again.');
  }

  let data: ApiSuccessResponse | ApiErrorResponse | null = null;
  try {
    data = (await response.json()) as ApiSuccessResponse | ApiErrorResponse;
  } catch {
    data = null;
  }

  if (!response.ok || !data || data.success !== true) {
    const apiError = data && data.success === false ? data : null;
    throw new ApiRequestError(apiError?.message ?? FALLBACK_MESSAGE, apiError?.errors ?? {});
  }

  return data;
}

export async function getHealth() {
  const response = await fetch('/api/health');
  if (!response.ok) throw new ApiRequestError(FALLBACK_MESSAGE);
  return (await response.json()) as { success: boolean; status: string };
}
