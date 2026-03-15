'use client';

import { useLang } from '@/lib/LanguageContext';
import { t, strings } from '@/lib/i18n';
import { testimonials } from '@/lib/mock-data';
import SectionHeader from '@/components/ui/SectionHeader';

export default function TestimonialsSection() {
  const { lang } = useLang();

  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          title={strings.testimonials.title}
          subtitle={strings.testimonials.subtitle}
          align="center"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-brand-50 border border-brand-100 rounded-xl p-6 relative"
            >
              {/* Gold quote mark */}
              <div className="text-5xl text-gold-500 font-serif leading-none mb-3 -mt-1">&ldquo;</div>
              <p className="text-slate-700 text-sm leading-relaxed mb-4">
                {t(testimonial.text, lang)}
              </p>
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-brand-100">
                {/* Avatar with initials */}
                <div className="w-10 h-10 rounded-full bg-brand-800 text-white flex items-center justify-center text-sm font-bold shrink-0">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-slate-800 text-sm">{testimonial.name}</div>
                  <div className="text-xs text-slate-500">
                    {t(testimonial.profession, lang)} · {t(testimonial.timeAgo, lang)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
