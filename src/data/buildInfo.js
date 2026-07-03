/** App build metadata — shown in Build Info panel */

export const APP_VERSION = '0.3.2';
export const APP_NAME = 'HueType';
export const APP_SITE_URL = 'https://huetype.dev';
export const APP_SITE_HOST = 'huetype.dev';
export const APP_COPYRIGHT_START_YEAR = 2026;
export const GITHUB_REPO_URL = 'https://github.com/DeeprajDeveloper/ProjectHueType';
export const PRIVACY_POLICY_PATH = '/privacy';
export const CHANGELOG_PATH = '/changelog';
export const CONTACT_EMAIL = 'hello@huetype.dev';

export const BUILD_STACK = [
  'React 19',
  'Vite 6',
  'Phosphor Icons',
  'SCSS',
];

export const BUILD_SUMMARY = [
  'Pair color palettes and fonts, preview them on realistic mockups, check WCAG contrast, and export tokens — all in one workspace.',
  'v0.3.2 ships 12 new layout archetypes across Groups 3 and 4 — docs, kanban, email, mobile app, calendar, and more — with interactive mockups and grouped sidebar navigation.',
];

export const WHATS_NEW_HIGHLIGHTS = {
  title: '12 new layout archetypes',
  intro: 'Groups 3 and 4 are live with interactive previews — drag cards on the kanban board, browse tabs in the mobile app, scrub the media player, and more.',
  items: [
    {
      title: 'Group 3 — Strong secondary',
      body: 'Documentation, kanban board, analytics report, profile, billing, and search results — each with toggleable preview sections.',
    },
    {
      title: 'Group 4 — Niche & differentiated',
      body: 'Email template, mobile app, waitlist, 404 page, calendar, and media player — specialized surfaces with buttons, filters, and live interactions.',
    },
    {
      title: 'Grouped layout navigation',
      body: 'Layouts in the sidebar now expand by group with nested archetypes, persisted open state, and New badges on Groups 3 and 4.',
    },
    {
      title: 'Richer dashboard & analytics',
      body: 'Animated chart load-ins, a report-style analytics layout, and responsive chart grids for tablet and mobile preview frames.',
    },
  ],
};

export const BUILD_FEATURES = [
  'Grouped sidebar — Workspace, Customize, and Preview with expandable layout groups',
  'Collapsed sidebar icon rail with popover menus for Customize (colors/fonts) and Layouts',
  'Preview top bar — live label, WCAG contrast button with status + Details affordance, device toggle, and shuffle',
  'Favorite layout quick-select below the preview with customizable chips (up to 8)',
  '17 curated presets with mood, industry, and mode filters plus saved library',
  '24 live mockup archetypes — marketing, dashboard, kanban, email, mobile app, calendar, and more',
  'Interactive previews — kanban drag-and-drop, mobile app tabs, calendar day picker, media scrubber',
  'Colors and fonts panels with role locks, scales, editable typography base size, and ratio controls',
  'In-place export panel with copy, download, and mobile-friendly format tabs',
  'WCAG contrast panel with grouped results, fix suggestions, and per-role reset',
  'Save favorites, shareable combo URLs, short preset links, and feedback to hello@huetype.dev',
  'Feature catalog with built/planned filters and accordion component cards',
  'Product tour, what\'s new modal for returning users, help panel (?), keyboard shortcuts, and light/dark chrome',
  'Standalone privacy and changelog pages with document scroll and sticky navigation',
];

