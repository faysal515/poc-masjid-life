'use client';

import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { t, strings } from '@/lib/i18n';
import type { Program } from '@/lib/types';
import BreadcrumbNav from '@/components/ui/BreadcrumbNav';

function formatTaka(n: number): string {
  if (n >= 10000000) return `৳${(n / 10000000).toFixed(2)} কোটি`;
  if (n >= 100000) return `৳${(n / 100000).toFixed(0)} লাখ`;
  if (n > 0) return `৳${n.toLocaleString('en-BD')}`;
  return '—';
}

interface Props {
  program: Program;
}

export default function ProgramDetailClient({ program }: Props) {
  const { lang } = useLang();

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-900 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <BreadcrumbNav
            items={[
              { label: t(strings.common.home, lang), href: '/' },
              { label: t(strings.programs.title, lang), href: '/programs' },
              { label: t(program.title, lang) },
            ]}
          />
          <div className="flex items-center gap-4 mt-4">
            <div className="text-5xl">{program.icon}</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {t(program.title, lang)}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Description */}
          <div className="prose prose-slate max-w-none mb-10">
            <p className="text-lg text-slate-600 leading-relaxed">{t(program.desc, lang)}</p>
          </div>

          {/* Stats */}
          {(program.beneficiaryCount !== undefined || program.totalIssued !== undefined) && (
            <div className="grid grid-cols-3 gap-4 mb-10">
              {program.beneficiaryCount !== undefined && (
                <div className="bg-brand-50 border border-brand-100 rounded-xl p-5 text-center">
                  <div className="text-3xl font-bold text-brand-800 mb-1">{program.beneficiaryCount.toLocaleString()}</div>
                  <div className="text-sm text-slate-600">{lang === 'bn' ? 'মোট গ্রহীতা' : 'Total Beneficiaries'}</div>
                </div>
              )}
              {program.totalIssued !== undefined && (
                <div className="bg-brand-50 border border-brand-100 rounded-xl p-5 text-center">
                  <div className="text-2xl font-bold text-brand-800 mb-1">{formatTaka(program.totalIssued)}</div>
                  <div className="text-sm text-slate-600">{lang === 'bn' ? 'মোট ঋণ' : 'Total Issued'}</div>
                </div>
              )}
              {program.totalRecovered !== undefined && (
                <div className="bg-brand-50 border border-brand-100 rounded-xl p-5 text-center">
                  <div className="text-2xl font-bold text-brand-800 mb-1">{formatTaka(program.totalRecovered)}</div>
                  <div className="text-sm text-slate-600">{lang === 'bn' ? 'ফেরত প্রাপ্ত' : 'Recovered'}</div>
                </div>
              )}
            </div>
          )}

          {/* Eligibility */}
          {program.eligibility && program.eligibility.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xl font-bold text-slate-800 mb-4">
                {lang === 'bn' ? 'যোগ্যতার মানদণ্ড' : 'Eligibility Criteria'}
              </h2>
              <ul className="space-y-2">
                {program.eligibility.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600">
                    <CheckCircle className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                    <span>{t(item, lang)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Steps */}
          {program.steps && program.steps.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xl font-bold text-slate-800 mb-4">
                {lang === 'bn' ? 'কীভাবে আবেদন করবেন' : 'How to Apply'}
              </h2>
              <ol className="space-y-3">
                {program.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="w-7 h-7 rounded-full bg-brand-800 text-white flex items-center justify-center text-sm font-bold shrink-0">
                      {idx + 1}
                    </div>
                    <div className="flex-1 pt-0.5 text-slate-600">{t(step, lang)}</div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* CTA */}
          <div className="bg-brand-50 border border-brand-100 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-slate-800 mb-1">
                {t(strings.common.findBranch, lang)}
              </h3>
              <p className="text-slate-500 text-sm">
                {lang === 'bn' ? 'নিকটবর্তী শাখায় যোগাযোগ করুন' : 'Contact your nearest branch'}
              </p>
            </div>
            <Link
              href="/branches"
              className="inline-flex items-center gap-2 bg-brand-800 hover:bg-brand-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors whitespace-nowrap"
            >
              {lang === 'bn' ? 'শাখা খুঁজুন' : 'Find Branch'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
