'use client';
import Link from 'next/link';

const Button = ({
  children,
  href,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105';

  const variants = {
    primary: 'bg-coffee-600 text-cream hover:bg-coffee-700',
    secondary:
      'bg-cream text-coffee-700 border-2 border-coffee-300 hover:bg-coffee-50',
    gold: 'bg-gold text-coffee-900 hover:bg-gold/80',
  };

  const combined = `${base} ${variants[variant] || variants.primary} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combined} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combined} {...props}>
      {children}
    </button>
  );
};

export default Button;