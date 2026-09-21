export class ApiError extends Error {
  readonly statusCode: number;
  readonly fieldErrors?: Record<string, string>;

  constructor(statusCode: number, message: string, fieldErrors?: Record<string, string>) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.fieldErrors = fieldErrors;
  }
}

/** Friendly, non-leaking error for email delivery failures (HTTP 503). */
export function emailDeliveryError(): ApiError {
  return new ApiError(503, 'We could not send your message right now. Please try again later.');
}

/**
 * Converts any thrown value into a safe ApiError.
 * Never leaks stack traces, environment variables, file paths, or provider details.
 */
export function toSafeError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;
  if (typeof console !== 'undefined') {
    // Log a minimal, PII-free signal for observability (no message bodies, no stacks in responses).
    console.error('[api] unhandled error:', error instanceof Error ? error.name : typeof error);
  }
  return new ApiError(500, 'Something went wrong. Please try again later.');
}
