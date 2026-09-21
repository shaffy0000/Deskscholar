import { RotateCcw, SkipForward } from 'lucide-react';
import type { DemoScenario } from '../../data/demoScenarios';
import { cn } from '../../utils/cn';

interface DemoControlsProps {
  scenarios: DemoScenario[];
  activeId: string;
  onSelect: (id: string) => void;
  onReplay: () => void;
  onSkip: () => void;
  finished: boolean;
}

const modeHints: Record<string, string> = {
  scan: 'Worksheet check',
  concept: 'Visual analogy',
  quiz: 'Active recall',
  translate: 'Bilingual teaching',
  hard: 'Cloud escalation',
};

/** Demo mode selection + playback controls. Two-column grid on mobile, vertical list on desktop. */
export function DemoControls({ scenarios, activeId, onSelect, onReplay, onSkip, finished }: DemoControlsProps) {
  return (
    <div className="flex min-w-0 flex-col gap-4">
      <p className="eyebrow hidden px-1 text-muted lg:block">Learning modes</p>
      <div
        role="group"
        aria-label="Demo learning modes"
        className="grid grid-cols-2 gap-2 lg:grid-cols-1"
        data-testid="demo-mode-list"
      >
        {scenarios.map((scenario, index) => {
          const Icon = scenario.icon;
          const active = scenario.id === activeId;
          const isLastOdd = index === scenarios.length - 1 && scenarios.length % 2 === 1;
          return (
            <button
              key={scenario.id}
              type="button"
              onClick={() => onSelect(scenario.id)}
              aria-current={active ? 'true' : undefined}
              className={cn(
                'flex min-h-12 min-w-0 items-center gap-2.5 rounded-card border px-3 py-3 text-left transition-colors sm:px-4',
                isLastOdd && 'col-span-2 lg:col-span-1',
                active
                  ? 'border-brand bg-brand text-white'
                  : 'border-line bg-white text-navy hover:border-brand/50 hover:text-brand-dark',
              )}
              data-testid={`demo-mode-${scenario.id}`}
            >
              <Icon
                className={cn('h-[18px] w-[18px] shrink-0', active ? 'text-white' : 'text-brand-dark')}
                aria-hidden="true"
              />
              <span className="min-w-0">
                <span className="block text-[13px] font-semibold leading-snug sm:text-sm">{scenario.label}</span>
                <span
                  className={cn(
                    'mt-0.5 block truncate text-[11px] leading-snug',
                    active ? 'text-white' : 'text-muted',
                  )}
                >
                  {modeHints[scenario.id]}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex gap-2 lg:mt-2 lg:flex-col">
        <button
          type="button"
          onClick={onReplay}
          className="inline-flex min-h-11 w-1/2 items-center justify-center gap-2 rounded-full border border-line bg-white px-3 text-[13px] font-semibold text-navy transition-colors hover:border-brand/50 hover:text-brand-dark lg:w-full"
          data-testid="demo-replay"
        >
          <RotateCcw className="h-3.5 w-3.5 shrink-0 text-brand-dark" aria-hidden="true" />
          Replay Demo
        </button>
        <button
          type="button"
          onClick={onSkip}
          disabled={finished}
          className="inline-flex min-h-11 w-1/2 items-center justify-center gap-2 rounded-full border border-line bg-white px-3 text-[13px] font-semibold text-navy transition-colors hover:border-brand/50 hover:text-brand-dark disabled:cursor-not-allowed disabled:opacity-50 lg:w-full"
          data-testid="demo-skip"
        >
          <SkipForward className="h-3.5 w-3.5 shrink-0 text-brand-dark" aria-hidden="true" />
          Skip Animation
        </button>
      </div>
    </div>
  );
}
