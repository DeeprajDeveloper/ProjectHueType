/**
 * Typography scale for combo font preview and type specimen visualizer
 */

export const TYPE_BASE_PX = 16;
export const TYPE_BASE_MIN_PX = 12;
export const TYPE_BASE_MAX_PX = 24;

/** Legacy preview scale (CSS custom properties for live preview mockups) */
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

export const SCALE_RATIO_OPTIONS = [
  { value: 1.125, label: '1.125', fullLabel: 'Minor Second (1.125)' },
  { value: 1.2, label: '1.200', fullLabel: 'Major Second (1.200)' },
  { value: 1.25, label: '1.250', fullLabel: 'Minor Third (1.250)' },
  { value: 1.333, label: '1.333', fullLabel: 'Perfect Fourth (1.333)' },
  { value: 1.618, label: '1.618', fullLabel: 'Golden Ratio (1.618)' },
];

export const DEFAULT_SCALE_RATIO = 1.25;

/** Type specimen steps — sizes derive from base × ratio^exponent */
export const TYPE_SPECIMEN_STEPS = [
  {
    id: 'display',
    label: 'Display',
    exponent: 6,
    weight: 700,
    role: 'heading',
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
    use: 'Hero headlines',
    sample: 'Build something beautiful',
  },
  {
    id: 'h1',
    label: 'H1',
    exponent: 5,
    weight: 700,
    role: 'heading',
    lineHeight: 1.15,
    letterSpacing: '-0.02em',
    use: 'Page titles',
    sample: 'Your palette, your voice',
  },
  {
    id: 'h2',
    label: 'H2',
    exponent: 4,
    weight: 600,
    role: 'heading',
    lineHeight: 1.2,
    letterSpacing: '-0.01em',
    use: 'Section headings',
    sample: 'Color tells the story',
  },
  {
    id: 'h3',
    label: 'H3',
    exponent: 3,
    weight: 600,
    role: 'heading',
    lineHeight: 1.25,
    letterSpacing: '-0.01em',
    use: 'Subsections',
    sample: 'Chosen with intention',
  },
  {
    id: 'h4',
    label: 'H4',
    exponent: 2,
    weight: 600,
    role: 'heading',
    lineHeight: 1.3,
    letterSpacing: '0',
    use: 'Card titles',
    sample: 'A system that holds together',
  },
  {
    id: 'body-lg',
    label: 'Body LG',
    exponent: 1,
    weight: 400,
    role: 'body',
    lineHeight: 1.6,
    letterSpacing: '0',
    use: 'Lead paragraphs',
    sample: 'The right typeface does more than deliver words — it sets the mood before a single sentence is read.',
  },
  {
    id: 'body',
    label: 'Body',
    exponent: 0,
    weight: 400,
    role: 'body',
    lineHeight: 1.6,
    letterSpacing: '0',
    use: 'Default body copy',
    sample: 'Good typography is invisible. It guides without interrupting, informs without demanding attention.',
  },
  {
    id: 'small',
    label: 'Small',
    exponent: -1,
    weight: 400,
    role: 'body',
    lineHeight: 1.5,
    letterSpacing: '0.01em',
    use: 'Labels, secondary copy',
    sample: 'Use this size for supporting copy, labels, and secondary descriptions.',
  },
  {
    id: 'caption',
    label: 'Caption',
    exponent: -2,
    weight: 500,
    role: 'body',
    lineHeight: 1.4,
    letterSpacing: '0.02em',
    use: 'Timestamps, tags',
    sample: 'Caption text · 12px · Use for timestamps, tags, and helper text',
  },
  {
    id: 'mono',
    label: 'Mono',
    exponent: null,
    fixedPx: 13,
    weight: 400,
    role: 'mono',
    lineHeight: 1.5,
    letterSpacing: '0',
    use: 'Code snippets',
    sample: 'const palette = { primary: "#146EF5", accent: "#FF6B35" }',
  },
];

/** Maps live preview CSS vars to specimen exponents (base × ratio^n) */
export const PREVIEW_TYPE_MAP = [
  { id: 'h1', exponent: 6 },
  { id: 'h2', exponent: 5 },
  { id: 'h3', exponent: 4 },
  { id: 'h4', exponent: 3 },
  { id: 'h5', exponent: 2 },
  { id: 'h6', exponent: 1 },
  { id: 'body', exponent: 0 },
  { id: 'small', exponent: -1 },
  { id: 'caption', exponent: -2 },
];

export function clampScaleRatio(value) {
  const parsed = Number(value);
  const match = SCALE_RATIO_OPTIONS.find((option) => option.value === parsed);
  return match ? match.value : DEFAULT_SCALE_RATIO;
}

export function getPreviewSizePx(exponent, basePx = TYPE_BASE_PX, scaleRatio = DEFAULT_SCALE_RATIO) {
  return Math.round(basePx * scaleRatio ** exponent * 10) / 10;
}
export function getSpecimenSizePx(step, basePx, scaleRatio = DEFAULT_SCALE_RATIO) {
  if (step.fixedPx != null) return step.fixedPx;
  return getPreviewSizePx(step.exponent, basePx, scaleRatio);
}

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

export function buildTypeStyleCss(step, fonts, basePx, scaleRatio) {
  const sizePx = getSpecimenSizePx(step, basePx, scaleRatio);
  const family = step.role === 'mono'
    ? fonts.body.family
    : fonts[step.role === 'heading' ? 'heading' : 'body'].family;
  const weight = step.role === 'heading'
    ? step.weight
    : step.role === 'mono'
      ? step.weight
      : step.weight;

  return [
    `font-family: '${family}', sans-serif`,
    `font-size: ${sizePx}px`,
    `font-weight: ${weight}`,
    `line-height: ${step.lineHeight}`,
    `letter-spacing: ${step.letterSpacing}`,
  ].join('; ');
}

/** Structured type scale for export formats */
export function buildTypeScaleExport(basePx, scaleRatio, fonts) {
  return {
    basePx,
    scaleRatio,
    steps: TYPE_SPECIMEN_STEPS.map((step) => ({
      id: step.id,
      label: step.label,
      sizePx: getSpecimenSizePx(step, basePx, scaleRatio),
      weight: step.weight,
      lineHeight: step.lineHeight,
      letterSpacing: step.letterSpacing,
      role: step.role,
      use: step.use,
      fontFamily: step.role === 'mono'
        ? fonts.body.family
        : fonts[step.role === 'heading' ? 'heading' : 'body'].family,
      css: buildTypeStyleCss(step, fonts, basePx, scaleRatio),
    })),
    previewVars: PREVIEW_TYPE_MAP.map(({ id, exponent }) => ({
      id,
      sizePx: getPreviewSizePx(exponent, basePx, scaleRatio),
    })),
  };
}

/** CSS custom properties for the live preview frame */
export function getPreviewTypeStyle(basePx = TYPE_BASE_PX, scaleRatio = DEFAULT_SCALE_RATIO) {
  const ratioFactor = scaleRatio / DEFAULT_SCALE_RATIO;
  const style = {
    '--preview-type-scale': String((basePx / TYPE_BASE_PX) * ratioFactor),
    '--preview-type-base': `${basePx}px`,
    '--preview-type-ratio': String(scaleRatio),
  };

  PREVIEW_TYPE_MAP.forEach(({ id, exponent }) => {
    style[`--preview-type-${id}`] = `${getPreviewSizePx(exponent, basePx, scaleRatio)}px`;
  });

  return style;
}
