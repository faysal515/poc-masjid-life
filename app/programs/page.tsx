import type { Metadata } from 'next';
import ProgramsPageClient from './ProgramsPageClient';

export const metadata: Metadata = {
  title: 'Programs — Masjid.Life',
  description: 'All programs: interest-free loans, cow loans, education loans, masjid repair, disabled support, tubewell, and more.',
};

export default function ProgramsPage() {
  return <ProgramsPageClient />;
}
