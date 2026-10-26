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
    title: 'DeskScholar — Offline AI Tutor for Students in Pakistan',
    description:
      'A screen-free AI tutor device being built in Pakistan. It reads worksheets, explains in English and Urdu, and projects step-by-step hints — even offline.',
  },
  editions: {
    path: '/editions',
    title: 'Editions — Offline, Hybrid & Online AI Tutor | DeskScholar',
    description:
      'Compare DeskScholar Connect, Hybrid and Independent — from an online AI tutor for schools with Wi-Fi to an AI tutor that works without internet at home.',
  },
  technology: {
    path: '/technology',
    title: 'How It Works — AI Tutor That Reads Worksheets | DeskScholar',
    description:
      'How DeskScholar reads worksheets and handwriting, understands spoken English and Urdu questions, and projects step-by-step guidance onto the desk.',
  },
  schools: {
    path: '/schools',
    title: 'Offline AI Learning Device for Schools in Pakistan | DeskScholar',
    description:
      'An offline-capable AI learning device for classrooms, libraries and labs in Pakistan — English and Urdu support, no student phones needed. Register pilot interest.',
  },
  journey: {
    path: '/journey',
    title: 'Our Journey — COMSATS Final-Year Project | DeskScholar',
    description:
      'How DeskScholar grew from a COMSATS Lahore computer engineering final-year project into an offline AI tutor device: timeline, prototype gallery and evaluation plan.',
  },
  team: {
    path: '/team',
    title: 'Meet the Team — COMSATS Lahore Engineers | DeskScholar',
    description:
      'Meet the four COMSATS University Islamabad, Lahore Campus computer engineering students building DeskScholar, an offline AI tutor device for students.',
  },
  contact: {
    path: '/contact',
    title: 'Join the Waitlist — DeskScholar AI Tutor',
    description:
      'Join the DeskScholar waitlist for prototype updates and testing invitations, or contact the team about schools, research, hardware and partnerships.',
  },
  faq: {
    path: '/faq',
    title: 'FAQ — Offline, Urdu & Screen-Free AI Tutor | DeskScholar',
    description:
      'Does DeskScholar work without internet? Does it explain in Urdu? Is it screen-free? Answers about the planned AI tutor device, privacy, editions and availability.',
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
