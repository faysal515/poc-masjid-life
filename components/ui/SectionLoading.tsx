'use client';

import { useLang } from '@/lib/LanguageContext';
import { t, strings } from '@/lib/i18n';

type Props = {
  className?: string;
  minHeight?: string;
  /** Use on dark section backgrounds (e.g. brand-900). */
  onDark?: boolean;
};

/**
 * Full-width loading bar + label for sections waiting on scrape APIs (e.g. /api/scrape/home).
 */
export default function SectionLoading({
  className = '',
  minHeight = '12rem',
  onDark = false,
}: Props) {
  const { lang } = useLang();

  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 px-4 ${className}`}
      style={{ minHeight }}
      aria-busy="true"
      aria-live="polite"
    >
      <div
        className={`h-1.5 w-full max-w-md overflow-hidden rounded-full ${
          onDark ? 'bg-white/15' : 'bg-slate-200/80'
        }`}
      >
        <div
          className={`h-full w-1/3 rounded-full motion-safe:animate-section-load-bar ${
            onDark ? 'bg-gold-400' : 'bg-brand-600'
          }`}
        />
      </div>
      <p
        className={`text-sm font-medium ${
          onDark ? 'text-brand-200' : 'text-slate-500'
        }`}
      >
        {t(strings.common.loading, lang)}
      </p>
    </div>
  );
}
