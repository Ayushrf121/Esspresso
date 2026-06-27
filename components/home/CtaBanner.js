'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Coffee, ChevronRight } from 'lucide-react';
import Button from '@/components/shared/Button';
import { animateCtaBanner } from '@/lib/animations';

const CtaBanner = () => {
  const bannerRef = useRef(null);
  const contentRef = useRef(null);
  const [particles, setParticles] = useState([]);

  // Generate particles only on client – avoids hydration mismatch
  useEffect(() => {
    const count = 15;
    const newParticles = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        size: 6 + Math.random() * 16,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: 0.1 + Math.random() * 0.25,
        duration: 4 + Math.random() * 6,
        delay: Math.random() * 3,
      });
    }
    setParticles(newParticles);
  }, []);

  // Entrance animation
  useEffect(() => {
    animateCtaBanner(contentRef);
  }, []);

  // Animate floating particles continuously (GSAP)
  useEffect(() => {
    if (particles.length === 0) return;
    const particleEls = document.querySelectorAll('.cta-particle');
    particleEls.forEach((el, i) => {
      const p = particles[i];
      gsap.to(el, {
        y: -20 + Math.random() * 40,
        x: 10 + Math.random() * 20,
        duration: p.duration,
        delay: p.delay,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }, [particles]);

  return (
    <section
      ref={bannerRef}
      className="py-20 relative overflow-hidden"
    >
      {/* 🖼️ Background image – coffee beans */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=1600&h=900&fit=crop&crop=center')",
          filter: 'brightness(0.35) saturate(1.1)',
        }}
      />

      {/* Dark overlay to blend */}
      <div className="absolute inset-0 bg-gradient-to-b from-coffee-900/80 via-coffee-900/60 to-coffee-950/80" />

      {/* Floating particles (coffee beans) – client‑only */}
      {particles.length > 0 && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {particles.map((p) => (
            <div
              key={p.id}
              className="cta-particle absolute rounded-full bg-gold/20 border border-gold/10 backdrop-blur-[2px]"
              style={{
                width: p.size,
                height: p.size,
                top: `${p.y}%`,
                left: `${p.x}%`,
                opacity: p.opacity,
              }}
            />
          ))}
        </div>
      )}

      {/* Decorative rings – overlay */}
      <div className="absolute inset-0 opacity-30 pointer-events-none z-10">
        <div className="absolute -top-20 -right-20 w-64 h-64 border-2 border-gold/20 rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 border-2 border-gold/10 rounded-full" />
      </div>

      <div
        ref={contentRef}
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20"
      >
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-coffee-800/40 backdrop-blur-xl rounded-3xl p-8 sm:p-12 md:p-16 border border-coffee-700/30 shadow-2xl overflow-hidden">
            {/* Inner glow */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />

            <div className="relative text-center">
              {/* Icon badge */}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-coffee-700/50 border border-gold/20 mb-6">
                <Coffee className="w-10 h-10 text-gold" strokeWidth={1.5} />
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-cream">
                Ready to elevate your
                <br />
                <span className="text-gold">coffee experience?</span>
              </h2>

              <p className="mt-4 text-lg text-cream/70 max-w-2xl mx-auto">
                Join thousands of coffee lovers who start their day with Espresso.
                <br />
                <span className="text-cream/50 text-sm">☕ Fresh. Ethical. Delivered to your door.</span>
              </p>

              {/* CTA buttons with icons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  href="/shop"
                  variant="gold"
                  className="group text-base px-8 py-4 flex items-center gap-2"
                >
                  Start your subscription
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  href="/about"
                  variant="secondary"
                  className="text-base px-8 py-4 bg-cream/10 text-cream border-cream/20 hover:bg-cream/20"
                >
                  Learn more
                </Button>
              </div>

              {/* Trust badges */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-cream/40 text-sm">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                  Free shipping
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                  Roasted fresh
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                  100% satisfaction
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;