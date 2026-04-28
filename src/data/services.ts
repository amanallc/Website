export interface Service {
  icon: string;
  title: string;
  description: string;
  href: string;
}

export const SERVICES: Service[] = [
  {
    icon: 'Building2',
    title: 'General Contracting',
    description:
      "Full-service project oversight from pre-construction through final walkthrough. We coordinate scheduling, subcontractors, materials, and inspections so you don't have to.",
    href: '/services#general-contracting',
  },
  {
    icon: 'Hammer',
    title: 'Home Renovation & Remodeling',
    description:
      'Kitchen, bath, basement, and whole-home renovations across Roswell, Alpharetta, and surrounding North Atlanta communities. Quality materials, skilled tradespeople.',
    href: '/services#renovation',
  },
  {
    icon: 'Home',
    title: 'New Home Construction',
    description:
      'Custom homes built to your specifications. We manage every phase with precision, transparent pricing, and clear communication from groundbreaking to move-in.',
    href: '/services#new-construction',
  },
  {
    icon: 'Briefcase',
    title: 'Commercial Build-Outs',
    description:
      'Office spaces, retail locations, restaurants, and tenant improvements. We work around your business schedule to minimize disruption and meet your deadline.',
    href: '/services#commercial',
  },
  {
    icon: 'ArrowUpRight',
    title: 'Home Additions',
    description:
      "Seamlessly expand your living space with additions that match your home's existing architecture and style. From sunrooms to second stories.",
    href: '/services#additions',
  },
  {
    icon: 'Trees',
    title: 'Outdoor Living Spaces',
    description:
      "Decks, patios, pergolas, and hardscaping that bring Georgia's beautiful outdoors into your home life. Designed to last through every season.",
    href: '/services#outdoor',
  },
];
