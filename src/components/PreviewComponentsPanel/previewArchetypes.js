export const PREVIEW_ARCHETYPES = [
  {
    id: 'marketing',
    label: 'Common Website Design',
    previewLabel: 'Common Website Design',
    description: 'Navbar, hero, feature cards, testimonials, contact form, and footer.',
    group: 'group-1',
  },
  {
    id: 'dashboard',
    label: 'Corporate Dashboard',
    previewLabel: 'Corporate Dashboard',
    description: 'Sidebar nav, charts, issues tracker, data table, and profile settings.',
    group: 'group-1',
  },
  {
    id: 'pricing',
    label: 'Pricing catalog',
    previewLabel: 'Pricing catalog',
    description: 'Tier comparison layout with dense feature lists and CTAs.',
    group: 'group-1',
  },
  {
    id: 'blog',
    label: 'Blog post / article',
    previewLabel: 'Blog post / article',
    description: 'Long-form headings and body copy for readability testing.',
    group: 'group-1',
  },
  {
    id: 'ecommerce',
    label: 'E-commerce product page',
    previewLabel: 'E-commerce product page',
    description: 'Product cards with image placeholders, price, and buy buttons.',
    group: 'group-1',
  },
  {
    id: 'auth',
    label: 'Auth pages',
    previewLabel: 'Auth pages',
    description: 'Login and signup forms with minimal chrome — typography and contrast at small scale.',
    group: 'group-2',
  },
  {
    id: 'chat',
    label: 'AI chat interface',
    previewLabel: 'AI chat interface',
    description: 'Conversation bubbles, markdown responses, inline code, and a fixed input bar.',
    group: 'group-2',
  },
  {
    id: 'onboarding',
    label: 'Onboarding wizard',
    previewLabel: 'Onboarding wizard',
    description: 'Step progress, focused forms, and illustration area for first-run setup.',
    group: 'group-2',
  },
  {
    id: 'settings',
    label: 'Settings / account',
    previewLabel: 'Settings / account',
    description: 'Tabbed layout, dense form fields, toggles, and a destructive action zone.',
    group: 'group-2',
  },
  {
    id: 'empty',
    label: 'Empty state',
    previewLabel: 'Empty state',
    description: 'Sparse layout with icon, headline, and single CTA — palette purity test.',
    group: 'group-2',
  },
  {
    id: 'notifications',
    label: 'Notifications feed',
    previewLabel: 'Notifications feed',
    description: 'Stacked activity list with read/unread states, avatars, and timestamps.',
    group: 'group-2',
  },
];

export const ARCHETYPE_GROUPS = [
  {
    id: 'group-1',
    label: 'Group 1 — Core layouts',
    description: 'Landing pages, dashboards, pricing, blogs, and e-commerce.',
  },
  {
    id: 'group-2',
    label: 'Group 2 — Product essentials',
    description: 'Auth, chat, onboarding, settings, empty states, and notifications.',
  },
  {
    id: 'group-3',
    label: 'Group 3 — Strong secondary',
    description: 'Docs, kanban, analytics, profiles, billing, and search — wider audience coverage.',
  },
  {
    id: 'group-4',
    label: 'Group 4 — Niche & differentiated',
    description: 'Email, mobile app, waitlist, errors, calendar, and media — specialized real-world surfaces.',
  },
];

export const PLANNED_PREVIEW_ARCHETYPES = [
  {
    id: 'docs',
    label: 'Documentation / docs site',
    description: 'Sidebar nav + markdown content area + in-page headings. Tests long-form technical reading with code blocks and smaller font sizes.',
    group: 'group-3',
  },
  {
    id: 'kanban',
    label: 'Kanban / project board',
    description: 'Column layout with cards and status colors. Tests multiple accent-color categories side by side (To Do / In Progress / Done).',
    group: 'group-3',
  },
  {
    id: 'analytics',
    label: 'Analytics / reports page',
    description: 'Charts, data tables, KPI cards, and date-range selectors. Tests palette on data-visualization surfaces where colors encode meaning.',
    group: 'group-3',
  },
  {
    id: 'profile',
    label: 'Profile / user page',
    description: 'Avatar, stats, activity grid, bio, and social links. Common in community and developer tools.',
    group: 'group-3',
  },
  {
    id: 'billing',
    label: 'Billing / upgrade page',
    description: 'Current plan summary, usage meters, and upgrade CTA. Tests danger, warning, and success semantic color roles.',
    group: 'group-3',
  },
  {
    id: 'search',
    label: 'Search results / list view',
    description: 'Filterable, sortable item list. Tests body copy legibility at high density and filter chips at real scale.',
    group: 'group-3',
  },
  {
    id: 'email',
    label: 'Email template',
    description: 'Constrained 600px layout without modern CSS grid. Tests how a palette renders in email clients vs. the web.',
    group: 'group-4',
  },
  {
    id: 'mobile-app',
    label: 'Mobile app screen',
    description: '390px-wide screen with bottom nav and stacked content cards. Tests contrast and spacing at phone scale.',
    group: 'group-4',
  },
  {
    id: 'waitlist',
    label: 'Waitlist landing page',
    description: 'Minimal headline, email input, and social proof. Tests whether a palette holds together with almost no content.',
    group: 'group-4',
  },
  {
    id: 'error404',
    label: 'Error / 404 page',
    description: 'Sparse reassuring layout — emotionally different from empty state. Tests palette with minimal promotional chrome.',
    group: 'group-4',
  },
  {
    id: 'calendar',
    label: 'Calendar / scheduler',
    description: 'Dense grid layout with today highlight and event color blocks. Another multi-accent-color stress test.',
    group: 'group-4',
  },
  {
    id: 'media-player',
    label: 'Media player / audio UI',
    description: 'Progress bar, album art, and playback controls. Tests accent color on a visual, interactive surface.',
    group: 'group-4',
  },
];

