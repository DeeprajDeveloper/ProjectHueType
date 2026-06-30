/**
 * Export utilities (FR8)
 */

import { generateComboScales } from './colorScale';

function formatScaleBlock(name, scale, indent = '  ') {
  return Object.entries(scale)
    .map(([step, hex]) => `${indent}--color-${name}-${step}: ${hex};`)
    .join('\n');
}

export function toCssVariables(combo) {
  const { colors, fonts } = combo;
  const scales = generateComboScales(colors);

  return `:root {
  /* Base colors */
  --color-primary: ${colors.primary};
  --color-secondary: ${colors.secondary};
  --color-accent: ${colors.accent};
  --color-background: ${colors.background};
  --color-text: ${colors.text};

  /* Primary scale */
${formatScaleBlock('primary', scales.primary)}

  /* Secondary scale */
${formatScaleBlock('secondary', scales.secondary)}

  /* Accent scale */
${formatScaleBlock('accent', scales.accent)}

  /* Neutral scale */
${formatScaleBlock('neutral', scales.neutral)}

  /* Typography */
  --font-heading: '${fonts.heading.family}', sans-serif;
  --font-body: '${fonts.body.family}', sans-serif;
  --font-heading-weight: ${fonts.heading.weight};
  --font-body-weight: ${fonts.body.weight};
}`;
}

export function toScssVariables(combo) {
  const { colors, fonts } = combo;
  const scales = generateComboScales(colors);

  return `// SCSS Variables — ${combo.name}

// Base colors
$color-primary: ${colors.primary};
$color-secondary: ${colors.secondary};
$color-accent: ${colors.accent};
$color-background: ${colors.background};
$color-text: ${colors.text};

// Primary scale
$primary: (
${Object.entries(scales.primary).map(([k, v]) => `  ${k}: ${v},`).join('\n')}
);

// Secondary scale
$secondary: (
${Object.entries(scales.secondary).map(([k, v]) => `  ${k}: ${v},`).join('\n')}
);

// Accent scale
$accent: (
${Object.entries(scales.accent).map(([k, v]) => `  ${k}: ${v},`).join('\n')}
);

// Neutral scale
$neutral: (
${Object.entries(scales.neutral).map(([k, v]) => `  ${k}: ${v},`).join('\n')}
);

// Typography
$font-heading: '${fonts.heading.family}', sans-serif;
$font-body: '${fonts.body.family}', sans-serif;
$font-heading-weight: ${fonts.heading.weight};
$font-body-weight: ${fonts.body.weight};`;
}

export function toTailwindConfig(combo) {
  const { colors, fonts } = combo;
  const scales = generateComboScales(colors);

  const scaleToTailwind = (name, scale) =>
    Object.entries(scale)
      .map(([step, hex]) => `          ${step}: '${hex}',`)
      .join('\n');

  return `// tailwind.config.js — extend theme
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
${scaleToTailwind('primary', scales.primary)}
        },
        secondary: {
${scaleToTailwind('secondary', scales.secondary)}
        },
        accent: {
${scaleToTailwind('accent', scales.accent)}
        },
        neutral: {
${scaleToTailwind('neutral', scales.neutral)}
        },
        background: '${colors.background}',
        foreground: '${colors.text}',
      },
      fontFamily: {
        heading: ['${fonts.heading.family}', 'sans-serif'],
        body: ['${fonts.body.family}', 'sans-serif'],
      },
    },
  },
};`;
}

