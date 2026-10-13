import type { ReactNode, ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

type ButtonVariant = 'primary' | 'quiet' | 'secondary' | 'dark' | 'ghost';
type ButtonSize = 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  to?: string;
  href?: string;
  children: ReactNode;
}

/** Map legacy variant names to the new two-variant system */
function resolveVariant(v: ButtonVariant): 'primary' | 'quiet' {
  if (v === 'primary' || v === 'dark') return 'primary';
  return 'quiet';
}

export function Button({
  variant = 'primary',
  size = 'md',
  to,
  href,
  className,
  children,
  type,
  disabled,
  ...rest
}: ButtonProps) {
  const resolved = resolveVariant(variant);

  const classes = cn(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold rounded-full transition-all duration-micro ease-io focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beam focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900',
    size === 'md' ? 'h-10 px-5 text-sm' : 'h-[52px] px-7 text-body',
    resolved === 'primary'
      ? 'bg-beam text-white shadow-[0_10px_24px_-10px_rgba(23,107,91,0.65)] hover:-translate-y-0.5 hover:bg-[var(--beam-hover)] hover:shadow-[0_16px_30px_-12px_rgba(23,107,91,0.7)] active:translate-y-0'
      : 'bg-white/70 border border-[var(--hairline-strong)] text-text-hi backdrop-blur hover:-translate-y-0.5 hover:border-beam hover:text-beam',
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className,
  );

  if (to) {
    return (
      <Link to={to} className={classes} aria-disabled={disabled}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} aria-disabled={disabled}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type ?? 'button'}
      className={classes}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
