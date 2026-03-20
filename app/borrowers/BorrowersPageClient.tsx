'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import { t, strings } from '@/lib/i18n';
import BreadcrumbNav from '@/components/ui/BreadcrumbNav';
import SectionLoading from '@/components/ui/SectionLoading';
import type { MasjidBorrowersJson } from '@/lib/masjid-borrowers-scrape';

function formatTaka(n: number): string {
  return `৳${n.toLocaleString('en-BD')}`;
}

function nameInitial(name: string): string {
  const t = name.trim();
  if (!t) return '?';
  return t[0].toUpperCase();
}

export default function BorrowersPageClient() {
  const { lang } = useLang();
  const [data, setData] = useState<MasjidBorrowersJson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 50;

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch('/api/scrape/borrowers')
      .then(async (r) => {
        const j = await r.json();
        if (!r.ok) throw new Error(j.error ?? r.statusText);
        return j as MasjidBorrowersJson;
      })
      .then((j) => {
        setData(j);
        setPage(1);
      })
      .catch((e: unknown) =>
        setError(e instanceof Error ? e.message : 'Load failed'),
      )
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const rows = data?.borrowers ?? [];
  const visible = useMemo(() => rows.slice(0, page * pageSize), [rows, page]);
  const hasMore = visible.length < rows.length;

  const updatedLabel = useMemo(() => {
    if (!data?.fetchedAt) return '';
    const d = new Date(data.fetchedAt);
    return d.toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-BD', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  }, [data?.fetchedAt, lang]);

  return (
    <>
      <section className="bg-brand-900 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <BreadcrumbNav
            items={[
              { label: t(strings.common.home, lang), href: '/' },
              { label: t(strings.nav.borrowers, lang) },
            ]}
          />
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-4">
            {t(strings.nav.borrowers, lang)}
          </h1>
          <p className="text-brand-100 text-lg mt-2">
            {loading
              ? t(strings.common.loading, lang)
              : data
                ? lang === 'bn'
                  ? `${data.borrowers.length.toLocaleString('bn-BD')} জন গ্রহীতা`
                  : `${data.borrowers.length.toLocaleString('en-BD')} borrowers`
                : ''}
          </p>
        </div>
      </section>

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

      {!loading && !error && data && (
        <section className="bg-white border-b border-slate-200 py-4">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
            <span>
              <span className="font-semibold text-slate-800">{rows.length}</span>
              {lang === 'bn' ? 'টি রেকর্ড' : ' records'}
            </span>
            {updatedLabel ? (
              <span className="text-slate-500">
                {lang === 'bn' ? 'হালনাগাদ: ' : 'Updated '}
                {updatedLabel}
              </span>
            ) : null}
          </div>
        </section>
      )}

      <section className="bg-slate-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {loading ? (
            <SectionLoading minHeight="28rem" className="py-8" />
          ) : error ? (
            <div className="text-center py-16 space-y-4">
              <p className="text-slate-600">{error}</p>
              <button
                type="button"
                onClick={load}
                className="inline-flex items-center justify-center rounded-xl bg-brand-900 text-white px-5 py-2.5 text-sm font-semibold hover:bg-brand-800"
              >
                {lang === 'bn' ? 'আবার চেষ্টা করুন' : 'Retry'}
              </button>
            </div>
          ) : rows.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              {t(strings.common.noResults, lang)}
            </div>
          ) : (
            <>
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[720px]">
                    <thead className="bg-brand-900 text-white">
                      <tr>
                        <th className="text-left px-4 py-3 font-semibold w-16">
                          {lang === 'bn' ? 'কোড' : 'Code'}
                        </th>
                        <th className="text-left px-4 py-3 font-semibold">
                          {lang === 'bn' ? 'নাম' : 'Name'}
                        </th>
                        <th className="text-left px-4 py-3 font-semibold">
                          {lang === 'bn' ? 'শাখা' : 'Branch'}
                        </th>
                        <th className="text-right px-4 py-3 font-semibold">
                          {lang === 'bn' ? 'বিতরণ' : 'Disbursed'}
                        </th>
                        <th className="text-right px-4 py-3 font-semibold">
                          {lang === 'bn' ? 'ফেরত' : 'Recovered'}
                        </th>
                        <th className="text-right px-4 py-3 font-semibold">
                          {lang === 'bn' ? 'বাকি' : 'Balance'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {visible.map((b, i) => (
                        <tr
                          key={`${b.branchCode}-${b.borrowerCode}-${b.detailsEventTarget}-${i}`}
                          className="border-t border-slate-100 hover:bg-brand-50 transition-colors"
                        >
                          <td className="px-4 py-3.5 font-mono text-xs text-slate-600">
                            {b.borrowerCode}
                          </td>
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold shrink-0">
                                {nameInitial(b.borrowerName)}
                              </div>
                              <span className="font-medium text-slate-800 break-words">
                                {b.borrowerName || '—'}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3.5">
                            <Link
                              href={`/branches/${b.branchCode}`}
                              className="font-mono text-xs text-brand-700 hover:underline"
                            >
                              {b.branchCode}
                            </Link>
                          </td>
                          <td className="px-4 py-3.5 text-right font-mono text-slate-800">
                            {formatTaka(b.disbursed)}
                          </td>
                          <td className="px-4 py-3.5 text-right font-mono text-green-700">
                            {formatTaka(b.recovered)}
                          </td>
                          <td className="px-4 py-3.5 text-right font-mono">
                            <span
                              className={
                                b.balance > 0
                                  ? 'text-orange-600 font-semibold'
                                  : 'text-green-600'
                              }
                            >
                              {formatTaka(b.balance)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {hasMore && (
                <div className="text-center mt-6">
                  <button
                    type="button"
                    onClick={() => setPage((p) => p + 1)}
                    className="bg-brand-800 hover:bg-brand-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
                  >
                    {lang === 'bn' ? 'আরও দেখুন' : 'Load more'}
                  </button>
                </div>
              )}

              <div className="mt-6 bg-brand-50 border border-brand-100 rounded-xl p-5 text-center">
                <p className="text-sm text-slate-600">
                  {lang === 'bn'
                    ? 'তথ্য সরাসরি Masjid.Life প্রকাশ্য তালিকা থেকে।'
                    : 'Data sourced from the public Masjid.Life borrower list.'}
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
