import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { deskScholarImages, deskScholarImageSrcSets } from '../../data/assets';
import { Button } from '../common/Button';
import { Container } from '../common/Container';
import { StatusBadge } from '../common/StatusBadge';

export function Hero() {
  const [visible, setVisible] = useState(false);
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    // Small delay so the entrance animation reads
    const id = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(id);
  }, []);

  const show = reducedMotion || visible;

  return (
    <section className="relative overflow-hidden -mt-16 lg:-mt-[72px]" aria-labelledby="hero-heading">
      {/* Full-bleed hero image — the product renders carry the page */}
      <div className="absolute inset-0 z-0">
        <img
          src={deskScholarImages.hero}
          srcSet={deskScholarImageSrcSets.hero}
          sizes="100vw"
          alt="DeskScholar offline-first AI learning companion on a study desk."
          width={1407}
          height={768}
          // React 18 doesn't map the camelCase prop — pass the lowercase DOM attribute.
          {...{ fetchpriority: 'high' }}
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
        {/* Dark gradient overlay so text reads on any image */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/80 to-ink-900/40"
          aria-hidden="true"
        />
      </div>

      <Container className="relative z-10 pb-20 pt-32 md:pb-28 md:pt-40 lg:pb-32 lg:pt-48">
        <div className="max-w-2xl">
          <StatusBadge showDot>
            One edition needs no subscription
          </StatusBadge>

          <h1
            id="hero-heading"
            className={`mt-6 font-display text-display font-bold tracking-tight text-text-hi ${
              show
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-[14px]'
            } ${!reducedMotion ? 'transition-all duration-slow ease-out' : ''}`}
          >
            Your AI tutor, built&nbsp;into&nbsp;your&nbsp;desk.
          </h1>

          <p
            className={`mt-5 max-w-xl text-body-lg leading-relaxed text-text-lo ${
              show
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-[14px]'
            } ${!reducedMotion ? 'transition-all duration-slow ease-out delay-75' : ''}`}
          >
            Point at a question. Ask naturally. Get step-by-step help projected
            directly onto your workspace — even when the internet is unavailable.
          </p>

          <div
            className={`mt-8 flex flex-wrap gap-3 ${
              show
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-[14px]'
            } ${!reducedMotion ? 'transition-all duration-slow ease-out delay-150' : ''}`}
          >
            <Button size="lg" to="/#how-it-works">
              Explore How It Works
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </Button>
            <Button size="lg" variant="quiet" to="/editions">
              See all three editions
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </Button>
          </div>

          <p
            className={`mt-8 text-micro font-medium text-text-lo ${
              show
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-[14px]'
            } ${!reducedMotion ? 'transition-all duration-slow ease-out delay-200' : ''}`}
          >
            Currently in prototype development · Three editions planned
          </p>
        </div>
      </Container>
    </section>
  );
}
