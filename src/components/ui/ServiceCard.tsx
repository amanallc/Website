import Link from 'next/link';
import {
  Building2,
  Hammer,
  Home,
  Briefcase,
  ArrowUpRight,
  Trees,
  type LucideIcon,
} from 'lucide-react';
import type { Service } from '@/data/services';

const ICON_MAP: Record<string, LucideIcon> = {
  Building2,
  Hammer,
  Home,
  Briefcase,
  ArrowUpRight,
  Trees,
};

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = ICON_MAP[service.icon] ?? Building2;
  return (
    <div className="group rounded-lg border border-white/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md bg-gold/10 text-gold">
        <Icon size={24} />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-charcoal">{service.title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-charcoal/70">{service.description}</p>
      <Link
        href={service.href}
        className="text-sm font-medium text-gold transition-colors hover:text-charcoal"
      >
        Learn more →
      </Link>
    </div>
  );
}
