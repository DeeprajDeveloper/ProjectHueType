/**
 * WCAG contrast utilities (FR4)
 */

function hexToRgb(hex) {
  const cleaned = hex.replace('#', '');
  const full = cleaned.length === 3
    ? cleaned.split('').map((c) => c + c).join('')
    : cleaned;
  const num = parseInt(full, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function relativeLuminance({ r, g, b }) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function contrastRatio(foreground, background) {
  const l1 = relativeLuminance(hexToRgb(foreground));
  const l2 = relativeLuminance(hexToRgb(background));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function getContrastLevel(ratio, isLargeText = false) {
  if (ratio >= 7) return { level: 'AAA', status: 'pass' };
  if (ratio >= 4.5) return { level: 'AA', status: 'pass' };
  if (ratio >= 3 && isLargeText) return { level: 'AA-large', status: 'warn' };
  return { level: 'Fail', status: 'fail' };
}

export function checkPair(foreground, background, isLargeText = false) {
  const ratio = contrastRatio(foreground, background);
  const { level, status } = getContrastLevel(ratio, isLargeText);
  return { ratio: Math.round(ratio * 100) / 100, level, status };
}

export function checkComboContrast(colors) {
  const pairs = [
    { id: 'text-on-background', fg: colors.text, bg: colors.background, label: 'Text on background', large: false },
    { id: 'text-on-secondary', fg: colors.text, bg: colors.secondary, label: 'Text on secondary', large: false },
    { id: 'text-on-primary', fg: colors.background, bg: colors.primary, label: 'Light text on primary', large: false },
    { id: 'accent-on-background', fg: colors.accent, bg: colors.background, label: 'Accent on background', large: true },
    { id: 'primary-on-background', fg: colors.primary, bg: colors.background, label: 'Primary on background', large: true },
  ];

  return pairs.map((pair) => ({
    ...pair,
    ...checkPair(pair.fg, pair.bg, pair.large),
  }));
}

export function suggestFix(foreground, background, targetRatio = 4.5) {
  const fg = hexToRgb(foreground);
  const bgLum = relativeLuminance(hexToRgb(background));

  for (let step = 0; step <= 100; step++) {
    const factor = step / 100;
    const adjust = bgLum > 0.5
      ? (c) => Math.round(c * (1 - factor))
      : (c) => Math.round(c + (255 - c) * factor);

    const candidate = `#${[adjust(fg.r), adjust(fg.g), adjust(fg.b)]
      .map((c) => Math.min(255, Math.max(0, c)).toString(16).padStart(2, '0'))
      .join('')}`;

    if (contrastRatio(candidate, background) >= targetRatio) {
      return candidate;
    }
  }
  return foreground;
}

export function getOverallContrastStatus(pairs) {
  if (pairs.some((p) => p.status === 'fail')) return 'fail';
  if (pairs.some((p) => p.status === 'warn')) return 'warn';
  if (pairs.every((p) => p.level === 'AAA')) return 'aaa';
  return 'aa';
}
