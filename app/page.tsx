import { HomeHero, HomeOrbitingCircles, HomeContents, HomeFeatures } from '@/components/server/home';

export default function HomePage() {
  return (
    <main className="min-h-screen py-16">
      <HomeHero />
      <HomeOrbitingCircles />
      <HomeContents />
      <HomeFeatures />
    </main>
  );
}
