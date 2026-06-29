'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const OriginStory = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(
      textRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    ).fromTo(
      imageRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.8'
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={textRef}>
            <span className="text-gold font-display text-sm uppercase tracking-wider">Our Story</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-coffee-800 mt-2">
              From a Cart to a Community
            </h2>
            <p className="mt-4 text-coffee-600 leading-relaxed">
              Espresso started in 2010 as a small coffee cart on a busy street corner.
              What began as a passion project quickly became a neighborhood ritual.
              We outgrew the cart, opened our first roastery, and never looked back.
            </p>
            <p className="mt-3 text-coffee-600 leading-relaxed">
              Today, we're a team of coffee lovers who believe in transparency,
              quality, and the power of a perfect cup. Every bean we roast is a
              reflection of that journey.
            </p>
          </div>
          <div ref={imageRef} className="relative rounded-2xl overflow-hidden shadow-xl">
            <img
              src="./images/coffee_image_origin.avif"
              alt="Coffee farm origins"
              className="w-full h-80 object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-coffee-900/20 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OriginStory;