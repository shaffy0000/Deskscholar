import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Play } from 'lucide-react';
import { cn } from '../../utils/cn';
import { navLinks } from '../../data/navigation';
import { CloudflareVideoModal } from '../common/CloudflareVideoModal';
import { Logo } from './Logo';
import { MobileNavigation } from './MobileNavigation';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'sticky inset-x-0 top-0 z-40 flex h-16 lg:h-[72px] items-center transition-all duration-fast ease-out',
          scrolled
            ? 'bg-[#11151C]/95 backdrop-blur border-b border-[var(--hairline-dark)] shadow-[var(--shadow-header)]'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 lg:px-[120px]">
          <Link to="/" aria-label="DeskScholar home" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beam rounded-control">
            <Logo />
          </Link>
          
          <nav aria-label="Main" className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname + location.hash === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    'relative text-sm font-medium text-text-hi transition-colors duration-micro hover:text-beam focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beam rounded-control',
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-0 h-[2px] w-full bg-beam rounded-control" />
                  )}
                </Link>
              );
            })}
          </nav>
          
          <div className="hidden lg:flex items-center gap-4">
            <CloudflareVideoModal>
              {({ open }) => (
                <button
                  type="button"
                  onClick={open}
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-control px-4 py-2 text-sm font-semibold text-text-hi transition-colors hover:bg-[rgba(255,255,255,0.07)] hover:text-beam"
                >
                  <Play className="h-4 w-4 text-beam" aria-hidden="true" />
                  Watch Demo
                </button>
              )}
            </CloudflareVideoModal>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-control bg-beam px-4 py-2 text-sm font-semibold text-ink-900 transition-colors duration-micro hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beam focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
            >
              Join Early Access
            </Link>
          </div>
          
          <button
            type="button"
            data-testid="mobile-nav-open"
            className="lg:hidden flex items-center justify-center p-2 min-h-11 min-w-11 text-text-hi hover:text-beam transition-colors duration-micro focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beam rounded-control"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      <MobileNavigation isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
