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

  // Map all legacy tones to dark/light styling
  const isDark = tone === 'dark' || tone === 'aqua' || tone === 'violet' || tone === 'planned' || tone === 'neutral';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-control border px-2.5 py-1 text-micro font-medium',
        isDark
          ? 'border-[rgba(255,255,255,0.07)] text-text-lo'
          : 'border-[rgba(0,0,0,0.08)] text-ink-lo',
        className,
      )}
    >
      {hasDot && (
        <span
          className={cn(
            'h-1.5 w-1.5 rounded-full shrink-0',
            isDark ? 'bg-text-lo' : 'bg-ink-lo',
            pulse && 'animate-pulse',
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
