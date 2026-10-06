import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { navLinks } from '../../data/navigation';
import { Logo } from './Logo';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      panelRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Focus trap while open: Tab cycles inside the drawer.
  useEffect(() => {
    if (!isOpen) return;
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', handleTab);
    return () => window.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  // Close on route change (ref keeps the effect from re-firing on every parent render,
  // which would otherwise close the drawer the instant it opens).
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    closeRef.current();
  }, [location.pathname, location.hash]);

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-50 bg-ink-900/60 backdrop-blur-sm transition-opacity duration-[280ms] ease-out',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none invisible'
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        data-testid="mobile-navigation"
        {...(isOpen ? {} : { inert: '' })}
        className={cn(
          'fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-ink-800 flex flex-col focus-visible:outline-none transition-transform duration-[280ms] ease-out',
          isOpen ? 'translate-x-0 visible' : 'translate-x-full invisible'
        )}
      >
        <div className="flex items-center justify-between p-6 border-b border-[var(--hairline-dark)]">
          <Link to="/" aria-label="DeskScholar home" onClick={onClose} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beam rounded-control">
            <Logo />
          </Link>
          <button
            type="button"
            data-testid="mobile-nav-close"
            className="p-2 min-h-11 min-w-11 text-text-hi hover:text-beam transition-colors duration-micro focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beam rounded-control"
            onClick={onClose}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-6 space-y-6">
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="block text-lg font-medium text-text-lo hover:text-beam transition-colors duration-micro focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beam rounded-control"
                  onClick={onClose}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-6 border-t border-[var(--hairline-dark)]">
          <Link
            to="/contact"
            className="flex w-full items-center justify-center rounded-control bg-beam px-4 py-3 text-base font-semibold text-ink-900 transition-colors duration-micro hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beam focus-visible:ring-offset-2 focus-visible:ring-offset-ink-800"
            onClick={onClose}
          >
            Join Early Access
          </Link>
        </div>
      </div>
    </>
  );
}
