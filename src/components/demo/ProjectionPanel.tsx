import { AnimatePresence, motion } from 'framer-motion';
import { Check, Loader2, Mic, Projector } from 'lucide-react';
import type { DemoStatusItem } from '../../data/demoScenarios';
import { useTypewriter } from '../../hooks/useTypewriter';
import { cn } from '../../utils/cn';
import type { ReactNode } from 'react';

export interface DemoBeat {
  kind: 'step' | 'response';
  text: string;
}

interface ProjectionPanelProps {
  prompt: string;
  beats: DemoBeat[];
  /** Index of the beat currently being revealed (-1 = not started). */
  beatIndex: number;
  skipped: boolean;
  finished: boolean;
  status: DemoStatusItem[];
  toolbar?: ReactNode;
}

const toneClasses: Record<DemoStatusItem['tone'], string> = {
  aqua: 'border-aqua/35 bg-aqua/10 text-aqua',
  violet: 'border-brand/35 bg-brand/10 text-brand-light',
  sun: 'border-sun/40 bg-sun/10 text-[#F0A55E]',
};

function TypeLine({ text, instant }: { text: string; instant: boolean }) {
  const { text: shown } = useTypewriter(text, true, instant, 18);
  return <>{shown}</>;
}

/** Simulated projection surface: student prompt, processing steps, projected tutor response. */
export function ProjectionPanel({ prompt, beats, beatIndex, skipped, finished, status, toolbar }: ProjectionPanelProps) {
  const visible = beats.slice(0, beatIndex + 1);
  const steps = visible.filter((beat) => beat.kind === 'step');
  const responses = visible.filter((beat) => beat.kind === 'response');
  const currentBeat = beats[beatIndex];

  return (
    <div
      className="relative flex min-h-[440px] flex-col overflow-hidden rounded-panel border border-dark-line bg-midnight p-5 xl:min-h-[540px]"
      data-testid="projection-panel"
    >
      {/* Projector light falling from the top edge — reads as projected light, not a chat window. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-brand/12 to-transparent"
        aria-hidden="true"
      />

      <div className="relative flex items-center justify-between gap-3">
        <p className="eyebrow flex items-center gap-2 text-brand-light">
          <Projector className="h-3.5 w-3.5" aria-hidden="true" />
          Desk projection
        </p>
        {toolbar}
      </div>

      <div className="relative mt-4 flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/20">
          <Mic className="h-4 w-4 text-brand-light" aria-hidden="true" />
        </span>
        <p
          className="rounded-card rounded-tl-sm border border-dark-line bg-deep-navy px-4 py-2.5 text-sm text-slate-200"
          data-testid="student-prompt"
        >
          “{prompt}”
        </p>
      </div>

      {steps.length > 0 && (
        <ul className="relative mt-4 space-y-1.5" aria-label="Processing steps">
          {steps.map((step, index) => {
            const isCurrent = index === steps.length - 1 && !finished && currentBeat?.kind === 'step';
            return (
              <li key={step.text} className="flex items-center gap-2 text-xs sm:text-[13px]">
                {isCurrent && !skipped ? (
                  <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-brand" aria-hidden="true" />
                ) : (
                  <Check className="h-3.5 w-3.5 shrink-0 text-aqua" aria-hidden="true" />
                )}
                <span className={cn(isCurrent ? 'text-slate-200' : 'text-slate-400')}>{step.text}</span>
              </li>
            );
          })}
        </ul>
      )}

      <div className="relative mt-4 flex-1" aria-live="polite" aria-label="DeskScholar response" role="status">
        {responses.length > 0 && (
          <div
            className="rounded-card border border-brand/30 bg-brand/10 p-4"
            data-testid="projected-response"
          >
            {responses.map((line, index) => {
              const isLast = index === responses.length - 1 && !finished;
              return (
                <p
                  key={`${line.text}-${index}`}
                  className={cn('text-sm leading-relaxed text-white sm:text-[15px]', index > 0 && 'mt-2')}
                >
                  {isLast && !skipped ? <TypeLine text={line.text} instant={false} /> : line.text}
                </p>
              );
            })}
          </div>
        )}
        {responses.length === 0 && finished && (
          <p className="text-sm text-slate-400">Waiting for your answer…</p>
        )}
      </div>

      <AnimatePresence>
        {finished && (
          <motion.ul
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative mt-4 flex flex-wrap gap-1.5 border-t border-dark-line pt-4"
            aria-label="Processing status"
            data-testid="demo-status"
          >
            {status.map((item) => (
              <li
                key={item.label}
                className={cn(
                  'rounded-full border px-2.5 py-1 text-[11px] font-semibold leading-tight sm:text-xs',
                  toneClasses[item.tone],
                )}
              >
                {item.label}: {item.value}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
