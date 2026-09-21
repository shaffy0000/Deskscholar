import { motion, useReducedMotion } from 'framer-motion';

interface HomeworkScanProps {
  /** 0: scanning · 1: detected · 2: reviewing · 3: error found · 4: hint projected */
  stage: number;
}

/** Simulated worksheet scan for the "Scan Homework" demo mode. */
export function HomeworkScan({ stage }: HomeworkScanProps) {
  const reduced = useReducedMotion();

  return (
    <div
      className="relative mx-auto w-full max-w-sm rounded-card border border-slate-300/40 bg-white p-5 shadow-card"
      role="img"
      aria-label="Mathematics worksheet being scanned by DeskScholar"
      data-testid="homework-scan"
      data-stage={Math.min(stage, 4)}
    >
      <p className="font-display text-xs font-bold uppercase tracking-widest text-muted">Mathematics — Worksheet 4</p>
      <div className="mt-3 space-y-2">
        <p className="text-sm text-ink">1. Solve: 2x + 3 = 11</p>
        <p className="text-sm text-ink">2. Simplify: 5(x + 2)</p>
        <div className="relative">
          <p className="text-sm font-medium text-ink">3. Solve: 3x + 7 = 22</p>
          <div className="mt-1 space-y-0.5 pl-3 text-sm text-slate-600" style={{ fontFamily: "'Segoe Script', cursive" }}>
            <p>
              Step 1: 3x = 22{' '}
              <span className={`relative inline-block ${stage >= 3 ? 'font-bold text-danger' : ''}`}>
                + 7
                {stage >= 3 && (
                  <span
                    className="absolute -inset-x-1.5 -inset-y-0.5 rounded-full border-2 border-danger"
                    aria-hidden="true"
                  />
                )}
              </span>
            </p>
            <p>Step 2: 3x = 29</p>
            <p>Step 3: x = 29/3</p>
          </div>
          {stage >= 1 && (
            <motion.div
              layout={!reduced}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pointer-events-none absolute -inset-2 rounded-lg border-2 border-brand/70"
              aria-hidden="true"
              data-testid="scan-detection"
            />
          )}
        </div>
      </div>

      {stage === 0 && !reduced && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-full overflow-hidden rounded-card" aria-hidden="true">
          <div className="h-0.5 w-full animate-scan-line bg-gradient-to-r from-transparent via-aqua to-transparent shadow-soft" />
        </div>
      )}
      {stage === 0 && reduced && (
        <div className="pointer-events-none absolute inset-x-3 top-1/2 h-0.5 bg-aqua" aria-hidden="true" />
      )}

      {stage >= 2 && stage < 4 && (
        <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-brand-dark" data-testid="scan-reviewing">
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-brand" aria-hidden="true" />
          Reviewing the solution…
        </p>
      )}

      {stage >= 4 && (
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 rounded-card border border-sun/40 bg-sun-light p-3"
          data-testid="scan-hint"
        >
          <p className="text-xs font-bold uppercase tracking-wide text-sun-dark">Projected hint</p>
          <p className="mt-1 text-sm text-ink">
            The sign changed in Step 1 — try <strong>subtracting 7</strong> from both sides first.
          </p>
        </motion.div>
      )}
    </div>
  );
}
