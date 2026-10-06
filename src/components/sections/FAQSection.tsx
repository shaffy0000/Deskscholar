import React from 'react';
import { Section } from '@/components/common/Section';
import { homeFaqs } from '@/data/faq';

export const FAQSection: React.FC = () => {
  return (
    <Section
      id="faq"
      tone="dark"
      heading={{
        title: 'Frequently asked questions',
        align: 'center'
      }}
    >
      <div className="max-w-3xl mx-auto flex flex-col">
        {homeFaqs.map((faq: { question: string; answer: string }, i: number) => (
          <details key={i} className="group border-b border-[rgba(255,255,255,0.07)] overflow-hidden">
            <summary className="list-none flex justify-between items-center py-5 cursor-pointer font-display text-[18px] font-semibold text-text-hi transition-colors hover:text-beam rounded-control focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beam [&::-webkit-details-marker]:hidden">
              <span>{faq.question}</span>
              <span className="transform transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-open:-rotate-180 text-text-lo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </summary>
            <div className="grid grid-rows-[0fr] group-open:grid-rows-[1fr] transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
              <div className="overflow-hidden">
                <p className="text-sm text-text-lo pb-5">
                  {faq.answer}
                </p>
              </div>
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
};
