import { motion } from 'framer-motion';
import { Eye, Lightbulb, ScanLine } from 'lucide-react';
import { deskScholarImages, deskScholarImageRatios, deskScholarImageSrcSets } from '../../data/assets';
import { ProductImage } from '../common/ProductImage';
import { Section } from '../common/Section';

const steps = [
  {
    step: 'Step 1',
    icon: Eye,
    title: 'See the desk',
    description:
      'DeskScholar captures books, worksheets, handwriting, diagrams, and spoken questions without asking students to retype everything.',
  },
  {
    step: 'Step 2',
    icon: ScanLine,
    title: 'Understand the question',
    description:
      'It combines visual context, the student’s question, and curriculum material to understand what the learner needs.',
  },
  {
    step: 'Step 3',
    icon: Lightbulb,
    title: 'Teach step by step',
    description:
      'It projects hints, explanations, diagrams, and guided solutions directly onto the workspace.',
  },
];

export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      anchor
      tone="white"
      labelledBy="how-heading"
      heading={{
        label: 'How it works',
        title: <span id="how-heading">One learning loop, designed for real desk work.</span>,
      }}
    >
      <div className="relative">
        {/* Connecting line (desktop) */}
        <div
          className="absolute left-0 right-0 top-8 hidden h-px bg-line md:block"
          aria-hidden="true"
        />
        <ol className="grid gap-8 md:grid-cols-3 md:gap-6">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.li
                key={item.step}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
                className="relative flex flex-col items-center text-center md:px-4"
              >
                <span className="relative z-10 inline-flex h-16 w-16 items-center justify-center rounded-full border border-line bg-ivory shadow-soft">
                  <Icon className="h-6 w-6 text-brand-dark" aria-hidden="true" />
                </span>
                <p className="eyebrow mt-4 text-aqua-dark">{item.step}</p>
                <h3 className="mt-1.5 font-display text-h3 text-ink">{item.title}</h3>
                <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-muted">{item.description}</p>
              </motion.li>
            );
          })}
        </ol>
      </div>

      <ProductImage
        className="mt-12 md:mt-14"
        src={deskScholarImages.studentUse}
        srcSet={deskScholarImageSrcSets.studentUse}
        sizes="(min-width: 1280px) 1216px, calc(100vw - 40px)"
        alt="A student using DeskScholar to understand a fraction problem projected onto a worksheet."
        ratio={deskScholarImageRatios.studentUse}
        objectPosition="center"
        caption="The full loop in one frame — the student's hands stay on the worksheet while guidance is projected beside the problem."
      />
    </Section>
  );
}
