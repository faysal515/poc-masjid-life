import type { Metadata } from 'next';
import BranchesPageClient from './BranchesPageClient';

export const metadata: Metadata = {
  title: 'Branches — Masjid.Life',
  description: '340 branches across 50 districts of Bangladesh. Find your nearest interest-free loan branch.',
};

export default function BranchesPage() {
  return <BranchesPageClient />;
}
