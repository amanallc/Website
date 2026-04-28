'use client';

import { useState } from 'react';
import { PROJECTS, type ProjectCategory } from '@/data/projects';
import ProjectCard from '@/components/ui/ProjectCard';

const FILTERS: { label: string; value: ProjectCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Construction', value: 'construction' },
  { label: 'Remodeling', value: 'remodeling' },
  { label: 'Commercial', value: 'commercial' },
];

export default function Portfolio() {
  const [active, setActive] = useState<ProjectCategory>('all');
  const filtered = active === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">Portfolio</p>
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">Our Projects</h2>
        </div>

        {/* Filter buttons */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`rounded px-5 py-2 text-sm font-semibold transition-colors ${
                active === f.value
                  ? 'bg-gold text-charcoal'
                  : 'border border-charcoal/10 bg-white text-charcoal/60 hover:text-charcoal'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
