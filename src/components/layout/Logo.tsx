import { cn } from '../../utils/cn';

interface LogoProps {
  className?: string;
  /** Icon sizing — defaults fit the header: 38px mobile → 44–48px desktop. */
  iconClass?: string;
}

/**
 * DeskScholar brand lockup: transparent logo icon + "DeskScholar" wordmark,
 * on one line, vertically centred. Always on dark background.
 */
export function Logo({ className, iconClass }: LogoProps) {
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
        className="font-display text-lg font-bold leading-none tracking-tight text-text-hi"
      >
        Desk<span className="text-beam">Scholar</span>
      </span>
    </span>
  );
}
