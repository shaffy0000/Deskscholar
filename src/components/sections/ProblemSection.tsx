import React, { useEffect, useRef } from 'react';
import { Section } from '@/components/common/Section';

const problems = [
  {
    number: '01',
    title: 'Answers without understanding',
    description: 'Generic AI tools can generate answers quickly, but they do not always teach the reasoning needed for the next problem.',
  },
  {
    number: '02',
    title: 'The study-to-scroll trap',
    description: 'Opening a phone for one question can turn into notifications, social media, and lost concentration.',
  },
  {
    number: '03',
    title: 'Learning stops when Wi-Fi stops',
    description: 'Cloud-only learning tools can become unreliable when connectivity is slow, expensive, or unavailable.',
  },
];

export const ProblemSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-[14px]');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = containerRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <Section id="problem-section" tone="light">
      <div ref={containerRef} className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <h2 className="animate-on-scroll transition-all duration-[420ms] ease-out opacity-0 translate-y-[14px] font-display text-h2 md:text-h1 text-ink-hi mb-16 md:mb-24 max-w-[68ch]">
          Students don't need another screen. They need a better way to understand.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {problems.map((problem, index) => {
            const isFirst = index === 0;
            return (
              <div
                key={problem.number}
                className={`animate-on-scroll transition-all duration-[420ms] ease-out opacity-0 translate-y-[14px] rounded-[10px] border border-[rgba(0,0,0,0.08)] bg-paper p-8 flex flex-col gap-4 ${
                  isFirst ? 'lg:col-span-2' : 'lg:col-span-1'
                }`}
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <div className="text-sm font-sans text-ink-lo mb-4">{problem.number}</div>
                <h3 className="font-display text-h3 text-ink-hi">{problem.title}</h3>
                <p className="font-sans text-sm text-ink-lo max-w-[68ch]">{problem.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};
