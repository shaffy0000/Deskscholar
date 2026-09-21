import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, School, Users } from 'lucide-react';
import { Button } from '../common/Button';
import { Section } from '../common/Section';

const audiences = [
  {
    icon: GraduationCap,
    title: 'For Students',
    description:
      'Understand difficult concepts through hints, explanations, and projected visual guidance.',
    cta: { label: 'Student Experience', to: '/#demo' },
  },
  {
    icon: Users,
    title: 'For Parents',
    description:
      'Planned learning insights and privacy controls without making core learning cloud-dependent.',
    cta: { label: 'Follow Development', to: '/journey' },
  },
  {
    icon: School,
    title: 'For Schools',
    description:
      'An offline-capable learning device vision for classrooms, libraries, and shared study spaces.',
    cta: { label: 'For Schools', to: '/schools' },
  },
];

export function AudienceSection() {
  return (
    <Section
      tone="white"
      labelledBy="audience-heading"
      heading={{
        label: 'Who it is for',
        title: <span id="audience-heading">Designed for students, parents, teachers, and schools.</span>,
      }}
    >
      <ul className="grid gap-4 md:grid-cols-3 md:gap-5">
        {audiences.map((audience, index) => {
          const Icon = audience.icon;
          return (
            <motion.li
              key={audience.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.07, ease: 'easeOut' }}
              className="flex flex-col rounded-panel border border-line bg-ivory/60 p-6 transition-colors duration-300 hover:border-brand/40"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-card bg-brand-light text-brand-dark">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-h3 text-ink">{audience.title}</h3>
              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">{audience.description}</p>
              <div className="mt-6">
                <Button variant="secondary" to={audience.cta.to}>
                  {audience.cta.label}
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </Button>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </Section>
  );
}
