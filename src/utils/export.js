/**
 * Export utilities (FR8)
 */

import {
  EXPORT_BASE_COLOR_ROLES,
  EXPORT_COLOR_SCALES,
  EXPORT_CSS_CONFIG,
  EXPORT_DEFAULTS,
  EXPORT_FIGMA_CONFIG,
  EXPORT_FONT_ROLES,
  EXPORT_SCSS_CONFIG,
  EXPORT_TAILWIND_CONFIG,
  EXPORT_TOKEN_CONFIG,
  resolveExportOptions,
} from '../data/exportConfig';
import { generateComboScales } from './colorScale';
import {
  formatColorValue,
  mapColorRecord,
  mapScaleRecord,
} from './colorFormat';
import { formatTypeSize } from './typeFormat';
import { buildTypeScaleExport } from './typographyScale';

function enrichTypeScale(typeScale, formatTypeSizeFn) {
  return {
    ...typeScale,
    base: formatTypeSizeFn(typeScale.basePx),
    steps: typeScale.steps.map((step) => ({
      ...step,
      size: formatTypeSizeFn(step.sizePx),
    })),
    previewVars: typeScale.previewVars.map((item) => ({
      ...item,
      size: formatTypeSizeFn(item.sizePx),
    })),
  };
}

function createExportContext(combo, options = {}) {
  const resolved = resolveExportOptions(options);
  const { colorFormat, typeBasePx, typeScaleRatio, typeUnit, remRootPx } = resolved;
  const formatColor = (hex) => formatColorValue(hex, colorFormat);
  const formatTypeSizeFn = (sizePx) => formatTypeSize(sizePx, typeUnit, { typeBasePx, remRootPx });
  const rawScales = generateComboScales(combo.colors);
  const rawTypeScale = buildTypeScaleExport(typeBasePx, typeScaleRatio, combo.fonts);

  return {
    combo,
    options: resolved,
    formatColor,
    formatTypeSize: formatTypeSizeFn,
    colors: mapColorRecord(combo.colors, formatColor),
    scales: mapScaleRecord(rawScales, formatColor),
    typeScale: enrichTypeScale(rawTypeScale, formatTypeSizeFn),
  };
}

function formatScaleBlockCss(scaleName, scale, indent = '  ') {
  const prefix = EXPORT_CSS_CONFIG.colorVarPrefix;
  return Object.entries(scale)
    .map(([step, value]) => `${indent}${prefix}-${scaleName}-${step}: ${value};`)
    .join('\n');
}

function formatTypeScaleCss(ctx) {
  const { typeVarPrefix, previewTypeVarPrefix, fontFallback } = EXPORT_CSS_CONFIG;
  const { typeScale } = ctx;
  const lines = [
    `  ${typeVarPrefix}-base: ${typeScale.base};`,
    `  ${typeVarPrefix}-ratio: ${typeScale.scaleRatio};`,
    ...typeScale.steps.map(
      (step) => `  ${typeVarPrefix}-${step.id}-size: ${step.size};`,
    ),
    ...typeScale.steps.map(
      (step) => `  ${typeVarPrefix}-${step.id}-weight: ${step.weight};`,
    ),
    ...typeScale.steps.map(
      (step) => `  ${typeVarPrefix}-${step.id}-line-height: ${step.lineHeight};`,
    ),
    ...typeScale.steps.map(
      (step) => `  ${typeVarPrefix}-${step.id}-letter-spacing: ${step.letterSpacing};`,
    ),
    ...typeScale.steps.map(
      (step) => `  ${typeVarPrefix}-${step.id}-font: '${step.fontFamily}', ${fontFallback};`,
    ),
    ...typeScale.previewVars.map(
      (item) => `  ${previewTypeVarPrefix}-${item.id}: ${item.size};`,
    ),
  ];
  return lines.join('\n');
}

function formatFontBlockCss(ctx) {
  const { fontVarPrefix, fontFallback } = EXPORT_CSS_CONFIG;
  const { combo } = ctx;
  return EXPORT_FONT_ROLES.map((role) => [
    `  ${fontVarPrefix}-${role.id}: '${combo.fonts[role.id].family}', ${fontFallback};`,
    `  ${fontVarPrefix}-${role.id}-weight: ${combo.fonts[role.id].weight};`,
  ].join('\n')).join('\n');
}

