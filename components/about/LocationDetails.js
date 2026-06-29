'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, Wifi, Coffee, Dog, Sun } from 'lucide-react';

const LocationDetails = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      contentRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-cream border-t border-coffee-100/50">
      <div ref={contentRef} className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left – Map / Address */}
          <div>
            <h2 className="font-display text-3xl font-bold text-coffee-800">Visit Us</h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-coffee-700 font-medium">123 Coffee Lane</p>
                  <p className="text-coffee-500">Roast City, 10001</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-coffee-700 font-medium">Hours</p>
                  <p className="text-coffee-500 text-sm">Mon–Fri: 7:00am – 7:00pm</p>
                  <p className="text-coffee-500 text-sm">Sat–Sun: 8:00am – 6:00pm</p>
                  <p className="text-coffee-500 text-sm">Holidays: 9:00am – 4:00pm</p>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="mt-8">
              <h3 className="font-display text-lg font-bold text-coffee-700">Amenities</h3>
              <div className="mt-3 flex flex-wrap gap-3">
                {[
                  { icon: Wifi, label: 'Free Wi-Fi' },
                  { icon: Coffee, label: 'Pour Over Bar' },
                  { icon: Dog, label: 'Pet Friendly' },
                  { icon: Sun, label: 'Patio Seating' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <span
                      key={item.label}
                      className="flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 text-sm text-coffee-600 border border-coffee-200/50 shadow-sm"
                    >
                      <Icon size={14} className="text-gold" />
                      {item.label}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right – Map placeholder */}
          <div className="rounded-2xl overflow-hidden shadow-xl border border-coffee-200/50 bg-coffee-100 h-64 flex items-center justify-center text-coffee-400">
            <div className="text-center">
              <MapPin size={40} className="mx-auto text-gold/50" />
              <p className="mt-2">Map integration</p>
              <p className="text-sm">(Google Maps embed)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationDetails;