export const SITE = {
  name: 'Amana Construction',
  tagline: 'Built on Trust',
  description:
    'With over 25 years of experience, Amana Construction is a trusted general contractor serving Roswell and the greater North Atlanta area.',
  phone: '(678) 468-8022',
  phoneHref: 'tel:+16784688022',
  email: 'support@amanaconstruction.us',
  address: 'Roswell, GA',
  serviceArea: 'Roswell · Alpharetta · Milton · Johns Creek · Marietta · Sandy Springs',
} as const;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
] as const;

export const SOCIAL_LINKS = {
  facebook: '#',
  instagram: '#',
  linkedin: '#',
} as const;
