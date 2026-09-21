import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Play } from 'lucide-react';
import { navLinks } from '../../data/navigation';
import { CloudflareVideoModal } from '../common/CloudflareVideoModal';
import { cn } from '../../utils/cn';
import { Logo } from './Logo';
import { MobileNavigation } from './MobileNavigation';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  const isActive = (to: string) => {
    if (to.includes('#')) {
      return location.pathname === '/' && to === `/${location.hash}`;
    }
    return location.pathname === to && !location.hash;
  };

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 border-b transition-all duration-300',
          scrolled
            ? 'border-line/80 bg-ivory/95 shadow-soft backdrop-blur'
            : 'border-transparent bg-transparent',
        )}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:h-[72px] lg:px-8"
        >
          <Link to="/" aria-label="DeskScholar home" className="inline-flex min-h-11 shrink-0 items-center">
            <Logo />
          </Link>

          <ul className="hidden items-center gap-0.5 xl:flex">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-3.5 text-[13.5px] font-semibold transition-colors xl:px-4 xl:text-sm',
                      active ? 'text-brand-dark' : 'text-ink hover:text-brand-dark',
                    )}
                  >
                    {link.label}
                    {active && (
                      <span
                        className="absolute inset-x-3.5 bottom-1.5 h-0.5 rounded-full bg-brand"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden shrink-0 items-center gap-2 xl:flex">
            <CloudflareVideoModal>
              {({ open }) => (
                <button
                  type="button"
                  onClick={open}
                  className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full px-4 text-sm font-semibold text-ink transition-colors hover:bg-brand-light/60 hover:text-brand-dark"
                >
                  <Play className="h-4 w-4 text-brand-dark" aria-hidden="true" />
                  Watch Demo
                </button>
              )}
            </CloudflareVideoModal>
            <Link
              to="/contact"
              className="inline-flex min-h-11 items-center whitespace-nowrap rounded-full bg-brand px-5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-brand-dark"
            >
              Join Early Access
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            data-testid="mobile-nav-open"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition hover:bg-brand-light xl:hidden"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </nav>
      </header>
      <MobileNavigation open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
