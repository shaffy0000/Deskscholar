import { randomUUID } from 'node:crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isEmailDeliveryEnabled, sendFormEmail } from './_lib/email';
import { emailDeliveryError, toSafeError } from './_lib/errors';
import { readFormRequest } from './_lib/request';
import { sendError, sendSuccess } from './_lib/response';
import { contactSchema, parseOrThrow } from './_lib/validation';

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  try {
    const body = readFormRequest(req);
    const input = parseOrThrow(contactSchema, body);
    const referenceId = randomUUID();

    if (!isEmailDeliveryEnabled()) {
      sendSuccess(res, {
        success: true,
        deliveryStatus: 'DISABLED',
        message: 'The form is valid, but email delivery is not configured in this environment.',
        referenceId,
      });
      return;
    }

    try {
      await sendFormEmail({
        subject: `Contact form — ${input.subject}`,
        replyTo: input.email,
        fields: [
          ['Name', input.fullName],
          ['Email', input.email],
          ['Organization', input.organization],
          ['Subject', input.subject],
          ['Message', input.message],
        ],
      });
    } catch {
      sendError(res, emailDeliveryError());
      return;
    }

    sendSuccess(res, {
      success: true,
      deliveryStatus: 'SENT',
      message: 'Your message has been sent.',
      referenceId,
    });
  } catch (error) {
    sendError(res, toSafeError(error));
  }
}
