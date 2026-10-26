import { motion } from 'framer-motion';
import {
  BarChart3,
  BookMarked,
  Lightbulb,
  ClipboardList,
  GraduationCap,
  Languages,
  Library,
  ListChecks,
  MonitorSmartphone,
  School,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Users,
  WifiOff,
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Section } from '../components/common/Section';
import { Seo } from '../components/common/Seo';
import { StatusBadge } from '../components/common/StatusBadge';
import { SchoolInterestForm } from '../components/forms/SchoolInterestForm';
import { deskScholarImages, deskScholarImageSrcSets } from '../data/assets';
import { cn } from '../utils/cn';

const tones = ['sun', 'peach', 'lilac', 'pine'] as const;

const challenges = [
  { icon: Smartphone, title: 'Limited student devices', description: 'Not every student has a personal device available for lesson time.' },
  { icon: WifiOff, title: 'Unreliable internet', description: 'Connectivity can be slow, expensive, or unavailable during the school day.' },
  { icon: Users, title: 'Teacher workload', description: 'Individual support for every student is hard within a single class period.' },
  { icon: Languages, title: 'Language barriers', description: 'Concepts often need explanations in both English and Urdu.' },
  { icon: MonitorSmartphone, title: 'Smartphone distraction', description: 'Personal phones bring notifications and social media into study time.' },
];

const classroomUses = [
  { icon: ClipboardList, title: 'Guided worksheet sessions', description: 'Students work on paper while DeskScholar projects hints step by step.' },
  { icon: GraduationCap, title: 'Visual concept explanations', description: 'Diagrams and analogies projected beside the student’s own book.' },
  { icon: Languages, title: 'English and Urdu support', description: 'Bilingual explanations for mixed-language classrooms.' },
  { icon: ListChecks, title: 'Revision quizzes', description: 'Spoken quizzes for exam preparation without printed handouts.' },
  { icon: Library, title: 'Library learning stations', description: 'Shared devices for independent study periods.' },
  { icon: BookMarked, title: 'Shared curriculum resources', description: 'Approved materials stored locally on each device.' },
];

const teacherBenefits = [
  { icon: Lightbulb, title: 'Hint-first tutoring', description: 'Students are guided, not given answers, protecting the learning process.', status: 'Planned' },
  { icon: BookMarked, title: 'Teacher-approved content', description: 'Explanations can be grounded in materials teachers choose.', status: 'Planned' },
  { icon: SlidersHorizontal, title: 'Classroom controls', description: 'Manage modes and sessions for a class setting.', status: 'Planned' },
  { icon: BarChart3, title: 'Activity summaries', description: 'Short summaries of what students practiced and where they struggled.', status: 'Planned' },
  { icon: School, title: 'Curriculum-grounded learning', description: 'Local curriculum materials guide relevant explanations.', status: 'In design' },
];

const deploymentPrinciples = [
  'Local-first processing so devices work without full-time connectivity',
  'Shared learning materials loaded onto each device',
  'Optional content updates when a connection is available',
  'Reduced smartphone dependence during study time',
  'Designed for classroom, library, and shared study space use',
];

