import { useEffect, useRef } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

interface FormStatusProps {
  status: 'idle' | 'success' | 'error';
  message?: string;
  /** Move focus to the region when it appears (used for confirmed success). */
  focusOnMount?: boolean;
}

/** Submission feedback region announced politely to screen readers. */
export function FormStatus({ status, message, focusOnMount = false }: FormStatusProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status !== 'idle' && focusOnMount) ref.current?.focus({ preventScroll: true });
  }, [status, focusOnMount]);

  if (status === 'idle' || !message) return null;

  const success = status === 'success';
  return (
    <div
      ref={ref}
      tabIndex={-1}
      role={success ? 'status' : 'alert'}
      aria-live={success ? 'polite' : undefined}
      className={cn(
        'flex items-start gap-3 rounded-card border px-4 py-3 text-sm outline-none',
        success ? 'border-success/30 bg-success/10 text-[#047857]' : 'border-danger/30 bg-danger/5 text-danger',
      )}
    >
      {success ? (
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      ) : (
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      )}
      <p>{message}</p>
    </div>
  );
}
