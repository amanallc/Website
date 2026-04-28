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
      <div className="bg-gold/10 text-gold mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md">
        <Icon size={24} />
      </div>
      <h3 className="text-charcoal mb-2 text-lg font-semibold">{service.title}</h3>
      <p className="text-charcoal/70 mb-4 text-sm leading-relaxed">{service.description}</p>
      <Link
        href={service.href}
        className="text-gold hover:text-charcoal text-sm font-medium transition-colors"
      >
        Learn more →
      </Link>
    </div>
  );
}
