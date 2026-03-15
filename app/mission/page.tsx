import type { Metadata } from 'next';
import MissionPageClient from './MissionPageClient';

export const metadata: Metadata = {
  title: 'Our Mission — Masjid.Life',
  description: 'Learn about the founder, organizational principles, and mission of Masjid.Life — Bangladesh\'s interest-free loan network.',
};

export default function MissionPage() {
  return <MissionPageClient />;
}
