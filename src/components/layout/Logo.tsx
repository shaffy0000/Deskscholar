import { cn } from '../../utils/cn';

interface LogoProps {
  className?: string;
  /** Icon sizing — defaults fit the header: 38px mobile → 44–48px desktop. */
  iconClass?: string;
  /** 'light' = on light surfaces (header/drawer/loader), 'dark' = on midnight footer. */
  tone?: 'light' | 'dark';
}

/**
 * DeskScholar brand lockup: transparent logo icon + "DeskScholar" wordmark,
 * on one line, vertically centred. Used by the desktop header, mobile drawer
 * and footer. Each usage wraps this component in a Link with
 * aria-label="DeskScholar home".
 */
export function Logo({ className, iconClass, tone = 'light' }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5 whitespace-nowrap', className)}>
      <img
        src="/assets/deskscholar/logo-icon-112.webp"
        srcSet="/assets/deskscholar/logo-icon-112.webp 112w, /assets/deskscholar/logo-icon.webp 165w"
        sizes="(min-width: 1024px) 56px, 40px"
        alt=""
        aria-hidden="true"
        width={112}
        height={112}
        draggable={false}
        decoding="async"
        className={cn(
          'w-auto select-none',
          iconClass ?? 'h-[38px] sm:h-10 lg:h-11 xl:h-12',
        )}
      />
      <span
        className={cn(
          'font-display text-lg font-bold leading-none tracking-tight',
          tone === 'dark' ? 'text-white' : 'text-ink',
        )}
      >
        Desk<span className={tone === 'dark' ? 'text-brand-light' : 'text-brand'}>Scholar</span>
      </span>
    </span>
  );
}
