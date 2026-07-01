/**
 * Shareable URL state encoding (FR9)
 */

import { COMBOS } from '../data/combos';
import { createDefaultLocks } from './shuffle';

export const DEFAULT_COMBO_ID = COMBOS[0]?.id ?? 'modern-saas-blue';

function encodeComboState(combo, locks) {
  const payload = {
    id: combo.id,
    colors: combo.colors,
    fonts: {
      heading: combo.fonts.heading.family,
      body: combo.fonts.body.family,
    },
    locks,
  };
  return btoa(JSON.stringify(payload));
}

function decodeComboState(encoded) {
  try {
    const payload = JSON.parse(atob(encoded));
    const base = COMBOS.find((c) => c.id === payload.id) || COMBOS[0];
    return {
      combo: {
        ...base,
        colors: payload.colors || base.colors,
        fonts: {
          heading: {
            ...base.fonts.heading,
            family: payload.fonts?.heading || base.fonts.heading.family,
          },
          body: {
            ...base.fonts.body,
            family: payload.fonts?.body || base.fonts.body.family,
          },
        },
      },
      locks: payload.locks || createDefaultLocks(),
    };
  } catch {
    return null;
  }
}

function isPresetId(value) {
  return Boolean(value && COMBOS.some((combo) => combo.id === value));
}

function locksMatch(a, b) {
  const keys = Object.keys(createDefaultLocks());
  return keys.every((key) => Boolean(a?.[key]) === Boolean(b?.[key]));
}

export function isUnmodifiedPreset(combo, locks) {
  const base = COMBOS.find((c) => c.id === combo.id);
  if (!base) return false;
  if (!locksMatch(locks, createDefaultLocks())) return false;

  const colorsMatch = Object.keys(base.colors).every(
    (role) => combo.colors[role] === base.colors[role],
  );
  if (!colorsMatch) return false;

  return (
    combo.fonts.heading.family === base.fonts.heading.family
    && combo.fonts.body.family === base.fonts.body.family
  );
}

export function isDefaultAppState(combo, locks) {
  return combo.id === DEFAULT_COMBO_ID && isUnmodifiedPreset(combo, locks);
}

export function syncUrlState(combo, locks) {
  const url = new URL(window.location.href);

  if (isDefaultAppState(combo, locks)) {
    url.searchParams.delete('combo');
  } else if (isUnmodifiedPreset(combo, locks)) {
    url.searchParams.set('combo', combo.id);
  } else {
    url.searchParams.set('combo', encodeComboState(combo, locks));
  }

  const next = url.toString();
  if (next !== window.location.href) {
    window.history.replaceState({}, '', next);
  }
}

export function readUrlState() {
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get('combo');
  if (!encoded) return null;

  if (isPresetId(encoded)) {
    const base = COMBOS.find((c) => c.id === encoded);
    return {
      combo: structuredClone(base),
      locks: createDefaultLocks(),
    };
  }

  return decodeComboState(encoded);
}

export function getShareUrl(combo, locks) {
  const url = new URL(window.location.href);

  if (isUnmodifiedPreset(combo, locks)) {
    url.searchParams.set('combo', combo.id);
  } else {
    url.searchParams.set('combo', encodeComboState(combo, locks));
  }

  return url.toString();
}
