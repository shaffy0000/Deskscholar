import { useEffect, useRef } from 'react';
import { Seo } from '../components/common/Seo';
import { ProposalHero } from '../components/proposal/ProposalHero';
import { ProposalHowItWorks } from '../components/proposal/ProposalHowItWorks';
import '../styles/specimen.css';
import '../styles/proposal.css';

const swatches = [
  { name: '--ink-900', hex: '#0A0D12', role: 'Page background (dominant)' },
  { name: '--ink-800', hex: '#11151C', role: 'Raised surface' },
  { name: '--ink-700', hex: '#1A202A', role: 'Hairlines' },
  { name: '--text-hi', hex: '#F4F6F9', role: 'Primary text' },
  { name: '--text-lo', hex: '#98A2B3', role: 'Secondary text' },
  { name: '--paper', hex: '#FAFAF8', role: 'Occasional paper section' },
  { name: '--ink-hi', hex: '#0F1319', role: 'Text on paper' },
  { name: '--ink-lo', hex: '#59645F', role: 'Secondary text on paper' },
  { name: '--beam', hex: '#E89B3C', role: 'Restrained warm accent' },
];

export default function ProposalPage() {
  const rootRef = useRef<HTMLDivElement>(null);

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
      { threshold: 0.2 },
    );
    rootRef.current?.querySelectorAll('.pp-reveal, .pp-steps').forEach((el) => {
      if (reduced) el.classList.add('in');
      else io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef} style={{ background: 'var(--ink-900)' }}>
      <Seo route="proposal" />

      <header className="sp-wrap" style={{ paddingTop: 'clamp(72px, 9vw, 120px)', paddingBottom: 8 }}>
        <p className="sp-eyebrow">Internal design proposal v1 — not indexed</p>
        <h1
          className="pp-font-proposal"
          style={{ fontSize: 'var(--type-h1)', lineHeight: 'var(--lh-h1)', letterSpacing: '-0.02em', margin: 0, color: 'var(--text-hi)', fontWeight: 700 }}
        >
          Redesign direction: product-led editorial hardware brand
        </h1>
        <p className="sp-sub" style={{ marginTop: 12 }}>
          One coherent direction — tokens, desktop hero, mobile hero (live, in a 390px frame) and one
          representative below-the-fold section. Nothing else on the site has been changed yet.
        </p>
        <div className="pp-note" style={{ marginTop: 20 }}>
          <strong>What changed vs. the current design:</strong> heading never mid-word breaks (no
          nbsp-chains; hard line breaks + balanced wrapping), no full-bleed background crop (the product
          image is a framed plate on every screen), one primary action, container-query art direction
          (mobile: heading → copy → image → actions), paper used only where it explains the worksheet,
          correct fraction maths (2/4 = 1/2) drawn as SVG instead of trusting photo content, and a
          candidate heading face (Space Grotesk) shown beside the current one (Sora).
        </div>
      </header>

      <main>
        {/* 1 — Tokens & type */}
        <section className="sp-section sp-wrap" aria-labelledby="pp-tokens" style={{ marginTop: 40 }}>
          <h2 id="pp-tokens" className="sp-h">1 · Tokens &amp; type</h2>
          <p className="sp-sub">Exact palette from the brief; all values already live in the central token layer.</p>
          <div className="sp-swatches">
            {swatches.map((c) => (
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

          <div style={{ display: 'grid', gap: 28, marginTop: 36 }}>
            <div>
              <p className="sp-type-name" style={{ marginBottom: 8 }}>Option A (recommended) — Space Grotesk, self-hosted variable, 22KB</p>
              <p className="pp-font-proposal" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 700, color: 'var(--text-hi)', margin: 0, letterSpacing: '-0.02em' }}>
                A tutor for your desk. Not another screen.
              </p>
            </div>
            <div>
              <p className="sp-type-name" style={{ marginBottom: 8 }}>Option B (current) — Sora</p>
              <p className="pp-font-current" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 700, color: 'var(--text-hi)', margin: 0, letterSpacing: '-0.02em' }}>
                A tutor for your desk. Not another screen.
              </p>
            </div>
            <div>
              <p className="sp-type-name" style={{ marginBottom: 8 }}>Body — Inter (unchanged), 16/15px, line-height 1.6–1.65</p>
              <p style={{ color: 'var(--text-lo)', margin: 0, maxWidth: '62ch', lineHeight: 1.65 }}>
                A learning companion in prototype development, designed to read your work and project
                step-by-step guidance. Three editions planned for different connectivity needs.
              </p>
            </div>
          </div>
        </section>

        {/* 2 — Desktop hero (live) */}
        <section aria-labelledby="pp-hero-desktop" style={{ paddingTop: 56 }}>
          <div className="sp-wrap">
            <h2 id="pp-hero-desktop" className="sp-h">2 · Desktop hero (live component)</h2>
            <p className="sp-sub">Resize the window — the same component re-art-directs itself below 900px.</p>
          </div>
          <ProposalHero />
        </section>

        {/* 3 — Mobile hero in a 390px frame */}
        <section aria-labelledby="pp-hero-mobile" style={{ paddingTop: 56 }}>
          <div className="sp-wrap">
            <h2 id="pp-hero-mobile" className="sp-h">3 · Mobile hero (390px frame, live)</h2>
            <p className="sp-sub">
              The identical component inside a 390px container — container queries give the deliberate
              mobile order: heading → copy → framed product image → actions.
            </p>
            <div className="pp-device-scroll">
              <div className="pp-device">
                <ProposalHero />
              </div>
            </div>
          </div>
        </section>

        {/* 4 — Representative below-the-fold section */}
        <section aria-labelledby="pp-below" style={{ paddingTop: 56 }}>
          <div className="sp-wrap">
            <h2 id="pp-below" className="sp-h">4 · Below the fold — “How it works” (live)</h2>
            <p className="sp-sub">
              Editorial rail instead of three cards; one paper plate only where it explains the worksheet;
              correct maths drawn as SVG; honest “simulated / planned” labels.
            </p>
          </div>
          <ProposalHowItWorks />
        </section>

        {/* 5 — Decisions needed */}
        <section className="sp-section sp-wrap" aria-labelledby="pp-decisions">
          <h2 id="pp-decisions" className="sp-h">5 · Decisions I need from you</h2>
          <ol style={{ color: 'var(--text-lo)', lineHeight: 1.8, paddingLeft: 20, maxWidth: '78ch' }}>
            <li><strong style={{ color: 'var(--text-hi)' }}>Heading font:</strong> Option A (Space Grotesk — recommended, engineered-editorial character) or Option B (keep Sora)?</li>
            <li><strong style={{ color: 'var(--text-hi)' }}>Hero image:</strong> the dark product-on-desk render (shown), or the student-use shot (hands + worksheet + projection)?</li>
            <li><strong style={{ color: 'var(--text-hi)' }}>Mobile hero order</strong> heading → copy → image → actions — approve?</li>
            <li><strong style={{ color: 'var(--text-hi)' }}>Paper worksheet plate</strong> as the single light surface in dark sections — approve?</li>
            <li><strong style={{ color: 'var(--text-hi)' }}>Stage 2 scope on approval:</strong> apply this direction across home rhythm (problem statement without card grid → image-led learning experience → how-it-works → compact capabilities → why-a-device → editions selector → compact audience → FAQ → waitlist CTA → simple footer), rebuild /editions per brief, correct the 2/8-style photo maths site-wide, fix Journey caption contrast, remove framer-motion (CSS + IntersectionObserver only, target &lt;120KB gz JS), then full verification.</li>
          </ol>
        </section>
      </main>
    </div>
  );
}
