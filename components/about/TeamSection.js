'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const team = [
  {
    name: 'Alex Rivera',
    role: 'Owner & Head Roaster',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    bio: '10 years roasting, obsessed with Ethiopian single origins.',
  },
  {
    name: 'Maya Chen',
    role: 'Co-Owner & Sourcer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
    bio: 'Travels to farms, builds relationships, brings back the best beans.',
  },
  {
    name: 'James Park',
    role: 'Head Barista',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    bio: 'Former latte art finalist, teaches our team the craft.',
  },
  {
    name: 'Elena Martinez',
    role: 'Community Manager',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    bio: 'Organizes events, workshops, and connects with our neighborhood.',
  },
];

const TeamSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.12,
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-gold font-display text-sm uppercase tracking-wider">Our Team</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-coffee-800 mt-2">
            The Faces Behind the Cup
          </h2>
          <p className="mt-4 text-coffee-500">
            We're a small, passionate team dedicated to making your coffee moment perfect.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-coffee-100/50 group text-center"
            >
              <div className="relative overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full aspect-square object-cover transition-all duration-700 group-hover:grayscale-0 grayscale"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-coffee-700">{member.name}</h3>
                <p className="text-sm text-gold font-medium">{member.role}</p>
                <p className="mt-1 text-coffee-500 text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;