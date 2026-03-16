import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/lib/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const bornomala = localFont({
  src: [
    { path: '../public/fonts/bornomala/bornomala-regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/bornomala/bornomala-bold.woff2',    weight: '700', style: 'normal' },
  ],
  variable: '--font-bornomala',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon-32.png',
    apple: '/favicon-32.png',
  },
  title: {
    default: 'Masjid.Life — সুদমুক্ত ঋণ | Interest-Free Loans for Bangladesh',
    template: '%s | Masjid.Life',
  },
  description:
    'Masjid.Life provides 100% interest-free loans to people across Bangladesh through 340+ mosque branches. No fee, no profit, complete transparency.',
  keywords: ['interest-free loan', 'Bangladesh', 'qarz-e-hasana', 'masjid', 'mosque', 'microfinance'],
  openGraph: {
    title: 'Masjid.Life — সুদমুক্ত ঋণ | Interest-Free Loans',
    description: '340 branches. 50 districts. 8,255 borrowers. 0% fee. Complete transparency.',
    type: 'website',
    locale: 'bn_BD',
    alternateLocale: ['en_US'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Masjid.Life — Interest-Free Loans for Bangladesh',
    description: '340 branches. 50 districts. 8,255 borrowers. 0% fee.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" className={`${bornomala.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1 pb-20 sm:pb-0">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
