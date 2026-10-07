import { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { editions, type EditionSlug } from '../../data/editions';
import { deskScholarImages, deskScholarImageSrcSets } from '../../data/assets';
import '../../styles/sections.css';

/**
 * Image-led edition spotlight — replaces the thin progress-line selector.
 * Compact control + large concept visual + name, one-line positioning, three
 * brief facts (internet, privacy, intended user), one honest limitation and a
 * link into the matching /editions section. Selection updates the visual and
 * the copy together with a restrained crossfade. Keyboard: arrow keys operate
 * the radiogroup; controls are touch-sized. No prices, no comparison table.
 * The same approved product form is reused in suitable concept contexts —
 * the editions do not have separate physical designs.
 */

const visuals: Record<EditionSlug, { src: string; srcSet?: string; alt: string; caption: string }> = {
  connect: {
    src: deskScholarImages.classroom,
    srcSet: deskScholarImageSrcSets.classroom,
    alt: 'Students and a teacher around a DeskScholar unit in a planned classroom setting.',
    caption: 'Concept scenario — a connected classroom or tuition centre with reliable Wi-Fi.',
  },
  hybrid: {
    src: deskScholarImages.studentUse,
    srcSet: deskScholarImageSrcSets.studentUse,
    alt: 'A student at a home desk using DeskScholar with a worksheet and projected guidance.',
    caption: 'Concept scenario — a household desk; the page stays in the room.',
  },
  independent: {
    src: deskScholarImages.hero,
    srcSet: deskScholarImageSrcSets.hero,
    alt: 'The DeskScholar unit on a study desk beside an open worksheet in normal room lighting.',
    caption: 'Concept render — entirely local learning, readable in normal room lighting.',
  },
};

const slugs: EditionSlug[] = ['connect', 'hybrid', 'independent'];

export function EditionSpotlight() {
  const [selected, setSelected] = useState<EditionSlug>('connect');
  const groupRef = useRef<HTMLDivElement>(null);
  const index = slugs.indexOf(selected);
  const edition = editions[index];
  const visual = visuals[selected];

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      let next = -1;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % slugs.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + slugs.length) % slugs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = slugs.length - 1;
      if (next >= 0) {
        event.preventDefault();
        setSelected(slugs[next]);
        groupRef.current?.querySelectorAll<HTMLButtonElement>('[role="radio"]')[next]?.focus();
      }
    },
    [index],
  );

  return (
    <div>
      {/* Compact edition control */}
      <div
        ref={groupRef}
        role="radiogroup"
        aria-label="Choose an edition to preview"
        className="es-control"
        onKeyDown={onKeyDown}
      >
        {editions.map((e) => (
          <button
            key={e.slug}
            type="button"
            role="radio"
            aria-checked={e.slug === selected}
            tabIndex={e.slug === selected ? 0 : -1}
            onClick={() => setSelected(e.slug)}
            className="es-opt"
          >
            {e.name.replace('DeskScholar ', '')}
          </button>
        ))}
      </div>

      <div className="es-stage">
        {/* Large product / use-case visual (crossfade) */}
        <figure className="es-visual">
          <div className="es-visual-stack">
            <span className="es-visual-tag">Concept visual</span>
            {editions.map((e) => (
              <div key={e.slug} className="es-shot" data-on={e.slug === selected}>
                <img
                  src={visuals[e.slug].src}
                  srcSet={visuals[e.slug].srcSet}
                  sizes="(min-width: 1024px) 55vw, calc(100vw - 40px)"
                  alt={e.slug === selected ? visuals[e.slug].alt : ''}
                  aria-hidden={e.slug !== selected}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
          <figcaption className="es-caption">{visual.caption}</figcaption>
        </figure>

        {/* Selected edition copy */}
        <div className="es-copy" aria-live="polite">
          <h3 className="es-name">{edition.name}</h3>
          <p className="es-pos">{edition.position}</p>

          <dl className="es-facts">
            <div className="es-fact">
              <dt>Internet</dt>
              <dd>{edition.internet}</dd>
            </div>
            <div className="es-fact">
              <dt>Privacy</dt>
              <dd>{edition.privacy}</dd>
            </div>
            <div className="es-fact">
              <dt>Intended for</dt>
              <dd>{edition.bestFor}</dd>
            </div>
          </dl>

          <p className="es-limit">
            <strong>Honest limitation.</strong> {edition.limitation}
          </p>

          <Link to={`/editions#${edition.slug}`} className="es-explore">
            Explore this edition
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
