import { z } from 'zod';
import { ApiError } from './errors';

export const accessRoleSchema = z.enum([
  'STUDENT',
  'PARENT',
  'TEACHER',
  'SCHOOL',
  'RESEARCHER',
  'INVESTOR_PARTNER',
  'OTHER',
]);

const honeypot = z
  .union([z.string(), z.undefined(), z.null()])
  .refine((value) => !value || String(value).trim() === '', {
    message: 'Spam detected.',
  });

const consent = z.literal(true, {
  errorMap: () => ({ message: 'Consent is required.' }),
});

const email = z
  .string({ required_error: 'Please enter a valid email address.' })
  .trim()
  .min(3, 'Please enter a valid email address.')
  .max(254, 'Please enter a valid email address.')
  .email('Please enter a valid email address.');

const fullName = z
  .string({ required_error: 'Please enter your full name.' })
  .trim()
  .min(1, 'Please enter your full name.')
  .max(150, 'Name must be 150 characters or fewer.');

export const earlyAccessSchema = z.object({
  fullName,
  email,
  role: accessRoleSchema,
  country: z.string().trim().max(100, 'Country must be 100 characters or fewer.').nullable().optional(),
  message: z.string().trim().max(1000, 'Message must be 1000 characters or fewer.').nullable().optional(),
  consent,
  website: honeypot,
});

export const contactSchema = z.object({
  fullName,
  email,
  organization: z.string().trim().max(200, 'Organization must be 200 characters or fewer.').nullable().optional(),
  subject: z
    .string({ required_error: 'Please enter a subject.' })
    .trim()
    .min(1, 'Please enter a subject.')
    .max(200, 'Subject must be 200 characters or fewer.'),
  message: z
    .string({ required_error: 'Please enter a message.' })
    .trim()
    .min(1, 'Please enter a message.')
    .max(3000, 'Message must be 3000 characters or fewer.'),
  consent,
  website: honeypot,
});

export const schoolInterestSchema = z.object({
  fullName,
  email,
  organization: z
    .string({ required_error: 'Please enter your school or organization.' })
    .trim()
    .min(1, 'Please enter your school or organization.')
    .max(200, 'Organization must be 200 characters or fewer.'),
  role: z
    .string({ required_error: 'Please enter your role.' })
    .trim()
    .min(1, 'Please enter your role.')
    .max(120, 'Role must be 120 characters or fewer.'),
  country: z.string().trim().max(100, 'Country must be 100 characters or fewer.').nullable().optional(),
  studentCount: z.string().trim().max(60, 'Student count must be 60 characters or fewer.').nullable().optional(),
  intendedUse: z
    .string({ required_error: 'Please describe the intended use.' })
    .trim()
    .min(1, 'Please describe the intended use.')
    .max(2000, 'Intended use must be 2000 characters or fewer.'),
  consent,
  website: honeypot,
});

export type EarlyAccessInput = z.infer<typeof earlyAccessSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type SchoolInterestInput = z.infer<typeof schoolInterestSchema>;

/**
 * Runs a schema and converts Zod issues into the public API error format.
 * Never exposes internal validation details beyond field-level messages.
 */
export function parseOrThrow<T>(schema: z.ZodType<T>, body: unknown): T {
  const result = schema.safeParse(normalize(body));
  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const key = String(issue.path[0] ?? 'form');
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    throw new ApiError(400, 'Validation failed.', fieldErrors);
  }
  return result.data;
}

/** Normalizes nullable/empty fields and lowercases the email. */
function normalize(body: unknown): unknown {
  if (typeof body !== 'object' || body === null) return body;
  const source = body as Record<string, unknown>;
  const out: Record<string, unknown> = { ...source };

  for (const key of ['country', 'message', 'organization', 'studentCount', 'website']) {
    if (out[key] === '') out[key] = null;
  }
  if (typeof out.email === 'string') {
    out.email = out.email.trim().toLowerCase();
  }
  if (typeof out.consent === 'string') {
    out.consent = out.consent === 'true';
  }
  return out;
}
