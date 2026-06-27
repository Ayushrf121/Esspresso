import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Testimonials from '@/components/home/Testimonials';
import CtaBanner from '@/components/home/CtaBanner';
import Story from '@/components/home/Story';

export default function Home() {
  return (
    <>
      <Hero />
      <Story/>
      <Features />
      <Testimonials />
      <CtaBanner />
    </>
  );
}