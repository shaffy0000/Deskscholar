import { useCallback, useEffect, useMemo, useState } from 'react';
import { Play } from 'lucide-react';
import {
  demoScenarios,
  translateContent,
  type DemoModeId,
  type TranslateLang,
} from '../../data/demoScenarios';
import { deskScholarImages, deskScholarImageRatios, deskScholarImageSrcSets } from '../../data/assets';
import { ProductImage } from '../common/ProductImage';
import { Section } from '../common/Section';
import { CloudflareVideoModal } from '../common/CloudflareVideoModal';
import { DemoControls } from '../demo/DemoControls';
import { DemoStage } from '../demo/DemoStage';
import { ProjectionPanel, type DemoBeat } from '../demo/ProjectionPanel';

const BEAT_DELAY_MS = 850;
const START_DELAY_MS = 350;

function buildBeats(modeId: DemoModeId, steps: string[], response: string[], lang: TranslateLang): DemoBeat[] {
  const responseLines = modeId === 'translate' ? translateContent[lang] : response;
  return [
    ...steps.map((text) => ({ kind: 'step' as const, text })),
    ...responseLines.map((text) => ({ kind: 'response' as const, text })),
  ];
}

/**
 * Fully scripted interactive demo — no network, no AI API, no database.
 * Five learning modes with typewriter projection, replay and skip controls.
 */
export function InteractiveDemo() {
  const [modeId, setModeId] = useState<DemoModeId>('scan');
  const [beatIndex, setBeatIndex] = useState(-1);
  const [skipped, setSkipped] = useState(false);
  const [finished, setFinished] = useState(false);
  const [translateLang, setTranslateLang] = useState<TranslateLang>('urdu');

  const scenario = useMemo(
    () => demoScenarios.find((item) => item.id === modeId) ?? demoScenarios[0],
    [modeId],
  );

  const beats = useMemo(
    () => buildBeats(scenario.id, scenario.steps, scenario.response, translateLang),
    [scenario, translateLang],
  );

  useEffect(() => {
    if (finished || skipped) return;
    const delay = beatIndex < 0 ? START_DELAY_MS : BEAT_DELAY_MS;
    const timeout = window.setTimeout(() => {
      setBeatIndex((current) => {
        if (current >= beats.length - 1) {
          setFinished(true);
          return current;
        }
        return current + 1;
      });
    }, delay);
    return () => window.clearTimeout(timeout);
  }, [beatIndex, beats.length, finished, skipped]);

  // Keep a skipped demo fully revealed when the beat list changes (e.g. language toggle).
  useEffect(() => {
    if (skipped && finished) setBeatIndex(beats.length - 1);
  }, [beats.length, skipped, finished]);

  const reset = useCallback((nextMode?: DemoModeId) => {
    if (nextMode) setModeId(nextMode);
    setBeatIndex(-1);
    setSkipped(false);
    setFinished(false);
  }, []);

  const handleSkip = () => {
    setSkipped(true);
    setBeatIndex(beats.length - 1);
    setFinished(true);
  };

  return (
    <Section
      id="demo"
      anchor
      labelledBy="demo-heading"
      heading={{
        label: 'Interactive experience',
        title: <span id="demo-heading">See how DeskScholar turns a question into understanding.</span>,
        description:
          'Choose a learning mode and experience a simulated DeskScholar interaction — fully scripted, no AI service required.',
      }}
    >
      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-6">
        <div className="flex min-w-0 flex-col gap-4">
        <DemoControls
          scenarios={demoScenarios}
          activeId={modeId}
          onSelect={(id) => reset(id as DemoModeId)}
          onReplay={() => reset()}
          onSkip={handleSkip}
          finished={finished}
        />
        </div>

        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-5 xl:grid-cols-2 xl:gap-6">
            <DemoStage
              scenario={scenario}
              beatIndex={beatIndex}
              finished={finished}
              translateLang={translateLang}
              onTranslateLangChange={setTranslateLang}
            />
            <ProjectionPanel
              prompt={scenario.prompt}
              beats={beats}
              beatIndex={Math.min(beatIndex, beats.length - 1)}
              skipped={skipped}
              finished={finished}
              status={scenario.status}
              toolbar={
                scenario.id === 'quiz' ? (
                  <span className="rounded-full border border-dark-line bg-deep-navy px-3 py-1 text-xs font-semibold text-slate-300">
                    Question 1 of 3
                  </span>
                ) : undefined
              }
            />
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
        <ProductImage
          src={deskScholarImages.projectionCloseup}
          srcSet={deskScholarImageSrcSets.projectionCloseup}
          sizes="(min-width: 832px) 768px, calc(100vw - 40px)"
          alt="DeskScholar projecting visual fraction guidance onto a mathematics worksheet."
          ratio={deskScholarImageRatios.projectionCloseup}
          objectPosition="center"
          caption="Projected fraction guidance on a real worksheet — the scripted simulation above mirrors this desk-projection experience."
        />
      </div>

      <div className="mt-10 flex flex-col items-center gap-3">
          <CloudflareVideoModal>
            {({ open }) => (
              <button
                type="button"
                onClick={open}
                data-testid="open-video-modal"
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-midnight px-6 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-deep-navy sm:px-7"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand">
                  <Play className="ml-0.5 h-4 w-4 text-white" aria-hidden="true" />
                </span>
                Watch Full Prototype Video
              </button>
            )}
          </CloudflareVideoModal>
          <p className="text-xs text-muted">Prototype footage will appear here once recorded.</p>
        </div>
    </Section>
  );
}
