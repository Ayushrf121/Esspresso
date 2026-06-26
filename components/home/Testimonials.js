'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const testimonials = [
  {
    quote: "Esspresso's Ethiopian blend is the best I've ever tasted. It's become my morning ritual.",
    name: 'Sarah J.',
    role: 'Coffee Enthusiast',
  },
  {
    quote: 'The subscription service is seamless. Fresh beans arrive every two weeks – it’s a game changer.',
    name: 'Mark T.',
    role: 'Home Barista',
  },
  {
    quote: 'I love the attention to detail in every roast. You can truly taste the passion.',
    name: 'Elena R.',
    role: 'Café Owner',
  },
];

const Testimonials = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          delay: i * 0.2,
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-coffee-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center text-coffee-800 mb-12">
          What our community says
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="bg-white rounded-2xl p-8 shadow-md border border-coffee-100/30"
            >
              <p className="text-coffee-600 italic text-lg">“{t.quote}”</p>
              <div className="mt-6">
                <p className="font-bold text-coffee-800">{t.name}</p>
                <p className="text-sm text-coffee-400">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;