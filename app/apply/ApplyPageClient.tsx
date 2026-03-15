'use client';

import { useState } from 'react';
import { AlertTriangle, Building2, Megaphone, Eye, MessageSquare } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { t, strings } from '@/lib/i18n';
import { bangladeshDivisions, divisionDistricts, districtThanas } from '@/lib/mock-data';
import BreadcrumbNav from '@/components/ui/BreadcrumbNav';

const educationLevels = ['PSC', 'JSC', 'SSC', 'HSC', 'Degree', 'Masters', 'PhD', 'Other'];
const religions = ['Islam', 'Hinduism', 'Christianity', 'Buddhism', 'Other'];
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
const countries = ['Bangladesh', 'USA', 'UK', 'Canada', 'Australia', 'UAE', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Malaysia', 'Singapore', 'Germany', 'France', 'Italy', 'Spain', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Netherlands', 'Belgium', 'Switzerland', 'Japan'];

const applyRoles = [
  { key: 'branch', icon: Building2, title: { bn: 'নতুন শাখা', en: 'New Branch' }, desc: { bn: 'আপনার এলাকায় একটি নতুন শাখা খুলতে আবেদন করুন', en: 'Apply to open a new branch in your area' } },
  { key: 'spokesman', icon: Megaphone, title: { bn: 'স্পোকসম্যান', en: 'Spokesman' }, desc: { bn: 'তথ্য প্রদানকারী স্বেচ্ছাসেবী হিসেবে যোগ দিন', en: 'Join as an information-providing volunteer' } },
  { key: 'observer', icon: Eye, title: { bn: 'পর্যবেক্ষক', en: 'Observer' }, desc: { bn: 'শাখার কার্যক্রম পর্যবেক্ষণ করুন', en: 'Observe branch operations' } },
  { key: 'opinion', icon: MessageSquare, title: { bn: 'মতামত', en: 'Opinion' }, desc: { bn: 'পরামর্শ বা মতামত প্রদান করুন', en: 'Provide suggestions or feedback' } },
];

