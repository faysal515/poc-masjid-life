import type { Metadata } from 'next';
import ImpactPageClient from './ImpactPageClient';

export const metadata: Metadata = {
  title: 'Impact — Masjid.Life',
  description: 'See the real impact: 340 branches, 8255 borrowers, ৳7.5 crore loaned across 50 districts of Bangladesh.',
};

export default function ImpactPage() {
  return <ImpactPageClient />;
}
