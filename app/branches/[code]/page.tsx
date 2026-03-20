import type { Metadata } from 'next';
import BranchDetailClient from './BranchDetailClient';

interface Props {
  params: Promise<{ code: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  return {
    title: `Branch ${code} — Masjid.Life`,
    description: 'Masjid.Life branch location and details.',
  };
}

export default async function BranchByCodePage({ params }: Props) {
  const { code } = await params;
  return <BranchDetailClient code={decodeURIComponent(code)} />;
}
