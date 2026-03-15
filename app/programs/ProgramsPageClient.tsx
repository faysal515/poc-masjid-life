'use client';

import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import { t, strings } from '@/lib/i18n';
import { programs } from '@/lib/mock-data';
import BreadcrumbNav from '@/components/ui/BreadcrumbNav';
import SectionHeader from '@/components/ui/SectionHeader';

function formatTaka(n: number): string {
  if (n >= 10000000) return `৳${(n / 10000000).toFixed(2)} কোটি`;
  if (n >= 100000) return `৳${(n / 100000).toFixed(0)} লাখ`;
  if (n > 0) return `৳${n.toLocaleString('en-BD')}`;
  return '—';
}

export default function ProgramsPageClient() {
  const { lang } = useLang();

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-900 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <BreadcrumbNav
            items={[
              { label: t(strings.common.home, lang), href: '/' },
              { label: t(strings.programs.title, lang) },
            ]}
          />
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-4">
            {t(strings.programs.title, lang)}
          </h1>
          <p className="text-brand-100 text-lg mt-2">
            {t(strings.programs.subtitle, lang)}
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 gap-6">
            {programs.map((program) => (
              <div
                key={program.slug}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-brand-200 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl shrink-0">{program.icon}</div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-slate-800 mb-2">
                      {t(program.title, lang)}
                    </h2>
                    <p className="text-slate-500 text-sm mb-4 leading-relaxed">
                      {t(program.desc, lang)}
                    </p>

                    {/* Mini Stats */}
                    {(program.beneficiaryCount || program.totalIssued) && (
                      <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                        {program.beneficiaryCount !== undefined && (
                          <div className="bg-brand-50 rounded-lg p-2">
                            <div className="text-lg font-bold text-brand-800">{program.beneficiaryCount.toLocaleString()}</div>
                            <div className="text-xs text-slate-500">{lang === 'bn' ? 'গ্রহীতা' : 'Beneficiaries'}</div>
                          </div>
                        )}
                        {program.totalIssued !== undefined && (
                          <div className="bg-brand-50 rounded-lg p-2">
                            <div className="text-sm font-bold text-brand-800">{formatTaka(program.totalIssued)}</div>
                            <div className="text-xs text-slate-500">{lang === 'bn' ? 'মোট ঋণ' : 'Total Issued'}</div>
                          </div>
                        )}
                        {program.totalRecovered !== undefined && (
                          <div className="bg-brand-50 rounded-lg p-2">
                            <div className="text-sm font-bold text-brand-800">{formatTaka(program.totalRecovered)}</div>
                            <div className="text-xs text-slate-500">{lang === 'bn' ? 'ফেরত' : 'Recovered'}</div>
                          </div>
                        )}
                      </div>
                    )}

                    <Link
                      href={`/programs/${program.slug}`}
                      className="inline-flex items-center gap-1 text-brand-700 font-semibold text-sm hover:text-brand-900 transition-colors"
                    >
                      {t(strings.programs.details, lang)}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
