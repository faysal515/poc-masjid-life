'use client';

import { useState, useMemo } from 'react';
import { useLang } from '@/lib/LanguageContext';
import { t, strings } from '@/lib/i18n';
import { borrowers, siteStats } from '@/lib/mock-data';
import BreadcrumbNav from '@/components/ui/BreadcrumbNav';
import SearchInput from '@/components/ui/SearchInput';

function formatTaka(n: number): string {
  return `৳${n.toLocaleString('en-BD')}`;
}

const loanTypes = ['All', 'সুদমুক্ত ঋণ', 'গরু ঋণ', 'শিক্ষা ঋণ', 'মসজিদ মেরামত ঋণ'];
const religions = ['All', 'Islam', 'Hinduism', 'Christianity', 'Other'];

export default function BorrowersPageClient() {
  const { lang } = useLang();
  const [search, setSearch] = useState('');
  const [loanType, setLoanType] = useState('All');
  const [religion, setReligion] = useState('All');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    return borrowers.filter((b) => {
      const matchSearch = !search || b.name.toLowerCase().includes(search.toLowerCase()) || b.branch.toLowerCase().includes(search.toLowerCase());
      const matchLoan = loanType === 'All' || b.loanType === loanType;
      const matchReligion = religion === 'All' || b.religion === religion;
      return matchSearch && matchLoan && matchReligion;
    });
  }, [search, loanType, religion]);

  const paginated = filtered.slice(0, page * pageSize);
  const hasMore = paginated.length < filtered.length;

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-900 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <BreadcrumbNav
            items={[
              { label: t(strings.common.home, lang), href: '/' },
              { label: lang === 'bn' ? 'ঋণগ্রহীতা' : 'Borrowers' },
            ]}
          />
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-4">
            {lang === 'bn'
              ? `৳${(siteStats.totalLoanIssued / 10000000).toFixed(1)} কোটি সুদমুক্ত ঋণ`
              : `৳${(siteStats.totalLoanIssued / 10000000).toFixed(1)} Crore Interest-Free Loans`}
          </h1>
          <p className="text-brand-100 text-lg mt-2">
            {lang === 'bn'
              ? `${siteStats.borrowerCount.toLocaleString()} জন গ্রহীতাকে বিতরণ করা হয়েছে`
              : `Distributed to ${siteStats.borrowerCount.toLocaleString()} borrowers`}
          </p>
        </div>
      </section>

      {/* Transparency Note */}
      <div className="bg-brand-50 border-b border-brand-100 py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-sm text-brand-800">
            <span className="font-semibold">ℹ️ </span>
            {lang === 'bn'
              ? 'স্বচ্ছতার স্বার্থে গ্রহীতাদের তথ্য প্রকাশ করা হয়।'
              : 'Borrower information is disclosed in the interest of transparency.'}
          </p>
        </div>
      </div>

      {/* Filters */}
      <section className="bg-white border-b border-slate-200 py-5 sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-wrap gap-3">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder={lang === 'bn' ? 'নাম বা শাখা খুঁজুন...' : 'Search name or branch...'}
            className="flex-1 min-w-48"
          />
          <select
            value={loanType}
            onChange={(e) => setLoanType(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 bg-white"
          >
            {loanTypes.map((lt) => (
              <option key={lt} value={lt}>
                {lt === 'All' ? (lang === 'bn' ? 'সব ঋণের ধরন' : 'All Loan Types') : lt}
              </option>
            ))}
          </select>
          <select
            value={religion}
            onChange={(e) => setReligion(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 bg-white"
          >
            {religions.map((r) => (
              <option key={r} value={r}>
                {r === 'All' ? (lang === 'bn' ? 'সব ধর্ম' : 'All Religions') : r}
              </option>
            ))}
          </select>
          <span className="flex items-center text-sm text-slate-500">
            {filtered.length} {lang === 'bn' ? 'ফলাফল' : 'results'}
          </span>
        </div>
      </section>

      {/* Table */}
      <section className="bg-slate-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[600px]">
                <thead className="bg-brand-900 text-white">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">{lang === 'bn' ? 'নাম' : 'Name'}</th>
                    <th className="text-left px-4 py-3 font-semibold">{lang === 'bn' ? 'শাখা' : 'Branch'}</th>
                    <th className="text-left px-4 py-3 font-semibold">{lang === 'bn' ? 'ঋণের ধরন' : 'Loan Type'}</th>
                    <th className="text-right px-4 py-3 font-semibold">{lang === 'bn' ? 'বিতরণ' : 'Disbursed'}</th>
                    <th className="text-right px-4 py-3 font-semibold">{lang === 'bn' ? 'ফেরত' : 'Recovered'}</th>
                    <th className="text-right px-4 py-3 font-semibold">{lang === 'bn' ? 'বাকি' : 'Balance'}</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((borrower) => (
                    <tr key={borrower.id} className="border-t border-slate-100 hover:bg-brand-50 transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold shrink-0">
                            {borrower.name.charAt(0)}
                          </div>
                          <span className="font-medium text-slate-800">{borrower.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-slate-500 text-xs">{borrower.branch}</td>
                      <td className="px-4 py-3.5">
                        <span className="text-xs bg-brand-100 text-brand-800 px-2 py-0.5 rounded-full font-medium">
                          {borrower.loanType}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right font-mono text-slate-800">{formatTaka(borrower.disbursed)}</td>
                      <td className="px-4 py-3.5 text-right font-mono text-green-700">{formatTaka(borrower.recovered)}</td>
                      <td className="px-4 py-3.5 text-right font-mono">
                        <span className={borrower.balance > 0 ? 'text-orange-600 font-semibold' : 'text-green-600'}>
                          {formatTaka(borrower.balance)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="text-center mt-6">
              <button
                onClick={() => setPage((p) => p + 1)}
                className="bg-brand-800 hover:bg-brand-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
              >
                {lang === 'bn' ? 'আরও দেখুন' : 'Load More'}
              </button>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              {t(strings.common.noResults, lang)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
