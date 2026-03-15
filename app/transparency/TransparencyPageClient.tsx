'use client';

import Link from 'next/link';
import { RefreshCw, Download, Building2 } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { t, strings } from '@/lib/i18n';
import { fundSummaryA, fundSummaryB, bankAccounts, downloadDocuments } from '@/lib/mock-data';
import BreadcrumbNav from '@/components/ui/BreadcrumbNav';
import SectionHeader from '@/components/ui/SectionHeader';
import CopyButton from '@/components/ui/CopyButton';

function formatTaka(n: number): string {
  return `৳${n.toLocaleString('en-BD')}`;
}

export default function TransparencyPageClient() {
  const { lang } = useLang();

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-900 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <BreadcrumbNav
            items={[
              { label: t(strings.common.home, lang), href: '/' },
              { label: t(strings.transparency.title, lang) },
            ]}
          />
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-4">
            {t(strings.transparency.title, lang)}
          </h1>
          <p className="text-brand-100 text-lg mt-2">
            {t(strings.transparency.subtitle, lang)}
          </p>
        </div>
      </section>

      {/* Data freshness bar */}
      <div className="bg-brand-50 border-y border-brand-100 py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-3 text-sm">
          <RefreshCw className="w-4 h-4 text-brand-600 shrink-0" />
          <span className="text-brand-800 font-medium">{t(strings.transparency.dataUpdate, lang)}</span>
        </div>
      </div>

      {/* Fund Flow Visual */}
      <section className="bg-white py-12 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">
            {t(strings.transparency.fundFlow, lang)}
          </h2>
          <div className="overflow-x-auto">
            <div className="flex items-center gap-2 min-w-max mx-auto justify-center flex-wrap">
              {[
                { label: lang === 'bn' ? 'অনুদান' : 'Donation', color: 'bg-brand-100 border-brand-300 text-brand-900' },
                { label: '+', color: 'text-slate-400 font-bold text-xl border-0 bg-transparent', plain: true },
                { label: lang === 'bn' ? 'লেন্ডার' : 'Lender', color: 'bg-gold-100 border-gold-300 text-gold-900' },
                { label: '→', color: 'text-slate-400 font-bold text-xl border-0 bg-transparent', plain: true },
                { label: lang === 'bn' ? 'MDL ফান্ড' : 'MDL Fund', color: 'bg-brand-800 border-brand-900 text-white' },
                { label: '→', color: 'text-slate-400 font-bold text-xl border-0 bg-transparent', plain: true },
                { label: lang === 'bn' ? 'শাখায় প্রেরণ' : 'Branch Transfer', color: 'bg-brand-100 border-brand-300 text-brand-900' },
                { label: '→', color: 'text-slate-400 font-bold text-xl border-0 bg-transparent', plain: true },
                { label: lang === 'bn' ? 'ঋণ বিতরণ' : 'Loan Disbursed', color: 'bg-green-100 border-green-300 text-green-900' },
                { label: '→', color: 'text-slate-400 font-bold text-xl border-0 bg-transparent', plain: true },
                { label: lang === 'bn' ? 'ঋণ ফেরত' : 'Repayment', color: 'bg-slate-100 border-slate-300 text-slate-700' },
                { label: '→', color: 'text-slate-400 font-bold text-xl border-0 bg-transparent', plain: true },
                { label: lang === 'bn' ? 'পুনরায় বিতরণ' : 'Recycled', color: 'bg-brand-100 border-brand-300 text-brand-900' },
              ].map((item, i) => (
                item.plain ? (
                  <span key={i} className="text-slate-400 font-bold text-xl px-1">{item.label}</span>
                ) : (
                  <div key={i} className={`px-4 py-2 rounded-xl border-2 text-sm font-semibold ${item.color}`}>
                    {item.label}
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fund Summary Tables */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Table A */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-800 text-white text-xs flex items-center justify-center font-bold">ক</span>
                {t(strings.transparency.tableA, lang)}
              </h3>
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-brand-900 text-white">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold">{lang === 'bn' ? 'বিবরণ' : 'Description'}</th>
                      <th className="text-right px-4 py-3 font-semibold">{lang === 'bn' ? 'পরিমাণ (৳)' : 'Amount (৳)'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fundSummaryA.map((row) => (
                      <tr
                        key={row.id}
                        className={`border-t border-slate-100 ${row.highlight ? 'bg-brand-50 font-semibold' : 'hover:bg-slate-50'}`}
                      >
                        <td className="px-4 py-3 text-slate-700">
                          <span className="text-slate-400 text-xs mr-2">{row.id}.</span>
                          {t(row.label, lang)}
                        </td>
                        <td className={`px-4 py-3 text-right font-mono ${row.highlight ? 'text-brand-800 font-bold' : 'text-slate-800'}`}>
                          {formatTaka(row.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table B */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-800 text-white text-xs flex items-center justify-center font-bold">খ</span>
                {t(strings.transparency.tableB, lang)}
              </h3>
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-brand-900 text-white">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold">{lang === 'bn' ? 'বিবরণ' : 'Description'}</th>
                      <th className="text-right px-4 py-3 font-semibold">{lang === 'bn' ? 'পরিমাণ (৳)' : 'Amount (৳)'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fundSummaryB.map((row) => (
                      <tr
                        key={row.id}
                        className={`border-t border-slate-100 ${row.highlight ? 'bg-brand-50 font-semibold' : 'hover:bg-slate-50'}`}
                      >
                        <td className="px-4 py-3 text-slate-700">
                          <span className="text-slate-400 text-xs mr-2">{row.id}.</span>
                          {t(row.label, lang)}
                          {row.note && <span className="ml-2 text-danger-600 text-xs font-bold">({row.note})</span>}
                        </td>
                        <td className={`px-4 py-3 text-right font-mono ${row.highlight ? 'text-brand-800 font-bold' : 'text-slate-800'}`}>
                          {formatTaka(row.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bank Accounts */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeader
            title={strings.transparency.bankAccounts}
            align="left"
            accent
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bankAccounts.map((account) => (
              <div
                key={account.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* Header */}
                <div className="bg-brand-900 px-5 py-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className="w-4 h-4 text-gold-400" />
                    <span className="text-white font-semibold text-sm">{account.bank}</span>
                  </div>
                  <div className="text-brand-200 text-xs">{account.branch}</div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3 text-sm">
                  <div>
                    <div className="text-slate-400 text-xs mb-1">{lang === 'bn' ? 'অ্যাকাউন্ট নাম' : 'Account Name'}</div>
                    <div className="font-medium text-slate-800">{account.accountName}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-xs mb-1">{lang === 'bn' ? 'অ্যাকাউন্ট নম্বর' : 'Account Number'}</div>
                    <div className="flex items-center gap-2">
                      <code className="font-mono text-slate-800 text-xs">{account.accountNumber}</code>
                      <CopyButton text={account.accountNumber} />
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-xs mb-1">{lang === 'bn' ? 'রাউটিং' : 'Routing'}</div>
                    <div className="flex items-center gap-2">
                      <code className="font-mono text-slate-800 text-xs">{account.routing}</code>
                      <CopyButton text={account.routing} />
                    </div>
                  </div>
                  {account.swift && (
                    <div>
                      <div className="text-slate-400 text-xs mb-1">SWIFT</div>
                      <div className="flex items-center gap-2">
                        <code className="font-mono text-slate-800 text-xs">{account.swift}</code>
                        <CopyButton text={account.swift} />
                      </div>
                    </div>
                  )}
                  <div>
                    <div className="text-slate-400 text-xs mb-1">{lang === 'bn' ? 'স্বাক্ষরকারী' : 'Signatories'}</div>
                    <div className="text-slate-700 text-xs">{account.signatories.join(', ')}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Document Downloads */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeader
            title={strings.transparency.documents}
            align="left"
            accent
          />

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-brand-900 text-white">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold">#</th>
                  <th className="text-left px-5 py-3 font-semibold">{lang === 'bn' ? 'দলিলের নাম' : 'Document Name'}</th>
                  <th className="text-center px-5 py-3 font-semibold">{lang === 'bn' ? 'ডাউনলোড' : 'Download'}</th>
                </tr>
              </thead>
              <tbody>
                {downloadDocuments.map((doc) => (
                  <tr key={doc.id} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="px-5 py-3.5 text-slate-400 text-xs">{doc.id}</td>
                    <td className="px-5 py-3.5 text-slate-700">{t(doc.title, lang)}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex justify-center gap-2">
                        {doc.hasPdf && (
                          <button className="inline-flex items-center gap-1 text-xs px-3 py-1.5 bg-danger-100 hover:bg-danger-600 hover:text-white text-danger-600 rounded-lg font-medium transition-colors">
                            <Download className="w-3 h-3" />
                            {t(strings.transparency.pdf, lang)}
                          </button>
                        )}
                        {doc.hasDoc && (
                          <button className="inline-flex items-center gap-1 text-xs px-3 py-1.5 bg-blue-100 hover:bg-blue-600 hover:text-white text-blue-600 rounded-lg font-medium transition-colors">
                            <Download className="w-3 h-3" />
                            {t(strings.transparency.doc, lang)}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Branch verification callout */}
      <section className="bg-brand-50 border-t border-brand-100 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-xl border border-brand-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-slate-800 mb-1">
                {lang === 'bn' ? 'যেকোনো শাখার বিস্তারিত যাচাই করুন' : 'Verify Details of Any Branch'}
              </h3>
              <p className="text-slate-500 text-sm">
                {lang === 'bn' ? '৩৪০টি শাখার তথ্য পাবলিকলি উপলব্ধ।' : 'Information of 340 branches is publicly available.'}
              </p>
            </div>
            <Link
              href="/branches"
              className="bg-brand-800 hover:bg-brand-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors whitespace-nowrap"
            >
              {t(strings.branches.title, lang)} →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
