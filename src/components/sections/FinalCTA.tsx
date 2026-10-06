import React from 'react';
import { Section } from '@/components/common/Section';
import { Link } from 'react-router-dom';

export const FinalCTA: React.FC = () => {
  return (
    <Section
      id="final-cta"
      tone="dark"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center py-12 md:py-24">
        <h2 className="font-display text-[44px] md:text-[60px] leading-tight text-text-hi mb-6">
          The future of learning doesn't need another screen.
        </h2>
        <p className="text-[18px] text-text-lo mb-10 max-w-2xl">
          Follow DeskScholar as we build an offline-first AI tutor for real desks, real classrooms, and real students. Three editions — one idea.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <Link 
            to="/contact" 
            className="bg-beam text-ink-900 font-semibold px-8 py-4 rounded-[4px] hover:bg-opacity-90 transition-colors duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none focus:ring-2 focus:ring-beam focus:ring-offset-2 focus:ring-offset-ink-900"
          >
            Join Early Access
          </Link>
          <Link 
            to="/editions" 
            className="bg-transparent text-text-hi font-semibold px-8 py-4 rounded-[4px] border border-[rgba(255,255,255,0.07)] hover:bg-[rgba(255,255,255,0.05)] transition-colors duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none focus:ring-2 focus:ring-beam focus:ring-offset-2 focus:ring-offset-ink-900"
          >
            Explore Editions
          </Link>
        </div>
        <p className="text-[12.5px] text-text-lo uppercase tracking-wider hidden">
          {/* Prevent letterspaced-capitals eyebrows as per rules */}
        </p>
        <p className="text-[12.5px] text-text-lo">
          Currently in prototype development.
        </p>
      </div>
    </Section>
  );
};
