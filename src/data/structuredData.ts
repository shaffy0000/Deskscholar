import { homeFaqs } from './faq.ts';

/**
 * JSON-LD blocks, generated from visible page content only.
 * Used by the client (HomePage) and by scripts/prerender.mjs so the
 * initial server HTML already contains valid structured data.
 * No ratings, pricing, availability or launch claims — none exist.
 */
export function buildStructuredData(siteUrl: string) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'DeskScholar',
      description:
        'Early-stage EdTech and edge-AI project developing an offline-first AI learning companion. Prototype in development.',
      url: `${siteUrl}/`,
      logo: `${siteUrl}/android-chrome-512x512.png`,
      foundingLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Lahore',
          addressCountry: 'PK',
        },
      },
      // sameAs intentionally omitted: no public social profiles are live yet.
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'DeskScholar',
      url: `${siteUrl}/`,
      inLanguage: 'en',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: homeFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ];
}
