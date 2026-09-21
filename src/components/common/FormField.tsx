import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

/** Label + control + inline error wiring (aria-describedby / aria-invalid are set by inputs). */
export function FormField({ label, htmlFor, error, hint, required, children, className }: FormFieldProps) {
  return (
    <div className={['flex flex-col gap-1.5', className].filter(Boolean).join(' ')}>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-ink">
        {label}
        {required && (
          <span className="ml-0.5 text-danger" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {hint && !error && (
        <p id={`${htmlFor}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="text-xs font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

/** Visually hidden honeypot field used for spam protection. */
export function HoneypotField<T extends FieldValues>({ register }: { register: UseFormRegister<T> }) {
  return (
    <div className="sr-only" aria-hidden="true">
      <label htmlFor="website">Website</label>
      <input
        id="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        {...register('website' as Path<T>)}
      />
    </div>
  );
}
