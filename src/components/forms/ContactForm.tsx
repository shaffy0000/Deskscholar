import { useState } from 'react';
import { useForm, type Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Loader2, Send } from 'lucide-react';
import { ApiRequestError } from '../../api/client';
import { contactSchema, submitContact, type ContactFormValues } from '../../api/contact';
import type { FormSubmitState } from '../../types';
import { FormField, HoneypotField } from '../common/FormField';
import { inputClasses } from '../../utils/inputClasses';
import { FormStatus } from '../common/FormStatus';

export function ContactForm() {
  const [submitState, setSubmitState] = useState<FormSubmitState>({ status: 'idle' });

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      email: '',
      organization: '',
      subject: '',
      message: '',
      consent: false as unknown as true,
      website: '',
    },
  });

  const mutation = useMutation({
    mutationFn: submitContact,
    onSuccess: () => {
        setSubmitState({
          status: 'success',
          message:
            'Thank you for contacting DeskScholar. Your message has been received and the team will respond when possible.',
        });
        reset();
      },
    onError: (error) => {
      if (error instanceof ApiRequestError) {
        for (const [field, message] of Object.entries(error.fieldErrors)) {
          setError(field as Path<ContactFormValues>, { message });
        }
      }
      setSubmitState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong. Please try again later.',
      });
    },
  });

  const busy = mutation.isPending;
  const describedBy = (id: keyof ContactFormValues) => (errors[id] ? `${id}-error` : undefined);

  return (
    <form
      onSubmit={handleSubmit((values) => {
        setSubmitState({ status: 'idle' });
        mutation.mutate(values);
      })}
      noValidate
      className="flex flex-col gap-5"
      aria-labelledby="contact-heading"
    >
      <h2 id="contact-heading" className="font-display text-h3 text-ink">
        Contact the Team
      </h2>
      <p className="-mt-2 text-sm text-muted">
        For education, research, hardware, product, and investment collaboration enquiries.
      </p>

      <FormStatus
        status={submitState.status}
        message={submitState.status === 'idle' ? undefined : submitState.message}
        focusOnMount={submitState.status === 'success'}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Full name" htmlFor="fullName" required error={errors.fullName?.message}>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={describedBy('fullName')}
            className={inputClasses(Boolean(errors.fullName))}
            {...register('fullName')}
          />
        </FormField>
        <FormField label="Email" htmlFor="email" required error={errors.email?.message}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy('email')}
            className={inputClasses(Boolean(errors.email))}
            {...register('email')}
          />
        </FormField>
        <FormField label="Organization (optional)" htmlFor="organization" error={errors.organization?.message}>
          <input
            id="organization"
            type="text"
            autoComplete="organization"
            aria-invalid={Boolean(errors.organization)}
            aria-describedby={describedBy('organization')}
            className={inputClasses(Boolean(errors.organization))}
            {...register('organization')}
          />
        </FormField>
        <FormField label="Subject" htmlFor="subject" required error={errors.subject?.message}>
          <input
            id="subject"
            type="text"
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={describedBy('subject')}
            className={inputClasses(Boolean(errors.subject))}
            {...register('subject')}
          />
        </FormField>
      </div>

      <FormField label="Message" htmlFor="message" required error={errors.message?.message}>
        <textarea
          id="message"
          rows={5}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy('message')}
          className={inputClasses(Boolean(errors.message))}
          {...register('message')}
        />
      </FormField>

      <div>
        <label htmlFor="contact-consent" className="flex items-start gap-3 text-sm text-muted">
          <input
            id="contact-consent"
            type="checkbox"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? 'consent-error' : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-line accent-brand"
            {...register('consent')}
          />
          <span>
            I agree that the DeskScholar team may use this information to respond to my enquiry.
            <span className="ml-0.5 text-danger" aria-hidden="true">*</span>
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" role="alert" className="mt-1.5 text-xs font-medium text-danger">
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
              Send Message
            </>
          )}
        </button>
        <p className="mt-3 text-xs text-muted">
          Submissions are delivered through Formspree and used only to respond to your enquiry.
          Nothing is stored in a database by this website. See our{' '}
          <Link to="/privacy" className="font-semibold text-brand-dark underline underline-offset-4">Privacy Policy</Link>.
        </p>
      </div>
    </form>
  );
}
