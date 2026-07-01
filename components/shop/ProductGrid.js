'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductCard from './ProductCard';

const products = [
  {
    id: 1,
    name: 'Ethiopian Yirgacheffe',
    origin: 'Ethiopia · Single Origin',
    price: '18.00',
    description: 'Bright, floral, with notes of blueberry and dark chocolate.',
    image: '/images/Ethiopian Yirgacheffe.jpg',
    badge: 'Best Seller',
  },
  {
    id: 2,
    name: 'Colombian Supremo',
    origin: 'Colombia · Single Origin',
    price: '16.00',
    description: 'Smooth, nutty, with hints of caramel and a silky finish.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop&crop=center',
  },
  {
    id: 3,
    name: 'House Blend',
    origin: 'Blend · Medium Roast',
    price: '14.00',
    description: 'Our signature blend – balanced, rich, and full-bodied.',
    image: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=600&h=400&fit=crop&crop=center',
  },
  {
    id: 4,
    name: 'Guatemalan Antigua',
    origin: 'Guatemala · Single Origin',
    price: '17.00',
    description: 'Complex, with cocoa notes and a vibrant acidity.',
    image: '/images/Guatemalan Antigua.jpg',
    badge: 'New',
  },
  {
    id: 5,
    name: 'Decaf Swiss Water',
    origin: 'Decaf · Processed',
    price: '15.00',
    description: 'Full flavor, no caffeine – naturally decaffeinated.',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=400&fit=crop&crop=center',
  },
  {
    id: 6,
    name: 'Espresso Blend',
    origin: 'Blend · Dark Roast',
    price: '19.00',
    description: 'Bold, intense, and perfect for your daily espresso shot.',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&h=400&fit=crop&crop=center',
  },
];

const ProductGrid = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;