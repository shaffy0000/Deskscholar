import '@testing-library/jest-dom/vitest';
import { configure } from '@testing-library/react';
import { vi } from 'vitest';

// Lazy route chunks can take a while to transform in the test environment.
configure({ asyncUtilTimeout: 20000 });

// jsdom does not implement media playback — stub it so the video modal is testable.
// These stubs only apply to jsdom test files; API tests run in a node environment.
if (typeof window !== 'undefined' && window.HTMLMediaElement) {
  Object.defineProperty(window.HTMLMediaElement.prototype, 'play', {
    writable: true,
    value: vi.fn().mockResolvedValue(undefined),
  });
  Object.defineProperty(window.HTMLMediaElement.prototype, 'pause', {
    writable: true,
    value: vi.fn(),
  });
  Object.defineProperty(window.HTMLMediaElement.prototype, 'load', {
    writable: true,
    value: vi.fn(),
  });
}

// Element.scrollIntoView + window.scrollTo are not implemented in jsdom.
if (typeof Element !== 'undefined') {
  Element.prototype.scrollIntoView = vi.fn();
}
if (typeof window !== 'undefined') {
  window.scrollTo = vi.fn();
}

class IntersectionObserverStub implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds: ReadonlyArray<number> = [];
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn().mockReturnValue([]);
}

class ResizeObserverStub {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

if (typeof window !== 'undefined') {
  if (!('IntersectionObserver' in window)) {
    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      value: IntersectionObserverStub,
    });
  }

  if (!('ResizeObserver' in window)) {
    Object.defineProperty(window, 'ResizeObserver', {
      writable: true,
      value: ResizeObserverStub,
    });
  }
}
