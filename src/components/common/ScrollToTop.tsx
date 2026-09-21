import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scrolls to top on navigation; scrolls to the target element for hash links. */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Give lazy route content a moment to mount before scrolling to the anchor.
      const timeout = window.setTimeout(() => {
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo(0, 0);
        }
      }, 120);
      return () => window.clearTimeout(timeout);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
