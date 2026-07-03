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
  {
    id: 'docs',
    label: 'Documentation / docs site',
    previewLabel: 'Documentation',
    description: 'Sidebar nav, markdown content, headings, and code blocks for technical reading.',
    group: 'group-3',
  },
  {
    id: 'kanban',
    label: 'Kanban / project board',
    previewLabel: 'Kanban board',
    description: 'Column layout with cards and status colors — multiple accent categories side by side.',
    group: 'group-3',
  },
  {
    id: 'analytics',
    label: 'Analytics / reports page',
    previewLabel: 'Analytics',
    description: 'Charts, KPI cards, data tables, and date-range selectors for data visualization.',
    group: 'group-3',
  },
  {
    id: 'profile',
    label: 'Profile / user page',
    previewLabel: 'Profile page',
    description: 'Avatar, stats, activity grid, bio, and social links — common in developer tools.',
    group: 'group-3',
  },
  {
    id: 'billing',
    label: 'Billing / upgrade page',
    previewLabel: 'Billing',
    description: 'Current plan summary, usage meters, and upgrade CTA — tests semantic color roles.',
    group: 'group-3',
  },
  {
    id: 'search',
    label: 'Search results / list view',
    previewLabel: 'Search results',
    description: 'Filterable, sortable item list with filter chips at high density.',
    group: 'group-3',
  },
  {
    id: 'email',
    label: 'Email template',
    previewLabel: 'Email template',
    description: 'Constrained 600px layout — tests how a palette renders in email clients vs. the web.',
    group: 'group-4',
  },
  {
    id: 'mobile-app',
    label: 'Mobile app screen',
    previewLabel: 'Mobile app',
    description: '390px-wide screen with bottom nav and stacked content cards at phone scale.',
    group: 'group-4',
  },
  {
    id: 'waitlist',
    label: 'Waitlist landing page',
    previewLabel: 'Waitlist page',
    description: 'Minimal headline, email input, and social proof — palette purity test.',
    group: 'group-4',
  },
  {
    id: 'error404',
    label: 'Error / 404 page',
    previewLabel: '404 page',
    description: 'Sparse reassuring layout — emotionally different from empty state.',
    group: 'group-4',
  },
  {
    id: 'calendar',
    label: 'Calendar / scheduler',
    previewLabel: 'Calendar',
    description: 'Dense grid with today highlight and event color blocks — multi-accent stress test.',
    group: 'group-4',
  },
  {
    id: 'media-player',
    label: 'Media player / audio UI',
    previewLabel: 'Media player',
    description: 'Progress bar, album art, and playback controls on a visual interactive surface.',
    group: 'group-4',
  },
];

export const ARCHETYPE_GROUPS = [
  {
    id: 'group-1',
    label: 'Group 1 — Core layouts',
    navLabel: 'Core layouts',
    description: 'Landing pages, dashboards, pricing, blogs, and e-commerce.',
  },
  {
    id: 'group-2',
    label: 'Group 2 — Product essentials',
    navLabel: 'Product essentials',
    description: 'Auth, chat, onboarding, settings, empty states, and notifications.',
  },
  {
    id: 'group-3',
    label: 'Group 3 — Strong secondary',
    navLabel: 'Strong secondary',
    description: 'Docs, kanban, analytics, profiles, billing, and search — wider audience coverage.',
  },
  {
    id: 'group-4',
    label: 'Group 4 — Niche & differentiated',
    navLabel: 'Niche & differentiated',
    description: 'Email, mobile app, waitlist, errors, calendar, and media — specialized real-world surfaces.',
  },
];

export const PLANNED_PREVIEW_ARCHETYPES = [];

export function getArchetypeGroupLabel(groupId) {
  return ARCHETYPE_GROUPS.find((group) => group.id === groupId)?.label ?? null;
}

export function getArchetypePreviewLabel(archetypeId) {
  return PREVIEW_ARCHETYPES.find((a) => a.id === archetypeId)?.previewLabel ?? 'Preview';
}

