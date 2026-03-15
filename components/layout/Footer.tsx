'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Phone, MapPin, Mail } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { t, strings } from '@/lib/i18n';

export default function Footer() {
  const { lang } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-900 text-brand-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1: Logo + Tagline */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.svg"
                alt="Masjid.Life logo"
                width={36}
                height={36}
                className="rounded-lg"
              />
              <span className="text-white font-bold text-lg">Masjid.Life</span>
            </Link>
            <p className="text-sm text-brand-200 mb-2">
              {lang === 'bn'
                ? 'বাংলাদেশের মানুষের জন্য সুদমুক্ত ঋণ ও সামাজিক সেবা — সম্পূর্ণ স্বেচ্ছাসেবী।'
                : 'Interest-free loans and social services for the people of Bangladesh — completely voluntary.'}
            </p>
            <p className="text-xs text-brand-300">Since 2014</p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-brand-800 hover:bg-brand-700 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-brand-100" />
              </a>
              <a
                href="https://wa.me/19193608286"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-brand-800 hover:bg-brand-700 flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4 text-brand-100" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              {lang === 'bn' ? 'দ্রুত লিংক' : 'Quick Links'}
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/mission',      label: strings.nav.mission },
                { href: '/transparency', label: strings.nav.transparency },
                { href: '/programs',     label: strings.nav.programs },
                { href: '/branches',     label: strings.nav.branches },
                { href: '/donate',       label: strings.nav.donate },
                { href: '/contact',      label: strings.nav.contact },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-brand-200 hover:text-white transition-colors"
                  >
                    {t(link.label, lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              {lang === 'bn' ? 'যোগাযোগ' : 'Contact'}
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-brand-300 text-xs font-medium mb-1">
                  {lang === 'bn' ? 'প্রধান অফিস' : 'Head Office'}
                </p>
                <div className="flex gap-2 text-brand-200">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-brand-400" />
                  <span>Cary, North Carolina, USA</span>
                </div>
                <div className="flex gap-2 text-brand-200 mt-1">
                  <Phone className="w-3.5 h-3.5 mt-0.5 shrink-0 text-brand-400" />
                  <span>+1 919 360 8286</span>
                </div>
              </div>
              <div>
                <p className="text-brand-300 text-xs font-medium mb-1">
                  {lang === 'bn' ? 'বাংলাদেশ অফিস' : 'Bangladesh Office'}
                </p>
                <div className="flex gap-2 text-brand-200">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-brand-400" />
                  <span>Feni, Bangladesh</span>
                </div>
              </div>
              <div className="flex gap-2 text-brand-200">
                <Mail className="w-3.5 h-3.5 mt-0.5 shrink-0 text-brand-400" />
                <span>info@masjid.life</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-brand-800/50 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-400">
          <p>© {year} Masjid.Life. {lang === 'bn' ? 'সর্বস্বত্ব সংরক্ষিত।' : 'All rights reserved.'}</p>
          <p>{lang === 'bn' ? 'ডিজাইন করেছেন: Chandrika' : 'Designed by: Chandrika'}</p>
        </div>
      </div>
    </footer>
  );
}
