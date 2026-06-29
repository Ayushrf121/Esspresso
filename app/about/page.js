import AboutHero from '@/components/about/AboutHero';
import OriginStory from '@/components/about/OriginStory';
import BeansSourcing from '@/components/about/BeansSourcing';
import OurMission from '@/components/about/OurMission';
import TeamSection from '@/components/about/TeamSection';
import CommunityImpact from '@/components/about/CommunityImpact';
import LocationDetails from '@/components/about/LocationDetails';

export const metadata = {
  title: 'About – Espresso',
  description:
    'Learn about our journey, our beans, our team, and what makes Espresso special.',
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OriginStory />
      <BeansSourcing />
      <OurMission />
      <TeamSection />
      <CommunityImpact />
      <LocationDetails />
    </>
  );
}