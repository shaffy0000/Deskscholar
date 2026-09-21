import { Check, X } from 'lucide-react';
import { Section } from '../common/Section';

const rows = [
  { chatbot: 'Another screen', deskscholar: 'Desk projection' },
  { chatbot: 'Usually requires typing', deskscholar: 'Natural voice interaction' },
  { chatbot: 'Often requires internet', deskscholar: 'Offline-first core experience' },
  { chatbot: 'Generic conversation', deskscholar: 'English and Urdu explanations' },
  { chatbot: 'Gives full answers quickly', deskscholar: 'Step-by-step guidance' },
  { chatbot: 'Limited physical desk awareness', deskscholar: 'Designed around books and worksheets' },
  { chatbot: 'Continuous cloud usage', deskscholar: 'Optional cloud assistance' },
];

export function ComparisonSection() {
  return (
    <Section
      tone="midnight"
      labelledBy="comparison-heading"
      heading={{
        dark: true,
        label: 'Why a device',
        title: <span id="comparison-heading">Built for learning, not just answering.</span>,
        description: 'A general-purpose view of AI chat tools compared with the DeskScholar approach.',
      }}
    >
      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-panel border border-dark-line md:block">
        <table className="w-full text-left">
          <caption className="sr-only">Comparison between a regular AI chatbot and DeskScholar</caption>
          <thead>
            <tr className="bg-deep-navy">
              <th
                scope="col"
                className="w-1/2 px-6 py-4 font-display text-[13px] font-semibold uppercase tracking-[0.12em] text-slate-400"
              >
                Regular AI chatbot
              </th>
              <th
                scope="col"
                className="w-1/2 px-6 py-4 font-display text-[13px] font-semibold uppercase tracking-[0.12em] text-brand-light"
              >
                DeskScholar (planned experience)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-line">
            {rows.map((row) => (
              <tr key={row.chatbot} className="bg-midnight transition-colors hover:bg-deep-navy">
                <td className="px-6 py-4">
                  <span className="flex items-start gap-3 text-sm text-slate-300">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
                    {row.chatbot}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-start gap-3 text-sm font-medium text-white">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-light" aria-hidden="true" />
                    {row.deskscholar}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <ul className="grid gap-3 md:hidden">
        {rows.map((row) => (
          <li key={row.chatbot} className="overflow-hidden rounded-card border border-dark-line bg-deep-navy">
            <div className="flex items-start gap-3 border-b border-dark-line px-4 py-3.5">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">AI chatbot</p>
                <p className="mt-0.5 text-sm text-slate-300">{row.chatbot}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 px-4 py-3.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-light" aria-hidden="true" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-light">DeskScholar</p>
                <p className="mt-0.5 text-sm font-medium text-white">{row.deskscholar}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
