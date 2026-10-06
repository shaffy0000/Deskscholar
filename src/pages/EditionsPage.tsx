import { ArrowRight } from 'lucide-react';
import { editions, comparisonRows } from '../data/editions';
import { deskScholarImages, deskScholarImageSrcSets } from '../data/assets';
import { Button } from '../components/common/Button';
import { Container } from '../components/common/Container';
import { Section } from '../components/common/Section';
import { Seo } from '../components/common/Seo';

const editionImages: Record<string, { src: string; srcSet?: string; alt: string }> = {
  connect: {
    src: deskScholarImages.classroom,
    srcSet: deskScholarImageSrcSets.classroom,
    alt: 'DeskScholar in a classroom setting.',
  },
  hybrid: {
    src: deskScholarImages.projectionCloseup,
    srcSet: deskScholarImageSrcSets.projectionCloseup,
    alt: 'DeskScholar projecting guidance onto a worksheet.',
  },
  independent: {
    src: deskScholarImages.studentUse,
    srcSet: deskScholarImageSrcSets.studentUse,
    alt: 'A student using DeskScholar independently.',
  },
};

export default function EditionsPage() {
  return (
    <>
      <Seo route="editions" />

      {/* Page header */}
      <section className="bg-ink-900 pb-12 pt-28 lg:pt-36">
        <Container>
          <h1 className="max-w-3xl font-display text-display font-bold tracking-tight text-text-hi">
            Three editions, one idea.
          </h1>
          <p className="mt-5 max-w-2xl text-body-lg text-text-lo">
            Every DeskScholar edition sees the desk, hears the student, and
            projects guidance. They differ only in where the thinking happens.
          </p>
        </Container>
      </section>

      {/* Edition sections — alternating layout */}
      {editions.map((edition, index) => {
        const img = editionImages[edition.slug];
        const isEven = index % 2 === 0;
        return (
          <Section
            key={edition.slug}
            tone={index === 1 ? 'light' : 'dark'}
            bordered
          >
            <div
              className={`grid items-center gap-10 lg:grid-cols-12 lg:gap-16 ${
                isEven ? '' : 'lg:[direction:rtl] lg:[&>*]:![direction:ltr]'
              }`}
            >
              {/* Text side */}
              <div className="lg:col-span-5">
                <h2
                  className={`font-display text-h2 font-bold ${
                    index === 1 ? 'text-ink-hi' : 'text-text-hi'
                  }`}
                >
                  {edition.name}
                </h2>
                <p
                  className={`mt-4 text-body-lg leading-relaxed ${
                    index === 1 ? 'text-ink-lo' : 'text-text-lo'
                  }`}
                >
                  {edition.description}
                </p>

                {/* Three facts */}
                <ul className="mt-8 space-y-3">
                  {edition.facts.map((fact) => (
                    <li
                      key={fact}
                      className={`flex items-start gap-3 text-sm ${
                        index === 1 ? 'text-ink-hi' : 'text-text-hi'
                      }`}
                    >
                      <span
                        className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-beam"
                        aria-hidden="true"
                      />
                      {fact}
                    </li>
                  ))}
                </ul>

                {/* Subscription line */}
                <div
                  className="mt-8 rounded-card border p-4"
                  style={{
                    borderColor:
                      index === 1
                        ? 'var(--hairline-light)'
                        : 'var(--hairline-dark)',
                  }}
                >
                  <p
                    className={`text-sm font-medium ${
                      index === 1 ? 'text-ink-hi' : 'text-text-hi'
                    }`}
                  >
                    {edition.subscription}
                  </p>
                  <p
                    className={`mt-1 text-micro ${
                      index === 1 ? 'text-ink-lo' : 'text-text-lo'
                    }`}
                  >
                    {edition.subscriptionQualifier}
                  </p>
                </div>
              </div>

              {/* Image side */}
              <div className="lg:col-span-7">
                <img
                  src={img.src}
                  srcSet={img.srcSet}
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  alt={img.alt}
                  width={2000}
                  height={1116}
                  loading="lazy"
                  decoding="async"
                  className="w-full rounded-card object-cover"
                />
              </div>
            </div>
          </Section>
        );
      })}

      {/* Pricing explanation */}
      <Section tone="dark" bordered>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-body-lg text-text-lo">
            The editions that depend on our servers carry a monthly cost because
            those servers cost us money every month. The edition that depends on
            nothing carries none.
          </p>
          <p className="mt-3 text-micro text-text-lo">
            Planned pricing for a product still in development. Not an offer.
          </p>
        </div>
      </Section>

      {/* Comparison table */}
      <Section
        tone="dark"
        bordered
        heading={{
          title: 'Honest comparison',
          description:
            'Seven things that matter, in plain language. No ticks and crosses.',
          align: 'center',
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">
              Comparison of DeskScholar Connect, Hybrid and Independent editions
            </caption>
            <thead>
              <tr
                className="border-b"
                style={{ borderColor: 'var(--hairline-dark)' }}
              >
                <th
                  scope="col"
                  className="sticky left-0 bg-ink-900 py-4 pr-4 text-micro font-medium text-text-lo lg:w-56"
                >
                  &nbsp;
                </th>
                {editions.map((ed) => (
                  <th
                    key={ed.slug}
                    scope="col"
                    className="px-4 py-4 font-display text-sm font-semibold text-text-hi"
                  >
                    {ed.name.replace('DeskScholar ', '')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr
                  key={row.label}
                  className="border-b"
                  style={{ borderColor: 'var(--hairline-dark)' }}
                >
                  <td className="sticky left-0 bg-ink-900 py-4 pr-4 text-sm font-medium text-text-hi lg:w-56">
                    {row.label}
                  </td>
                  <td className="px-4 py-4 text-sm text-text-lo">
                    {row.connect}
                  </td>
                  <td className="px-4 py-4 text-sm text-text-lo">
                    {row.hybrid}
                  </td>
                  <td className="px-4 py-4 text-sm text-text-lo">
                    {row.independent}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* CTA */}
      <Section tone="dark" bordered>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-h2 font-bold text-text-hi">
            Not sure which edition fits?
          </h2>
          <p className="mt-4 text-body-lg text-text-lo">
            Start with the connectivity question. If your internet is
            unreliable, Independent is the clear choice. If privacy matters most,
            Hybrid keeps images on the device. If you need the strongest answers
            in a school with Wi-Fi, Connect is built for that.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" to="/contact">
              Join Early Access
            </Button>
            <Button size="lg" variant="quiet" to="/#faq">
              Read the FAQ
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
          <p className="mt-6 text-micro text-text-lo">
            Currently in prototype development. Final specifications may change.
          </p>
        </div>
      </Section>
    </>
  );
}
