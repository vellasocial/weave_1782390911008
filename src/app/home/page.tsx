import dynamic from 'next/dynamic';
import HeroSection from '../weave/components/HeroSection';
import WeaveHeader from '../weave/components/WeaveHeader';
import { ServiceSubNav } from '../weave/components/SectionParts';

const BentoPortfolio = dynamic(() => import('../weave/components/BentoPortfolio'));
const PricingSection = dynamic(() => import('../weave/components/PricingSection'));
const HowItWorksSection = dynamic(() => import('../weave/components/HowItWorksSection'));
const ClosingCTA = dynamic(() => import('../weave/components/ClosingCTA'));
const FloatingCTA = dynamic(() => import('../weave/components/FloatingCTA'));
const CommissionPanel = dynamic(() => import('../weave/components/CommissionPanel'));
const WeaveFooter = dynamic(() => import('../weave/components/WeaveFooter'));

export default function HomePage() {
  return (
    <main suppressHydrationWarning className="relative bg-loom-black min-h-screen overflow-x-hidden">
      <WeaveHeader />
      <ServiceSubNav />
      <HeroSection />
      <BentoPortfolio />
      <PricingSection />
      <HowItWorksSection />
      <ClosingCTA />
      <WeaveFooter />
      <FloatingCTA />
      <CommissionPanel />
    </main>
  );
}
