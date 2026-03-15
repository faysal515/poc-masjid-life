'use client';

import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import { t } from '@/lib/i18n';
import { strings } from '@/lib/i18n';

interface StatCardProps {
  value: string | number;
  label: { bn: string; en: string };
  sublabel?: { bn: string; en: string };
  href?: string;
  icon?: React.ReactNode;
  className?: string;
  dark?: boolean;
}

function formatNumber(value: string | number): string {
  if (typeof value === 'number') {
    return value.toLocaleString('en-BD');
  }
  return value;
}

export default function StatCard({ value, label, sublabel, href, icon, className = '', dark = false }: StatCardProps) {
  const { lang } = useLang();

  const inner = (
    <div className={`rounded-xl border ${dark ? 'bg-white/10 border-white/20 text-white' : 'bg-white border-slate-200 shadow-sm hover:shadow-md'} transition-shadow duration-200 p-6 ${className}`}>
      {icon && <div className="mb-2 text-brand-600">{icon}</div>}
      <div className={`text-4xl font-bold mb-1 ${dark ? 'text-white' : 'text-brand-800'}`}>
        {formatNumber(value)}
      </div>
      <div className={`text-base font-semibold ${dark ? 'text-brand-100' : 'text-slate-700'}`}>
        {t(label, lang)}
      </div>
      {sublabel && (
        <div className={`text-sm mt-1 ${dark ? 'text-brand-200' : 'text-slate-500'}`}>
          {t(sublabel, lang)}
        </div>
      )}
      {href && (
        <div className={`text-xs mt-3 ${dark ? 'text-gold-400' : 'text-brand-600'} font-medium`}>
          {t(strings.stats.verify, lang)}
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link href={href} className="block">{inner}</Link>;
  }

  return inner;
}
