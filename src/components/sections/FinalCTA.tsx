import { Link } from 'react-router-dom';
import { Section } from '@/components/common/Section';

/**
 * The single development-waitlist CTA closing the home page.
 * Compact — no stacked paddings, no oversized headline.
 */
export function FinalCTA() {
  return (
    <Section id="final-cta" tone="light" bordered>
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <h2 className="font-display text-h2 font-bold text-ink-hi">
          The future of learning doesn&rsquo;t need another screen.
        </h2>
        <p className="mt-[var(--gap-head-intro)] max-w-xl text-body-lg leading-relaxed text-ink-lo">
          Follow DeskScholar as we build an offline-first AI tutor for real desks, real classrooms,
          and real students. Three editions — one idea.
        </p>
        <div className="mt-[var(--gap-intro-body)] flex flex-col items-center gap-4 sm:flex-row">
          <Link
            to="/contact"
            className="inline-flex h-12 items-center justify-center rounded-control bg-beam px-7 text-[15px] font-semibold text-white transition-colors duration-micro ease-io hover:bg-[var(--beam-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-beam"
          >
            Join the waitlist
          </Link>
          <Link
            to="/editions"
            className="inline-flex h-12 items-center justify-center rounded-control border border-[rgba(0,0,0,0.14)] px-7 text-[15px] font-semibold text-ink-hi transition-colors duration-micro ease-io hover:border-beam hover:text-beam focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-beam"
          >
            Explore editions
          </Link>
        </div>
        <p className="mt-[var(--gap-related)] text-[12.5px] text-ink-lo">
          Currently in prototype development.
        </p>
      </div>
    </Section>
  );
}
