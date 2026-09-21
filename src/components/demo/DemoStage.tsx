import { motion, useReducedMotion } from 'framer-motion';
import { Cloud, Lock, MonitorSmartphone, Wifi, WifiOff } from 'lucide-react';
import type { DemoScenario, TranslateLang } from '../../data/demoScenarios';
import { FractionVisual } from './FractionVisual';
import { HomeworkScan } from './HomeworkScan';
import { QuizInteraction } from './QuizInteraction';
import { cn } from '../../utils/cn';

interface DemoStageProps {
  scenario: DemoScenario;
  /** Index of the currently revealed beat; drives the visual stage. */
  beatIndex: number;
  finished: boolean;
  translateLang: TranslateLang;
  onTranslateLangChange: (lang: TranslateLang) => void;
}

const LANG_OPTIONS: Array<{ id: TranslateLang; label: string }> = [
  { id: 'english', label: 'English' },
  { id: 'urdu', label: 'Urdu' },
  { id: 'bilingual', label: 'Bilingual' },
];

/** The simulated desk + projection stage for the interactive demo. */
export function DemoStage({ scenario, beatIndex, finished, translateLang, onTranslateLangChange }: DemoStageProps) {
  const reduced = useReducedMotion();
  const stage = Math.max(0, beatIndex);

  return (
    <div
      className="relative flex min-h-[440px] flex-col overflow-hidden rounded-panel border border-dark-line bg-midnight p-5 xl:min-h-[540px]"
      data-testid="demo-stage"
    >
      <div className="projection-grid-dark pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-44 w-64 -translate-x-1/2 rounded-full bg-brand/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex items-center justify-between gap-3">
        <p className="eyebrow text-slate-400">Simulated desk</p>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-aqua/35 bg-aqua/10 px-2.5 py-1 text-[11px] font-semibold text-aqua">
          <span className={cn('h-1.5 w-1.5 rounded-full bg-aqua', !reduced && 'animate-pulse-dot')} aria-hidden="true" />
          <WifiOff className="h-3 w-3" aria-hidden="true" />
          Offline mode
        </span>
      </div>

      {scenario.visual === 'translate' && (
        <div className="relative mt-4 flex justify-start sm:justify-end">
          <div
            role="group"
            aria-label="Explanation language"
            className="flex w-full rounded-full border border-dark-line bg-deep-navy p-1 sm:w-auto"
          >
            {LANG_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => onTranslateLangChange(option.id)}
                aria-pressed={translateLang === option.id}
                className={cn(
                  'min-h-9 flex-1 justify-center rounded-full px-2 text-[11px] font-semibold transition-colors sm:flex-none sm:px-3.5 sm:text-xs',
                  translateLang === option.id
                    ? 'bg-brand text-white shadow-soft'
                    : 'text-slate-300 hover:text-white',
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="relative flex flex-1 items-center justify-center py-5">
        {scenario.visual === 'scan' && <HomeworkScan stage={Math.min(stage, 4)} />}
        {scenario.visual === 'fraction' && <FractionVisual stage={Math.min(stage, 4)} />}
        {scenario.visual === 'quiz' && <QuizInteraction active={finished} />}
        {scenario.visual === 'translate' && <TranslateVisual stage={Math.min(stage, 3)} />}
        {scenario.visual === 'cloud' && <CloudVisual stage={Math.min(stage, 6)} reduced={Boolean(reduced)} />}
      </div>

      <div className="relative flex items-center justify-center gap-2 border-t border-dark-line pt-3.5">
        <MonitorSmartphone className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
        <p className="text-xs text-slate-400">
          Simulated interaction — fully scripted, runs offline in your browser.
        </p>
      </div>
    </div>
  );
}

function TranslateVisual({ stage }: { stage: number }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center" data-testid="translate-visual">
      <svg
        viewBox="0 0 240 120"
        className="h-28 w-56"
        role="img"
        aria-label="Photosynthesis diagram: sunlight, water and carbon dioxide produce glucose and oxygen"
      >
        <circle cx="42" cy="30" r="16" fill="#22C3CF" />
        {stage >= 1 &&
          [0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <line
              key={angle}
              x1={42 + 20 * Math.cos((angle * Math.PI) / 180)}
              y1={30 + 20 * Math.sin((angle * Math.PI) / 180)}
              x2={42 + 27 * Math.cos((angle * Math.PI) / 180)}
              y2={30 + 27 * Math.sin((angle * Math.PI) / 180)}
              stroke="#22C3CF"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          ))}
        <path d="M120 100 q6 -34 34 -40 q-4 32 -34 40z" fill="#127C86" />
        <path d="M120 100 q-8 -30 -32 -36 q2 28 32 36z" fill="#22C3CF" />
        <line x1="120" y1="100" x2="120" y2="64" stroke="#127C86" strokeWidth="3" strokeLinecap="round" />
        {stage >= 2 && (
          <>
            <circle cx="185" cy="88" r="4" fill="#625BF6" />
            <circle cx="197" cy="80" r="5" fill="#625BF6" opacity="0.8" />
            <circle cx="208" cy="70" r="4" fill="#625BF6" opacity="0.6" />
          </>
        )}
      </svg>
      <motion.p
        initial={false}
        className={cn(
          'rounded-card border px-4 py-2.5 font-display text-sm font-semibold transition-all duration-500',
          stage >= 3
            ? 'border-brand/40 bg-brand/10 text-brand-light'
            : 'border-dark-line bg-deep-navy text-slate-400',
        )}
        data-testid="translate-formula"
      >
        Sunlight + Water + Carbon Dioxide → Glucose + Oxygen
      </motion.p>
    </div>
  );
}

function CloudVisual({ stage, reduced }: { stage: number; reduced: boolean }) {
  const escalated = stage >= 2 && stage <= 4;
  const answered = stage >= 4;

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-2.5" data-testid="cloud-visual">
      <div className="w-full rounded-card border border-dark-line bg-deep-navy p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span
              className={cn(
                'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-500',
                answered ? 'border-aqua bg-aqua/15' : 'border-brand/50 bg-brand/10',
              )}
            >
              <MonitorSmartphone className={cn('h-5 w-5', answered ? 'text-aqua' : 'text-brand')} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="font-display text-sm font-semibold text-white">DeskScholar device</p>
              <p className="truncate text-xs text-slate-400">Voice · Tutor · Projection</p>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-aqua/35 bg-aqua/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-aqua">
            <Lock className="h-3 w-3" aria-hidden="true" /> Local
          </span>
        </div>

        <div className="my-3.5 flex items-center justify-center" aria-hidden="true">
          <div
            className={cn(
              'h-8 w-px border-l-2 border-dashed transition-colors duration-500',
              escalated ? 'border-brand' : 'border-dark-line',
            )}
          />
        </div>

        <div
          className={cn(
            'flex items-center justify-between gap-3 rounded-card border px-4 py-3 transition-all duration-500',
            escalated ? 'border-brand/50 bg-brand/10' : 'border-dark-line bg-midnight',
          )}
        >
          <div className="flex min-w-0 items-center gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/15">
              <Cloud className={cn('h-5 w-5', escalated ? 'text-brand' : 'text-slate-500')} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="font-display text-sm font-semibold text-white">Optional cloud reasoning</p>
              <p className="truncate text-xs text-slate-400">
                {escalated ? 'Enhanced explanation in progress…' : 'Only for difficult questions'}
              </p>
            </div>
          </div>
          {escalated && !reduced && (
            <motion.span
              className="h-2 w-2 shrink-0 rounded-full bg-brand"
              animate={{ y: [0, -24, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            />
          )}
        </div>
      </div>
      <p className="flex items-center gap-1.5 text-center text-xs leading-relaxed text-slate-400">
        <Wifi className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        Parent-approved escalation · speech and projection stay on device
      </p>
    </div>
  );
}
