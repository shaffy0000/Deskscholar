import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/common/Section';

/**
 * Compact intended-audience content — three rule-separated columns, not boxed cards.
 */
const audiences = [
  {
    title: 'For students',
    description:
      'Hints, explanations and projected visual guidance on the worksheet you are already working on.',
    cta: { label: 'See the planned experience', to: '/#planned-experience' },
  },
  {
    title: 'For parents',
    description:
      'Planned learning insights and privacy controls — with editions that never send the page out of the room.',
    cta: { label: 'Follow development', to: '/journey' },
  },
  {
    title: 'For schools',
    description:
      'An offline-capable learning device vision for classrooms, libraries and shared study spaces.',
    cta: { label: 'For Schools', to: '/schools' },
  },
];

export function AudienceSection() {
  return (
    <Section
      id="audience"
      tone="dark"
      bordered
      heading={{ title: 'Who it is for' }}
    >
      <div className="grid grid-cols-1 gap-0 md:grid-cols-3">
        {audiences.map((audience, i) => (
          <div
            key={audience.title}
            className={`flex flex-col items-start py-5 md:px-7 md:py-1 ${
              i > 0 ? 'border-t border-[var(--hairline-dark)] md:border-t-0 md:border-l' : ''
            }`}
          >
            <h3 className="font-display text-[18px] leading-tight text-text-hi">
              {audience.title}
            </h3>
            <p className="mt-2 max-w-[38ch] text-sm leading-relaxed text-text-lo">
              {audience.description}
            </p>
            <Link
              to={audience.cta.to}
              className="mt-4 inline-flex min-h-9 items-center gap-1.5 rounded-control text-sm font-semibold text-beam transition-colors duration-micro ease-io hover:text-[var(--beam-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-beam"
            >
              {audience.cta.label}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        ))}
      </div>
    </Section>
  );
}