export const BUILD_CHANGELOG = [
  {
    version: '0.3.2',
    label: '12 new archetypes & interactive previews',
    date: '2026-07-03',
    summary: [
      'Groups 3 and 4 add 12 layout archetypes — docs, kanban, analytics, profile, billing, search, email, mobile app, waitlist, 404, calendar, and media player.',
      'Mockups are interactive where it matters: kanban drag-and-drop, mobile browse/saved/profile tabs, calendar day selection, and a draggable media scrubber.',
      'Sidebar layouts use three-level grouped navigation with New badges; returning users see a what\'s new modal after completing the product tour.',
    ],
    changes: [
      'Group 3 archetypes — documentation, kanban, analytics report, profile, billing, and search results',
      'Group 4 archetypes — email, mobile app, waitlist, 404, calendar, and media player',
      'Kanban — drag cards between columns, inline add card, hover delete',
      'Analytics — report-style layout with executive summary, figures, and findings',
      'Dashboard charts — on-load animations, richer data labels, responsive flex grid',
      'Mobile app — Home, Browse, Saved, and Profile tabs with filters and toggles',
      'Calendar — full-height month grid, day selection, compact mobile layout with event dots',
      'Media player — draggable progress slider with live timestamps; play, shuffle, repeat toggles',
      'Grouped sidebar layouts — expandable groups with nested archetypes and persisted open state',
      'New badges on Group 3 and Group 4 layouts in sidebar and quick-select',
      'What\'s new modal — shown once per release for users who completed the product tour',
    ],
  },
  {
    version: '0.3.1',
    label: 'Mobile polish, changelog & contrast UX',
    date: '2026-07-03',
    summary: [
      'Mobile shell keeps the sidebar collapsed with slide-over panels, safe-area padding, and a mobile-aware product tour.',
      'Typography scale base size is editable again; privacy and changelog pages scroll correctly on all devices.',
      'WCAG contrast is easier to discover in the preview bar, and full release notes live on a dedicated changelog page.',
    ],
    changes: [
      'WCAG contrast button — bordered control with status badge, Details label, and chevron; shorter labels on mobile',
      'Typescale base px input — draft while typing, commit on blur or Enter instead of snapping to min/max',
      'Standalone page scroll — shared document-scroll unlock for /privacy and /changelog with early route class',
      'Changelog page at /changelog — sticky brand nav and scroll-linked version timeline',
      'Build Info shortened — summary, stack, links, changelog button, and accordions only',
      'Mobile viewport — sidebar locked collapsed at ≤639px, softer panel backdrop, centered toasts',
      'Persisted layouts expand/collapse and preview device mode across sessions',
      'Help shortcuts — Mac and Windows labels via userAgentData with userAgent fallback',
      'Theme-aware favicons and logos; Vercel SPA rewrites for client-side routes',
    ],
  },
  {
    version: '0.3.0',
    label: 'Sidebar redesign & favorite layouts',
    date: '2026-07-01',
    summary: [
      'Navigation is reorganized into Workspace, Customize, and Preview groups with export promoted to the sidebar footer.',
      'The live preview top bar now shows a compact label, WCAG pill, text device toggle, and shuffle beside a favorite layout chip bar.',
      'Users can pin up to eight layouts in the quick-select bar, deselect all favorites, and reopen the customize picker from an empty-state hint.',
      'Collapsed sidebar keeps the same structure with icon tooltips and flyout menus for Customize and Layouts instead of a separate rail.',
      'Build Info, help copy, and the product tour were updated to match the new shell and responsive behavior.',
    ],
    changes: [
      'Redesigned left sidebar — grouped nav, header actions under logo, 200px width, consistent collapsed structure',
      'Preview top bar — simplified heading, WCAG pill (opens contrast panel), text frame toggle with active dark fill',
      'Archetype quick-select below preview with customize panel, empty dashed placeholder, and persistent favorites',
      'Collapsed sidebar popovers for Customize and Layouts; tooltips above live preview with correct z-index',
      'Export button moved to sidebar footer; theme, share, and save icons under brand',
      'Feedback modal with mailto delivery to hello@huetype.dev',
      'Feature catalog accordions for built and planned components',
      'Nav state persistence for active panel and layout expand/collapse',
      'Right panel typography normalized to body scale across options and customize panels',
      'Build Info panel — stack pills, summary, accordions, and inline changelog timeline',
    ],
  },
  {
    version: '0.2.0',
    label: 'Responsive layout & prototype expansion',
    date: '2026-06-30',
    summary: [
      'Compact layout for tablet and mobile with slide-over options panel and locked viewport height.',
      'Six Group 2 archetypes added — auth, chat, onboarding, settings, empty state, and notifications.',
      'Export became an in-place panel; shuffle moved to the preview toolbar with keyboard support.',
      'Help panel, feature catalog filters, URL cleanup on first launch, and short preset links shipped in this release.',
    ],
    changes: [
      'Tablet and mobile compact layout with persistent icon rail and slide-over options panel',
      'Mobile preview defaults to mobile device frame; refined caption and control bar layout',
      'Six new Group 2 archetypes — auth, chat, onboarding, settings, empty state, notifications',
      'Preview part toggles moved to Preview → Options',
      'Export moved from modal to in-place panel; tabbed format picker on mobile',
      'Help panel with keyboard shortcuts',
      'Keyboard shortcuts for nav panels (Alt+1–9), devices (Alt+D/T/M), shuffle (Space), and help (?)',
      'Clean URL on first launch; short ?combo=preset-id links for unmodified presets',
      'Centralized mockup copy config for editable preview text',
    ],
  },
  {
    version: '0.1.0',
    label: 'Initial prototype',
    date: '2026-06-29',
    summary: [
      'First public prototype with curated presets, live preview archetypes, and WCAG contrast checking.',
      'Color and typography customization with role locks and shuffle introduced the core HueType workflow.',
      'Save favorites, export tokens, shareable combo URLs, and an early product tour rounded out the MVP.',
    ],
    changes: [
      'Curated presets with filters, live preview archetypes, and WCAG contrast checking',
      'Color and typography customization with role locks and shuffle',
      'Save favorites, export tokens, and shareable combo URLs',
      'Product tour, feature catalog, and build info panel',
    ],
  },
];

export const BUILD_NOTES = [
  'Sidebar groups: Workspace (presets), Customize (colors & fonts), Preview (layouts & options).',
  'When collapsed, use the Customize and Layouts icons — they open flyout menus to the right.',
  'Expand Layouts to browse Groups 1–4 — Groups 3 and 4 are marked New.',
  'Pin favorite layouts in the chip bar below the preview via the slider customize button.',
  'Tap the WCAG contrast button in the preview top bar — status on the left, Details on the right.',
  'Export lives in the sidebar footer; theme, share, and save are under the HueType logo.',
  'Press ? for shortcuts, Space to shuffle unlocked roles, and open full release notes from Build Info.',
];
