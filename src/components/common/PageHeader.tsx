import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Container } from './Container';
import { StatusBadge } from './StatusBadge';

interface PageHeaderProps {
  label: string;
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
}

/** Standard hero header for interior pages — one shared treatment across routes. */
export function PageHeader({ label, title, description, children }: PageHeaderProps) {
  return (
    <header className="dark-section relative overflow-hidden bg-midnight pb-16 pt-12 sm:pt-14 md:pb-20">
      <div className="projection-grid-dark pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full bg-brand/15 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="max-w-3xl py-4"
        >
          <StatusBadge tone="dark" dot>
            {label}
          </StatusBadge>
          <h1 className="mt-5 font-display text-h1 text-white">{title}</h1>
          <p className="mt-4 max-w-prose text-lead text-slate-300">{description}</p>
          {children && <div className="mt-7 flex flex-wrap gap-3">{children}</div>}
        </motion.div>
      </Container>
    </header>
  );
}
