"use client";

import { RefreshCw } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { t, strings } from "@/lib/i18n";
import SectionHeader from "@/components/ui/SectionHeader";

const steps = [
  {
    number: strings.howItWorks.step1n,
    title: strings.howItWorks.step1t,
    desc: strings.howItWorks.step1d,
  },
  {
    number: strings.howItWorks.step2n,
    title: strings.howItWorks.step2t,
    desc: strings.howItWorks.step2d,
  },
  {
    number: strings.howItWorks.step3n,
    title: strings.howItWorks.step3t,
    desc: strings.howItWorks.step3d,
  },
  {
    number: strings.howItWorks.step4n,
    title: strings.howItWorks.step4t,
    desc: strings.howItWorks.step4d,
  },
  {
    number: strings.howItWorks.step5n,
    title: strings.howItWorks.step5t,
    desc: strings.howItWorks.step5d,
  },
];

/* Label placement per step — all OUTSIDE the circle */
const labelPlacement: Array<{
  offsetX: number;
  offsetY: number;
  align: "center" | "left" | "right";
}> = [
  // 0 — top (12 o'clock): label ABOVE the dot
  { offsetX: 0, offsetY: -80, align: "center" },
  // 1 — top-right (≈2 o'clock): label to the RIGHT
  { offsetX: 75, offsetY: 0, align: "left" },
  // 2 — bottom-right (≈5 o'clock): label to the RIGHT
  { offsetX: 75, offsetY: -20, align: "left" },
  // 3 — bottom-left (≈7 o'clock): label to the LEFT
  { offsetX: -75, offsetY: -20, align: "right" },
  // 4 — top-left (≈10 o'clock): label to the LEFT
  { offsetX: -75, offsetY: 0, align: "right" },
];

export default function HowItWorksSection() {
  const { lang } = useLang();

  const getPosition = (index: number, total: number) => {
    const angle = (index * 360) / total - 90;
    const radius = 42;
    const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
    const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
    return { x, y };
  };

  return (
    <section id="how-it-works" className="bg-slate-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader title={strings.howItWorks.title} align="center" />

        {/* ── Desktop: Circular Diagram (md+) ── */}
        <div className="hidden md:block mt-20">
          <div className="relative w-full max-w-lg mx-auto aspect-square">
            {/* Solid green circle */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
            >
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.6"
                className="text-brand-800"
              />
            </svg>

            {/* Center — recycle icon + cycle label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <RefreshCw
                className="w-9 h-9 text-brand-700 mb-2 animate-spin"
                style={{ animationDuration: "3s" }}
              />
              <p className="text-sm font-bold text-black text-center leading-tight">
                {t(strings.howItWorks.cycleLabel, lang)}
              </p>
            </div>

            {/* Steps on the circle */}
            {steps.map((step, idx) => {
              const pos = getPosition(idx, steps.length);
              const lp = labelPlacement[idx];

              return (
                <div
                  key={idx}
                  className="absolute"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {/* Numbered dot */}
                  <div className="bg-brand-800 rounded-full w-12 h-12 flex items-center justify-center shadow-lg border-4 border-white z-10 relative">
                    <span className="text-base font-bold text-white">
                      {t(step.number, lang)}
                    </span>
                  </div>

                  {/* Label — outside the circle */}
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      left: `${lp.offsetX}px`,
                      top: `${lp.offsetY}px`,
                      transform:
                        lp.align === "center"
                          ? "translateX(-50%)"
                          : lp.align === "right"
                            ? "translateX(-100%)"
                            : "translateX(0%)",
                      width: "170px",
                      textAlign: lp.align,
                    }}
                  >
                    <h3 className="text-base font-bold text-slate-800 leading-snug">
                      {t(step.title, lang)}
                    </h3>
                    <p className="text-sm text-slate-500 leading-snug mt-0.5">
                      {t(step.desc, lang)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Mobile: Vertical Timeline (< md) ── */}
        <div className="md:hidden mt-12">
          <div className="relative pl-10">
            {/* Vertical connecting line */}
            <div className="absolute left-[19px] top-3 bottom-3 w-0.5 bg-brand-200" />

            {steps.map((step, idx) => (
              <div key={idx} className="relative mb-8 last:mb-0">
                {/* Number circle */}
                <div className="absolute -left-10 top-0 bg-brand-800 rounded-full w-10 h-10 flex items-center justify-center shadow-md border-2 border-white z-10">
                  <span className="text-sm font-bold text-white">
                    {t(step.number, lang)}
                  </span>
                </div>

                {/* Content */}
                <div className="pl-4 pt-1">
                  <h3 className="text-base font-bold text-slate-800">
                    {t(step.title, lang)}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mt-0.5">
                    {t(step.desc, lang)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
