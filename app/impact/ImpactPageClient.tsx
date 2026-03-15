'use client';

import { useLang } from '@/lib/LanguageContext';
import { t, strings } from '@/lib/i18n';
import { siteStats, projectLoans, districtCounts } from '@/lib/mock-data';
import BreadcrumbNav from '@/components/ui/BreadcrumbNav';
import SectionHeader from '@/components/ui/SectionHeader';
import StatCard from '@/components/ui/StatCard';

function formatTaka(n: number): string {
  if (n >= 10000000) return `৳${(n / 10000000).toFixed(2)} কোটি`;
  if (n >= 100000) return `৳${(n / 100000).toFixed(1)} লাখ`;
  return `৳${n.toLocaleString('en-BD')}`;
}

function recoveryPercent(collected: number, issued: number): string {
  if (issued === 0) return '—';
  return `${Math.round((collected / issued) * 100)}%`;
}

const milestones = [
  { year: '2014', event: { bn: 'প্রতিষ্ঠা — প্রথম শাখা Feni-তে', en: 'Founded — First branch in Feni' } },
  { year: '2016', event: { bn: '১০০তম শাখা অর্জন', en: '100th branch milestone' } },
  { year: '2018', event: { bn: '৫০০ জন ঋণগ্রহীতা', en: '500 borrowers served' } },
  { year: '2020', event: { bn: '২৫ জেলায় বিস্তার', en: 'Expanded to 25 districts' } },
  { year: '2022', event: { bn: '২০০ শাখা, ৩ কোটি টাকা ঋণ', en: '200 branches, ৳3 crore loaned' } },
  { year: '2024', event: { bn: '৩০০+ শাখা, ৫০ জেলা', en: '300+ branches, 50 districts' } },
  { year: '2026', event: { bn: '৩৪০ শাখা, ৭.৫ কোটি টাকা ঋণ', en: '340 branches, ৳7.5 crore loaned' } },
];

export default function ImpactPageClient() {
  const { lang } = useLang();

  const stats = [
    { value: siteStats.branches, label: strings.stats.branches, href: '/branches' },
    { value: siteStats.districtsCovered, label: strings.stats.districts, href: '/branches' },
    { value: siteStats.borrowerCount.toLocaleString(), label: strings.stats.borrowers, href: '/borrowers' },
    { value: siteStats.donors.toLocaleString(), label: strings.stats.donors, href: '/transparency' },
    { value: formatTaka(siteStats.totalLoanIssued), label: strings.stats.loanIssued, href: '/transparency' },
    { value: formatTaka(siteStats.loanRecovery), label: strings.stats.loanRecovery, href: '/transparency' },
    { value: formatTaka(siteStats.outstandingLoan), label: strings.stats.outstanding, href: '/transparency' },
    { value: siteStats.disabledPeopleHelped, label: strings.stats.disabled, href: '/programs/help-disabled' },
    { value: siteStats.nonMuslimBorrowers, label: strings.stats.nonMuslim, href: '/borrowers' },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-900 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <BreadcrumbNav
            items={[
              { label: t(strings.common.home, lang), href: '/' },
              { label: lang === 'bn' ? 'প্রভাব' : 'Impact' },
            ]}
          />
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-4">
            {lang === 'bn' ? 'আমাদের প্রভাব' : 'Our Impact'}
          </h1>
          <p className="text-brand-100 text-lg mt-2">
            {lang === 'bn' ? 'সংখ্যায় বলছি — প্রতিটি সংখ্যা একটি মানুষের গল্প' : 'Speaking in numbers — every number tells a person\'s story'}
          </p>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeader
            title={{ bn: 'মূল পরিসংখ্যান', en: 'Key Statistics' }}
            subtitle={{ bn: 'সকল তথ্য যাচাইযোগ্য', en: 'All data is verifiable' }}
            align="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.map((stat, idx) => (
              <StatCard key={idx} value={stat.value} label={stat.label} href={stat.href} />
            ))}
          </div>
          <p className="text-center text-slate-400 text-sm mt-6">
            {t(strings.stats.dataAsOf, lang)}: {siteStats.dataAsOf}
          </p>
        </div>
      </section>

      {/* Project Loan Table */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeader
            title={{ bn: 'প্রজেক্ট ঋণ সারাংশ', en: 'Project Loan Summary' }}
            align="left"
            accent
          />
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[500px]">
                <thead className="bg-brand-900 text-white">
                  <tr>
                    <th className="text-left px-5 py-3 font-semibold">{lang === 'bn' ? 'প্রজেক্ট' : 'Project'}</th>
                    <th className="text-right px-5 py-3 font-semibold">{lang === 'bn' ? 'গ্রহীতা' : 'Count'}</th>
                    <th className="text-right px-5 py-3 font-semibold">{lang === 'bn' ? 'ঋণ বিতরণ' : 'Issued'}</th>
                    <th className="text-right px-5 py-3 font-semibold">{lang === 'bn' ? 'সংগ্রহ' : 'Collected'}</th>
                    <th className="text-right px-5 py-3 font-semibold">{lang === 'bn' ? 'হার' : 'Rate'}</th>
                  </tr>
                </thead>
                <tbody>
                  {projectLoans.map((loan, idx) => (
                    <tr key={idx} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="px-5 py-3.5 font-medium text-slate-800">{t(loan.name, lang)}</td>
                      <td className="px-5 py-3.5 text-right text-slate-600">{loan.issued}</td>
                      <td className="px-5 py-3.5 text-right font-mono text-slate-800">{formatTaka(loan.amount)}</td>
                      <td className="px-5 py-3.5 text-right font-mono text-slate-800">{formatTaka(loan.collected)}</td>
                      <td className="px-5 py-3.5 text-right">
                        <span className={`font-semibold ${parseFloat(recoveryPercent(loan.collected, loan.amount)) > 50 ? 'text-green-600' : 'text-orange-500'}`}>
                          {recoveryPercent(loan.collected, loan.amount)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* District Coverage */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeader
            title={{ bn: 'জেলাভিত্তিক উপস্থিতি', en: 'District-wise Presence' }}
            subtitle={{ bn: '৫০টি জেলায় ৩৪০টি শাখা', en: '340 branches across 50 districts' }}
            align="center"
          />

          {/* District map visualization */}
          <div className="bg-brand-50 rounded-xl border border-brand-100 p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {Object.entries(districtCounts)
                .sort((a, b) => b[1] - a[1])
                .map(([district, count]) => (
                  <div
                    key={district}
                    className="bg-white rounded-lg border border-slate-200 p-3 text-center hover:border-brand-300 hover:bg-brand-50 transition-colors"
                  >
                    <div className="text-xl font-bold text-brand-800">{count}</div>
                    <div className="text-xs text-slate-600 mt-1 truncate">{district}</div>
                    <div className="text-xs text-slate-400">
                      {lang === 'bn' ? 'শাখা' : 'branches'}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeader
            title={{ bn: 'আমাদের যাত্রা', en: 'Our Journey' }}
            align="center"
          />

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-brand-200" />

            <div className="space-y-6">
              {milestones.map((m, idx) => (
                <div key={idx} className="flex items-start gap-6 relative">
                  <div className="w-16 shrink-0 text-right">
                    <span className="text-sm font-bold text-brand-700">{m.year}</span>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-brand-800 mt-1 shrink-0 relative z-10" />
                  <div className="bg-white rounded-xl border border-slate-200 p-4 flex-1 shadow-sm">
                    <p className="text-slate-700 text-sm">{t(m.event, lang)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
