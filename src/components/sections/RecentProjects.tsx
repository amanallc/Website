import Image from 'next/image';
import Link from 'next/link';
import { PROJECTS } from '@/data/projects';

export default function RecentProjects() {
  const featured = PROJECTS.slice(0, 4);
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <p className="text-gold mb-2 text-sm font-semibold tracking-widest uppercase">Our Work</p>
          <h2 className="text-charcoal text-3xl font-bold md:text-4xl">Recent Projects</h2>
          <p className="text-charcoal/70 mx-auto mt-3 max-w-xl">
            From foundations to finishes, here&rsquo;s a look at recent work across the North
            Atlanta area.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((project) => (
            <div key={project.id} className="group relative h-56 overflow-hidden rounded-lg">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-sm font-medium text-white">{project.title}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/projects"
            className="border-charcoal text-charcoal hover:bg-charcoal inline-block rounded border-2 px-8 py-3 font-semibold transition-colors hover:text-white"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
