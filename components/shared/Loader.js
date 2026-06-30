'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Loader = ({ visible }) => {
  const loaderRef = useRef(null);
  const circleRef = useRef(null);

  // Lock/unlock scroll based on visibility
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      // Cleanup on unmount
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [visible]);

  // GSAP animations
  useEffect(() => {
    if (visible) {
      // Animate in
      gsap.fromTo(
        loaderRef.current,
        { opacity: 0, display: 'none' },
        { opacity: 1, display: 'flex', duration: 0.3, ease: 'power2.out' }
      );
      // Continuous spinning animation
      gsap.to(circleRef.current, {
        rotation: 360,
        duration: 1.2,
        repeat: -1,
        ease: 'linear',
      });
    } else {
      // Animate out
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(loaderRef.current, { display: 'none' });
        },
      });
    }
  }, [visible]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-coffee-900/90 backdrop-blur-md"
      style={{ display: 'none' }}
    >
      <div className="relative flex flex-col items-center">
        <div
          ref={circleRef}
          className="w-16 h-16 border-4 border-gold/30 border-t-gold rounded-full"
        />
        <div className="mt-6 font-display text-cream text-lg animate-pulse">
          Brewing your coffee...
        </div>
        <div className="mt-2 text-cream/40 text-sm">
          Just a moment ☕
        </div>
      </div>
    </div>
  );
};

export default Loader;