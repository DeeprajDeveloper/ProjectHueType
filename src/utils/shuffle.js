/**
 * Constrained shuffle with per-role locks (FR5)
 */

import { COMBOS, GOOGLE_FONTS } from '../data/combos';

function pickRandom(arr, exclude) {
  const filtered = exclude ? arr.filter((item) => item !== exclude) : arr;
  return filtered[Math.floor(Math.random() * filtered.length)];
}

function randomHex() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

export function shuffleCombo(currentCombo, locks = {}) {
  const randomCombo = pickRandom(COMBOS, currentCombo.id);
  const result = structuredClone(currentCombo);

  const colorRoles = ['primary', 'secondary', 'accent', 'background', 'text'];
  colorRoles.forEach((role) => {
    if (!locks[`color-${role}`]) {
      result.colors[role] = randomCombo.colors[role];
    }
  });

  if (!locks['font-heading']) {
    const font = pickRandom(GOOGLE_FONTS, result.fonts.heading.family);
    result.fonts.heading = {
      ...result.fonts.heading,
      family: font,
      googleId: font.replace(/ /g, '+'),
    };
  }

  if (!locks['font-body']) {
    const font = pickRandom(GOOGLE_FONTS, result.fonts.body.family);
    result.fonts.body = {
      ...result.fonts.body,
      family: font,
      googleId: font.replace(/ /g, '+'),
    };
  }

  return result;
}

export function createDefaultLocks() {
  return {
    'color-primary': false,
    'color-secondary': false,
    'color-accent': false,
    'color-background': false,
    'color-text': false,
    'font-heading': false,
    'font-body': false,
  };
}

export function updateComboColor(combo, role, value) {
  return {
    ...combo,
    colors: { ...combo.colors, [role]: value },
  };
}

export function updateComboFont(combo, role, family) {
  return {
    ...combo,
    fonts: {
      ...combo.fonts,
      [role]: {
        ...combo.fonts[role],
        family,
        googleId: family.replace(/ /g, '+'),
      },
    },
  };
}
