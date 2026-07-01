/** App build metadata — shown in Build Info panel */

export const APP_VERSION = '0.2.0';

export const BUILD_STACK = [
  { label: 'Framework', value: 'React 19' },
  { label: 'Bundler', value: 'Vite 6' },
  { label: 'Icons', value: 'Phosphor Icons' },
];

export const BUILD_FEATURES = [
  '17 curated palette + font presets with mood, industry, and mode filters',
  '12 live mockup archetypes across two groups — marketing, dashboard, auth, chat, and more',
  'Desktop, tablet, and mobile preview frames with toggleable sections',
  'Responsive layout — icon rail + slide-over panels on tablet and mobile',
  'In-place export panel with copy, download, and tabbed format picker on mobile',
  'Color scale visualizer with HSL steps and usage demos',
  'Typography scale with adjustable base size and ratio',
  'WCAG contrast panel with grouped results, fix suggestions, and per-card reset',
  'Shuffle with role locks and floating button on the live preview (Space bar shortcut)',
  'Keyboard shortcuts for panels, preview devices, shuffle, and help (? key)',
  'Help panel with full shortcuts reference',
  'Save favorites, shareable URLs, and short preset links',
  'Feature catalog with built / planned filters',
  'Light / dark app chrome',
];

export const BUILD_CHANGELOG = [
  {
    version: '0.2.0',
    label: 'Responsive layout & prototype expansion',
    changes: [
      'Tablet and mobile compact layout with persistent icon rail and slide-over options panel',
      'Mobile preview defaults to mobile device frame; refined caption and control bar layout',
      'Six new Group 2 archetypes — auth, chat, onboarding, settings, empty state, notifications',
      'Preview part toggles moved to Prototypes → Preview settings',
      'Export moved from modal to in-place panel; tabbed format picker on mobile',
      'Help panel with keyboard shortcuts; shuffle moved to floating button on live preview',
      'Keyboard shortcuts for nav panels (Alt+1–9), devices (Alt+D/T/M), shuffle (Space), and help (?)',
      'Clean URL on first launch; short ?combo=preset-id links for unmodified presets',
      'Centralized mockup copy config for editable preview text',
    ],
  },
  {
    version: '0.1.0',
    label: 'Initial prototype',
    changes: [
      'Curated presets with filters, live preview archetypes, and WCAG contrast checking',
      'Color and typography customization with role locks and shuffle',
      'Save favorites, export tokens, and shareable combo URLs',
      'Product tour, feature catalog, and build info panel',
    ],
  },
];

export const BUILD_NOTES = [
  'On tablet and mobile, use the left icon rail to open panels — they slide in without covering the nav.',
  'Right-panel sections open from the left nav — click the same item again to close the panel.',
  'Use the info button on the live preview for WCAG contrast on the active combo.',
  'Open Help from the sidebar footer for keyboard shortcuts, or press ?.',
  'Restart the walkthrough from Build Info, or browse the Feature Catalog for the roadmap.',
];