export default function SchoolsPage() {
  return (
    <>
      <Seo route="schools" />
      <PageHeader
        label="For Schools"
        title="Bring guided AI learning to the real classroom."
        description="DeskScholar is being explored as an offline-capable AI learning device for classrooms, libraries, labs, and shared study spaces in Pakistan — with explanations in English and Urdu."
        visual={
          <div className="relative">
            <figure className="ph-photo">
              <img
                src={deskScholarImages.classroom}
                srcSet={deskScholarImageSrcSets.classroom}
                sizes="(min-width: 1024px) 540px, calc(100vw - 40px)"
                alt="Students and a teacher using DeskScholar during a collaborative classroom learning activity."
                width={2000}
                height={1116}
              />
            </figure>
            <p className="ph-sticker">
              <WifiOff className="h-4 w-4" aria-hidden="true" />
              Built for shaky school Wi-Fi
            </p>
          </div>
        }
      >
        <a href="#pilot-interest" className="inline-flex min-h-[48px] items-center rounded-full bg-beam px-6 text-[15px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(23,107,91,0.65)] transition-transform hover:-translate-y-0.5">
          Register pilot interest
        </a>
      </PageHeader>

      {/* School challenges */}
      <Section
        labelledBy="challenges-heading"
        heading={{
          label: 'The reality in schools',
          align: 'center',
          title: <span id="challenges-heading">Challenges DeskScholar is designed to address.</span>,
        }}
      >
        <ul className="flex flex-wrap justify-center gap-4 md:gap-5">
          {challenges.map((challenge, index) => {
            const Icon = challenge.icon;
            return (
              <motion.li
                key={challenge.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.8333rem)]"
              >
                <div className="lift h-full rounded-panel border border-line bg-white p-6 shadow-soft">
                  <span className="tile" data-tone={tones[index % tones.length]} aria-hidden="true">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-ink">{challenge.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{challenge.description}</p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </Section>

      {/* Classroom uses */}
      <Section
        tone="white"
        labelledBy="uses-heading"
        heading={{
          label: 'Potential classroom uses',
          title: <span id="uses-heading">Where DeskScholar could fit into a school day.</span>,
        }}
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {classroomUses.map((use, index) => {
            const Icon = use.icon;
            return (
              <li key={use.title} className="lift flex gap-4 rounded-panel border border-line bg-white p-5 shadow-soft">
                <span className="tile" data-tone={tones[(index + 1) % tones.length]} aria-hidden="true">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-base font-bold text-ink">{use.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{use.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* For teachers */}
      <Section
        labelledBy="teachers-heading"
        heading={{
          label: 'For teachers',
          align: 'center',
          title: <span id="teachers-heading">Teaching-first behavior, by design.</span>,
        }}
      >
        <ul className="mx-auto flex max-w-4xl flex-wrap justify-center gap-4 md:gap-5">
          {teacherBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
            <li
              key={benefit.title}
              className="w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.8333rem)]"
            >
              <div className="lift flex h-full flex-col rounded-panel border border-line bg-white p-6 shadow-soft">
                <div className="flex items-center justify-between gap-2">
                  <span className="tile" data-tone={tones[(index + 2) % tones.length]} aria-hidden="true">
                    <Icon className="h-5 w-5" />
                  </span>
                  <StatusBadge tone="planned">{benefit.status}</StatusBadge>
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-ink">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{benefit.description}</p>
              </div>
            </li>
            );
          })}
        </ul>
      </Section>

      {/* Deployment vision */}
      <Section
        tone="midnight"
        labelledBy="deployment-heading"
        heading={{
          dark: true,
          label: 'Deployment vision',
          align: 'center',
          title: <span id="deployment-heading">Practical by design for shared learning spaces.</span>,
        }}
      >
        <ul className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2">
          {deploymentPrinciples.map((principle, index) => (
            <motion.li
              key={principle}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              className={cn(
                'flex items-start gap-3 rounded-card border border-dark-line bg-deep-navy px-5 py-4',
                // Odd final item: centred at single-column width so the row stays balanced.
                index === deploymentPrinciples.length - 1 &&
                  deploymentPrinciples.length % 2 === 1 &&
                  'sm:col-span-2 sm:mx-auto sm:w-[calc(50%-0.375rem)]',
              )}
            >
              <ShieldCheck className="mt-0.5 h-[18px] w-[18px] shrink-0 text-aqua" aria-hidden="true" />
              <span className="text-sm leading-relaxed text-text-hi">{principle}</span>
            </motion.li>
          ))}
        </ul>
      </Section>

      {/* Pilot interest form */}
      <Section id="pilot-interest" anchor ariaLabel="School pilot interest">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-hero border border-[var(--hairline-dark)] bg-white shadow-lift">
          <div className="grid lg:grid-cols-[1fr_1.2fr]">
            <div className="section-pine relative p-8 sm:p-10">
              <div className="relative">
                <StatusBadge tone="dark" dot pulse>
                  Pilot interest
                </StatusBadge>
                <h2 id="pilot-heading" className="mt-5 font-display text-h3 text-text-hi">
                  Interested in future prototype testing?
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-text-hi">
                  DeskScholar has not been deployed in any school yet. This form registers interest only —
                  the team will reach out when pilot testing begins.
                </p>
                <ul className="mt-6 space-y-3">
                  {['Classrooms', 'Libraries', 'Labs', 'Shared study spaces'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-text-hi">
                      <SlidersHorizontal className="h-4 w-4 shrink-0 text-aqua" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-white p-6 sm:p-10">
              <SchoolInterestForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
