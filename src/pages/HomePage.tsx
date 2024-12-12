import FeaturesAndPartnersSection from '@/components/home/sections/FeaturesAndPartnersSection';
import HeroSection from '@/components/home/sections/HeroSection';
import ResourcesSection from '@/components/home/sections/ResourcesSection';
import ReviewsSection from '@/components/home/sections/ReviewsSection';
import Navbar from '@/components/layout/NavBar';

const HomePage = () => {
  return (
    <>
      <header>
        <Navbar transparent />
      </header>

      <main>
        <HeroSection />
        <FeaturesAndPartnersSection />
        <ReviewsSection />
        <ResourcesSection />
      </main>
    </>
  );
};

export default HomePage;
