import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Building2,
  Code2,
  Cpu,
  FlaskConical,
  GraduationCap,
  Languages,
  MapPin,
  Mic,
  Projector,
  ScanText,
  ShieldCheck,
  Users,
  WifiOff,
  BrainCircuit,
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Section } from '../components/common/Section';
import { Seo } from '../components/common/Seo';
import {
  academicContext,
  memberContributionLine,
  teamMembers,
  teamValues,
  workAreas,
  workAreasNote,
} from '../data/team';
import '../styles/team.css';

const valueIcons: Record<string, typeof BookOpen> = {
  'learning-first': BookOpen,
  'offline-accessibility': WifiOff,
  'bilingual-inclusion': Languages,
  'responsible-ai': ShieldCheck,
};
const valueTones = ['sun', 'pine', 'lilac', 'peach'] as const;

/** Icons for the collective work areas, matched by position in data/team.ts. */
const workAreaIcons = [BrainCircuit, Cpu, ScanText, Mic, Projector, Code2, FlaskConical];

const memberTones = ['pine', 'sun', 'peach', 'lilac'] as const;

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

const academicItems = [
  { icon: Building2, label: 'University', value: academicContext.university },
  { icon: MapPin, label: 'Campus', value: academicContext.campus },
  { icon: GraduationCap, label: 'Degree', value: academicContext.degree },
  { icon: FlaskConical, label: 'Project type', value: academicContext.projectType },
  { icon: Users, label: 'Team size', value: academicContext.teamSize },
];

const originFacts = [
  'DeskScholar is a Computer Engineering final-year project.',
  'It is currently in prototype development.',
  'Features and hardware may change during testing.',
  'The team is evaluating technical feasibility and educational usefulness.',
];

export default function TeamPage() {
  return (
    <>
      <Seo route="team" />

      <PageHeader
        label="About DeskScholar"
        title="Meet the team building DeskScholar."
        description="We are a four-member Computer Engineering team developing DeskScholar as a product-focused final-year project — exploring offline AI, voice, worksheet understanding and projected step-by-step learning."
        visual={
          <div className="tm-hero" aria-hidden="true">
            <div className="tm-stack">
              {teamMembers.map((m, i) => (
                <span key={m.name} className="tm-bubble" data-tone={memberTones[i % 4]}>
                  {initials(m.name)}
                </span>
              ))}
            </div>
            <p className="tm-hero-line">
              <GraduationCap className="h-4 w-4" />
              {academicContext.degree} · {academicContext.university.split(' ')[0]}
            </p>
          </div>
        }
      />

      {/* Team members */}
      <Section ariaLabel="Team members">
        <ul className="tm-grid">
          {teamMembers.map((member, i) => (
            <li key={member.name} className="tm-card rise" data-tone={memberTones[i % 4]}>
              <div className="tm-card-top" aria-hidden="true">
                <span className="tm-avatar">{initials(member.name)}</span>
              </div>
              <div className="tm-card-body">
                <h2 className="tm-name">{member.name}</h2>
                <p className="tm-role">{member.label}</p>
                <p className="tm-line">{memberContributionLine}</p>
                <p className="tm-tag">
                  <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
                  {academicContext.degree}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* Project origin + academic context */}
      <Section tone="white" labelledBy="origin-heading">
        <div className="tm-origin">
          <div>
            <p className="sec-eyebrow">Project origin</p>
            <h2 id="origin-heading" className="tm-h2">
              From a final-year project to a product vision.
            </h2>
            <p className="tm-lede">
              DeskScholar began as an educational AI concept and evolved into an offline-first desk
              learning companion. The team is exploring how local AI, voice, vision and physical
              projection can make learning more focused, accessible and understandable.
            </p>
            <ul className="tm-facts">
              {originFacts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          </div>

          <div className="tm-idcard" aria-labelledby="academic-heading">
            <div className="tm-idcard-head">
              <span className="tile" aria-hidden="true">
                <GraduationCap className="h-5 w-5" />
              </span>
              <h2 id="academic-heading">Academic context</h2>
            </div>
            <dl>
              {academicItems.map(({ icon: Icon, label, value }) => (
                <div key={label} className="tm-id-row">
                  <dt>
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {label}
                  </dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* Collective work areas */}
      <Section
        labelledBy="work-areas-heading"
        heading={{
          label: 'What we work on',
          title: <span id="work-areas-heading">Collective work areas</span>,
          description: workAreasNote,
          align: 'center',
        }}
      >
        <ul className="tm-areas">
          {workAreas.map((area, i) => {
            const Icon = workAreaIcons[i] ?? FlaskConical;
            return (
              <li key={area} className="lift">
                <span className="tile" data-tone={valueTones[i % 4]} aria-hidden="true">
                  <Icon className="h-5 w-5" />
                </span>
                {area}
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Values */}
      <Section
        tone="midnight"
        labelledBy="values-heading"
        heading={{
          label: 'What we believe',
          title: <span id="values-heading">Mission and values</span>,
          align: 'center',
        }}
      >
        <ul className="tm-values">
          {teamValues.map((value) => {
            const Icon = valueIcons[value.id] ?? BookOpen;
            return (
              <li key={value.id} className="rise">
                <span className="tile" aria-hidden="true">
                  <Icon className="h-5 w-5" />
                </span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* CTA */}
      <Section ariaLabel="Collaboration call to action">
        <div className="pcta">
          <h2>Interested in collaborating with the DeskScholar team?</h2>
          <p>
            We welcome conversations about education, research, hardware, product, and early-stage
            support.
          </p>
          <div className="pcta-actions">
            <Link to="/contact" className="pcta-primary">
              Contact the Team
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/journey" className="pcta-secondary">
              Follow Our Journey
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
