import { CreditCard, Gauge, ShieldCheck, Wifi, WifiOff, CloudCog } from 'lucide-react';
import type { Edition } from '../../data/editions';
import '../../styles/editions.css';

interface EditionBlockProps {
  edition: Edition;
  index: number;
  image: { src: string; srcSet?: string; alt: string; ratio: string; caption: string };
}

/** One-glance connectivity sticker per edition (mirrors the edition data). */
const stickers = {
  connect: { icon: Wifi, text: 'Needs steady Wi-Fi', tone: 'lilac' },
  hybrid: { icon: CloudCog, text: 'Partly offline', tone: 'sun' },
  independent: { icon: WifiOff, text: 'Fully offline', tone: 'pine' },
} as const;

/**
 * One product section per edition. Desktop: sticky visual on one side, name,
 * positioning and four icon fact cards on the other (alternating sides).
 * Mobile: name → visual → facts → limitation.
 */
export function EditionBlock({ edition, index, image }: EditionBlockProps) {
  const flipped = index % 2 === 1;
  const sticker = stickers[edition.slug];
  const StickerIcon = sticker.icon;

  const facts = [
    { icon: Wifi, label: 'Connectivity', value: edition.internet },
    { icon: ShieldCheck, label: 'Where the work goes', value: edition.privacy },
    { icon: Gauge, label: 'Learning experience', value: `${edition.answerSpeed} · ${edition.roomLighting.toLowerCase()}` },
    { icon: CreditCard, label: 'Subscription', value: edition.subscription },
  ];

  return (
    <section
      id={edition.slug}
      className="ed-block"
      data-tone={sticker.tone}
      aria-labelledby={`ed-${edition.slug}-name`}
    >
      <div className={`ed-inner ${flipped ? 'ed-flip' : ''}`}>
        <figure className="ed-media">
          <div className="ed-frame" style={{ aspectRatio: image.ratio }}>
            <img
              src={image.src}
              srcSet={image.srcSet}
              sizes="(min-width: 1024px) 600px, calc(100vw - 40px)"
              alt={image.alt}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
            <span className="ed-sticker">
              <StickerIcon className="h-4 w-4" aria-hidden="true" />
              {sticker.text}
            </span>
          </div>
          <figcaption className="ed-caption">{image.caption}</figcaption>
        </figure>

        <div className="ed-content">
          <p className="ed-index">
            <span>{String(index + 1).padStart(2, '0')}</span>
            Edition · Planned
          </p>
          <h2 className="ed-name" id={`ed-${edition.slug}-name`}>
            {edition.name}
          </h2>
          <p className="ed-pos">{edition.position}</p>

          <dl className="ed-facts">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="ed-fact">
                <span className="ed-fact-ico" aria-hidden="true">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              </div>
            ))}
          </dl>

          <p className="ed-limit">
            <strong>Honest limitation.</strong> {edition.limitation}
          </p>
        </div>
      </div>
    </section>
  );
}
