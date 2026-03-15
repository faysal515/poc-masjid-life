import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact — Masjid.Life',
  description: 'Contact Masjid.Life. Spokesmen available for information only. Head office in Cary, NC, USA. Bangladesh office in Feni.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
