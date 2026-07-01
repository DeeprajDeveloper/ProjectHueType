export const TOUR_STEPS = [
  {
    id: 'welcome',
    target: null,
    title: 'Welcome to HueType',
    content:
      'Explore curated color and typography combos, customize them to your taste, and preview how they look on realistic UI layouts. This quick tour walks through the updated workspace.',
    placement: 'center',
  },
  {
    id: 'sidebar-nav',
    target: '[data-tour="sidebar-nav"]',
    title: 'Sidebar navigation',
    content:
      'Use the left sidebar to switch sections — My Workspace, My Presets, Colors, Fonts, and Prototypes. Each selection opens its panel on the right.',
    placement: 'right',
    prepare: 'sidebar-workspace',
  },
  {
    id: 'presets',
    target: '[data-tour="presets"]',
    title: 'Browse presets',
    content:
      'Start from a curated combo in the library. Search, filter by mood or industry, and click a card to load it into your workspace.',
    placement: 'left',
    prepare: 'open-workspace',
  },
  {
    id: 'colors',
    target: '[data-tour="customize"]',
    title: 'Customize colors & type',
    content:
      'Open Colors to fine-tune each role, view scales, and lock what you want to keep. The Fonts tab works the same way for heading and body pairings.',
    placement: 'left',
    prepare: 'open-colors',
  },
  {
    id: 'shuffle',
    target: '[data-tour="shuffle"]',
    title: 'Shuffle unlocked roles',
    content:
      'Happy with some choices but want fresh ideas? Shuffle randomizes every unlocked role. Press Space anytime for a quick shuffle.',
    placement: 'right',
    prepare: 'sidebar-workspace',
  },
  {
    id: 'live-preview',
    target: '[data-tour="live-preview"]',
    title: 'Live preview',
    content:
      'See your combo on realistic mockups — marketing pages, dashboards, pricing tables, and more. The info button beside the contrast badge opens WCAG details.',
    placement: 'right',
    prepare: 'close-panels',
  },
  {
    id: 'preview-controls',
    target: '[data-tour="preview-controls"]',
    title: 'Device frames',
    content:
      'Switch between desktop, tablet, and mobile widths to stress-test readability and layout at different breakpoints.',
    placement: 'bottom',
    prepare: 'close-panels',
  },
  {
    id: 'prototypes',
    target: '[data-tour="components-panel"]',
    title: 'Prototypes & preview options',
    content:
      'Under Prototypes, pick a layout archetype and toggle individual sections. Options lets you customize logo text shown across mockups.',
    placement: 'left',
    prepare: 'open-archetypes',
  },
  {
    id: 'toolbar',
    target: '[data-tour="toolbar"]',
    title: 'Save, share & export',
    content:
      'Heart a combo to save it under My Presets, copy a shareable link, or open Export to copy or download design tokens.',
    placement: 'right',
    prepare: 'sidebar-workspace',
  },
  {
    id: 'export',
    target: '[data-tour="export-panel"]',
    title: 'Export workspace',
    content:
      'Choose a format — CSS, SCSS, Tailwind, JSON, Style Dictionary, and more. Preview the output, copy to clipboard, or download a file with color scales included.',
    placement: 'left',
    prepare: 'open-export',
  },
  {
    id: 'build-info',
    target: '[data-tour="build-info"]',
    title: 'Build Info',
    content:
      'Version, tech stack, shipped features, and tips for getting around. You can restart this tour anytime from the button at the bottom of this panel.',
    placement: 'left',
    prepare: 'open-build-info',
  },
  {
    id: 'feature-catalog',
    target: '[data-tour="feature-catalog"]',
    title: 'Feature Catalog',
    content:
      'Browse what is built today versus planned next — utility primitives, app features, and live preview archetypes. Filter by status to focus on the roadmap.',
    placement: 'left',
    prepare: 'open-feature-catalog',
  },
  {
    id: 'finish',
    target: null,
    title: "You're all set",
    content:
      'Build Info and Feature Catalog live in the sidebar footer. Press Space to shuffle, and export your combo when you are ready to ship tokens to code.',
    placement: 'center',
    prepare: 'close-export',
  },
];
