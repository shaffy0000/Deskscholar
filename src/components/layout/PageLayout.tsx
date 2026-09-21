import type { ReactNode } from 'react';
import { AnnouncementBar } from './AnnouncementBar';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only z-[110] rounded-b-card bg-brand px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-0"
      >
        Skip to content
      </a>
      <AnnouncementBar />
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
