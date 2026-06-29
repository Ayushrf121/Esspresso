'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const OurMission = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      contentRef.current,
      { y: 50, opacity: 0, scale: 0.98 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-coffee-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-48 h-48 border-2 border-gold/20 rounded-full" />
        <div className="absolute bottom-10 left-10 w-64 h-64 border-2 border-gold/10 rounded-full" />
      </div>

      <div ref={contentRef} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
        <span className="text-gold font-display text-sm uppercase tracking-wider">Our Mission</span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream mt-2">
          A Space for Connection
        </h2>
        <p className="mt-6 text-lg text-cream/70 leading-relaxed">
          We believe coffee is more than a drink – it's a reason to pause, connect,
          and be present. Our café is designed to be a warm, welcoming space where
          conversations flow as freely as the espresso.
        </p>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {['Welcoming Atmosphere', 'Community Gathering', 'Quality Guaranteed'].map((item) => (
            <div key={item} className="bg-coffee-700/30 backdrop-blur-sm rounded-xl p-4 border border-coffee-600/30">
              <p className="text-cream/80 text-sm font-medium">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurMission;