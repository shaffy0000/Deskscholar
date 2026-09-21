import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { heroValues } from '../../data/features';
import { deskScholarImages, deskScholarImageRatios, deskScholarImageSrcSets } from '../../data/assets';
import { Button } from '../common/Button';
import { Container } from '../common/Container';
import { ProductImage } from '../common/ProductImage';
import { StatusBadge } from '../common/StatusBadge';
import { CloudflareVideoModal } from '../common/CloudflareVideoModal';

const heroBadges = [
  { label: 'Offline-first AI', tone: 'aqua' as const },
  { label: 'English + Urdu', tone: 'violet' as const },
  { label: 'Voice, vision and projection', tone: 'violet' as const },
  { label: 'No mandatory subscription planned', tone: 'planned' as const },
];

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-heading">
      {/* Warm apricot wash with a hint of violet — the desk-light moment behind the headline. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-br from-sun-light/70 via-[#F6EEE4] to-brand-light/45"
        style={{
          maskImage: 'linear-gradient(to bottom, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
        }}
        aria-hidden="true"
      />
      <Container className="relative pb-16 pt-12 md:pb-20 sm:pt-16 xl:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <StatusBadge tone="aqua" dot pulse>
              Offline-first AI learning companion
            </StatusBadge>
            <h1 id="hero-heading" className="mt-5 font-display text-display text-ink">
              Your AI tutor, built into your desk.
            </h1>
            <p className="mt-5 max-w-xl text-lead text-muted">
              Point at a question. Ask naturally. Get step-by-step help projected directly onto your
              workspace — even when the internet is unavailable.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <CloudflareVideoModal>
                {({ open }) => (
                  <Button size="lg" onClick={open}>
                    <PlayCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                    Watch DeskScholar in Action
                  </Button>
                )}
              </CloudflareVideoModal>
              <Button size="lg" variant="secondary" to="/#how-it-works">
                Explore How It Works
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </Button>
            </div>

            <ul className="mt-7 flex flex-wrap gap-2" aria-label="Key capabilities">
              {heroBadges.map((badge) => (
                <li key={badge.label}>
                  <StatusBadge tone={badge.tone}>{badge.label}</StatusBadge>
                </li>
              ))}
            </ul>

            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              Currently in prototype development
            </p>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: 'easeOut' }}
            data-testid="hero-desk-scene-wrap"
          >
            <ProductImage
              src={deskScholarImages.hero}
              srcSet={deskScholarImageSrcSets.hero}
              sizes="(min-width: 1024px) 606px, calc(100vw - 40px)"
              alt="DeskScholar offline-first AI learning companion on a study desk."
              ratio={deskScholarImageRatios.hero}
              objectFit="cover"
              priority
              surface="dark"
              className="mx-auto w-full max-w-xl shadow-2xl"
              containerClassName="rounded-hero shadow-soft"
            />
          </motion.div>
        </div>

        <ul className="mt-12 grid gap-3 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {heroValues.map((value) => (
            <li key={value.title} className="rounded-card border border-line bg-white p-4 shadow-soft">
              <p className="font-display text-sm font-bold text-ink">{value.title}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-muted">{value.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
