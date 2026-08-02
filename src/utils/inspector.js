import {
  contrastRatio,
  isLargeText,
  suggestFixBackground,
  suggestFixText,
} from './contrast';

const ROLE_LABELS = {
  text: 'Text primary',
  background: 'Background',
  primary: 'Primary',
  accent: 'Accent',
  secondary: 'Surface / secondary',
};

export function normalizeHex(color) {
  if (!color) return null;
  const value = color.trim();
  if (value.startsWith('#')) {
    if (value.length === 4) {
      return `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}`.toUpperCase();
    }
    return value.toUpperCase();
  }
  const rgbMatch = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (!rgbMatch) return null;
  const [, r, g, b] = rgbMatch;
  return `#${[r, g, b].map((channel) => Number(channel).toString(16).padStart(2, '0')).join('')}`.toUpperCase();
}

function hexToRgb(hex) {
  const normalized = normalizeHex(hex)?.replace('#', '');
  if (!normalized) return null;
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

function colorsClose(a, b, tolerance = 12) {
  const rgbA = hexToRgb(a);
  const rgbB = hexToRgb(b);
  if (!rgbA || !rgbB) return false;
  return Math.abs(rgbA.r - rgbB.r) <= tolerance
    && Math.abs(rgbA.g - rgbB.g) <= tolerance
    && Math.abs(rgbA.b - rgbB.b) <= tolerance;
}

export function matchPaletteRole(hex, paletteColors) {
  const normalized = normalizeHex(hex);
  if (!normalized || !paletteColors) return null;

  const entries = [
    ['text', paletteColors.text],
    ['background', paletteColors.background],
    ['primary', paletteColors.primary],
    ['accent', paletteColors.accent],
    ['secondary', paletteColors.secondary],
  ];

  const match = entries.find(([, value]) => colorsClose(normalized, value));
  return match ? ROLE_LABELS[match[0]] : null;
}

function parsePx(value) {
  if (!value) return 0;
  if (value.endsWith('px')) return parseFloat(value);
  if (value.endsWith('rem')) return parseFloat(value) * 16;
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function getOpaqueBackground(element) {
  let node = element;
  while (node && node instanceof Element) {
    const style = window.getComputedStyle(node);
    const bg = normalizeHex(style.backgroundColor);
    const alphaMatch = style.backgroundColor.match(/rgba?\([^)]+,\s*([\d.]+)\)/);
    const alpha = alphaMatch ? parseFloat(alphaMatch[1]) : 1;
    if (bg && alpha > 0.05) return bg;
    node = node.parentElement;
  }
  return '#FFFFFF';
}

export function getScrollableElements(root) {
  if (!root) return [];
  const targets = [root];
  const nodes = root.querySelectorAll('*');
  nodes.forEach((node) => {
    const style = window.getComputedStyle(node);
    const { overflowX, overflowY } = style;
    if (
      ['auto', 'scroll', 'overlay'].includes(overflowY)
      || ['auto', 'scroll', 'overlay'].includes(overflowX)
    ) {
      targets.push(node);
    }
  });
  return targets;
}

export function isElementVisibleInFrame(element, frame, padding = 6) {
  const elementRect = element.getBoundingClientRect();
  const frameRect = frame.getBoundingClientRect();
  if (elementRect.width === 0 && elementRect.height === 0) return false;

  return elementRect.bottom > frameRect.top + padding
    && elementRect.top < frameRect.bottom - padding
    && elementRect.right > frameRect.left + padding
    && elementRect.left < frameRect.right - padding;
}

export function getDotPositionInFrame(element, frame, anchor) {
  const elementRect = element.getBoundingClientRect();
  const frameRect = frame.getBoundingClientRect();
  const anchorPoint = getAnchorPoint(elementRect, anchor);
  return {
    x: anchorPoint.x - frameRect.left,
    y: anchorPoint.y - frameRect.top,
  };
}

export function getAnchorPoint(rect, anchor) {
  switch (anchor) {
    case 'top-right':
      return { x: rect.right, y: rect.top };
    case 'left-center':
      return { x: rect.left, y: rect.top + rect.height / 2 };
    case 'bottom-right':
      return { x: rect.right, y: rect.bottom };
    case 'bottom-left':
      return { x: rect.left, y: rect.bottom };
    case 'top-center':
      return { x: rect.left + rect.width / 2, y: rect.top };
    case 'right-center':
      return { x: rect.right, y: rect.top + rect.height / 2 };
    case 'left':
      return { x: rect.left, y: rect.top + rect.height / 2 };
    case 'right':
      return { x: rect.right, y: rect.top + rect.height / 2 };
    default:
      return { x: rect.right, y: rect.top };
  }
}

export function extractElementStyles(element, paletteColors) {
  const computed = window.getComputedStyle(element);
  const fontSizePx = parsePx(computed.fontSize);
  const fontWeight = parseInt(computed.fontWeight, 10) || 400;
  const color = normalizeHex(computed.color);
  const backgroundColor = getOpaqueBackground(element);
  const borderColor = normalizeHex(computed.borderColor);
  const borderRadius = computed.borderRadius;
  const letterSpacing = parsePx(computed.letterSpacing);

  const typography = [
    { label: 'Font', value: computed.fontFamily.replace(/"/g, '') },
    { label: 'Size', value: `${Math.round(fontSizePx * 10) / 10}px` },
    { label: 'Weight', value: String(fontWeight) },
    { label: 'Line height', value: computed.lineHeight },
  ];

  if (letterSpacing > 0.01) {
    typography.push({ label: 'Letter spacing', value: computed.letterSpacing });
  }

  if (color) {
    typography.push({
      label: 'Color',
      value: color,
      swatch: color,
      role: matchPaletteRole(color, paletteColors),
    });
  }

  const colors = [];
  const elementBg = normalizeHex(computed.backgroundColor);
  if (elementBg && elementBg !== color) {
    colors.push({
      label: 'Background',
      value: elementBg,
      swatch: elementBg,
      role: matchPaletteRole(elementBg, paletteColors),
    });
  } else if (backgroundColor) {
    colors.push({
      label: 'Background',
      value: backgroundColor,
      swatch: backgroundColor,
      role: matchPaletteRole(backgroundColor, paletteColors),
    });
  }

  if (borderColor && borderColor !== '#000000' && computed.borderWidth !== '0px') {
    colors.push({
      label: 'Border',
      value: borderColor,
      swatch: borderColor,
      role: matchPaletteRole(borderColor, paletteColors),
    });
  }

  if (borderRadius && borderRadius !== '0px') {
    colors.push({ label: 'Border radius', value: borderRadius });
  }

  return {
    typography,
    colors,
    fontSizePx,
    fontWeight,
    foreground: color || '#000000',
    background: backgroundColor,
  };
}

export function buildCssSnippet(styles) {
  const lines = [];
  const font = styles.typography.find((row) => row.label === 'Font');
  const size = styles.typography.find((row) => row.label === 'Size');
  const weight = styles.typography.find((row) => row.label === 'Weight');
  const lineHeight = styles.typography.find((row) => row.label === 'Line height');
  const letterSpacing = styles.typography.find((row) => row.label === 'Letter spacing');
  const color = styles.typography.find((row) => row.label === 'Color')
    || styles.colors.find((row) => row.label === 'Color');

  if (font) lines.push(`font-family: ${font.value};`);
  if (size) lines.push(`font-size: ${size.value};`);
  if (weight) lines.push(`font-weight: ${weight.value};`);
  if (lineHeight) lines.push(`line-height: ${lineHeight.value};`);
  if (letterSpacing) lines.push(`letter-spacing: ${letterSpacing.value};`);
  if (color?.value) lines.push(`color: ${color.value};`);

  const bg = styles.colors.find((row) => row.label === 'Background');
  if (bg?.value) lines.push(`background-color: ${bg.value};`);
  const border = styles.colors.find((row) => row.label === 'Border');
  if (border?.value) lines.push(`border-color: ${border.value};`);
  const radius = styles.colors.find((row) => row.label === 'Border radius');
  if (radius?.value) lines.push(`border-radius: ${radius.value};`);

  return lines.join('\n');
}

function tailwindFontSize(sizePx) {
  const map = [
    [12, 'text-xs'],
    [14, 'text-sm'],
    [16, 'text-base'],
    [18, 'text-lg'],
    [20, 'text-xl'],
    [24, 'text-2xl'],
    [30, 'text-3xl'],
    [36, 'text-4xl'],
  ];
  const match = map.find(([px]) => Math.abs(px - sizePx) <= 1);
  return match ? match[1] : `text-[${Math.round(sizePx)}px]`;
}

function tailwindFontWeight(weight) {
  const map = {
    400: 'font-normal',
    500: 'font-medium',
    600: 'font-semibold',
    700: 'font-bold',
    800: 'font-extrabold',
  };
  return map[weight] || `font-[${weight}]`;
}

function tailwindLineHeight(lineHeight, fontSizePx) {
  const numeric = parseFloat(lineHeight);
  if (!Number.isFinite(numeric)) return `leading-[${lineHeight}]`;
  const ratio = numeric <= 3 ? numeric : numeric / fontSizePx;
  if (ratio <= 1.1) return 'leading-none';
  if (ratio <= 1.3) return 'leading-tight';
  if (ratio <= 1.5) return 'leading-snug';
  if (ratio <= 1.7) return 'leading-normal';
  return `leading-[${lineHeight}]`;
}

export function buildTailwindSnippet(styles) {
  const parts = [];
  const font = styles.typography.find((row) => row.label === 'Font');
  const size = styles.typography.find((row) => row.label === 'Size');
  const weight = styles.typography.find((row) => row.label === 'Weight');
  const lineHeight = styles.typography.find((row) => row.label === 'Line height');
  const color = styles.typography.find((row) => row.label === 'Color')
    || styles.colors.find((row) => row.label === 'Color');

  if (font) {
    const family = font.value.split(',')[0].trim().replace(/['"]/g, '');
    parts.push(`font-['${family}']`);
  }
  if (size) parts.push(tailwindFontSize(styles.fontSizePx));
  if (weight) parts.push(tailwindFontWeight(styles.fontWeight));
  if (lineHeight) parts.push(tailwindLineHeight(lineHeight.value, styles.fontSizePx));
  if (color?.value) parts.push(`text-[${color.value}]`);

  const bg = styles.colors.find((row) => row.label === 'Background');
  if (bg?.value) parts.push(`bg-[${bg.value}]`);
  const border = styles.colors.find((row) => row.label === 'Border');
  if (border?.value) parts.push(`border-[${border.value}]`);
  const radius = styles.colors.find((row) => row.label === 'Border radius');
  if (radius?.value) parts.push(`rounded-[${radius.value}]`);

  return parts.join(' ');
}

export function getWcagAssessment({ wcagType, styles }) {
  if (wcagType === 'skip') return null;
  if (wcagType === 'decorative') {
    return { kind: 'decorative', message: 'Decorative — no contrast requirement' };
  }

  const ratio = contrastRatio(styles.foreground, styles.background);
  const rounded = Math.round(ratio * 100) / 100;

  if (wcagType === 'non-text') {
    const pass = ratio >= 3;
    return {
      kind: 'non-text',
      ratio: rounded,
      pass,
      criterion: 'WCAG 1.4.11',
      badges: { nonText: pass },
      note: pass
        ? 'This UI element meets the 3:1 non-text contrast requirement against its adjacent surface.'
        : 'This UI element needs at least 3:1 contrast against its adjacent surface.',
    };
  }

  const large = isLargeText(styles.fontSizePx, styles.fontWeight);
  const aaThreshold = large ? 3 : 4.5;
  const aaaThreshold = large ? 4.5 : 7;
  const passAa = ratio >= aaThreshold;
  const passAaa = ratio >= aaaThreshold;
  const passAaLarge = ratio >= 3;
  const borderline = passAa && ratio < aaThreshold + 0.3;

  let note = '';
  if (passAa && passAaa) {
    note = large
      ? `At ${Math.round(styles.fontSizePx)}px ${styles.fontWeight}, this is large text. The AA threshold is 3:1 — you're passing at ${rounded}:1. AAA (4.5:1) is also met.`
      : `At ${Math.round(styles.fontSizePx)}px, the AA minimum is 4.5:1. This combination passes at ${rounded}:1. AAA (7:1) is also met — excellent contrast for extended reading.`;
  } else if (passAa) {
    note = large
      ? `At ${Math.round(styles.fontSizePx)}px ${styles.fontWeight}, this is large text. The AA threshold is 3:1 — you're passing at ${rounded}:1.`
      : `At ${Math.round(styles.fontSizePx)}px, the AA minimum is 4.5:1. This combination passes at ${rounded}:1.`;
  } else if (large) {
    note = `At ${Math.round(styles.fontSizePx)}px ${styles.fontWeight}, large text needs 3:1 to pass AA. This is ${rounded}:1 — ${(aaThreshold - rounded).toFixed(2)} short. See fixes below.`;
  } else {
    note = `Body text at ${Math.round(styles.fontSizePx)}px requires 4.5:1 for AA. This is ${rounded}:1 and fails. This combination may be unreadable for users with low vision.`;
  }

  if (borderline) {
    note += ' Note: this is close to the threshold — a small palette change could push it to fail.';
  }

  return {
    kind: 'text',
    ratio: rounded,
    large,
    aaThreshold,
    passAa,
    passAaa,
    badges: {
      aa: passAa,
      aaLarge: passAaLarge,
      aaa: passAaa,
    },
    note,
    fixes: passAa ? null : getFixSuggestions(styles.foreground, styles.background, aaThreshold),
  };
}

function getFixSuggestions(foreground, background, targetRatio) {
  const buffer = targetRatio + 0.1;
  const darkerText = suggestFixText(foreground, background, buffer);
  const lighterBg = suggestFixBackground(foreground, background, buffer);

  return {
    darkerText: darkerText !== foreground ? darkerText : null,
    lighterBg: lighterBg !== background ? lighterBg : null,
  };
}

export function getPopupPosition(dotPoint, popupSize, frameRect, isMobileFrame) {
  const margin = 12;
  const mobileMargin = 8;
  const dotGap = 28;
  const mobileDotGap = 24;

  if (isMobileFrame) {
    const width = frameRect.width - mobileMargin * 2;
    const left = frameRect.left + mobileMargin;
    const top = Math.min(
      dotPoint.y + mobileDotGap,
      frameRect.bottom - popupSize.height - margin,
    );
    return { top, left, width, placement: 'bottom' };
  }

  const placeRight = dotPoint.x < frameRect.left + frameRect.width / 2;
  let left = placeRight
    ? dotPoint.x + dotGap
    : dotPoint.x - popupSize.width - dotGap;
  let top = dotPoint.y - popupSize.height / 2;

  left = Math.max(frameRect.left + margin, Math.min(left, frameRect.right - popupSize.width - margin));
  top = Math.max(frameRect.top + margin, Math.min(top, frameRect.bottom - popupSize.height - margin));

  return { top, left, width: popupSize.width, placement: placeRight ? 'right' : 'left' };
}

export function clampPopupInFrame(top, left, popupSize, frameSize, margin = 8) {
  const maxTop = Math.max(margin, frameSize.height - popupSize.height - margin);
  const maxLeft = Math.max(margin, frameSize.width - popupSize.width - margin);
  return {
    top: Math.min(Math.max(margin, top), maxTop),
    left: Math.min(Math.max(margin, left), maxLeft),
  };
}

export function getConnectorPoints(dotPoint, popupRect) {
  const popupCenterY = popupRect.top + popupRect.height / 2;
  const popupEdgeX = dotPoint.x < popupRect.left + popupRect.width / 2
    ? popupRect.left
    : popupRect.right;
  return {
    x1: dotPoint.x,
    y1: dotPoint.y,
    x2: popupEdgeX,
    y2: popupCenterY,
  };
}

export function getConnectorPointsToLeftEdge(dotPoint, popupRect) {
  return {
    x1: dotPoint.x,
    y1: dotPoint.y,
    x2: popupRect.left,
    y2: popupRect.top + popupRect.height / 2,
  };
}

/**
 * Stack popover panels along the right edge of the preview frame.
 * Items: { inspectId, dotY, height? }
 */
export function layoutPopoversOnRight(items, frameSize, options = {}) {
  const {
    popupWidth = 200,
    margin = 8,
    gap = 6,
    defaultHeight = 132,
  } = options;

  if (!items.length) return [];

  const left = Math.max(margin, frameSize.width - popupWidth - margin);
  const sorted = [...items].sort((a, b) => a.dotY - b.dotY);
  const placements = [];
  let cursor = margin;

  sorted.forEach((item) => {
    const height = item.height ?? defaultHeight;
    let top = item.dotY - height / 2;
    top = Math.max(top, cursor);
    top = Math.max(margin, Math.min(top, frameSize.height - height - margin));
    placements.push({
      inspectId: item.inspectId,
      dotY: item.dotY,
      top,
      left,
      width: popupWidth,
      height,
    });
    cursor = top + height + gap;
  });

  const last = placements[placements.length - 1];
  const overflow = last.top + last.height + margin - frameSize.height;
  if (overflow > 0) {
    placements.forEach((placement) => {
      placement.top = Math.max(margin, placement.top - overflow);
    });
  }

  return placements;
}
