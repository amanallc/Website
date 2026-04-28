import Image from 'next/image';
import Link from 'next/link';
import { PROJECTS } from '@/data/projects';

export default function RecentProjects() {
  const featured = PROJECTS.slice(0, 4);
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">Our Work</p>
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">Recent Projects</h2>
          <p className="mx-auto mt-3 max-w-xl text-charcoal/70">
            From foundations to finishes, here&rsquo;s a look at recent work across the North Atlanta area.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((project) => (
            <div key={project.id} className="relative h-56 overflow-hidden rounded-lg group">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <p className="text-sm font-medium text-white">{project.title}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/projects"
            className="inline-block rounded border-2 border-charcoal px-8 py-3 font-semibold text-charcoal transition-colors hover:bg-charcoal hover:text-white"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
