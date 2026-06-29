'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Users, Music, BookOpen } from 'lucide-react';

const CommunityImpact = () => {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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
          delay: i * 0.1,
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-coffee-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-gold font-display text-sm uppercase tracking-wider">Community</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-coffee-800 mt-2">
            Brewing Connection
          </h2>
          <p className="mt-4 text-coffee-500">
            We're proud to be part of our neighborhood – and we give back.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Heart,
              title: 'Local Giving',
              desc: 'We donate a portion of every sale to local food banks and youth programs.',
            },
            {
              icon: Users,
              title: 'Workshops',
              desc: 'Free monthly coffee tastings and brewing classes for the community.',
            },
            {
              icon: Music,
              title: 'Live Music',
              desc: 'Every Friday evening, local musicians perform in our café.',
            },
            {
              icon: BookOpen,
              title: 'Art on Walls',
              desc: 'We rotate art from local creators – our walls are their gallery.',
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                ref={(el) => (itemsRef.current[i] = el)}
                className="bg-white rounded-2xl p-6 shadow-lg border border-coffee-100/50 hover:shadow-xl transition-shadow text-center"
              >
                <div className="w-12 h-12 rounded-full bg-coffee-50 flex items-center justify-center text-gold mx-auto mb-3">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-coffee-700">{item.title}</h3>
                <p className="mt-1 text-coffee-500 text-sm">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CommunityImpact;