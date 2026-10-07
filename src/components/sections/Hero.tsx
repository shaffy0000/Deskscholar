import { useEffect, useRef, useState } from 'react';
import { deskScholarImages, deskScholarImageSrcSets } from '../../data/assets';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';
import '../../styles/hero.css';

/**
 * Hero — dimensional product composition.
 * Layered scene: grounded product plate + floating "projected guidance" card
 * (correct 2/4 = 1/2 maths, simulated) + two annotations. Pointer-depth on
 * desktop only; static and attractive on touch + reduced motion.
 */
export function Hero() {
  const [ready, setReady] = useState(false);
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const el = tiltRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (reduce || !fine) return;
    let raf = 0;
    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `rotateY(${px * 5}deg) rotateX(${-py * 4}deg) translate3d(${px * 6}px, ${py * 5}px, 0)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = '';
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className={`hx ${ready ? 'hx-ready' : ''}`} aria-labelledby="hero-heading">
      <div className="hx-inner">
        <div className="hx-grid">
          <div className="hx-copy">
            <p className="hx-chip hx-reveal">
              <span className="hx-chip-dot" aria-hidden="true" />
              Prototype in development · Three editions planned
            </p>
            <h1 id="hero-heading" className="hx-h1 hx-reveal hx-r2">
              <span className="hx-line">A tutor for your desk.</span>
              <span className="hx-line">
                Not another screen<span className="hx-aqua">.</span>
              </span>
            </h1>
            <p className="hx-sub hx-reveal hx-r3">
              DeskScholar is developing a learning companion that reads your work and projects
              step-by-step guidance. Three editions planned for different connectivity needs.
            </p>
          </div>

          <div className="hx-scene">
            <div className="hx-stage">
              <div className="hx-tilt hx-reveal hx-r2" ref={tiltRef}>
                <div className="hx-ground" aria-hidden="true" />
                <figure className="hx-plate" style={{ margin: 0 }}>
                  <span className="hx-plate-tag">Concept render</span>
                  <img
                    src={deskScholarImages.hero}
                    srcSet={deskScholarImageSrcSets.hero}
                    sizes="(min-width: 1024px) 56vw, calc(100vw - 40px)"
                    alt="The DeskScholar unit on a study desk beside an open worksheet, with step-by-step guidance projected onto the page."
                    width={1407}
                    height={768}
                    {...{ fetchpriority: 'high' }}
                  />
                </figure>

                {/* Floating projected-guidance card (simulated, correct maths) */}
                <div className="hx-proj hx-reveal hx-r4" aria-hidden="true">
                  <div className="hx-proj-kicker">
                    <span>Projected guidance</span>
                    <span className="hx-proj-chip">Simulated</span>
                  </div>
                  <p className="hx-proj-q">“Show that 2/4 is the same as 1/2.”</p>
                  <div className="hx-proj-math">
                    <svg viewBox="0 0 96 44" width="96" height="44" aria-hidden="true">
                      <circle cx="22" cy="22" r="18" fill="#FFFFFF" stroke="#101C28" strokeWidth="1.6" />
                      <path d="M22 22 L22 4 A18 18 0 0 1 40 22 Z" fill="#E2905A" stroke="#101C28" strokeWidth="1.6" />
                      <path d="M22 22 L40 22 A18 18 0 0 1 22 40 Z" fill="#E2905A" stroke="#101C28" strokeWidth="1.6" />
                      <line x1="22" y1="4" x2="22" y2="40" stroke="#101C28" strokeWidth="1.6" />
                      <line x1="4" y1="22" x2="40" y2="22" stroke="#101C28" strokeWidth="1.6" />
                      <text x="56" y="28" fontSize="15" fontWeight="700" fill="#101C28" fontFamily="'Space Grotesk', sans-serif">=</text>
                      <circle cx="80" cy="22" r="14" fill="#FFFFFF" stroke="#101C28" strokeWidth="1.6" />
                      <path d="M80 22 L80 8 A14 14 0 0 1 80 36 Z" fill="#176B5B" stroke="#101C28" strokeWidth="1.6" transform="rotate(0 80 22)" />
                      <line x1="80" y1="8" x2="80" y2="36" stroke="#101C28" strokeWidth="1.6" />
                    </svg>
                    <span className="hx-proj-eq">
                      2/4 <em>=</em> 1/2
                    </span>
                  </div>
                </div>

                {/* Annotations — only where they explain the experience */}
                <div className="hx-anno hx-anno-1" aria-hidden="true">
                  <i />
                  <span>Reads the page · hears the question</span>
                </div>
                <div className="hx-anno hx-anno-2" aria-hidden="true">
                  <i />
                  <span>Guidance lands on the worksheet</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hx-actions hx-reveal hx-r3">
            <div className="hx-actions-row">
              <Button size="lg" to="/editions">Explore editions</Button>
              <Link to="/#planned-experience" className="hx-quiet">
                See the planned experience
              </Link>
            </div>
            <p className="hx-status">
              Prototype stage — capabilities described as planned; final specifications may change.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
