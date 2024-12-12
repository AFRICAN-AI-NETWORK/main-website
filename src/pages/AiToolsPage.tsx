import AiToolsCategories from '@/components/ai-tools/sections/AiToolCategories';
import HeroSection from '@/components/ai-tools/sections/HeroSection';
import Navbar from '@/components/layout/NavBar';

const CountriesPage = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="min-h-dvh pt-[150px] xl:pt-[100px] 2xl:pt-[150px]">
        <HeroSection />
        <AiToolsCategories />
      </main>
    </>
  );
};

export default CountriesPage;
