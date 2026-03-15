'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  question: { bn: string; en: string };
  answer: { bn: string; en: string };
}

interface AccordionProps {
  items: AccordionItem[];
  lang: 'bn' | 'en';
}

function AccordionItemComponent({
  item,
  lang,
  isOpen,
  onToggle,
}: {
  item: AccordionItem;
  lang: 'bn' | 'en';
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-brand-50 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-inset"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-slate-800 pr-4">{item.question[lang]}</span>
        <ChevronDown
          className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: isOpen ? '500px' : '0' }}
      >
        <div className="p-5 pt-0 bg-white border-t border-slate-100">
          <p className="text-slate-600 leading-relaxed">{item.answer[lang]}</p>
        </div>
      </div>
    </div>
  );
}

export default function Accordion({ items, lang }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <AccordionItemComponent
          key={idx}
          item={item}
          lang={lang}
          isOpen={openIndex === idx}
          onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
        />
      ))}
    </div>
  );
}
