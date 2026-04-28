import Link from 'next/link';
import { SERVICES } from '@/data/services';
import ServiceCard from '@/components/ui/ServiceCard';

export default function ServicesSection() {
  return (
    <section className="bg-linen py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">
            What We Do
          </p>
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">Our Services</h2>
          <p className="mx-auto mt-3 max-w-xl text-charcoal/70">
            From new construction to remodeling, we deliver quality craftsmanship across every project type.
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
            className="inline-block rounded bg-gold px-8 py-3 font-semibold text-charcoal transition-opacity hover:opacity-90"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
