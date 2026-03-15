'use client';

import Link from 'next/link';
import { MapPin, Heart, Shield, Eye, Users, BadgeCheck, DollarSign } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { t, strings } from '@/lib/i18n';
import SectionHeader from '@/components/ui/SectionHeader';
import BreadcrumbNav from '@/components/ui/BreadcrumbNav';
import Accordion from '@/components/ui/Accordion';

const principles = [
  { icon: DollarSign, title: { bn: '১০০% স্বেচ্ছাশ্রম', en: '100% Volunteer Work' }, desc: { bn: 'কোনো কর্মচারী নেই। সবাই স্বেচ্ছাসেবী।', en: 'No paid employees. Everyone is a volunteer.' } },
  { icon: Shield, title: { bn: 'শূন্য প্রশাসনিক খরচ', en: 'Zero Admin Cost' }, desc: { bn: 'প্রতিটি দান সরাসরি ঋণে যায়। কোনো অফিস খরচ নেই।', en: 'Every donation goes directly to loans. No office overhead.' } },
  { icon: Eye, title: { bn: 'সম্পূর্ণ হিসাব প্রকাশ্য', en: 'Full Financial Disclosure' }, desc: { bn: 'প্রতিটি টাকার হিসাব পাবলিক ওয়েবসাইটে প্রকাশিত।', en: 'Every taka is accounted for on the public website.' } },
  { icon: Users, title: { bn: 'মসজিদভিত্তিক নেটওয়ার্ক', en: 'Mosque-Based Network' }, desc: { bn: 'স্থানীয় বিশ্বস্ত মসজিদ কমিটি ঋণ পরিচালনা করে।', en: 'Local trusted mosque committees manage loans.' } },
  { icon: Heart, title: { bn: 'অমুসলিমদেরও সেবা', en: 'Serving Non-Muslims Too' }, desc: { bn: '১২৪ জন অমুসলিম গ্রহীতা। ধর্মীয় বৈষম্য নেই।', en: '124 non-Muslim borrowers. No religious discrimination.' } },
  { icon: BadgeCheck, title: { bn: 'ঘূর্ণায়মান ফান্ড', en: 'Revolving Fund' }, desc: { bn: 'ফেরত আসা ঋণ পুনরায় বিতরণ করা হয়।', en: 'Repaid loans are redistributed to new borrowers.' } },
];

const faqItems = [
  {
    question: { bn: 'কীভাবে নিশ্চিত হবো যে আমার টাকা সঠিকভাবে ব্যবহার হচ্ছে?', en: 'How can I be sure my money is being used correctly?' },
    answer: { bn: 'আমাদের Transparency পেজে প্রতিটি ব্যাংক অ্যাকাউন্টের তথ্য, ফান্ড সারাংশ, এবং সকল শাখার তথ্য পাবলিকলি প্রকাশিত। আপনি যেকোনো সময় যাচাই করতে পারবেন।', en: 'Our Transparency page publicly discloses all bank account details, fund summaries, and all branch information. You can verify at any time.' },
  },
  {
    question: { bn: 'কীভাবে ঋণ পাওয়া যায়?', en: 'How can someone get a loan?' },
    answer: { bn: 'ঋণ সরাসরি স্থানীয় শাখার মাধ্যমে দেওয়া হয়। আবেদনকারীকে তার নিকটবর্তী শাখায় যোগাযোগ করতে হবে। কেন্দ্রীয়ভাবে ঋণের আবেদন করা যায় না।', en: 'Loans are given directly through local branches. Applicants must contact their nearest branch. Central loan applications are not accepted.' },
  },
  {
    question: { bn: 'কোনো সুদ বা ফি আছে কি?', en: 'Is there any interest or fee?' },
    answer: { bn: 'না। কোনো সুদ নেই, কোনো ফি নেই, কোনো লুকানো চার্জ নেই। এটি সম্পূর্ণ কর্জে হাসানা (সুদমুক্ত ঋণ)।', en: 'No. No interest, no fees, no hidden charges. This is completely Qarz-e-Hasana (interest-free loan).' },
  },
  {
    question: { bn: 'ঋণ কি শুধু মুসলিমদের জন্য?', en: 'Are loans only for Muslims?' },
    answer: { bn: 'না। আমরা ধর্ম, বর্ণ নির্বিশেষে সেবা দিই। আমাদের ১২৪ জন অমুসলিম গ্রহীতা রয়েছেন।', en: 'No. We serve regardless of religion or ethnicity. We have 124 non-Muslim borrowers.' },
  },
  {
    question: { bn: 'বিদেশ থেকে দান করা যাবে কি?', en: 'Can I donate from abroad?' },
    answer: { bn: 'হ্যাঁ। আমাদের Islami Bank (IBBL) অ্যাকাউন্টে SWIFT কোড ব্যবহার করে আন্তর্জাতিক ট্রান্সফার পাঠাতে পারবেন। SWIFT: IBBLBDDH।', en: 'Yes. You can send international transfers to our Islami Bank (IBBL) account using SWIFT code. SWIFT: IBBLBDDH.' },
  },
  {
    question: { bn: 'শাখা কীভাবে কাজ করে?', en: 'How do branches work?' },
    answer: { bn: 'প্রতিটি শাখা স্থানীয় মসজিদে পরিচালিত হয়। শাখার ব্যবস্থাপনা টিম স্থানীয় মানুষদের মধ্য থেকে নির্বাচিত স্বেচ্ছাসেবক।', en: 'Each branch operates at a local mosque. The branch management team are volunteers selected from local people.' },
  },
  {
    question: { bn: 'কোনো কর্মচারী আছে কি?', en: 'Are there any paid employees?' },
    answer: { bn: 'না। সম্পূর্ণ সংগঠন স্বেচ্ছাসেবী। কোনো বেতনভোগী কর্মকর্তা বা কর্মচারী নেই।', en: 'No. The entire organization is volunteer-based. There are no paid officers or employees.' },
  },
  {
    question: { bn: 'দান করার পরে কি নিশ্চিতকরণ পাবো?', en: 'Will I receive confirmation after donating?' },
    answer: { bn: 'হ্যাঁ। দান পাঠানোর পরে WhatsApp করুন: +১ ৯১৯ ৩৬০ ৮২৮৬। ২৪ ঘণ্টার মধ্যে নিশ্চিতকরণ পাবেন।', en: 'Yes. After sending donation, WhatsApp: +1 919 360 8286. Confirmation within 24 hours.' },
  },
];

