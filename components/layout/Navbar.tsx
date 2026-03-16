'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import LanguageToggle from './LanguageToggle';
import { useLang } from '@/lib/LanguageContext';
import { t, strings } from '@/lib/i18n';

const navItems = [
  { key: 'home',         href: '/' },
  { key: 'mission',      href: '/mission' },
  { key: 'impact',       href: '/impact' },
  { key: 'transparency', href: '/transparency' },
  { key: 'programs',     href: '/programs' },
  { key: 'branches',     href: '/branches' },
  { key: 'donate',       href: '/donate' },
  { key: 'contact',      href: '/contact' },
] as const;

export default function Navbar() {
  const { lang } = useLang();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-brand-900 border-b border-brand-800/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/logo.svg"
                alt="Masjid.Life logo"
                width={44}
                height={44}
                className="rounded-xl"
                priority
              />
              <span className="text-white font-bold text-xl group-hover:text-brand-100 transition-colors">
                Masjid.Life
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navItems.map((item) => {
                const label = strings.nav[item.key as keyof typeof strings.nav];
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`px-4 py-2 rounded-md text-base font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gold-500 ${
                      active
                        ? 'text-white font-semibold underline decoration-gold-500 underline-offset-4'
                        : 'text-brand-100 hover:text-white'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {t(label, lang)}
                  </Link>
                );
              })}
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              <LanguageToggle />
              <Link
                href="/donate"
                className="hidden sm:inline-flex items-center bg-gold-500 hover:bg-gold-400 text-white font-bold px-8 py-3 rounded-full text-base transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gold-400"
              >
                {t(strings.nav.donate, lang)}
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-md text-brand-100 hover:text-white hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-gold-500"
                aria-label="Toggle mobile menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="lg:hidden bg-brand-900 border-t border-brand-800/50 px-4 py-4">
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {navItems.map((item) => {
                const label = strings.nav[item.key as keyof typeof strings.nav];
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-150 ${
                      active
                        ? 'bg-brand-800 text-white font-semibold'
                        : 'text-brand-100 hover:bg-brand-800 hover:text-white'
                    }`}
                  >
                    {t(label, lang)}
                  </Link>
                );
              })}
              <Link
                href="/donate"
                onClick={() => setMobileOpen(false)}
                className="mt-3 bg-gold-500 hover:bg-gold-400 text-white font-bold px-4 py-3 rounded-xl text-sm text-center transition-colors"
              >
                {t(strings.nav.donate, lang)}
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Mobile Floating Donate Button */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 sm:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <Link
          href="/donate"
          className="flex items-center justify-center bg-gold-500 hover:bg-gold-400 active:bg-gold-600 text-white font-bold px-10 py-3.5 rounded-full shadow-xl text-sm transition-colors whitespace-nowrap"
        >
          {t(strings.nav.donate, lang)} →
        </Link>
      </div>
    </>
  );
}
