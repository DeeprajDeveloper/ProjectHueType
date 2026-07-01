/**
 * Typography scale for combo font preview
 * Ratios are relative to body (1x = base size)
 */

export const TYPE_BASE_PX = 14;
export const TYPE_BASE_MIN_PX = 12;
export const TYPE_BASE_MAX_PX = 24;

export const TYPE_SCALE = [
  { id: 'h1', label: 'H1', ratio: 2.5, role: 'heading', sample: 'Display heading' },
  { id: 'h2', label: 'H2', ratio: 2, role: 'heading', sample: 'Section heading' },
  { id: 'h3', label: 'H3', ratio: 1.75, role: 'heading', sample: 'Subsection heading' },
  { id: 'h4', label: 'H4', ratio: 1.5, role: 'heading', sample: 'Card heading' },
  { id: 'h5', label: 'H5', ratio: 1.25, role: 'heading', sample: 'Small heading' },
  { id: 'h6', label: 'H6', ratio: 1.125, role: 'heading', sample: 'Label heading' },
  { id: 'body', label: 'Body', ratio: 1, role: 'body', sample: 'The quick brown fox jumps over the lazy dog.' },
  { id: 'small', label: 'Small', ratio: 0.875, role: 'body', sample: 'Secondary body text for supporting details.' },
  { id: 'caption', label: 'Caption', ratio: 0.75, role: 'body', sample: 'Metadata, labels, and fine print.' },
];

export function getTypeSizePx(ratio, basePx = TYPE_BASE_PX) {
  return Math.round(basePx * ratio * 10) / 10;
}

export function clampTypeBasePx(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return TYPE_BASE_PX;
  return Math.min(TYPE_BASE_MAX_PX, Math.max(TYPE_BASE_MIN_PX, Math.round(parsed)));
}

export function formatRatio(ratio) {
  if (ratio === 1) return '1x';
  const formatted = Number.isInteger(ratio) ? ratio : ratio.toFixed(3).replace(/\.?0+$/, '');
  return `${formatted}x`;
}

/** CSS custom properties for the live preview frame */
export function getPreviewTypeStyle(basePx = TYPE_BASE_PX) {
  const scale = basePx / TYPE_BASE_PX;
  const style = {
    '--preview-type-scale': String(scale),
    '--preview-type-base': `${basePx}px`,
  };

  TYPE_SCALE.forEach(({ id, ratio }) => {
    style[`--preview-type-${id}`] = `${getTypeSizePx(ratio, basePx)}px`;
  });

  return style;
}
