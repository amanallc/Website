import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

const FEATURES = [
  'Transparent pricing — no hidden costs',
  'Licensed & insured in the state of Georgia',
  'Dedicated project manager on every job',
  'Clean, organized worksites daily',
  'On-time delivery commitment',
  'Warranty on all completed work',
];

export default function AltServices() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative h-80 overflow-hidden rounded-lg lg:h-full lg:min-h-[420px]">
            <Image
              src="/assets/img/alt-services.jpg"
              alt="Construction quality"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">
              Why Choose Us
            </p>
            <h2 className="mb-4 text-3xl font-bold text-charcoal md:text-4xl">
              Quality You Can Count On
            </h2>
            <p className="mb-6 leading-relaxed text-charcoal/70">
              At Amana Construction, we don&rsquo;t just build structures — we build trust. Every project
              is handled with the same care and professionalism we&rsquo;d bring to our own home.
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-charcoal/80">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-gold" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
