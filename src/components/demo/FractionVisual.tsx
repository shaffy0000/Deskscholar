import { cn } from '../../utils/cn';

interface FractionVisualProps {
  /** 0: whole circle · 1: divided · 2: one slice (1/4) · 3: two slices (2/4) · 4: comparison with 1/2 */
  stage: number;
}

function slicePath(index: number): string {
  const start = (-90 + index * 90) * (Math.PI / 180);
  const end = start + Math.PI / 2;
  const x1 = 100 + 80 * Math.cos(start);
  const y1 = 100 + 80 * Math.sin(start);
  const x2 = 100 + 80 * Math.cos(end);
  const y2 = 100 + 80 * Math.sin(end);
  return `M100,100 L${x1.toFixed(2)},${y1.toFixed(2)} A80,80 0 0 1 ${x2.toFixed(2)},${y2.toFixed(2)} Z`;
}

const STAGE_LABELS = [
  'A whole pizza',
  'Divided into four equal slices',
  'One slice is 1/4',
  'Two slices are 2/4',
  '2/4 is the same as 1/2',
];

/** Animated SVG fraction diagram used by the "Explain a Concept" demo mode. */
export function FractionVisual({ stage }: FractionVisualProps) {
  const divided = stage >= 1;
  const highlighted = stage >= 3 ? 2 : stage >= 2 ? 1 : 0;

  return (
    <figure className="flex flex-col items-center gap-4">
      <svg
        viewBox="0 0 200 200"
        className="h-44 w-44 sm:h-52 sm:w-52"
        role="img"
        aria-label={`Fraction diagram: ${STAGE_LABELS[Math.min(stage, 4)]}`}
        data-testid="fraction-visual"
        data-stage={Math.min(stage, 4)}
      >
        <circle cx="100" cy="100" r="80" fill="#102036" stroke="#625BF6" strokeWidth="2.5" />
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={slicePath(i)}
            fill={i < highlighted ? '#625BF6' : 'transparent'}
            stroke={divided ? '#EEECFF' : 'transparent'}
            strokeWidth={divided ? 2.5 : 0}
            className="transition-all duration-700"
            style={{ transitionDelay: `${i * 90}ms` }}
          />
        ))}
        <circle cx="100" cy="100" r="80" fill="none" stroke="#625BF6" strokeWidth="2.5" />
      </svg>
      <div className="text-center" aria-hidden="false">
        {stage >= 4 ? (
          <p className="font-display text-xl font-bold text-brand-light" data-testid="fraction-compare">
            2/4 = 1/2
          </p>
        ) : stage >= 2 ? (
          <p className="font-display text-xl font-bold text-brand-light" data-testid="fraction-value">
            {highlighted === 1 ? '1/4' : '2/4'}
          </p>
        ) : null}
        <p className={cn('mt-1 text-xs text-slate-400')}>{STAGE_LABELS[Math.min(stage, 4)]}</p>
      </div>
    </figure>
  );
}
