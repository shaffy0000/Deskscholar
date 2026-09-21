import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, FlaskConical } from 'lucide-react';
import { Button } from '../components/common/Button';
import { PageHeader } from '../components/common/PageHeader';
import { Section } from '../components/common/Section';
import { Seo } from '../components/common/Seo';
import { StatusBadge } from '../components/common/StatusBadge';
import { cn } from '../utils/cn';
import { deskScholarImages, deskScholarImageRatios, deskScholarImageSrcSets } from '../data/assets';
import { ProductImage } from '../components/common/ProductImage';

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
    src: deskScholarImages.sideProfile,
    title: 'DeskScholar Device Render',
    alt: 'Side profile of the DeskScholar device and articulated projector arm.',
    fit: 'contain',
    caption: null,
  },
  {
    src: deskScholarImages.explodedView,
    title: 'Conceptual Hardware Architecture',
    alt: 'Conceptual exploded view of DeskScholar hardware components.',
    fit: 'contain',
    caption: 'Conceptual hardware layout — final specifications may change.',
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

export default function JourneyPage() {
  return (
    <>
      <Seo route="journey" />
      <PageHeader
        label="Our journey"
        title="From final-year project to a real learning product."
        description="DeskScholar is being developed as a product-focused engineering project with emphasis on technical feasibility, learning experience, offline AI, and affordability."
      />

      {/* Timeline */}
      <Section
        labelledBy="timeline-heading"
        heading={{
          label: 'Development timeline',
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
              <div className="flex-1 rounded-panel border border-line bg-white p-5 shadow-soft">
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {gallery.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <ProductImage
                src={item.src}
                srcSet={item.srcSet}
                sizes="(min-width: 1024px) 290px, (min-width: 640px) 48vw, calc(100vw - 40px)"
                alt={item.alt}
                ratio="16 / 9"
                objectFit={item.fit}
                surface="light"
                caption={
                  <>
                    <span className="mt-1 block font-display text-[13px] font-bold text-ink">
                      {item.title}
                    </span>
                    {item.caption && <span className="mt-1 block">{item.caption}</span>}
                  </>
                }
              />
            </motion.div>
          ))}
        </div>
        <div className="mx-auto mt-4 max-w-3xl md:mt-5">
          <ProductImage
            src={deskScholarImages.hingeDetail}
            alt="Close-up of DeskScholar’s articulated arm hinge and mechanical joint."
            ratio={deskScholarImageRatios.hingeDetail}
            surface="dark"
            caption="Mechanical prototyping — articulated arm hinge and mounting detail."
          />
        </div>
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
          title: <span id="evaluation-heading">What we plan to measure.</span>,
          description:
            'DeskScholar will be evaluated with real study sessions. No metric values are published yet because measurement has not started.',
        }}
      >
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
          <ul className="grid gap-3 sm:grid-cols-2">
            {evaluationAreas.map((area) => (
              <li
                key={area}
                className="flex items-center justify-between gap-3 rounded-card border border-line bg-white px-4 py-3 shadow-soft"
              >
                <span className="flex items-center gap-2.5 text-sm font-semibold text-ink">
                  <FlaskConical className="h-4 w-4 shrink-0 text-brand-dark" aria-hidden="true" />
                  {area}
                </span>
                  <StatusBadge tone="neutral">Measurement planned</StatusBadge>
              </li>
            ))}
          </ul>
          <ProductImage
            src={deskScholarImages.studentUse}
            srcSet={deskScholarImageSrcSets.studentUse}
            sizes="(min-width: 1024px) 590px, calc(100vw - 40px)"
            alt="A student using DeskScholar to understand a fraction problem projected onto a worksheet."
            ratio={deskScholarImageRatios.studentUse}
            objectPosition="center"
            caption="Concept learning scenario for future usability and response-quality evaluation."
          />
        </div>

        <div className="mt-14 rounded-hero bg-midnight p-8 text-center dark-section md:mt-16 md:p-12">
          <h2 className="font-display text-h3 text-white">
            Interested in research, education, hardware, or product collaboration?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-300">
            We welcome conversations with educators, researchers, hardware engineers, product designers,
            and early-stage supporters.
          </p>
          <div className="mt-7 flex justify-center">
            <Button variant="dark" size="lg" to="/contact">
              Contact the Team
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
