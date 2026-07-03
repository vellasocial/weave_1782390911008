import dynamic from 'next/dynamic';
import HeroSection from './components/HeroSection';
import WeaveHeader from './components/WeaveHeader';

const BentoPortfolio = dynamic(() => import('./components/BentoPortfolio'));
const ProcessSection = dynamic(() => import('./components/ProcessSection'));
const ParallaxInterior = dynamic(() => import('./components/ParallaxInterior'));
const FloatingCTA = dynamic(() => import('./components/FloatingCTA'));
const CommissionPanel = dynamic(() => import('./components/CommissionPanel'));
const WeaveFooter = dynamic(() => import('./components/WeaveFooter'));

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