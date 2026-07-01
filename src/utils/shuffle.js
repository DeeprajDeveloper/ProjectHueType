/**
 * Constrained shuffle with per-role locks (FR5)
 */

import { COMBOS } from '../data/combos';

function pickRandom(arr, exclude) {
  const filtered = exclude ? arr.filter((item) => item !== exclude) : arr;
  return filtered[Math.floor(Math.random() * filtered.length)];
}

function randomHex() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

export function shuffleCombo(currentCombo, locks = {}) {
  const randomCombo = pickRandom(COMBOS, currentCombo.id);
  const result = structuredClone(randomCombo);

  const colorRoles = ['primary', 'secondary', 'accent', 'background', 'text'];
  colorRoles.forEach((role) => {
    if (locks[`color-${role}`]) {
      result.colors[role] = currentCombo.colors[role];
    }
  });

  if (locks['font-heading']) {
    result.fonts.heading = structuredClone(currentCombo.fonts.heading);
  }

  if (locks['font-body']) {
    result.fonts.body = structuredClone(currentCombo.fonts.body);
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
