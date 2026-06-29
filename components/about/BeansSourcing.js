'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Sprout, Flame } from 'lucide-react';

const BeansSourcing = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      headingRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    itemsRef.current.forEach((item, i) => {
      gsap.fromTo(
        item,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.15,
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-coffee-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-gold font-display text-sm uppercase tracking-wider">Our Beans</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-coffee-800 mt-2">
            Sourced with Purpose
          </h2>
          <p className="mt-4 text-coffee-500">
            We travel the world to find the best beans – then roast them with care.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: MapPin,
              title: 'Direct Trade',
              desc: 'We work directly with farms in Ethiopia, Colombia, and Guatemala – cutting out middlemen and building lasting partnerships.',
            },
            {
              icon: Sprout,
              title: 'Sustainable Practices',
              desc: 'Our partners use shade‑grown methods and organic farming to protect biodiversity and soil health.',
            },
            {
              icon: Flame,
              title: 'Small‑Batch Roasting',
              desc: 'Every batch is roasted to order in our micro‑roastery, ensuring peak freshness and flavor in every bag.',
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                ref={(el) => (itemsRef.current[i] = el)}
                className="bg-white rounded-2xl p-8 shadow-lg border border-coffee-100/50 hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 rounded-full bg-coffee-50 flex items-center justify-center text-gold mb-4">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-coffee-700">{item.title}</h3>
                <p className="mt-2 text-coffee-500 text-sm">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BeansSourcing;