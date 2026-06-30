/**
 * Generate 100–900 color scales from a base hex color.
 * 500 is always the exact base; lighter/darker steps interpolate from it
 * so the scale stays monotonic (100 lightest → 900 darkest).
 */

function hexToRgb(hex) {
  const cleaned = hex.replace('#', '');
  const full = cleaned.length === 3
    ? cleaned.split('').map((c) => c + c).join('')
    : cleaned;
  const num = parseInt(full, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function rgbToHex(r, g, b) {
  return `#${[r, g, b].map((c) => Math.round(Math.min(255, Math.max(0, c))).toString(16).padStart(2, '0')).join('')}`;
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
      default: break;
    }
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToRgb(h, s, l) {
  h /= 360; s /= 100; l /= 100;
  if (s === 0) {
    const val = l * 255;
    return { r: val, g: val, b: val };
  }
  const hue2rgb = (p, q, t) => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return {
    r: hue2rgb(p, q, h + 1 / 3) * 255,
    g: hue2rgb(p, q, h) * 255,
    b: hue2rgb(p, q, h - 1 / 3) * 255,
  };
}

function normalizeHex(hex) {
  if (!hex || typeof hex !== 'string') return '#000000';
  const cleaned = hex.replace('#', '').trim();
  const full = cleaned.length === 3
    ? cleaned.split('').map((c) => c + c).join('')
    : cleaned.padStart(6, '0').slice(0, 6);
  if (!/^[0-9A-Fa-f]{6}$/.test(full)) return '#000000';
  return `#${full}`.toUpperCase();
}

const LIGHT_CAP = 97;
const DARK_FLOOR = 6;

/** How far toward LIGHT_CAP each lighter step goes (100 = fullest) */
const LIGHTER_BLEND = {
  100: 1,
  200: 0.72,
  300: 0.44,
  400: 0.18,
};

/** How far toward DARK_FLOOR each darker step goes (900 = fullest) */
const DARKER_BLEND = {
  600: 0.22,
  700: 0.44,
  800: 0.68,
  900: 1,
};

function clampLightness(l) {
  return Math.min(99, Math.max(1, l));
}

function saturationForStep(baseS, targetL, baseL, isLighter) {
  if (baseS < 1) return baseS;
  if (isLighter) {
    const blend = (targetL - baseL) / Math.max(LIGHT_CAP - baseL, 1);
    return Math.max(baseS * (0.45 + 0.55 * (1 - blend)), 4);
  }
  const blend = (baseL - targetL) / Math.max(baseL - DARK_FLOOR, 1);
  return Math.min(baseS * (1 + 0.2 * blend), 100);
}

export function isColorLight(hex) {
  const { r, g, b } = hexToRgb(normalizeHex(hex));
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.58;
}

export function generateColorScale(baseHex) {
  const normalized = normalizeHex(baseHex);
  const { r, g, b } = hexToRgb(normalized);
  const { h, s, l: baseL } = rgbToHsl(r, g, b);
  const scale = { 500: normalized };

  Object.entries(LIGHTER_BLEND).forEach(([step, blend]) => {
    const targetL = clampLightness(baseL + (LIGHT_CAP - baseL) * blend);
    const targetS = saturationForStep(s, targetL, baseL, true);
    const rgb = hslToRgb(h, targetS, targetL);
    scale[Number(step)] = rgbToHex(rgb.r, rgb.g, rgb.b).toUpperCase();
  });

  Object.entries(DARKER_BLEND).forEach(([step, blend]) => {
    const targetL = clampLightness(baseL - (baseL - DARK_FLOOR) * blend);
    const targetS = saturationForStep(s, targetL, baseL, false);
    const rgb = hslToRgb(h, targetS, targetL);
    scale[Number(step)] = rgbToHex(rgb.r, rgb.g, rgb.b).toUpperCase();
  });

  return scale;
}

export function generateComboScales(colors) {
  return {
    primary: generateColorScale(colors.primary),
    secondary: generateColorScale(colors.secondary),
    accent: generateColorScale(colors.accent),
    neutral: generateColorScale(colors.text),
  };
}
