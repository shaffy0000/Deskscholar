import { useEffect, useState } from 'react';

interface TypewriterResult {
  text: string;
  done: boolean;
}

/**
 * Reveals `fullText` character by character while `active`.
 * Completes instantly when `skip` is true or the user prefers reduced motion.
 */
export function useTypewriter(fullText: string, active: boolean, skip: boolean, speed = 22): TypewriterResult {
  const [count, setCount] = useState(0);
  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const instant = skip || prefersReduced;

  useEffect(() => {
    if (!active) return;
    if (instant) {
      setCount(fullText.length);
      return;
    }
    setCount(0);
    let frame = 0;
    const interval = window.setInterval(() => {
      frame += 2;
      setCount(Math.min(frame, fullText.length));
      if (frame >= fullText.length) window.clearInterval(interval);
    }, speed);
    return () => window.clearInterval(interval);
  }, [fullText, active, instant, speed]);

  return { text: fullText.slice(0, count), done: count >= fullText.length };
}
