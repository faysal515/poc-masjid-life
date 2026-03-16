'use client';

import { HandCoins, Building2, Users } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { t, strings } from '@/lib/i18n';
import SectionHeader from '@/components/ui/SectionHeader';

const steps = [
  {
    number: '১',
    icon: HandCoins,
    title: strings.howItWorks.step1t,
    desc: strings.howItWorks.step1d,
  },
  {
    number: '২',
    icon: Building2,
    title: strings.howItWorks.step2t,
    desc: strings.howItWorks.step2d,
  },
  {
    number: '৩',
    icon: Users,
    title: strings.howItWorks.step3t,
    desc: strings.howItWorks.step3d,
  },
];

export default function HowItWorksSection() {
  const { lang } = useLang();

  return (
    <section id="how-it-works" className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader title={strings.howItWorks.title} align="center" />

        <div className="grid md:grid-cols-3 gap-6 md:gap-4 relative items-stretch">
          {/* Connecting line on desktop */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-brand-100 via-brand-300 to-brand-100 z-0" style={{ left: '20%', right: '20%' }} />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative z-10 flex flex-col h-full">
                {/* Step card */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center flex-1 flex flex-col min-h-0">
                  <div className="w-12 h-12 rounded-full bg-brand-800 text-white flex items-center justify-center text-lg font-bold mx-auto mb-4">
                    {step.number}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-brand-800" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">
                    {t(step.title, lang)}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-1">
                    {t(step.desc, lang)}
                  </p>
                </div>

                {/* Arrow between steps (desktop) */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                    <div className="w-6 h-6 rounded-full bg-brand-100 border-2 border-brand-300 flex items-center justify-center">
                      <span className="text-brand-800 text-xs">→</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
