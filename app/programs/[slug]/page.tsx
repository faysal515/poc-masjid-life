import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { programs } from '@/lib/mock-data';
import ProgramDetailClient from './ProgramDetailClient';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const program = programs.find((p) => p.slug === params.slug);
  if (!program) return {};
  return {
    title: `${program.title.en} — Masjid.Life`,
    description: program.desc.en,
  };
}

export default function ProgramDetailPage({ params }: Props) {
  const program = programs.find((p) => p.slug === params.slug);
  if (!program) notFound();
  return <ProgramDetailClient program={program} />;
}
