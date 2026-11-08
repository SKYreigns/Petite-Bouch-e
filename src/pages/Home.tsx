import { CakeCta } from '../components/home/CakeCta';
import { CafeSection } from '../components/home/CafeSection';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { Hero } from '../components/home/Hero';
import { SignatureBakes } from '../components/home/SignatureBakes';
import { StoryTeaser } from '../components/home/StoryTeaser';
import { VisitSection } from '../components/home/VisitSection';
import { usePageMeta } from '../lib/usePageMeta';

export function Home() {
  usePageMeta(
    'Petite Bouchée Patisserie — Toronto Bakery & Custom Cakes',
    'Freshly baked cruffins, pastries, tarts, Portuguese country bread and bespoke celebration cakes in Toronto. Visit 28 Sousa Mendes St or call +1 416-588-8882.'
  );

  return (
    <>
      <Hero />
      <CategoryGrid />
      <SignatureBakes />
      <CakeCta />
      <CafeSection />
      <StoryTeaser />
      <VisitSection />
    </>
  );
}
