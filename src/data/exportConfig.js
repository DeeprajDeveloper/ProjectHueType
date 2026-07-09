/**
 * Central export configuration — edit labels, token names, and structure here.
 */
import { TYPE_BASE_PX, DEFAULT_SCALE_RATIO } from '../utils/typographyScale';

/** Available type size units in the export panel */
export const EXPORT_TYPE_UNITS = [
  { id: 'px', label: 'px', example: '14px' },
  { id: 'rem', label: 'rem', example: '0.875rem' },
  { id: 'em', label: 'em', example: '1em' },
];

/** Root font size used when converting px → rem (browser default) */
export const EXPORT_REM_ROOT_PX = 16;

/** Available color formats in the export panel */
export const EXPORT_COLOR_FORMATS = [
  { id: 'hex', label: 'HEX', example: '#146EF5' },
  { id: 'rgb', label: 'RGB', example: 'rgb(20, 110, 245)' },
  { id: 'hsl', label: 'HSL', example: 'hsl(220 85% 52%)' },
  { id: 'oklch', label: 'OKLCH', example: 'oklch(55% 0.15 250)' },
];

/** Base palette roles written to every format */
export const EXPORT_BASE_COLOR_ROLES = [
  { id: 'primary', label: 'Primary' },
  { id: 'secondary', label: 'Secondary' },
  { id: 'accent', label: 'Accent' },
  { id: 'background', label: 'Background' },
  { id: 'text', label: 'Text' },
];

/** Generated scales — sourceRole is the combo.colors key used as the 500 step */
export const EXPORT_COLOR_SCALES = [
  { id: 'primary', label: 'Primary scale', sourceRole: 'primary' },
  { id: 'secondary', label: 'Secondary scale', sourceRole: 'secondary' },
  { id: 'accent', label: 'Accent scale', sourceRole: 'accent' },
  { id: 'neutral', label: 'Neutral scale', sourceRole: 'text' },
];

/** Font roles included in exports */
export const EXPORT_FONT_ROLES = [
  { id: 'heading', label: 'Heading' },
  { id: 'body', label: 'Body' },
];

/** CSS-specific naming */
export const EXPORT_CSS_CONFIG = {
  rootSelector: ':root',
  fontFallback: 'sans-serif',
  colorVarPrefix: '--color',
  fontVarPrefix: '--font',
  typeVarPrefix: '--type',
  previewTypeVarPrefix: '--preview-type',
  sections: {
    baseColors: 'Base colors',
    scales: 'Color scales',
    typeScale: 'Type scale',
    previewType: 'Preview type sizes (mockup CSS vars)',
    typography: 'Typography',
  },
};

/** SCSS-specific naming */
export const EXPORT_SCSS_CONFIG = {
  fontFallback: 'sans-serif',
  colorVarPrefix: '$color',
  fontVarPrefix: '$font',
  typeVarPrefix: '$type',
  sections: {
    baseColors: 'Base colors',
    scales: 'Color scales',
    typeScale: 'Type scale',
    typography: 'Typography',
  },
};

/** Tailwind-specific naming */
export const EXPORT_TAILWIND_CONFIG = {
  backgroundKey: 'background',
  foregroundKey: 'foreground',
  fontFamilyKeys: {
    heading: 'heading',
    body: 'body',
  },
};

/** Design token paths */
export const EXPORT_TOKEN_CONFIG = {
  schema: 'https://design-tokens.github.io/community-group/format/',
  colorType: 'color',
  fontFamilyType: 'fontFamily',
  fontWeightType: 'fontWeight',
  fontSizeType: 'dimension',
  lineHeightType: 'number',
  letterSpacingType: 'dimension',
};

/** Figma tokens export */
export const EXPORT_FIGMA_CONFIG = {
  collections: {
    primary: 'HueType/Colors',
    accent: 'HueType/Accent',
  },
  importNote: 'Import via Figma Tokens or Tokens Studio plugin',
};

/** Default export panel options */
export const EXPORT_DEFAULTS = {
  colorFormat: 'hex',
  typeUnit: 'px',
  typeBasePx: TYPE_BASE_PX,
  typeScaleRatio: DEFAULT_SCALE_RATIO,
  remRootPx: EXPORT_REM_ROOT_PX,
};

export function resolveExportOptions(options = {}) {
  return {
    ...EXPORT_DEFAULTS,
    ...options,
  };
}
