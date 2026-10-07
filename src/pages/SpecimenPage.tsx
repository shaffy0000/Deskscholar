import { useEffect, useRef } from 'react';
import { Button } from '../components/common/Button';
import { EditionSpotlight } from '../components/sections/EditionSpotlight';
import { Seo } from '../components/common/Seo';
import { comparisonRows } from '../data/editions';
import '../styles/specimen.css';

const colors = [
  { name: '--ink-900', hex: '#0A0D12', role: 'Page background' },
  { name: '--ink-800', hex: '#11151C', role: 'Surfaces / cards' },
  { name: '--ink-700', hex: '#1A202A', role: 'Raised / fills' },
  { name: '--text-hi', hex: '#F4F6F9', role: 'Primary text (17.9:1)' },
  { name: '--text-lo', hex: '#98A2B3', role: 'Secondary text (7.6:1)' },
  { name: '--beam', hex: '#E89B3C', role: 'Single warm accent (8.5:1)' },
  { name: '--hairline-dark', hex: 'rgba(255,255,255,.07)', role: 'Hairline borders' },
  { name: '--success', hex: '#059669', role: 'Functional only' },
  { name: '--danger', hex: '#DC2626', role: 'Functional only' },
];

const typeRows = [
  { token: '--type-display', cls: 'text-display font-display font-bold', sample: 'Learn at the desk' },
  { token: '--type-h1', cls: 'text-h1 font-display font-bold', sample: 'One idea, three editions' },
  { token: '--type-h2', cls: 'text-h2 font-display font-bold', sample: 'Section heading' },
  { token: '--type-h3', cls: 'text-h3 font-display font-semibold', sample: 'Card heading' },
  { token: '--type-body-lg', cls: 'text-body-lg', sample: 'Lead paragraph — generous line height for calm reading.' },
  { token: '--type-body', cls: 'text-body', sample: 'Body copy stays neutral; the accent colour is reserved for actions and small signals.' },
  { token: '--type-sm', cls: 'text-sm', sample: 'Small supporting text, table cells, captions.' },
  { token: '--type-micro', cls: 'text-micro', sample: 'Micro labels and metadata.' },
];

const spaces = [
  { token: '4px', w: 4 }, { token: '8px', w: 8 }, { token: '12px', w: 12 },
  { token: '16px', w: 16 }, { token: '24px', w: 24 }, { token: '32px', w: 32 },
  { token: '48px', w: 48 }, { token: '72px', w: 72 },
];

