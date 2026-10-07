export interface NavLink {
  label: string;
  to: string;
}

export interface ProductMenuEntry extends NavLink {
  description: string;
}

/** Top navigation (Product is a disclosure panel in the Navbar). FAQ links to the dedicated /faq route. */
export const navLinks: NavLink[] = [
  { label: 'Editions', to: '/editions' },
  { label: 'Our story', to: '/journey' },
  { label: 'FAQ', to: '/faq' },
];

/** Entries inside the Product disclosure panel — experience pages only, not a nav duplicate. */
export const productMenu: ProductMenuEntry[] = [
  {
    label: 'Planned experience',
    description: 'See the planned learning loop, step by step.',
    to: '/#planned-experience',
  },
  {
    label: 'Technology',
    description: 'How reading, understanding and projection are planned to work.',
    to: '/technology',
  },
  {
    label: 'For Schools',
    description: 'Pilot interest for classrooms and tuition centres.',
    to: '/schools',
  },
];

export const footerLinkGroups: Array<{ title: string; links: NavLink[] }> = [
  {
    title: 'Product',
    links: [
      { label: 'Overview', to: '/' },
      { label: 'Planned experience', to: '/#planned-experience' },
      { label: 'Editions', to: '/editions' },
      { label: 'Technology', to: '/technology' },
      { label: 'For Schools', to: '/schools' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Our story', to: '/journey' },
      { label: 'Team', to: '/team' },
      { label: 'FAQ', to: '/faq' },
    ],
  },
];

/**
 * Social destinations recovered from the project's committed history
 * (footer commits 0fcfcd9 / 24ccc74) and structuredData sameAs — verified, not invented.
 */
export const socialLinks: Array<{ label: string; href: string }> = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/desk-scholar/' },
  { label: 'Instagram', href: 'https://www.instagram.com/desk.scholar/' },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UCp5X3aAfk8fM2NGXqf9YOpg' },
];

export const CONTACT_EMAIL = 'info@deskscholar.com';
