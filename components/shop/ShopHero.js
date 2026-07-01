'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ShopHero = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);

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
      { y: 60, opacity: 0, filter: 'blur(4px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'power3.out' }
    ).fromTo(
      paraRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.6'
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-coffee-900 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=1600&h=600&fit=crop&crop=center')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-coffee-900/90 to-coffee-900/70" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h1
          ref={headingRef}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream"
        >
          Our <span className="text-gold">Collection</span>
        </h1>
        <p
          ref={paraRef}
          className="mt-4 text-lg text-cream/70 max-w-2xl mx-auto"
        >
          Freshly roasted, ethically sourced – delivered straight to your door.
        </p>
      </div>
    </section>
  );
};

export default ShopHero;