export function toCssVariables(combo, options = EXPORT_DEFAULTS) {
  const ctx = createExportContext(combo, options);
  const { rootSelector, sections, colorVarPrefix } = EXPORT_CSS_CONFIG;

  const baseColorLines = EXPORT_BASE_COLOR_ROLES
    .map((role) => `  ${colorVarPrefix}-${role.id}: ${ctx.colors[role.id]};`)
    .join('\n');

  const scaleBlocks = EXPORT_COLOR_SCALES
    .map((scale) => `  /* ${scale.label} */\n${formatScaleBlockCss(scale.id, ctx.scales[scale.id])}`)
    .join('\n\n');

  return `${rootSelector} {
  /* ${sections.baseColors} */
${baseColorLines}

${scaleBlocks}

  /* ${sections.typeScale} — base ${ctx.typeScale.base}, ratio ${ctx.typeScale.scaleRatio} */
${formatTypeScaleCss(ctx)}

  /* ${sections.typography} */
${formatFontBlockCss(ctx)}
}`;
}

export function toScssVariables(combo, options = EXPORT_DEFAULTS) {
  const ctx = createExportContext(combo, options);
  const { fontFallback, colorVarPrefix, typeVarPrefix, sections } = EXPORT_SCSS_CONFIG;

  const baseLines = EXPORT_BASE_COLOR_ROLES
    .map((role) => `${colorVarPrefix}-${role.id}: ${ctx.colors[role.id]};`)
    .join('\n');

  const scaleMaps = EXPORT_COLOR_SCALES
    .map((scale) => `$${scale.id}: (
${Object.entries(ctx.scales[scale.id]).map(([k, v]) => `  ${k}: ${v},`).join('\n')}
);`)
    .join('\n\n');

  const typeLines = [
    `${typeVarPrefix}-base: ${ctx.typeScale.base};`,
    `${typeVarPrefix}-ratio: ${ctx.typeScale.scaleRatio};`,
    ...ctx.typeScale.steps.map((step) => `${typeVarPrefix}-${step.id}-size: ${step.size};`),
    ...ctx.typeScale.steps.map((step) => `${typeVarPrefix}-${step.id}-weight: ${step.weight};`),
    ...ctx.typeScale.steps.map((step) => `${typeVarPrefix}-${step.id}-line-height: ${step.lineHeight};`),
    ...ctx.typeScale.steps.map((step) => `${typeVarPrefix}-${step.id}-letter-spacing: ${step.letterSpacing};`),
  ].join('\n');

  const fontLines = EXPORT_FONT_ROLES
    .map((role) => [
      `$font-${role.id}: '${ctx.combo.fonts[role.id].family}', ${fontFallback};`,
      `$font-${role.id}-weight: ${ctx.combo.fonts[role.id].weight};`,
    ].join('\n'))
    .join('\n');

  return `// SCSS Variables — ${combo.name}

// ${sections.baseColors}
${baseLines}

// ${sections.scales}
${scaleMaps}

// ${sections.typeScale}
${typeLines}

// ${sections.typography}
${fontLines}`;
}

export function toTailwindConfig(combo, options = EXPORT_DEFAULTS) {
  const ctx = createExportContext(combo, options);
  const { backgroundKey, foregroundKey, fontFamilyKeys } = EXPORT_TAILWIND_CONFIG;

  const scaleToTailwind = (scale) =>
    Object.entries(scale)
      .map(([step, value]) => `          ${step}: '${value}',`)
      .join('\n');

  const colorScales = EXPORT_COLOR_SCALES
    .map((scale) => `        ${scale.id}: {
${scaleToTailwind(ctx.scales[scale.id])}
        },`)
    .join('\n');

  const typeScale = ctx.typeScale.steps
    .map((step) => `          '${step.id}': ['${step.size}', { lineHeight: '${step.lineHeight}', letterSpacing: '${step.letterSpacing}' }],`)
    .join('\n');

  return `// tailwind.config.js — extend theme
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
${colorScales}
        ${backgroundKey}: '${ctx.colors.background}',
        ${foregroundKey}: '${ctx.colors.text}',
      },
      fontSize: {
${typeScale}
      },
      fontFamily: {
        ${fontFamilyKeys.heading}: ['${combo.fonts.heading.family}', 'sans-serif'],
        ${fontFamilyKeys.body}: ['${combo.fonts.body.family}', 'sans-serif'],
      },
    },
  },
};`;
}