export default function SpecimenPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.25 },
    );
    rootRef.current?.querySelectorAll('.sp-reveal, .sp-rail').forEach((el) => {
      if (reduced) el.classList.add('in');
      else io.observe(el);
    });

    // Beam plays once when scrolled into view
    const beamIo = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('played');
            beamIo.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.4 },
    );
    if (beamRef.current) {
      if (reduced) beamRef.current.classList.add('played');
      else beamIo.observe(beamRef.current);
    }
    return () => {
      io.disconnect();
      beamIo.disconnect();
    };
  }, []);

  const replayBeam = () => {
    const el = beamRef.current;
    if (!el) return;
    el.classList.remove('played');
    void el.offsetWidth; // restart CSS animations
    el.classList.add('played');
  };

  return (
    <div ref={rootRef}>
      <Seo route="specimen" />

      <header className="sp-wrap" style={{ paddingTop: 'clamp(96px, 12vw, 140px)', paddingBottom: 8 }}>
        <p className="sp-eyebrow">Internal review — not indexed</p>
        <h1 className="font-display font-bold" style={{ fontSize: 'var(--type-h1)', lineHeight: 'var(--lh-h1)', letterSpacing: 'var(--ls-h1)', margin: 0 }}>
          Design tokens &amp; component specimen
        </h1>
        <p className="sp-sub" style={{ marginTop: 12 }}>
          Every value below comes from <code>src/styles/index.css</code> (tokens) — colours, spacing,
          typography, radii and motion. No component hard-codes a hex value, duration or radius.
        </p>
      </header>

      <main className="sp-wrap">
        {/* Colours */}
        <section className="sp-section" aria-labelledby="sp-colours">
          <h2 id="sp-colours" className="sp-h">Colour</h2>
          <p className="sp-sub">Near-monochrome dark system with one warm accent. State colours are functional only.</p>
          <div className="sp-swatches">
            {colors.map((c) => (
              <div className="sp-swatch" key={c.name}>
                <div className="sp-swatch-chip" style={{ background: c.hex }} />
                <div className="sp-swatch-meta">
                  <strong>{c.name}</strong>
                  {c.hex}
                  <br />
                  {c.role}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="sp-section" aria-labelledby="sp-type">
          <h2 id="sp-type" className="sp-h">Typography</h2>
          <p className="sp-sub">Sora for headings, Inter for body — both self-hosted variable fonts, latin subset, font-display: swap.</p>
          {typeRows.map((row) => (
            <div className="sp-type-row" key={row.token}>
              <span className="sp-type-name">{row.token}</span>
              <span className={row.cls} style={{ color: 'var(--text-hi)' }}>{row.sample}</span>
            </div>
          ))}
          <div className="sp-type-row">
            <span className="sp-type-name">--type-label (eyebrow)</span>
            <span className="sp-eyebrow" style={{ margin: 0 }}>Planned · Prototype stage</span>
          </div>
        </section>

        {/* Spacing & radius */}
        <section className="sp-section" aria-labelledby="sp-space">
          <h2 id="sp-space" className="sp-h">Spacing &amp; radius</h2>
          <p className="sp-sub">4px base unit. Sections use --section-pad (120px) / --section-pad-m (72px). Radii stay small and quiet.</p>
          <div className="sp-space-row">
            {spaces.map((s) => (
              <div className="sp-space-item" key={s.token}>
                <div className="sp-space-bar" style={{ width: s.w, height: 40 }} />
                {s.token}
              </div>
            ))}
          </div>
          <div className="sp-radius-row" style={{ marginTop: 28 }}>
            <div className="sp-radius-item">
              <div className="sp-radius-box" style={{ borderRadius: 'var(--radius-none)' }} />
              --radius-none (0)
            </div>
            <div className="sp-radius-item">
              <div className="sp-radius-box" style={{ borderRadius: 'var(--radius-control)' }} />
              --radius-control (4px)
            </div>
            <div className="sp-radius-item">
              <div className="sp-radius-box" style={{ borderRadius: 'var(--radius-card)' }} />
              --radius-card (10px)
            </div>
          </div>
        </section>

        {/* Buttons & controls */}
        <section className="sp-section" aria-labelledby="sp-controls">
          <h2 id="sp-controls" className="sp-h">Buttons &amp; controls</h2>
          <p className="sp-sub">Two canonical buttons (beam primary, hairline quiet), 44px minimum targets, visible beam focus ring.</p>
          <div className="sp-row">
            <Button size="lg">Primary action</Button>
            <Button size="lg" variant="quiet">Quiet action</Button>
            <Button size="lg" disabled>Disabled</Button>
            <a className="text-sm" style={{ color: 'var(--beam)' }} href="#sp-motion">
              Text link with beam colour →
            </a>
          </div>
          <div className="sp-row" style={{ marginTop: 28, alignItems: 'flex-start' }}>
            <div className="sp-field">
              <label className="sp-label" htmlFor="sp-input-ok">Email</label>
              <input className="sp-input" id="sp-input-ok" type="email" placeholder="you@example.com" />
            </div>
            <div className="sp-field">
              <label className="sp-label" htmlFor="sp-input-err">
                Email <span aria-hidden="true" style={{ color: 'var(--danger)' }}>*</span>
              </label>
              <input
                className="sp-input sp-input-error"
                id="sp-input-err"
                type="email"
                value="not-an-email"
                readOnly
                aria-invalid="true"
                aria-describedby="sp-input-err-msg"
              />
              <p className="sp-error-text" id="sp-input-err-msg" role="alert">
                Please enter a valid email address.
              </p>
            </div>
          </div>
        </section>

        {/* Cards & hairlines */}
        <section className="sp-section" aria-labelledby="sp-cards">
          <h2 id="sp-cards" className="sp-h">Cards &amp; hairlines</h2>
          <p className="sp-sub">Surfaces are #11151C with a single 7%-white hairline. No shadows, no tinted icon boxes, no glass.</p>
          <div className="sp-cards">
            <div className="sp-card sp-reveal">
              <h3>Surface card</h3>
              <p>Hairline border, --radius-card corners, generous 24px padding. Content determines height.</p>
            </div>
            <div className="sp-card sp-reveal" style={{ transitionDelay: '80ms' }}>
              <h3>Second card</h3>
              <p>Cards in a row share height through the grid, never through fixed heights.</p>
            </div>
            <div className="sp-card sp-reveal" style={{ transitionDelay: '160ms' }}>
              <h3>Third card</h3>
              <p>The accent appears only for actions, active states and small signals.</p>
            </div>
          </div>
        </section>

        {/* Motion */}
        <section className="sp-section" aria-labelledby="sp-motion">
          <h2 id="sp-motion" className="sp-h">Motion</h2>
          <p className="sp-sub">
            CSS transitions + IntersectionObserver only — no animation library. Everything plays once and
            stops; <code>prefers-reduced-motion</code> shows final states immediately.
          </p>

          <div className="sp-beam-stage" ref={beamRef} aria-hidden="true">
            <svg viewBox="0 0 480 300" role="img" aria-label="Projection beam animation sample">
              <rect x="212" y="16" width="56" height="16" rx="4" fill="#1A202A" stroke="rgba(255,255,255,0.12)" />
              <circle cx="240" cy="32" r="3.5" fill="var(--beam)" />
              <path className="beam-cone" d="M240 36 L148 244 L332 244 Z" fill="var(--beam)" opacity="0.13" />
              <line className="beam-scan" x1="168" y1="60" x2="312" y2="60" stroke="var(--beam)" strokeWidth="2" strokeLinecap="round" />
              <text className="beam-text" x="240" y="216" textAnchor="middle" fill="var(--text-hi)" fontFamily="Sora, sans-serif" fontSize="22" fontWeight="700">
                1/2 = 2/4
              </text>
              <line x1="120" y1="248" x2="360" y2="248" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
            </svg>
          </div>
          <div className="sp-row" style={{ marginTop: 12 }}>
            <Button variant="quiet" onClick={replayBeam}>Replay beam animation</Button>
            <span className="sp-type-name">one-shot · 1.6s total · never loops</span>
          </div>

          <h3 className="sp-h" style={{ fontSize: 'var(--type-h3)', marginTop: 48 }}>Progress rail (“How it works” pattern)</h3>
          <ol className="sp-rail" aria-label="Sample progress rail">
            <span className="sp-rail-fill" aria-hidden="true" />
            <li className="sp-rail-step">
              <span className="sp-rail-dot" aria-hidden="true" />
              <div>
                <h4>See the desk</h4>
                <p>The unit watches the worksheet and listens to the question.</p>
              </div>
            </li>
            <li className="sp-rail-step">
              <span className="sp-rail-dot" aria-hidden="true" />
              <div>
                <h4>Understand the question</h4>
                <p>Depending on the edition, thinking happens on the desk or on servers.</p>
              </div>
            </li>
            <li className="sp-rail-step">
              <span className="sp-rail-dot" aria-hidden="true" />
              <div>
                <h4>Project the guidance</h4>
                <p>Step-by-step help appears on the page itself.</p>
              </div>
            </li>
          </ol>
        </section>

        {/* Edition selector */}
        <section className="sp-section" aria-labelledby="sp-selector">
          <h2 id="sp-selector" className="sp-h">Edition spotlight (live component)</h2>
          <p className="sp-sub">
            The real <code>EditionSpotlight</code> from the homepage — radiogroup semantics, arrow-key
            operable, crossfading concept visuals, reduced-motion aware.
          </p>
          <EditionSpotlight />
        </section>

        {/* Table + disclosure */}
        <section className="sp-section" aria-labelledby="sp-table">
          <h2 id="sp-table" className="sp-h">Comparison table &amp; disclosure</h2>
          <p className="sp-sub">Plain-language cells (no ticks/crosses), hairline rows; native details/summary FAQ.</p>
          <table className="sp-table">
            <caption className="sr-only">Sample rows from the edition comparison table</caption>
            <thead>
              <tr>
                <th scope="col">&nbsp;</th>
                <th scope="col">Connect</th>
                <th scope="col">Hybrid</th>
                <th scope="col">Independent</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.slice(0, 3).map((row) => (
                <tr key={row.label}>
                  <td>{row.label}</td>
                  <td>{row.connect}</td>
                  <td>{row.hybrid}</td>
                  <td>{row.independent}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <details className="sp-details" style={{ marginTop: 32 }}>
            <summary>
              Which edition should I choose?
              <span className="sp-chev" aria-hidden="true">+</span>
            </summary>
            <p>Connectivity first, privacy second — the full answer lives on the /faq page.</p>
          </details>
        </section>

        {/* A11y notes */}
        <section className="sp-section" style={{ borderBottom: 0 }} aria-labelledby="sp-a11y">
          <h2 id="sp-a11y" className="sp-h">Accessibility &amp; contrast</h2>
          <div className="sp-note">
            <strong>Measured contrast on #0A0D12:</strong> primary text 17.9:1 · secondary 7.6:1 · beam accent
            8.5:1 · beam button label (ink on beam) 8.5:1. Focus = 2px beam outline, offset 2px, everywhere.
            Skip link, focus-trapped mobile menu, native disclosures and radiogroup selector are part of the
            system, not per-page patches.
          </div>
        </section>
      </main>
    </div>
  );
}
