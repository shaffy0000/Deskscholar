import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface SectionHeadingProps {
  label?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

/** One shared heading treatment so every section shares the same rhythm. */
export function SectionHeading({
  label,
  title,
  description,
  align = 'center',
  dark = false,
  className,
  as: Heading = 'h2',
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={cn(
        'max-w-content',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className,
      )}
    >
      {label && (
        <p className={cn('eyebrow mb-3 sm:mb-4', dark ? 'text-brand-light' : 'text-brand-dark')}>{label}</p>
      )}
      <Heading className={cn('text-h2', dark ? 'text-white' : 'text-ink')}>{title}</Heading>
      {description && (
        <p className={cn('mt-4 sm:mt-5 text-lead', dark ? 'text-slate-300' : 'text-muted')}>{description}</p>
      )}
    </motion.div>
  );
}
