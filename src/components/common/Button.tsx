import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

type Variant = 'primary' | 'secondary' | 'dark' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-colors duration-200 max-sm:whitespace-normal focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-55 active:translate-y-px';

const variants: Record<Variant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-dark active:bg-brand-dark shadow-soft',
  secondary: 'border border-line bg-white text-ink hover:border-brand/60 hover:text-brand-dark active:bg-brand-light/40',
  dark: 'bg-white text-ink hover:bg-ivory active:bg-brand-light/60 focus-visible:ring-aqua focus-visible:ring-offset-midnight',
  ghost: 'bg-transparent text-ink hover:bg-brand-light/70 focus-visible:ring-offset-transparent',
};

const sizes: Record<Size, string> = {
  md: 'px-5 text-sm',
  lg: 'px-6 py-3 text-sm sm:px-7 sm:text-base',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  to?: string;
  href?: string;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', to, href, className, children, type, ...rest },
  ref,
) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button ref={ref} type={type ?? 'button'} className={classes} {...rest}>
      {children}
    </button>
  );
});
