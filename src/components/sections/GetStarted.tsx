import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import ContactForm from '@/components/ui/ContactForm';
import { SITE } from '@/lib/constants';

const BULLETS = [
  'Free estimates with no obligation',
  '25+ years serving North Atlanta',
  'Licensed, insured, and fully bonded',
  'Clear communication throughout every project',
];

export default function GetStarted() {
  return (
    <section className="bg-linen py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: info */}
          <div>
            <p className="text-gold mb-2 text-sm font-semibold tracking-widest uppercase">
              Get Started
            </p>
            <h2 className="text-charcoal mb-4 text-3xl font-bold md:text-4xl">
              Request a Free Estimate
            </h2>
            <p className="text-charcoal/70 mb-6 leading-relaxed">
              {SITE.description} We&rsquo;re ready to help with your next residential or commercial
              project. Fill out the form and we&rsquo;ll follow up within one business day.
            </p>
            <ul className="mb-8 space-y-3">
              {BULLETS.map((b) => (
                <li key={b} className="text-charcoal/80 flex items-start gap-3 text-sm">
                  <CheckCircle2 size={18} className="text-gold mt-0.5 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="relative h-56 overflow-hidden rounded-lg">
              <Image
                src="/assets/img/real/house-about.jpeg"
                alt="Completed construction project"
                fill
                className="object-cover"
              />
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
  );
}
