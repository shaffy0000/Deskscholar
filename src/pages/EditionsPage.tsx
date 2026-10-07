import { Link } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { SectionHeading } from '../components/common/SectionHeading';
import { ComparisonExplorer } from '../components/editions/ComparisonExplorer';
import { EditionBlock } from '../components/editions/EditionBlock';
import { Seo } from '../components/common/Seo';
import { deskScholarImages, deskScholarImageSrcSets } from '../data/assets';
import { editions } from '../data/editions';
import '../styles/editions.css';

const editionImages = {
  connect: {
    src: deskScholarImages.classroom,
    srcSet: deskScholarImageSrcSets.classroom,
    alt: 'Students and a teacher working together around a DeskScholar unit in a planned classroom setting.',
    ratio: '2000 / 1116',
    caption: 'Concept scenario — a connected classroom or tuition centre with reliable Wi-Fi.',
  },
  hybrid: {
    src: deskScholarImages.studentUse,
    srcSet: deskScholarImageSrcSets.studentUse,
    alt: 'A student at a home desk using DeskScholar with a worksheet and projected guidance.',
    ratio: '2000 / 1116',
    caption: 'Concept scenario — a connected household; the page stays on the desk.',
  },
  independent: {
    src: deskScholarImages.hero,
    srcSet: deskScholarImageSrcSets.hero,
    alt: 'The DeskScholar unit on a study desk in normal room lighting.',
    ratio: '1407 / 768',
    caption: 'Concept render — entirely local learning, readable in normal room lighting.',
  },
} as const;

export default function EditionsPage() {
  return (
    <>
      <Seo route="editions" />

      <PageHeader
        label="Editions"
        title="Three editions, one idea."
        description="The same desk unit, three planned ways of thinking: on our servers, split between the desk and our servers, or entirely on the desk. All editions are in prototype development — specifications may change."
      />

      <main>
        {editions.map((edition, index) => (
          <EditionBlock
            key={edition.slug}
            edition={edition}
            index={index}
            image={editionImages[edition.slug]}
          />
        ))}

        {/* "Choose what matters" comparison explorer — all three editions together */}
        <section className="ed-cmp" aria-labelledby="editions-compare-heading">
          <div className="ed-cmp-inner">
            <SectionHeading
              align="left"
              title={<span id="editions-compare-heading">Choose what matters.</span>}
              description="Pick the question you actually care about — every category answers for all three editions side by side, in plain language."
              className="max-w-[62ch]"
            />
            <ComparisonExplorer />
          </div>
        </section>

        {/* Waitlist CTA */}
        <section aria-labelledby="editions-cta" className="ed-cta">
          <div className="ed-cta-inner">
            <h2 id="editions-cta">Not sure which edition fits?</h2>
            <p>
              Connectivity first, privacy second. Join the development waitlist and we will help you
              think it through as the prototype matures.
            </p>
            <Link to="/contact" className="ed-cta-btn">
              Join the waitlist
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
