'use client';

import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import { t, strings } from '@/lib/i18n';
import { siteStats } from '@/lib/mock-data';

const signals = [
  {
    value: siteStats.branches.toLocaleString(),
    label: strings.stats.branches,
    href: '/branches',
  },
  {
    value: siteStats.borrowerCount.toLocaleString(),
    label: strings.stats.borrowers,
    href: '/borrowers',
  },
  {
    value: '৳৭.৫ কোটি',
    label: strings.stats.loanIssued,
    href: '/transparency',
  },
  {
    value: '০%',
    label: { bn: 'প্রশাসনিক ফি', en: 'Admin Fee' },
    href: '/mission',
  },
];

export default function TrustSignalBar() {
  const { lang } = useLang();

  return (
    <section className="bg-brand-50 border-y border-brand-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {signals.map((signal) => (
            <Link
              key={signal.href}
              href={signal.href}
              className="text-center group hover:opacity-80 transition-opacity"
            >
              <div className="text-3xl font-bold text-brand-800 mb-1">
                {signal.value}
              </div>
              <div className="text-sm font-semibold text-slate-700 mb-1">
                {t(signal.label, lang)}
              </div>
              <div className="text-xs text-brand-600 font-medium">
                {t(strings.stats.verify, lang)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