export function toJson(combo) {
  const scales = generateComboScales(combo.colors);
  return JSON.stringify(
    {
      name: combo.name,
      colors: combo.colors,
      scales,
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

export function toDesignTokens(combo) {
  const { colors, fonts } = combo;
  const scales = generateComboScales(colors);

  const tokens = {
    $schema: 'https://design-tokens.github.io/community-group/format/',
    color: {
      primary: Object.fromEntries(
        Object.entries(scales.primary).map(([k, v]) => [k, { $value: v, $type: 'color' }]),
      ),
      secondary: Object.fromEntries(
        Object.entries(scales.secondary).map(([k, v]) => [k, { $value: v, $type: 'color' }]),
      ),
      accent: Object.fromEntries(
        Object.entries(scales.accent).map(([k, v]) => [k, { $value: v, $type: 'color' }]),
      ),
      neutral: Object.fromEntries(
        Object.entries(scales.neutral).map(([k, v]) => [k, { $value: v, $type: 'color' }]),
      ),
      background: { $value: colors.background, $type: 'color' },
      text: { $value: colors.text, $type: 'color' },
    },
    font: {
      heading: {
        family: { $value: fonts.heading.family, $type: 'fontFamily' },
        weight: { $value: fonts.heading.weight, $type: 'fontWeight' },
      },
      body: {
        family: { $value: fonts.body.family, $type: 'fontFamily' },
        weight: { $value: fonts.body.weight, $type: 'fontWeight' },
      },
    },
  };

  return JSON.stringify(tokens, null, 2);
}

export function toStyleDictionary(combo) {
  const { colors, fonts } = combo;
  const scales = generateComboScales(colors);

  const tokens = {};

  Object.entries(scales.primary).forEach(([step, hex]) => {
    tokens[`color.primary.${step}`] = { value: hex };
  });
  Object.entries(scales.secondary).forEach(([step, hex]) => {
    tokens[`color.secondary.${step}`] = { value: hex };
  });
  Object.entries(scales.accent).forEach(([step, hex]) => {
    tokens[`color.accent.${step}`] = { value: hex };
  });
  Object.entries(scales.neutral).forEach(([step, hex]) => {
    tokens[`color.neutral.${step}`] = { value: hex };
  });

  tokens['color.background'] = { value: colors.background };
  tokens['color.text'] = { value: colors.text };
  tokens['font.heading.family'] = { value: fonts.heading.family };
  tokens['font.heading.weight'] = { value: fonts.heading.weight };
  tokens['font.body.family'] = { value: fonts.body.family };
  tokens['font.body.weight'] = { value: fonts.body.weight };

  return JSON.stringify(tokens, null, 2);
}

export function toCssModules(combo) {
  const { colors, fonts } = combo;
  const scales = generateComboScales(colors);

  const lines = [
    '/* CSS Modules / JS import */',
    ...Object.entries(scales.primary).map(([k, v]) => `export const primary${k} = '${v}';`),
    ...Object.entries(scales.accent).map(([k, v]) => `export const accent${k} = '${v}';`),
    `export const background = '${colors.background}';`,
    `export const text = '${colors.text}';`,
    `export const fontHeading = '${fonts.heading.family}';`,
    `export const fontBody = '${fonts.body.family}';`,
  ];

  return lines.join('\n');
}

export function toOklch(combo) {
  const { colors, fonts } = combo;
  const scales = generateComboScales(colors);

  return `:root {
  /* OKLCH approximations — use for modern browsers */
  /* Base */
  --color-primary: ${colors.primary};
  --color-background: ${colors.background};
  --color-text: ${colors.text};

  /* Primary scale (hex fallback included) */
${Object.entries(scales.primary).map(([step, hex]) => `  --color-primary-${step}: ${hex};`).join('\n')}

  /* Accent scale */
${Object.entries(scales.accent).map(([step, hex]) => `  --color-accent-${step}: ${hex};`).join('\n')}

  /* Typography */
  --font-heading: '${fonts.heading.family}', sans-serif;
  --font-body: '${fonts.body.family}', sans-serif;
}`;
}

export function toFigmaTokens(combo) {
  const scales = generateComboScales(combo.colors);

  const collections = {
    'HueType/Colors': Object.entries(scales.primary).reduce((acc, [step, hex]) => {
      acc[`primary/${step}`] = hex;
      return acc;
    }, {}),
    'HueType/Accent': Object.entries(scales.accent).reduce((acc, [step, hex]) => {
      acc[`accent/${step}`] = hex;
      return acc;
    }, {}),
  };

  return JSON.stringify({
    name: combo.name,
    collections,
    typography: {
      heading: combo.fonts.heading.family,
      body: combo.fonts.body.family,
    },
    note: 'Import via Figma Tokens or Tokens Studio plugin',
  }, null, 2);
}

export const EXPORT_FORMATS = [
  { id: 'css', label: 'CSS Variables', fn: toCssVariables },
  { id: 'scss', label: 'SCSS', fn: toScssVariables },
  { id: 'tailwind', label: 'Tailwind', fn: toTailwindConfig },
  { id: 'json', label: 'JSON', fn: toJson },
  { id: 'tokens', label: 'Design Tokens', fn: toDesignTokens },
  { id: 'style-dictionary', label: 'Style Dictionary', fn: toStyleDictionary },
  { id: 'css-modules', label: 'CSS Modules', fn: toCssModules },
  { id: 'figma', label: 'Figma Tokens', fn: toFigmaTokens },
];
