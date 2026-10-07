import { useRef, useState, type KeyboardEvent } from 'react';
import { CloudflareVideoModal } from '../common/CloudflareVideoModal';
import { deskScholarImages, deskScholarImageSrcSets } from '../../data/assets';
import '../../styles/sections.css';

interface Step {
  id: string;
  num: string;
  title: string;
  tabSub: string;
  copy: string;
  meta: string;
}

const steps: Step[] = [
  {
    id: 'see',
    num: '01',
    title: 'Read the work',
    tabSub: 'Camera + microphone',
    copy: 'The desk unit reads the worksheet in front of the student — here, question 3: “¼ + ¼ = ▢” — and hears the question spoken aloud. No retyping, no second screen.',
    meta: 'On the desk unit',
  },
  {
    id: 'understand',
    num: '02',
    title: 'Understand the question',
    tabSub: 'Where thinking happens',
    copy: 'The system recognises what is being asked: two unit fractions with the same denominator. Where the thinking happens depends on the edition — on the unit, or on our servers. Guidance is planned to be composed step by step: hints first, never a bare answer.',
    meta: 'On the unit, or our servers — depends on edition',
  },
  {
    id: 'project',
    num: '03',
    title: 'Show guidance',
    tabSub: 'Light on the page',
    copy: 'The next step is projected beside the work: denominators match, add the numerators, so ¼ + ¼ = ½. The pen stays in hand; the work stays on paper.',
    meta: 'Projected by the desk unit',
  },
];

/**
 * Planned-learning demonstration — one working interaction: select a step and a
 * meaningful highlight, annotation or guidance element changes on the worksheet,
 * not merely a paragraph. The scene is an approved concept photo with an
 * accurately illustrated worksheet and a clearly visible guidance area.
 * Verified example: ¼ + ¼ = ½. Lightweight CSS transitions, no loops, no scroll
 * locking, reduced-motion aware. Labelled as a simulated, planned experience.
 */
export function InteractiveWalkthrough() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (event: KeyboardEvent, index: number) => {
    let next = -1;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % steps.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + steps.length) % steps.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = steps.length - 1;
    if (next >= 0) {
      event.preventDefault();
      setActive(next);
      tabRefs.current[next]?.focus();
    }
  };

  const step = steps[active];

  return (
    <section id="planned-experience" className="wt" data-step={active} aria-labelledby="wt-heading">
      <div className="wt-inner">
        <div className="wt-head">
          <p className="wt-eyebrow">Planned learning experience</p>
          <h2 className="wt-h2" id="wt-heading">
            From a pointed question to projected guidance.
          </h2>
          <p className="wt-lede">
            One learning loop, planned for real desk work — shown here with ¼ + ¼ = ½.
            Choose a step to see what happens on the page.
          </p>
          <CloudflareVideoModal>
            {({ open }) => (
              <button type="button" onClick={open} className="wt-video">
                Watch concept demo
              </button>
            )}
          </CloudflareVideoModal>
        </div>

        <div className="wt-grid">
          <div>
            <div role="tablist" aria-label="Learning loop steps" className="wt-tabs">
              {steps.map((s, i) => (
                <button
                  key={s.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`wt-tab-${s.id}`}
                  type="button"
                  aria-selected={active === i}
                  aria-controls={`wt-panel-${s.id}`}
                  tabIndex={active === i ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(event) => onKeyDown(event, i)}
                  className="wt-tab"
                >
                  <span className="wt-tab-num" aria-hidden="true">{s.num}</span>
                  <span className="wt-tab-title">{s.title}</span>
                  <span className="wt-tab-sub">{s.tabSub}</span>
                </button>
              ))}
            </div>

            {steps.map((s, i) => (
              <div
                key={s.id}
                className="wt-copy"
                role="tabpanel"
                id={`wt-panel-${s.id}`}
                aria-labelledby={`wt-tab-${s.id}`}
                hidden={active !== i}
              >
                <h3>{s.title}</h3>
                <p>{s.copy}</p>
                <p className="wt-meta">
                  <b>Where:</b> {s.meta}
                </p>
              </div>
            ))}
          </div>

          {/* Scene — simulated, planned experience (concept photo + illustrated worksheet) */}
          <figure
            className="wt-panel"
            role="img"
            aria-label={`Simulated concept scene for step ${step.num}, ${step.title}: a student's desk with a worksheet reading “¼ + ¼ = ▢” and a guidance area${active === 2 ? ' showing the projected working “denominators match, add the numerators, ¼ + ¼ = ½”' : ''}.`}
          >
            <span className="wt-panel-tag">Simulated · planned experience</span>
            <div className="wt-photo">
              <img
                src={deskScholarImages.studentUse}
                srcSet={deskScholarImageSrcSets.studentUse}
                sizes="(min-width: 960px) 58vw, calc(100vw - 40px)"
                alt=""
                loading="lazy"
                decoding="async"
                width={2000}
                height={1116}
              />
            </div>

            <div className="wt-sheet" aria-hidden="true">
              <div className="wt-sheet-head">
                <span>Mathematics worksheet</span>
                <span>Q3</span>
              </div>
              <p className="wt-sheet-q">
                <span className="wt-sense-chips">
                  <span className="wt-chip">Camera reading</span>
                  <span className="wt-chip">Hears the question</span>
                </span>
                ¼ + ¼ = <span className="wt-blank">▢</span>
              </p>
              <p className="wt-anno-line">Same denominator (4 and 4) → add the numerators</p>
              <div className="wt-guidance">
                <div className="wt-guidance-label">
                  <span>Guidance area</span>
                  <span className="wt-proj-chip">Projected on the page</span>
                </div>
                <div className="wt-guidance-body">
                  <span className="wt-guid-idle">Guidance will appear here — step by step, hints first.</span>
                  <span className="wt-guid-eq">¼ + ¼ = ½</span>
                  <ul className="wt-guid-steps">
                    <li>1 · Denominators match (4 and 4)</li>
                    <li>2 · Add the numerators: 1 + 1 = 2</li>
                    <li>3 · 2/4 simplifies to ½</li>
                  </ul>
                </div>
              </div>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
