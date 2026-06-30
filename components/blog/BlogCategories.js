'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const categories = [
  { name: 'Behind the Beans', emoji: '🌱' },
  { name: 'Barista Spotlights', emoji: '☕' },
  { name: 'Local Guides', emoji: '📍' },
  { name: 'Brewing Tutorials', emoji: '📖' },
  { name: 'New Menu', emoji: '✨' },
];

const BlogCategories = () => {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    itemsRef.current.forEach((item, i) => {
      gsap.fromTo(
        item,
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.08,
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-12 bg-coffee-50 border-y border-coffee-100/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {categories.map((cat, i) => (
            <button
              key={i}
              ref={(el) => (itemsRef.current[i] = el)}
              className="bg-white hover:bg-gold/10 text-coffee-600 hover:text-coffee-800 px-5 py-2.5 rounded-full border border-coffee-200/50 transition-all duration-300 hover:border-gold/30 hover:shadow-md flex items-center gap-2 text-sm font-medium"
            >
              <span>{cat.emoji}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogCategories;