'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import { t, strings } from '@/lib/i18n';
import BreadcrumbNav from '@/components/ui/BreadcrumbNav';
import SectionLoading from '@/components/ui/SectionLoading';
import type { MasjidBranchesJson } from '@/lib/masjid-branches-scrape';

export default function BranchDetailClient({ code }: { code: string }) {
  const { lang } = useLang();
  const [data, setData] = useState<MasjidBranchesJson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/scrape/branches')
      .then(async (r) => {
        const j = await r.json();
        if (!r.ok) throw new Error(j.error ?? r.statusText);
        return j as MasjidBranchesJson;
      })
      .then((j) => {
        if (!cancelled) setData(j);
      })
      .catch((e: unknown) => {
        if (!cancelled)
          setError(e instanceof Error ? e.message : 'Load failed');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const branch = useMemo(
    () => data?.branches.find((b) => b.code === code) ?? null,
    [data, code],
  );

  const masjidDetailsUrl =
    branch?.detailId != null
      ? `https://masjid.life/AdminPage/BranchDetails?id=${branch.detailId}`
      : null;

  if (loading) {
    return (
      <section className="bg-slate-50 min-h-[50vh] py-12">
        <div className="max-w-3xl mx-auto px-4">
          <SectionLoading minHeight="16rem" />
        </div>
      </section>
    );
  }

  if (error || !branch) {
    return (
      <section className="bg-slate-50 min-h-[40vh] py-16">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-4">
          <p className="text-slate-600">
            {error ?? (lang === 'bn' ? 'শাখা পাওয়া যায়নি।' : 'Branch not found.')}
          </p>
          <Link
            href="/branches"
            className="inline-block text-brand-700 font-semibold hover:underline"
          >
            {t(strings.common.back, lang)}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-brand-900 py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <BreadcrumbNav
            items={[
              { label: t(strings.common.home, lang), href: '/' },
              { label: t(strings.branches.title, lang), href: '/branches' },
              { label: branch.code },
            ]}
          />
          <p className="text-gold-400 text-sm font-mono mt-4">{branch.code}</p>
          <h1 className="text-2xl md:text-3xl font-bold text-white mt-2">
            {branch.name}
          </h1>
        </div>
      </section>

      <section className="bg-slate-50 py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          <dl className="bg-white border border-slate-200 rounded-2xl p-6 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {lang === 'bn' ? 'জেলা' : 'District'}
              </dt>
              <dd className="text-slate-900 font-medium mt-1">
                {branch.district || '—'}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {t(strings.branches.thana, lang)}
              </dt>
              <dd className="text-slate-900 font-medium mt-1">
                {branch.thana || '—'}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {lang === 'bn' ? 'ইউনিয়ন' : 'Union'}
              </dt>
              <dd className="text-slate-900 font-medium mt-1">
                {branch.union || '—'}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {lang === 'bn' ? 'গ্রাম' : 'Village'}
              </dt>
              <dd className="text-slate-900 font-medium mt-1">
                {branch.village || '—'}
              </dd>
            </div>
          </dl>

          {masjidDetailsUrl && (
            <p className="text-sm text-slate-600 text-center">
              <a
                href={masjidDetailsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-700 font-semibold hover:underline"
              >
                {lang === 'bn'
                  ? 'Masjid.Life-এ সম্পূর্ণ শাখা প্রোফাইল ও হিসাব দেখুন →'
                  : 'Full branch profile & accounts on Masjid.Life →'}
              </a>
            </p>
          )}

          <div className="text-center">
            <Link
              href="/branches"
              className="inline-flex text-sm text-slate-600 hover:text-brand-800"
            >
              {t(strings.common.back, lang)}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
