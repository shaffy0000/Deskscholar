import { cn } from '../../utils/cn';

interface LogoProps {
  className?: string;
  /** Icon sizing — only rendered when `mark` is true. */
  iconClass?: string;
  /**
   * The navbar uses the wordmark alone as the primary identity (mark=false);
   * the footer and mobile panel keep the small approved brand mark.
   */
  mark?: boolean;
}

/**
 * Brand lockup: crisp, well-proportioned "DeskScholar" wordmark, optionally
 * preceded by the approved brand mark at a restrained size. No detailed
 * product illustration.
 */
export function Logo({ className, iconClass, mark = true }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2 whitespace-nowrap', className)}>
      {mark && (
        <img
          src="/assets/deskscholar/logo-icon-112.webp"
          srcSet="/assets/deskscholar/logo-icon-112.webp 112w, /assets/deskscholar/logo-icon.webp 165w"
          sizes="28px"
          alt=""
          aria-hidden="true"
          width={110}
          height={112}
          draggable={false}
          decoding="async"
          className={cn('w-auto select-none', iconClass ?? 'h-[24px] lg:h-[26px]')}
        />
      )}
      <span
        className="text-[17px] font-semibold tracking-[-0.015em] text-[var(--text-hi)] lg:text-[18px]"
        style={{ fontFamily: "'Space Grotesk', var(--font-display)" }}
      >
        DeskScholar
      </span>
    </span>
  );
}
