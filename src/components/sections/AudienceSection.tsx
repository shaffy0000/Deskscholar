import React from 'react';
import { Section } from '@/components/common/Section';
import { Link } from 'react-router-dom';

const audiences = [
  { title: 'For Students', description: 'Understand difficult concepts through hints, explanations, and projected visual guidance.', cta: { label: 'Student Experience', to: '/#how-it-works' } },
  { title: 'For Parents', description: 'Planned learning insights and privacy controls without making core learning cloud-dependent.', cta: { label: 'Follow Development', to: '/journey' } },
  { title: 'For Schools', description: 'An offline-capable learning device vision for classrooms, libraries, and shared study spaces.', cta: { label: 'For Schools', to: '/schools' } },
];

export const AudienceSection: React.FC = () => {
  return (
    <Section
      id="audience"
      tone="light"
      className="light-section bg-paper"
      heading={{
        title: 'Who it is for',
        align: 'center'
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {audiences.map((audience, i) => (
          <div key={i} className="bg-paper-2 border border-[rgba(0,0,0,0.08)] rounded-[10px] p-8 flex flex-col items-start">
            <h3 className="font-display text-[22px] leading-tight text-ink-hi mb-3">{audience.title}</h3>
            <p className="text-sm text-ink-lo mb-6 flex-grow">{audience.description}</p>
            <Link 
              to={audience.cta.to}
              className="text-sm font-medium text-ink-hi hover:text-beam transition-colors duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] px-4 py-2 border border-[rgba(0,0,0,0.08)] rounded-[4px] hover:border-beam focus:outline-none focus:ring-2 focus:ring-beam focus:border-transparent"
            >
              {audience.cta.label}
            </Link>
          </div>
        ))}
      </div>
    </Section>
  );
};
