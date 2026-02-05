import { useState, useEffect } from 'react';

const COMPACT_VIEWPORT_MAX = 767; // below 768px = compact (icons only)

/**
 * Returns true when viewport width is >= 768px (wide layout).
 * Used for header labels so behavior works in consuming apps
 * that may not include Tailwind responsive variants for the calendar.
 */
export function useIsWideViewport(): boolean {
  const [isWide, setIsWide] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const update = () => setIsWide(window.innerWidth > COMPACT_VIEWPORT_MAX);
    update();

    const mql = window.matchMedia(`(min-width: ${COMPACT_VIEWPORT_MAX + 1}px)`);
    const listener = () => setIsWide(mql.matches);
    mql.addEventListener('change', listener);
    return () => mql.removeEventListener('change', listener);
  }, []);

  return isWide;
}