export function getArchetypesForGroup(groupId) {
  return PREVIEW_ARCHETYPES.filter((archetype) => archetype.group === groupId);
}

export function getArchetypeGroupId(archetypeId) {
  return PREVIEW_ARCHETYPES.find((archetype) => archetype.id === archetypeId)?.group ?? null;
}

export function getAvailableArchetypeGroups() {
  return ARCHETYPE_GROUPS.filter((group) => getArchetypesForGroup(group.id).length > 0);
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
  docs: [
    { id: 'sidebarNav', label: 'Sidebar navigation' },
    { id: 'pageHeader', label: 'Page header' },
    { id: 'contentArea', label: 'Content area' },
    { id: 'codeBlocks', label: 'Code blocks' },
    { id: 'tableOfContents', label: 'Table of contents' },
  ],
  kanban: [
    { id: 'boardHeader', label: 'Board header' },
    { id: 'columns', label: 'Kanban columns' },
    { id: 'cardDetails', label: 'Card details' },
    { id: 'addCard', label: 'Add card actions' },
  ],
  analytics: [
    { id: 'pageHeader', label: 'Page header' },
    { id: 'dateRange', label: 'Date range selector' },
    { id: 'kpiCards', label: 'KPI cards' },
    { id: 'charts', label: 'Charts' },
    { id: 'dataTable', label: 'Data table' },
  ],
  profile: [
    { id: 'profileHeader', label: 'Profile header' },
    { id: 'stats', label: 'Stats row' },
    { id: 'bio', label: 'Bio section' },
    { id: 'activityGrid', label: 'Activity grid' },
    { id: 'socialLinks', label: 'Social links' },
  ],
  billing: [
    { id: 'currentPlan', label: 'Current plan' },
    { id: 'usageMeters', label: 'Usage meters' },
    { id: 'upgradeOptions', label: 'Upgrade options' },
    { id: 'billingHistory', label: 'Billing history' },
  ],
  search: [
    { id: 'searchHeader', label: 'Search header' },
    { id: 'filterChips', label: 'Filter chips' },
    { id: 'sortBar', label: 'Sort bar' },
    { id: 'resultsList', label: 'Results list' },
  ],
  email: [
    { id: 'emailHeader', label: 'Email header' },
    { id: 'heroBlock', label: 'Hero block' },
    { id: 'contentBlocks', label: 'Content blocks' },
    { id: 'ctaButton', label: 'CTA button' },
    { id: 'emailFooter', label: 'Email footer' },
  ],
  'mobile-app': [
    { id: 'statusBar', label: 'Status bar' },
    { id: 'appHeader', label: 'App header' },
    { id: 'contentCards', label: 'Content cards' },
    { id: 'bottomNav', label: 'Bottom navigation' },
  ],
  waitlist: [
    { id: 'brandMark', label: 'Brand mark' },
    { id: 'headline', label: 'Headline & copy' },
    { id: 'signupForm', label: 'Signup form' },
    { id: 'socialProof', label: 'Social proof' },
  ],
  error404: [
    { id: 'errorCode', label: 'Error code' },
    { id: 'message', label: 'Message & copy' },
    { id: 'primaryAction', label: 'Primary action' },
    { id: 'secondaryLinks', label: 'Secondary links' },
  ],
  calendar: [
    { id: 'calendarHeader', label: 'Calendar header' },
    { id: 'monthGrid', label: 'Month grid' },
    { id: 'eventBlocks', label: 'Event blocks' },
    { id: 'sidebarEvents', label: 'Upcoming sidebar' },
  ],
  'media-player': [
    { id: 'albumArt', label: 'Album art' },
    { id: 'trackInfo', label: 'Track info' },
    { id: 'progressBar', label: 'Progress bar' },
    { id: 'playbackControls', label: 'Playback controls' },
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
