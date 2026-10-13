import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type BadgeTone = 'dark' | 'light' | 'aqua' | 'violet' | 'planned' | 'neutral' | 'success' | 'warning' | 'sun';

interface StatusBadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  /** Show a small status dot. Accepts both 'dot' and 'showDot' for compatibility. */
  dot?: boolean;
  showDot?: boolean;
  pulse?: boolean;
  className?: string;
}

export function StatusBadge({
  children,
  tone = 'dark',
  dot = false,
  showDot = false,
  pulse = false,
  className,
}: StatusBadgeProps) {
  const hasDot = dot || showDot;

  const palette: Record<BadgeTone, string> = {
    dark: 'border-[var(--hairline-strong)] bg-[var(--ink-800)] text-text-hi',
    light: 'border-[var(--hairline-strong)] bg-[var(--ink-800)] text-ink-hi',
    neutral: 'border-[var(--hairline-strong)] bg-[var(--surface-2)] text-text-lo',
    planned: 'border-[rgba(23,107,91,0.2)] bg-[rgba(23,107,91,0.08)] text-[#176B5B]',
    aqua: 'border-[rgba(23,107,91,0.2)] bg-[rgba(23,107,91,0.08)] text-[#176B5B]',
    success: 'border-[rgba(5,150,105,0.25)] bg-[rgba(5,150,105,0.1)] text-[#047857]',
    violet: 'border-[rgba(217,119,6,0.28)] bg-[rgba(242,181,68,0.18)] text-[#92400E]',
    warning: 'border-[rgba(217,119,6,0.28)] bg-[rgba(242,181,68,0.18)] text-[#92400E]',
    sun: 'border-[rgba(217,119,6,0.28)] bg-[rgba(242,181,68,0.18)] text-[#92400E]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1 text-[12.5px] font-semibold',
        palette[tone],
        className,
      )}
    >
      {hasDot && (
        <span
          className={cn('h-1.5 w-1.5 shrink-0 rounded-full bg-current', pulse && 'animate-pulse')}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
