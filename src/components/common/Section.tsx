import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Container } from './Container';
import { SectionHeading } from './SectionHeading';

type SectionTone = 'default' | 'white' | 'midnight';

export interface SectionProps {
  id?: string;
  /** id of the heading element for aria-labelledby. */
  labelledBy?: string;
  ariaLabel?: string;
  /** Background treatment: transparent (ivory), white, or dark midnight. */
  tone?: SectionTone;
  /** Adds a top border for intentional light-to-light transitions. */
  bordered?: boolean;
  /** Tighter vertical rhythm for special cases (e.g. media directly under a page header). */
  compact?: boolean;
  /** Anchor sections need scroll offset so the sticky navbar never covers the heading. */
  anchor?: boolean;
  /** Use the narrower container (max-w-3xl) for forms and legal-style content. */
  narrow?: boolean;
  /** Optional heading rendered via the shared SectionHeading component. */
  heading?: ComponentProps<typeof SectionHeading>;
  /** Extra classes for the content wrapper (heading → content gap defaults to 40–48px). */
  contentClassName?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}

const tones: Record<SectionTone, string> = {
  default: '',
  white: 'border-t border-line bg-white',
  midnight: 'dark-section bg-midnight',
};

/** Standard vertical rhythm: 64px mobile · 80px tablet · 96px desktop. */
const padding = {
  normal: 'py-16 md:py-20 xl:py-24',
  compact: 'py-10 md:py-12',
};

/**
 * Shared page section enforcing the layout contract:
 * Section → Container → SectionHeading → Content.
 * Headings and content always stay in normal document flow inside the section background.
 */
export function Section({
  id,
  labelledBy,
  ariaLabel,
  tone = 'default',
  bordered = false,
  compact = false,
  anchor = false,
  narrow = false,
  heading,
  contentClassName,
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      aria-label={ariaLabel}
      className={cn(
        tones[tone],
        bordered && tone !== 'white' && 'border-t border-line',
        compact ? padding.compact : padding.normal,
        anchor && 'scroll-mt-20',
        className,
      )}
    >
      <Container narrow={narrow} className={containerClassName}>
        {heading && <SectionHeading {...heading} />}
        {heading ? (
          <div className={cn('mt-10 md:mt-12', contentClassName)}>{children}</div>
        ) : (
          children
        )}
      </Container>
    </section>
  );
}
