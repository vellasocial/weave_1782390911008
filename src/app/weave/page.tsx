import HeroSection from './components/HeroSection';
import BentoPortfolio from './components/BentoPortfolio';
import ProcessSection from './components/ProcessSection';
import ParallaxInterior from './components/ParallaxInterior';
import FloatingCTA from './components/FloatingCTA';
import CommissionPanel from './components/CommissionPanel';
import WeaveFooter from './components/WeaveFooter';
import WeaveHeader from './components/WeaveHeader';

export default function WeavePage() {
  return (
    <main className="relative bg-loom-black min-h-screen overflow-x-hidden">
      <WeaveHeader />
      <HeroSection />
      <BentoPortfolio />
      <ProcessSection />
      <ParallaxInterior />
      <WeaveFooter />
      <FloatingCTA />
      <CommissionPanel />
    </main>
  );
}