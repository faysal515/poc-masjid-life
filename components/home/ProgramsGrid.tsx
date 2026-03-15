'use client';

import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import { t, strings } from '@/lib/i18n';
import { programs } from '@/lib/mock-data';
import SectionHeader from '@/components/ui/SectionHeader';

export default function ProgramsGrid() {
  const { lang } = useLang();

  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          title={strings.programs.title}
          subtitle={strings.programs.subtitle}
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {programs.map((program) => (
            <Link
              key={program.slug}
              href={`/programs/${program.slug}`}
              className="group bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-brand-200 transition-all duration-200"
            >
              <div className="text-4xl mb-3">{program.icon}</div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-brand-800 transition-colors">
                {t(program.title, lang)}
              </h3>
              <p className="text-sm text-slate-500 mb-3 leading-relaxed">
                {t(program.desc, lang)}
              </p>
              <span className="text-sm text-brand-600 font-medium">
                {t(strings.programs.details, lang)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
