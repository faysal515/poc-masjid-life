import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { programs } from '@/lib/mock-data';
import ProgramDetailClient from './ProgramDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);
  if (!program) return {};
  return {
    title: `${program.title.en} — Masjid.Life`,
    description: program.desc.en,
  };
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);
  if (!program) notFound();
  return <ProgramDetailClient program={program} />;
}
