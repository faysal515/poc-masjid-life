import type { Metadata } from 'next';
import ApplyPageClient from './ApplyPageClient';

export const metadata: Metadata = {
  title: 'Apply — Masjid.Life',
  description: 'Apply to become a branch, spokesman, observer, or register as a user. Loans are distributed through local branches.',
};

export default function ApplyPage() {
  return <ApplyPageClient />;
}
