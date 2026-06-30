'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Loader from '@/components/shared/Loader';

const LoaderWrapper = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  // Hide loader when route finishes
  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  // Intercept link clicks
  useEffect(() => {
    const handleLinkClick = (e) => {
      const target = e.target.closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      // Ignore external links, anchor links, and links that open in new tab
      if (
        href.startsWith('http') ||
        href.startsWith('#') ||
        href.startsWith('//') ||
        target.target === '_blank'
      ) {
        return;
      }

      // Remove leading slash for comparison (if any)
      const cleanHref = href.replace(/^\//, '');
      const cleanPath = pathname.replace(/^\//, '');

      // If the link points to the current page, do nothing
      if (cleanHref === cleanPath || cleanHref === '') {
        return;
      }

      // Show loader
      setLoading(true);
    };

    document.addEventListener('click', handleLinkClick);
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, [pathname]);

  return <Loader visible={loading} />;
};

export default LoaderWrapper;