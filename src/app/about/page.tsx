import type { Metadata } from 'next';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import StatsSection from '@/components/sections/StatsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';

export const metadata: Metadata = {
  title: 'About Us | Amana Construction — Roswell, GA',
  description:
    'Learn about Amana Construction — 25+ years of trusted general contracting in Roswell, Alpharetta, and the North Atlanta area.',
};

const VALUES = [
  'Honest pricing with no hidden fees',
  'Clear communication at every stage',
  'Skilled, background-checked tradespeople',
  'Fully licensed and insured in Georgia',
  'Residential and commercial expertise',
  'Clean worksites — every day, every project',
];

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Us" breadcrumb="About" />

      {/* About story */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative h-80 overflow-hidden rounded-lg lg:h-[500px]">
              <Image
                src="/assets/img/real/house-about.jpeg"
                alt="Amana Construction completed project"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-gold mb-2 text-sm font-semibold tracking-widest uppercase">
                Our Story
              </p>
              <h2 className="text-charcoal mb-4 text-3xl font-bold md:text-4xl">
                25+ Years of Building Trust
              </h2>
              <p className="text-charcoal/70 mb-4 leading-relaxed">
                With over 25 years of experience in the construction industry, Amana Construction
                has become a trusted name serving Roswell and the greater North Atlanta area. Our
                team brings the knowledge, skills, and expertise to handle any project — residential
                or commercial, big or small.
              </p>
              <p className="text-charcoal/70 mb-6 leading-relaxed">
                We have completed numerous projects ranging from custom homes and major renovations
                to commercial build-outs across Alpharetta, Milton, Johns Creek, Marietta, and
                surrounding communities. Our clients come back — and they send their neighbors.
              </p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {VALUES.map((v) => (
                  <li key={v} className="text-charcoal/80 flex items-start gap-2 text-sm">
                    <CheckCircle2 size={16} className="text-gold mt-0.5 shrink-0" />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <StatsSection />
      <TestimonialsSection />
    </>
  );
}
