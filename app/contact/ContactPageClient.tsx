'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, AlertTriangle } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { t, strings } from '@/lib/i18n';
import { spokesmen } from '@/lib/mock-data';
import BreadcrumbNav from '@/components/ui/BreadcrumbNav';

export default function ContactPageClient() {
  const { lang } = useLang();
  const [form, setForm] = useState({ name: '', email: '', mobile: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-900 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <BreadcrumbNav
            items={[
              { label: t(strings.common.home, lang), href: '/' },
              { label: t(strings.contact.title, lang) },
            ]}
          />
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-4">
            {t(strings.contact.title, lang)}
          </h1>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="bg-amber-50 border-b border-amber-200 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-amber-900 text-sm font-medium">
            {t(strings.contact.disclaimer, lang)}
          </p>
        </div>
      </div>

      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left */}
            <div>
              {/* Spokesmen */}
              <h2 className="text-xl font-bold text-slate-800 mb-5">
                {lang === 'bn' ? 'আমাদের স্পোকসম্যান' : 'Our Spokesmen'}
              </h2>
              <div className="space-y-4 mb-10">
                {spokesmen.map((s, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4 shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-800 font-bold text-lg">
                      {s.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800 mb-0.5">{s.name}</div>
                      <div className="text-sm text-slate-500 flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5" />
                        {s.phone}
                      </div>
                    </div>
                    <a
                      href={`tel:${s.phone}`}
                      className="bg-brand-800 hover:bg-brand-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                    >
                      {t(strings.contact.callBtn, lang)}
                    </a>
                  </div>
                ))}
              </div>

              {/* Office Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-brand-50 border border-brand-100 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-700" />
                    {t(strings.contact.headOffice, lang)}
                  </h3>
                  <div className="text-sm text-slate-600 space-y-1">
                    <p>Cary, North Carolina</p>
                    <p>United States</p>
                    <p className="flex items-center gap-1 mt-2">
                      <Phone className="w-3.5 h-3.5" />
                      +1 919 360 8286
                    </p>
                    <p className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" />
                      info@masjid.life
                    </p>
                  </div>
                </div>
                <div className="bg-brand-50 border border-brand-100 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-700" />
                    {t(strings.contact.bdOffice, lang)}
                  </h3>
                  <div className="text-sm text-slate-600 space-y-1">
                    <p>Feni</p>
                    <p>Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Feedback Form */}
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-5">
                {t(strings.contact.feedback, lang)}
              </h2>

              {submitted ? (
                <div className="bg-brand-50 border border-brand-200 rounded-xl p-8 text-center">
                  <div className="text-5xl mb-4">✅</div>
                  <p className="text-brand-900 font-semibold text-lg">
                    {t(strings.contact.success, lang)}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      {t(strings.contact.name, lang)} *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      {t(strings.contact.email, lang)}
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      {t(strings.contact.mobile, lang)}
                    </label>
                    <input
                      type="tel"
                      value={form.mobile}
                      onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      {t(strings.contact.message, lang)} *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-brand-800 hover:bg-brand-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
                  >
                    {t(strings.contact.submit, lang)}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
