'use client';

import { useEffect, useRef, useState } from 'react';
import { Coffee, Award, Truck, Heart, Sparkles } from 'lucide-react';
import { animateFeatures } from '@/lib/animations';

const features = [
  {
    icon: Coffee,
    title: 'Fresh Roasted',
    desc: 'Roasted in small batches, delivered within 48 hours for peak freshness.',
    image: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=600&h=400&fit=crop&crop=face',
  },
  {
    icon: Award,
    title: 'Artisanal Blends',
    desc: 'Curated by master roasters with a passion for unique flavour profiles.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop&crop=face',
  },
  {
    icon: Truck,
    title: 'Direct Trade',
    desc: 'Sourced responsibly from sustainable farms around the world.',
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=600&h=400&fit=crop&crop=face',
  },
  {
    icon: Heart,
    title: 'Coffee Subscriptions',
    desc: 'Never run out – choose your blend and frequency, we deliver.',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=400&fit=crop&crop=face',
  },
  {
    icon: Sparkles,
    title: 'Sustainable Sourcing',
    desc: 'Ethically sourced beans that support farming communities and protect biodiversity.',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&h=400&fit=crop&crop=face',
  },
];

const Features = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    animateFeatures(cardsRef);
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-cream relative overflow-hidden">
      {/* 🎨 Pattern overlay – diagonal split tiles */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(142,90,58,0.06) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(142,90,58,0.06) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(142,90,58,0.06) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(142,90,58,0.06) 75%)
          `,
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px',
        }}
      />

      {/* Subtle background circles (kept for depth) */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-coffee-300/20 rounded-full" />
        <div className="absolute bottom-20 right-20 w-48 h-48 border-2 border-coffee-300/20 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-gold/10 rounded-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-coffee-800">
            Why Espresso?
          </h2>
          <p className="mt-4 text-lg text-coffee-500">
            We go beyond the cup – every detail is crafted for your perfect coffee moment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const [imgError, setImgError] = useState(false);

            return (
              <div
                key={i}
                ref={(el) => (cardsRef.current[i] = el)}
                className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-coffee-100/50 group transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:border-gold/30"
              >
                {/* Image with hover zoom and fallback */}
                <div className="relative h-48 w-full overflow-hidden bg-coffee-100/50">
                  {!imgError ? (
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-coffee-100 to-coffee-200">
                      <Icon size={48} className="text-coffee-400/50" strokeWidth={1} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-coffee-900/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 bg-coffee-50/80 backdrop-blur-sm rounded-full p-2 shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <Icon size={20} className="text-gold" strokeWidth={1.5} />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-coffee-700 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-coffee-400 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;