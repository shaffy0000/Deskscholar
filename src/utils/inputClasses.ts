export const inputClasses = (hasError?: boolean) =>
  [
    'w-full rounded-card border bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/60',
    'transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/35',
    hasError ? 'border-danger focus:border-danger focus:ring-danger/30' : 'border-line hover:border-muted/40',
  ].join(' ');
