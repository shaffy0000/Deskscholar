import { motion } from 'framer-motion';
import { features } from '../../data/features';
import { deskScholarImages } from '../../data/assets';
import { cn } from '../../utils/cn';
import { ProductImage } from '../common/ProductImage';
import { Section } from '../common/Section';
import { StatusBadge } from '../common/StatusBadge';

const accents = {
  violet: 'bg-brand-light text-brand-dark',
  aqua: 'bg-aqua-light text-aqua-dark',
};

/** Feature cards with an assigned product image share one media treatment (16:9, cover). */
const cardImages: Record<string, { src: string; alt: string }> = {
  voice: {
    src: deskScholarImages.faceDisplay,
    alt: 'Close-up of DeskScholar’s circular companion display and interaction camera.',
  },
  curriculum: {
    src: deskScholarImages.projectionCloseup,
    alt: 'DeskScholar projecting visual fraction guidance onto a mathematics worksheet.',
  },
};

export function FeaturesGrid() {
  return (
    <Section
      bordered
      labelledBy="features-heading"
      heading={{
        label: 'Capabilities',
        title: <span id="features-heading">Everything needed for focused, independent learning.</span>,
        description:
          'Planned and in-progress capabilities of the DeskScholar prototype. Final specifications may change during testing.',
      }}
    >
      <ul className="grid gap-4 md:grid-cols-4 lg:grid-cols-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.li
              key={feature.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (index % 3) * 0.06, ease: 'easeOut' }}
              className={cn(
                'flex flex-col rounded-panel border border-line bg-white p-5 shadow-soft sm:p-6',
                feature.span,
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <span
                  className={cn(
                    'inline-flex h-10 w-10 items-center justify-center rounded-card',
                    accents[feature.accent],
                  )}
                >
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                {feature.planned && <StatusBadge tone="planned">Planned</StatusBadge>}
              </div>
              <h3 className="mt-4 font-display text-[15px] font-bold leading-snug text-ink sm:text-base">
                {feature.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted sm:text-sm">{feature.description}</p>
              {cardImages[feature.id] && (
                <div className="mt-auto pt-5">
                  <ProductImage
                    src={cardImages[feature.id].src}
                    alt={cardImages[feature.id].alt}
                    ratio="16 / 9"
                    objectFit="cover"
                    objectPosition="center"
                    surface="light"
                  />
                </div>
              )}
            </motion.li>
          );
        })}
      </ul>
    </Section>
  );
}
