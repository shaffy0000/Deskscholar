import { useState } from 'react';
import { quizFeedback, quizOptions, quizQuestion } from '../../data/demoScenarios';

interface QuizInteractionProps {
  /** Quiz options become interactive only after the projection animation reaches the question. */
  active: boolean;
}

/** Simulated revision quiz for the "Quiz Me" demo mode. */
export function QuizInteraction({ active }: QuizInteractionProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const chosen = quizOptions.find((option) => option.id === selected);

  return (
    <div className="w-full max-w-md" data-testid="quiz-interaction">
      <div className="rounded-panel border border-dark-line bg-deep-navy p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="font-display text-xs font-semibold uppercase tracking-widest text-brand-light">Revision quiz</p>
          <p className="text-xs font-semibold text-slate-400">Question 1 of 3</p>
        </div>
        <h4 className="mt-3 font-display text-lg font-semibold text-white">{quizQuestion}</h4>
        <div className="mt-4 grid gap-2 sm:grid-cols-2" role="group" aria-label="Quiz answer options">
          {quizOptions.map((option) => {
            const isSelected = selected === option.id;
            const state = !selected ? 'idle' : option.correct ? 'correct' : isSelected ? 'incorrect' : 'dimmed';
            return (
              <button
                key={option.id}
                type="button"
                disabled={!active}
                onClick={() => setSelected(option.id)}
                aria-pressed={isSelected}
                className={[
                  'min-h-11 rounded-card border px-4 py-3 text-left text-sm font-semibold transition-colors',
                  'disabled:cursor-not-allowed disabled:opacity-50',
                  state === 'correct'
                    ? 'border-success bg-success/20 text-white'
                    : state === 'incorrect'
                      ? 'border-danger bg-danger/15 text-white'
                      : state === 'dimmed'
                        ? 'border-dark-line bg-midnight text-slate-400'
                        : 'border-dark-line bg-midnight text-white hover:border-brand hover:text-brand-light',
                ].join(' ')}
              >
                {option.label}
                {state === 'correct' && <span className="ml-2 text-success">✓</span>}
                {state === 'incorrect' && <span className="ml-2 text-danger">✗</span>}
              </button>
            );
          })}
        </div>
        <div role="status" aria-live="polite" className="min-h-[3rem]">
          {chosen && (
            <p
              data-testid="quiz-feedback"
              className={`mt-4 rounded-card border px-4 py-3 text-sm ${
                chosen.correct
                  ? 'border-success/40 bg-success/10 text-success'
                  : 'border-danger/40 bg-danger/10 text-danger'
              }`}
            >
              {chosen.correct ? quizFeedback.correct : quizFeedback.incorrect}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
