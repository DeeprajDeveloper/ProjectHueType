import {
  PaletteIcon,
  BookmarkSimpleIcon,
  DropIcon,
  TextAaIcon,
  GearIcon,
  LayoutIcon,
  FlaskIcon,
} from '@phosphor-icons/react';

export const TOP_NAV_ITEMS = [
  { id: 'workspace', label: 'My Workspace', icon: PaletteIcon },
  { id: 'saved', label: 'My Presets', icon: BookmarkSimpleIcon },
  { id: 'colors', label: 'Colors', icon: DropIcon },
  { id: 'fonts', label: 'Fonts', icon: TextAaIcon },
];

export const PROTOTYPE_NAV_ITEMS = [
  { id: 'preview-settings', label: 'Options', icon: GearIcon },
  { id: 'archetypes', label: 'Layouts', icon: LayoutIcon },
];

export const PROTOTYPE_GROUP = {
  id: 'prototypes',
  label: 'Prototypes',
  icon: FlaskIcon,
  children: PROTOTYPE_NAV_ITEMS,
};

export const PROTOTYPES_STORAGE_KEY = 'huetype-sidebar-prototypes-open';
export const ACTIVE_PANEL_STORAGE_KEY = 'huetype-active-panel';

export const NAV_PANEL_IDS = [
  ...TOP_NAV_ITEMS.map((item) => item.id),
  ...PROTOTYPE_NAV_ITEMS.map((item) => item.id),
  'info',
  'help',
  'build-info',
  'feature-catalog',
  'preview-parts',
];

const NAV_PANEL_ID_SET = new Set(NAV_PANEL_IDS);

export function readStoredActivePanel() {
  try {
    const stored = localStorage.getItem(ACTIVE_PANEL_STORAGE_KEY);
    if (stored === 'preview-parts') return 'preview-settings';
    if (stored && NAV_PANEL_ID_SET.has(stored)) return stored;
  } catch {
    // ignore
  }
  return 'workspace';
}

export function storeActivePanel(panelId) {
  try {
    localStorage.setItem(ACTIVE_PANEL_STORAGE_KEY, panelId);
  } catch {
    // ignore
  }
}

export function isPrototypePanelActive(activePanel, panelOpen) {
  return panelOpen && PROTOTYPE_NAV_ITEMS.some((item) => item.id === activePanel);
}
