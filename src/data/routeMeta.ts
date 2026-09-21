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
    title: 'DeskScholar | Offline-First AI Learning Companion',
    description:
      'DeskScholar is an offline-first AI learning companion being designed for voice, worksheet understanding and projected guidance on real study desks.',
  },
  technology: {
    path: '/technology',
    title: 'Technology — DeskScholar',
    description:
      'Explore the offline-first architecture behind DeskScholar: local speech recognition, local OCR, on-device tutoring, optional cloud reasoning, privacy principles, and prototype hardware.',
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
      'DeskScholar is a product-focused final-year engineering project. Follow the development timeline, prototype gallery, and planned evaluation areas.',
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
