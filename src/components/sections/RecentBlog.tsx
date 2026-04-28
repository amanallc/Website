import { BLOG_POSTS } from '@/data/blog';
import BlogCard from '@/components/ui/BlogCard';

export default function RecentBlog() {
  return (
    <section className="bg-linen py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <p className="text-gold mb-2 text-sm font-semibold tracking-widest uppercase">
            Resources
          </p>
          <h2 className="text-charcoal text-3xl font-bold md:text-4xl">From Our Blog</h2>
          <p className="text-charcoal/70 mx-auto mt-3 max-w-xl">
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
