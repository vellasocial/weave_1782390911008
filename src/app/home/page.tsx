import dynamic from 'next/dynamic';
import HeroSection from '../weave/components/HeroSection';
import WeaveHeader from '../weave/components/WeaveHeader';

const BentoPortfolio = dynamic(() => import('../weave/components/BentoPortfolio'));
const ProcessSection = dynamic(() => import('../weave/components/ProcessSection'));
const FloatingCTA = dynamic(() => import('../weave/components/FloatingCTA'));
const CommissionPanel = dynamic(() => import('../weave/components/CommissionPanel'));
const WeaveFooter = dynamic(() => import('../weave/components/WeaveFooter'));

export default function HomePage() {
  return (
    <main suppressHydrationWarning className="relative bg-loom-black min-h-screen overflow-x-hidden">
      <WeaveHeader />
      <HeroSection />
      <BentoPortfolio />
      <ProcessSection />
      <WeaveFooter />
      <FloatingCTA />
      <CommissionPanel />
    </main>
  );
}
