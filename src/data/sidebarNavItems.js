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

export function isPrototypePanelActive(activePanel, panelOpen) {
  return panelOpen && PROTOTYPE_NAV_ITEMS.some((item) => item.id === activePanel);
}
