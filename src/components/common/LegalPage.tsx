import type { ReactNode } from 'react';
import { Container } from '../common/Container';

interface LegalSectionProps {
  title: string;
  children: ReactNode;
}

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section className="mt-10 md:mt-12">
      <h2 className="font-display text-h3 text-ink">{title}</h2>
      <div className="mt-3 max-w-prose space-y-3 text-[15px] leading-relaxed text-muted [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2 [&_strong]:font-semibold [&_strong]:text-ink">
        {children}
      </div>
    </section>
  );
}

interface LegalPageProps {
  title: string;
  updated: string;
  intro: ReactNode;
  children: ReactNode;
}

/** Shared branded layout so the legal pages feel part of the product, not an afterthought. */
export function LegalPage({ title, updated, intro, children }: LegalPageProps) {
  return (
    <>
      <div className="border-b border-line bg-white">
        <Container narrow className="pb-12 pt-12 md:pb-16 md:pt-14">
          <p className="eyebrow text-brand-dark">Legal</p>
          <h1 className="mt-3 font-display text-h1 text-ink">{title}</h1>
          <p className="mt-3 text-sm text-muted">{updated}</p>
        </Container>
      </div>
      <Container narrow className="py-16 md:py-20 xl:py-24">
        <div className="rounded-card border border-brand/25 bg-brand-light p-4 text-sm leading-relaxed text-brand-dark">
          {intro}
        </div>
        {children}
      </Container>
    </>
  );
}
