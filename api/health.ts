import type { VercelRequest, VercelResponse } from '@vercel/node';
import { emailDeliveryConfigured } from './_lib/email';
import { ApiError, toSafeError } from './_lib/errors';
import { sendError, sendJson } from './_lib/response';

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  try {
    if (req.method !== 'GET') {
      throw new ApiError(405, 'Method not allowed. Use GET.');
    }

    sendJson(res, 200, {
      success: true,
      status: 'UP',
      service: 'deskscholar-api',
      emailDeliveryConfigured: emailDeliveryConfigured(),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    sendError(res, toSafeError(error));
  }
}
