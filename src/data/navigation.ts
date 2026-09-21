export interface NavLink {
  label: string;
  to: string;
}

/** Primary navigation links (hash links point at home-page sections). */
export const navLinks: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'How It Works', to: '/#how-it-works' },
  { label: 'Technology', to: '/technology' },
  { label: 'For Schools', to: '/schools' },
  { label: 'Our Journey', to: '/journey' },
  { label: 'Team', to: '/team' },
  { label: 'FAQ', to: '/#faq' },
];

export const footerLinkGroups: Array<{ title: string; links: NavLink[] }> = [
  {
    title: 'Product',
    links: [
      { label: 'Home', to: '/' },
      { label: 'How It Works', to: '/#how-it-works' },
      { label: 'Interactive Demo', to: '/#demo' },
      { label: 'Technology', to: '/technology' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'For Schools', to: '/schools' },
      { label: 'Our Journey', to: '/journey' },
      { label: 'About & Team', to: '/team' },
      { label: 'FAQ', to: '/#faq' },
      { label: 'Contact', to: '/contact' },
    ],
  },
];
