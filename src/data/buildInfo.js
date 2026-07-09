/** App build metadata — shown in Build Info panel */

export const APP_VERSION = '1.0.2';
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
  'v1.0+ adds a full style inspector with single, All, and Dock modes — inspect one element, float every panel on the canvas, or dock them into the right sidebar as collapsible accordions.',
];

export const WHATS_NEW_HIGHLIGHTS = {
  title: 'HueType 1.0.2 — edit prototype copy & preview sections',
  intro: 'Customize live preview text from the sidebar, toggle layout sections in a dedicated panel, and see a resizing overlay when switching device frames.',
  items: [
    {
      title: 'Edit prototype',
      body: 'Open Edit prototype under Live Prototypes to change logo text and key copy fields — hero headlines, CTAs, waitlist text, and more. Edits update the preview instantly and persist in local storage.',
    },
    {
      title: 'Toggle prototype sections',
      body: 'Section visibility now lives in its own panel. Show or hide navbar, hero, charts, and other parts per layout without mixing them with content editing.',
    },
    {
      title: 'Resizing preview overlay',
      body: 'Switching desktop, tablet, or mobile frames — or changing layouts — shows a brief “Resizing Preview” overlay while the frame animates to its new size.',
    },
    {
      title: 'Inspector modes (recap)',
      body: 'Press I or use Inspect in the preview bar for single, All, or Dock inspector layouts with typography, WCAG contrast, fix chips, and copy-ready CSS or Tailwind.',
    },
  ],
};

export const BUILD_FEATURES = [
  'Grouped sidebar — Workspace, Customize, and Preview with expandable layout groups and layout search',
  'Collapsed sidebar icon rail with popover menus for Customize (colors/fonts) and Layouts',
  'Style inspector — dot markers on preview elements with typography, color, WCAG, and CSS/Tailwind copy',
  'Inspector modes — single popup, All (floating panels on the preview), and Dock (accordions in the right sidebar)',
  'Draggable inspector popup with animated connector line; press I to toggle inspect mode',
  'Preview top bar — live label, WCAG contrast button, Inspect toggle, device frame, and shuffle',
  'Edit prototype — customize logo text and key preview copy with changes saved to local storage',
  'Toggle prototype sections — dedicated panel to show or hide layout parts per archetype',
  'Resizing preview overlay — brief “Resizing Preview” state while device frames animate',
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
    version: '1.0.2',
    label: 'Edit prototype copy & preview sections',
    date: '2026-07-08',
    summary: [
      'Live preview text is now editable from the sidebar — logo, hero copy, waitlist headlines, and more update in real time.',
      'Preview options split into Edit prototype and Toggle prototype sections for clearer workflows.',
      'A resizing overlay appears briefly when switching device frames or layouts while the preview animates.',
    ],
    changes: [
      'Edit prototype panel — logo text plus grouped copy fields for marketing, waitlist, and 404 layouts',
      'Preview copy overrides persisted in local storage and merged with default mockup copy',
      'Toggle prototype sections panel — per-archetype section visibility separated from content editing',
      'Sidebar Live Prototypes group — Edit prototype and Toggle prototype sections replace the single Options item',
      'Keyboard shortcuts — Alt+5 opens Edit prototype; Alt+0 opens Toggle prototype sections',
      'Resizing preview overlay — “Resizing Preview” message while desktop, tablet, or mobile frames transition',
      'Product tour and build info updated for the new preview panels and resize feedback',
    ],
  },
  {
    version: '1.0.1',
    label: 'Inspector All & Dock modes',
    date: '2026-07-08',
    summary: [
      'The style inspector gains two new layout modes alongside the existing single-element popup.',
      'All mode stacks compact inspector panels along the right edge of the preview — each linked to its dot by an animated connector. Panels are draggable by header.',
      'Dock mode moves every inspect panel into the right side panel as collapsible accordions (one per element, collapsed by default). Connectors span from preview dots to the matching accordion trigger.',
      'Inspector popups now use accordions for Styles, Accessibility, and Export code; the what\'s new modal and build info were updated for this release.',
    ],
    changes: [
      'All inspect mode — Inspect → All shows every element panel on the right of the preview with connector lines',
      'Draggable All-mode panels — reposition any panel by dragging its header; manual positions persist until mode is toggled off',
      'Dock inspect mode — Inspect → Dock opens the right sidebar with one accordion per inspectable element',
      'Dock accordions default collapsed — expand to reveal nested Styles, Accessibility, and Export sections (also collapsed in compact layout)',
      'Click a preview dot in Dock mode to highlight and expand the matching sidebar accordion',
      'Viewport-spanning connector lines in Dock mode link preview dots to sidebar accordion triggers',
      'Mutually exclusive inspect layouts — All and Dock cannot be active at the same time; turning off Inspect resets both',
      'Inspector popup accordions — Styles, Accessibility, and Export code in single and All modes; Styles open by default on desktop',
      'Extracted shared InspectorPopupContent for popup, All, and Dock panel bodies',
      'Fixed AppShell initialization order so the app loads correctly with Dock mode wired to the components sidebar',
    ],
  },
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
  'Open Edit prototype under Live Prototypes to change logo text and key preview copy — saved automatically.',
  'Use Toggle prototype sections to show or hide navbar, hero, charts, and other parts per layout.',
  'Press I or click Inspect in the preview bar to turn on the style inspector — click any dot to read styles and copy CSS.',
  'Use All to float every inspect panel on the preview, or Dock to move them into the right sidebar as collapsed accordions.',
  'Search layouts from the sidebar or Preview → Layouts to jump to an archetype without expanding every group.',
  'Sidebar groups: Workspace (presets), Customize (colors & fonts), Live Prototypes (layouts, edit copy, toggle sections).',
  'When collapsed, use the Customize and Layouts icons — they open flyout menus to the right.',
  'Expand Layouts to browse Groups 1–4 — marketing through niche surfaces.',
  'Pin favorite layouts in the chip bar below the preview via the slider customize button.',
  'Tap the WCAG contrast button in the preview top bar — status on the left, Details on the right.',
  'Export lives in the sidebar footer; theme, share, and save are under the HueType logo.',
  'Press ? for shortcuts, Space to shuffle unlocked roles, and open full release notes from Build Info.',
];
