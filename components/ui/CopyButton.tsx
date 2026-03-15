'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { t, strings } from '@/lib/i18n';

interface CopyButtonProps {
  text: string;
  className?: string;
}

export default function CopyButton({ text, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const { lang } = useLang();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-brand-600 ${
        copied
          ? 'bg-green-100 text-green-700'
          : 'bg-slate-100 hover:bg-brand-100 text-slate-600 hover:text-brand-800'
      } ${className}`}
      aria-label={`Copy ${text}`}
    >
      {copied ? (
        <>
          <Check className="w-3 h-3" />
          {t(strings.transparency.copied, lang)}
        </>
      ) : (
        <>
          <Copy className="w-3 h-3" />
          {t(strings.transparency.copy, lang)}
        </>
      )}
    </button>
  );
}
