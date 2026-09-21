import { cn } from '../../utils/cn';

export type BadgeTone = 'aqua' | 'violet' | 'planned' | 'neutral' | 'dark' | 'success' | 'warning' | 'sun';

interface StatusBadgeProps {
  children: React.ReactNode;
  tone?: BadgeTone;
  /** Show a small status dot before the label. */
  dot?: boolean;
  pulse?: boolean;
  className?: string;
}

const tones: Record<BadgeTone, string> = {
  // Offline / local / privacy / scanning indicators
  aqua: 'bg-aqua-light text-aqua-dark border-aqua/40',
  // Brand states, active states, primary info
  violet: 'bg-brand-light text-brand-dark border-brand/30',
  // "Planned" capability badges: light violet with violet text
  planned: 'bg-brand-light text-brand-dark border-brand/30',
  // Neutral information (e.g. "Measurement planned")
  neutral: 'bg-ivory text-muted border-line',
  // Badges inside dark sections
  dark: 'bg-deep-navy text-slate-200 border-dark-line',
  // Learning-moment / hint accents (warm apricot)
  sun: 'bg-sun-light text-sun-dark border-sun/40',
  success: 'bg-success/10 text-[#047857] border-success/30',
  warning: 'bg-warning/10 text-warning border-warning/30',
};

const dots: Record<BadgeTone, string> = {
  aqua: 'bg-aqua',
  violet: 'bg-brand',
  planned: 'bg-brand',
  neutral: 'bg-muted',
  dark: 'bg-aqua',
  sun: 'bg-sun-dark',
  success: 'bg-success',
  warning: 'bg-warning',
};

export function StatusBadge({ children, tone = 'neutral', dot = false, pulse = false, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold',
        tones[tone],
        className,
      )}
    >
      {dot && (
        <span
          aria-hidden="true"
          className={cn('h-1.5 w-1.5 rounded-full', dots[tone], pulse && 'animate-pulse-dot')}
        />
      )}
      {children}
    </span>
  );
}
