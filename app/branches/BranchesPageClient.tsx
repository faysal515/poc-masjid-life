'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { t, strings } from '@/lib/i18n';
import BreadcrumbNav from '@/components/ui/BreadcrumbNav';
import SearchInput from '@/components/ui/SearchInput';
import SectionLoading from '@/components/ui/SectionLoading';
import type { MasjidBranchesJson } from '@/lib/masjid-branches-scrape';

type BranchTableRow = {
  id: string;
  name: string;
  district: string;
  thana: string;
  loansIssued: number | null;
  activeLoans: number | null;
  detailId: string | null;
};

function DistrictGroup({
  district,
  branchList,
  lang,
}: {
  district: string;
  branchList: BranchTableRow[];
  lang: 'bn' | 'en';
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden mb-3">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-brand-50 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-inset"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-800">{district}</span>
          <span className="text-xs font-medium bg-brand-100 text-brand-800 px-2 py-0.5 rounded-full">
            {branchList.length} {lang === 'bn' ? 'শাখা' : 'branches'}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-[2000px]' : 'max-h-0'}`}
      >
        <div className="border-t border-slate-100 overflow-x-auto">
          <table className="w-full text-sm min-w-[500px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-4 py-2.5 font-medium text-slate-500 text-xs">
                  {t(strings.branches.code, lang)}
                </th>
                <th className="text-left px-4 py-2.5 font-medium text-slate-500 text-xs">
                  {t(strings.branches.name, lang)}
                </th>
                <th className="text-left px-4 py-2.5 font-medium text-slate-500 text-xs">
                  {t(strings.branches.thana, lang)}
                </th>
                <th className="text-right px-4 py-2.5 font-medium text-slate-500 text-xs">
                  {t(strings.branches.loansIssued, lang)}
                </th>
                <th className="text-right px-4 py-2.5 font-medium text-slate-500 text-xs">
                  {t(strings.branches.activeLoans, lang)}
                </th>
              </tr>
            </thead>
            <tbody>
              {branchList.map((branch) => (
                <tr
                  key={branch.id}
                  className="border-t border-slate-100 hover:bg-brand-50 transition-colors"
                >
                  <td className="px-4 py-3 font-mono text-xs text-slate-400">
                    <Link
                      href={`/branches/${branch.id}`}
                      className="text-brand-700 hover:underline"
                    >
                      {branch.id}
                    </Link>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800">
                    <Link
                      href={`/branches/${branch.id}`}
                      className="hover:text-brand-700 hover:underline"
                    >
                      {branch.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{branch.thana}</td>
                  <td className="px-4 py-3 text-right text-slate-700">
                    {branch.loansIssued === null ? '—' : branch.loansIssued}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-brand-700 font-semibold">
                      {branch.activeLoans === null ? '—' : branch.activeLoans}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function rowsFromApi(json: MasjidBranchesJson, otherLabel: string): BranchTableRow[] {
  return json.branches.map((b) => ({
    id: b.code,
    name: b.name,
    district: (b.district.trim() || otherLabel).replace(/\s+/g, ' '),
    thana: b.thana,
    loansIssued: null,
    activeLoans: null,
    detailId: b.detailId,
  }));
}

export default function BranchesPageClient() {
  const { lang } = useLang();
  const [data, setData] = useState<MasjidBranchesJson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch('/api/scrape/branches')
      .then(async (r) => {
        const j = await r.json();
        if (!r.ok) throw new Error(j.error ?? r.statusText);
        return j as MasjidBranchesJson;
      })
      .then(setData)
      .catch((e: unknown) =>
        setError(e instanceof Error ? e.message : 'Load failed'),
      )
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const otherLabel = lang === 'bn' ? 'অন্যান্য' : 'Other';

  const tableRows = useMemo(
    () => (data ? rowsFromApi(data, otherLabel) : []),
    [data, otherLabel],
  );

  const districtNames = useMemo(() => {
    if (!data?.districts?.length) {
      const fromRows = [...new Set(tableRows.map((r) => r.district))];
      return fromRows.sort((a, b) => a.localeCompare(b));
    }
    return [...data.districts.map((d) => d.name)].sort((a, b) =>
      a.localeCompare(b),
    );
  }, [data, tableRows]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tableRows.filter((b) => {
      const matchSearch =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.thana.toLowerCase().includes(q) ||
        b.id.includes(q) ||
        b.district.toLowerCase().includes(q);
      const matchDistrict =
        !selectedDistrict || b.district === selectedDistrict;
      return matchSearch && matchDistrict;
    });
  }, [tableRows, search, selectedDistrict]);

  const grouped = useMemo(() => {
    const map: Record<string, BranchTableRow[]> = {};
    filtered.forEach((b) => {
      if (!map[b.district]) map[b.district] = [];
      map[b.district].push(b);
    });
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  const total = tableRows.length;

  return (
    <>
      <section className="bg-brand-900 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <BreadcrumbNav
            items={[
              { label: t(strings.common.home, lang), href: '/' },
              { label: t(strings.branches.title, lang) },
            ]}
          />
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-4">
            {t(strings.branches.title, lang)}
          </h1>
          <p className="text-brand-100 text-lg mt-2">
            {data?.headline
              ? data.headline
              : t(strings.branches.subtitle, lang)}
          </p>
        </div>
      </section>

      {!loading && !error && (
        <section className="bg-white border-b border-slate-200 py-5 sticky top-16 z-30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row gap-3">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder={t(strings.branches.search, lang)}
              className="flex-1"
            />
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 bg-white min-w-40"
            >
              <option value="">{t(strings.common.allDistricts, lang)}</option>
              {districtNames.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <div className="flex items-center text-sm text-slate-500 whitespace-nowrap">
              <span className="font-semibold text-slate-800">
                {filtered.length}
              </span>
              <span className="mx-1">{t(strings.branches.showing, lang)}</span>
              <span className="font-semibold text-slate-800">{total}</span>
              <span className="ml-1">{t(strings.branches.showing2, lang)}</span>
            </div>
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
          ) : grouped.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              {t(strings.common.noResults, lang)}
            </div>
          ) : (
            grouped.map(([district, branchList]) => (
              <DistrictGroup
                key={district}
                district={district}
                branchList={branchList}
                lang={lang}
              />
            ))
          )}

          {!loading && !error && data && (
            <div className="mt-6 bg-brand-50 border border-brand-100 rounded-xl p-5 text-center">
              <p className="text-sm text-slate-600">
                {lang === 'bn'
                  ? `${data.summary.branchCount}টি শাখা, ${data.summary.districtCount}টি জেলা। তথ্য Masjid.Life থেকে আপডেট।`
                  : `${data.summary.branchCount} branches across ${data.summary.districtCount} districts. Data synced from Masjid.Life.`}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