export function toJson(combo, options = EXPORT_DEFAULTS) {
  const ctx = createExportContext(combo, options);

  return JSON.stringify(
    {
      name: combo.name,
      colorFormat: ctx.options.colorFormat,
      typeUnit: ctx.options.typeUnit,
      colors: ctx.colors,
      scales: ctx.scales,
      typeScale: ctx.typeScale,
      fonts: {
        heading: {
          family: combo.fonts.heading.family,
          weight: combo.fonts.heading.weight,
        },
        body: {
          family: combo.fonts.body.family,
          weight: combo.fonts.body.weight,
        },
      },
      meta: {
        mood: combo.mood,
        industry: combo.industry,
        inspiredBy: combo.inspiredBy,
      },
    },
    null,
    2,
  );
}

export function toDesignTokens(combo, options = EXPORT_DEFAULTS) {
  const ctx = createExportContext(combo, options);
  const { schema, colorType, fontFamilyType, fontWeightType, fontSizeType, lineHeightType, letterSpacingType } = EXPORT_TOKEN_CONFIG;

  const scaleTokens = (scaleId) => Object.fromEntries(
    Object.entries(ctx.scales[scaleId]).map(([k, v]) => [k, { $value: v, $type: colorType }]),
  );

  const typeTokens = Object.fromEntries(
    ctx.typeScale.steps.map((step) => [
      step.id,
      {
        size: { $value: step.size, $type: fontSizeType },
        weight: { $value: step.weight, $type: fontWeightType },
        lineHeight: { $value: step.lineHeight, $type: lineHeightType },
        letterSpacing: { $value: step.letterSpacing, $type: letterSpacingType },
        fontFamily: { $value: step.fontFamily, $type: fontFamilyType },
      },
    ]),
  );

  const tokens = {
    $schema: schema,
    color: {
      ...Object.fromEntries(
        EXPORT_COLOR_SCALES.map((scale) => [scale.id, scaleTokens(scale.id)]),
      ),
      background: { $value: ctx.colors.background, $type: colorType },
      text: { $value: ctx.colors.text, $type: colorType },
    },
    type: {
      base: { $value: ctx.typeScale.base, $type: fontSizeType },
      ratio: { $value: ctx.typeScale.scaleRatio, $type: 'number' },
      ...typeTokens,
    },
    font: Object.fromEntries(
      EXPORT_FONT_ROLES.map((role) => [
        role.id,
        {
          family: { $value: combo.fonts[role.id].family, $type: fontFamilyType },
          weight: { $value: combo.fonts[role.id].weight, $type: fontWeightType },
        },
      ]),
    ),
  };

  return JSON.stringify(tokens, null, 2);
}

export function toStyleDictionary(combo, options = EXPORT_DEFAULTS) {
  const ctx = createExportContext(combo, options);
  const tokens = {};

  EXPORT_COLOR_SCALES.forEach((scale) => {
    Object.entries(ctx.scales[scale.id]).forEach(([step, value]) => {
      tokens[`color.${scale.id}.${step}`] = { value };
    });
  });

  tokens['color.background'] = { value: ctx.colors.background };
  tokens['color.text'] = { value: ctx.colors.text };

  ctx.typeScale.steps.forEach((step) => {
    tokens[`type.${step.id}.size`] = { value: step.size };
    tokens[`type.${step.id}.weight`] = { value: step.weight };
    tokens[`type.${step.id}.lineHeight`] = { value: step.lineHeight };
    tokens[`type.${step.id}.letterSpacing`] = { value: step.letterSpacing };
    tokens[`type.${step.id}.fontFamily`] = { value: step.fontFamily };
  });

  tokens['type.base'] = { value: ctx.typeScale.base };
  tokens['type.ratio'] = { value: ctx.typeScale.scaleRatio };

  EXPORT_FONT_ROLES.forEach((role) => {
    tokens[`font.${role.id}.family`] = { value: combo.fonts[role.id].family };
    tokens[`font.${role.id}.weight`] = { value: combo.fonts[role.id].weight };
  });

  return JSON.stringify(tokens, null, 2);
}

