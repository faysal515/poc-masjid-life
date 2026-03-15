import type { Metadata } from 'next';
import DonatePageClient from './DonatePageClient';

export const metadata: Metadata = {
  title: 'Donate — Masjid.Life',
  description: 'Donate to Masjid.Life. 100% goes to interest-free loans. Multiple donation channels: bank transfer, bKash, Nagad.',
};

export default function DonatePage() {
  return <DonatePageClient />;
}
