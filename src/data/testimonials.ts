export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

// Replace these with real client testimonials when available
export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'James M.',
    role: 'Homeowner — Roswell, GA',
    quote:
      'Amana Construction handled our whole-home renovation flawlessly. On budget, on time, and the crew was respectful of our home every single day. Highly recommend.',
  },
  {
    name: 'Sarah K.',
    role: 'Property Investor — Alpharetta, GA',
    quote:
      "We've worked with Amana on three investment properties now. Their attention to detail and honest pricing keeps bringing us back. True professionals.",
  },
  {
    name: 'David R.',
    role: 'Business Owner — Sandy Springs, GA',
    quote:
      "They built out our office space on a tight timeline and didn't cut a single corner. Clear communication throughout. The result exceeded our expectations.",
  },
];
