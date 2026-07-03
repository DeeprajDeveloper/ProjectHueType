import { useLayoutEffect } from 'react';

/** Unlocks document scroll for standalone pages (privacy, changelog, etc.). */
export function useStandaloneRoute() {
  useLayoutEffect(() => {
    const root = document.getElementById('root');
    const html = document.documentElement;
    const body = document.body;
    const targets = [html, body, root].filter(Boolean);

    const previousStyles = targets.map((node) => ({
      node,
      overflow: node.style.overflow,
      height: node.style.height,
      maxHeight: node.style.maxHeight,
      position: node.style.position,
      width: node.style.width,
      top: node.style.top,
    }));

    targets.forEach((node) => node.classList.add('route-document'));

    html.style.overflow = '';
    html.style.height = '';
    html.style.maxHeight = '';
    body.style.overflow = '';
    body.style.height = '';
    body.style.maxHeight = '';
    body.style.position = '';
    body.style.width = '';
    body.style.top = '';
    if (root) {
      root.style.overflow = '';
      root.style.height = '';
      root.style.maxHeight = '';
    }

    return () => {
      targets.forEach((node) => node.classList.remove('route-document'));
      previousStyles.forEach(({ node, overflow, height, maxHeight, position, width, top }) => {
        node.style.overflow = overflow;
        node.style.height = height;
        node.style.maxHeight = maxHeight;
        if (node === body) {
          node.style.position = position;
          node.style.width = width;
          node.style.top = top;
        }
      });
    };
  }, []);
}
