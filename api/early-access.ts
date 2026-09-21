import { randomUUID } from 'node:crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isEmailDeliveryEnabled, sendFormEmail } from './_lib/email';
import { emailDeliveryError, toSafeError } from './_lib/errors';
import { readFormRequest } from './_lib/request';
import { sendError, sendSuccess } from './_lib/response';
import { earlyAccessSchema, parseOrThrow } from './_lib/validation';

const ROLE_LABELS: Record<string, string> = {
  STUDENT: 'Student',
  PARENT: 'Parent',
  TEACHER: 'Teacher',
  SCHOOL: 'School representative',
  RESEARCHER: 'Researcher',
  INVESTOR_PARTNER: 'Investor or partner',
  OTHER: 'Other',
};

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  try {
    const body = readFormRequest(req);
    const input = parseOrThrow(earlyAccessSchema, body);
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
        subject: `Early access request — ${ROLE_LABELS[input.role] ?? 'Unknown role'}`,
        replyTo: input.email,
        fields: [
          ['Name', input.fullName],
          ['Email', input.email],
          ['Role', ROLE_LABELS[input.role] ?? input.role],
          ['Country', input.country],
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
