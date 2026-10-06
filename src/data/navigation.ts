export interface NavLink {
  label: string;
  to: string;
}

export const navLinks: NavLink[] = [
  { label: 'Product', to: '/' },
  { label: 'How it works', to: '/#how-it-works' },
  { label: 'Editions', to: '/editions' },
  { label: 'FAQ', to: '/#faq' },
];

export const footerLinkGroups = [
  {
    title: 'Product',
    links: [
      { label: 'Home', to: '/' },
      { label: 'How it works', to: '/#how-it-works' },
      { label: 'Editions', to: '/editions' },
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
