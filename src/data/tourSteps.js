export const TOUR_STEPS = [
  {
    id: 'welcome',
    target: null,
    title: 'Welcome to HueType',
    content:
      'Explore curated color and typography combos, customize them to your taste, and preview how they look on realistic UI layouts. This quick tour walks through the redesigned workspace.',
    placement: 'center',
  },
  {
    id: 'sidebar-nav',
    target: '[data-tour="sidebar-nav"]',
    title: 'Sidebar navigation',
    content:
      'The sidebar is grouped into Workspace (presets), Customize (colors & fonts), and Preview (layouts & options). Pick a section to open its panel on the right.',
    placement: 'right',
    compactPlacement: 'bottom',
    prepare: 'sidebar-workspace',
  },
  {
    id: 'presets',
    target: '[data-tour="presets"]',
    title: 'Browse presets',
    content:
      'Start from a curated combo in the library. Search, filter by mood or industry, and tap a card to load it into your workspace.',
    placement: 'left',
    compactPlacement: 'bottom',
    prepare: 'open-workspace',
  },
  {
    id: 'colors',
    target: '[data-tour="customize"]',
    title: 'Customize colors & type',
    content:
      'Open Colors to fine-tune each role, view scales, and lock what you want to keep. The Fonts tab works the same way for heading and body pairings.',
    placement: 'left',
    compactPlacement: 'bottom',
    prepare: 'open-colors',
  },
  {
    id: 'shuffle',
    target: '[data-tour="shuffle"]',
    title: 'Shuffle unlocked roles',
    content:
      'Use the shuffle button in the preview top bar. Lock roles in Colors or Fonts first, then shuffle the rest. Press Space anytime.',
    placement: 'bottom',
    compactPlacement: 'top',
    prepare: 'close-panels',
  },
  {
    id: 'live-preview',
    target: '[data-tour="live-preview"]',
    title: 'Live preview',
    content:
      'See your combo on realistic mockups. The WCAG pill opens contrast details; device toggles sit in the top bar.',
    placement: 'right',
    compactPlacement: 'top',
    prepare: 'close-panels',
  },
  {
    id: 'preview-controls',
    target: '[data-tour="preview-controls"]',
    title: 'Device frames',
    content:
      'Switch between desktop, tablet, and mobile widths to stress-test readability and layout at different breakpoints.',
    placement: 'bottom',
    compactPlacement: 'bottom',
    prepare: 'close-panels',
  },
  {
    id: 'archetype-bar',
    target: '[data-tour="archetype-bar"]',
    title: 'Favorite layouts',
    content:
      'Pin up to eight layouts in the quick-select bar below the preview. Use the slider button to pick favorites, or the dashed hint when the bar is empty.',
    placement: 'top',
    compactPlacement: 'top',
    prepare: 'close-panels',
  },
  {
    id: 'layout-groups',
    target: '[data-tour="layout-groups"]',
    compactTarget: '[data-tour="layout-groups-panel"]',
    title: 'Layout groups',
    content:
      'Layouts are organized into four groups — core, product essentials, strong secondary, and niche surfaces. Expand a group to browse its archetypes.',
    placement: 'right',
    compactPlacement: 'bottom',
    prepare: 'open-layouts-expanded',
  },
  {
    id: 'layout-search',
    target: '[data-tour="layout-search"]',
    compactTarget: '[data-tour="layout-search-panel"]',
    title: 'Search layouts',
    content:
      'Type to filter all 24 layouts instantly — match by name, description, or group. Results update as you type so you can jump to the right mockup fast.',
    placement: 'right',
    compactPlacement: 'bottom',
    prepare: 'open-layouts-expanded',
  },
  {
    id: 'prototypes',
    target: '[data-tour="components-panel"]',
    title: 'Layouts & preview options',
    content:
      'Use Options for per-layout section toggles and logo text. The sidebar and options panel share the same search and grouped layout list.',
    placement: 'left',
    compactPlacement: 'bottom',
    prepare: 'open-archetypes',
  },
  {
    id: 'toolbar',
    target: '[data-tour="export-footer"]',
    title: 'Save, share & export',
    content:
      'Heart a combo from the header icons under the logo, copy a shareable link, or use Export in the sidebar footer to download design tokens.',
    placement: 'right',
    compactPlacement: 'top',
    prepare: 'sidebar-workspace',
  },
  {
    id: 'export',
    target: '[data-tour="export-panel"]',
    title: 'Export workspace',
    content:
      'Choose a format — CSS, SCSS, Tailwind, JSON, Style Dictionary, and more. Preview the output, copy to clipboard, or download a file with color scales included.',
    placement: 'left',
    compactPlacement: 'bottom',
    prepare: 'open-export',
  },
  {
    id: 'build-info',
    target: '[data-tour="build-info"]',
    title: 'Build Info',
    content:
      'Version summary, tech stack pills, and feature accordions. Open the changelog in a new tab for full release notes, expand Tips for shortcuts, or restart this tour from the button below.',
    placement: 'left',
    compactPlacement: 'bottom',
    prepare: 'open-build-info',
  },
  {
    id: 'feature-catalog',
    target: '[data-tour="feature-catalog-footer"]',
    compactTarget: '[data-tour="feature-catalog"]',
    title: 'Feature Catalog',
    content:
      'Browse what is built today versus planned next — utility primitives, app features, and live preview archetypes. Filter by status to focus on the roadmap.',
    placement: 'left',
    compactPlacement: 'bottom',
    prepare: 'open-feature-catalog',
  },
  {
    id: 'finish',
    target: null,
    title: "You're all set",
    content:
      'Build Info and Feature Catalog live in the sidebar footer. Press ? for shortcuts, Space to shuffle, and export when you are ready to ship tokens.',
    placement: 'center',
    prepare: 'close-export',
  },
];
