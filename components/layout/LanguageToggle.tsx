'use client';

import { useLang } from '@/lib/LanguageContext';

export default function LanguageToggle() {
  const { lang, setLang } = useLang();

  return (
    <div className="flex items-center bg-brand-800/60 rounded-lg overflow-hidden border border-brand-700/50">
      <button
        onClick={() => setLang('bn')}
        className={`px-3 py-1.5 text-xs font-semibold transition-colors duration-150 focus:outline-none ${
          lang === 'bn'
            ? 'bg-gold-500 text-white'
            : 'text-brand-100 hover:text-white'
        }`}
        aria-label="Switch to Bengali"
      >
        বাং
      </button>
      <button
        onClick={() => setLang('en')}
        className={`px-3 py-1.5 text-xs font-semibold transition-colors duration-150 focus:outline-none ${
          lang === 'en'
            ? 'bg-gold-500 text-white'
            : 'text-brand-100 hover:text-white'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
}
