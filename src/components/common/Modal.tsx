import { useCallback, useEffect, useRef, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, video, iframe, [tabindex]:not([tabindex="-1"])';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  /** Extra class names for the modal panel. */
  panelClassName?: string;
}

/** Accessible modal: Escape to close, backdrop click, focus move/restore, body scroll lock. */
export function Modal({ open, onClose, labelledBy, children, panelClassName = '' }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const focusFirst = window.setTimeout(() => {
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      (focusable?.[0] ?? panelRef.current)?.focus();
    }, 30);

    return () => window.clearTimeout(focusFirst);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const restoreTo = previouslyFocused.current;
    return () => {
      restoreTo?.focus?.();
    };
  }, [open]);

  // Document-level Escape so the modal closes even if focus is not yet inside the dialog.
  useEffect(() => {
    if (!open) return;
    const onDocumentKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onDocumentKeyDown);
    return () => document.removeEventListener('keydown', onDocumentKeyDown);
  }, [open, onClose]);

  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key === 'Tab' && panelRef.current) {
        const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
          (el) => el.offsetParent !== null || el === document.activeElement,
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    },
    [onClose],
  );

  return createPortal(
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          onKeyDown={handleKeyDown}
          data-testid="modal-root"
        >
          <motion.div
            className="absolute inset-0 bg-midnight/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
            data-testid="modal-backdrop"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            tabIndex={-1}
            className={`relative w-full max-w-3xl ${panelClassName}`}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
