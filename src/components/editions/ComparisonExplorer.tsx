import { useRef, useState, type KeyboardEvent } from 'react';
import { comparisonCategories, editions, type EditionSlug } from '../../data/editions';
import '../../styles/editions.css';

/**
 * "Choose what matters" comparison explorer — replaces the spreadsheet grid.
 * Selecting a category shows all three editions together in one coordinated
 * stage: headings stay in the same positions, each edition gets one concise
 * answer plus one supporting sentence and a small schematic annotation.
 * Semantic headings + lists; content is fully available without animation;
 * the plain-summary disclosure is compact and optional. No pricing, no
 * ticks-and-crosses, no ribbons.
 */

/** Small schematic annotations (decorative — the text carries the meaning). */
function Diagram({ kind }: { kind: string }) {
  const common = {
    viewBox: '0 0 128 56',
    width: 128,
    height: 56,
    fill: 'none',
    'aria-hidden': true,
    focusable: false,
  } as const;
  const ink = 'var(--text-lo)';
  const beam = 'var(--beam)';
  const apricot = 'var(--apricot)';

  const unit = (x: number, y: number, color: string) => (
    <g stroke={color} strokeWidth="1.6">
      <rect x={x} y={y} width="26" height="10" rx="5" />
      <circle cx={x + 7} cy={y + 5} r="2.4" />
      <line x1={x + 13} y1={y + 10} x2={x + 13} y2={y + 18} />
      <line x1={x + 6} y1={y + 18} x2={x + 20} y2={y + 18} />
    </g>
  );
  const cloud = (x: number, y: number, color: string, dash?: string) => (
    <path
      d={`M${x + 7} ${y + 14} a7 7 0 0 1 1 -13.9 a9 9 0 0 1 17.2 -1.1 a6.5 6.5 0 0 1 1.3 15 z`}
      stroke={color}
      strokeWidth="1.6"
      strokeDasharray={dash}
    />
  );
  const page = (x: number, y: number, color: string) => (
    <g stroke={color} strokeWidth="1.4">
      <rect x={x} y={y} width="16" height="20" rx="2" />
      <line x1={x + 4} y1={y + 6} x2={x + 12} y2={y + 6} />
      <line x1={x + 4} y1={y + 10} x2={x + 12} y2={y + 10} />
      <line x1={x + 4} y1={y + 14} x2={x + 9} y2={y + 14} />
    </g>
  );
  const room = (color: string) => (
    <rect x="8" y="8" width="70" height="40" rx="6" stroke={color} strokeWidth="1.4" strokeDasharray="4 4" />
  );

  switch (kind) {
    case 'net-required':
      return (
        <svg {...common}>
          {unit(14, 16, ink)}
          {cloud(84, 14, ink)}
          <line x1="44" y1="26" x2="80" y2="26" stroke={beam} strokeWidth="2" />
          <path d="M74 21 l6 5 l-6 5" stroke={beam} strokeWidth="2" />
        </svg>
      );
    case 'net-partial':
      return (
        <svg {...common}>
          {unit(14, 16, ink)}
          {page(20, 38, beam)}
          {cloud(84, 14, ink)}
          <line x1="44" y1="26" x2="80" y2="26" stroke={beam} strokeWidth="2" strokeDasharray="5 5" />
          <path d="M74 21 l6 5 l-6 5" stroke={beam} strokeWidth="2" />
        </svg>
      );
    case 'net-none':
      return (
        <svg {...common}>
          {unit(14, 16, ink)}
          {page(20, 38, beam)}
          <circle cx="30" cy="28" r="24" stroke={beam} strokeWidth="1.4" strokeDasharray="3 5" />
        </svg>
      );
    case 'priv-images':
      return (
        <svg {...common}>
          {room(ink)}
          {page(20, 18, ink)}
          {unit(46, 20, ink)}
          <line x1="52" y1="28" x2="106" y2="28" stroke={apricot} strokeWidth="3" />
          <path d="M100 22 l7 6 l-7 6" stroke={apricot} strokeWidth="2.4" />
          <rect x="102" y="16" width="18" height="13" rx="2" stroke={apricot} strokeWidth="1.4" transform="translate(4 16)" />
        </svg>
      );
    case 'priv-text':
      return (
        <svg {...common}>
          {room(ink)}
          {page(20, 18, beam)}
          {unit(46, 20, ink)}
          <line x1="52" y1="28" x2="106" y2="28" stroke={beam} strokeWidth="1.4" strokeDasharray="4 4" />
          <path d="M100 23 l6 5 l-6 5" stroke={beam} strokeWidth="1.8" />
          <line x1="96" y1="18" x2="112" y2="18" stroke={beam} strokeWidth="1.4" />
          <line x1="96" y1="13" x2="106" y2="13" stroke={beam} strokeWidth="1.4" />
        </svg>
      );
    case 'priv-nothing':
      return (
        <svg {...common}>
          {room(ink)}
          {page(20, 18, beam)}
          {unit(46, 20, beam)}
          <circle cx="43" cy="28" r="26" stroke={beam} strokeWidth="1.4" strokeDasharray="3 5" />
        </svg>
      );
    case 'speed-slower':
      return (
        <svg {...common}>
          {cloud(14, 14, ink)}
          <circle cx="86" cy="28" r="13" stroke={beam} strokeWidth="1.8" />
          <path d="M86 20 v8 l6 4" stroke={beam} strokeWidth="1.8" />
          <line x1="42" y1="28" x2="68" y2="28" stroke={ink} strokeWidth="1.4" strokeDasharray="4 4" />
        </svg>
      );
    case 'speed-mid':
      return (
        <svg {...common}>
          {cloud(14, 14, ink)}
          {unit(72, 18, ink)}
          <circle cx="48" cy="28" r="11" stroke={beam} strokeWidth="1.8" />
          <path d="M48 21 v7 l5 3" stroke={beam} strokeWidth="1.8" />
        </svg>
      );
    case 'speed-fast':
      return (
        <svg {...common}>
          {unit(14, 18, ink)}
          <path d="M92 10 l-10 20 h8 l-8 18 l18 -24 h-9 l9 -14 z" stroke={beam} strokeWidth="1.6" />
        </svg>
      );
    case 'light-dim':
      return (
        <svg {...common}>
          <path d="M54 12 a12 12 0 1 0 12 12 a9.5 9.5 0 0 1 -12 -12 z" stroke={ink} strokeWidth="1.6" />
          <line x1="88" y1="24" x2="96" y2="24" stroke={ink} strokeWidth="1.4" />
          {page(20, 32, ink)}
        </svg>
      );
    case 'light-low':
      return (
        <svg {...common}>
          <circle cx="64" cy="22" r="9" stroke={ink} strokeWidth="1.6" />
          <line x1="64" y1="6" x2="64" y2="10" stroke={ink} strokeWidth="1.4" />
          <line x1="80" y1="12" x2="83" y2="9" stroke={ink} strokeWidth="1.4" />
          <line x1="48" y1="12" x2="45" y2="9" stroke={ink} strokeWidth="1.4" />
          {page(20, 32, ink)}
        </svg>
      );
    case 'light-normal':
      return (
        <svg {...common}>
          <circle cx="64" cy="20" r="8" stroke={beam} strokeWidth="1.8" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1={64 + 12 * Math.cos((deg * Math.PI) / 180)}
              y1={20 + 12 * Math.sin((deg * Math.PI) / 180)}
              x2={64 + 16 * Math.cos((deg * Math.PI) / 180)}
              y2={20 + 16 * Math.sin((deg * Math.PI) / 180)}
              stroke={beam}
              strokeWidth="1.6"
            />
          ))}
          {page(20, 32, ink)}
        </svg>
      );
    case 'ctx-school':
      return (
        <svg {...common}>
          <rect x="16" y="16" width="52" height="30" rx="2" stroke={ink} strokeWidth="1.6" />
          <path d="M16 16 l26 -10 l26 10" stroke={ink} strokeWidth="1.6" />
          <rect x="26" y="26" width="8" height="8" stroke={ink} strokeWidth="1.2" />
          <rect x="50" y="26" width="8" height="8" stroke={ink} strokeWidth="1.2" />
          <rect x="38" y="32" width="8" height="14" stroke={ink} strokeWidth="1.2" />
          {unit(84, 24, beam)}
        </svg>
      );
    case 'ctx-home-evening':
      return (
        <svg {...common}>
          <path d="M16 26 l20 -14 l20 14 v20 h-40 z" stroke={ink} strokeWidth="1.6" />
          <rect x="28" y="32" width="10" height="14" stroke={apricot} strokeWidth="1.4" />
          <circle cx="88" cy="28" r="11" stroke={ink} strokeWidth="1.6" />
          <path d="M88 21 v7 l5 3" stroke={ink} strokeWidth="1.6" />
        </svg>
      );
    case 'ctx-home-any':
      return (
        <svg {...common}>
          <path d="M16 26 l20 -14 l20 14 v20 h-40 z" stroke={ink} strokeWidth="1.6" />
          <path d="M88 14 l14 5 v9 c0 8 -6 12 -14 15 c-8 -3 -14 -7 -14 -15 v-9 z" stroke={beam} strokeWidth="1.6" />
        </svg>
      );
    default:
      return null;
  }
}

