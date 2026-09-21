import { Logo } from '../layout/Logo';

export function PageLoader() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ivory"
      role="status"
      aria-label="Loading page"
    >
      <Logo className="opacity-90" />
      <div className="h-1 w-40 animate-pulse overflow-hidden rounded-full bg-line" aria-hidden="true">
        <div className="h-full w-full rounded-full bg-brand" />
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