export function toCssModules(combo, options = EXPORT_DEFAULTS) {
  const ctx = createExportContext(combo, options);
  const lines = [
    '/* CSS Modules / JS import */',
    ...Object.entries(ctx.scales.primary).map(([k, v]) => `export const primary${k} = '${v}';`),
    ...Object.entries(ctx.scales.accent).map(([k, v]) => `export const accent${k} = '${v}';`),
    `export const background = '${ctx.colors.background}';`,
    `export const text = '${ctx.colors.text}';`,
    `export const fontHeading = '${combo.fonts.heading.family}';`,
    `export const fontBody = '${combo.fonts.body.family}';`,
    ...ctx.typeScale.steps.map((step) => `export const type${step.id.replace(/-/g, '')}Size = '${step.size}';`),
  ];

  return lines.join('\n');
}

export function toFigmaTokens(combo, options = EXPORT_DEFAULTS) {
  const ctx = createExportContext(combo, options);
  const { collections, importNote } = EXPORT_FIGMA_CONFIG;

  const collectionsData = {
    [collections.primary]: Object.entries(ctx.scales.primary).reduce((acc, [step, value]) => {
      acc[`primary/${step}`] = value;
      return acc;
    }, {}),
    [collections.accent]: Object.entries(ctx.scales.accent).reduce((acc, [step, value]) => {
      acc[`accent/${step}`] = value;
      return acc;
    }, {}),
  };

  return JSON.stringify({
    name: combo.name,
    colorFormat: ctx.options.colorFormat,
    typeUnit: ctx.options.typeUnit,
    collections: collectionsData,
    typography: {
      heading: combo.fonts.heading.family,
      body: combo.fonts.body.family,
    },
    typeScale: ctx.typeScale,
    note: importNote,
  }, null, 2);
}

export const EXPORT_FORMATS = [
  {
    id: 'css',
    label: 'CSS Variables',
    description: 'Drop-in :root custom properties with color scales and type scale.',
    extension: 'css',
    mimeType: 'text/css',
    fn: toCssVariables,
  },
  {
    id: 'scss',
    label: 'SCSS',
    description: 'Sass variables, scale maps, and type scale tokens.',
    extension: 'scss',
    mimeType: 'text/plain',
    fn: toScssVariables,
  },
  {
    id: 'tailwind',
    label: 'Tailwind',
    description: 'theme.extend snippet with colors, font sizes, and families.',
    extension: 'js',
    mimeType: 'text/javascript',
    fn: toTailwindConfig,
  },
  {
    id: 'json',
    label: 'JSON',
    description: 'Structured combo data with scales, type scale, and metadata.',
    extension: 'json',
    mimeType: 'application/json',
    fn: toJson,
  },
  {
    id: 'tokens',
    label: 'Design Tokens',
    description: 'W3C design token format for token tools.',
    extension: 'json',
    mimeType: 'application/json',
    fn: toDesignTokens,
  },
  {
    id: 'style-dictionary',
    label: 'Style Dictionary',
    description: 'Amazon Style Dictionary token JSON.',
    extension: 'json',
    mimeType: 'application/json',
    fn: toStyleDictionary,
  },
  {
    id: 'css-modules',
    label: 'CSS Modules',
    description: 'Named JS exports for CSS Modules projects.',
    extension: 'js',
    mimeType: 'text/javascript',
    fn: toCssModules,
  },
  {
    id: 'figma',
    label: 'Figma Tokens',
    description: 'Collections JSON for Tokens Studio / Figma.',
    extension: 'json',
    mimeType: 'application/json',
    fn: toFigmaTokens,
  },
];

export { EXPORT_COLOR_FORMATS, EXPORT_TYPE_UNITS, EXPORT_DEFAULTS, resolveExportOptions } from '../data/exportConfig';

function slugifyComboName(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'combo';
}

export function generateExportContent(combo, formatId, options = EXPORT_DEFAULTS) {
  const format = EXPORT_FORMATS.find((entry) => entry.id === formatId) || EXPORT_FORMATS[0];
  return format.fn(combo, resolveExportOptions(options));
}

export function getExportFilename(combo, format) {
  const slug = slugifyComboName(combo.name);
  return `${slug}.${format.extension}`;
}

export function downloadExportFile(content, filename, mimeType = 'text/plain') {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
