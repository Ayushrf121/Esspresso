'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: index * 0.08,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-coffee-100/50"
    >
      <div className="relative overflow-hidden h-64">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coffee-900/40 via-transparent to-transparent" />
        {product.badge && (
          <span className="absolute top-4 right-4 bg-gold text-coffee-900 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            {product.badge}
          </span>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-coffee-700 group-hover:text-gold transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-coffee-400 mt-1">{product.origin}</p>
          </div>
          <span className="text-2xl font-display font-bold text-gold">
            ${product.price}
          </span>
        </div>

        <p className="mt-3 text-coffee-500 text-sm leading-relaxed">
          {product.description}
        </p>

        <button className="mt-4 w-full flex items-center justify-center gap-2 bg-coffee-600 text-cream py-3 rounded-xl hover:bg-coffee-700 transition-all hover:shadow-lg text-sm font-medium group/btn">
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;