export function getArchetypeGroupLabel(groupId) {
  return ARCHETYPE_GROUPS.find((group) => group.id === groupId)?.label ?? null;
}

export function getArchetypePreviewLabel(archetypeId) {
  return PREVIEW_ARCHETYPES.find((a) => a.id === archetypeId)?.previewLabel ?? 'Preview';
}

export function getArchetypesForGroup(groupId) {
  return PREVIEW_ARCHETYPES.filter((archetype) => archetype.group === groupId);
}

export const ARCHETYPE_PARTS = {
  marketing: [
    { id: 'navbar', label: 'Navbar' },
    { id: 'hero', label: 'Hero' },
    { id: 'featureCards', label: 'Feature cards' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contactForm', label: 'Contact form' },
    { id: 'footer', label: 'Footer' },
  ],
  dashboard: [
    { id: 'sidebarNav', label: 'Sidebar nav' },
    { id: 'topBar', label: 'Search & notifications' },
    { id: 'pageHeader', label: 'Page header' },
    { id: 'statCards', label: 'Stat cards' },
    { id: 'charts', label: 'Charts' },
    { id: 'issuesTracker', label: 'Issues tracker' },
    { id: 'dataTable', label: 'Data table' },
    { id: 'profileSettings', label: 'Profile & settings' },
  ],
  pricing: [
    { id: 'topNav', label: 'Top navigation' },
    { id: 'pageHeader', label: 'Page header' },
    { id: 'pricingTiers', label: 'Pricing tiers' },
    { id: 'featureComparison', label: 'Feature comparison' },
  ],
  blog: [
    { id: 'topNav', label: 'Top navigation' },
    { id: 'authorRail', label: 'Author profile rail' },
    { id: 'articleHeader', label: 'Article header' },
    { id: 'articleBody', label: 'Article body' },
    { id: 'actionRail', label: 'Reading actions' },
  ],
  ecommerce: [
    { id: 'topNav', label: 'Store navigation' },
    { id: 'categoryNav', label: 'Category filters' },
    { id: 'heroBanner', label: 'Hero banner' },
    { id: 'sectionHeader', label: 'Section header' },
    { id: 'productCards', label: 'Product cards' },
    { id: 'footer', label: 'Footer' },
  ],
  auth: [
    { id: 'brandPanel', label: 'Brand panel' },
    { id: 'authTabs', label: 'Login / signup tabs' },
    { id: 'authForm', label: 'Auth form' },
    { id: 'socialLogin', label: 'Social login' },
  ],
  chat: [
    { id: 'chatSidebar', label: 'Conversation sidebar' },
    { id: 'chatHeader', label: 'Chat header' },
    { id: 'messageThread', label: 'Message thread' },
    { id: 'inputBar', label: 'Input bar' },
  ],
  onboarding: [
    { id: 'progressBar', label: 'Progress bar' },
    { id: 'stepContent', label: 'Step content' },
    { id: 'illustration', label: 'Illustration area' },
    { id: 'stepNavigation', label: 'Step navigation' },
  ],
  settings: [
    { id: 'settingsNav', label: 'Settings navigation' },
    { id: 'profileSection', label: 'Profile section' },
    { id: 'preferences', label: 'Preferences' },
    { id: 'dangerZone', label: 'Danger zone' },
  ],
  empty: [
    { id: 'illustration', label: 'Illustration' },
    { id: 'headline', label: 'Headline & copy' },
    { id: 'primaryCta', label: 'Primary CTA' },
    { id: 'secondaryHint', label: 'Secondary hint' },
  ],
  notifications: [
    { id: 'feedHeader', label: 'Feed header' },
    { id: 'filterTabs', label: 'Filter tabs' },
    { id: 'notificationList', label: 'Notification list' },
    { id: 'unreadBadges', label: 'Unread badges' },
  ],
};

export function getDefaultArchetypeParts() {
  return Object.fromEntries(
    Object.entries(ARCHETYPE_PARTS).map(([archetype, parts]) => [
      archetype,
      Object.fromEntries(parts.map((part) => [part.id, true])),
    ]),
  );
}

export function mergeArchetypePartsState(stored) {
  const defaults = getDefaultArchetypeParts();
  if (!stored || typeof stored !== 'object') return defaults;

  return Object.fromEntries(
    Object.entries(defaults).map(([archetype, parts]) => [
      archetype,
      { ...parts, ...(stored[archetype] || {}) },
    ]),
  );
}

/** Merge defaults with stored toggles — missing keys default to visible. */
export function resolveArchetypeParts(archetype, partsForArchetype = {}) {
  const defaults = getDefaultArchetypeParts()[archetype] || {};
  return { ...defaults, ...partsForArchetype };
}

export function isArchetypePreviewEmpty(archetype, partsForArchetype = {}) {
  const partDefs = ARCHETYPE_PARTS[archetype];
  if (!partDefs?.length) return false;

  const resolved = resolveArchetypeParts(archetype, partsForArchetype);
  return partDefs.every((part) => resolved[part.id] === false);
}
