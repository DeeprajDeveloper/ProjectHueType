/**
 * Curated palette + font combo seed library (FR1)
 * Grounded in real-world brand patterns from instructions/03
 */

export const MOODS = [
  'Trustworthy',
  'Energetic',
  'Warm',
  'Minimal',
  'Elegant',
  'Earthy',
  'Professional',
  'Bold',
  'Corporate',
  'Dark',
];

export const INDUSTRIES = [
  'SaaS',
  'Fintech',
  'Media',
  'Marketing',
  'Community',
  'Lifestyle',
  'Productivity',
  'Fashion',
  'Wellness',
  'Finance',
  'Events',
  'B2B',
  'Tech',
  'AI',
];

export const COLOR_FAMILIES = [
  'Blue',
  'Green',
  'Yellow',
  'Coral',
  'Neutral',
  'Navy',
  'Burgundy',
  'Earth',
  'Dark',
];

export const COMBOS = [
  {
    id: 'modern-saas-blue',
    name: 'Modern SaaS Blue',
    inspiredBy: 'Webflow',
    mood: ['Trustworthy'],
    industry: ['SaaS', 'Fintech'],
    colorFamily: 'Blue',
    mode: 'light',
    colors: {
      primary: '#146EF5',
      secondary: '#E8F0FE',
      accent: '#C95010',
      background: '#FFFFFF',
      text: '#1A1A2E',
    },
    fonts: {
      heading: { family: 'Inter', weight: '700', googleId: 'Inter' },
      body: { family: 'Inter', weight: '400', googleId: 'Inter' },
    },
    whyItWorks:
      'High-saturation blue against white with an orange accent — a recurring SaaS pattern that reads trustworthy and stable.',
  },
  {
    id: 'stripe-precision',
    name: 'Stripe Precision',
    inspiredBy: 'Stripe',
    mood: ['Trustworthy', 'Minimal'],
    industry: ['Fintech', 'SaaS', 'Tech'],
    colorFamily: 'Neutral',
    mode: 'light',
    colors: {
      primary: '#0A2540',
      secondary: '#F6F9FC',
      accent: '#635BFF',
      background: '#FFFFFF',
      text: '#0A2540',
    },
    fonts: {
      heading: { family: 'Sora', weight: '600', googleId: 'Sora' },
      body: { family: 'Inter', weight: '400', googleId: 'Inter' },
    },
    whyItWorks:
      'Geometric sans with sharp structure and clean precision — precise rather than playful, ideal for developer-first products.',
  },
  {
    id: 'spotify-energy',
    name: 'Spotify Energy',
    inspiredBy: 'Spotify',
    mood: ['Energetic'],
    industry: ['Media', 'Tech'],
    colorFamily: 'Green',
    mode: 'dark',
    colors: {
      primary: '#1DB954',
      secondary: '#282828',
      accent: '#1ED760',
      background: '#121212',
      text: '#FFFFFF',
    },
    fonts: {
      heading: { family: 'Poppins', weight: '700', googleId: 'Poppins' },
      body: { family: 'Inter', weight: '400', googleId: 'Inter' },
    },
    whyItWorks:
      'Rounded geometric sans with a saturated green accent on dark — energetic but modern, not chaotic.',
  },
  {
    id: 'mailchimp-bold',
    name: 'Mailchimp Bold',
    inspiredBy: 'Mailchimp',
    mood: ['Energetic', 'Bold'],
    industry: ['Marketing'],
    colorFamily: 'Yellow',
    mode: 'dark',
    colors: {
      primary: '#FFE01B',
      secondary: '#3D3529',
      accent: '#FFE01B',
      background: '#241C15',
      text: '#FFFFFF',
    },
    fonts: {
      heading: { family: 'Poppins', weight: '700', googleId: 'Poppins' },
      body: { family: 'Work Sans', weight: '400', googleId: 'Work+Sans' },
    },
    whyItWorks:
      'Bold yellow against near-black — extremely high contrast and high recognizability with warmth that avoids feeling cold.',
  },
  {
    id: 'airbnb-warm',
    name: 'Airbnb Warm',
    inspiredBy: 'Airbnb',
    mood: ['Warm'],
    industry: ['Community', 'Lifestyle'],
    colorFamily: 'Coral',
    mode: 'light',
    colors: {
      primary: '#FF5A5F',
      secondary: '#F7F7F7',
      accent: '#FF5A5F',
      background: '#FFFFFF',
      text: '#484848',
    },
    fonts: {
      heading: { family: 'Nunito Sans', weight: '700', googleId: 'Nunito+Sans' },
      body: { family: 'Nunito Sans', weight: '400', googleId: 'Nunito+Sans' },
    },
    whyItWorks:
      'Rounded letterforms with warm coral on neutral background — approachable without losing legitimacy.',
  },
  {
    id: 'florist-elegant',
    name: 'Florist Elegant',
    inspiredBy: 'Tesori Design',
    mood: ['Warm', 'Elegant'],
    industry: ['Lifestyle'],
    colorFamily: 'Coral',
    mode: 'light',
    colors: {
      primary: '#4A4A4A',
      secondary: '#F5EDE8',
      accent: '#8A6E6B',
      background: '#FAF7F5',
      text: '#3D3D3D',
    },
    fonts: {
      heading: { family: 'Libre Baskerville', weight: '700', googleId: 'Libre+Baskerville' },
      body: { family: 'Open Sans', weight: '400', googleId: 'Open+Sans' },
    },
    whyItWorks:
      'Serif heading with simple sans body — elegant yet easy to read, with dusty rose accent adding refinement.',
  },
  {
    id: 'notion-minimal',
    name: 'Notion Minimal',
    inspiredBy: 'Notion / Figma / Linear',
    mood: ['Minimal'],
    industry: ['Productivity', 'SaaS'],
    colorFamily: 'Neutral',
    mode: 'light',
    colors: {
      primary: '#111111',
      secondary: '#F8F8F8',
      accent: '#1A2B4A',
      background: '#FFFFFF',
      text: '#37352F',
    },
    fonts: {
      heading: { family: 'Inter', weight: '600', googleId: 'Inter' },
      body: { family: 'Inter', weight: '400', googleId: 'Inter' },
    },
    whyItWorks:
      'Whitespace-led pattern lets typography carry visual weight — the background does real work rather than sitting empty.',
  },
  {
    id: 'vogue-editorial',
    name: 'Vogue Editorial',
    inspiredBy: 'Vogue',
    mood: ['Elegant'],
    industry: ['Fashion'],
    colorFamily: 'Burgundy',
    mode: 'light',
    colors: {
      primary: '#1A1A1A',
      secondary: '#F5F5F5',
      accent: '#8B2942',
      background: '#FFFFFF',
      text: '#1A1A1A',
    },
    fonts: {
      heading: { family: 'Playfair Display', weight: '700', googleId: 'Playfair+Display' },
      body: { family: 'Source Sans 3', weight: '400', googleId: 'Source+Sans+3' },
    },
    whyItWorks:
      'Classical serif heading against clean sans body — the most reliable premium editorial formula.',
  },
  {
    id: 'wellness-earth',
    name: 'Wellness Earth',
    inspiredBy: '2026 grounded trend',
    mood: ['Earthy'],
    industry: ['Wellness'],
    colorFamily: 'Earth',
    mode: 'light',
    colors: {
      primary: '#8B5E3C',
      secondary: '#E8E0D5',
      accent: '#2D6A4F',
      background: '#FAF8F5',
      text: '#2C2C2C',
    },
    fonts: {
      heading: { family: 'Fraunces', weight: '600', googleId: 'Fraunces' },
      body: { family: 'Karla', weight: '400', googleId: 'Karla' },
    },
    whyItWorks:
      'Warm browns and forest greens signal stability and real-world grounding — quiet, unflashy work for trust industries.',
  },
  {
    id: 'financial-trust',
    name: 'Financial Trust',
    inspiredBy: 'Tesori Design',
    mood: ['Professional'],
    industry: ['Finance'],
    colorFamily: 'Neutral',
    mode: 'light',
    colors: {
      primary: '#3D4F5F',
      secondary: '#F0EDE8',
      accent: '#B08968',
      background: '#FAFAF8',
      text: '#2D3436',
    },
    fonts: {
      heading: { family: 'Libre Baskerville', weight: '700', googleId: 'Libre+Baskerville' },
      body: { family: 'Open Sans', weight: '400', googleId: 'Open+Sans' },
    },
    whyItWorks:
      'Professional yet approachable — serif heading with sans body on restrained neutrals conveys trust and expertise.',
  },
  {
    id: 'flowfest-playful',
    name: 'Flowfest Playful',
    inspiredBy: 'Flowfest community event',
    mood: ['Bold'],
    industry: ['Events', 'Community'],
    colorFamily: 'Coral',
    mode: 'light',
    colors: {
      primary: '#C8644A',
      secondary: '#F4E1C1',
      accent: '#A78D63',
      background: '#FFF8F0',
      text: '#3D405B',
    },
    fonts: {
      heading: { family: 'Fredoka', weight: '600', googleId: 'Fredoka' },
      body: { family: 'Quicksand', weight: '400', googleId: 'Quicksand' },
    },
    whyItWorks:
      'Warm muted colors with rounded display typefaces signal approachability and inclusivity while staying energetic.',
  },
  {
    id: 'saxum-corporate',
    name: 'Saxum Corporate',
    inspiredBy: 'Saxum B2B',
    mood: ['Corporate', 'Trustworthy'],
    industry: ['B2B'],
    colorFamily: 'Navy',
    mode: 'light',
    colors: {
      primary: '#1B2A4A',
      secondary: '#E8ECF1',
      accent: '#3D5A80',
      background: '#FFFFFF',
      text: '#1B2A4A',
    },
    fonts: {
      heading: { family: 'Plus Jakarta Sans', weight: '700', googleId: 'Plus+Jakarta+Sans' },
      body: { family: 'Plus Jakarta Sans', weight: '400', googleId: 'Plus+Jakarta+Sans' },
    },
    whyItWorks:
      'Deep navy with clean modern sans — trustworthy and stable while signaling competence and reliability for B2B clients.',
  },
  {
    id: 'soft-dark-tech',
    name: 'Soft Dark Tech',
    inspiredBy: '2026 soft dark mode trend',
    mood: ['Dark', 'Minimal'],
    industry: ['Tech'],
    colorFamily: 'Dark',
    mode: 'dark',
    colors: {
      primary: '#3B82F6',
      secondary: '#1E1E2E',
      accent: '#60A5FA',
      background: '#18181B',
      text: '#F4F4F5',
    },
    fonts: {
      heading: { family: 'Space Grotesk', weight: '600', googleId: 'Space+Grotesk' },
      body: { family: 'Inter', weight: '400', googleId: 'Inter' },
    },
    whyItWorks:
      'Soft charcoal base with vivid blue accent — easier on the eyes and more premium than pure black, intentional rather than harsh.',
  },
  {
    id: 'linear-dashboard',
    name: 'Linear Dashboard',
    inspiredBy: 'Linear',
    mood: ['Dark', 'Minimal'],
    industry: ['SaaS', 'Tech'],
    colorFamily: 'Dark',
    mode: 'dark',
    colors: {
      primary: '#5E6AD2',
      secondary: '#18181B',
      accent: '#7C86FF',
      background: '#0A0A0B',
      text: '#EDEDEF',
    },
    fonts: {
      heading: { family: 'Inter', weight: '600', googleId: 'Inter' },
      body: { family: 'Inter', weight: '400', googleId: 'Inter' },
    },
    whyItWorks:
      'Neutral dark base with restrained desaturated blue — surfaces derived as tints, not flat gray. Humanist sans holds up at low contrast in long dashboard sessions.',
  },
  {
    id: 'stripe-fintech-dashboard',
    name: 'Stripe Fintech Dashboard',
    inspiredBy: 'Stripe dashboard pattern',
    mood: ['Trustworthy', 'Professional'],
    industry: ['Fintech'],
    colorFamily: 'Navy',
    mode: 'light',
    colors: {
      primary: '#635BFF',
      secondary: '#F6F9FC',
      accent: '#0A2540',
      background: '#FFFFFF',
      text: '#0A2540',
    },
    fonts: {
      heading: { family: 'Sora', weight: '400', googleId: 'Sora' },
      body: { family: 'Inter', weight: '400', googleId: 'Inter' },
    },
    whyItWorks:
      'Electric indigo on navy ink with a geometric sans — editorial premium feel for fintech marketing; tabular-friendly body sans for numeric dashboards.',
  },
  {
    id: 'vercel-platform',
    name: 'Vercel Platform',
    inspiredBy: 'Vercel',
    mood: ['Minimal', 'Corporate'],
    industry: ['Tech', 'SaaS'],
    colorFamily: 'Neutral',
    mode: 'light',
    colors: {
      primary: '#000000',
      secondary: '#F5F5F5',
      accent: '#0070F3',
      background: '#FAFAFA',
      text: '#171717',
    },
    fonts: {
      heading: { family: 'Space Grotesk', weight: '600', googleId: 'Space+Grotesk' },
      body: { family: 'Inter', weight: '400', googleId: 'Inter' },
    },
    whyItWorks:
      'Stark black on near-white with personality concentrated in one accent moment — a deliberately reduced palette that signals developer-first restraint.',
  },
  {
    id: 'claude-warm-ai',
    name: 'Claude Warm AI',
    inspiredBy: 'Anthropic Claude',
    mood: ['Warm', 'Elegant'],
    industry: ['AI', 'Tech'],
    colorFamily: 'Coral',
    mode: 'light',
    colors: {
      primary: '#C06040',
      secondary: '#F5F0E8',
      accent: '#1E293B',
      background: '#FAF7F2',
      text: '#2D2A26',
    },
    fonts: {
      heading: { family: 'Bitter', weight: '600', googleId: 'Bitter' },
      body: { family: 'Source Sans 3', weight: '400', googleId: 'Source+Sans+3' },
    },
    whyItWorks:
      'Warm cream and coral break cool-blue AI convention — slab-serif display with humanist sans reads editorial and human, not generic tech.',
  },
];

export const COLOR_ROLES = ['primary', 'secondary', 'accent', 'background', 'text'];
export const FONT_ROLES = ['heading', 'body'];

export const GOOGLE_FONTS = [
  'Inter',
  'Sora',
  'Poppins',
  'Work Sans',
  'Nunito Sans',
  'Libre Baskerville',
  'Open Sans',
  'Playfair Display',
  'Source Sans 3',
  'Fraunces',
  'Karla',
  'Fredoka',
  'Quicksand',
  'Plus Jakarta Sans',
  'Space Grotesk',
  'Bitter',
];
