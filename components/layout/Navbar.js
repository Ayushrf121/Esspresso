'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Coffee } from 'lucide-react';
import gsap from 'gsap';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const overlayRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  // Scroll effect: background change
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 50) {
        gsap.to(header, {
          backgroundColor: 'rgba(253, 246, 237, 0.92)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          borderBottom: '1px solid rgba(142, 90, 58, 0.1)',
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.to(header, {
          backgroundColor: 'rgba(253, 246, 237, 0)',
          boxShadow: 'none',
          borderBottom: '1px solid transparent',
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile menu: slide from right with overlay
  useEffect(() => {
    const menu = mobileMenuRef.current;
    const overlay = overlayRef.current;
    if (!menu || !overlay) return;

    if (isOpen) {
      // Show overlay first
      gsap.set(overlay, { display: 'block' });
      gsap.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 0.6, duration: 0.3, ease: 'power2.out' }
      );
      // Slide in menu
      gsap.fromTo(
        menu,
        { x: '100%', display: 'flex' },
        { x: '0%', duration: 0.5, ease: 'power3.out' }
      );
    } else {
      // Slide out menu
      gsap.to(menu, {
        x: '100%',
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(menu, { display: 'none' });
        },
      });
      // Fade out overlay
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(overlay, { display: 'none' });
        },
      });
    }
  }, [isOpen]);

  // Hover effects for desktop links
  const handleLinkEnter = (index) => {
    const el = linksRef.current[index];
    if (!el) return;
    gsap.to(el, {
      scale: 1.05,
      color: '#53321f',
      duration: 0.2,
      ease: 'power2.out',
    });
    const underline = el.querySelector('.underline-indicator');
    if (underline) {
      gsap.to(underline, {
        scaleX: 1,
        backgroundColor: '#d4a373',
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleLinkLeave = (index) => {
    const el = linksRef.current[index];
    if (!el) return;
    gsap.to(el, {
      scale: 1,
      color: pathname === navLinks[index].href ? '#8e5a3a' : '#a97552',
      duration: 0.2,
      ease: 'power2.in',
    });
    const underline = el.querySelector('.underline-indicator');
    if (underline) {
      gsap.to(underline, {
        scaleX: pathname === navLinks[index].href ? 1 : 0,
        backgroundColor: '#d4a373',
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  };

  // Logo hover
  const handleLogoEnter = () => {
    gsap.to(logoRef.current, {
      scale: 1.08,
      rotate: -8,
      duration: 0.3,
      ease: 'back.out(1.7)',
    });
  };

  const handleLogoLeave = () => {
    gsap.to(logoRef.current, {
      scale: 1,
      rotate: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 transition-colors duration-300"
        style={{ backdropFilter: 'blur(8px)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 text-coffee-700 hover:text-coffee-900 transition-colors"
              onMouseEnter={handleLogoEnter}
              onMouseLeave={handleLogoLeave}
            >
              <Coffee
                ref={logoRef}
                className="w-6 h-6 text-gold"
                strokeWidth={2.5}
              />
              <span className="font-display text-2xl font-bold tracking-tight">
                Esspresso
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={(el) => (linksRef.current[index] = el)}
                  onMouseEnter={() => handleLinkEnter(index)}
                  onMouseLeave={() => handleLinkLeave(index)}
                  className={`relative text-sm font-medium tracking-wide transition-colors ${
                    pathname === link.href
                      ? 'text-coffee-700'
                      : 'text-coffee-500 hover:text-coffee-700'
                  }`}
                >
                  {link.name}
                  <span
                    className={`underline-indicator absolute -bottom-1 left-0 w-full h-0.5 bg-gold transition-transform duration-300 ${
                      pathname === link.href ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </Link>
              ))}
              <Link
                href="/contact"
                className="ml-4 px-5 py-2 bg-coffee-600 text-cream rounded-full text-sm font-medium hover:bg-coffee-700 hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-md"
              >
                Order Now
              </Link>
            </nav>

            {/* Mobile hamburger button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-coffee-700 hover:text-coffee-900 transition-colors p-2 rounded-lg hover:bg-coffee-100/50"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black z-40 md:hidden"
        style={{ display: 'none' }}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile menu – slide in from right */}
      <div
        ref={mobileMenuRef}
        className="fixed top-0 right-0 h-full w-full sm:w-80 bg-cream/95 backdrop-blur-md shadow-2xl z-50 md:hidden flex-col items-center justify-center p-8"
        style={{ display: 'none', x: '100%' }}
      >
        {/* Close button inside menu (optional, but we have the hamburger toggle) */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-coffee-700 hover:text-coffee-900 transition-colors"
        >
          <X size={28} />
        </button>

        <div className="flex flex-col items-center gap-6 w-full">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-2xl font-display transition-colors ${
                pathname === link.href
                  ? 'text-coffee-700'
                  : 'text-coffee-500 hover:text-coffee-700'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="mt-4 px-8 py-3 bg-coffee-600 text-cream rounded-full text-lg font-medium hover:bg-coffee-700 transition-all shadow-md"
          >
            Order Now
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;