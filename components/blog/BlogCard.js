'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

const BlogCard = ({ post, index }) => {
  const cardRef = useRef(null);

  // Entrance animation on scroll
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: index * 0.08,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, [index]);

  return (
    <Link href={`/blog/${post.slug}`}>
      <div
        ref={cardRef}
        className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-coffee-100/50 cursor-pointer h-full flex flex-col"
      >
        {/* Image */}
        <div className="relative overflow-hidden h-56">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-coffee-900/40 via-transparent to-transparent" />
          <span className="absolute top-4 left-4 bg-gold text-coffee-900 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            {post.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-2 text-xs text-coffee-400 mb-2">
            <span>{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-coffee-300" />
            <span>{post.readTime}</span>
          </div>
          <h3 className="text-xl font-bold text-coffee-700 group-hover:text-gold transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="mt-2 text-coffee-500 text-sm flex-1 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-coffee-400">By {post.author}</span>
            <span className="text-gold text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              Read More
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;