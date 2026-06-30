export const PREVIEW_ARCHETYPES = [
  {
    id: 'marketing',
    label: 'Common Website Design',
    description: 'Navbar, hero, feature cards, testimonials, contact form, and footer.',
  },
  {
    id: 'dashboard',
    label: 'Corporate Dashboard',
    description: 'Sidebar nav, charts, issues tracker, data table, and profile settings.',
  },
  {
    id: 'pricing',
    label: 'Pricing table',
    description: 'Tier comparison layout with dense feature lists and CTAs.',
  },
  {
    id: 'blog',
    label: 'Blog / article',
    description: 'Long-form headings and body copy for readability testing.',
  },
  {
    id: 'ecommerce',
    label: 'E-commerce product',
    description: 'Product cards with image placeholders, price, and buy buttons.',
  },
];

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
    { id: 'pageHeader', label: 'Page header' },
    { id: 'pricingTiers', label: 'Pricing tiers' },
  ],
  blog: [
    { id: 'articleHeader', label: 'Article header' },
    { id: 'articleBody', label: 'Article body' },
  ],
  ecommerce: [
    { id: 'sectionHeader', label: 'Section header' },
    { id: 'productCards', label: 'Product cards' },
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

export function isArchetypePreviewEmpty(archetype, partsForArchetype) {
  if (!partsForArchetype) return false;
  return Object.values(partsForArchetype).every((visible) => !visible);
}
