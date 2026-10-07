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
    'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium rounded-control transition-all duration-micro ease-io focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beam focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900',
    size === 'md' ? 'h-10 px-4 text-sm' : 'h-12 px-6 text-body',
    resolved === 'primary'
      ? 'bg-beam text-ink-900 hover:brightness-110'
      : 'bg-transparent border border-[var(--hairline-dark)] text-text-hi hover:border-[var(--hairline-strong)]',
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
