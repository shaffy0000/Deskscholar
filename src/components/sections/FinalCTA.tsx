import { motion, useReducedMotion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Button } from '../common/Button';
import { Container } from '../common/Container';
import { CloudflareVideoModal } from '../common/CloudflareVideoModal';

export function FinalCTA() {
  const reduced = useReducedMotion();

  return (
    <section className="dark-section relative overflow-hidden bg-midnight py-16 md:py-20 xl:py-24" aria-labelledby="cta-heading">
      <motion.div
        className="projection-grid pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
        animate={reduced ? undefined : { backgroundPosition: ['0px 0px', '48px 48px'] }}
        transition={reduced ? undefined : { duration: 16, repeat: Infinity, ease: 'linear' }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-56 w-[32rem] -translate-x-1/2 rounded-full bg-brand/15 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="mx-auto max-w-3xl"
        >
          <p className="eyebrow text-brand-light">Join the journey</p>
          {/* The one allowed violet→aqua gradient accent, limited to the major CTA. */}
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-brand to-aqua" aria-hidden="true" />
          <h2 id="cta-heading" className="mt-4 font-display text-h2 text-white">
            The future of learning doesn’t need another screen.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lead text-slate-300 sm:mt-5">
            Follow DeskScholar as we build an offline-first AI tutor for real desks, real classrooms, and
            real students.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" variant="dark" to="/contact">
              Join Early Access
            </Button>
            <CloudflareVideoModal>
              {({ open }) => (
                <button
                  type="button"
                  onClick={open}
                  className="inline-flex min-h-12 items-center gap-2 whitespace-nowrap rounded-full border border-dark-line bg-deep-navy px-6 text-sm font-semibold text-white transition-colors hover:border-brand-light/40 hover:text-brand-light sm:px-7"
                >
                  <Play className="h-4 w-4 text-aqua" aria-hidden="true" />
                  Watch Prototype Demo
                </button>
              )}
            </CloudflareVideoModal>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
