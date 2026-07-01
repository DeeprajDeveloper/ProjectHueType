import {
  PLANNED_PREVIEW_ARCHETYPES,
  PREVIEW_ARCHETYPES,
} from '../components/PreviewComponentsPanel/previewArchetypes';

const BUILT_ARCHETYPE_DESCRIPTIONS = {
  marketing: 'Landing page with navbar, hero, feature cards, testimonials, contact form, footer, and in-preview auth modal (log in / sign up).',
  dashboard: 'SaaS-style interior with sidebar nav, search bar, notification dot & panel, stat cards, charts, issues tracker, data table, and profile settings.',
  pricing: 'Tier comparison layout with dense feature lists and CTAs.',
  blog: 'Long-form headings and body copy for readability testing.',
  ecommerce: 'Product cards with image placeholders, price, and buy buttons.',
  auth: 'Login and signup forms with minimal chrome — typography and contrast at small scale.',
  chat: 'Conversation bubbles, markdown responses, inline code, and a fixed input bar.',
  onboarding: 'Step progress, focused forms, and illustration area for first-run setup.',
  settings: 'Tabbed layout, dense form fields, toggles, and a destructive action zone.',
  empty: 'Sparse layout with icon, headline, and single CTA — palette purity test.',
  notifications: 'Stacked activity list with read/unread states, avatars, and timestamps.',
};

const BUILT_ARCHETYPE_CATALOG = PREVIEW_ARCHETYPES.map((archetype) => ({
  id: `archetype-${archetype.id}`,
  label: archetype.label,
  description: BUILT_ARCHETYPE_DESCRIPTIONS[archetype.id] ?? archetype.description,
  status: 'built',
  usedIn: 'Live Preview',
  group: archetype.group,
}));

const PLANNED_ARCHETYPE_CATALOG = PLANNED_PREVIEW_ARCHETYPES.map((archetype) => ({
  id: `archetype-${archetype.id}`,
  label: archetype.label,
  description: archetype.description,
  status: 'planned',
  usedIn: 'Live Preview (roadmap)',
  group: archetype.group,
}));

export const UTILITY_COMPONENTS = [
  {
    id: 'color-swatch',
    label: 'Color swatch',
    description: 'Clickable color chip used in Combo Cards, Customize Panel, and the color picker.',
    status: 'built',
    usedIn: 'Combo Card, Customize Panel',
  },
  {
    id: 'font-sample',
    label: 'Font sample renderer',
    description: '"Aa" preview block shown wherever a font needs to be displayed, not just named.',
    status: 'built',
    usedIn: 'Customize Panel, Combo Card',
  },
  {
    id: 'tag-chip',
    label: 'Tag / chip',
    description: 'Generic chip for mood tags, "New," "Trending," filter chips, and dashboard issue labels.',
    status: 'built',
    usedIn: 'Filter Bar, Live Preview mockups',
  },
  {
    id: 'dropdown',
    label: 'Dropdown / select',
    description: 'Single-select and multi-select dropdowns for fonts, sort order, export format, mood, and industry filters.',
    status: 'built',
    usedIn: 'Export panel, Filter Bar',
  },
  {
    id: 'combobox',
    label: 'Combobox with search',
    description: 'Search/autocomplete for ~1,800 fonts by name — a plain dropdown won\'t scale.',
    status: 'planned',
  },
  {
    id: 'slider',
    label: 'Slider',
    description: 'Manual fine-tuning of saturation, lightness, contrast, or before/after comparison.',
    status: 'planned',
  },
  {
    id: 'tooltip',
    label: 'Tooltip',
    description: 'Hover labels on collapsed sidebar icon rails and preview panel controls.',
    status: 'built',
    usedIn: 'Left sidebar rail, Preview components panel rail',
  },
  {
    id: 'tabs',
    label: 'Tabs',
    description: 'Tabbed panels used inside Export, Feature catalog, and reusable elsewhere.',
    status: 'built',
    usedIn: 'Export panel, Feature catalog',
  },
  {
    id: 'segmented-control',
    label: 'Segmented control',
    description: 'Toggle light/dark mode filter, or desktop / tablet / mobile preview frame sizes.',
    status: 'built',
    usedIn: 'Live Preview, Filter Bar',
  },
  {
    id: 'modal',
    label: 'Modal / dialog wrapper',
    description: 'Generic dialog shell with backdrop, header, and close — used for app-level overlays.',
    status: 'built',
    usedIn: 'Feature catalog, Walkthrough',
  },
  {
    id: 'accordion',
    label: 'Accordion',
    description: 'Collapsible filter groups, customize sections, preview info, and preview parts panel.',
    status: 'built',
    usedIn: 'Presets, Customize, Live Preview info, Preview components panel',
  },
  {
    id: 'toast',
    label: 'Toast notification',
    description: 'Transient feedback for save, shuffle, copy, and share actions.',
    status: 'built',
    usedIn: 'App shell',
  },
  {
    id: 'alert',
    label: 'Alert / inline banner',
    description: 'e.g. "Font failed to load — using fallback."',
    status: 'planned',
  },
  {
    id: 'skeleton',
    label: 'Skeleton loader',
    description: 'Placeholder shimmer while the library grid loads combos.',
    status: 'planned',
  },
  {
    id: 'avatar',
    label: 'Avatar / user menu',
    description: 'Only relevant once accounts exist — v2.',
    status: 'planned',
  },
  {
    id: 'context-menu',
    label: 'Context menu',
    description: 'Right-click a combo card: duplicate, delete, export directly.',
    status: 'planned',
  },
  {
    id: 'pagination',
    label: 'Pagination / infinite scroll',
    description: 'Loader for paginated or infinitely scrolling library grids.',
    status: 'planned',
  },
];

