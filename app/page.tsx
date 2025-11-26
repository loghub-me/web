import { HomeContentsSection, HomeFeaturesSection, HomeHeroSection, HomeTopicsSection } from '@/components/server/home';
import { LightRays } from '@ui/light-rays';

export default function HomePage() {
  return (
    <main className="relative min-h-screen h-full py-16 overflow-x-hidden">
      <LightRays
        raysColor={'#00ffff'}
        rayLength={1.2}
        className="absolute -z-10 top-0 custom-rays transition-opacity opacity-0 dark:opacity-50 duration-500"
      />
      <HomeHeroSection />
      <HomeContentsSection />
      <HomeTopicsSection />
      <HomeFeaturesSection />
    </main>
  );
}
