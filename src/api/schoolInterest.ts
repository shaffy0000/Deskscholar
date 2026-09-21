import { z } from 'zod';
import type { ApiSuccessResponse } from '../types';
import { postForm } from './client';

export const schoolInterestSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, 'Please enter your full name.')
    .max(150, 'Name must be 150 characters or fewer.'),
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your work email address.')
    .email('Please enter a valid email address.')
    .max(254, 'Please enter a valid email address.'),
  organization: z
    .string()
    .trim()
    .min(1, 'Please enter your school or organization.')
    .max(200, 'Organization must be 200 characters or fewer.'),
  role: z
    .string()
    .trim()
    .min(1, 'Please enter your role.')
    .max(120, 'Role must be 120 characters or fewer.'),
  country: z.string().trim().max(100, 'Country must be 100 characters or fewer.').optional(),
  studentCount: z.string().trim().max(60, 'Please keep this under 60 characters.').optional(),
  intendedUse: z
    .string()
    .trim()
    .min(1, 'Please describe how you would use DeskScholar.')
    .max(2000, 'Intended use must be 2000 characters or fewer.'),
  consent: z.literal(true, { errorMap: () => ({ message: 'Consent is required to continue.' }) }),
  website: z.string().optional(),
});

export type SchoolInterestFormValues = z.infer<typeof schoolInterestSchema>;

export function submitSchoolInterest(values: SchoolInterestFormValues): Promise<ApiSuccessResponse> {
  return postForm('/api/school-interest', {
    fullName: values.fullName,
    email: values.email,
    organization: values.organization,
    role: values.role,
    country: values.country?.trim() ? values.country.trim() : null,
    studentCount: values.studentCount?.trim() ? values.studentCount.trim() : null,
    intendedUse: values.intendedUse,
    consent: values.consent,
    website: values.website ?? '',
  });
}
