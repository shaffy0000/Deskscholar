import { ProductImage } from '../common/ProductImage';
import type { Edition } from '../../data/editions';
import '../../styles/editions.css';

interface EditionBlockProps {
  edition: Edition;
  index: number;
  image: { src: string; srcSet?: string; alt: string; ratio: string; caption: string };
}

/**
 * One coherent product section per edition: name, one-line positioning, large
 * visual, concise fact groups (including the brief non-price subscription fact)
 * and the honest limitation. Desktop: 7-col image / 5-col content, top-aligned,
 * alternating sides. Mobile: name → positioning → image → facts → limitation.
 */
export function EditionBlock({ edition, index, image }: EditionBlockProps) {
  const flipped = index % 2 === 1;

  return (
    <section id={edition.slug} className="ed-block" aria-labelledby={`ed-${edition.slug}-name`}>
      <div className={`ed-inner ${flipped ? 'ed-flip' : ''}`}>
        <figure className="ed-media">
          <ProductImage
            src={image.src}
            srcSet={image.srcSet}
            sizes="(min-width: 1024px) 56vw, calc(100vw - 40px)"
            alt={image.alt}
            ratio={image.ratio}
            objectFit="cover"
            objectPosition="center"
            containerClassName="ed-frame"
          />
          <figcaption className="ed-caption">{image.caption}</figcaption>
        </figure>

        <div className="ed-content">
          <p className="ed-index">
            Edition {String(index + 1).padStart(2, '0')} · Planned
          </p>
          <h2 className="ed-name" id={`ed-${edition.slug}-name`}>
            {edition.name}
          </h2>
          <p className="ed-pos">{edition.position}</p>

          <dl className="ed-facts">
            <div className="ed-fact">
              <dt>Connectivity</dt>
              <dd>{edition.internet}</dd>
            </div>
            <div className="ed-fact">
              <dt>Where the work goes</dt>
              <dd>{edition.privacy}</dd>
            </div>
            <div className="ed-fact">
              <dt>Learning experience</dt>
              <dd>
                {edition.answerSpeed} · {edition.roomLighting.toLowerCase()}
              </dd>
            </div>
            <div className="ed-fact">
              <dt>Subscription</dt>
              <dd>{edition.subscription}</dd>
            </div>
          </dl>

          <p className="ed-limit">
            <strong>Honest limitation.</strong> {edition.limitation}
          </p>
        </div>
      </div>
    </section>
  );
}
