import Image from 'next/image';
import Link from 'next/link';
import { NAV_LINKS, SITE } from '@/lib/constants';
import MobileNav from './MobileNav';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-charcoal shadow-md">
      <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/brand/amana-logo.png"
            alt="Amana Construction"
            width={2000}
            height={2000}
            className="h-10 w-auto"
            priority
          />
          <span className="text-lg font-semibold text-white">{SITE.name}</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-white/80 transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              className="rounded bg-gold px-4 py-2 text-sm font-semibold text-charcoal transition-opacity hover:opacity-90"
            >
              Free Estimate
            </Link>
          </li>
        </ul>

        <MobileNav />
      </nav>
    </header>
  );
}
