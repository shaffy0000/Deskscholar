import { useCallback, useEffect, useMemo, useState } from 'react';
import { Play } from 'lucide-react';
import {
  demoScenarios,
  translateContent,
  type DemoModeId,
  type TranslateLang,
} from '../../data/demoScenarios';
import { deskScholarImages, deskScholarImageSrcSets } from '../../data/assets';
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
                  <span className="rounded-full border border-dark-line bg-deep-navy px-3 py-1 text-xs font-semibold text-text-hi">
                    Question 1 of 3
                  </span>
                ) : undefined
              }
            />
          </div>
        </div>

        <div className="mt-12 grid overflow-hidden rounded-[28px] [background:var(--pine-grad)] text-white shadow-[0_40px_80px_-40px_rgba(15,63,55,0.8)] lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative min-h-[240px]">
            <img
              src={deskScholarImages.projectionCloseup}
              srcSet={deskScholarImageSrcSets.projectionCloseup}
              sizes="(min-width: 1024px) 640px, calc(100vw - 40px)"
              alt="DeskScholar projecting visual fraction guidance onto a mathematics worksheet."
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-4 p-7 sm:p-10">
            <p className="sec-eyebrow !text-[#F2B544]">From simulation to the real desk</p>
            <h3 className="font-display text-[clamp(1.5rem,1.1rem+1.4vw,2.1rem)] font-bold leading-tight text-white">
              The same guidance, projected onto real paper.
            </h3>
            <p className="text-[15px] leading-relaxed text-white/80">
              The scripted demo above mirrors what the desk unit is planned to do: read the worksheet,
              find the slip, and light up the next step right beside the student&rsquo;s own working.
            </p>
            <CloudflareVideoModal>
              {({ open }) => (
                <button
                  type="button"
                  onClick={open}
                  data-testid="open-video-modal"
                  className="mt-2 inline-flex min-h-[52px] items-center gap-3 rounded-full bg-[#F2B544] pl-2 pr-6 text-[15px] font-bold text-[#2E2005] shadow-[0_12px_28px_-12px_rgba(242,181,68,0.8)] transition-transform hover:-translate-y-0.5"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white">
                    <Play className="ml-0.5 h-4 w-4 text-[#176B5B]" fill="currentColor" aria-hidden="true" />
                  </span>
                  Watch the concept video
                </button>
              )}
            </CloudflareVideoModal>
          </div>
        </div>
    </Section>
  );
}
