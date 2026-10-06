import { useState, useCallback, useRef } from 'react';
import { editions, pipelineStages } from '../../data/editions';

type EditionSlug = 'connect' | 'hybrid' | 'independent';

const editionMeta: Record<EditionSlug, { localStages: number; internet: string; privacy: string; subscription: string }> = {
  connect: {
    localStages: 1,
    internet: 'Required for all learning features',
    privacy: 'Camera images are sent to our servers for processing',
    subscription: 'Around PKR 2,500 per month, required (planned)',
  },
  hybrid: {
    localStages: 3,
    internet: 'Needed for new explanations; basic features work offline',
    privacy: 'Only extracted text is sent — images stay on the device',
    subscription: 'Around PKR 1,000 per month, required (planned)',
  },
  independent: {
    localStages: 4,
    internet: 'Not needed at all',
    privacy: 'Nothing is sent anywhere — everything stays on the device',
    subscription: 'None required (optional companion plan planned)',
  },
};

/**
 * §4.2 — The connectivity selector.
 *
 * A horizontal control with three stops. Below it, a diagram of four stages
 * with a sliding boundary line. Three fact lines update as the selection changes.
 *
 * Keyboard: arrow keys move selection (role="radiogroup").
 * Reduced motion: boundary jumps instantly.
 * Mobile: stacks vertically; boundary becomes horizontal.
 */
const slugs: EditionSlug[] = ['connect', 'hybrid', 'independent'];

export function ConnectivitySelector() {
  const [selected, setSelected] = useState<EditionSlug>('independent');
  const groupRef = useRef<HTMLDivElement>(null);
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const current = editionMeta[selected];

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const idx = slugs.indexOf(selected);
      let next = idx;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        next = Math.min(idx + 1, slugs.length - 1);
        e.preventDefault();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        next = Math.max(idx - 1, 0);
        e.preventDefault();
      }
      if (next !== idx) {
        setSelected(slugs[next]);
        // Focus the newly selected radio
        const radios = groupRef.current?.querySelectorAll<HTMLButtonElement>('[role="radio"]');
        radios?.[next]?.focus();
      }
    },
    [selected],
  );

  // Boundary position: percentage across the pipeline
  // connect = after stage 1 (25%), hybrid = after stage 3 (75%), independent = 100% (past the end)
  const boundaryPercent = (current.localStages / pipelineStages.length) * 100;

  return (
    <div className="w-full">
      {/* Edition selector — role="radiogroup" */}
      <div
        ref={groupRef}
        role="radiogroup"
        aria-label="Select DeskScholar edition"
        className="mx-auto flex max-w-xl items-center justify-center gap-1 rounded-control border p-1"
        style={{ borderColor: 'var(--hairline-dark)' }}
        onKeyDown={handleKeyDown}
      >
        {slugs.map((slug) => {
          const isSelected = slug === selected;
          const edition = editions.find((e) => e.slug === slug)!;
          return (
            <button
              key={slug}
              type="button"
              role="radio"
              aria-checked={isSelected}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setSelected(slug)}
              className={`flex-1 rounded-control px-4 py-2.5 text-sm font-medium transition-all ${
                reducedMotion ? '' : 'duration-micro ease-io'
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beam ${
                isSelected
                  ? 'bg-beam text-ink-900'
                  : 'text-text-lo hover:text-text-hi'
              }`}
            >
              {edition.name.replace('DeskScholar ', '')}
            </button>
          );
        })}
      </div>

      {/* Pipeline diagram — desktop: horizontal, mobile: vertical */}
      <div className="relative mt-10">
        {/* Desktop layout */}
        <div className="hidden md:block">
          <div className="relative mx-auto max-w-3xl">
            {/* Stage labels */}
            <div className="grid grid-cols-4 gap-0 text-center">
              {pipelineStages.map((stage, i) => {
                const isLocal = i < current.localStages;
                return (
                  <div
                    key={stage}
                    className={`px-2 pb-8 text-sm font-medium transition-colors ${
                      reducedMotion ? '' : 'duration-micro ease-io'
                    } ${isLocal ? 'text-text-hi' : 'text-text-lo'}`}
                  >
                    {stage}
                  </div>
                );
              })}
            </div>

            {/* Track with boundary */}
            <div className="relative h-1 rounded-full bg-ink-700">
              <div
                className={`absolute left-0 top-0 h-full rounded-full bg-beam ${
                  reducedMotion ? '' : 'transition-all duration-fast ease-io'
                }`}
                style={{ width: `${boundaryPercent}%` }}
              />
            </div>

            {/* Labels beneath the track */}
            <div className="mt-4 flex justify-between text-micro">
              <span className="text-text-hi">On the desk</span>
              <span className="text-text-lo">On our servers</span>
            </div>
          </div>
        </div>

        {/* Mobile layout — vertical */}
        <div className="md:hidden">
          <div className="relative mx-auto max-w-xs">
            <div className="flex">
              {/* Vertical track */}
              <div className="relative mr-4 w-1 shrink-0 rounded-full bg-ink-700">
                <div
                  className={`absolute left-0 top-0 w-full rounded-full bg-beam ${
                    reducedMotion ? '' : 'transition-all duration-fast ease-io'
                  }`}
                  style={{ height: `${boundaryPercent}%` }}
                />
              </div>

              {/* Stage labels vertical */}
              <div className="flex flex-col gap-6 py-1">
                {pipelineStages.map((stage, i) => {
                  const isLocal = i < current.localStages;
                  return (
                    <div
                      key={stage}
                      className={`text-sm font-medium transition-colors ${
                        reducedMotion ? '' : 'duration-micro ease-io'
                      } ${isLocal ? 'text-text-hi' : 'text-text-lo'}`}
                    >
                      {stage}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Labels */}
            <div className="mt-4 flex justify-between text-micro">
              <span className="text-text-hi">On the desk</span>
              <span className="text-text-lo">On our servers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fact lines — cross-fade on selection change */}
      <div className="mx-auto mt-10 max-w-2xl space-y-4">
        {[
          { label: 'Internet needed', value: current.internet },
          { label: 'Where the student\'s work goes', value: current.privacy },
          { label: 'Monthly subscription', value: current.subscription },
        ].map((fact, i) => (
          <div
            key={fact.label}
            className={`flex flex-col gap-1 border-b pb-4 sm:flex-row sm:items-baseline sm:gap-4 ${
              reducedMotion ? '' : 'transition-all duration-micro ease-io'
            }`}
            style={{ borderColor: 'var(--hairline-dark)', transitionDelay: reducedMotion ? '0ms' : `${i * 40}ms` }}
          >
            <span className="shrink-0 text-micro font-medium text-text-lo sm:w-48">
              {fact.label}
            </span>
            <span className="text-sm font-medium text-text-hi">
              {fact.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
