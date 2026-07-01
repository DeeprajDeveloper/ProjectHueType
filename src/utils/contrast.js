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

export function getTierBadges(ratio) {
  return {
    aa: ratio >= 4.5,
    aaLarge: ratio >= 3,
    aaa: ratio >= 7,
  };
}

export function getContrastingTextColor(background) {
  const blackRatio = contrastRatio('#000000', background);
  const whiteRatio = contrastRatio('#FFFFFF', background);
  return blackRatio >= whiteRatio ? '#000000' : '#FFFFFF';
}

export function checkPair(foreground, background, isLargeText = false) {
  const ratio = contrastRatio(foreground, background);
  const { level, status } = getContrastLevel(ratio, isLargeText);
  return {
    ratio: Math.round(ratio * 100) / 100,
    level,
    status,
    tiers: getTierBadges(ratio),
  };
}

export function checkComboContrast(colors) {
  const pairs = [
    {
      id: 'text-on-background',
      fg: colors.text,
      bg: colors.background,
      label: 'Body text on background',
      description: 'Body text on background',
      large: false,
    },
    {
      id: 'text-on-surface',
      fg: colors.text,
      bg: colors.secondary,
      label: 'Body text on surface',
      description: 'Body text on surface',
      large: false,
    },
    {
      id: 'button-on-primary',
      fg: getContrastingTextColor(colors.primary),
      bg: colors.primary,
      label: 'Button text on primary',
      description: 'Button text on primary',
      large: false,
    },
    {
      id: 'accent-on-background',
      fg: colors.accent,
      bg: colors.background,
      label: 'Accent on background',
      description: 'Accent links and labels on background',
      large: true,
    },
    {
      id: 'primary-on-background',
      fg: colors.primary,
      bg: colors.background,
      label: 'Primary on background',
      description: 'Primary headings and links on background',
      large: true,
    },
    {
      id: 'button-on-accent',
      fg: getContrastingTextColor(colors.accent),
      bg: colors.accent,
      label: 'Button text on accent',
      description: 'Button text on accent',
      large: false,
    },
  ];

  return pairs.map((pair) => ({
    ...pair,
    ...checkPair(pair.fg, pair.bg, pair.large),
  }));
}

function adjustRgbChannel(channel, factor, lighten) {
  return lighten
    ? Math.round(channel + (255 - channel) * factor)
    : Math.round(channel * (1 - factor));
}

export function suggestFixText(foreground, background, targetRatio = 4.5) {
  const fg = hexToRgb(foreground);
  const bgLum = relativeLuminance(hexToRgb(background));

  for (let step = 0; step <= 100; step++) {
    const factor = step / 100;
    const lighten = bgLum > 0.5;
    const candidate = `#${[adjustRgbChannel(fg.r, factor, !lighten), adjustRgbChannel(fg.g, factor, !lighten), adjustRgbChannel(fg.b, factor, !lighten)]
      .map((c) => Math.min(255, Math.max(0, c)).toString(16).padStart(2, '0'))
      .join('')}`;

    if (contrastRatio(candidate, background) >= targetRatio) {
      return candidate.toUpperCase();
    }
  }
  return foreground;
}

export function suggestFixBackground(foreground, background, targetRatio = 4.5) {
  const bg = hexToRgb(background);
  const fgLum = relativeLuminance(hexToRgb(foreground));

  for (let step = 0; step <= 100; step++) {
    const factor = step / 100;
    const lighten = fgLum < 0.5;
    const candidate = `#${[adjustRgbChannel(bg.r, factor, lighten), adjustRgbChannel(bg.g, factor, lighten), adjustRgbChannel(bg.b, factor, lighten)]
      .map((c) => Math.min(255, Math.max(0, c)).toString(16).padStart(2, '0'))
      .join('')}`;

    if (contrastRatio(foreground, candidate) >= targetRatio) {
      return candidate.toUpperCase();
    }
  }
  return background;
}

export function suggestFixes(foreground, background, targetRatio = 4.5) {
  return {
    darkerText: suggestFixText(foreground, background, targetRatio),
    lighterBackground: suggestFixBackground(foreground, background, targetRatio),
  };
}

/** @deprecated use suggestFixText */
export function suggestFix(foreground, background, targetRatio = 4.5) {
  return suggestFixText(foreground, background, targetRatio);
}

export function getOverallContrastStatus(pairs) {
  if (pairs.some((p) => p.status === 'fail')) return 'fail';
  if (pairs.some((p) => p.status === 'warn')) return 'warn';
  if (pairs.every((p) => p.level === 'AAA')) return 'aaa';
  return 'aa';
}

export function getContrastSummary(pairs) {
  const failures = pairs.filter((p) => p.status === 'fail');
  const borderline = pairs.filter((p) => p.status === 'warn');
  const passCount = pairs.filter((p) => p.status === 'pass').length;

  if (failures.length > 0) {
    return {
      state: 'fail',
      failures: failures.length,
      borderline: borderline.length,
      total: pairs.length,
      passCount,
      worstRatio: Math.min(...pairs.map((p) => p.ratio)),
    };
  }

  if (borderline.length > 0) {
    return {
      state: 'warn',
      failures: 0,
      borderline: borderline.length,
      total: pairs.length,
      passCount,
      worstRatio: Math.min(...pairs.map((p) => p.ratio)),
    };
  }

  return {
    state: 'pass',
    failures: 0,
    borderline: 0,
    total: pairs.length,
    passCount,
    worstRatio: Math.min(...pairs.map((p) => p.ratio)),
  };
}
