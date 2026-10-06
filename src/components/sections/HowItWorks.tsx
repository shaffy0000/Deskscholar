import React, { useEffect, useRef, useState } from 'react';
import { Section } from '@/components/common/Section';
import { deskScholarImages } from '../../data/assets';

const steps = [
  {
    step: '01',
    title: 'See the desk',
    description: 'DeskScholar captures books, worksheets, handwriting, diagrams, and spoken questions without asking students to retype everything.',
  },
  {
    step: '02',
    title: 'Understand the question',
    description: 'It combines visual context, the student\'s question, and curriculum material to understand what the learner needs.',
  },
  {
    step: '03',
    title: 'Teach step by step',
    description: 'It projects hints, explanations, diagrams, and guided solutions directly onto the workspace.',
  },
];

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveStep(index);
          }
        });
      },
      { rootMargin: '-40% 0px -60% 0px' }
    );

    stepsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Calculate the height of the active rule based on activeStep
  // In a real scenario, this might need dynamic calculation, but for 3 steps, we can use percentages.
  const getRuleHeight = () => {
    if (activeStep === 0) return '0%';
    if (activeStep === 1) return '50%';
    return '100%';
  };

  return (
    <Section id="how-it-works" tone="dark">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
          <div className="md:col-span-5 flex relative">
            <div className="absolute left-[11px] top-4 bottom-8 w-[2px] bg-[rgba(255,255,255,0.07)]" />
            <div
              className="absolute left-[11px] top-4 w-[2px] bg-beam transition-all duration-[420ms] ease-out origin-top"
              style={{ height: getRuleHeight() }}
            />
            
            <div className="flex flex-col gap-16 relative z-10 w-full">
              {steps.map((step, index) => {
                const isActive = index <= activeStep;
                return (
                  <div
                    key={step.step}
                    data-index={index}
                    ref={(el) => (stepsRef.current[index] = el)}
                    className="flex gap-8 group"
                  >
                    <div className="pt-1 flex-shrink-0">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-[420ms] ease-out bg-ink-900 ${isActive ? 'border-beam' : 'border-[rgba(255,255,255,0.07)]'}`}>
                        <div className={`w-2 h-2 rounded-full transition-colors duration-[420ms] ease-out ${isActive ? 'bg-beam' : 'bg-transparent'}`} />
                      </div>
                    </div>
                    <div className={`transition-opacity duration-[420ms] ease-out ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                      <div className="text-sm font-sans text-text-lo mb-2">{step.step}</div>
                      <h3 className="font-display text-h3 text-text-hi mb-3">{step.title}</h3>
                      <p className="font-sans text-sm text-text-lo max-w-[68ch]">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="sticky top-24 rounded-[10px] overflow-hidden border border-[rgba(255,255,255,0.07)] bg-ink-800">
              <img
                src={deskScholarImages.studentUse}
                alt="Student using DeskScholar"
                className="w-full h-auto object-cover"
              />
              <div className="p-4 bg-ink-800 border-t border-[rgba(255,255,255,0.07)]">
                <p className="font-sans text-sm text-text-lo text-center">
                  The full loop in one frame — the student's hands stay on the worksheet while guidance is projected beside the problem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
