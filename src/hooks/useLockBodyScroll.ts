import { useEffect } from 'react';

/** Locks body scrolling while `active` is true (used by the modal and mobile drawer). */
export function useLockBodyScroll(active: boolean): void {
  useEffect(() => {
    if (!active) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [active]);
}
