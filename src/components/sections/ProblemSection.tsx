import { motion } from 'framer-motion';
import { CloudOff, SmartphoneNfc, Zap } from 'lucide-react';
import { Section } from '../common/Section';

const problems = [
  {
    number: '01',
    icon: Zap,
    title: 'Answers without understanding',
    description:
      'Generic AI tools can generate answers quickly, but they do not always teach the reasoning needed for the next problem.',
  },
  {
    number: '02',
    icon: SmartphoneNfc,
    title: 'The study-to-scroll trap',
    description:
      'Opening a phone for one question can turn into notifications, social media, and lost concentration.',
  },
  {
    number: '03',
    icon: CloudOff,
    title: 'Learning stops when Wi-Fi stops',
    description:
      'Cloud-only learning tools can become unreliable when connectivity is slow, expensive, or unavailable.',
  },
];

export function ProblemSection() {
  return (
    <Section
      tone="white"
      labelledBy="problem-heading"
      heading={{
        label: 'The learning problem',
        title: (
          <span id="problem-heading">
            Students don’t need another screen. They need a better way to understand.
          </span>
        ),
        description:
          'Most digital learning tools move students away from their books and into another app, another tab, and another stream of distractions.',
      }}
    >
      <ul className="grid gap-4 md:grid-cols-3 md:gap-5">
        {problems.map((problem, index) => {
          const Icon = problem.icon;
          return (
            <motion.li
              key={problem.number}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.07, ease: 'easeOut' }}
              className="rounded-panel border border-line bg-ivory/60 p-6 transition-colors duration-300 hover:border-brand/40"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-card bg-brand-light text-brand-dark">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-display text-xl font-bold text-line" aria-hidden="true">
                  {problem.number}
                </span>
              </div>
              <h3 className="mt-5 font-display text-h3 text-ink">{problem.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{problem.description}</p>
            </motion.li>
          );
        })}
      </ul>
    </Section>
  );
}
