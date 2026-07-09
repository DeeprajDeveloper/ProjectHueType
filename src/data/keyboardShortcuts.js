/**
 * Keyboard shortcut definitions for app navigation and preview devices.
 * Alt/Option avoids conflicts with typing and browser defaults.
 */

import { formatShortcutLabel } from '../utils/keyboard';

export const NAV_PANEL_SHORTCUTS = [
  { id: 'workspace', label: 'My Workspace', shortcut: { alt: true, code: 'Digit1' } },
  { id: 'saved', label: 'My Presets', shortcut: { alt: true, code: 'Digit2' } },
  { id: 'colors', label: 'Colors', shortcut: { alt: true, code: 'Digit3' } },
  { id: 'fonts', label: 'Fonts', shortcut: { alt: true, code: 'Digit4' } },
  { id: 'preview-edit', label: 'Edit prototype', shortcut: { alt: true, code: 'Digit5' } },
  { id: 'preview-sections', label: 'Toggle prototype sections', shortcut: { alt: true, code: 'Digit0' } },
  { id: 'archetypes', label: 'Prototype layouts', shortcut: { alt: true, code: 'Digit6' } },
  { id: 'info', label: 'WCAG contrast', shortcut: { alt: true, code: 'Digit7' } },
  { id: 'build-info', label: 'Build Info', shortcut: { alt: true, code: 'Digit8' } },
  { id: 'feature-catalog', label: 'Feature Catalog', shortcut: { alt: true, code: 'Digit9' } },
  { id: 'help', label: 'Help & shortcuts', shortcut: { key: '?' } },
];

export const PREVIEW_DEVICE_SHORTCUTS = [
  { id: 'desktop', label: 'Desktop preview', shortcut: { alt: true, code: 'KeyD' } },
  { id: 'tablet', label: 'Tablet preview', shortcut: { alt: true, code: 'KeyT' } },
  { id: 'mobile', label: 'Mobile preview', shortcut: { alt: true, code: 'KeyM' } },
];

export const INSPECTOR_SHORTCUT = {
  label: 'Toggle style inspector',
  shortcut: { code: 'KeyI' },
};

export const SHUFFLE_SHORTCUT = {
  label: 'Shuffle unlocked roles',
  shortcut: { code: 'Space' },
};

export const SHORTCUT_SECTIONS = [
  {
    id: 'actions',
    title: 'Actions',
    items: [SHUFFLE_SHORTCUT, INSPECTOR_SHORTCUT],
  },
  {
    id: 'navigation',
    title: 'Panels',
    items: NAV_PANEL_SHORTCUTS,
  },
  {
    id: 'devices',
    title: 'Preview devices',
    items: PREVIEW_DEVICE_SHORTCUTS,
  },
];

export function getShortcutReference() {
  return SHORTCUT_SECTIONS.flatMap((section) =>
    section.items.map((item) => ({
      section: section.title,
      action: item.label,
      keys: formatShortcutLabel(item.shortcut),
    })),
  );
}

export const NAV_SHORTCUT_BY_ID = Object.fromEntries(
  NAV_PANEL_SHORTCUTS.map((item) => [item.id, item]),
);

export const DEVICE_SHORTCUT_BY_ID = Object.fromEntries(
  PREVIEW_DEVICE_SHORTCUTS.map((item) => [item.id, item]),
);
