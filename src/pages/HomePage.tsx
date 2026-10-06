import { Hero } from '../components/sections/Hero';
import { ProblemSection } from '../components/sections/ProblemSection';
import { HowItWorks } from '../components/sections/HowItWorks';
import { FeaturesGrid } from '../components/sections/FeaturesGrid';
import { ComparisonSection } from '../components/sections/ComparisonSection';
import { EditionsSection } from '../components/sections/EditionsSection';
import { AudienceSection } from '../components/sections/AudienceSection';
import { FAQSection } from '../components/sections/FAQSection';
import { FinalCTA } from '../components/sections/FinalCTA';
import { Seo } from '../components/common/Seo';
import { Helmet } from 'react-helmet-async';
import { buildStructuredData } from '../data/structuredData';
import { SITE_URL } from '../data/site';

/**
 * Home page — section order per the brief:
 * 1. Hero (full-bleed image)
 * 2. The learning problem (light, statement + cards)
 * 3. How it works (dark, step rail + image)
 * 4. Capabilities (light, bento grid)
 * 5. Why a device (dark, comparison table)
 * 6. Three editions, one idea (dark, connectivity selector) — NEW
 * 7. Who it is for (light, audience cards)
 * 8. FAQ (dark, native details/summary)
 * 9. Final CTA (dark, statement block)
 *
 * No two consecutive sections share a layout ✓
 */
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
      <HowItWorks />
      <FeaturesGrid />
      <ComparisonSection />
      <EditionsSection />
      <AudienceSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
