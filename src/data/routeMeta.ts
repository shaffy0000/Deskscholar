/**
 * Single source of truth for per-route SEO metadata.
 * Used at runtime by <Seo route="…"> AND at build time by scripts/prerender.mjs,
 * so raw server HTML and the client always agree.
 */
export interface RouteMeta {
  /** URL path; '' = home. Must be unique. */
  path: string;
  title: string;
  description: string;
  /** Error pages stay indexable-clean: marked noindex and excluded from the sitemap. */
  noindex?: boolean;
}

export const routeMeta = {
  home: {
    path: '/',
    title: 'DeskScholar | Offline-First AI Learning Companion — Three Editions',
    description:
      'DeskScholar is an offline-first AI learning companion in three editions — Connect, Hybrid and Independent — designed for voice, worksheet understanding and projected guidance on real study desks.',
  },
  editions: {
    path: '/editions',
    title: 'Editions — DeskScholar Connect, Hybrid & Independent',
    description:
      'Compare three DeskScholar editions: Connect for schools with reliable Wi-Fi, Hybrid for households wanting privacy, and Independent for homes with unreliable internet or no data relationship.',
  },
  technology: {
    path: '/technology',
    title: 'Technology — DeskScholar',
    description:
      'How DeskScholar reads the page, understands the question and projects guidance — and how the pipeline differs across the Connect, Hybrid and Independent editions.',
  },
  schools: {
    path: '/schools',
    title: 'For Schools — DeskScholar',
    description:
      'DeskScholar is being explored as an offline-capable AI learning companion for classrooms, libraries, labs, and shared study spaces. Register pilot interest.',
  },
  journey: {
    path: '/journey',
    title: 'Our Journey — DeskScholar',
    description:
      'How DeskScholar grew from a final-year engineering project into an early-stage learning product. Follow the development timeline, prototype gallery, and planned evaluation areas.',
  },
  team: {
    path: '/team',
    title: 'Meet the DeskScholar Team',
    description:
      'Meet the computer engineering team developing DeskScholar, an offline-first AI learning companion for real desk-based learning.',
  },
  contact: {
    path: '/contact',
    title: 'Contact — DeskScholar',
    description:
      'Join DeskScholar early access, express interest in prototype testing, or contact the team about education, research, hardware, product, and investment collaboration.',
  },
  faq: {
    path: '/faq',
    title: 'FAQ — DeskScholar',
    description:
      'Answers about the three planned DeskScholar editions: offline capability, privacy, subscriptions, languages, prototype status, school testing and availability.',
  },
  privacy: {
    path: '/privacy',
    title: 'Privacy Policy — DeskScholar',
    description:
      'Prototype-stage privacy policy for the DeskScholar website: how form submissions are handled, what is not collected, and which third-party services are used.',
  },
  terms: {
    path: '/terms',
    title: 'Terms of Use — DeskScholar',
    description:
      'Prototype-stage terms of use for the DeskScholar website: informational content, no product guarantees, acceptable use, intellectual property, and limitation of liability.',
  },
  specimen: {
    path: '/specimen',
    title: 'Design Specimen (Internal) — DeskScholar',
    description: 'Internal design token and component specimen. Not for publication.',
    noindex: true,
  },
  proposal: {
    path: '/proposal',
    title: 'Redesign Proposal v1 (Internal) — DeskScholar',
    description: 'Internal redesign proposal — desktop hero, mobile hero, tokens and one representative section. Not for publication.',
    noindex: true,
  },
  notFound: {
    path: '/404',
    title: 'Page Not Found — DeskScholar',
    description:
      'The page you were looking for does not exist. Return to the DeskScholar home page or explore the interactive demo.',
    noindex: true,
  },
} satisfies Record<string, RouteMeta>;

export type RouteKey = keyof typeof routeMeta;

/** Pages indexed by search engines and listed in the sitemap (error states excluded). */
export const INDEXABLE_ROUTES: RouteMeta[] = (Object.values(routeMeta) as RouteMeta[]).filter((r) => !r.noindex);
