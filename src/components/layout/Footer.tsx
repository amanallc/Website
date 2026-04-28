import Image from 'next/image';
import Link from 'next/link';
import { Globe, Share2, Rss, Phone, Mail, MapPin } from 'lucide-react';
import { SITE, NAV_LINKS } from '@/lib/constants';

const SERVICES_LINKS = [
  'General Contracting',
  'Home Renovation',
  'New Construction',
  'Commercial Build-Outs',
  'Home Additions',
  'Outdoor Living',
];

const SERVICE_AREA = [
  'Roswell',
  'Alpharetta',
  'Milton',
  'Johns Creek',
  'Marietta',
  'Sandy Springs',
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Brand */}
          <div>
            <Link href="/" className="mb-4 flex items-center gap-3">
              <Image
                src="/assets/brand/amana-logo.png"
                alt="Amana Construction"
                width={2000}
                height={2000}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mb-4 text-sm leading-relaxed text-white/70">
              {SITE.description}
            </p>
            <div className="space-y-2 text-sm text-white/70">
              <p className="flex items-center gap-2">
                <MapPin size={14} className="text-gold shrink-0" />
                {SITE.address}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-gold shrink-0" />
                <a href={SITE.phoneHref} className="hover:text-gold transition-colors">
                  {SITE.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} className="text-gold shrink-0" />
                <a href={`mailto:${SITE.email}`} className="hover:text-gold transition-colors">
                  {SITE.email}
                </a>
              </p>
            </div>
            <div className="mt-4 flex gap-3">
              <a href="#" aria-label="Facebook" className="text-white/60 hover:text-gold transition-colors">
                <Globe size={18} />
              </a>
              <a href="#" aria-label="Instagram" className="text-white/60 hover:text-gold transition-colors">
                <Share2 size={18} />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-white/60 hover:text-gold transition-colors">
                <Rss size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm text-white/70">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Our Services</h3>
            <ul className="space-y-2 text-sm text-white/70">
              {SERVICES_LINKS.map((s) => (
                <li key={s}>
                  <Link href="/services" className="hover:text-gold transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Service Area */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Service Area</h3>
            <ul className="space-y-2 text-sm text-white/70">
              {SERVICE_AREA.map((city) => (
                <li key={city}>{city}, GA</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-4 text-center text-xs text-white/50 md:flex-row">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. All Rights Reserved.</p>
          <p>{SITE.tagline} &middot; Roswell, GA</p>
        </div>
      </div>
    </footer>
  );
}
