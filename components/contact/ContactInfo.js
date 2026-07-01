'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactInfo = () => {
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

  const details = [
    {
      icon: MapPin,
      label: 'Address',
      value: '123 Coffee Lane, Roast City, 10001',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@espresso.com',
    },
    {
      icon: Clock,
      label: 'Hours',
      value: 'Mon–Fri: 7am – 7pm · Sat–Sun: 8am – 6pm',
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-coffee-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display text-3xl font-bold text-coffee-800">
            Find Us
          </h2>
          <p className="mt-2 text-coffee-500">
            We're always happy to see you in person.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {details.map((item, i) => {
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
                <p className="text-sm text-coffee-400 font-medium">{item.label}</p>
                <p className="mt-1 text-coffee-700 text-sm font-medium">{item.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;