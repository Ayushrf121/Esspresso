import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { blogPosts } from '@/lib/blogData';

// Generate all possible slugs at build time
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// The page component for a single blog post
export default async function BlogPostPage({ params }) {
  // `params` is a promise in Next.js 15+ – await it
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  // If no post matches, show 404
  if (!post) {
    notFound();
  }

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96 bg-coffee-900 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-coffee-900/90 to-coffee-900/70" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-cream/60 hover:text-cream transition-colors mb-4"
            >
              <ArrowLeft size={20} />
              Back to Journal
            </Link>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-cream max-w-3xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-4 text-cream/60">
              <span className="flex items-center gap-1.5">
                <User size={16} />
                {post.author}
              </span>
              <span className="w-1 h-1 rounded-full bg-cream/30" />
              <span className="flex items-center gap-1.5">
                <Calendar size={16} />
                {post.date}
              </span>
              <span className="w-1 h-1 rounded-full bg-cream/30" />
              <span className="flex items-center gap-1.5">
                <Clock size={16} />
                {post.readTime}
              </span>
              <span className="ml-auto bg-gold/20 text-gold px-3 py-1 rounded-full text-sm">
                {post.category}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-3xl">
        <div className="prose prose-coffee max-w-none">
          <p className="text-xl text-coffee-600 font-light leading-relaxed">
            {post.excerpt}
          </p>
          <div className="h-px bg-coffee-200/50 my-8" />
          <div className="text-coffee-700 leading-relaxed space-y-4">
            <p>
              {post.content || 'Full blog content would go here. This is a placeholder for the complete article.'}
            </p>
            <p className="text-coffee-500 italic">
              Stay tuned for more stories from the Espresso community! ☕
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-coffee-200/50">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gold hover:text-coffee-600 transition-colors"
          >
            <ArrowLeft size={20} />
            Read more from the Journal
          </Link>
        </div>
      </div>
    </div>
  );
}