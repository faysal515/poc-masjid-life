import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import TrustSignalBar from '@/components/home/TrustSignalBar';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import FounderSection from '@/components/home/FounderSection';
import ProgramsGrid from '@/components/home/ProgramsGrid';
import LiveStatsSection from '@/components/home/LiveStatsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import DonateCtaSection from '@/components/home/DonateCtaSection';

export const metadata: Metadata = {
  title: 'Masjid.Life — সুদমুক্ত ঋণ | Interest-Free Loans for Bangladesh',
  description:
    'Masjid.Life provides 100% interest-free loans to people across Bangladesh. 340 branches, 50 districts, 8255 borrowers. Zero fee. Complete transparency.',
  openGraph: {
    title: 'Masjid.Life — সুদমুক্ত ঋণ',
    description: '340 branches · 8,255 borrowers · ৳7.5 crore loaned · 0% fee',
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustSignalBar />
      <HowItWorksSection />
      <FounderSection />
      <ProgramsGrid />
      <LiveStatsSection />
      <TestimonialsSection />
      <DonateCtaSection />
    </>
  );
}
