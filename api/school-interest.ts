import { randomUUID } from 'node:crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isEmailDeliveryEnabled, sendFormEmail } from './_lib/email';
import { emailDeliveryError, toSafeError } from './_lib/errors';
import { readFormRequest } from './_lib/request';
import { sendError, sendSuccess } from './_lib/response';
import { parseOrThrow, schoolInterestSchema } from './_lib/validation';

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  try {
    const body = readFormRequest(req);
    const input = parseOrThrow(schoolInterestSchema, body);
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
        subject: `School pilot interest — ${input.organization}`,
        replyTo: input.email,
        fields: [
          ['Name', input.fullName],
          ['Work email', input.email],
          ['School / Organization', input.organization],
          ['Role', input.role],
          ['Country', input.country],
          ['Approximate student count', input.studentCount],
          ['Intended use', input.intendedUse],
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
