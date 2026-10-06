import React, { useEffect, useRef } from 'react';
import { Section } from '@/components/common/Section';
import { features } from '../../data/features';
import { deskScholarImages } from '../../data/assets';

export const FeaturesGrid: React.FC = () => {
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
      { threshold: 0.1 }
    );

    const elements = containerRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <Section id="features-grid" tone="light">
      <div ref={containerRef} className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <h2 className="animate-on-scroll transition-all duration-[420ms] ease-out opacity-0 translate-y-[14px] font-display text-h2 md:text-h1 text-ink-hi mb-12 md:mb-16">
          Capabilities
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => {
            const isWide = feature.id === 'voice' || feature.id === 'curriculum' || feature.id === 'parent-dashboard' || feature.id === 'cloud-reasoning';
            
            return (
              <div
                key={feature.id}
                className={`animate-on-scroll transition-all duration-[420ms] ease-out opacity-0 translate-y-[14px] rounded-[10px] border border-[rgba(0,0,0,0.08)] bg-paper-2 overflow-hidden flex flex-col ${
                  isWide ? 'col-span-2 md:col-span-2 lg:col-span-2' : 'col-span-1 md:col-span-1 lg:col-span-1'
                }`}
                style={{ transitionDelay: `${(index % 4) * 60}ms` }}
              >
                {feature.id === 'voice' && (
                  <div className="h-48 md:h-64 border-b border-[rgba(0,0,0,0.08)]">
                    <img src={deskScholarImages.faceDisplay} alt={feature.title} className="w-full h-full object-cover" />
                  </div>
                )}
                {feature.id === 'curriculum' && (
                  <div className="h-48 md:h-64 border-b border-[rgba(0,0,0,0.08)]">
                    <img src={deskScholarImages.projectionCloseup} alt={feature.title} className="w-full h-full object-cover" />
                  </div>
                )}
                
                <div className="p-6 md:p-8 flex flex-col justify-end flex-grow">
                  <h3 className="font-display text-body-lg text-ink-hi mb-2">{feature.title}</h3>
                  <p className="font-sans text-sm text-ink-lo">
                    {feature.description}
                    {feature.planned && ' (planned)'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};
