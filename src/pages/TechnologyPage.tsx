import { Fragment } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BrainCircuit,
  Cloud,
  Cpu,
  Eye,
  HardDrive,
  Library,
  Mic,
  MonitorSmartphone,
  Projector,
  Radio,
  ShieldCheck,
  Speaker,
  Thermometer,
  Volume2,
} from 'lucide-react';
import { AccessibleAccordion } from '../components/common/AccessibleAccordion';
import { ProductImage } from '../components/common/ProductImage';
import { PageHeader } from '../components/common/PageHeader';
import { Section } from '../components/common/Section';
import { Seo } from '../components/common/Seo';
import { StatusBadge } from '../components/common/StatusBadge';
import { technologyFaqs } from '../data/faq';
import { deskScholarImages, deskScholarImageRatios } from '../data/assets';
import { cn } from '../utils/cn';

const pipelineSteps = [
  { icon: Mic, label: 'Student speaks' },
  { icon: Radio, label: 'Local speech recognition' },
  { icon: BrainCircuit, label: 'Local learning model' },
  { icon: Volume2, label: 'Local voice' },
  { icon: Projector, label: 'Desk projection' },
];

const localCapabilities = [
  { icon: Mic, title: 'Wake-word detection', description: 'Hands-free activation without continuous listening uploads.' },
  { icon: Radio, title: 'Speech recognition', description: 'Spoken questions understood on the device.' },
  { icon: Volume2, title: 'Text-to-speech', description: 'Natural spoken explanations generated locally.' },
  { icon: Eye, title: 'Worksheet OCR', description: 'Printed and handwritten work read from the desk camera.' },
  { icon: BrainCircuit, title: 'Everyday tutoring', description: 'Step-by-step teaching handled by the local model.' },
  { icon: Library, title: 'Curriculum retrieval', description: 'Approved books and materials stored on the device.' },
];

const cloudCapabilities = [
  { title: 'Complex multi-step reasoning', description: 'Difficult questions beyond local confidence, with clear indicators.' },
  { title: 'Current information', description: 'Topics that need up-to-date knowledge not stored locally.' },
  { title: 'Advanced technical explanations', description: 'Deeper subject-matter reasoning when approved.' },
];

const privacyPrinciples = [
  'Local processing wherever practical',
  'Clear indicators when optional cloud reasoning is used',
  'Parent-controlled privacy mode (planned)',
  'Minimal data transfer for escalated questions only',
  'No hidden cloud-processing claims',
  'No mandatory account planned for basic offline use',
];

const hardwareLabels = [
  { icon: Eye, label: 'Desk-facing camera' },
  { icon: MonitorSmartphone, label: 'Interaction camera' },
  { icon: Projector, label: 'Mini projector' },
  { icon: Mic, label: 'Microphone' },
  { icon: Speaker, label: 'Speaker' },
  { icon: Cpu, label: 'Local AI computer' },
  { icon: HardDrive, label: 'Storage' },
  { icon: Thermometer, label: 'Cooling' },
  { icon: ShieldCheck, label: 'Privacy indicator' },
];

