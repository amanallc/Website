import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User } from 'lucide-react';
import type { BlogPost } from '@/data/blog';

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="overflow-hidden rounded-lg bg-white shadow-sm">
      <div className="relative h-52">
        <Image src={post.image} alt={post.title} fill className="object-cover" />
      </div>
      <div className="p-5">
        <div className="mb-3 flex gap-4 text-xs text-charcoal/50">
          <span className="flex items-center gap-1">
            <Calendar size={12} /> {post.date}
          </span>
          <span className="flex items-center gap-1">
            <User size={12} /> {post.author}
          </span>
        </div>
        <h3 className="mb-2 font-semibold leading-snug text-charcoal">{post.title}</h3>
        <p className="mb-4 text-sm leading-relaxed text-charcoal/70">{post.excerpt}</p>
        <Link href={post.href} className="text-sm font-medium text-gold hover:text-charcoal transition-colors">
          Read more →
        </Link>
      </div>
    </article>
  );
}