export default function ApplyPageClient() {
  const { lang } = useLang();
  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [thana, setThana] = useState('');
  const [gender, setGender] = useState('');
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [password, setPassword] = useState('');

  const availableDistricts = division ? (divisionDistricts[division] || []) : [];
  const availableThanas = district ? (districtThanas[district] || []) : [];

  const passwordStrength = () => {
    if (!password) return null;
    if (password.length < 6) return { label: lang === 'bn' ? 'দুর্বল' : 'Weak', color: 'bg-red-500' };
    if (password.length < 10) return { label: lang === 'bn' ? 'মাঝারি' : 'Fair', color: 'bg-yellow-500' };
    return { label: lang === 'bn' ? 'শক্তিশালী' : 'Strong', color: 'bg-green-500' };
  };

  const strength = passwordStrength();

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-900 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <BreadcrumbNav
            items={[
              { label: t(strings.common.home, lang), href: '/' },
              { label: t(strings.apply.title, lang) },
            ]}
          />
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-4">
            {t(strings.apply.title, lang)}
          </h1>
        </div>
      </section>

      {/* Important notice */}
      <div className="bg-amber-50 border-b border-amber-200 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-amber-900 text-sm font-semibold">
            {t(strings.apply.notice, lang)}
          </p>
        </div>
      </div>

      {/* Apply Cards */}
      <section className="bg-white py-12 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {applyRoles.map((role) => {
              const Icon = role.icon;
              return (
                <div key={role.key} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-brand-200 transition-all text-center">
                  <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-brand-800" />
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">{t(role.title, lang)}</h3>
                  <p className="text-xs text-slate-500 mb-4">{t(role.desc, lang)}</p>
                  <button className="w-full bg-brand-800 hover:bg-brand-700 text-white text-xs font-semibold py-2 rounded-lg transition-colors">
                    {t(strings.apply.apply, lang)}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">
            {lang === 'bn' ? 'ব্যবহারকারী নিবন্ধন' : 'User Registration'}
          </h2>

          {submitted ? (
            <div className="bg-brand-50 border border-brand-200 rounded-xl p-8 text-center">
              <div className="text-5xl mb-4">✅</div>
              <p className="text-brand-900 font-semibold text-lg">
                {lang === 'bn' ? 'নিবন্ধন সফল হয়েছে!' : 'Registration successful!'}
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 space-y-5"
            >
              {/* Name + Mobile */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    {lang === 'bn' ? 'পূর্ণ নাম' : 'Full Name'} *
                  </label>
                  <input type="text" required className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    {lang === 'bn' ? 'মোবাইল' : 'Mobile'} *
                  </label>
                  <input type="tel" required className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  {lang === 'bn' ? 'ইমেইল' : 'Email'}
                </label>
                <input type="email" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600" />
              </div>

              {/* Education + Religion */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    {lang === 'bn' ? 'শিক্ষাগত যোগ্যতা' : 'Education'}
                  </label>
                  <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 bg-white">
                    <option value="">-- {lang === 'bn' ? 'নির্বাচন করুন' : 'Select'} --</option>
                    {educationLevels.map((e) => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    {lang === 'bn' ? 'ধর্ম' : 'Religion'}
                  </label>
                  <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 bg-white">
                    <option value="">-- {lang === 'bn' ? 'নির্বাচন করুন' : 'Select'} --</option>
                    {religions.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>

              {/* Blood Group + Country */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    {lang === 'bn' ? 'রক্তের গ্রুপ' : 'Blood Group'}
                  </label>
                  <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 bg-white">
                    <option value="">-- Select --</option>
                    {bloodGroups.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    {lang === 'bn' ? 'পেশা' : 'Profession'}
                  </label>
                  <input type="text" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600" />
                </div>
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  {lang === 'bn' ? 'দেশ' : 'Country'} *
                </label>
                <select required className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 bg-white">
                  {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Cascading Division → District → Thana */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    {lang === 'bn' ? 'বিভাগ' : 'Division'}
                  </label>
                  <select
                    value={division}
                    onChange={(e) => { setDivision(e.target.value); setDistrict(''); setThana(''); }}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 bg-white"
                  >
                    <option value="">-- {lang === 'bn' ? 'বিভাগ' : 'Division'} --</option>
                    {bangladeshDivisions.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    {lang === 'bn' ? 'জেলা' : 'District'}
                  </label>
                  <select
                    value={district}
                    onChange={(e) => { setDistrict(e.target.value); setThana(''); }}
                    disabled={!division}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 bg-white disabled:opacity-50"
                  >
                    <option value="">-- {lang === 'bn' ? 'জেলা' : 'District'} --</option>
                    {availableDistricts.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    {lang === 'bn' ? 'থানা' : 'Thana'}
                  </label>
                  <select
                    value={thana}
                    onChange={(e) => setThana(e.target.value)}
                    disabled={!district}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 bg-white disabled:opacity-50"
                  >
                    <option value="">-- {lang === 'bn' ? 'থানা' : 'Thana'} --</option>
                    {availableThanas.map((th) => <option key={th} value={th}>{th}</option>)}
                  </select>
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {lang === 'bn' ? 'লিঙ্গ' : 'Gender'} *
                </label>
                <div className="flex gap-6">
                  {['male', 'female', 'other'].map((g) => (
                    <label key={g} className="flex items-center gap-2 cursor-pointer text-sm text-slate-700">
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={gender === g}
                        onChange={(e) => setGender(e.target.value)}
                        className="accent-brand-800"
                      />
                      {g === 'male' ? (lang === 'bn' ? 'পুরুষ' : 'Male') : g === 'female' ? (lang === 'bn' ? 'মহিলা' : 'Female') : (lang === 'bn' ? 'অন্যান্য' : 'Other')}
                    </label>
                  ))}
                </div>
              </div>

              {/* Profile Photo + NID Upload */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    {lang === 'bn' ? 'প্রোফাইল ছবি' : 'Profile Photo'}
                  </label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-brand-300 cursor-pointer">
                    <div className="text-slate-400 text-sm">
                      {lang === 'bn' ? 'ছবি আপলোড করুন' : 'Upload Photo'}
                    </div>
                    <div className="text-xs text-slate-300 mt-1">JPG, PNG max 2MB</div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    {lang === 'bn' ? 'জাতীয় পরিচয়পত্র' : 'National ID'}
                  </label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-brand-300 cursor-pointer">
                    <div className="text-slate-400 text-sm">
                      {lang === 'bn' ? 'NID আপলোড করুন' : 'Upload NID'}
                    </div>
                    <div className="text-xs text-slate-300 mt-1">JPG, PNG, PDF max 5MB</div>
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    {lang === 'bn' ? 'পাসওয়ার্ড' : 'Password'} *
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                  {strength && (
                    <div className="mt-1.5 flex items-center gap-2">
                      <div className={`h-1.5 flex-1 rounded-full ${strength.color} transition-all`} />
                      <span className="text-xs text-slate-500">{strength.label}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    {lang === 'bn' ? 'পাসওয়ার্ড নিশ্চিত করুন' : 'Confirm Password'} *
                  </label>
                  <input
                    type="password"
                    required
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>
              </div>

              {/* CAPTCHA placeholder */}
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4">
                <input
                  type="checkbox"
                  id="captcha"
                  checked={captchaChecked}
                  onChange={(e) => setCaptchaChecked(e.target.checked)}
                  className="w-4 h-4 accent-brand-800"
                />
                <label htmlFor="captcha" className="text-sm text-slate-700 cursor-pointer">
                  {lang === 'bn' ? 'আমি রোবট নই' : 'I am not a robot'}
                </label>
              </div>

              <button
                type="submit"
                disabled={!captchaChecked}
                className="w-full bg-brand-800 hover:bg-brand-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t(strings.apply.register, lang)}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
