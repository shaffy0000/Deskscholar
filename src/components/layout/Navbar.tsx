import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { navLinks, productMenu } from '../../data/navigation';
import { cn } from '../../utils/cn';
import { Logo } from './Logo';
import { MobileNavigation } from './MobileNavigation';

/**
 * Editorial product-brand header — integrated with the page, not floating on it.
 * Sticky, same warm-light background as the page, one subtle bottom hairline,
 * inner container aligned with the main page grid. Token heights:
 * 60px mobile / 72px desktop, unchanged on scroll (no resizing jumps).
 * Groups: wordmark · Product disclosure + links · one compact waitlist action.
 */
export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const productRef = useRef<HTMLDivElement>(null);
  const productBtnRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setProductOpen(false);
  }, [location.pathname, location.hash]);

  // Outside click + Escape close the product panel; Escape restores focus to the control.
  useEffect(() => {
    if (!productOpen) return;
    const onDown = (event: MouseEvent) => {
      if (!productRef.current?.contains(event.target as Node)) setProductOpen(false);
    };
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setProductOpen(false);
        productBtnRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [productOpen]);

  const isActive = (to: string) =>
    to.includes('#')
      ? location.pathname === '/' && to === `/${location.hash}`
      : location.pathname === to && !location.hash;

  const productActive =
    location.pathname === '/technology' ||
    location.pathname === '/schools' ||
    (location.pathname === '/' && location.hash === '#planned-experience');

  const navLinkClass = (active: boolean) =>
    cn(
      'relative -mb-px flex h-[var(--header-h)] min-[920px]:h-[var(--header-h-lg)] items-center border-b-2 px-0.5 text-[14.5px] font-medium transition-colors duration-[var(--t-micro)]',
      active
        ? 'border-[var(--beam)] text-[var(--beam)]'
        : 'border-transparent text-[var(--text-hi)] hover:text-[var(--beam)]',
    );

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--hairline-dark)] bg-[var(--ink-900)]">
        <nav
          aria-label="Main"
          data-testid="main-nav"
          className="mx-auto flex h-[var(--header-h)] max-w-[1200px] items-center justify-between gap-6 px-5 sm:px-6 min-[920px]:h-[var(--header-h-lg)] lg:px-8"
        >
          {/* Group 1 — wordmark (primary identity) */}
          <Link
            to="/"
            aria-label="DeskScholar home"
            className="flex min-h-11 shrink-0 items-center rounded-[var(--radius-control)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--beam)]"
          >
            <Logo mark={false} />
          </Link>

          {/* Group 2 — navigation (collapses to the mobile panel before items crowd) */}
          <div className="hidden items-center gap-7 min-[920px]:flex">
            <div className="relative" ref={productRef}>
              <button
                ref={productBtnRef}
                type="button"
                aria-expanded={productOpen}
                aria-controls="product-panel"
                onClick={() => setProductOpen((v) => !v)}
                className={cn(
                  'flex h-[var(--header-h-lg)] items-center gap-1 border-b-2 text-[14.5px] font-medium transition-colors duration-[var(--t-micro)] -mb-px',
                  productOpen || productActive
                    ? 'border-[var(--beam)] text-[var(--beam)]'
                    : 'border-transparent text-[var(--text-hi)] hover:text-[var(--beam)]',
                )}
              >
                Product
                <ChevronDown
                  className={cn(
                    'h-3.5 w-3.5 transition-transform duration-[var(--t-fast)] motion-reduce:transition-none',
                    productOpen && 'rotate-180',
                  )}
                  aria-hidden="true"
                />
              </button>

              {productOpen && (
                <div
                  id="product-panel"
                  data-testid="product-panel"
                  className="absolute left-0 top-full z-50 w-[300px] origin-top-left animate-[panel-in_180ms_var(--ease-out)] rounded-[var(--radius-card)] border border-[var(--hairline-dark)] bg-[var(--ink-800)] p-2 shadow-[var(--shadow-card)] motion-reduce:animate-none"
                >
                  <ul className="space-y-0.5">
                    {productMenu.map((item) => (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          className="block rounded-[6px] px-3 py-2.5 transition-colors duration-[var(--t-micro)] hover:bg-[var(--surface-2)] focus-visible:bg-[var(--surface-2)]"
                        >
                          <span className="block text-[14px] font-semibold text-[var(--text-hi)]">
                            {item.label}
                          </span>
                          <span className="mt-0.5 block text-[12.5px] leading-snug text-[var(--text-lo)]">
                            {item.description}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  aria-current={active ? 'page' : undefined}
                  className={navLinkClass(active)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Group 3 — one compact action + mobile menu control */}
          <div className="flex items-center gap-2">
            <Link
              to="/contact"
              className="hidden h-10 items-center rounded-[var(--radius-control)] bg-[var(--beam)] px-4 text-[14px] font-semibold text-white transition-colors duration-[var(--t-micro)] hover:bg-[var(--beam-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--beam)] sm:flex"
            >
              Join the waitlist
            </Link>
            <button
              type="button"
              data-testid="mobile-nav-open"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-control)] text-[var(--text-hi)] transition-colors duration-[var(--t-micro)] hover:bg-[var(--surface-2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--beam)] min-[920px]:hidden"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </svg>
            </button>
          </div>
        </nav>
      </header>
      <MobileNavigation isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
