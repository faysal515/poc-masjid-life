'use client';

import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { t, strings } from '@/lib/i18n';
import { programs as mockPrograms } from '@/lib/mock-data';
import type { Program } from '@/lib/types';
import type { MasjidHomeJson } from '@/lib/masjid-home-scrape';
import { iconAndColorForProgramEnglishName } from '@/lib/program-display';
import SectionHeader from '@/components/ui/SectionHeader';
import SectionLoading from '@/components/ui/SectionLoading';
import { useMasjidHomeData } from '@/components/home/MasjidHomeDataProvider';

function useSlider() {
  const ref = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft]   = useState(false);
  const [canRight, setCanRight] = useState(true);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 0);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => { update(); }, [update]);

  const scroll = (dir: 'left' | 'right') =>
    ref.current?.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });

  return { ref, canLeft, canRight, update, scroll };
}

/* Reusable nav-button pair */
function SliderNav({
  canLeft, canRight, scroll, prevLabel, nextLabel,
}: {
  canLeft: boolean; canRight: boolean;
  scroll: (d: 'left' | 'right') => void;
  prevLabel: string; nextLabel: string;
}) {
  const btn =
    'w-11 h-11 flex items-center justify-center rounded-full bg-white shadow-md border border-slate-100 text-slate-600 hover:bg-brand-50 hover:border-brand-200 hover:text-brand-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150';
  return (
    <div className="flex gap-3">
      <button onClick={() => scroll('left')}  disabled={!canLeft}  aria-label={prevLabel} className={btn}>
        <ChevronLeft  className="w-5 h-5" />
      </button>
      <button onClick={() => scroll('right')} disabled={!canRight} aria-label={nextLabel} className={btn}>
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

/* Build list from scrape order; English titles from site; BN + body copy from mock when slug matches. */
function mergeProgramsFromScrape(
  scraped: MasjidHomeJson['programs'] | undefined,
): Program[] {
  const visuals = (titleEn: string) => iconAndColorForProgramEnglishName(titleEn);

  if (!scraped?.length) {
    return mockPrograms.map((m) => ({
      ...m,
      ...visuals(m.title.en),
    }));
  }

  const bySlug = Object.fromEntries(mockPrograms.map((p) => [p.slug, p]));
  const out: Program[] = [];

  for (const sp of scraped) {
    const m = bySlug[sp.slug];
    const { icon, color } = visuals(sp.titleEn);

    if (m) {
      out.push({
        ...m,
        icon,
        color,
        title: { bn: m.title.bn, en: sp.titleEn },
        beneficiaryCount: sp.issues ?? m.beneficiaryCount,
        totalIssued: sp.issuedTaka ?? m.totalIssued,
        totalRecovered: sp.collectedTaka ?? m.totalRecovered,
      });
      continue;
    }

    out.push({
      slug: sp.slug,
      icon,
      color,
      title: { bn: sp.titleEn, en: sp.titleEn },
      desc: {
        bn: sp.titleEn,
        en: `Learn more about ${sp.titleEn} on Masjid.Life.`,
      },
      beneficiaryCount: sp.issues,
      totalIssued: sp.issuedTaka,
      totalRecovered: sp.collectedTaka,
    });
  }

  return out.length ? out : mockPrograms.map((m) => ({ ...m, ...visuals(m.title.en) }));
}

function ProgramCard({ p, lang }: { p: Program; lang: string }) {
  return (
    <Link
      href={`/programs/${p.slug}`}
      className="flex-shrink-0 snap-start group bg-white border border-slate-200 rounded-2xl p-6 flex flex-col hover:shadow-md hover:border-brand-200 transition-all duration-200"
    >
      <div className="text-6xl mb-4 leading-none">{p.icon}</div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-brand-800 transition-colors">
        {t(p.title, lang as 'bn' | 'en')}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1">
        {t(p.desc, lang as 'bn' | 'en')}
      </p>
      <span className="mt-4 text-sm text-brand-600 font-medium">
        {t(strings.programs.details, lang as 'bn' | 'en')}
      </span>
    </Link>
  );
}

export default function ProgramsGrid() {
  const { lang } = useLang();
  const { data, loading } = useMasjidHomeData();
  const desktop = useSlider();
  const mobile  = useSlider();

  const programs = useMemo(
    () => mergeProgramsFromScrape(data?.programs),
    [data?.programs],
  );

  const featured = programs[0];
  const rest      = programs.slice(1);

  const navProps = {
    prevLabel: t(strings.programs.prevLabel, lang),
    nextLabel: t(strings.programs.nextLabel, lang),
  };

  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          title={strings.programs.title}
          subtitle={strings.programs.subtitle}
          align="center"
        />

        {loading ? (
          <SectionLoading className="mt-12" minHeight="22rem" />
        ) : (
          <>
        {/* ── Desktop: featured card + slider ── */}
        <div className="hidden lg:grid grid-cols-2 gap-6 mt-12">

          {/* Featured card */}
          <Link
            href={`/programs/${featured.slug}`}
            className="group bg-brand-900 text-white rounded-2xl p-10 flex flex-col justify-between hover:bg-brand-800 transition-colors duration-200 min-h-[420px]"
          >
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest bg-white/10 text-gold-400 px-3 py-1 rounded-full mb-6">
                {t(strings.programs.featured, lang)}
              </span>
              <div className="text-8xl mb-6 leading-none">{featured.icon}</div>
              <h3 className="text-3xl font-bold mb-4">{t(featured.title, lang)}</h3>
              <p className="text-white/70 text-base leading-relaxed">{t(featured.desc, lang)}</p>
            </div>
            <span className="mt-8 text-gold-400 font-semibold text-sm group-hover:underline">
              {t(strings.programs.details, lang)}
            </span>
          </Link>

          {/* Slider column */}
          <div className="flex flex-col gap-4">
            {/* Nav — top right */}
            <div className="flex justify-end">
              <SliderNav canLeft={desktop.canLeft} canRight={desktop.canRight} scroll={desktop.scroll} {...navProps} />
            </div>
            {/* Track — 2 cards visible */}
            <div
              ref={desktop.ref}
              onScroll={desktop.update}
              className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar flex-1"
            >
              {rest.map((p) => (
                <div key={p.slug} className="flex-shrink-0 w-[calc(50%-8px)]">
                  <ProgramCard p={p} lang={lang} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Mobile: featured (first scraped) full-width, then slider for the rest ── */}
        <div className="lg:hidden mt-10 flex flex-col gap-6">
          <Link
            href={`/programs/${featured.slug}`}
            className="group bg-brand-900 text-white rounded-2xl p-8 flex flex-col justify-between hover:bg-brand-800 transition-colors duration-200 min-h-[320px]"
          >
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest bg-white/10 text-gold-400 px-3 py-1 rounded-full mb-4">
                {t(strings.programs.featured, lang)}
              </span>
              <div className="text-7xl mb-4 leading-none">{featured.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{t(featured.title, lang)}</h3>
              <p className="text-white/70 text-sm leading-relaxed line-clamp-4">
                {t(featured.desc, lang)}
              </p>
            </div>
            <span className="mt-6 text-gold-400 font-semibold text-sm group-hover:underline">
              {t(strings.programs.details, lang)}
            </span>
          </Link>

          {rest.length > 0 ? (
            <>
              <div className="flex justify-end">
                <SliderNav canLeft={mobile.canLeft} canRight={mobile.canRight} scroll={mobile.scroll} {...navProps} />
              </div>
              <div
                ref={mobile.ref}
                onScroll={mobile.update}
                className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar -mx-4 px-4"
              >
                {rest.map((p) => (
                  <div key={p.slug} className="flex-shrink-0 w-72">
                    <ProgramCard p={p} lang={lang} />
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
          </>
        )}
      </div>
    </section>
  );
}