export default function MissionPageClient() {
  const { lang } = useLang();

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-900 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <BreadcrumbNav
            items={[
              { label: t(strings.common.home, lang), href: '/' },
              { label: t(strings.mission.title, lang) },
            ]}
          />
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-4">
            {t(strings.mission.title, lang)}
          </h1>
        </div>
      </section>

      {/* Founder Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Photo */}
            <div className="flex justify-center">
              <div className="w-80 h-96 rounded-2xl bg-brand-100 border-2 border-brand-200 flex flex-col items-center justify-center">
                <div className="w-28 h-28 rounded-full bg-brand-700 text-white flex items-center justify-center text-5xl font-bold mb-4">
                  KA
                </div>
                <div className="text-brand-800 font-bold text-xl">
                  {t(strings.founder.name, lang)}
                </div>
                <div className="text-brand-600 text-sm mt-1">
                  {lang === 'bn' ? 'প্রতিষ্ঠাতা' : 'Founder'}
                </div>
                <div className="flex items-center gap-1.5 text-brand-500 text-sm mt-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Cary, NC, USA</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <div className="inline-block bg-brand-50 text-brand-800 text-xs font-semibold px-3 py-1.5 rounded-full border border-brand-100 mb-4">
                {t(strings.founder.tag, lang)}
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                {t(strings.founder.name, lang)}
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>{t(strings.founder.bio1, lang)}</p>
                <p>{t(strings.founder.bio2, lang)}</p>
                <p>{t(strings.founder.bio3, lang)}</p>
                <p>
                  {lang === 'bn'
                    ? 'একজন প্রবাসী বাংলাদেশি হিসেবে কামাল আহমেদ তার মাতৃভূমির মানুষের জন্য কিছু করতে চেয়েছিলেন — সুদের বোঝামুক্ত একটি আর্থিক সহায়তা যেখানে মানুষ মানুষের পাশে দাঁড়াবে।'
                    : 'As an expatriate Bangladeshi, Kamal Ahmed wanted to do something for the people of his homeland — a financial support free from the burden of interest, where people stand by each other.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeader
            title={strings.mission.principles}
            align="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {principles.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={idx} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-brand-800" />
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">{t(p.title, lang)}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{t(p.desc, lang)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionHeader title={strings.mission.faq} align="center" />
          <Accordion items={faqItems} lang={lang} />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-brand-50 border-t border-brand-100 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <Link
            href="/transparency"
            className="inline-flex items-center gap-2 bg-brand-800 hover:bg-brand-700 text-white font-semibold px-8 py-3 rounded-xl text-base transition-colors"
          >
            {t(strings.mission.verifyCta, lang)}
          </Link>
        </div>
      </section>
    </>
  );
}