export const FEATURE_COMPONENTS = [
  {
    id: 'feature-catalog',
    label: 'Feature catalog',
    description: 'Built vs planned inventory of utility, feature, and live preview components — opens in the right panel.',
    status: 'built',
    usedIn: 'Left sidebar footer, collapsed sidebar rail',
  },
  {
    id: 'preview-components-panel',
    label: 'Preview components panel',
    description: 'Right sidebar to switch live preview archetypes and toggle individual preview sections; collapses to an icon rail. On tablet/mobile, opens as a slide-over panel.',
    status: 'built',
    usedIn: 'App shell',
  },
  {
    id: 'collapsed-sidebar-rails',
    label: 'Collapsed sidebar rails',
    description: 'Icon-only left and right rails with tooltips when the workspace or preview panels are collapsed.',
    status: 'built',
    usedIn: 'App shell',
  },
  {
    id: 'settings-panel',
    label: 'Settings panel',
    description: 'Default contrast threshold (AA vs AAA), export format, app light/dark mode.',
    status: 'planned',
  },
  {
    id: 'share-modal',
    label: 'Share modal',
    description: 'Distinct from Export: shareable link, social preview image, optional embed code. (Clipboard copy exists today.)',
    status: 'planned',
  },
  {
    id: 'onboarding-tour',
    label: 'Onboarding tour',
    description: 'First-run walkthrough covering navigation, shuffle, export, Build Info, and Feature Catalog.',
    status: 'built',
  },
  {
    id: 'shortcuts-modal',
    label: 'Keyboard shortcuts cheat-sheet',
    description: 'Discoverable reference for panel navigation, preview devices, shuffle, and help shortcuts.',
    status: 'built',
    usedIn: 'Help panel (sidebar footer)',
  },
  {
    id: 'whats-new',
    label: '"What\'s new" popover',
    description: 'Changelog popover useful once you\'re iterating post-launch.',
    status: 'planned',
  },
  {
    id: 'popularity-indicator',
    label: 'Popularity / usage indicator',
    description: '"Saved by X people" social proof signal on Combo Cards.',
    status: 'planned',
  },
  {
    id: 'drag-reorder',
    label: 'Drag-to-reorder',
    description: 'Reorder items in the My Combos / saved list.',
    status: 'planned',
  },
];

export const LIVE_PREVIEW_COMPONENTS = [
  {
    id: 'device-frame',
    label: 'Device frame preview',
    description: 'Desktop, tablet (768px), and mobile (375px) frame sizes with animated width transitions. Mockups use container queries so layouts respond inside the frame.',
    status: 'built',
    usedIn: 'Live Preview toolbar',
  },
  ...BUILT_ARCHETYPE_CATALOG,
  ...PLANNED_ARCHETYPE_CATALOG,
  {
    id: 'preview-parts-toggles',
    label: 'Preview parts toggles',
    description: 'Per-archetype section toggles (e.g. navbar, charts, pricing tiers) persisted in local storage.',
    status: 'built',
    usedIn: 'Prototypes → Preview settings',
  },
];
