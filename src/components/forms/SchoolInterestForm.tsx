import { useState } from 'react';
import { useForm, type Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Loader2, Send } from 'lucide-react';
import { ApiRequestError } from '../../api/client';
import {
  schoolInterestSchema,
  submitSchoolInterest,
  type SchoolInterestFormValues,
} from '../../api/schoolInterest';
import type { FormSubmitState } from '../../types';
import { FormField, HoneypotField } from '../common/FormField';
import { inputClasses } from '../../utils/inputClasses';
import { FormStatus } from '../common/FormStatus';

export function SchoolInterestForm() {
  const [submitState, setSubmitState] = useState<FormSubmitState>({ status: 'idle' });

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<SchoolInterestFormValues>({
    resolver: zodResolver(schoolInterestSchema),
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      email: '',
      organization: '',
      role: '',
      country: '',
      studentCount: '',
      intendedUse: '',
      consent: false as unknown as true,
      website: '',
    },
  });

  const mutation = useMutation({
    mutationFn: submitSchoolInterest,
    onSuccess: (data) => {
      setSubmitState({
        status: 'success',
        message:
          data.deliveryStatus === 'DISABLED'
            ? data.message
            : 'Thank you for your interest in DeskScholar. Your message has been sent to the team.',
      });
      reset();
    },
    onError: (error) => {
      if (error instanceof ApiRequestError) {
        for (const [field, message] of Object.entries(error.fieldErrors)) {
          setError(field as Path<SchoolInterestFormValues>, { message });
        }
      }
      setSubmitState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong. Please try again later.',
      });
    },
  });

  const busy = mutation.isPending;

  return (
    <form
      onSubmit={handleSubmit((values) => {
        setSubmitState({ status: 'idle' });
        mutation.mutate(values);
      })}
      noValidate
      className="flex flex-col gap-5"
      aria-labelledby="school-interest-heading"
    >
      <h2 id="school-interest-heading" className="font-display text-h3 text-ink">
        Register pilot interest
      </h2>
      <p className="-mt-2 text-sm text-muted">
        Tell us about your school or organization. No deployment commitments — this only registers interest
        in future prototype testing.
      </p>

      <FormStatus status={submitState.status} message={submitState.status === 'idle' ? undefined : submitState.message} />

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Full name" htmlFor="si-fullName" required error={errors.fullName?.message}>
          <input
            id="si-fullName"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? 'si-fullName-error' : undefined}
            className={inputClasses(Boolean(errors.fullName))}
            {...register('fullName')}
          />
        </FormField>
        <FormField label="Work email" htmlFor="si-email" required error={errors.email?.message}>
          <input
            id="si-email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'si-email-error' : undefined}
            className={inputClasses(Boolean(errors.email))}
            {...register('email')}
          />
        </FormField>
        <FormField label="School or organization" htmlFor="si-organization" required error={errors.organization?.message}>
          <input
            id="si-organization"
            type="text"
            autoComplete="organization"
            aria-invalid={Boolean(errors.organization)}
            aria-describedby={errors.organization ? 'si-organization-error' : undefined}
            className={inputClasses(Boolean(errors.organization))}
            {...register('organization')}
          />
        </FormField>
        <FormField label="Role" htmlFor="si-role" required error={errors.role?.message} hint="e.g. Principal, ICT teacher, Librarian">
          <input
            id="si-role"
            type="text"
            aria-invalid={Boolean(errors.role)}
            aria-describedby={errors.role ? 'si-role-error' : 'si-role-hint'}
            className={inputClasses(Boolean(errors.role))}
            {...register('role')}
          />
        </FormField>
        <FormField label="Country (optional)" htmlFor="si-country" error={errors.country?.message}>
          <input
            id="si-country"
            type="text"
            autoComplete="country-name"
            aria-invalid={Boolean(errors.country)}
            aria-describedby={errors.country ? 'si-country-error' : undefined}
            className={inputClasses(Boolean(errors.country))}
            {...register('country')}
          />
        </FormField>
        <FormField label="Approximate student count (optional)" htmlFor="si-studentCount" error={errors.studentCount?.message}>
          <input
            id="si-studentCount"
            type="text"
            inputMode="numeric"
            placeholder="e.g. 300–800"
            aria-invalid={Boolean(errors.studentCount)}
            aria-describedby={errors.studentCount ? 'si-studentCount-error' : undefined}
            className={inputClasses(Boolean(errors.studentCount))}
            {...register('studentCount')}
          />
        </FormField>
      </div>

      <FormField label="Intended use" htmlFor="si-intendedUse" required error={errors.intendedUse?.message} hint="Classrooms, library stations, labs, revision sessions…">
        <textarea
          id="si-intendedUse"
          rows={4}
          aria-invalid={Boolean(errors.intendedUse)}
          aria-describedby={errors.intendedUse ? 'si-intendedUse-error' : 'si-intendedUse-hint'}
          className={inputClasses(Boolean(errors.intendedUse))}
          {...register('intendedUse')}
        />
      </FormField>

      <div>
        <label htmlFor="si-consent" className="flex items-start gap-3 text-sm text-muted">
          <input
            id="si-consent"
            type="checkbox"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? 'si-consent-error' : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-line accent-brand"
            {...register('consent')}
          />
          <span>
            I agree that the DeskScholar team may contact me about pilot testing opportunities.
            <span className="ml-0.5 text-danger" aria-hidden="true">*</span>
          </span>
        </label>
        {errors.consent && (
          <p id="si-consent-error" role="alert" className="mt-1.5 text-xs font-medium text-danger">
            {errors.consent.message}
          </p>
        )}
      </div>

      <HoneypotField register={register} />

      <div>
        <button
          type="submit"
          disabled={busy}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand px-7 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {busy ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              Submit Pilot Interest
            </>
          )}
        </button>
        <p className="mt-3 text-xs text-muted">
          Submissions may be forwarded to the project team by email. Nothing is stored in a database by this
          website.
        </p>
      </div>
    </form>
  );
}
