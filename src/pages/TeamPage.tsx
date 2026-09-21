import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, GraduationCap, Languages, ShieldCheck, WifiOff } from 'lucide-react';
import { Button } from '../components/common/Button';
import { PageHeader } from '../components/common/PageHeader';
import { Section } from '../components/common/Section';
import { Seo } from '../components/common/Seo';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  academicContext,
  memberContributionLine,
  teamMembers,
  teamValues,
  workAreas,
  workAreasNote,
} from '../data/team';
import { cn } from '../utils/cn';

const valueIcons: Record<string, typeof BookOpen> = {
  'learning-first': BookOpen,
  'offline-accessibility': WifiOff,
  'bilingual-inclusion': Languages,
  'responsible-ai': ShieldCheck,
};

const academicItems = [
  { label: 'University', value: academicContext.university },
  { label: 'Campus', value: academicContext.campus },
  { label: 'Degree', value: academicContext.degree },
  { label: 'Project type', value: academicContext.projectType },
  { label: 'Team size', value: academicContext.teamSize },
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

      {/* 1. Hero — text only, no image, no empty visual column */}
      <PageHeader
        label="About DeskScholar"
        title="Meet the team building DeskScholar."
        description="We are a four-member Computer Engineering team developing DeskScholar as a product-focused final-year project. Our work explores offline AI, voice interaction, worksheet understanding and projected step-by-step learning."
      >
        <StatusBadge tone="dark" dot pulse>
          Four-member final-year project team
        </StatusBadge>
      </PageHeader>

      {/* 2. Team members — four text cards */}
      <Section ariaLabel="Team members">
        <ul className="grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {teamMembers.map((member, index) => (
            <motion.li
              key={member.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (index % 4) * 0.06, ease: 'easeOut' }}
              className="flex h-full flex-col rounded-panel border border-line bg-white p-6 shadow-soft"
            >
              <h2 className="font-display text-lg font-bold leading-snug text-ink">{member.name}</h2>
              <p className="mt-2 text-sm font-semibold text-brand-dark">{member.label}</p>
              <p className="mt-3 text-[13px] leading-relaxed text-muted">{memberContributionLine}</p>
            </motion.li>
          ))}
        </ul>
      </Section>

      {/* 3. Project origin */}
      <Section tone="white" labelledBy="origin-heading" ariaLabel="Project origin">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
          <h2 id="origin-heading" className="font-display text-h2 text-ink">
            From a final-year project to a product vision.
          </h2>
          <div className="max-w-prose">
            <p className="text-[15px] leading-relaxed text-muted">
              DeskScholar began as an educational AI concept and evolved into an offline-first desk
              learning companion. The team is exploring how local AI, voice, vision and physical
              projection can make learning more focused, accessible and understandable.
            </p>
            <ul className="mt-5 space-y-2.5">
              {originFacts.map((fact) => (
                <li key={fact} className="flex items-start gap-3 text-sm text-ink">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 4. Academic context — text grid, no logo */}
      <Section labelledBy="academic-heading">
        <div className="mx-auto max-w-4xl">
          <h2 id="academic-heading" className="text-center font-display text-h2 text-ink">
            Academic context
          </h2>
          <ul className="mx-auto mt-10 flex list-none max-w-4xl flex-wrap justify-center gap-3">
            {academicItems.map((item) => (
              <li
                key={item.label}
                className="w-full sm:w-[calc(50%-0.375rem)] lg:w-[calc(33.333%-0.5rem)]"
              >
                <div className="flex h-full items-start gap-3 rounded-card border border-line bg-white px-5 py-4 shadow-soft">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand-dark">
                    <GraduationCap className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted">{item.label}</p>
                    <p className="mt-0.5 text-sm font-semibold text-ink">{item.value}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 5. Collective work areas */}
      <Section tone="white" labelledBy="work-areas-heading">
        <div className="mx-auto max-w-4xl">
          <h2 id="work-areas-heading" className="text-center font-display text-h2 text-ink">
            Collective work areas
          </h2>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {workAreas.map((area, index) => (
              <li
                key={area}
                className={cn(
                  'flex items-center gap-3 rounded-card border border-line bg-ivory px-5 py-4',
                  // Odd final item: centred in the incomplete row at exactly one column's width.
                  index === workAreas.length - 1 &&
                    workAreas.length % 2 === 1 &&
                    'sm:col-span-2 sm:w-[calc(50%-0.375rem)] sm:justify-self-center',
                )}
              >
                <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-aqua-dark" aria-hidden="true" />
                <span className="text-sm font-semibold text-ink">{area}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-[13px] leading-relaxed text-muted">{workAreasNote}</p>
        </div>
      </Section>

      {/* 6. Values — icons and typography only */}
      <Section labelledBy="values-heading">
        <div className="mx-auto max-w-5xl">
          <h2 id="values-heading" className="text-center font-display text-h2 text-ink">
            Mission and values
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {teamValues.map((value, index) => {
              const Icon = valueIcons[value.id] ?? BookOpen;
              return (
                <motion.li
                  key={value.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (index % 4) * 0.06, ease: 'easeOut' }}
                  className="flex h-full flex-col rounded-panel border border-line bg-white p-6 shadow-soft"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-card bg-brand-light text-brand-dark">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-[15px] font-bold text-ink sm:text-base">{value.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted sm:text-sm">{value.description}</p>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </Section>

      {/* 7. Final CTA — no image */}
      <Section ariaLabel="Collaboration call to action">
        <div className="rounded-hero bg-midnight p-8 text-center dark-section md:p-12">
          <h2 className="font-display text-h2 text-white">
            Interested in collaborating with the DeskScholar team?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            We welcome conversations about education, research, hardware, product, and early-stage support.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" variant="dark" to="/contact">
              Contact the Team
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              size="lg"
              to="/journey"
              className="border border-dark-line bg-deep-navy text-white hover:bg-deep-navy hover:text-brand-light focus-visible:ring-aqua focus-visible:ring-offset-midnight"
            >
              Follow Our Journey
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
