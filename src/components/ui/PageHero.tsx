import Image from 'next/image';
import Link from 'next/link';

interface PageHeroProps {
  title: string;
  breadcrumb: string;
}

export default function PageHero({ title, breadcrumb }: PageHeroProps) {
  return (
    <section className="bg-charcoal relative flex h-48 items-center md:h-64">
      <Image
        src="/assets/img/page-title-bg.jpg"
        alt=""
        fill
        className="object-cover opacity-20"
        priority
      />
      <div className="relative mx-auto w-full max-w-6xl px-6">
        <h1 className="text-3xl font-bold text-white md:text-4xl">{title}</h1>
        <nav className="mt-2 text-sm text-white/60" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-gold transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gold">{breadcrumb}</span>
        </nav>
      </div>
    </section>
  );
}
