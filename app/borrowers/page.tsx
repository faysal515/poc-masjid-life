import type { Metadata } from 'next';
import BorrowersPageClient from './BorrowersPageClient';

export const metadata: Metadata = {
  title: 'Borrowers — Masjid.Life',
  description: 'Public list of loan recipients. Full transparency on all interest-free loans distributed.',
};

export default function BorrowersPage() {
  return <BorrowersPageClient />;
}
