import { Hero } from '../components/sections/Hero';
import { ProblemSection } from '../components/sections/ProblemSection';
import { InteractiveWalkthrough } from '../components/sections/InteractiveWalkthrough';
import { EditionsSection } from '../components/sections/EditionsSection';
import { AudienceSection } from '../components/sections/AudienceSection';
import { FinalCTA } from '../components/sections/FinalCTA';
import { Seo } from '../components/common/Seo';
import { Helmet } from 'react-helmet-async';
import { buildStructuredData } from '../data/structuredData';
import { SITE_URL } from '../data/site';

/**
 * Home page — concise and visual:
 * 1. Product hero
 * 2. Image-led learning-problem section
 * 3. Planned learning demonstration (#planned-experience)
 * 4. Three-edition image-led spotlight (#editions-preview)
 * 5. Compact intended-audience content
 * 6. One development-waitlist CTA
 * The detailed comparison lives on /editions; FAQs live on /faq.
 * No prices are published anywhere.
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
      <InteractiveWalkthrough />
      <EditionsSection />
      <AudienceSection />
      <FinalCTA />
    </>
  );
}
