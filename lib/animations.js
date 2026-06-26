import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
/**
 * Entrance animation for hero elements
 */
export const animateHeroEntrance = (titleRef, subtitleRef, ctaRef) => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.fromTo(
    titleRef.current,
    { y: 80, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.2 }
  )
    .fromTo(
      subtitleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.6'
    )
    .fromTo(
      ctaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.4'
    );
};

/**
 * Animate tile rows based on mouse position
 */
export const animateTiles = (rowsRef, mouseX, mouseY) => {
  if (!rowsRef.current || rowsRef.current.length === 0) return;

  const rows = rowsRef.current;
  const { x, y } = mouseX && mouseY ? { x: mouseX, y: mouseY } : { x: 0, y: 0 };

  rows.forEach((row, i) => {
    const offsetY = y * 40 * (i / rows.length) * 1.5;
    const offsetX = x * 30 * (i / rows.length) * 1.2;
    gsap.to(row, {
      y: offsetY,
      x: offsetX,
      duration: 0.8,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  });
};
export const animateHeroImage = (imageRef, mouseX, mouseY) => {
  if (!imageRef.current) return;
  const { x, y } = mouseX && mouseY ? { x: mouseX, y: mouseY } : { x: 0, y: 0 };

  gsap.to(imageRef.current, {
    x: x * 20,
    y: y * 15,
    rotation: x * 2,
    duration: 0.6,
    ease: 'power2.out',
    overwrite: 'auto',
  });
};

export const animateFeatures = (cardsRef) => {
  if (!cardsRef.current || cardsRef.current.length === 0) return;
  gsap.registerPlugin(ScrollTrigger);

  const cards = cardsRef.current;

  // Use fromTo with rotationX for a 3D stagger entry
  gsap.fromTo(
    cards,
    {
      y: 80,
      rotationX: -15,
      opacity: 0,
    },
    {
      y: 0,
      rotationX: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: cards[0].parentElement, // or use a common container
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    }
  );
};