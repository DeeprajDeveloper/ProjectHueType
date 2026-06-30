/**
 * Shareable URL state encoding (FR9)
 */

import { COMBOS } from '../data/combos';

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
      locks: payload.locks || {},
    };
  } catch {
    return null;
  }
}

export function syncUrlState(combo, locks) {
  const encoded = encodeComboState(combo, locks);
  const url = new URL(window.location.href);
  url.searchParams.set('combo', encoded);
  window.history.replaceState({}, '', url.toString());
}

export function readUrlState() {
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get('combo');
  if (!encoded) return null;
  return decodeComboState(encoded);
}

export function getShareUrl(combo, locks) {
  const encoded = encodeComboState(combo, locks);
  const url = new URL(window.location.href);
  url.searchParams.set('combo', encoded);
  return url.toString();
}
