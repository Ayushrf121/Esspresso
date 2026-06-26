'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '@/components/shared/Button';
import {
  animateHeroEntrance,
  animateTiles,
} from '@/lib/animations';
import { useMouseTracker } from '@/hooks/useMouseTracker';
import CoffeeCupVisual from '../shared/CoffeeCupVisual';

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const tileRowsRef = useRef([]);
  const mouse = useMouseTracker(heroRef);

  const [particles, setParticles] = useState([]);

  // Generate particles only on client
  useEffect(() => {
    const count = 20;
    const newParticles = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        width: 6 + Math.random() * 14,
        height: 6 + Math.random() * 14,
        top: Math.random() * 100,
        left: Math.random() * 100,
        opacity: 0.1 + Math.random() * 0.2,
      });
    }
    setParticles(newParticles);
  }, []);

  // Entrance animation
  useEffect(() => {
    animateHeroEntrance(titleRef, subtitleRef, ctaRef);
  }, []);

  // Tile animation
  useEffect(() => {
    animateTiles(tileRowsRef, mouse.x, mouse.y);
  }, [mouse]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-coffee-800"
    >
      {/* 🎨 Lighter gradient overlay to lift the background */}
      <div className="absolute inset-0 bg-gradient-to-br from-coffee-700/50 via-coffee-800/30 to-coffee-900/20 z-0" />

      {/* Tile Pattern Background – lighter tiles */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="w-full h-full grid grid-cols-12 grid-rows-8 gap-2 p-4">
          {Array.from({ length: 8 }).map((_, rowIdx) => (
            <div
              key={rowIdx}
              ref={(el) => (tileRowsRef.current[rowIdx] = el)}
              className="col-span-12 flex gap-2"
            >
              {Array.from({ length: 12 }).map((_, colIdx) => (
                <div
                  key={`${rowIdx}-${colIdx}`}
                  className="flex-1 aspect-square rounded-sm bg-coffee-600/30 border border-coffee-500/20 backdrop-blur-[1px]"
                  style={{
                    background:
                      (rowIdx + colIdx) % 2 === 0
                        ? 'rgba(191, 148, 120, 0.15)'
                        : 'rgba(169, 117, 82, 0.1)',
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Floating particles – softer */}
      {particles.length > 0 && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full bg-gold/15 border border-gold/10"
              style={{
                width: p.width,
                height: p.height,
                top: `${p.top}%`,
                left: `${p.left}%`,
                opacity: p.opacity * 1.2,
              }}
            />
          ))}
        </div>
      )}

      {/* Two‑column content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column – text */}
          <div>
            <h1
              ref={titleRef}
              className="font-display text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-cream leading-tight"
            >
              Crafted for the <br />
              <span className="text-gold">perfect cup</span>
            </h1>
            <p
              ref={subtitleRef}
              className="mt-6 text-lg sm:text-xl text-cream/80 max-w-md"
            >
              Experience the art of specialty coffee – from bean to brew.
              Sourced, roasted, and delivered with passion.
            </p>
            <div ref={ctaRef} className="mt-8 flex flex-wrap gap-4">
              <Button href="/shop" variant="gold" className="text-base px-8 py-4">
                Explore our blends
              </Button>
              <Button
                href="/about"
                variant="secondary"
                className="text-base px-8 py-4"
              >
                Our story
              </Button>
            </div>
          </div>

          {/* Right column – CoffeeChart */}
          <div className="flex justify-center lg:justify-end">
            <CoffeeCupVisual mouseX={mouse.x} mouseY={mouse.y} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;