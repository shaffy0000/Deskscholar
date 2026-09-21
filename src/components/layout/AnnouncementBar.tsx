import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function AnnouncementBar() {
  return (
    <div className="bg-midnight text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-x-2 gap-y-1 px-4 py-2 text-center text-xs sm:text-[13px]">
        <span className="inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-aqua animate-pulse-dot" aria-hidden="true" />
        <span className="text-slate-300">
          <span className="sm:hidden">DeskScholar is in development — early access is open.</span>
          <span className="hidden sm:inline">
            DeskScholar is currently in development — early access registrations are now open.
          </span>
        </span>
        <Link
          to="/journey"
          className="inline-flex min-h-[28px] shrink-0 items-center gap-1 font-semibold text-brand-light underline-offset-4 hover:underline"
        >
          <span className="hidden sm:inline">Follow the journey</span>
          <span className="sm:hidden">Journey</span>
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
