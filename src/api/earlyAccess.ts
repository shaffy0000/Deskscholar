import { z } from 'zod';
import type { AccessRole } from '../types';
import { isHoneypotFilled, submitToFormspree } from './formspree';

export const accessRoleOptions: Array<{ value: AccessRole; label: string }> = [
  { value: 'STUDENT', label: 'Student' },
  { value: 'PARENT', label: 'Parent' },
  { value: 'TEACHER', label: 'Teacher' },
  { value: 'SCHOOL', label: 'School representative' },
  { value: 'RESEARCHER', label: 'Researcher' },
  { value: 'INVESTOR_PARTNER', label: 'Investor or partner' },
  { value: 'OTHER', label: 'Other' },
];

export const earlyAccessSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, 'Please enter your full name.')
    .max(150, 'Name must be 150 characters or fewer.'),
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email address.')
    .email('Please enter a valid email address.')
    .max(254, 'Please enter a valid email address.'),
  role: z.enum(
    ['STUDENT', 'PARENT', 'TEACHER', 'SCHOOL', 'RESEARCHER', 'INVESTOR_PARTNER', 'OTHER'],
    { errorMap: () => ({ message: 'Please choose the option that fits you best.' }) },
  ),
  country: z.string().trim().max(100, 'Country must be 100 characters or fewer.').optional(),
  message: z.string().trim().max(1000, 'Message must be 1000 characters or fewer.').optional(),
  consent: z.literal(true, { errorMap: () => ({ message: 'Consent is required to continue.' }) }),
  website: z.string().optional(),
});

export type EarlyAccessFormValues = z.infer<typeof earlyAccessSchema>;

export async function submitEarlyAccess(values: EarlyAccessFormValues): Promise<void> {
  // Silently drop bot submissions caught by the honeypot.
  if (isHoneypotFilled(values.website)) return;
  const roleLabel = accessRoleOptions.find((option) => option.value === values.role)?.label ?? values.role;
  await submitToFormspree({
    formType: 'DeskScholar Early Access',
    _subject: 'New DeskScholar Early Access Registration',
    fullName: values.fullName.trim(),
    email: values.email.trim().toLowerCase(),
    role: roleLabel,
    country: values.country?.trim() ?? '',
    message: values.message?.trim() ?? '',
    consent: 'Yes',
    submittedAt: new Date().toISOString(),
    pageUrl: window.location.href,
  });
}
