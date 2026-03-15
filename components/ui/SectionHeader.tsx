'use client';

import { useLang } from '@/lib/LanguageContext';
import { t } from '@/lib/i18n';

interface SectionHeaderProps {
  title: { bn: string; en: string };
  subtitle?: { bn: string; en: string };
  align?: 'left' | 'center';
  accent?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  title,
  subtitle,
  align = 'center',
  accent = false,
  light = false,
}: SectionHeaderProps) {
  const { lang } = useLang();

  return (
    <div className={`mb-10 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <h2
        className={`text-2xl md:text-3xl font-bold mb-3 ${accent ? 'pl-4 border-l-4 border-gold-500' : ''} ${light ? 'text-white' : 'text-slate-900'}`}
      >
        {t(title, lang)}
      </h2>
      {subtitle && (
        <p className={`text-base md:text-lg max-w-2xl ${align === 'center' ? 'mx-auto' : ''} ${light ? 'text-brand-100' : 'text-slate-500'}`}>
          {t(subtitle, lang)}
        </p>
      )}
    </div>
  );
}
