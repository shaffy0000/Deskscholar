import { useState } from 'react';
import { useForm, type Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Loader2, Send } from 'lucide-react';
import { ApiRequestError } from '../../api/client';
import {
  accessRoleOptions,
  earlyAccessSchema,
  submitEarlyAccess,
  type EarlyAccessFormValues,
} from '../../api/earlyAccess';
import type { FormSubmitState } from '../../types';
import { FormField, HoneypotField } from '../common/FormField';
import { inputClasses } from '../../utils/inputClasses';
import { FormStatus } from '../common/FormStatus';

export function EarlyAccessForm() {
  const [submitState, setSubmitState] = useState<FormSubmitState>({ status: 'idle' });

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<EarlyAccessFormValues>({
    resolver: zodResolver(earlyAccessSchema),
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      email: '',
      role: '' as EarlyAccessFormValues['role'],
      country: '',
      message: '',
      consent: false as unknown as true,
      website: '',
    },
  });

  const mutation = useMutation({
    mutationFn: submitEarlyAccess,
    onSuccess: () => {
        setSubmitState({
          status: 'success',
          message:
            'Thank you for joining DeskScholar early access. We have received your registration and will keep you informed about prototype progress and future testing opportunities.',
        });
        reset();
      },
    onError: (error) => {
      if (error instanceof ApiRequestError) {
        for (const [field, message] of Object.entries(error.fieldErrors)) {
          setError(field as Path<EarlyAccessFormValues>, { message });
        }
      }
      setSubmitState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong. Please try again later.',
      });
    },
  });

  const busy = mutation.isPending;
  const describedBy = (id: string) =>
    errors[id as keyof typeof errors] ? `${id}-error` : undefined;

  return (
    <form
      onSubmit={handleSubmit((values) => {
        setSubmitState({ status: 'idle' });
        mutation.mutate(values);
      })}
      noValidate
      className="flex flex-col gap-5"
      aria-labelledby="early-access-heading"
    >
      <h2 id="early-access-heading" className="font-display text-h3 text-ink">
        Join Early Access
      </h2>
      <p className="-mt-2 text-sm text-muted">
        Register your interest to follow prototype progress and future testing opportunities.
      </p>

      <FormStatus
        status={submitState.status}
        message={submitState.status === 'idle' ? undefined : submitState.message}
        focusOnMount={submitState.status === 'success'}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Full name" htmlFor="ea-fullName" required error={errors.fullName?.message}>
          <input
            id="ea-fullName"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={describedBy('ea-fullName')}
            className={inputClasses(Boolean(errors.fullName))}
            {...register('fullName')}
          />
        </FormField>
        <FormField label="Email" htmlFor="ea-email" required error={errors.email?.message}>
          <input
            id="ea-email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy('ea-email')}
            className={inputClasses(Boolean(errors.email))}
            {...register('email')}
          />
        </FormField>
        <FormField label="Role" htmlFor="ea-role" required error={errors.role?.message}>
          <select
            id="ea-role"
            aria-invalid={Boolean(errors.role)}
            aria-describedby={describedBy('ea-role')}
            className={`${inputClasses(Boolean(errors.role))} select-field`}
            {...register('role')}
          >
            <option value="">Select your role…</option>
            {accessRoleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Country (optional)" htmlFor="ea-country" error={errors.country?.message}>
          <input
            id="ea-country"
            type="text"
            autoComplete="country-name"
            aria-invalid={Boolean(errors.country)}
            aria-describedby={describedBy('ea-country')}
            className={inputClasses(Boolean(errors.country))}
            {...register('country')}
          />
        </FormField>
      </div>

      <FormField
        label="Message (optional)"
        htmlFor="ea-message"
        error={errors.message?.message}
        hint="Tell us what you would like to see in DeskScholar."
      >
        <textarea
          id="ea-message"
          rows={4}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'ea-message-error' : 'ea-message-hint'}
          className={inputClasses(Boolean(errors.message))}
          {...register('message')}
        />
      </FormField>

      <div>
        <label htmlFor="ea-consent" className="flex items-start gap-3 text-sm text-muted">
          <input
            id="ea-consent"
            type="checkbox"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={describedBy('ea-consent')}
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-line accent-brand"
            {...register('consent')}
          />
          <span>
            I agree that the DeskScholar team may contact me about early access and prototype updates.
            <span className="ml-0.5 text-danger" aria-hidden="true">*</span>
          </span>
        </label>
        {errors.consent && (
          <p id="ea-consent-error" role="alert" className="mt-1.5 text-xs font-medium text-danger">
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
              Submitting…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              Join Early Access
            </>
          )}
        </button>
        <p className="mt-3 text-xs text-muted">
          Submissions are delivered through Formspree and used only to manage early-access interest.
          Nothing is stored in a database by this website. See our{' '}
          <Link to="/privacy" className="font-semibold text-brand-dark underline underline-offset-4">Privacy Policy</Link>.
        </p>
      </div>
    </form>
  );
}
