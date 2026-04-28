export type ProjectCategory = 'all' | 'construction' | 'remodeling' | 'commercial';

export interface Project {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'all'>;
  image: string;
  description: string;
}

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Foundation & Structural Work',
    category: 'construction',
    image: '/assets/img/real/project-foundation.jpeg',
    description: 'Rebar framework and concrete foundation for a custom home in Roswell, GA.',
  },
  {
    id: '2',
    title: 'Site Excavation',
    category: 'construction',
    image: '/assets/img/real/project-excavation.jpeg',
    description: 'Full site preparation and excavation for a new residential build.',
  },
  {
    id: '3',
    title: 'Concrete Formwork',
    category: 'construction',
    image: '/assets/img/real/project-formwork.jpeg',
    description: 'Trench and rebar formwork for a concrete foundation system.',
  },
  {
    id: '4',
    title: 'Land Grading',
    category: 'construction',
    image: '/assets/img/real/project-grading.jpeg',
    description: 'Precision grading and site leveling for a residential development.',
  },
  {
    id: '5',
    title: 'Erosion Control & Site Prep',
    category: 'construction',
    image: '/assets/img/real/project-erosion.jpeg',
    description:
      'Erosion control measures and environmental compliance during active construction.',
  },
  {
    id: '6',
    title: 'Drainage System Installation',
    category: 'construction',
    image: '/assets/img/real/project-drainage.jpeg',
    description: 'Corrugated drainage pipe installation and gravel bedding.',
  },
  {
    id: '7',
    title: 'Luxury Residential Build',
    category: 'construction',
    image: '/assets/img/real/house-about.jpeg',
    description: 'Multi-garage luxury home completed in the North Atlanta suburbs.',
  },
  {
    id: '8',
    title: 'Commercial Salon Build-Out',
    category: 'commercial',
    image: '/assets/img/real/project-salon.jpeg',
    description: 'Full interior build-out for a modern hair salon with custom privacy dividers.',
  },
  {
    id: '9',
    title: 'Commercial Interior Project',
    category: 'commercial',
    image: '/assets/img/real/project-commercial.jpeg',
    description: 'Commercial interior installation and finish work.',
  },
  {
    id: '10',
    title: 'Site Work & Earth Moving',
    category: 'construction',
    image: '/assets/img/real/project-bulldozers.jpeg',
    description: 'Large-scale site work with heavy equipment for a new development.',
  },
  {
    id: '11',
    title: 'Concrete Pile Installation',
    category: 'construction',
    image: '/assets/img/real/project-piles.jpeg',
    description: 'Concrete pile layout and preparation ahead of foundation pour.',
  },
  {
    id: '12',
    title: 'Structural Remodel',
    category: 'remodeling',
    image: '/assets/img/real/project-14.jpeg',
    description: 'Structural renovation and interior remodel for a residential property.',
  },
];
