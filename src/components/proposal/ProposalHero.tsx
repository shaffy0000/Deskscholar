import { Link } from 'react-router-dom';
import { deskScholarImages, deskScholarImageSrcSets } from '../../data/assets';
import { CloudflareVideoModal } from '../common/CloudflareVideoModal';

/**
 * PROPOSAL v1 hero — product-led, asymmetric, no full-bleed crop.
 * Container queries: inside the 390px review frame it lays out as mobile
 * (heading → copy → image → actions); at full width, desktop composition.
 */
export function ProposalHero() {
  return (
    <section className="pp-hero" aria-labelledby="pp-hero-heading">
      <div className="pp-hero-inner">
        <div className="pp-hero-grid">
          <div className="pp-hero-copy">
            <p className="pp-eyebrow">Prototype in development · Three editions planned</p>
            <h1 className="pp-h1" id="pp-hero-heading">
              <span className="pp-line">A tutor for your desk.</span>
              <span className="pp-line">
                Not another screen<span className="pp-dot">.</span>
              </span>
            </h1>
            <p className="pp-sub">
              A learning companion in prototype development, designed to read your work and project
              step-by-step guidance. Three editions planned for different connectivity needs.
            </p>
          </div>

          <figure className="pp-hero-media pp-hero-figure">
            <img
              src={deskScholarImages.hero}
              srcSet={deskScholarImageSrcSets.hero}
              sizes="(min-width: 900px) 58vw, calc(100vw - 40px)"
              alt="DeskScholar unit on a study desk beside an open worksheet — concept render."
              width={1407}
              height={768}
              {...{ fetchpriority: 'high' }}
            />
            <figcaption>
              <span>Concept render — the unit and a student worksheet on a real desk.</span>
              <span className="pp-tag">Planned product</span>
            </figcaption>
          </figure>

          <div className="pp-hero-actions">
            <div className="pp-actions-row">
              <Link to="/editions" className="pp-btn pp-btn-primary">
                Explore editions
              </Link>
              <CloudflareVideoModal>
                {({ open }) => (
                  <button type="button" className="pp-btn pp-btn-quiet" onClick={open}>
                    Watch concept demo
                  </button>
                )}
              </CloudflareVideoModal>
            </div>
            <p className="pp-status">
              Prototype stage: capabilities described as planned; final specifications may change.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
