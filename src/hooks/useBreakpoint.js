import { useState, useEffect } from 'react';

const QUERIES = {
  mobile: '(max-width: 639px)',
  tablet: '(min-width: 640px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',
};

function getBreakpoint() {
  if (typeof window === 'undefined') return 'desktop';
  if (window.matchMedia(QUERIES.desktop).matches) return 'desktop';
  if (window.matchMedia(QUERIES.tablet).matches) return 'tablet';
  return 'mobile';
}

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState(getBreakpoint);

  useEffect(() => {
    const mediaLists = Object.values(QUERIES).map((query) => window.matchMedia(query));
    const handleChange = () => setBreakpoint(getBreakpoint());

    mediaLists.forEach((mq) => mq.addEventListener('change', handleChange));
    return () => mediaLists.forEach((mq) => mq.removeEventListener('change', handleChange));
  }, []);

  return breakpoint;
}

export function useIsCompactLayout() {
  const breakpoint = useBreakpoint();
  return breakpoint !== 'desktop';
}
