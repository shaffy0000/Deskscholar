import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PageHeader } from '../components/common/PageHeader';
import { Seo } from '../components/common/Seo';
import { Section } from '../components/common/Section';
import { faqs } from '../data/faq';
import { buildFaqStructuredData } from '../data/structuredData';

/**
 * Dedicated FAQ route — the home page no longer carries a FAQ section.
 * Native <details>/<summary> disclosures: keyboard-operable, content in the DOM,
 * no animation required. Questions preserved; no monetary figures anywhere.
 */
export default function FaqPage() {
  return (
    <>
      <Seo route="faq" />
      <Helmet>
        {buildFaqStructuredData().map((schema) => (
          <script key={schema['@type']} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
      </Helmet>

      <PageHeader
        label="FAQ"
        title="Frequently asked questions."
        description="What DeskScholar is, how the three planned editions differ, and where the prototype stands. No prices are published while the product is still in development."
      />

      <Section id="faq" tone="dark" ariaLabel="Frequently asked questions">
        <div className="mx-auto flex max-w-3xl flex-col">
          {faqs.map((faq) => (
            <details key={faq.id} className="group overflow-hidden border-b border-[var(--hairline-dark)]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-[17px] font-semibold text-text-hi transition-colors duration-micro ease-io hover:text-beam focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-beam [&::-webkit-details-marker]:hidden">
                <span>{faq.question}</span>
                <span
                  className="shrink-0 text-text-lo transition-transform duration-fast ease-io group-open:-rotate-180 motion-reduce:transition-none"
                  aria-hidden="true"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <p className="pb-5 pr-8 text-sm leading-relaxed text-text-lo">{faq.answer}</p>
            </details>
          ))}
        </div>

        <p className="mx-auto mt-[var(--gap-intro-body)] max-w-3xl text-sm text-text-lo">
          Still unsure?{' '}
          <Link
            to="/contact"
            className="font-semibold text-beam underline-offset-4 transition-colors duration-micro ease-io hover:underline hover:text-[var(--beam-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-beam"
          >
            Ask the team directly
          </Link>{' '}
          — we answer education, research, hardware and product enquiries.
        </p>
      </Section>
    </>
  );
}
