'use client';

import { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { t, strings } from '@/lib/i18n';
import { branches, districtCounts } from '@/lib/mock-data';
import BreadcrumbNav from '@/components/ui/BreadcrumbNav';
import SearchInput from '@/components/ui/SearchInput';
import type { Branch } from '@/lib/types';

const allDistricts = Object.keys(districtCounts).sort();

function DistrictGroup({ district, branchList, lang }: { district: string; branchList: Branch[]; lang: 'bn' | 'en' }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden mb-3">
      <button
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
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-[2000px]' : 'max-h-0'}`}>
        <div className="border-t border-slate-100 overflow-x-auto">
          <table className="w-full text-sm min-w-[500px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-4 py-2.5 font-medium text-slate-500 text-xs">{t(strings.branches.code, lang)}</th>
                <th className="text-left px-4 py-2.5 font-medium text-slate-500 text-xs">{t(strings.branches.name, lang)}</th>
                <th className="text-left px-4 py-2.5 font-medium text-slate-500 text-xs">{t(strings.branches.thana, lang)}</th>
                <th className="text-right px-4 py-2.5 font-medium text-slate-500 text-xs">{t(strings.branches.loansIssued, lang)}</th>
                <th className="text-right px-4 py-2.5 font-medium text-slate-500 text-xs">{t(strings.branches.activeLoans, lang)}</th>
              </tr>
            </thead>
            <tbody>
              {branchList.map((branch) => (
                <tr key={branch.id} className="border-t border-slate-100 hover:bg-brand-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-slate-400">{branch.id}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">{branch.name}</td>
                  <td className="px-4 py-3 text-slate-500">{branch.thana}</td>
                  <td className="px-4 py-3 text-right text-slate-700">{branch.loansIssued}</td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-brand-700 font-semibold">{branch.activeLoans}</span>
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

export default function BranchesPageClient() {
  const { lang } = useLang();
  const [search, setSearch] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const filtered = useMemo(() => {
    return branches.filter((b) => {
      const matchSearch = !search || b.name.toLowerCase().includes(search.toLowerCase()) || b.thana.toLowerCase().includes(search.toLowerCase());
      const matchDistrict = !selectedDistrict || b.district === selectedDistrict;
      return matchSearch && matchDistrict;
    });
  }, [search, selectedDistrict]);

  // Group by district
  const grouped = useMemo(() => {
    const map: Record<string, Branch[]> = {};
    filtered.forEach((b) => {
      if (!map[b.district]) map[b.district] = [];
      map[b.district].push(b);
    });
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <>
      {/* Hero */}
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
            {t(strings.branches.subtitle, lang)}
          </p>
        </div>
      </section>

      {/* Search and Filter */}
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
            {allDistricts.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <div className="flex items-center text-sm text-slate-500 whitespace-nowrap">
            <span className="font-semibold text-slate-800">{filtered.length}</span>
            <span className="mx-1">{t(strings.branches.showing, lang)}</span>
            <span className="font-semibold text-slate-800">{branches.length}</span>
            <span className="ml-1">{t(strings.branches.showing2, lang)}</span>
          </div>
        </div>
      </section>

      {/* Branch List */}
      <section className="bg-slate-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {grouped.length === 0 ? (
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

          {/* Note about full list */}
          <div className="mt-6 bg-brand-50 border border-brand-100 rounded-xl p-5 text-center">
            <p className="text-sm text-slate-600">
              {lang === 'bn'
                ? `এখানে ${branches.length}টি শাখা দেখানো হচ্ছে। সম্পূর্ণ ${340}টি শাখার তথ্যের জন্য যোগাযোগ করুন।`
                : `Showing ${branches.length} branches. For full list of all 340 branches, please contact us.`}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
