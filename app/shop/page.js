import ShopHero from '@/components/shop/ShopHero';
import ProductGrid from '@/components/shop/ProductGrid';

export const metadata = {
  title: 'Shop – Espresso',
  description: 'Freshly roasted, ethically sourced coffee delivered to your door.',
};

export default function ShopPage() {
  return (
    <>
      <ShopHero />
      <ProductGrid />
    </>
  );
}