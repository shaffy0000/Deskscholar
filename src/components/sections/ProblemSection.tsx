import { Check, MessageSquareText, Smartphone, X } from 'lucide-react';
import '../../styles/sections.css';

/**
 * Problem section — three side-by-side "what happens when you're stuck" cards.
 * Text-led (no repeated photo); the DeskScholar card is the highlighted one.
 * Content is fully readable without animation.
 */
const options = [
  {
    key: 'chatbot',
    icon: MessageSquareText,
    title: 'A chatbot',
    line: 'Types back the final answer.',
    points: [
      { ok: false, text: 'Answer first, thinking skipped' },
      { ok: false, text: 'Worksheet has to be retyped' },
    ],
  },
  {
    key: 'phone',
    icon: Smartphone,
    title: 'A phone',
    line: 'One question turns into a feed.',
    points: [
      { ok: false, text: 'Notifications pull focus away' },
      { ok: false, text: 'Eyes leave the page' },
    ],
  },
  {
    key: 'desk',
    icon: null,
    title: 'DeskScholar',
    line: 'Shows the next step on your page.',
    points: [
      { ok: true, text: 'Hints and reasoning first' },
      { ok: true, text: 'Pen and paper stay in charge' },
      { ok: true, text: 'An offline edition is planned' },
    ],
  },
];

export function ProblemSection() {
  return (
    <section className="pb" id="problem-section" aria-labelledby="problem-heading">
      <div className="pb-inner">
        <div className="pb-head">
          <p className="sec-eyebrow">Why a desk, not a screen</p>
          <h2 className="pb-h2" id="problem-heading">
            Answers are easy to find.
            <br />
            <span>Understanding needs a guide.</span>
          </h2>
          <p className="pb-explain">
            When a student gets stuck, most tools hand back the answer or open another screen.
            DeskScholar is planned to stay on the worksheet and coach the next step.
          </p>
        </div>

        <ul className="pb-cards">
          {options.map((o) => {
            const Icon = o.icon;
            return (
              <li key={o.key} className="pb-card rise" data-hero={o.key === 'desk'}>
                <div className="pb-card-top">
                  <span className="pb-ico" aria-hidden="true">
                    {Icon ? (
                      <Icon className="h-5 w-5" />
                    ) : (
                      <span className="pb-mini-eyes">
                        <i />
                        <i />
                      </span>
                    )}
                  </span>
                  {o.key === 'desk' && <span className="pb-badge">The idea</span>}
                </div>
                <h3>{o.title}</h3>
                <p className="pb-line">{o.line}</p>
                <ul className="pb-points">
                  {o.points.map((p) => (
                    <li key={p.text} data-ok={p.ok}>
                      {p.ok ? (
                        <Check className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <X className="h-4 w-4" aria-hidden="true" />
                      )}
                      <span className="sr-only">{p.ok ? 'Yes: ' : 'No: '}</span>
                      {p.text}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
