import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, HeartHandshake, School } from 'lucide-react';
import '../../styles/sections.css';

/**
 * Intended-audience cards — one tinted card per audience, whole card is the link.
 */
const audiences = [
  {
    title: 'For students',
    icon: GraduationCap,
    tone: 'sun',
    description:
      'Hints, explanations and projected visual guidance on the worksheet you are already working on.',
    cta: { label: 'See how it works', to: '/#planned-experience' },
  },
  {
    title: 'For parents',
    icon: HeartHandshake,
    tone: 'peach',
    description:
      'Planned learning insights and privacy controls — with editions that never send the page out of the room.',
    cta: { label: 'Follow development', to: '/journey' },
  },
  {
    title: 'For schools',
    icon: School,
    tone: 'pine',
    description:
      'An offline-capable learning device for classrooms, libraries and shared study spaces.',
    cta: { label: 'Pilot interest', to: '/schools' },
  },
];

export function AudienceSection() {
  return (
    <section id="audience" className="au" aria-labelledby="audience-heading">
      <div className="au-inner">
        <div className="au-head">
          <p className="sec-eyebrow">Who it is for</p>
          <h2 id="audience-heading" className="au-h2">
            Built for the whole homework table.
          </h2>
        </div>
        <ul className="au-grid">
          {audiences.map(({ title, icon: Icon, tone, description, cta }) => (
            <li key={title} className="au-card rise" data-tone={tone}>
              <span className="au-ico" aria-hidden="true">
                <Icon className="h-6 w-6" />
              </span>
              <h3>{title}</h3>
              <p>{description}</p>
              <Link to={cta.to} className="au-link">
                {cta.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                <span className="au-stretch" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
