import { useState, useEffect, useRef, RefObject } from 'react';

export const WIDE_HEADER_MIN_WIDTH = 768; // px — below = compact (icons only)

/**
 * Returns true when the observed container width is >= WIDE_HEADER_MIN_WIDTH.
 * Uses ResizeObserver so the header adapts to its actual container (e.g. modal,
 * narrow column), not the viewport — labels only when there is enough space.
 */
export function useIsWideHeader(containerRef: RefObject<HTMLElement | null>): boolean {
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;

    const ro = new ResizeObserver(() => {
      setIsWide(el.getBoundingClientRect().width >= WIDE_HEADER_MIN_WIDTH);
    });
    ro.observe(el);
    setIsWide(el.getBoundingClientRect().width >= WIDE_HEADER_MIN_WIDTH);
    return () => ro.disconnect();
  }, [containerRef]);

  return isWide;
}
