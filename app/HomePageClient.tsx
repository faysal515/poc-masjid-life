'use client';

import HeroSection from '@/components/home/HeroSection';
import ImpactNumbers from '@/components/home/ImpactNumbers';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import FounderSection from '@/components/home/FounderSection';
import ProgramsGrid from '@/components/home/ProgramsGrid';
import LiveStatsSection from '@/components/home/LiveStatsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import DonateCtaSection from '@/components/home/DonateCtaSection';

export default function HomePageClient() {
  return (
    <>
      <HeroSection />
      <ImpactNumbers />
      <HowItWorksSection />
      <FounderSection />
      <ProgramsGrid />
      <LiveStatsSection />
      <TestimonialsSection />
      <DonateCtaSection />
    </>
  );
}
