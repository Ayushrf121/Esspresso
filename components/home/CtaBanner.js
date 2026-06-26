'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '@/components/shared/Button';

const CtaBanner = () => {
  const bannerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      bannerRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: bannerRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section ref={bannerRef} className="py-20 bg-coffee-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream">
          Ready to elevate your coffee experience?
        </h2>
        <p className="mt-4 text-lg text-cream/80 max-w-2xl mx-auto">
          Join thousands of coffee lovers who start their day with Esspresso.
        </p>
        <div className="mt-8">
          <Button href="/shop" variant="gold" className="text-base px-10 py-4">
            Start your subscription
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;