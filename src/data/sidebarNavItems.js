import {
  SquaresFourIcon,
  HeartIcon,
  SlidersHorizontalIcon,
  DropIcon,
  TextAaIcon,
  LayoutIcon,
  PencilSimpleIcon,
  SquareSplitHorizontalIcon,
  StorefrontIcon,
  ChartPieIcon,
  TagIcon,
  ArticleIcon,
  ShoppingBagIcon,
  SignInIcon,
  ChatCircleIcon,
  PathIcon,
  GearSixIcon,
  CircleDashedIcon,
  BellIcon,
  BookOpenTextIcon,
  KanbanIcon,
  ChartLineUpIcon,
  UserCircleIcon,
  CreditCardIcon,
  ListMagnifyingGlassIcon,
  EnvelopeSimpleIcon,
  DeviceMobileIcon,
  RocketLaunchIcon,
  WarningCircleIcon,
  CalendarBlankIcon,
  MusicNotesIcon,
  QuestionIcon,
  PackageIcon,
  BooksIcon,
  ChatCircleDotsIcon,
  ExportIcon,
  ShieldCheckIcon,
} from '@phosphor-icons/react';
import { PRIVACY_POLICY_PATH } from './buildInfo';

export const WORKSPACE_NAV_ITEMS = [
  { id: 'workspace', label: 'Preset library', icon: SquaresFourIcon },
  { id: 'saved', label: 'Saved presets', icon: HeartIcon },
  { id: 'customizations', label: 'My customizations', icon: SlidersHorizontalIcon, panelId: 'colors' },
];

export const CUSTOMIZE_NAV_ITEMS = [
  { id: 'colors', label: 'Color Visualiser', icon: DropIcon },
  { id: 'fonts', label: 'Font Visualiser', icon: TextAaIcon },
];

export const PREVIEW_NAV_ITEMS = [
  { id: 'preview-edit', label: 'Edit prototype', icon: PencilSimpleIcon },
  { id: 'preview-sections', label: 'Toggle prototype sections', icon: SquareSplitHorizontalIcon },
];

export const ARCHETYPE_NAV_META = {
  marketing: { navLabel: 'Landing page', chipLabel: 'Landing page', icon: StorefrontIcon },
  dashboard: { navLabel: 'Dashboard', chipLabel: 'Dashboard', icon: ChartPieIcon },
  pricing: { navLabel: 'Pricing', chipLabel: 'Pricing', icon: TagIcon },
  blog: { navLabel: 'Blog / article', chipLabel: 'Blog', icon: ArticleIcon },
  ecommerce: { navLabel: 'E-commerce', chipLabel: 'E-commerce', icon: ShoppingBagIcon },
  auth: { navLabel: 'Auth page', chipLabel: 'Auth', icon: SignInIcon },
  chat: { navLabel: 'AI chat', chipLabel: 'AI chat', icon: ChatCircleIcon },
  onboarding: { navLabel: 'Onboarding', chipLabel: 'Onboarding', icon: PathIcon },
  settings: { navLabel: 'Settings', chipLabel: 'Settings', icon: GearSixIcon },
  empty: { navLabel: 'Empty state', chipLabel: 'Empty state', icon: CircleDashedIcon },
  notifications: { navLabel: 'Notifications', chipLabel: 'Notifications', icon: BellIcon },
  docs: { navLabel: 'Documentation', chipLabel: 'Docs', icon: BookOpenTextIcon },
  kanban: { navLabel: 'Kanban board', chipLabel: 'Kanban', icon: KanbanIcon },
  analytics: { navLabel: 'Analytics', chipLabel: 'Analytics', icon: ChartLineUpIcon },
  profile: { navLabel: 'Profile page', chipLabel: 'Profile', icon: UserCircleIcon },
  billing: { navLabel: 'Billing', chipLabel: 'Billing', icon: CreditCardIcon },
  search: { navLabel: 'Search results', chipLabel: 'Search', icon: ListMagnifyingGlassIcon },
  email: { navLabel: 'Email template', chipLabel: 'Email', icon: EnvelopeSimpleIcon },
  'mobile-app': { navLabel: 'Mobile app', chipLabel: 'Mobile app', icon: DeviceMobileIcon },
  waitlist: { navLabel: 'Waitlist page', chipLabel: 'Waitlist', icon: RocketLaunchIcon },
  error404: { navLabel: '404 page', chipLabel: '404', icon: WarningCircleIcon },
  calendar: { navLabel: 'Calendar', chipLabel: 'Calendar', icon: CalendarBlankIcon },
  'media-player': { navLabel: 'Media player', chipLabel: 'Media', icon: MusicNotesIcon },
};

export const CHIP_BAR_ARCHETYPE_IDS = [
  'marketing',
  'dashboard',
  'chat',
  'blog',
  'ecommerce',
  'auth',
];

export const FOOTER_NAV_ITEMS = [
  { id: 'help', label: 'Help', icon: QuestionIcon },
  { id: 'build-info', label: 'Build info', icon: PackageIcon, showVersion: true },
  { id: 'feature-catalog', label: 'Feature catalog', icon: BooksIcon },
  { id: 'feedback', label: 'Feedback', icon: ChatCircleDotsIcon, action: 'feedback' },
];

