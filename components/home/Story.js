'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Coffee,
  Award,
  Truck,
  Heart,
  Sparkles,
} from 'lucide-react';

const milestones = [
  {
    year: '2010',
    title: 'The Beginning',
    desc: 'A small coffee cart in the heart of the city – the dream begins.',
    icon: Coffee,
  },
  {
    year: '2013',
    title: 'First Roastery',
    desc: 'We roasted our first batch in a converted warehouse, experimenting with single origins.',
    icon: Award,
  },
  {
    year: '2017',
    title: 'Direct Trade',
    desc: 'Traveled to Ethiopia and Colombia to source beans directly from farmers.',
    icon: Truck,
  },
  {
    year: '2020',
    title: 'Subscriptions Launch',
    desc: 'Brought the coffee experience home with flexible, curated subscriptions.',
    icon: Heart,
  },
  {
    year: '2024',
    title: 'Sustainable Future',
    desc: 'Committed to carbon‑neutral roasting and supporting coffee‑growing communities.',
    icon: Sparkles,
  },
];

const Story = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate the central line (grows from top to bottom)
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Animate each timeline item (slide in from right)
    itemsRef.current.forEach((item, i) => {
      gsap.fromTo(
        item,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.15,
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-cream relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-coffee-300/10 rounded-full" />
        <div className="absolute bottom-20 right-20 w-48 h-48 border-2 border-coffee-300/10 rounded-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-coffee-800">
            Our Journey
          </h2>
          <p className="mt-4 text-lg text-coffee-500">
            From a cart to a community – every step shaped the taste of today.
          </p>
        </div>

        {/* Timeline – left aligned, responsive */}
        <div className="relative max-w-4xl mx-auto pl-6 sm:pl-10">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-0 top-0 w-0.5 h-full bg-gold/30 origin-top"
            style={{ transformOrigin: 'top center' }}
          />

          {milestones.map((milestone, i) => {
            const Icon = milestone.icon;

            return (
              <div
                key={i}
                ref={(el) => (itemsRef.current[i] = el)}
                className="relative flex items-start mb-12 last:mb-0"
              >
                {/* Dot on the line */}
                <div className="absolute left-0 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gold border-2 border-coffee-200 shadow-md z-10" />

                {/* Card content */}
                <div className="ml-8 sm:ml-12 w-full">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-coffee-100/50 hover:shadow-xl transition-shadow hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl font-display font-bold text-gold">
                        {milestone.year}
                      </span>
                      <Icon className="w-5 h-5 text-coffee-600" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold text-coffee-700">
                      {milestone.title}
                    </h3>
                    <p className="mt-2 text-coffee-500 text-sm leading-relaxed">
                      {milestone.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Story;