/**
 * Centralized map of the approved final DeskScholar product images.
 * Always reference these public paths — never filesystem-relative imports.
 */
export const deskScholarImages = {
  hero: '/assets/deskscholar/deskscholar-hero-dark.webp',
  sideProfile: '/assets/deskscholar/deskscholar-side-profile.webp',
  rearView: '/assets/deskscholar/deskscholar-rear-view.webp',
  faceDisplay: '/assets/deskscholar/deskscholar-face-display.webp',
  explodedView: '/assets/deskscholar/deskscholar-exploded-view.webp',
  hingeDetail: '/assets/deskscholar/deskscholar-hinge-detail.webp',
  studentUse: '/assets/deskscholar/deskscholar-student-use.webp',
  classroom: '/assets/deskscholar/deskscholar-classroom.webp',
  projectionCloseup: '/assets/deskscholar/deskscholar-projection-closeup.webp',
  /** Generated 1200 × 630 social-share image (og:image / twitter:image). */
  social: '/assets/deskscholar/og-deskscholar.webp',
} as const;

/** Responsive srcset entries for the three largest photos (720w variant served on phones). */
export const deskScholarImageSrcSets = {
  hero: '/assets/deskscholar/deskscholar-hero-dark-720.webp 720w, /assets/deskscholar/deskscholar-hero-dark.webp 1407w',
  studentUse: '/assets/deskscholar/deskscholar-student-use-720.webp 720w, /assets/deskscholar/deskscholar-student-use.webp 2000w',
  classroom: '/assets/deskscholar/deskscholar-classroom-720.webp 720w, /assets/deskscholar/deskscholar-classroom.webp 2000w',
  projectionCloseup:
    '/assets/deskscholar/deskscholar-projection-closeup-720.webp 720w, /assets/deskscholar/deskscholar-projection-closeup.webp 2000w',
} as const;

/** Default viewport widths for srcset selection, overridable per placement. */
export const DESK_IMAGE_SIZES = '(min-width: 1280px) 590px, (min-width: 768px) 46vw, calc(100vw - 40px)';

/** Natural aspect ratios (w/h) — matching containers to these prevents any cropping. */
export const deskScholarImageRatios = {
  hero: '1407 / 768',
  sideProfile: '1407 / 768',
  rearView: '1407 / 768',
  faceDisplay: '1407 / 768',
  explodedView: '1407 / 768',
  hingeDetail: '1407 / 768',
  studentUse: '2000 / 1116',
  classroom: '2000 / 1116',
  projectionCloseup: '2000 / 1244',
} as const;