export default function TechnologyPage() {
  return (
    <>
      <Seo route="technology" />
      <PageHeader
        label="Technology"
        title="AI that stays close to the learner."
        description="DeskScholar is being designed around an offline-first architecture where everyday learning can happen locally and optional cloud reasoning is reserved for difficult questions."
      />

      {/* Learning pipeline */}
      <Section
        labelledBy="pipeline-heading"
        heading={{
          label: 'Learning pipeline',
          title: <span id="pipeline-heading">From a spoken question to a projected lesson.</span>,
          description:
            'The default path never leaves the device. The optional branch is only taken for difficult questions and is clearly indicated.',
        }}
      >
        <div className="mx-auto max-w-5xl rounded-panel border border-line bg-white p-6 shadow-soft sm:p-8">
          <p className="eyebrow flex items-center gap-2 text-aqua-dark">
            <span className="inline-block h-2 w-2 rounded-full bg-aqua-dark" aria-hidden="true" />
            Default path — fully local
          </p>
          <ol className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-0">
            {pipelineSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Fragment key={step.label}>
                  <li className="flex flex-1 items-center gap-3 rounded-card border border-line bg-ivory px-4 py-3.5 sm:flex-col sm:gap-2.5 sm:px-3 sm:py-5 sm:text-center">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-aqua-light text-aqua-dark">
                      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </span>
                    <span className="text-[13px] font-semibold leading-snug text-ink">{step.label}</span>
                  </li>
                  {index < pipelineSteps.length - 1 && (
                    <li
                      className="flex items-center justify-center py-0.5 text-brand sm:px-1.5 sm:py-0"
                      aria-hidden="true"
                    >
                      <ArrowRight className="h-4 w-4 rotate-90 sm:rotate-0" />
                    </li>
                  )}
                </Fragment>
              );
            })}
          </ol>
          <div className="mt-6 rounded-card border border-brand/30 bg-brand-light/30 p-5">
            <p className="eyebrow flex items-center gap-2 text-brand-dark">
              <Cloud className="h-3.5 w-3.5" aria-hidden="true" />
              Optional branch — difficult questions
            </p>
            <p className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm text-ink">
              <span className="font-semibold">Difficult question?</span>
              <ArrowRight className="h-3.5 w-3.5 text-brand-dark" aria-hidden="true" />
              <span>Parent-approved cloud reasoning</span>
              <ArrowRight className="h-3.5 w-3.5 text-brand-dark" aria-hidden="true" />
              <span>Text response returned</span>
              <ArrowRight className="h-3.5 w-3.5 text-brand-dark" aria-hidden="true" />
              <span>Local voice and projection</span>
            </p>
          </div>
        </div>
      </Section>

      {/* Local vs cloud */}
      <Section
        tone="white"
        labelledBy="capabilities-heading"
        heading={{
          label: 'Planned capabilities',
          title: <span id="capabilities-heading">Local by default, cloud by choice.</span>,
        }}
      >
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
          <div className="rounded-panel border border-aqua/40 bg-aqua-light/40 p-6 sm:p-8">
            <StatusBadge tone="aqua" dot>
              Planned local capabilities
            </StatusBadge>
            <ul className="mt-6 grid gap-x-5 gap-y-5 sm:grid-cols-2">
              {localCapabilities.map((capability) => {
                const Icon = capability.icon;
                return (
                  <li key={capability.title} className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-card bg-white text-aqua-dark shadow-soft">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-display text-sm font-bold text-ink">{capability.title}</p>
                      <p className="mt-1 text-[13px] leading-relaxed text-muted">{capability.description}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="rounded-panel border border-line bg-ivory p-6 sm:p-8">
            <StatusBadge tone="violet" dot>
              Optional cloud capabilities
            </StatusBadge>
            <ul className="mt-6 space-y-5">
              {cloudCapabilities.map((capability) => (
                <li key={capability.title} className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-card bg-brand-light text-brand-dark">
                    <Cloud className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold text-ink">{capability.title}</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted">{capability.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-card border border-line bg-white p-4 text-[13px] leading-relaxed text-muted">
              Cloud escalation is reserved for difficult questions, is designed to require approval, and is
              always indicated on the device.
            </p>
          </div>
        </div>
      </Section>

      {/* Privacy */}
      <Section
        tone="midnight"
        labelledBy="privacy-heading"
        heading={{
          dark: true,
          label: 'Privacy principles',
          title: <span id="privacy-heading">Designed so student data doesn’t need to travel.</span>,
        }}
      >
        <ul className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2">
          {privacyPrinciples.map((principle, index) => (
            <motion.li
              key={principle}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              className="flex items-start gap-3 rounded-card border border-dark-line bg-deep-navy px-5 py-4"
            >
              <ShieldCheck className="mt-0.5 h-[18px] w-[18px] shrink-0 text-aqua" aria-hidden="true" />
              <span className="text-sm leading-relaxed text-slate-200">{principle}</span>
            </motion.li>
          ))}
        </ul>
      </Section>

      {/* Hardware */}
      <Section
        labelledBy="hardware-heading"
        heading={{
          label: 'Hardware',
          title: <span id="hardware-heading">A prototype built around the desk.</span>,
          description: 'Final hardware specifications may change during prototype testing.',
        }}
      >
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
          <ProductImage
            src={deskScholarImages.explodedView}
            alt="Conceptual exploded view of DeskScholar hardware components."
            ratio={deskScholarImageRatios.explodedView}
            objectFit="contain"
            surface="light"
            caption="Conceptual hardware layout — final specifications may change."
          />
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {hardwareLabels.map((item, index) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.label}
                  className={cn(
                    'flex items-center gap-3 rounded-card border border-line bg-white px-4 py-3 shadow-soft',
                    // Odd final item spans both columns so the grid ends balanced.
                    index === hardwareLabels.length - 1 &&
                      hardwareLabels.length % 2 === 1 &&
                      'sm:col-span-2',
                  )}
                >
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand-dark">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold text-ink">{item.label}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 md:gap-5">
          <ProductImage
            src={deskScholarImages.sideProfile}
            alt="Side profile of the DeskScholar device and articulated projector arm."
            ratio={deskScholarImageRatios.sideProfile}
            objectFit="contain"
            surface="light"
            caption="Product form — base, dual-link arm, and projector head."
          />
          <ProductImage
            src={deskScholarImages.rearView}
            alt="Rear view of the DeskScholar showing its base, cooling vents, arm, and power cable."
            ratio={deskScholarImageRatios.rearView}
            objectFit="contain"
            surface="light"
            caption="Rear engineering detail — ventilation, arm mount, and power cable (prototype)."
          />
        </div>
      </Section>

      {/* Technology FAQ */}
      <Section
        tone="white"
        labelledBy="tech-faq-heading"
        heading={{
          label: 'Technology FAQ',
          title: <span id="tech-faq-heading">Questions about how it works.</span>,
        }}
        contentClassName="mx-auto max-w-3xl"
      >
        <AccessibleAccordion items={technologyFaqs} ariaLabel="Technology frequently asked questions" />
      </Section>
    </>
  );
}
