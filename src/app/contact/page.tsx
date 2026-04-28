import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import ContactForm from '@/components/ui/ContactForm';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact | Amana Construction — Roswell, GA',
  description:
    'Contact Amana Construction for a free estimate. Serving Roswell, Alpharetta, Milton, and the North Atlanta area. Call (678) 468-8022.',
};

const INFO = [
  { icon: Phone, label: 'Phone', value: SITE.phone, href: SITE.phoneHref },
  { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: MapPin, label: 'Location', value: SITE.address, href: undefined },
  { icon: Clock, label: 'Hours', value: 'Mon–Sat: 8am – 6pm', href: undefined },
];

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Us" breadcrumb="Contact" />

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left: info */}
            <div>
              <p className="text-gold mb-2 text-sm font-semibold tracking-widest uppercase">
                Get in Touch
              </p>
              <h2 className="text-charcoal mb-4 text-3xl font-bold md:text-4xl">
                Request a Free Estimate
              </h2>
              <p className="text-charcoal/70 mb-8 leading-relaxed">
                Ready to start your project? Fill out the form and we&rsquo;ll respond within one
                business day. Prefer to call? Reach us at{' '}
                <a href={SITE.phoneHref} className="text-gold font-semibold hover:underline">
                  {SITE.phone}
                </a>
                .
              </p>

              <ul className="space-y-5">
                {INFO.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-4">
                    <div className="bg-gold/10 text-gold flex h-10 w-10 shrink-0 items-center justify-center rounded-md">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-charcoal/50 text-xs font-semibold tracking-wider uppercase">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="text-charcoal hover:text-gold font-medium transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-charcoal font-medium">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <p className="text-charcoal/50 mb-2 text-sm font-semibold tracking-wider uppercase">
                  Service Area
                </p>
                <p className="text-charcoal/70 text-sm leading-relaxed">{SITE.serviceArea}</p>
              </div>
            </div>

            {/* Right: form */}
            <div className="rounded-lg bg-white p-8 shadow-md">
              <h3 className="text-charcoal mb-6 text-xl font-semibold">Send Us a Message</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
