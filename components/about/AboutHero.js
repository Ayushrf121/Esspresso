'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/shared/Button';

const AboutHero = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const ctaRef = useRef(null);
  const imageContainerRef = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(
      headingRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    )
      .fromTo(
        paraRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      )
      .fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(
        imageContainerRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' },
        '-=0.8'
      );
  }, []);

  // Floating animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imageContainerRef.current, {
        y: -10,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, imageContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center py-20 bg-coffee-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 border-2 border-gold/20 rounded-full" />
        <div className="absolute bottom-20 left-20 w-80 h-80 border-2 border-gold/10 rounded-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left – Text */}
          <div>
            <h1
              ref={headingRef}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight"
            >
              More than coffee. <br />
              <span className="text-gold">It's a ritual.</span>
            </h1>
            <p
              ref={paraRef}
              className="mt-6 text-lg text-cream/70 leading-relaxed max-w-md"
            >
              We started with a simple belief: coffee should be honest, delicious,
              and bring people together. Every cup we serve tells a story of craft,
              community, and care.
            </p>
            <div ref={ctaRef} className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                href="/contact"
                variant="gold"
                className="text-base px-8 py-4 flex items-center gap-2 group"
              >
                Visit Us
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                href="/shop"
                variant="secondary"
                className="text-base px-8 py-4 bg-cream/10 text-cream border-cream/20 hover:bg-cream/20"
              >
                Shop Our Beans
              </Button>
            </div>
          </div>

          {/* Right – Flip Card (no "Hover to flip" text) */}
          <div
            ref={imageContainerRef}
            className="relative w-full max-w-md mx-auto"
            style={{ perspective: '1000px' }}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
          >
            <div
              className="relative w-full aspect-square transition-transform duration-700"
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* Front – Image */}
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=800&fit=crop&crop=center"
                  alt="Coffee brewing"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-coffee-900/40 to-transparent" />
              </div>

              {/* Back – Quote */}
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl bg-coffee-800 flex items-center justify-center p-8"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <div className="text-center">
                  <span className="text-5xl text-gold/30 font-serif">"</span>
                  <p className="text-cream text-xl font-light leading-relaxed mt-2">
                    Coffee is a language <br />
                    in itself.
                  </p>
                  <div className="mt-4 w-12 h-0.5 bg-gold/40 mx-auto" />
                  <p className="text-gold font-display text-sm uppercase tracking-wider mt-4">
                    – Unknown
                  </p>
                  <p className="text-cream/30 text-xs mt-3">Every cup tells a story</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;