export const FOOTER_LINK_ITEMS = [
  { id: 'privacy', label: 'Privacy', href: PRIVACY_POLICY_PATH, icon: ShieldCheckIcon },
];

export const SYSTEM_INFO_NAV_ITEMS = [
  { id: 'build-info', label: 'Build Info', icon: PackageIcon },
  { id: 'feature-catalog', label: 'Feature Catalog', icon: BooksIcon },
];

export const SYSTEM_INFO_GROUP = {
  id: 'system-info',
  label: 'System Information',
  icon: PackageIcon,
  children: SYSTEM_INFO_NAV_ITEMS,
};

export const SYSTEM_INFO_STORAGE_KEY = 'huetype-sidebar-system-info-open';

// Legacy exports for rail / keyboard shortcuts
export const TOP_NAV_ITEMS = [
  ...WORKSPACE_NAV_ITEMS.filter((item) => item.id !== 'customizations'),
  ...CUSTOMIZE_NAV_ITEMS,
];

export const PROTOTYPE_NAV_ITEMS = [
  { id: 'preview-edit', label: 'Edit prototype', icon: PencilSimpleIcon },
  { id: 'preview-sections', label: 'Toggle prototype sections', icon: SquareSplitHorizontalIcon },
  { id: 'archetypes', label: 'Layouts Library', icon: LayoutIcon },
];

export const PROTOTYPE_GROUP = {
  id: 'prototypes',
  label: 'Live Prototypes',
  icon: LayoutIcon,
  children: PROTOTYPE_NAV_ITEMS,
};

export const LAYOUTS_STORAGE_KEY = 'huetype-sidebar-layouts-open';
export const LAYOUT_GROUPS_STORAGE_KEY = 'huetype-sidebar-layout-groups-open';
export const ACTIVE_PANEL_STORAGE_KEY = 'huetype-active-panel';

export const NAV_PANEL_IDS = [
  'workspace',
  'saved',
  'colors',
  'fonts',
  'preview-edit',
  'preview-sections',
  'archetypes',
  'info',
  'help',
  'build-info',
  'feature-catalog',
  // Legacy ids kept for stored panel migration
  'preview-settings',
  'preview-parts',
];

const NAV_PANEL_ID_SET = new Set(NAV_PANEL_IDS);

export function resolvePanelId(navId) {
  const workspaceItem = WORKSPACE_NAV_ITEMS.find((item) => item.id === navId);
  if (workspaceItem?.panelId) return workspaceItem.panelId;
  return navId;
}

export function readStoredActivePanel() {
  try {
    const stored = localStorage.getItem(ACTIVE_PANEL_STORAGE_KEY);
    if (stored === 'preview-settings') return 'preview-edit';
    if (stored === 'preview-parts') return 'preview-sections';
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

export function readStoredLayoutsOpen() {
  try {
    const stored = localStorage.getItem(LAYOUTS_STORAGE_KEY);
    if (stored !== null) return stored === 'true';
  } catch {
    // ignore
  }
  return true;
}

export function storeLayoutsOpen(open) {
  try {
    localStorage.setItem(LAYOUTS_STORAGE_KEY, String(open));
  } catch {
    // ignore
  }
}

export function readStoredLayoutGroupsOpen() {
  try {
    const stored = localStorage.getItem(LAYOUT_GROUPS_STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed) && parsed.every((id) => typeof id === 'string')) {
      return parsed;
    }
  } catch {
    // ignore
  }
  return null;
}

export function storeLayoutGroupsOpen(groupIds) {
  try {
    localStorage.setItem(LAYOUT_GROUPS_STORAGE_KEY, JSON.stringify(groupIds));
  } catch {
    // ignore
  }
}

export const PREVIEW_MODE_STORAGE_KEY = 'huetype-preview-mode';

export function readStoredPreviewMode() {
  try {
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches) {
      return 'mobile';
    }
    const stored = localStorage.getItem(PREVIEW_MODE_STORAGE_KEY);
    if (stored === 'desktop' || stored === 'tablet' || stored === 'mobile') {
      return stored;
    }
  } catch {
    // ignore
  }
  return 'desktop';
}

export function storePreviewMode(mode) {
  try {
    localStorage.setItem(PREVIEW_MODE_STORAGE_KEY, mode);
  } catch {
    // ignore
  }
}

export function isPreviewPanelActive(activePanel, panelOpen) {
  return panelOpen && (
    activePanel === 'preview-edit'
    || activePanel === 'preview-sections'
    || activePanel === 'archetypes'
  );
}

export function isPrototypePanelActive(activePanel, panelOpen) {
  return isPreviewPanelActive(activePanel, panelOpen);
}

export function isSystemInfoPanelActive(activePanel, panelOpen) {
  return panelOpen && (
    activePanel === 'build-info'
    || activePanel === 'feature-catalog'
  );
}

export { ExportIcon };
