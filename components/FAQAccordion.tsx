import React, { useState } from 'react';
import { FAQItem } from '../data/faqData';

interface FAQAccordionProps {
  faq: FAQItem;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden hover:border-[#e84c5c] transition-colors mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors text-left"
      >
        <span className="font-medium text-[#1a1a3a]">{faq.question}</span>
        <svg
          className={`w-5 h-5 text-[#e84c5c] transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
          <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  );
};