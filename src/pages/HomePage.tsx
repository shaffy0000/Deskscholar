import { lazy, Suspense } from 'react';
import { Hero } from '../components/sections/Hero';
import { ProblemSection } from '../components/sections/ProblemSection';
import { HowItWorks } from '../components/sections/HowItWorks';

/** The scripted demo is the heaviest section — split it out of the first-load bundle. */
const InteractiveDemo = lazy(() =>
  import('../components/sections/InteractiveDemo').then((m) => ({ default: m.InteractiveDemo })),
);

/** Placeholder with the same vertical rhythm as the demo section, so nothing shifts. */
function DemoSkeleton() {
  return (
    <section aria-hidden="true" className="py-16 md:py-20 xl:py-24">
      <div className="mx-auto h-[300px] max-w-5xl animate-pulse rounded-panel border border-line bg-white/60" />
    </section>
  );
}
import { FeaturesGrid } from '../components/sections/FeaturesGrid';
import { ComparisonSection } from '../components/sections/ComparisonSection';
import { AudienceSection } from '../components/sections/AudienceSection';
import { FAQSection } from '../components/sections/FAQSection';
import { FinalCTA } from '../components/sections/FinalCTA';
import { Seo } from '../components/common/Seo';
import { Helmet } from 'react-helmet-async';
import { buildStructuredData } from '../data/structuredData';
import { SITE_URL } from '../data/site';
export default function HomePage() {
  return (
    <>
      <Seo route="home" />
      <Helmet>
        {buildStructuredData(SITE_URL).map((schema) => (
          <script key={schema['@type']} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
      </Helmet>
      <Hero />
      <ProblemSection />
      <Suspense fallback={<DemoSkeleton />}>
        <InteractiveDemo />
      </Suspense>
      <HowItWorks />
      <FeaturesGrid />
      <ComparisonSection />
      <AudienceSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
