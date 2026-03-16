"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/LanguageContext";
import { t, strings } from "@/lib/i18n";
import { siteStats } from "@/lib/mock-data";

function useCountUp(target: number, duration = 2000, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const steps = 60;
    const increment = target / steps;
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [target, duration, active]);
  return count;
}

function toBn(n: number | string): string {
  const map: Record<string, string> = {
    "0": "০",
    "1": "১",
    "2": "২",
    "3": "৩",
    "4": "৪",
    "5": "৫",
    "6": "৬",
    "7": "৭",
    "8": "৮",
    "9": "৯",
  };
  return String(n).replace(/[0-9]/g, (d) => map[d] ?? d);
}

export default function ImpactNumbers() {
  const { lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimated(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const lenders = useCountUp(siteStats.donors, 1500, animated);
  const branches = useCountUp(siteStats.branches, 1200, animated);

  const stats = [
    {
      // Amount disbursed — static display (no count-up needed)
      value: lang === "bn" ? `৳${toBn("7.5")}` : "৳7.5",
      suffix: strings.common.crore, // { bn: 'কোটি', en: 'Crore' }
      label: strings.impactNumbers.loansLabel,
    },
    {
      // Total lenders / donors
      value: lang === "bn" ? toBn(lenders) : lenders.toLocaleString(),
      suffix: "+",
      label: strings.impactNumbers.lendersLabel,
    },
    {
      // Branches
      value: lang === "bn" ? toBn(branches) : branches.toLocaleString(),
      suffix: "+",
      label: strings.stats.branches, // { bn: 'শাখা', en: 'Branches' }
    },
  ];

  return (
    <section ref={ref} className="bg-[#F2EDD7] py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section title */}
        <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-20">
          {t(strings.impactNumbers.heading, lang)}
        </h2>

        {/* 3-column stats grid — generous horizontal spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-16 gap-x-16 lg:gap-x-24">
          {stats.map((stat, i) => (
            <div key={i}>
              <div className="font-bold text-brand-900 leading-none flex items-end gap-1.5">
                <span className="text-6xl sm:text-7xl lg:text-8xl">
                  {stat.value}
                </span>
                <span className="text-3xl lg:text-4xl pb-1">
                  {typeof stat.suffix === "string"
                    ? stat.suffix
                    : t(stat.suffix, lang)}
                </span>
              </div>
              <p className="text-sm font-bold uppercase tracking-widest text-slate-500 mt-5">
                {t(stat.label, lang)}
              </p>
            </div>
          ))}
        </div>

        {/* Data date pill */}
        <div className="mt-16">
          <span className="inline-flex items-center border border-slate-300 rounded-full px-5 py-2 text-xs text-slate-500 bg-white/60">
            {lang === "bn"
              ? `${t(strings.impactNumbers.datePill, lang)}: ${siteStats.dataAsOf}`
              : t(strings.impactNumbers.datePill, lang)}
          </span>
        </div>
      </div>
    </section>
  );
}
