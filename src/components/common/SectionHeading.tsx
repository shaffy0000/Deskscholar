import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface SectionHeadingProps {
  title: ReactNode;
  label?: string;
  description?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
  dark?: boolean;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}

export function SectionHeading({
  title,
  label: _label,
  description,
  align = 'left',
  tone,
  dark,
  as: Component = 'h2',
  className,
}: SectionHeadingProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // Resolve dark vs light — support both 'tone' and legacy 'dark' prop
  const isDark = tone === 'dark' || dark === true;
  const shouldReduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-[var(--gap-head-intro)] max-w-[68ch]',
        align === 'center' ? 'mx-auto items-center text-center' : 'items-start text-left',
        !shouldReduceMotion && !inView
          ? 'opacity-0 translate-y-[14px]'
          : 'opacity-100 translate-y-0',
        !shouldReduceMotion &&
          'transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
        className,
      )}
    >
      <Component
        className={cn(
          'font-display text-h2 font-bold leading-tight',
          isDark ? 'text-text-hi' : 'text-ink-hi',
        )}
      >
        {title}
      </Component>

      {description && (
        <p
          className={cn(
            'text-body-lg leading-relaxed',
            isDark ? 'text-text-lo' : 'text-ink-lo',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
