import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, FlaskConical } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Section } from '../components/common/Section';
import { Seo } from '../components/common/Seo';
import { StatusBadge } from '../components/common/StatusBadge';
import { cn } from '../utils/cn';
import { deskScholarImages, deskScholarImageSrcSets } from '../data/assets';
import '../styles/team.css';

type MilestoneStatus = 'Completed' | 'In progress' | 'Planned';

const timeline: Array<{ title: string; description: string; status: MilestoneStatus }> = [
  {
    title: 'Research and architecture',
    description: 'Studied offline AI feasibility, learning science basics, and desk-projection concepts.',
    status: 'Completed',
  },
  {
    title: 'Product positioning',
    description: 'Defined DeskScholar as a serious learning device with a warm companion personality.',
    status: 'Completed',
  },
  {
    title: 'Hardware selection',
    description: 'Selected prototype compute, camera, microphone, speaker, and projection components.',
    status: 'Completed',
  },
  {
    title: 'Voice and local AI',
    description: 'Integrating local speech recognition, text-to-speech, and the on-device tutoring model.',
    status: 'In progress',
  },
  {
    title: 'OCR and worksheet understanding',
    description: 'Teaching the desk camera to read printed questions and handwritten solutions.',
    status: 'In progress',
  },
  {
    title: 'Projected learning interface',
    description: 'Designing how hints, diagrams, and steps appear on the physical desk surface.',
    status: 'Planned',
  },
  {
    title: 'Student testing',
    description: 'Observing real students using the prototype during supervised study sessions.',
    status: 'Planned',
  },
  {
    title: 'Evaluation and refinement',
    description: 'Measuring the areas below and refining hardware and software based on results.',
    status: 'Planned',
  },
];

const statusTone: Record<MilestoneStatus, 'success' | 'violet' | 'neutral'> = {
  Completed: 'success',
  'In progress': 'violet',
  Planned: 'neutral',
};

interface GalleryItem {
  src: string;
  srcSet?: string;
  title: string;
  alt: string;
  fit: 'cover' | 'contain';
  caption: string | null;
}

const gallery: GalleryItem[] = [
  {
    src: deskScholarImages.explodedView,
    title: 'Conceptual Hardware Architecture',
    alt: 'Conceptual exploded view of DeskScholar hardware components.',
    fit: 'contain',
    caption: 'Conceptual hardware layout — final specifications may change.',
  },
  {
    src: deskScholarImages.sideProfile,
    title: 'DeskScholar Device Render',
    alt: 'Side profile of the DeskScholar device and articulated projector arm.',
    fit: 'contain',
    caption: null,
  },
  {
    src: deskScholarImages.projectionCloseup,
    srcSet: deskScholarImageSrcSets.projectionCloseup,
    title: 'Projected Learning Experience',
    alt: 'DeskScholar projecting visual fraction guidance onto a mathematics worksheet.',
    fit: 'cover',
    caption: null,
  },
  {
    src: deskScholarImages.classroom,
    srcSet: deskScholarImageSrcSets.classroom,
    title: 'Classroom Learning Vision',
    alt: 'Students and a teacher using DeskScholar during a collaborative classroom learning activity.',
    fit: 'cover',
    caption: null,
  },
  {
    src: deskScholarImages.hingeDetail,
    title: 'Mechanical Prototyping',
    alt: 'Close-up of DeskScholar’s articulated arm hinge and mechanical joint.',
    fit: 'cover',
    caption: 'Articulated arm hinge and mounting detail.',
  },
];

const evaluationAreas = [
  'Response latency',
  'OCR accuracy',
  'Offline answer quality',
  'English and Urdu usability',
  'Escalation accuracy',
  'Energy usage',
  'Cost per learning session',
];

