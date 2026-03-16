'use client';

import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import { t, strings } from '@/lib/i18n';
import { donationChannels } from '@/lib/mock-data';
import CopyButton from '@/components/ui/CopyButton';
import { Building2, Phone } from 'lucide-react';

export default function DonateCtaSection() {
  const { lang } = useLang();

  const bankChannel = donationChannels.find((c) => c.type === 'bank');
  const bkashChannel = donationChannels.find((c) => c.type === 'bkash');

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-brand-50 border border-brand-100 rounded-2xl p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
              {t(strings.donate.title, lang)}
            </h2>
            <p className="text-base text-slate-600 max-w-lg mx-auto">
              {t(strings.donate.subtitle, lang)}
            </p>
          </div>

          {/* Quick Channels */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {/* Bank */}
            {bankChannel && (
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-100 flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-brand-800" />
                  </div>
                  <span className="font-semibold text-slate-800 text-sm">{bankChannel.label}</span>
                </div>
                <div className="text-xs text-slate-500 mb-1">
                  {lang === 'bn' ? 'অ্যাকাউন্ট নম্বর' : 'Account Number'}
                </div>
                <div className="flex items-center gap-2">
                  <code className="text-sm font-mono text-slate-700">{bankChannel.accountNumber}</code>
                  <CopyButton text={bankChannel.accountNumber || ''} />
                </div>
                <div className="text-xs text-slate-400 mt-2">{bankChannel.accountName}</div>
              </div>
            )}

            {/* bKash */}
            {bkashChannel && (
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-pink-700" />
                  </div>
                  <span className="font-semibold text-slate-800 text-sm">{bkashChannel.label}</span>
                </div>
                <div className="text-xs text-slate-500 mb-1">
                  {lang === 'bn' ? 'নম্বর' : 'Number'}
                </div>
                <div className="flex items-center gap-2">
                  <code className="text-sm font-mono text-slate-700">{bkashChannel.number}</code>
                  <CopyButton text={bkashChannel.number || ''} />
                </div>
                <div className="text-xs text-slate-400 mt-2">{bkashChannel.holder}</div>
              </div>
            )}
          </div>

          {/* Confirmation note */}
          <div className="bg-brand-100 border border-brand-200 rounded-xl p-4 text-sm text-brand-900 mb-6">
            <span className="font-semibold">✓ </span>
            {t(strings.donate.confirm, lang)}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-white font-bold px-8 py-3 rounded-xl text-base transition-colors"
            >
              {t(strings.donate.cta, lang)} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
