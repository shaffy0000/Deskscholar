import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { navLinks } from '../../data/navigation';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { Logo } from './Logo';

interface MobileNavigationProps {
  open: boolean;
  onClose: () => void;
}

/** Accessible mobile drawer: Escape closes, body scroll locks, links close the drawer. */
export function MobileNavigation({ open, onClose }: MobileNavigationProps) {
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] xl:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          data-testid="mobile-navigation"
        >
          <div className="absolute inset-0 bg-midnight/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
          <motion.nav
            aria-label="Mobile"
            role="dialog"
            aria-modal="true"
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-ivory shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="flex h-16 items-center justify-between border-b border-line px-5">
              <Link to="/" onClick={onClose} aria-label="DeskScholar home">
                <Logo />
              </Link>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                data-testid="mobile-nav-close"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition hover:bg-brand-light"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-4">
              <p className="eyebrow px-3 pb-2 text-muted">Menu</p>
              <div className="flex flex-col">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={onClose}
                    className="flex min-h-12 items-center rounded-card px-3 font-display text-[15px] font-semibold text-ink transition-colors hover:bg-brand-light hover:text-brand-dark"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="border-t border-line p-4">
              <Link
                to="/contact"
                onClick={onClose}
                className="flex min-h-12 w-full items-center justify-center rounded-full bg-brand px-6 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-brand-dark"
              >
                Join Early Access
              </Link>
              <p className="mt-3 text-center text-xs text-muted">Currently in prototype development.</p>
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
