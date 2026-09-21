import { useState, type ReactNode } from 'react';
import { ImageIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ProductImageProps {
  src: string;
  alt: string;
  /** Optional responsive srcset (browser picks the right size; only one file downloads). */
  srcSet?: string;
  /** Optional sizes query used with srcSet. */
  sizes?: string;
  /** CSS aspect-ratio reserving media space. Use the natural ratio to avoid cropping. */
  ratio?: string;
  objectFit?: 'cover' | 'contain';
  objectPosition?: string;
  /** Above-the-fold images: eager loading + high fetch priority. */
  priority?: boolean;
  caption?: ReactNode;
  /** Surface behind contain-images: light card, dark card, or none. */
  surface?: 'light' | 'dark' | 'none';
  className?: string;
  imgClassName?: string;
  containerClassName?: string;
  testId?: string;
  /** Copy shown in the designed fallback when the file cannot load. */
  fallbackLabel?: string;
  fallbackDimensions?: string;
}

const surfaces = {
  light: 'border-line bg-white',
  dark: 'border-dark-line bg-midnight',
  none: 'border-line bg-white',
};

/**
 * One shared responsive image implementation:
 * - reserves space via aspect-ratio (no layout shift)
 * - eager+high-priority or lazy+async loading
 * - designed fallback panel instead of a broken-image icon
 * - optional caption below the media
 */
export function ProductImage({
  src,
  alt,
  srcSet,
  sizes,
  ratio = '4 / 3',
  objectFit = 'cover',
  objectPosition = 'center',
  priority = false,
  caption,
  surface = 'none',
  className,
  imgClassName,
  containerClassName,
  testId,
  fallbackLabel,
  fallbackDimensions,
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className={cn('m-0', className)}>
      <div
        data-testid={testId}
        className={cn('relative overflow-hidden rounded-panel border', surfaces[surface], containerClassName)}
        style={{ aspectRatio: ratio }}
      >
        {!failed ? (
          <img
            src={src}
            srcSet={srcSet}
            sizes={srcSet ? (sizes ?? '100vw') : undefined}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            // React 18 does not map the fetchPriority prop; the lowercase attribute
            // is passed through to the DOM exactly as browsers expect it.
            {...(priority ? { fetchpriority: 'high' } : {})}
            onError={() => setFailed(true)}
            style={{ objectFit, objectPosition }}
            className={cn('h-full w-full', imgClassName)}
          />
        ) : (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-midnight px-6 text-center"
            role="img"
            aria-label={`${fallbackLabel ?? alt} — media coming soon`}
          >
            <div className="projection-grid-dark pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/15 blur-2xl"
              aria-hidden="true"
            />
            <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-dark-line bg-deep-navy">
              <ImageIcon className="h-5 w-5 text-brand" aria-hidden="true" />
            </span>
            <p className="relative mt-1 font-display text-sm font-semibold text-white">
              {fallbackLabel ?? alt}
            </p>
            {fallbackDimensions && (
              <p className="relative text-xs text-slate-400">Recommended: {fallbackDimensions}</p>
            )}
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-xs leading-relaxed text-muted sm:text-[13px]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
