export const TOUR_STEPS = [
  {
    id: 'welcome',
    target: null,
    title: 'Welcome to HueType',
    content:
      'Explore curated color and typography combos, customize them to your taste, and preview how they look on real UI layouts. This quick tour shows you where everything lives.',
    placement: 'center',
  },
  {
    id: 'presets',
    target: '[data-tour="presets"]',
    title: 'Browse presets',
    content:
      'Start from a curated combo in the library. Search, filter by mood or industry, and click a card to load it into your workspace.',
    placement: 'right',
    prepare: 'sidebar-workspace',
  },
  {
    id: 'customize',
    target: '[data-tour="nav-customize"]',
    title: 'Customize colors & type',
    content:
      'Fine-tune each color role and font pairing. Lock any role you want to keep — locked roles stay put when you shuffle.',
    placement: 'right',
    prepare: 'sidebar-workspace',
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
      'See your combo applied to realistic mockups — marketing pages, dashboards, pricing tables, and more. Click the info icon beside the device controls to view contrast checks and combo details.',
    placement: 'right',
  },
  {
    id: 'preview-controls',
    target: '[data-tour="preview-controls"]',
    title: 'Device frames',
    content:
      'Switch between desktop, tablet, and mobile widths to stress-test readability and layout at different breakpoints.',
    placement: 'bottom',
  },
  {
    id: 'components-panel',
    target: '[data-tour="components-panel"]',
    title: 'Preview components',
    content:
      'Pick a prototype layout and toggle individual sections on or off. Customize logo text to match your brand. Open these from the left sidebar.',
    placement: 'left',
    prepare: 'components-panel',
  },
  {
    id: 'toolbar',
    target: '[data-tour="toolbar"]',
    title: 'Save & export',
    content:
      'Heart a combo to save it under My Presets. Export copies CSS variables, Tailwind config, or JSON tokens to your clipboard.',
    placement: 'right',
    prepare: 'sidebar-workspace',
  },
  {
    id: 'finish',
    target: null,
    title: "You're all set",
    content:
      'Reopen Build Info from the sidebar footer anytime. Press Space to shuffle, and explore the design system catalog when you want to see what else is planned.',
    placement: 'center',
  },
];
