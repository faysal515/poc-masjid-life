'use client';

import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import { t, strings } from '@/lib/i18n';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const { lang } = useLang();

  return (
    <section
      className="min-h-[80vh] bg-brand-900 flex items-center relative overflow-hidden"
      style={{
        backgroundImage: 'radial-gradient(ellipse at 70% 50%, #2E7D4F 0%, #1F5C3A 40%, #0D2119 100%)',
      }}
    >
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 70px)',
      }} />

      {/* Mosque silhouette */}
      <svg
        aria-hidden="true"
        viewBox="0 0 320 520"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-0 bottom-0 h-[60%] sm:h-[78%] lg:h-[95%] w-auto opacity-[0.07] sm:opacity-[0.09] pointer-events-none select-none"
      >
        {/* Left minaret */}
        <rect x="30" y="162" width="24" height="100" rx="2" />
        <path d="M 30 164 L 42 118 L 54 164 Z" />
        <circle cx="42" cy="115" r="4" />
        {/* Right minaret */}
        <rect x="266" y="162" width="24" height="100" rx="2" />
        <path d="M 266 164 L 278 118 L 290 164 Z" />
        <circle cx="278" cy="115" r="4" />
        {/* Dome drum */}
        <rect x="100" y="198" width="120" height="46" rx="2" />
        {/* Main onion dome */}
        <path d="M 100 200 C 58 182, 52 82, 160 40 C 268 82, 262 182, 220 200 Z" />
        {/* Finial */}
        <rect x="157" y="22" width="6" height="22" rx="1" />
        <circle cx="160" cy="19" r="5" />
        {/* Building body with arch cutouts */}
        <path
          fillRule="evenodd"
          d="M 22 242 L 298 242 L 298 520 L 22 520 Z M 130 520 L 130 372 A 30 34 0 0 0 190 372 L 190 520 Z M 48 322 L 48 288 A 18 18 0 0 0 84 288 L 84 322 Z M 236 322 L 236 288 A 18 18 0 0 0 272 288 L 272 322 Z"
        />
      </svg>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 w-full relative z-10">
        <div className="max-w-2xl">
          {/* Tagline chip */}
          <div className="inline-flex items-center bg-brand-800/60 text-brand-100 text-xs px-3 py-1.5 rounded-full border border-brand-700/50 mb-5">
            {t(strings.hero.tagline, lang)}
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            {t(strings.hero.headline, lang)}
          </h1>

          {/* Sub-headline */}
          <p className="text-lg md:text-xl text-brand-100 mb-6">
            {t(strings.hero.subheadline, lang)}
          </p>

          {/* Proof chips */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[strings.hero.proof1, strings.hero.proof2, strings.hero.proof3].map((p, i) => (
              <span
                key={i}
                className="bg-brand-800/60 text-brand-100 border border-brand-700/50 text-sm px-4 py-1.5 rounded-full"
              >
                {t(p, lang)}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-white font-bold px-6 py-3 rounded-xl text-base transition-colors duration-150 shadow-lg"
            >
              {t(strings.hero.cta_primary, lang)}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 border-2 border-white/40 text-white hover:bg-white hover:text-brand-900 font-semibold px-6 py-3 rounded-xl text-base transition-colors duration-150"
            >
              {t(strings.hero.cta_secondary, lang)}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
