import { useEffect, useRef } from 'react';
import { Lightbulb, Play, WifiOff, BookOpenCheck } from 'lucide-react';
import { deskScholarImages, deskScholarImageSrcSets } from '../../data/assets';
import { Button } from '../common/Button';
import { CloudflareVideoModal } from '../common/CloudflareVideoModal';
import '../../styles/hero.css';

/**
 * Hero — warm, playful product composition.
 * All copy and CTAs are visible in the prerendered HTML (no JS-gated reveal),
 * so the first paint is never blank. Decoration (beam glow, floating card bob,
 * blinking eyes) is CSS-only; the pupils follow the pointer on desktop.
 */
const perks = [
  { icon: Lightbulb, label: 'Hints before answers' },
  { icon: BookOpenCheck, label: 'Works on real paper' },
  { icon: WifiOff, label: 'Offline edition planned' },
];

export function Hero() {
  const eyesRef = useRef<HTMLDivElement>(null);

  // Pupils gently follow the pointer — desktop + motion-OK only.
  useEffect(() => {
    const el = eyesRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (reduce || !fine) return;
    let raf = 0;
    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const dist = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, dist / 400);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--px', `${(dx / dist) * 3.2 * k}px`);
        el.style.setProperty('--py', `${(dy / dist) * 3.2 * k}px`);
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hx" aria-labelledby="hero-heading">
      <div className="hx-blob hx-blob-a" aria-hidden="true" />
      <div className="hx-blob hx-blob-b" aria-hidden="true" />
      <div className="hx-dots" aria-hidden="true" />

      <div className="hx-inner">
        <div className="hx-grid">
          <div className="hx-copy">
            <p className="hx-chip">
              <span className="hx-chip-dot" aria-hidden="true" />
              Prototype · 3 editions planned
            </p>
            <h1 id="hero-heading" className="hx-h1">
              A tutor for your{' '}
              <span className="hx-mark">
                desk
                <svg viewBox="0 0 200 18" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M3 13 C 50 3, 120 3, 197 9" />
                </svg>
              </span>
              .
              <span className="hx-line hx-soft">Not another screen.</span>
            </h1>
            <p className="hx-sub">
              DeskScholar reads the worksheet in front of you, listens to your question, and
              projects the next step — right where your pen already is.
            </p>

            <div className="hx-actions">
              <Button size="lg" to="/contact">Join the waitlist</Button>
              <CloudflareVideoModal>
                {({ open }) => (
                  <button type="button" onClick={open} className="hx-play">
                    <span className="hx-play-ico" aria-hidden="true">
                      <Play className="h-3.5 w-3.5" fill="currentColor" />
                    </span>
                    Watch the concept
                  </button>
                )}
              </CloudflareVideoModal>
            </div>

            <ul className="hx-perks">
              {perks.map(({ icon: Icon, label }) => (
                <li key={label}>
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="hx-scene">
            <figure className="hx-plate">
              <div className="hx-beam" aria-hidden="true" />
              <img
                src={deskScholarImages.hero}
                srcSet={deskScholarImageSrcSets.hero}
                sizes="(min-width: 1024px) 600px, calc(100vw - 40px)"
                alt="The DeskScholar desk unit — an adjustable arm with a projector head and a small round face display with friendly eyes."
                width={1407}
                height={768}
                {...{ fetchpriority: 'high' }}
              />
              <figcaption className="hx-plate-tag">Concept render</figcaption>
            </figure>

            {/* Friendly "face" — echoes the eyes on the real unit's display */}
            <div className="hx-hello" aria-hidden="true">
              <div className="hx-eyes" ref={eyesRef}>
                <span className="hx-eye"><i /></span>
                <span className="hx-eye"><i /></span>
              </div>
              <span>Stuck on Q3? Let&rsquo;s take it one step at a time.</span>
            </div>

            {/* Projected guidance card (simulated) */}
            <div className="hx-proj" aria-hidden="true">
              <div className="hx-proj-kicker">
                <span>Projected guidance</span>
                <span className="hx-proj-chip">Simulated</span>
              </div>
              <p className="hx-proj-q">Show that 2/4 is the same as 1/2.</p>
              <div className="hx-proj-math">
                <svg viewBox="0 0 96 44" width="96" height="44" aria-hidden="true">
                  <circle cx="22" cy="22" r="18" fill="#FFFFFF" stroke="#17211F" strokeWidth="1.6" />
                  <path d="M22 22 L22 4 A18 18 0 0 1 40 22 Z" fill="#E2905A" stroke="#17211F" strokeWidth="1.6" />
                  <path d="M22 22 L40 22 A18 18 0 0 1 22 40 Z" fill="#E2905A" stroke="#17211F" strokeWidth="1.6" />
                  <line x1="22" y1="4" x2="22" y2="40" stroke="#17211F" strokeWidth="1.6" />
                  <line x1="4" y1="22" x2="40" y2="22" stroke="#17211F" strokeWidth="1.6" />
                  <text x="53" y="28" fontSize="15" fontWeight="700" fill="#17211F" fontFamily="'Space Grotesk', sans-serif">=</text>
                  <circle cx="80" cy="22" r="14" fill="#FFFFFF" stroke="#17211F" strokeWidth="1.6" />
                  <path d="M80 22 L80 8 A14 14 0 0 1 80 36 Z" fill="#176B5B" stroke="#17211F" strokeWidth="1.6" />
                  <line x1="80" y1="8" x2="80" y2="36" stroke="#17211F" strokeWidth="1.6" />
                </svg>
                <span className="hx-proj-eq">
                  2/4&nbsp;<em>=</em>&nbsp;1/2
                </span>
              </div>
              <ol className="hx-proj-steps">
                <li>Split each circle into equal parts</li>
                <li>Shade what each fraction covers</li>
                <li>Same amount shaded → equal ✓</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
