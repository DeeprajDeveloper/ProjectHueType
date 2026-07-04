/** Inspector anchor positions relative to element bounding box */
export const INSPECTOR_ANCHOR = {
  TOP_RIGHT: 'top-right',
  LEFT_CENTER: 'left-center',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM_LEFT: 'bottom-left',
  TOP_CENTER: 'top-center',
  RIGHT_CENTER: 'right-center',
  LEFT: 'left',
  RIGHT: 'right',
};

/**
 * Per-archetype inspectable elements.
 * inspectId matches data-inspect on mockup DOM nodes.
 * partId gates visibility when preview section toggles are off.
 * wcagType: text | non-text | skip | decorative
 * fixRole: palette role key for AA fix chips (text, background, primary, accent, secondary)
 */
export const INSPECTOR_REGISTRY = {
  marketing: [
    { inspectId: 'nav-logo', name: 'Logo / wordmark', anchor: INSPECTOR_ANCHOR.RIGHT_CENTER, wcagType: 'text', partId: 'navbar', fixRole: 'primary' },
    { inspectId: 'nav-link', name: 'Nav link', anchor: INSPECTOR_ANCHOR.TOP_CENTER, wcagType: 'text', partId: 'navbar', fixRole: 'text' },
    { inspectId: 'nav-cta', name: 'Nav CTA button', anchor: INSPECTOR_ANCHOR.BOTTOM_RIGHT, wcagType: 'non-text', partId: 'navbar', fixRole: 'accent' },
    { inspectId: 'hero-eyebrow', name: 'Hero eyebrow', anchor: INSPECTOR_ANCHOR.LEFT_CENTER, wcagType: 'text', partId: 'hero', fixRole: 'accent' },
    { inspectId: 'hero-heading', name: 'Hero heading', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'hero', fixRole: 'text' },
    { inspectId: 'hero-body', name: 'Hero subheading', anchor: INSPECTOR_ANCHOR.LEFT_CENTER, wcagType: 'text', partId: 'hero', fixRole: 'text' },
    { inspectId: 'hero-cta-primary', name: 'Primary CTA', anchor: INSPECTOR_ANCHOR.BOTTOM_RIGHT, wcagType: 'non-text', partId: 'hero', fixRole: 'accent' },
    { inspectId: 'hero-cta-secondary', name: 'Secondary CTA', anchor: INSPECTOR_ANCHOR.BOTTOM_LEFT, wcagType: 'non-text', partId: 'hero', fixRole: 'primary' },
    { inspectId: 'section-heading', name: 'Section heading', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'featureCards', fixRole: 'text' },
    { inspectId: 'feature-card-heading', name: 'Feature card heading', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'featureCards', fixRole: 'text' },
    { inspectId: 'feature-card-body', name: 'Feature card body', anchor: INSPECTOR_ANCHOR.LEFT_CENTER, wcagType: 'text', partId: 'featureCards', fixRole: 'text' },
    { inspectId: 'footer-text', name: 'Footer text', anchor: INSPECTOR_ANCHOR.LEFT_CENTER, wcagType: 'text', partId: 'footer', fixRole: 'text' },
  ],
  dashboard: [
    { inspectId: 'sidebar-nav-active', name: 'Sidebar nav (active)', anchor: INSPECTOR_ANCHOR.LEFT_CENTER, wcagType: 'text', partId: 'sidebarNav', fixRole: 'accent' },
    { inspectId: 'sidebar-nav-default', name: 'Sidebar nav (default)', anchor: INSPECTOR_ANCHOR.LEFT_CENTER, wcagType: 'text', partId: 'sidebarNav', fixRole: 'text' },
    { inspectId: 'page-heading', name: 'Page heading', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'pageHeader', fixRole: 'text' },
    { inspectId: 'stat-value', name: 'Stat card value', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'statCards', fixRole: 'text' },
    { inspectId: 'stat-label', name: 'Stat card label', anchor: INSPECTOR_ANCHOR.LEFT_CENTER, wcagType: 'text', partId: 'statCards', fixRole: 'text' },
    { inspectId: 'table-heading', name: 'Data table heading', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'dataTable', fixRole: 'text' },
    { inspectId: 'table-cell', name: 'Data table cell', anchor: INSPECTOR_ANCHOR.LEFT_CENTER, wcagType: 'text', partId: 'dataTable', fixRole: 'text' },
    { inspectId: 'table-badge', name: 'Status badge', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'non-text', partId: 'dataTable', fixRole: 'accent' },
    { inspectId: 'primary-action', name: 'Primary action button', anchor: INSPECTOR_ANCHOR.BOTTOM_RIGHT, wcagType: 'non-text', partId: 'profileSettings', fixRole: 'accent' },
  ],
  pricing: [
    { inspectId: 'pricing-nav-logo', name: 'Logo / wordmark', anchor: INSPECTOR_ANCHOR.RIGHT_CENTER, wcagType: 'text', partId: 'topNav', fixRole: 'primary' },
    { inspectId: 'pricing-heading', name: 'Page heading', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'pageHeader', fixRole: 'text' },
    { inspectId: 'tier-name', name: 'Tier name', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'pricingTiers', fixRole: 'text' },
    { inspectId: 'tier-price', name: 'Tier price', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'pricingTiers', fixRole: 'text' },
    { inspectId: 'tier-cta', name: 'Tier CTA button', anchor: INSPECTOR_ANCHOR.BOTTOM_RIGHT, wcagType: 'non-text', partId: 'pricingTiers', fixRole: 'accent' },
    { inspectId: 'tier-feature', name: 'Tier feature text', anchor: INSPECTOR_ANCHOR.LEFT_CENTER, wcagType: 'text', partId: 'pricingTiers', fixRole: 'text' },
  ],
  blog: [
    { inspectId: 'article-heading', name: 'Article heading', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'articleHeader', fixRole: 'text' },
    { inspectId: 'article-subheading', name: 'Subheading', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'articleBody', fixRole: 'text' },
    { inspectId: 'article-body', name: 'Body paragraph', anchor: INSPECTOR_ANCHOR.LEFT_CENTER, wcagType: 'text', partId: 'articleBody', fixRole: 'text' },
    { inspectId: 'blockquote', name: 'Blockquote', anchor: INSPECTOR_ANCHOR.LEFT_CENTER, wcagType: 'text', partId: 'articleBody', fixRole: 'text' },
    { inspectId: 'author-name', name: 'Author name', anchor: INSPECTOR_ANCHOR.LEFT_CENTER, wcagType: 'text', partId: 'authorRail', fixRole: 'text' },
    { inspectId: 'caption-meta', name: 'Caption / metadata', anchor: INSPECTOR_ANCHOR.LEFT_CENTER, wcagType: 'text', partId: 'articleHeader', fixRole: 'text' },
    { inspectId: 'category-badge', name: 'Category badge', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'non-text', partId: 'articleHeader', fixRole: 'accent' },
  ],
  ecommerce: [
    { inspectId: 'product-name', name: 'Product name', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'productCards', fixRole: 'text' },
    { inspectId: 'product-price', name: 'Price text', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'productCards', fixRole: 'text' },
    { inspectId: 'product-description', name: 'Description body', anchor: INSPECTOR_ANCHOR.LEFT_CENTER, wcagType: 'text', partId: 'heroBanner', fixRole: 'text' },
    { inspectId: 'add-to-cart', name: 'Add to cart button', anchor: INSPECTOR_ANCHOR.BOTTOM_RIGHT, wcagType: 'non-text', partId: 'productCards', fixRole: 'accent' },
    { inspectId: 'product-badge', name: 'Product badge', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'non-text', partId: 'productCards', fixRole: 'accent' },
    { inspectId: 'review-text', name: 'Rating / review text', anchor: INSPECTOR_ANCHOR.LEFT_CENTER, wcagType: 'text', partId: 'productCards', fixRole: 'text' },
  ],
  auth: [
    { inspectId: 'form-heading', name: 'Form heading', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'authForm', fixRole: 'text' },
    { inspectId: 'form-subheading', name: 'Form subheading', anchor: INSPECTOR_ANCHOR.LEFT_CENTER, wcagType: 'text', partId: 'authForm', fixRole: 'text' },
    { inspectId: 'input-label', name: 'Input label', anchor: INSPECTOR_ANCHOR.LEFT, wcagType: 'text', partId: 'authForm', fixRole: 'text' },
    { inspectId: 'input-field', name: 'Input field', anchor: INSPECTOR_ANCHOR.RIGHT, wcagType: 'non-text', partId: 'authForm', fixRole: 'secondary' },
    { inspectId: 'submit-button', name: 'Submit button', anchor: INSPECTOR_ANCHOR.BOTTOM_RIGHT, wcagType: 'non-text', partId: 'authForm', fixRole: 'accent' },
  ],
  chat: [
    { inspectId: 'assistant-header', name: 'Assistant header', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'chatHeader', fixRole: 'text' },
    { inspectId: 'user-bubble', name: 'User message bubble', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'messageThread', fixRole: 'accent' },
    { inspectId: 'assistant-bubble', name: 'Assistant message bubble', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'messageThread', fixRole: 'secondary' },
    { inspectId: 'message-input', name: 'Message input', anchor: INSPECTOR_ANCHOR.RIGHT, wcagType: 'non-text', partId: 'inputBar', fixRole: 'secondary' },
    { inspectId: 'send-button', name: 'Send button', anchor: INSPECTOR_ANCHOR.BOTTOM_RIGHT, wcagType: 'non-text', partId: 'inputBar', fixRole: 'accent' },
  ],
  onboarding: [
    { inspectId: 'progress-label', name: 'Progress label', anchor: INSPECTOR_ANCHOR.LEFT_CENTER, wcagType: 'text', partId: 'progressBar', fixRole: 'text' },
    { inspectId: 'step-title', name: 'Step title', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'stepContent', fixRole: 'text' },
    { inspectId: 'step-body', name: 'Step body', anchor: INSPECTOR_ANCHOR.LEFT_CENTER, wcagType: 'text', partId: 'stepContent', fixRole: 'text' },
    { inspectId: 'next-button', name: 'Next button', anchor: INSPECTOR_ANCHOR.BOTTOM_RIGHT, wcagType: 'non-text', partId: 'stepNavigation', fixRole: 'accent' },
  ],
  settings: [
    { inspectId: 'settings-nav-item', name: 'Settings nav item', anchor: INSPECTOR_ANCHOR.LEFT_CENTER, wcagType: 'text', partId: 'settingsNav', fixRole: 'text' },
    { inspectId: 'section-heading', name: 'Section heading', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'profileSection', fixRole: 'text' },
    { inspectId: 'preference-toggle', name: 'Preference toggle', anchor: INSPECTOR_ANCHOR.LEFT_CENTER, wcagType: 'text', partId: 'preferences', fixRole: 'text' },
    { inspectId: 'danger-button', name: 'Danger button', anchor: INSPECTOR_ANCHOR.BOTTOM_RIGHT, wcagType: 'non-text', partId: 'dangerZone', fixRole: 'accent' },
  ],
  empty: [
    { inspectId: 'empty-headline', name: 'Headline', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'headline', fixRole: 'text' },
    { inspectId: 'empty-body', name: 'Body copy', anchor: INSPECTOR_ANCHOR.LEFT_CENTER, wcagType: 'text', partId: 'headline', fixRole: 'text' },
    { inspectId: 'empty-cta', name: 'Primary CTA', anchor: INSPECTOR_ANCHOR.BOTTOM_RIGHT, wcagType: 'non-text', partId: 'primaryCta', fixRole: 'accent' },
  ],
  notifications: [
    { inspectId: 'feed-heading', name: 'Feed heading', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'feedHeader', fixRole: 'text' },
    { inspectId: 'filter-tab', name: 'Filter tab', anchor: INSPECTOR_ANCHOR.TOP_CENTER, wcagType: 'text', partId: 'filterTabs', fixRole: 'text' },
    { inspectId: 'notification-item', name: 'Notification item', anchor: INSPECTOR_ANCHOR.LEFT_CENTER, wcagType: 'text', partId: 'notificationList', fixRole: 'text' },
    { inspectId: 'unread-badge', name: 'Unread badge', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'non-text', partId: 'unreadBadges', fixRole: 'accent' },
  ],
  docs: [
    { inspectId: 'docs-nav-link', name: 'Docs nav link', anchor: INSPECTOR_ANCHOR.LEFT_CENTER, wcagType: 'text', partId: 'sidebarNav', fixRole: 'text' },
    { inspectId: 'docs-page-heading', name: 'Page heading', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'pageHeader', fixRole: 'text' },
    { inspectId: 'docs-body-paragraph', name: 'Body paragraph', anchor: INSPECTOR_ANCHOR.LEFT_CENTER, wcagType: 'text', partId: 'contentArea', fixRole: 'text' },
    { inspectId: 'docs-code-block', name: 'Code block', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'codeBlocks', fixRole: 'text' },
  ],
  kanban: [
    { inspectId: 'kanban-column-title', name: 'Column title', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'columns', fixRole: 'text' },
    { inspectId: 'kanban-card-title', name: 'Card title', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'cardDetails', fixRole: 'text' },
    { inspectId: 'kanban-add-button', name: 'Add card button', anchor: INSPECTOR_ANCHOR.BOTTOM_RIGHT, wcagType: 'non-text', partId: 'addCard', fixRole: 'accent' },
  ],
  analytics: [
    { inspectId: 'report-title', name: 'Report title', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'pageHeader', fixRole: 'text' },
    { inspectId: 'summary-text', name: 'Executive summary', anchor: INSPECTOR_ANCHOR.LEFT_CENTER, wcagType: 'text', partId: 'pageHeader', fixRole: 'text' },
    { inspectId: 'figure-caption', name: 'Figure caption', anchor: INSPECTOR_ANCHOR.LEFT_CENTER, wcagType: 'text', partId: 'charts', fixRole: 'text' },
    { inspectId: 'table-header', name: 'Table header', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'dataTable', fixRole: 'text' },
  ],
  profile: [
    { inspectId: 'profile-avatar', name: 'Profile avatar', anchor: INSPECTOR_ANCHOR.RIGHT_CENTER, wcagType: 'decorative', partId: 'profileHeader' },
    { inspectId: 'profile-name', name: 'Profile name', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'profileHeader', fixRole: 'text' },
    { inspectId: 'profile-stat-value', name: 'Stat value', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'stats', fixRole: 'text' },
    { inspectId: 'profile-bio', name: 'Bio text', anchor: INSPECTOR_ANCHOR.LEFT_CENTER, wcagType: 'text', partId: 'bio', fixRole: 'text' },
  ],
  billing: [
    { inspectId: 'plan-name', name: 'Plan name', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'currentPlan', fixRole: 'text' },
    { inspectId: 'plan-price', name: 'Plan price', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'currentPlan', fixRole: 'text' },
    { inspectId: 'usage-label', name: 'Usage label', anchor: INSPECTOR_ANCHOR.LEFT_CENTER, wcagType: 'text', partId: 'usageMeters', fixRole: 'text' },
    { inspectId: 'upgrade-cta', name: 'Upgrade CTA', anchor: INSPECTOR_ANCHOR.BOTTOM_RIGHT, wcagType: 'non-text', partId: 'upgradeOptions', fixRole: 'accent' },
  ],
  search: [
    { inspectId: 'search-input', name: 'Search input', anchor: INSPECTOR_ANCHOR.RIGHT, wcagType: 'non-text', partId: 'searchHeader', fixRole: 'secondary' },
    { inspectId: 'filter-chip', name: 'Filter chip', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'non-text', partId: 'filterChips', fixRole: 'accent' },
    { inspectId: 'result-title', name: 'Result title', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'resultsList', fixRole: 'text' },
    { inspectId: 'result-meta', name: 'Result metadata', anchor: INSPECTOR_ANCHOR.LEFT_CENTER, wcagType: 'text', partId: 'resultsList', fixRole: 'text' },
  ],
  email: [
    { inspectId: 'email-brand', name: 'Email brand', anchor: INSPECTOR_ANCHOR.RIGHT_CENTER, wcagType: 'text', partId: 'emailHeader', fixRole: 'primary' },
    { inspectId: 'email-hero-title', name: 'Hero title', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'heroBlock', fixRole: 'text' },
    { inspectId: 'email-body', name: 'Hero body', anchor: INSPECTOR_ANCHOR.LEFT_CENTER, wcagType: 'text', partId: 'heroBlock', fixRole: 'text' },
    { inspectId: 'email-cta', name: 'CTA button', anchor: INSPECTOR_ANCHOR.BOTTOM_RIGHT, wcagType: 'non-text', partId: 'ctaButton', fixRole: 'accent' },
  ],
  'mobile-app': [
    { inspectId: 'mobile-header-title', name: 'Screen title', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'appHeader', fixRole: 'text' },
    { inspectId: 'mobile-card-title', name: 'Card title', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'contentCards', fixRole: 'text' },
    { inspectId: 'mobile-nav-btn', name: 'Bottom nav item', anchor: INSPECTOR_ANCHOR.TOP_CENTER, wcagType: 'text', partId: 'bottomNav', fixRole: 'accent' },
    { inspectId: 'profile-name', name: 'Profile name', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'contentCards', fixRole: 'text' },
  ],
  waitlist: [
    { inspectId: 'waitlist-headline', name: 'Headline', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'headline', fixRole: 'text' },
    { inspectId: 'waitlist-subhead', name: 'Subhead', anchor: INSPECTOR_ANCHOR.LEFT_CENTER, wcagType: 'text', partId: 'headline', fixRole: 'text' },
    { inspectId: 'waitlist-submit', name: 'Submit button', anchor: INSPECTOR_ANCHOR.BOTTOM_RIGHT, wcagType: 'non-text', partId: 'signupForm', fixRole: 'accent' },
  ],
  error404: [
    { inspectId: 'error-title', name: 'Error title', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'message', fixRole: 'text' },
    { inspectId: 'error-body', name: 'Error body', anchor: INSPECTOR_ANCHOR.LEFT_CENTER, wcagType: 'text', partId: 'message', fixRole: 'text' },
    { inspectId: 'error-primary', name: 'Primary action', anchor: INSPECTOR_ANCHOR.BOTTOM_RIGHT, wcagType: 'non-text', partId: 'primaryAction', fixRole: 'primary' },
  ],
  calendar: [
    { inspectId: 'calendar-title', name: 'Calendar title', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'calendarHeader', fixRole: 'text' },
    { inspectId: 'calendar-today-btn', name: 'Today button', anchor: INSPECTOR_ANCHOR.BOTTOM_RIGHT, wcagType: 'non-text', partId: 'calendarHeader', fixRole: 'secondary' },
    { inspectId: 'calendar-day', name: 'Day cell', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'monthGrid', fixRole: 'text' },
    { inspectId: 'calendar-event', name: 'Event block', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'non-text', partId: 'eventBlocks', fixRole: 'accent' },
  ],
  'media-player': [
    { inspectId: 'player-title', name: 'Track title', anchor: INSPECTOR_ANCHOR.TOP_RIGHT, wcagType: 'text', partId: 'trackInfo', fixRole: 'text' },
    { inspectId: 'player-artist', name: 'Artist name', anchor: INSPECTOR_ANCHOR.LEFT_CENTER, wcagType: 'text', partId: 'trackInfo', fixRole: 'accent' },
    { inspectId: 'player-progress', name: 'Progress bar', anchor: INSPECTOR_ANCHOR.RIGHT, wcagType: 'non-text', partId: 'progressBar', fixRole: 'accent' },
    { inspectId: 'player-play-btn', name: 'Play button', anchor: INSPECTOR_ANCHOR.BOTTOM_RIGHT, wcagType: 'non-text', partId: 'playbackControls', fixRole: 'accent' },
  ],
};

export function getInspectableElements(archetypeId, parts = {}) {
  const entries = INSPECTOR_REGISTRY[archetypeId] || [];
  return entries.filter((entry) => {
    if (!entry.partId) return true;
    return parts[entry.partId] !== false;
  });
}
