import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import ServiceCard from '@/components/ui/ServiceCard';
import AltServices from '@/components/sections/AltServices';
import Features from '@/components/sections/Features';
import { SERVICES } from '@/data/services';

export const metadata: Metadata = {
  title: 'Services | Amana Construction — Roswell, GA',
  description:
    'General contracting, renovation, new construction, commercial build-outs, and more. Serving Roswell, Alpharetta, and the North Atlanta area.',
};

export default function ServicesPage() {
  return (
    <>
      <PageHero title="Our Services" breadcrumb="Services" />

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <p className="text-gold mb-2 text-sm font-semibold tracking-widest uppercase">
              What We Offer
            </p>
            <h2 className="text-charcoal text-3xl font-bold md:text-4xl">
              Full-Service Construction
            </h2>
            <p className="text-charcoal/70 mx-auto mt-3 max-w-xl">
              Whether you&rsquo;re renovating a single room or building from the ground up, Amana
              Construction has the experience and crew to get it done right.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>

      <AltServices />
      <Features />
    </>
  );
}
