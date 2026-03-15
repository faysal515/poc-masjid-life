'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { t, strings } from '@/lib/i18n';

export default function FounderSection() {
  const { lang } = useLang();

  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Founder photo */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="w-72 h-80 rounded-2xl overflow-hidden shadow-xl border-4 border-white ring-1 ring-brand-100">
                <Image
                  src="/founder.jpg"
                  alt="Kamal Ahmed — Founder of Masjid.Life"
                  width={288}
                  height={320}
                  className="w-full h-full object-cover object-top"
                  priority
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-3 -right-3 w-16 h-16 rounded-xl bg-gold-500 opacity-20" />
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="inline-block bg-brand-50 text-brand-800 text-xs font-semibold px-3 py-1.5 rounded-full border border-brand-100 mb-4">
              {t(strings.founder.tag, lang)}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-1">
              {t(strings.founder.name, lang)}
            </h2>
            <div className="flex items-center gap-2 text-slate-500 text-sm mb-5">
              <MapPin className="w-4 h-4" />
              <span>{t(strings.founder.location, lang)}</span>
            </div>
            <div className="space-y-3 text-slate-600 leading-relaxed mb-6">
              <p>{t(strings.founder.bio1, lang)}</p>
              <p>{t(strings.founder.bio2, lang)}</p>
              <p>{t(strings.founder.bio3, lang)}</p>
            </div>
            <Link
              href="/mission"
              className="inline-flex items-center gap-1 text-brand-700 font-semibold hover:text-brand-900 transition-colors"
            >
              {t(strings.founder.readMore, lang)}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
