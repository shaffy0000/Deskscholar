import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Container } from './Container';
import { SectionHeading } from './SectionHeading';

type SectionTone = 'dark' | 'light' | 'default' | 'white' | 'midnight';

interface SectionProps {
  id?: string;
  labelledBy?: string;
  ariaLabel?: string;
  tone?: SectionTone;
  anchor?: boolean | string;
  narrow?: boolean;
  wide?: boolean;
  bordered?: boolean;
  compact?: boolean;
  heading?: {
    title: ReactNode;
    label?: string;
    description?: ReactNode;
    align?: 'left' | 'center';
    dark?: boolean;
    as?: 'h1' | 'h2' | 'h3';
  };
  contentClassName?: string;
  containerClassName?: string;
  className?: string;
  children: ReactNode;
}

/** Map legacy tone names to the new system */
function resolveTone(tone: SectionTone): 'dark' | 'light' {
  if (tone === 'midnight' || tone === 'dark') return 'dark';
  if (tone === 'white' || tone === 'light' || tone === 'default') return 'light';
  return 'dark';
}

export function Section({
  id,
  labelledBy,
  ariaLabel,
  tone = 'dark',
  anchor,
  narrow,
  wide,
  bordered,
  compact,
  heading,
  contentClassName,
  containerClassName,
  className,
  children,
}: SectionProps) {
  const resolved = resolveTone(tone);
  const isDark = resolved === 'dark';

  const anchorId = typeof anchor === 'string' ? anchor : undefined;

  return (
    <section
      id={id || anchorId}
      aria-labelledby={labelledBy}
      aria-label={ariaLabel}
      className={cn(
        compact
          ? 'py-10 md:py-12'
          : 'py-[72px] lg:py-[120px]',
        isDark
          ? 'bg-ink-900 text-text-hi'
          : 'bg-paper text-ink-hi light-section',
        bordered &&
          (isDark
            ? 'border-t border-[rgba(255,255,255,0.07)]'
            : 'border-t border-[rgba(0,0,0,0.08)]'),
        anchor && 'scroll-mt-20',
        className,
      )}
    >
      <Container narrow={narrow} wide={wide} className={containerClassName}>
        {heading && (
          <SectionHeading
            tone={resolved}
            title={heading.title}
            description={heading.description}
            align={heading.align}
            as={heading.as}
            className="mb-12 lg:mb-16"
          />
        )}
        {heading ? (
          <div className={contentClassName}>{children}</div>
        ) : (
          children
        )}
      </Container>
    </section>
  );
}
