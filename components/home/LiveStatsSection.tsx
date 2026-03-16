'use client';

import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import { t, strings } from '@/lib/i18n';
import { siteStats } from '@/lib/mock-data';
import SectionHeader from '@/components/ui/SectionHeader';
import StatCard from '@/components/ui/StatCard';

function formatTaka(n: number): string {
  if (n >= 10000000) return `৳${(n / 10000000).toFixed(2)} কোটি`;
  if (n >= 100000) return `৳${(n / 100000).toFixed(1)} লাখ`;
  return `৳${n.toLocaleString()}`;
}

export default function LiveStatsSection() {
  const { lang } = useLang();

  const stats = [
    { value: siteStats.branches, label: strings.stats.branches, href: '/branches' },
    { value: siteStats.borrowerCount.toLocaleString(), label: strings.stats.borrowers, href: '/borrowers' },
    { value: siteStats.districtsCovered, label: strings.stats.districts, href: '/branches' },
    { value: formatTaka(siteStats.totalLoanIssued), label: strings.stats.loanIssued, href: '/transparency' },
    { value: formatTaka(siteStats.loanRecovery), label: strings.stats.loanRecovery, href: '/transparency' },
    { value: siteStats.donors.toLocaleString(), label: strings.stats.donors, href: '/transparency' },
    { value: formatTaka(siteStats.outstandingLoan), label: strings.stats.outstanding, href: '/transparency' },
    { value: siteStats.disabledPeopleHelped, label: strings.stats.disabled, href: '/programs/help-disabled' },
    { value: '০%', label: strings.stats.adminFee, href: '/mission' },
  ];

  return (
    <section className="bg-brand-900 py-20 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          title={{ bn: 'সংক্ষিপ্ত পরিসংখ্যান', en: 'Key Statistics' }}
          subtitle={{ bn: 'সকল তথ্য যাচাইযোগ্য ও পাবলিকলি প্রকাশিত', en: 'All data is verifiable and publicly disclosed' }}
          align="center"
          light
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat, idx) => (
            <StatCard
              key={idx}
              value={stat.value}
              label={stat.label}
              href={stat.href}
              dark
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-brand-300 text-sm mb-4">
            {t(strings.stats.dataAsOf, lang)}: {siteStats.dataAsOf}
          </p>
          <Link
            href="/transparency"
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
          >
            {t(strings.stats.fullDetails, lang)}
          </Link>
        </div>
      </div>
    </section>
  );
}
