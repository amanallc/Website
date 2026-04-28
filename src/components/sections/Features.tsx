'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

const TABS = [
  {
    label: 'Planning',
    heading: 'Thorough Pre-Construction Planning',
    body: 'We invest time upfront to understand your goals, review site conditions, and plan every detail before breaking ground. This eliminates costly surprises and keeps your project on schedule.',
    bullets: [
      'Site assessment & feasibility review',
      'Detailed scope of work',
      'Permit coordination',
      'Budget development',
    ],
    image: '/assets/img/features-1.jpg',
  },
  {
    label: 'Execution',
    heading: 'Skilled Execution on Every Phase',
    body: 'Our crews bring decades of hands-on experience to every phase of construction. We self-perform key scopes and closely manage all subcontractors to maintain quality and timeline.',
    bullets: [
      'Daily site supervision',
      'Quality control checkpoints',
      'Subcontractor management',
      'Progress reporting',
    ],
    image: '/assets/img/features-2.jpg',
  },
  {
    label: 'Materials',
    heading: 'Durable, Quality Materials',
    body: 'We use materials that are built to last — no shortcuts, no cheap substitutes. Our supplier relationships give us access to quality products at competitive pricing.',
    bullets: [
      'Code-compliant materials',
      'Vetted supplier network',
      'Energy-efficient options available',
      'Warranty-backed products',
    ],
    image: '/assets/img/features-3.jpg',
  },
  {
    label: 'Delivery',
    heading: 'On-Time, On-Budget Delivery',
    body: 'We take our commitments seriously. Our project management system tracks milestones, flags issues early, and keeps your project moving toward a clean, on-time finish.',
    bullets: [
      'Milestone scheduling',
      'Budget tracking & reporting',
      'Clean final walkthrough',
      '1-year craftsmanship warranty',
    ],
    image: '/assets/img/features-4.jpg',
  },
];

export default function Features() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <section className="bg-linen py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <p className="text-gold mb-2 text-sm font-semibold tracking-widest uppercase">
            Our Process
          </p>
          <h2 className="text-charcoal text-3xl font-bold md:text-4xl">How We Work</h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Tabs + content */}
          <div>
            <div className="mb-6 flex flex-wrap gap-2">
              {TABS.map((t, i) => (
                <button
                  key={t.label}
                  onClick={() => setActive(i)}
                  className={`rounded px-4 py-2 text-sm font-semibold transition-colors ${
                    active === i
                      ? 'bg-gold text-charcoal'
                      : 'text-charcoal/60 hover:text-charcoal bg-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <h3 className="text-charcoal mb-3 text-xl font-bold">{tab.heading}</h3>
            <p className="text-charcoal/70 mb-5 leading-relaxed">{tab.body}</p>
            <ul className="space-y-2">
              {tab.bullets.map((b) => (
                <li key={b} className="text-charcoal/80 flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-gold shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          {/* Image */}
          <div className="relative h-80 overflow-hidden rounded-lg lg:h-auto">
            <Image src={tab.image} alt={tab.heading} fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
