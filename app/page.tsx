import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { FeaturedCollections } from '@/components/featured-collections';
import { CraftsmanshipStory } from '@/components/craftsmanship-story';
import { ProductShowcase } from '@/components/product-showcase';
import { Newsletter } from '@/components/newsletter';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen smooth-scroll">
      <Navigation />
      <HeroSection />
      <FeaturedCollections />
      <CraftsmanshipStory />
      <ProductShowcase />
      <Newsletter />
      <Footer />
    </main>
  );
}