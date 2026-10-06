import React from 'react';
import { Section } from '@/components/common/Section';

const rows = [
  { chatbot: 'Another screen', deskscholar: 'Desk projection' },
  { chatbot: 'Usually requires typing', deskscholar: 'Natural voice interaction' },
  { chatbot: 'Often requires internet', deskscholar: 'Offline-first core experience' },
  { chatbot: 'Generic conversation', deskscholar: 'English and Urdu explanations' },
  { chatbot: 'Gives full answers quickly', deskscholar: 'Step-by-step guidance' },
  { chatbot: 'Limited physical desk awareness', deskscholar: 'Designed around books and worksheets' },
  { chatbot: 'Continuous cloud usage', deskscholar: 'Optional cloud assistance' },
];

export const ComparisonSection: React.FC = () => {
  return (
    <Section
      id="comparison"
      tone="dark"
      heading={{
        title: 'Why a device',
        description: 'How DeskScholar compares to regular AI chatbots.',
        align: 'center'
      }}
    >
      <div className="w-full overflow-x-auto relative rounded-[10px] border border-[rgba(255,255,255,0.07)] bg-ink-800">
        <div className="md:hidden absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-ink-800 to-transparent pointer-events-none flex items-center justify-end pr-2 text-text-lo">
          →
        </div>
        <table className="w-full text-left border-collapse min-w-[600px]">
          <caption className="sr-only">Comparison between regular AI chatbot and DeskScholar</caption>
          <thead>
            <tr className="bg-ink-700 border-b border-[rgba(255,255,255,0.07)]">
              <th scope="col" className="py-4 px-6 text-sm font-medium text-text-lo sticky left-0 bg-ink-700 z-10 w-1/2 md:w-auto">Regular AI chatbot</th>
              <th scope="col" className="py-4 px-6 text-sm font-semibold text-text-hi w-1/2 md:w-auto">DeskScholar (planned experience)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="border-b border-[rgba(255,255,255,0.07)] last:border-0">
                <th scope="row" className="py-4 px-6 text-sm text-text-lo font-normal sticky left-0 bg-ink-800 z-10">{row.chatbot}</th>
                <td className="py-4 px-6 text-sm text-text-hi font-medium">{row.deskscholar}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
};
