import { z } from 'zod';
import { isHoneypotFilled, submitToFormspree } from './formspree';

export const contactSchema = z.object({
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
  organization: z.string().trim().max(200, 'Organization must be 200 characters or fewer.').optional(),
  subject: z
    .string()
    .trim()
    .min(1, 'Please enter a subject.')
    .max(200, 'Subject must be 200 characters or fewer.'),
  message: z
    .string()
    .trim()
    .min(1, 'Please enter a message.')
    .max(3000, 'Message must be 3000 characters or fewer.'),
  consent: z.literal(true, { errorMap: () => ({ message: 'Consent is required to continue.' }) }),
  website: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export async function submitContact(values: ContactFormValues): Promise<void> {
  // Silently drop bot submissions caught by the honeypot.
  if (isHoneypotFilled(values.website)) return;
  await submitToFormspree({
    formType: 'DeskScholar Contact',
    _subject: 'New Message from the DeskScholar Website',
    fullName: values.fullName.trim(),
    email: values.email.trim().toLowerCase(),
    organization: values.organization?.trim() ?? '',
    subject: values.subject.trim(),
    message: values.message.trim(),
    consent: 'Yes',
    submittedAt: new Date().toISOString(),
    pageUrl: window.location.href,
  });
}
