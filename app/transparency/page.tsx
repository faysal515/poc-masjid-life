import type { Metadata } from 'next';
import TransparencyPageClient from './TransparencyPageClient';

export const metadata: Metadata = {
  title: 'Transparency — Masjid.Life',
  description: 'Complete financial transparency: fund summaries, bank accounts, and downloadable documents. Every taka accounted for.',
};

export default function TransparencyPage() {
  return <TransparencyPageClient />;
}
