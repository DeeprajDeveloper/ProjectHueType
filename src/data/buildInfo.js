/** App build metadata — shown in Build Info panel */

export const APP_VERSION = '1.0.0';
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
  'v1.0 is the first major release: inspect any element in the live preview, search layouts instantly, and explore 24 interactive archetypes with a clearer, more intuitive shell.',
];

export const WHATS_NEW_HIGHLIGHTS = {
  title: 'HueType 1.0 — built for everyday use',
  intro: 'This major release focuses on discoverability and hands-on exploration — find layouts faster, inspect real styles on the canvas, and lift CSS straight into your project.',
  items: [
    {
      title: 'Style inspector',
      body: 'Toggle Inspect in the preview bar (or press I) to place dots on key elements. Click any dot for typography, colors, palette roles, WCAG contrast, and copy-ready CSS or Tailwind.',
    },
    {
      title: 'Draggable inspect popup',
      body: 'Drag the inspector panel by its header to reposition it in the preview. A live connector line links the panel to the element you are inspecting.',
    },
    {
      title: 'Layout search',
      body: 'Search all 24 archetypes from the sidebar or Preview → Layouts — filter by name, group, or keyword without expanding every group.',
    },
    {
      title: '24 interactive layouts',
      body: 'Groups 1–4 cover marketing through niche surfaces — kanban drag-and-drop, mobile app tabs, calendar picker, media scrubber, and more — with grouped navigation and New badges on recent additions.',
    },
  ],
};

export const BUILD_FEATURES = [
  'Grouped sidebar — Workspace, Customize, and Preview with expandable layout groups and layout search',
  'Collapsed sidebar icon rail with popover menus for Customize (colors/fonts) and Layouts',
  'Style inspector — dot markers on preview elements with typography, color, WCAG, and CSS/Tailwind copy',
  'Draggable inspector popup with connector line; press I to toggle inspect mode',
  'Preview top bar — live label, WCAG contrast button, Inspect toggle, device frame, and shuffle',
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
    version: '1.0.0',
    label: 'Major release — inspector, layouts & intuitive exploration',
    date: '2026-07-03',
    summary: [
      'HueType 1.0 is the first major release — focused on making the product feel usable and intuitive from the first session.',
      'A style inspector lets you click any tagged element in the live preview, read computed styles, check WCAG contrast, apply fix chips, and copy CSS or Tailwind.',
      'Twelve new layout archetypes in Groups 3 and 4 join the existing set — 24 interactive previews in total, with kanban, mobile app, calendar, media player, and more.',
      'Layout search, grouped sidebar navigation, mobile shell polish, a dedicated changelog page, and a refreshed what\'s new modal round out the release.',
    ],
    changes: [
      'Style inspector overlay — Inspect toggle and I shortcut; accent dots on major elements across all 24 archetypes',
      'Inspection popup — typography, colors, palette role labels, WCAG AA/AAA badges, and one-click copy for CSS or Tailwind',
      'WCAG fix chips in the inspector — darken text or lighten background to pass AA without leaving the preview',
      'Draggable inspector popup — reposition by dragging the header; animated connector line links dot to panel',
      'Scrollable preview support — dots track elements in nested scroll areas as you move through long layouts',
      'Layout search — filter archetypes by name or keyword in the sidebar (expanded and collapsed) and Preview → Layouts',
      'Group 3 archetypes — documentation, kanban, analytics report, profile, billing, and search results',
      'Group 4 archetypes — email, mobile app, waitlist, 404, calendar, and media player',
      'Interactive mockups — kanban drag-and-drop, mobile app tabs, calendar day picker, draggable media scrubber',
      'Dashboard charts — on-load animations, richer data labels, responsive flex grid',
      'Grouped sidebar layouts — expandable groups with nested archetypes, persisted open state, and New badges',
      'Product tour — steps for grouped layout navigation and layout search',
      'What\'s new modal — desktop illustration, release highlights, and changelog link for returning users',
      'WCAG contrast button — bordered control with status badge, Details label, and chevron in the preview bar',
      'Typescale base px input — draft while typing, commit on blur or Enter',
      'Changelog page at /changelog — sticky brand nav and scroll-linked version timeline',
      'Mobile viewport — sidebar locked collapsed at ≤639px, safe-area padding, softer panel backdrop, centered toasts',
      'Standalone page scroll for /privacy and /changelog; persisted layout expand/collapse and preview device mode',
      'Help shortcuts — Mac and Windows labels; theme-aware favicons and logos',
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
  'Press I or click Inspect in the preview bar to turn on the style inspector — click any dot to read styles and copy CSS.',
  'Search layouts from the sidebar or Preview → Layouts to jump to an archetype without expanding every group.',
  'Sidebar groups: Workspace (presets), Customize (colors & fonts), Preview (layouts & options).',
  'When collapsed, use the Customize and Layouts icons — they open flyout menus to the right.',
  'Expand Layouts to browse Groups 1–4 — Groups 3 and 4 are marked New.',
  'Pin favorite layouts in the chip bar below the preview via the slider customize button.',
  'Tap the WCAG contrast button in the preview top bar — status on the left, Details on the right.',
  'Export lives in the sidebar footer; theme, share, and save are under the HueType logo.',
  'Press ? for shortcuts, Space to shuffle unlocked roles, and open full release notes from Build Info.',
];
