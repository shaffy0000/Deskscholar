import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { navLinks, productMenu } from '../../data/navigation';
import { cn } from '../../utils/cn';
import { Logo } from './Logo';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled])';

/**
 * Full-height light navigation panel — readable links, one waitlist action,
 * focus trap, Escape, and focus restoration to the opener. No rounded box.
 */
export function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const [productOpen, setProductOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      openerRef.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = 'hidden';
      panelRef.current?.focus();
    } else {
      document.body.style.overflow = '';
      openerRef.current?.focus?.();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key === 'Tab' && panelRef.current) {
        const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
          (el) => el.offsetParent !== null,
        );
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // Close on navigation
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    closeRef.current();
  }, [location.pathname, location.hash]);

  const linkClass =
    'flex min-h-12 items-center rounded-[var(--radius-control)] px-3 text-[17px] font-medium text-[var(--text-hi)] transition-colors duration-[var(--t-micro)] hover:bg-[var(--surface-2)] hover:text-[var(--beam)]';

  return (
    <div
      className={cn('fixed inset-0 z-[60] min-[920px]:hidden', !isOpen && 'pointer-events-none')}
      aria-hidden={!isOpen}
    >
      <div
        data-testid="mobile-nav-backdrop"
        className={cn(
          'absolute inset-0 bg-[rgba(23,33,31,0.45)] transition-opacity duration-300 motion-reduce:transition-none',
          isOpen ? 'opacity-100' : 'opacity-0',
        )}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal={isOpen ? 'true' : undefined}
        aria-label="Mobile navigation"
        data-testid="mobile-navigation"
        {...(isOpen ? {} : { inert: '' })}
        className={cn(
          'absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-[var(--ink-900)] shadow-[var(--shadow-plate)] outline-none transition-transform duration-300 ease-[var(--ease-out)] motion-reduce:transition-none',
          isOpen ? 'translate-x-0 visible' : 'translate-x-full invisible',
        )}
      >
        <div className="flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-[var(--hairline-dark)] px-5">
          <Link to="/" onClick={onClose} aria-label="DeskScholar home" className="rounded-[var(--radius-control)]">
            <Logo mark={false} />
          </Link>
          <button
            type="button"
            data-testid="mobile-nav-close"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-control)] text-[var(--text-hi)] transition-colors duration-[var(--t-micro)] hover:bg-[var(--surface-2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--beam)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
          {/* Product — expandable group (same entries as the desktop disclosure) */}
          <button
            type="button"
            aria-expanded={productOpen}
            aria-controls="mobile-product"
            onClick={() => setProductOpen((v) => !v)}
            className="flex w-full min-h-12 items-center justify-between rounded-[var(--radius-control)] px-3 text-[17px] font-medium text-[var(--text-hi)] transition-colors duration-[var(--t-micro)] hover:bg-[var(--surface-2)]"
          >
            Product
            <ChevronDown
              className={cn('h-5 w-5 text-[var(--text-lo)] transition-transform duration-200 motion-reduce:transition-none', productOpen && 'rotate-180')}
              aria-hidden="true"
            />
          </button>
          <div
            id="mobile-product"
            className={cn('grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out)] motion-reduce:transition-none', productOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}
          >
            <div className="overflow-hidden">
              <ul className="space-y-0.5 py-1 pl-3">
                {productMenu.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} onClick={onClose} className="flex min-h-11 flex-col justify-center rounded-[var(--radius-control)] px-3 py-1.5 transition-colors duration-[var(--t-micro)] hover:bg-[var(--surface-2)]">
                      <span className="text-[15px] font-semibold text-[var(--text-hi)]">{item.label}</span>
                      <span className="text-[13px] leading-snug text-[var(--text-lo)]">{item.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ul className="mt-2 space-y-0.5">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} onClick={onClose} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shrink-0 border-t border-[var(--hairline-dark)] p-4">
          <Link
            to="/contact"
            onClick={onClose}
            className="flex h-12 w-full items-center justify-center rounded-[var(--radius-control)] bg-[var(--beam)] px-4 text-[15px] font-semibold text-white transition-colors duration-[var(--t-micro)] hover:bg-[var(--beam-hover)]"
          >
            Join the waitlist
          </Link>
          <p className="mt-3 text-center text-[12.5px] text-[var(--text-lo)]">
            Prototype in development · planned capabilities
          </p>
        </div>
      </div>
    </div>
  );
}