/** Header visual — milestone progress, derived from the timeline above. */
function ProgressCard() {
  const done = timeline.filter((t) => t.status === 'Completed').length;
  const active = timeline.filter((t) => t.status === 'In progress').length;
  const pct = Math.round(((done + active * 0.5) / timeline.length) * 100);
  return (
    <div className="jr-progress" aria-hidden="true">
      <div className="jr-progress-top">
        <span className="jr-ring" style={{ ['--p' as string]: `${pct}%` }}>
          <span>{done}/{timeline.length}</span>
        </span>
        <div>
          <p className="jr-progress-title">Milestones completed</p>
          <p className="jr-progress-sub">{active} in progress right now</p>
        </div>
      </div>
      <ol className="jr-mini">
        {timeline.slice(0, 6).map((t) => (
          <li key={t.title} data-status={t.status}>
            <i />
            {t.title}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function JourneyPage() {
  return (
    <>
      <Seo route="journey" />
      <PageHeader
        label="Our journey"
        title="From final-year project to a real learning product."
        description="DeskScholar is being developed as a product-focused engineering project with emphasis on technical feasibility, learning experience, offline AI, and affordability."
        visual={<ProgressCard />}
      />

      {/* Timeline */}
      <Section
        labelledBy="timeline-heading"
        heading={{
          label: 'Development timeline',
          align: 'center',
          title: <span id="timeline-heading">Where the prototype stands today.</span>,
        }}
      >
        <ol className="relative mx-auto max-w-3xl">
          <div className="absolute bottom-6 left-[19px] top-4 w-px bg-line" aria-hidden="true" />
          {timeline.map((item, index) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="relative flex gap-5 pb-6 last:pb-0"
            >
              <span
                className={cn(
                  'relative z-10 mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-white font-display text-sm font-bold',
                  item.status === 'Completed' && 'border-success text-success',
                  item.status === 'In progress' && 'border-brand text-brand-dark',
                  item.status === 'Planned' && 'border-line text-muted',
                )}
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <div className="lift flex-1 rounded-panel border border-line bg-white p-5 shadow-soft">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-base font-bold text-ink">{item.title}</h3>
                  <StatusBadge tone={statusTone[item.status]} dot>
                    {item.status}
                  </StatusBadge>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </Section>

      {/* Gallery */}
      <Section
        tone="white"
        labelledBy="gallery-heading"
        heading={{
          label: 'Prototype gallery',
          title: <span id="gallery-heading">Behind the build.</span>,
          description:
            'Concept renders and learning scenarios illustrate the current DeskScholar product direction. Real prototype testing photography will be added as hardware development progresses.',
        }}
      >
        <ul className="jr-bento">
          {gallery.map((item, index) => (
            <li key={item.title} className="jr-tile" data-fit={item.fit} data-i={index}>
              <img
                src={item.src}
                srcSet={item.srcSet}
                sizes="(min-width: 1024px) 600px, calc(100vw - 40px)"
                alt={item.alt}
                loading="lazy"
                decoding="async"
              />
              <div className="jr-tile-cap">
                <strong>{item.title}</strong>
                {item.caption && <span>{item.caption}</span>}
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-8 text-center md:mt-10">
          <p className="text-sm text-muted">
            <Link
              to="/team"
              className="inline-flex min-h-9 items-center gap-1 font-semibold text-brand-dark underline-offset-4 hover:underline"
            >
              Meet the team <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </p>
        </div>
      </Section>

      {/* Evaluation */}
      <Section
        labelledBy="evaluation-heading"
        heading={{
          label: 'Research and evaluation',
          align: 'center',
          title: <span id="evaluation-heading">What we plan to measure.</span>,
          description:
            'DeskScholar will be evaluated with real study sessions. No metric values are published yet because measurement has not started.',
        }}
      >
        <ul className="jr-eval">
          {evaluationAreas.map((area, i) => (
            <li key={area} className="lift">
              <span className="tile" data-tone={(['sun', 'peach', 'lilac', 'pine'] as const)[i % 4]} aria-hidden="true">
                <FlaskConical className="h-5 w-5" />
              </span>
              {area}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-center">
          <StatusBadge tone="sun" dot>All metrics: measurement planned</StatusBadge>
        </p>

        <div className="pcta mt-14 md:mt-20">
          <h2>Interested in research, education, hardware, or product collaboration?</h2>
          <p>
            We welcome conversations with educators, researchers, hardware engineers, product designers,
            and early-stage supporters.
          </p>
          <div className="pcta-actions">
            <Link to="/contact" className="pcta-primary">
              Contact the Team
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/team" className="pcta-secondary">
              Meet the team
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
