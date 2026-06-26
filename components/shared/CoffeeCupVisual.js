'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CoffeeCupVisual = ({ mouseX = 0, mouseY = 0 }) => {
  const containerRef = useRef(null);
  const steamRefs = useRef([]);
  const glowRef = useRef(null);
  const beansRef = useRef([]);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.7, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'back.out(1.4)' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Steam animation (continuous)
  useEffect(() => {
    const steams = steamRefs.current;
    if (steams.length === 0) return;

    const animateSteam = (el, delay) => {
      gsap.to(el, {
        y: -50,
        opacity: 0,
        duration: 2.5,
        delay: delay,
        ease: 'power1.out',
        onComplete: () => {
          gsap.set(el, { y: 0, opacity: 0.6 });
          animateSteam(el, 0);
        },
      });
    };

    steams.forEach((el, i) => {
      animateSteam(el, i * 0.6);
    });
  }, []);

  // Glow pulse animation
  useEffect(() => {
    if (!glowRef.current) return;
    gsap.to(glowRef.current, {
      scale: 1.2,
      opacity: 0.8,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, []);

  // Floating beans animation
  useEffect(() => {
    const beans = beansRef.current;
    if (beans.length === 0) return;

    beans.forEach((bean, i) => {
      const angle = (i / beans.length) * Math.PI * 2;
      const radius = 40 + i * 10;
      const duration = 4 + i * 1.5;
      gsap.to(bean, {
        rotation: 360,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        duration: duration,
        repeat: -1,
        ease: 'none',
        modifiers: {
          x: (x) => `${parseFloat(x) + (mouseX * 20)}px`,
          y: (y) => `${parseFloat(y) + (mouseY * 15)}px`,
        },
      });
    });
  }, [mouseX, mouseY]);

  // Mouse parallax on container
  useEffect(() => {
    if (!containerRef.current) return;
    gsap.to(containerRef.current, {
      x: mouseX * 15,
      y: mouseY * 10,
      rotation: mouseX * 1.2,
      duration: 0.6,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-sm mx-auto flex flex-col items-center"
    >
      {/* Glow background */}
      <div
        ref={glowRef}
        className="absolute inset-0 -z-10 w-full h-full rounded-full bg-gold/20 blur-3xl"
        style={{ transform: 'scale(0.8)', opacity: 0.6 }}
      />

      {/* Floating coffee beans */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (beansRef.current[i] = el)}
          className="absolute w-4 h-4 text-gold/40"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
          </svg>
        </div>
      ))}

      {/* Cup SVG */}
      <div className="relative z-10">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-auto drop-shadow-[0_20px_50px_rgba(212,163,115,0.3)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="cupGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#d4a373" />
              <stop offset="100%" stopColor="#a97552" />
            </linearGradient>
            <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#d4a373" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#d4a373" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="90" fill="url(#glowGrad)" opacity="0.4" />
          <path
            d="M60 80 L70 160 L130 160 L140 80 Z"
            fill="url(#cupGrad)"
            stroke="#8e5a3a"
            strokeWidth="2"
          />
          <ellipse cx="100" cy="80" rx="40" ry="12" fill="#d4a373" stroke="#8e5a3a" strokeWidth="2" />
          <ellipse cx="100" cy="82" rx="34" ry="8" fill="#3d1f0c" />
          <path
            d="M140 100 C165 100 170 130 140 135"
            stroke="#a97552"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M80 60 C85 50 90 50 95 60"
            stroke="#fdf6ed"
            strokeWidth="2"
            opacity="0.6"
            fill="none"
          />
          <path
            d="M105 55 C110 45 115 45 120 55"
            stroke="#fdf6ed"
            strokeWidth="2"
            opacity="0.6"
            fill="none"
          />
        </svg>

        {/* Animated steam particles */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (steamRefs.current[i] = el)}
            className="absolute left-1/2 -translate-x-1/2 w-2 h-8 bg-cream/30 rounded-full blur-sm"
            style={{
              top: `${10 + i * 8}%`,
              left: `${35 + i * 10}%`,
              opacity: 0.6,
              transform: 'translateX(-50%)',
            }}
          />
        ))}
      </div>

      {/* Tagline */}
      <p className="mt-6 font-display text-cream/70 text-center text-sm tracking-widest uppercase">
        Brewed to perfection
      </p>
    </div>
  );
};

export default CoffeeCupVisual;