export function ComparisonExplorer() {
  const [activeCat, setActiveCat] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const category = comparisonCategories[activeCat];

  const onKeyDown = (event: KeyboardEvent, index: number) => {
    let next = -1;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % comparisonCategories.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + comparisonCategories.length) % comparisonCategories.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = comparisonCategories.length - 1;
    if (next >= 0) {
      event.preventDefault();
      setActiveCat(next);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <div className="cmx">
      {/* Category controls — stay visible while the answers scroll on phones */}
      <div role="tablist" aria-label="Comparison categories" className="cmx-controls">
        {comparisonCategories.map((cat, i) => (
          <button
            key={cat.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            type="button"
            id={`cmx-tab-${cat.id}`}
            aria-selected={activeCat === i}
            aria-controls="cmx-panel"
            tabIndex={activeCat === i ? 0 : -1}
            onClick={() => setActiveCat(i)}
            onKeyDown={(event) => onKeyDown(event, i)}
            className="cmx-cat"
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div
        id="cmx-panel"
        role="tabpanel"
        aria-labelledby={`cmx-tab-${category.id}`}
        tabIndex={-1}
        className="cmx-panel"
      >
        <h3 className="cmx-heading" id="cmx-heading">
          {category.heading}
        </h3>
        <p className="cmx-intro">{category.intro}</p>

        {/* Comparison stage — all three editions together, headings in fixed positions */}
        <ul className="cmx-stage">
          {editions.map((edition) => {
            const answer = category.answers[edition.slug as EditionSlug];
            return (
              <li key={edition.slug} className={`cmx-col cmx-col-${edition.slug}`}>
                <h4 className="cmx-edition">{edition.name}</h4>
                <div className="cmx-diagram">
                  <Diagram kind={answer.diagram} />
                </div>
                <p className="cmx-summary">{answer.summary}</p>
                <p className="cmx-detail">{answer.detail}</p>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Compact optional plain summary — not a second comparison section */}
      <details className="cmx-plain">
        <summary>Prefer everything on one screen? Open a plain summary of all five categories.</summary>
        <div className="cmx-plain-wrap">
          <table className="cmx-plain-table">
            <caption className="sr-only">
              Plain-text summary of the three planned DeskScholar editions across the five comparison categories.
            </caption>
            <thead>
              <tr>
                <th scope="col">What matters</th>
                {editions.map((edition) => (
                  <th scope="col" key={edition.slug}>
                    {edition.name.replace('DeskScholar ', '')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonCategories.map((cat) => (
                <tr key={cat.id}>
                  <th scope="row">{cat.label}</th>
                  {editions.map((edition) => (
                    <td key={edition.slug}>{cat.answers[edition.slug as EditionSlug].summary}</td>
                  ))}
                </tr>
              ))}
              <tr>
                <th scope="row">Subscription</th>
                <td>Required (planned)</td>
                <td>Required (planned)</td>
                <td>None required</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
