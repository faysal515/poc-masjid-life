'use client';

import { useState } from 'react';
import { Building2, Phone, CheckCircle } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { t, strings } from '@/lib/i18n';
import { donationChannels } from '@/lib/mock-data';
import BreadcrumbNav from '@/components/ui/BreadcrumbNav';
import CopyButton from '@/components/ui/CopyButton';
import Accordion from '@/components/ui/Accordion';

const presetAmounts = [500, 1000, 5000, 10000];

const faqItems = [
  {
    question: { bn: 'আমার টাকা কি সরাসরি ঋণে যাবে?', en: 'Will my money go directly to loans?' },
    answer: { bn: 'হ্যাঁ, ১০০%। কোনো প্রশাসনিক খরচ নেই। আপনার প্রতিটি টাকা শাখার মাধ্যমে ঋণগ্রহীতার হাতে পৌঁছায়।', en: 'Yes, 100%. There are no administrative costs. Every taka you donate reaches borrowers through branches.' },
  },
  {
    question: { bn: 'বিদেশ থেকে দান করা যাবে?', en: 'Can I donate from abroad?' },
    answer: { bn: 'হ্যাঁ। Islami Bank (IBBL) এ SWIFT কোড IBBLBDDH ব্যবহার করে আন্তর্জাতিক ব্যাংক ট্রান্সফার করুন।', en: 'Yes. Use SWIFT code IBBLBDDH for international bank transfers to Islami Bank (IBBL).' },
  },
  {
    question: { bn: 'দান কি কর ছাড়যোগ্য?', en: 'Is the donation tax-deductible?' },
    answer: { bn: 'এটি আপনার দেশের আইন অনুযায়ী নির্ভর করে। US-এর জন্য আমাদের সাথে যোগাযোগ করুন।', en: 'This depends on your country\'s laws. Contact us for US tax purposes.' },
  },
  {
    question: { bn: 'দান নিশ্চিত না হলে কী করবো?', en: 'What if my donation is not confirmed?' },
    answer: { bn: 'দান পাঠানোর পরে WhatsApp করুন +১ ৯১৯ ৩৬০ ৮২৮৬। ২৪ ঘণ্টার মধ্যে নিশ্চিতকরণ পাবেন।', en: 'After sending, WhatsApp +1 919 360 8286. Confirmation within 24 hours.' },
  },
  {
    question: { bn: 'bKash/Nagad কি নিরাপদ?', en: 'Is bKash/Nagad safe?' },
    answer: { bn: 'হ্যাঁ। এটি প্রতিষ্ঠাতার ব্যক্তিগত নম্বর। সকল লেনদেন /transparency পেজে প্রকাশিত হয়।', en: 'Yes. This is the founder\'s personal number. All transactions are published on the /transparency page.' },
  },
];

