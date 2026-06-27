'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateTestimonialSlide } from '@/lib/animations';

const testimonials = [
  {
    name: 'Sarah J.',
    role: 'Coffee Enthusiast',
    quote:
      "Esspresso's Ethiopian blend is the best I've ever tasted. It's become my morning ritual – rich, smooth, and full of character.",
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    rating: 5,
  },
  {
    name: 'Mark T.',
    role: 'Home Barista',
    quote:
      'The subscription service is seamless. Fresh beans arrive every two weeks – it’s a game changer. I’ve never had coffee this consistent at home.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 5,
  },
  {
    name: 'Elena R.',
    role: 'Café Owner',
    quote:
      'I love the attention to detail in every roast. You can truly taste the passion. My customers keep asking for more.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    rating: 4,
  },
  {
    name: 'David K.',
    role: 'Coffee Explorer',
    quote:
      'Their single‑origin selection opened my eyes to new flavor profiles. Every bag tells a story of origin and craftsmanship.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState('next');
  const slideRefs = useRef([]);
  const containerRef = useRef(null);

  const changeSlide = useCallback(
    (index) => {
      if (index === current) return;
      const dir = index > current ? 'next' : 'prev';
      setDirection(dir);

      const currentEl = slideRefs.current[current];
      const nextEl = slideRefs.current[index];

      animateTestimonialSlide(currentEl, nextEl, dir);
      setCurrent(index);
    },
    [current]
  );

  const goNext = useCallback(() => {
    const next = (current + 1) % testimonials.length;
    changeSlide(next);
  }, [current, changeSlide]);

  const goPrev = useCallback(() => {
    const prev = (current - 1 + testimonials.length) % testimonials.length;
    changeSlide(prev);
  }, [current, changeSlide]);

  // Autoplay
  useEffect(() => {
    const interval = setInterval(goNext, 6000);
    return () => clearInterval(interval);
  }, [goNext]);

  // Initial entrance animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-20 bg-coffee-800 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 right-10 w-48 h-48 border-2 border-gold/20 rounded-full" />
        <div className="absolute bottom-20 left-20 w-64 h-64 border-2 border-gold/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-2 border-gold/5 rounded-full" />
        {/* Large quote marks */}
        <div className="absolute top-20 left-1/4 text-9xl font-serif text-cream/10">“</div>
        <div className="absolute bottom-20 right-1/4 text-9xl font-serif text-cream/10">”</div>
      </div>

      <div ref={containerRef} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream">
            What our community says
          </h2>
          <p className="mt-4 text-cream/60 max-w-2xl mx-auto">
            Real voices from coffee lovers who’ve made Espresso part of their daily ritual.
          </p>
        </div>

        {/* Slider */}
        <div className="relative max-w-4xl mx-auto">
          {/* Cards container */}
          <div className="relative h-64 sm:h-56 md:h-48">
            {testimonials.map((t, i) => (
              <div
                key={i}
                ref={(el) => (slideRefs.current[i] = el)}
                className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-opacity duration-300 ${
                  i === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                {/* Quote */}
                <div className="max-w-2xl">
                  <p className="text-cream text-lg sm:text-xl md:text-2xl font-light leading-relaxed">
                    “{t.quote}”
                  </p>
                </div>

                {/* Author info */}
                <div className="mt-6 flex items-center gap-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gold/30"
                  />
                  <div className="text-left">
                    <p className="font-bold text-cream">{t.name}</p>
                    <p className="text-sm text-cream/60">{t.role}</p>
                  </div>
                  <div className="flex text-gold">
                    {[...Array(5)].map((_, s) => (
                      <Star
                        key={s}
                        size={16}
                        fill={s < t.rating ? 'currentColor' : 'none'}
                        className={s < t.rating ? 'text-gold' : 'text-cream/20'}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <button
            onClick={goPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-8 bg-coffee-700/80 hover:bg-coffee-600 text-cream rounded-full p-2 transition-all shadow-lg hover:scale-110"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-8 bg-coffee-700/80 hover:bg-coffee-600 text-cream rounded-full p-2 transition-all shadow-lg hover:scale-110"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => changeSlide(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === current
                    ? 'bg-gold w-6'
                    : 'bg-cream/30 hover:bg-cream/50'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;