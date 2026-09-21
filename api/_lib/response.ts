import type { VercelResponse } from '@vercel/node';
import type { ApiError } from './errors';

export interface SuccessPayload {
  success: true;
  deliveryStatus: 'SENT' | 'DISABLED';
  message: string;
  referenceId: string;
}

export function sendSuccess(res: VercelResponse, payload: SuccessPayload): void {
  res.status(200).json(payload);
}

export function sendError(res: VercelResponse, error: ApiError): void {
  const body: Record<string, unknown> = {
    success: false,
    message: error.message,
    timestamp: new Date().toISOString(),
  };
  if (error.fieldErrors) {
    body.errors = error.fieldErrors;
  }
  res.status(error.statusCode).json(body);
}

export function sendJson(res: VercelResponse, statusCode: number, body: unknown): void {
  res.status(statusCode).json(body);
}
