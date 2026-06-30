/**
 * Dynamic Google Fonts loader
 */

const loadedFonts = new Set();

export function loadComboFonts(combo) {
  const families = new Set([
    combo.fonts.heading.family,
    combo.fonts.body.family,
  ]);

  const toLoad = [...families].filter((f) => !loadedFonts.has(f));
  if (toLoad.length === 0) return Promise.resolve();

  const query = toLoad
    .map((f) => `family=${f.replace(/ /g, '+')}:wght@400;500;600;700`)
    .join('&');

  return new Promise((resolve) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?${query}&display=swap`;
    link.onload = () => {
      toLoad.forEach((f) => loadedFonts.add(f));
      resolve();
    };
    link.onerror = () => resolve();
    document.head.appendChild(link);
  });
}
