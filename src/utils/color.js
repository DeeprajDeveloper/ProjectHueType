export function normalizeHexColor(input) {
  if (!input || typeof input !== 'string') return null;

  let hex = input.trim();
  if (!hex) return null;
  if (!hex.startsWith('#')) hex = `#${hex}`;

  if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
    return hex.toUpperCase();
  }

  if (/^#[0-9A-Fa-f]{3}$/.test(hex)) {
    const [, r, g, b] = hex.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
    return `#${r}${r}${g}${g}${b}${b}`.toUpperCase();
  }

  return null;
}
