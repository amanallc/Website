import Link from 'next/link';
import { SERVICES } from '@/data/services';
import ServiceCard from '@/components/ui/ServiceCard';

export default function ServicesSection() {
  return (
    <section className="bg-linen py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <p className="text-gold mb-2 text-sm font-semibold tracking-widest uppercase">
            What We Do
          </p>
          <h2 className="text-charcoal text-3xl font-bold md:text-4xl">Our Services</h2>
          <p className="text-charcoal/70 mx-auto mt-3 max-w-xl">
            From new construction to remodeling, we deliver quality craftsmanship across every
            project type.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="bg-gold text-charcoal inline-block rounded px-8 py-3 font-semibold transition-opacity hover:opacity-90"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
