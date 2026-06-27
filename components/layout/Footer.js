'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Coffee,
  Send,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import {
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaYoutube,
} from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Footer = () => {
  const [email, setEmail] = useState('');
  const footerRef = useRef(null);

  // Entrance animation on scroll
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      console.log('Newsletter signup:', email);
      setEmail('');
      alert('Thanks for subscribing! ☕');
    }
  };

  return (
    <footer
      ref={footerRef}
      className="bg-coffee-900 text-cream/80 border-t border-coffee-700/30"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2 text-cream hover:text-gold transition-colors">
              <Coffee className="w-8 h-8 text-gold" strokeWidth={2} />
              <span className="font-display text-2xl font-bold tracking-tight">
                Espresso
              </span>
            </Link>
            <p className="mt-4 text-sm text-cream/60 max-w-xs leading-relaxed">
              Crafting premium coffee experiences – from bean to brew, delivered with passion.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="#"
                aria-label="Instagram"
                className="text-cream/40 hover:text-gold transition-colors hover:scale-110 transform duration-200"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-cream/40 hover:text-gold transition-colors hover:scale-110 transform duration-200"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="text-cream/40 hover:text-gold transition-colors hover:scale-110 transform duration-200"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="text-cream/40 hover:text-gold transition-colors hover:scale-110 transform duration-200"
              >
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-sm uppercase tracking-wider text-gold/80 font-semibold">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-gold transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-gold transition-colors">
                  Shop
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-sm uppercase tracking-wider text-gold/80 font-semibold">
              Get in Touch
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold/60 mt-0.5 flex-shrink-0" />
                <span className="text-cream/60">123 Coffee Lane, Roast City, 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold/60 flex-shrink-0" />
                <span className="text-cream/60">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold/60 flex-shrink-0" />
                <span className="text-cream/60">hello@espresso.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display text-sm uppercase tracking-wider text-gold/80 font-semibold">
              Subscribe
            </h3>
            <p className="mt-4 text-sm text-cream/60">
              Get the latest coffee news and exclusive offers.
            </p>
            <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-2 rounded-full bg-coffee-800 border border-coffee-700 text-cream placeholder-cream/40 focus:outline-none focus:border-gold/50 transition-colors text-sm"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gold text-coffee-900 hover:bg-gold/80 transition-colors font-medium text-sm gap-2"
              >
                Subscribe
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-coffee-800/50 flex flex-col sm:flex-row items-center justify-between text-xs text-cream/40">
          <p>© {new Date().getFullYear()} Espresso. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <Link href="/privacy" className="hover:text-cream/70 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-cream/70 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;