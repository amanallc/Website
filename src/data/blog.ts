export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  href: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: '5 Questions to Ask Before Hiring a General Contractor',
    excerpt:
      'Choosing the right contractor can make or break your project. Here are the five most important questions to ask before signing any contract.',
    date: 'March 15, 2026',
    author: 'Amana Construction',
    image: '/assets/img/blog/blog-1.jpg',
    href: '#',
  },
  {
    id: '2',
    title: 'What to Expect During a Home Addition Project',
    excerpt:
      'Adding square footage to your home is a major investment. This guide walks you through the process from permits to final inspection.',
    date: 'February 28, 2026',
    author: 'Amana Construction',
    image: '/assets/img/blog/blog-2.jpg',
    href: '#',
  },
  {
    id: '3',
    title: 'Kitchen Remodel Trends for North Atlanta Homes in 2026',
    excerpt:
      "From quartz countertops to open layouts, here's what Roswell and Alpharetta homeowners are choosing for their kitchen renovations this year.",
    date: 'February 10, 2026',
    author: 'Amana Construction',
    image: '/assets/img/blog/blog-3.jpg',
    href: '#',
  },
];
