import { BLOG_POSTS } from '@/data/blog';
import BlogCard from '@/components/ui/BlogCard';

export default function RecentBlog() {
  return (
    <section className="bg-linen py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">
            Resources
          </p>
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">From Our Blog</h2>
          <p className="mx-auto mt-3 max-w-xl text-charcoal/70">
            Tips, guides, and insights for homeowners and business owners in the North Atlanta area.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
