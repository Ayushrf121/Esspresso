import BlogHero from '@/components/blog/BlogHero';
import BlogCategories from '@/components/blog/BlogCategories';
import BlogGrid from '@/components/blog/BlogGrid';

export const metadata = {
  title: 'Blog – Espresso Journal',
  description: 'Stories from our roastery, barista tips, and the coffee culture we love.',
};

export default function BlogPage() {
  return (
    <>
      <BlogHero />
      <BlogCategories />
      <BlogGrid />
    </>
  );
}