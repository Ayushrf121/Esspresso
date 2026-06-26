'use client';
import { useEffect, useRef } from 'react';
import { trackMouse, createMouseParallax } from '@/lib/animations';

export const useMouseParallax = (containerRef, elements, options = {}) => {
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cleanupMouse = trackMouse(containerRef, mouseRef);
    const cleanupTicker = createMouseParallax(elements, mouseRef, options);

    return () => {
      cleanupMouse();
      cleanupTicker();
    };
  }, [containerRef, elements, options]);
};