export default function DonatePageClient() {
  const { lang } = useLang();
  const [amount, setAmount] = useState<number | ''>('');
  const [customAmount, setCustomAmount] = useState('');
  const [activeMethod, setActiveMethod] = useState<'bank' | 'bkash' | 'nagad'>('bank');

  const bankChannels = donationChannels.filter((c) => c.type === 'bank');
  const mobileChannels = donationChannels.filter((c) => c.type === activeMethod);

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-900 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <BreadcrumbNav
            items={[
              { label: t(strings.common.home, lang), href: '/' },
              { label: t(strings.nav.donate, lang) },
            ]}
          />
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-4">
            {lang === 'bn' ? 'দান করুন — ১০০% ঋণে যায়' : 'Donate — 100% Goes to Loans'}
          </h1>
          <p className="text-brand-100 text-lg mt-2">
            {lang === 'bn' ? 'কোনো প্রশাসনিক খরচ নেই। আপনার প্রতিটি টাকা সরাসরি ঋণগ্রহীতার হাতে।' : 'No admin cost. Every taka goes directly to borrowers.'}
          </p>
        </div>
      </section>

      {/* Impact reminder */}
      <div className="bg-gold-50 border-b border-gold-100 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-3">
          <div className="text-2xl">💡</div>
          <p className="text-slate-700 text-sm">
            <span className="font-semibold">
              {lang === 'bn' ? 'আপনার ৳১,০০০ কারো জীবন বদলে দিতে পারে।' : 'Your ৳1,000 can change someone\'s life.'}
            </span>
            {' '}
            {lang === 'bn' ? '"আলহামদুলিল্লাহ, অসাধারণ উদ্যোগ।" — মোঃ শহীদুল ইসলাম, দাতা' : '"Alhamdulillah, an extraordinary initiative." — Md. Shahidul Islam, donor'}
          </p>
        </div>
      </div>

      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="space-y-8">
            {/* Step 1: Amount */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-full bg-brand-800 text-white flex items-center justify-center text-sm font-bold">১</div>
                <h2 className="text-lg font-semibold text-slate-800">
                  {lang === 'bn' ? 'পরিমাণ নির্বাচন করুন' : 'Choose Amount'}
                </h2>
              </div>
              <div className="flex flex-wrap gap-3 mb-4">
                {presetAmounts.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => { setAmount(preset); setCustomAmount(''); }}
                    className={`px-5 py-2.5 rounded-xl border-2 font-semibold text-sm transition-colors ${amount === preset ? 'border-brand-800 bg-brand-800 text-white' : 'border-slate-200 text-slate-700 hover:border-brand-600 hover:text-brand-800'}`}
                  >
                    ৳{preset.toLocaleString()}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setAmount(''); }}
                placeholder={lang === 'bn' ? 'অন্য পরিমাণ লিখুন...' : 'Enter custom amount...'}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
              />
            </div>

            {/* Step 2: Method */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-full bg-brand-800 text-white flex items-center justify-center text-sm font-bold">২</div>
                <h2 className="text-lg font-semibold text-slate-800">
                  {lang === 'bn' ? 'পদ্ধতি নির্বাচন করুন' : 'Choose Method'}
                </h2>
              </div>
              <div className="flex gap-2 mb-6">
                {(['bank', 'bkash', 'nagad'] as const).map((method) => (
                  <button
                    key={method}
                    onClick={() => setActiveMethod(method)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-colors ${activeMethod === method ? 'border-brand-800 bg-brand-800 text-white' : 'border-slate-200 text-slate-600 hover:border-brand-300'}`}
                  >
                    {method === 'bank' ? (lang === 'bn' ? 'ব্যাংক' : 'Bank') : method === 'bkash' ? 'bKash' : 'Nagad'}
                  </button>
                ))}
              </div>

              {/* Bank channels */}
              {activeMethod === 'bank' && (
                <div className="space-y-4">
                  {bankChannels.map((channel, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Building2 className="w-4 h-4 text-brand-700" />
                        <span className="font-semibold text-slate-800">{channel.label}</span>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="text-slate-400 text-xs mb-1">{lang === 'bn' ? 'অ্যাকাউন্ট নাম' : 'Account Name'}</div>
                          <div className="font-medium text-slate-700">{channel.accountName}</div>
                        </div>
                        <div>
                          <div className="text-slate-400 text-xs mb-1">{lang === 'bn' ? 'অ্যাকাউন্ট নম্বর' : 'Account Number'}</div>
                          <div className="flex items-center gap-2">
                            <code className="font-mono text-slate-800 text-xs">{channel.accountNumber}</code>
                            <CopyButton text={channel.accountNumber || ''} />
                          </div>
                        </div>
                        {channel.routing && (
                          <div>
                            <div className="text-slate-400 text-xs mb-1">Routing</div>
                            <div className="flex items-center gap-2">
                              <code className="font-mono text-xs text-slate-800">{channel.routing}</code>
                              <CopyButton text={channel.routing} />
                            </div>
                          </div>
                        )}
                        {channel.swift && (
                          <div>
                            <div className="text-slate-400 text-xs mb-1">SWIFT</div>
                            <div className="flex items-center gap-2">
                              <code className="font-mono text-xs text-slate-800">{channel.swift}</code>
                              <CopyButton text={channel.swift} />
                            </div>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-3">{t(channel.note, lang)}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Mobile channels */}
              {(activeMethod === 'bkash' || activeMethod === 'nagad') && (
                <div className="space-y-4">
                  {donationChannels
                    .filter((c) => c.type === activeMethod)
                    .map((channel, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <Phone className="w-4 h-4 text-pink-600" />
                          <span className="font-semibold text-slate-800">{channel.label}</span>
                        </div>
                        <div>
                          <div className="text-slate-400 text-xs mb-1">{lang === 'bn' ? 'নম্বর' : 'Number'}</div>
                          <div className="flex items-center gap-2 mb-2">
                            <code className="font-mono text-slate-800 text-lg font-bold">{channel.number}</code>
                            <CopyButton text={channel.number || ''} />
                          </div>
                          <div className="text-xs text-slate-500">{channel.holder}</div>
                        </div>
                        <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
                          ⚠️ {t(channel.note, lang)}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Step 3: Confirm */}
            <div className="bg-brand-50 border-2 border-brand-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-brand-800 text-white flex items-center justify-center text-sm font-bold">৩</div>
                <h2 className="text-lg font-semibold text-slate-800">
                  {lang === 'bn' ? 'পাঠানোর পর করণীয়' : 'After Sending'}
                </h2>
              </div>
              <div className="space-y-3">
                {[
                  lang === 'bn' ? 'স্ক্রিনশট তুলুন' : 'Take a screenshot',
                  lang === 'bn' ? 'WhatsApp করুন: +১ ৯১৯ ৩৬০ ৮২৮৬' : 'WhatsApp: +1 919 360 8286',
                  lang === 'bn' ? '২৪ ঘণ্টার মধ্যে নিশ্চিতকরণ পাবেন' : 'Confirmation within 24 hours',
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-brand-900">
                    <CheckCircle className="w-4 h-4 text-brand-700 shrink-0" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">
            {lang === 'bn' ? 'দাতাদের সাধারণ প্রশ্ন' : 'Common Donor Questions'}
          </h2>
          <Accordion items={faqItems} lang={lang} />
        </div>
      </section>
    </>
  );
}
