import { cn } from '../../utils/cn';

interface LogoProps {
  className?: string;
  /** Icon sizing — only rendered when `mark` is true. */
  iconClass?: string;
  /** Show the brand mark (desk lamp + book) before the wordmark. */
  mark?: boolean;
  /** `light` renders the wordmark in white for dark surfaces (footer). */
  tone?: 'default' | 'light';
}

/**
 * Brand lockup: the approved desk-lamp mark followed by the "DeskScholar"
 * wordmark ("Scholar" in pine). The mark tilts slightly when its link is hovered.
 */
export function Logo({ className, iconClass, mark = true, tone = 'default' }: LogoProps) {
  const light = tone === 'light';
  return (
    <span className={cn('group/logo inline-flex items-center gap-2.5 whitespace-nowrap', className)}>
      {mark && (
        <img
          src="/assets/deskscholar/logo-icon.webp"
          srcSet="/assets/deskscholar/logo-icon-112.webp 112w, /assets/deskscholar/logo-icon.webp 165w"
          sizes="40px"
          alt=""
          aria-hidden="true"
          width={165}
          height={168}
          draggable={false}
          decoding="async"
          className={cn(
            'w-auto select-none transition-transform duration-300 ease-out group-hover/logo:-rotate-6 group-hover/logo:scale-105 motion-reduce:transition-none',
            light && 'rounded-xl bg-white/95 p-1',
            iconClass ?? 'h-9 lg:h-10',
          )}
        />
      )}
      <span
        className={cn(
          'text-[18px] font-bold tracking-[-0.02em] lg:text-[19px]',
          light ? 'text-white' : 'text-[var(--text-hi)]',
        )}
        style={{ fontFamily: "'Space Grotesk', var(--font-display)" }}
      >
        Desk<span className={light ? 'text-[#F2B544]' : 'text-[var(--beam)]'}>Scholar</span>
      </span>
    </span>
  );
}
