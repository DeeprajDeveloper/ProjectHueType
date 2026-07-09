/**
 * Color value formatting for export output
 */

import { rgbToHsl } from './colorScale';

export function normalizeHex(hex) {
  if (!hex || typeof hex !== 'string') return '#000000';
  const cleaned = hex.replace('#', '').trim();
  const full = cleaned.length === 3
    ? cleaned.split('').map((c) => c + c).join('')
    : cleaned.padStart(6, '0').slice(0, 6);
  if (!/^[0-9A-Fa-f]{6}$/.test(full)) return '#000000';
  return `#${full}`.toUpperCase();
}

function hexToRgb(hex) {
  const normalized = normalizeHex(hex);
  const num = parseInt(normalized.replace('#', ''), 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function srgbToLinear(channel) {
  const c = channel / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function linearRgbToOklab(r, g, b) {
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);
  return {
    L: 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
    a: 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
    b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_,
  };
}

function formatRgb(hex) {
  const { r, g, b } = hexToRgb(hex);
  return `rgb(${r}, ${g}, ${b})`;
}

function formatHsl(hex) {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  return `hsl(${Math.round(h)} ${Math.round(s)}% ${Math.round(l)}%)`;
}

function formatOklch(hex) {
  const { r, g, b } = hexToRgb(hex);
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);
  const { L, a, b: bb } = linearRgbToOklab(lr, lg, lb);
  const c = Math.sqrt(a * a + bb * bb);
  let h = Math.atan2(bb, a) * (180 / Math.PI);
  if (h < 0) h += 360;
  return `oklch(${(L * 100).toFixed(1)}% ${c.toFixed(3)} ${h.toFixed(1)})`;
}

export function formatColorValue(hex, format = 'hex') {
  const normalized = normalizeHex(hex);
  switch (format) {
    case 'rgb':
      return formatRgb(normalized);
    case 'hsl':
      return formatHsl(normalized);
    case 'oklch':
      return formatOklch(normalized);
    case 'hex':
    default:
      return normalized;
  }
}

export function mapColorRecord(colors, formatColor) {
  return Object.fromEntries(
    Object.entries(colors).map(([key, value]) => [key, formatColor(value)]),
  );
}

export function mapScaleRecord(scales, formatColor) {
  return Object.fromEntries(
    Object.entries(scales).map(([name, scale]) => [
      name,
      Object.fromEntries(
        Object.entries(scale).map(([step, hex]) => [step, formatColor(hex)]),
      ),
    ]),
  );
}
