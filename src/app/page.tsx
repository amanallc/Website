import HeroCarousel from '@/components/sections/HeroCarousel';
import GetStarted from '@/components/sections/GetStarted';
import RecentProjects from '@/components/sections/RecentProjects';
import ServicesSection from '@/components/sections/ServicesSection';
import AltServices from '@/components/sections/AltServices';
import Features from '@/components/sections/Features';
import Portfolio from '@/components/sections/Portfolio';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import StatsSection from '@/components/sections/StatsSection';
import RecentBlog from '@/components/sections/RecentBlog';

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <GetStarted />
      <RecentProjects />
      <ServicesSection />
      <AltServices />
      <Features />
      <Portfolio />
      <TestimonialsSection />
      <StatsSection />
      <RecentBlog />
    </>
  );
}
