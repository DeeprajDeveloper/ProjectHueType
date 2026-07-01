export const DEFAULT_PREVIEW_LOGO = 'Acme Co.';

export function formatMockupCopy(template, vars = {}) {
  return template.replace(/\{(\w+)\}/g, (_, key) => (
    vars[key] != null ? String(vars[key]) : `{${key}}`
  ));
}

export const MOCKUP_COPY = {
  marketing: {
    navbar: {
      links: ['All Products', 'Pricing', 'About', 'Contact'],
      login: 'Log in',
      signup: 'Sign up',
    },
    hero: {
      eyebrow: 'Design better, ship faster',
      heading: 'The modern way to build beautiful products',
      subtext:
        'See your palette and typography come alive on a real landing page — hero, cards, forms, and navigation working together.',
      cta: {
        primary: 'Get started free',
        secondary: 'View demo',
      },
    },
    featureCards: {
      header: {
        title: 'Everything you need to evaluate a combo',
        subtitle:
          'Three pillars teams use to decide if a palette and type pairing is ready to ship.',
      },
      cards: [
        {
          title: 'Ship with confidence',
          text: 'Preview every color and font pairing on layouts your users actually see — not just swatches.',
          tag: 'Design',
        },
        {
          title: 'Built for teams',
          text: 'Lock what you love, shuffle the rest, and share combos with a link the whole team can open.',
          tag: 'Collaborate',
        },
        {
          title: 'Export ready',
          text: 'Copy CSS variables, Tailwind config, or design tokens when your combo is ready for production.',
          tag: 'Handoff',
        },
      ],
      link: 'Learn more →',
    },
    testimonials: {
      header: {
        title: 'Trusted by design teams',
        subtitle: 'See how others evaluate palettes and typography before they go live.',
      },
      items: [
        {
          quote:
            'We stopped guessing how fonts would look on real pages. HueType cut our design review time in half.',
          name: 'Sarah Chen',
          role: 'Head of Design, Northwind',
        },
        {
          quote:
            'The live preview finally shows contrast issues our old swatch grid never caught.',
          name: 'Marcus Webb',
          role: 'Product Designer, Lattice',
        },
        {
          quote:
            'Our marketing site and app shell both look great with the same combo — we knew before we shipped.',
          name: 'Elena Ruiz',
          role: 'Brand Lead, Harbor Studio',
        },
      ],
    },
    contact: {
      title: 'Get in touch',
      subtitle: "Tell us about your project — we'll respond within one business day.",
      fields: {
        firstName: { label: 'First name', placeholder: 'Alex' },
        lastName: { label: 'Last name', placeholder: 'Rivera' },
        email: { label: 'Email', placeholder: 'you@company.com' },
        company: { label: 'Company', placeholder: 'Acme Co.' },
        message: { label: 'Message', placeholder: 'Tell us about your project…' },
      },
      interest: {
        legend: "I'm interested in",
        designSystems: 'Design systems',
        marketingSites: 'Marketing sites',
        productUi: 'Product UI',
      },
      checkboxes: {
        updates: 'Send me product updates and tips',
        privacy: 'I agree to the privacy policy',
      },
      actions: {
        submit: 'Send message',
        reset: 'Clear form',
      },
    },
    footer: {
      address: {
        line1: '128 Market Street, Suite 400',
        line2: 'San Francisco, CA 94105',
        line3: 'United States',
      },
      menus: [
        { title: 'Product', links: ['Features', 'Pricing', 'Integrations', 'Changelog'] },
        { title: 'Company', links: ['About', 'Careers', 'Blog', 'Press'] },
        { title: 'Support', links: ['Help center', 'Contact', 'Status', 'API docs'] },
      ],
      copyright: '© 2026 {brand}. All rights reserved.',
      legal: {
        privacy: 'Privacy',
        terms: 'Terms',
        cookies: 'Cookies',
      },
    },
    authModal: {
      login: {
        title: 'Welcome back',
        subtitle: 'Log in to save combos and pick up where you left off.',
      },
      signup: {
        title: 'Create your account',
        subtitle: 'Sign up free — no credit card required.',
      },
      fields: {
        fullName: { label: 'Full name', placeholder: 'Alex Rivera' },
        email: { label: 'Email', placeholder: 'you@company.com' },
        password: { label: 'Password', placeholder: '••••••••' },
      },
      rememberMe: 'Remember me',
      submit: {
        login: 'Log in',
        signup: 'Create account',
      },
      switch: {
        loginPrompt: "Don't have an account?",
        signupPrompt: 'Already have an account?',
        toSignup: 'Sign up',
        toLogin: 'Log in',
      },
    },
  },
  dashboard: {
    nav: {
      items: [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'analytics', label: 'Analytics' },
        { id: 'customers', label: 'Customers' },
        { id: 'issues', label: 'Issues' },
      ],
      profile: { id: 'profile', label: 'Profile' },
    },
    topBar: {
      searchPlaceholder: 'Search accounts, issues, reports…',
    },
    pageTitles: {
      dashboard: 'Overview',
      analytics: 'Analytics',
      customers: 'Customers',
      issues: 'Issues tracker',
      profile: 'Profile & settings',
    },
    subtitles: {
      dashboard: 'Your workspace at a glance — revenue, users, and open issues.',
      analytics: 'Charts and trends across your product metrics.',
      customers: 'Manage accounts, plans, and subscription status.',
      issues: 'Track bugs, design tasks, and engineering work.',
      profile: 'Account details and application preferences.',
    },
    stats: [
      { label: 'Total revenue', value: '$48,290', change: '+12.5%' },
      { label: 'Active users', value: '2,847', change: '+8.2%' },
      { label: 'Conversion rate', value: '3.24%', change: '+0.4%' },
    ],
    charts: {
      bar: {
        title: 'Weekly revenue',
        yAxis: ['$80k', '$40k', '$0'],
        xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      line: { title: 'Active users' },
      doughnut: {
        title: 'Plan distribution',
        centerValue: '100%',
        centerLabel: 'Accounts',
        legend: ['Pro (45%)', 'Team (30%)', 'Starter (25%)'],
      },
      area: { title: 'Conversion rate' },
    },
    issues: {
      sectionTitle: 'Open issues',
      items: [
        { id: 'HT-104', title: 'Contrast fails on accent button', priority: 'High', status: 'Open' },
        { id: 'HT-98', title: 'Font loading slow on mobile preview', priority: 'Medium', status: 'In progress' },
        { id: 'HT-87', title: 'Export modal tab focus trap', priority: 'Low', status: 'Resolved' },
        { id: 'HT-76', title: 'Saved combo sync delay', priority: 'Medium', status: 'Open' },
      ],
    },
    table: {
      sectionTitle: 'Recent accounts',
      columns: {
        account: 'Account',
        plan: 'Plan',
        status: 'Status',
        mrr: 'MRR',
      },
      rows: [
        { name: 'Acme Corp', plan: 'Pro', status: 'Active', amount: '$299' },
        { name: 'Globex Inc', plan: 'Team', status: 'Active', amount: '$149' },
        { name: 'Initech', plan: 'Starter', status: 'Trial', amount: '$49' },
        { name: 'Umbrella Co', plan: 'Pro', status: 'Active', amount: '$299' },
        { name: 'Stark Industries', plan: 'Enterprise', status: 'Active', amount: '$499' },
        { name: 'Wayne Enterprises', plan: 'Pro', status: 'Active', amount: '$299' },
      ],
    },
    profile: {
      name: 'Alex Rivera',
      email: 'alex@acme.co',
      avatarInitials: 'AR',
      preferences: {
        title: 'Preferences',
        emailNotifications: 'Email notifications',
        weeklyDigest: 'Weekly digest',
        compactSidebar: 'Compact sidebar',
      },
      fields: {
        timezone: {
          label: 'Timezone',
          options: ['Pacific Time (PT)', 'Eastern Time (ET)', 'UTC'],
        },
        exportFormat: {
          label: 'Default export format',
          options: ['CSS variables', 'Tailwind config', 'JSON tokens'],
        },
      },
      save: 'Save changes',
    },
    notifications: {
      title: 'Notifications',
      items: [
        { id: 1, text: 'Acme Corp upgraded to Pro plan', time: '2m ago' },
        { id: 2, text: 'New issue assigned: HT-104', time: '18m ago' },
        { id: 3, text: 'Weekly analytics report ready', time: '1h ago' },
      ],
    },
  },
  pricing: {
    nav: {
      links: ['Plans', 'Compare', 'FAQ'],
      signIn: 'Sign in',
    },
    header: {
      title: 'Choose your plan',
      subtitle: 'Simple, transparent pricing. Upgrade or downgrade at any time.',
    },
    tiers: [
      {
        id: 'starter',
        name: 'Starter',
        price: '$19',
        description: 'For individuals getting started.',
        features: ['Up to 3 projects', 'Basic analytics', 'Email support', '1 GB storage'],
        highlighted: false,
      },
      {
        id: 'pro',
        name: 'Pro',
        price: '$49',
        description: 'For growing teams that need more.',
        features: [
          'Unlimited projects',
          'Advanced analytics',
          'Priority support',
          '50 GB storage',
          'Custom domains',
        ],
        highlighted: true,
        badge: 'Most popular',
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: '$99',
        description: 'For organizations at scale.',
        features: [
          'Everything in Pro',
          'SSO & SAML',
          'Dedicated manager',
          'Unlimited storage',
          'SLA guarantee',
        ],
        highlighted: false,
      },
    ],
    period: '/month',
    cta: 'Get started',
    comparison: {
      title: 'Compare plans',
      subtitle: 'See exactly what each price tier unlocks across your workspace.',
      columnFeature: 'Feature',
      included: 'Included',
      notIncluded: 'Not included',
      rows: [
        { feature: 'Projects', starter: '3', pro: 'Unlimited', enterprise: 'Unlimited' },
        { feature: 'Team members', starter: '1', pro: '10', enterprise: 'Unlimited' },
        { feature: 'Analytics', starter: 'Basic', pro: 'Advanced', enterprise: 'Advanced + exports' },
        { feature: 'Custom domains', starter: false, pro: true, enterprise: true },
        { feature: 'Priority support', starter: false, pro: true, enterprise: true },
        { feature: 'SSO / SAML', starter: false, pro: false, enterprise: true },
        { feature: 'Dedicated manager', starter: false, pro: false, enterprise: true },
        { feature: 'SLA guarantee', starter: false, pro: false, enterprise: true },
      ],
    },
  },
  blog: {
    nav: {
      links: ['Our story', 'Membership', 'Write'],
      signIn: 'Sign in',
    },
    author: {
      name: 'Alex Rivera',
      initials: 'AR',
      follow: 'Follow',
    },
    article: {
      category: 'Design systems',
      title: 'Why typography and color should be chosen together',
      meta: '8 min read · March 14, 2026',
      lead:
        'Most teams pick a color palette first, then hunt for fonts that "feel right." The problem is that type and color interact in ways a swatch grid never reveals.',
      body: {
        paragraph1:
          'Contrast ratios shift with weight, size, and background, and a font that looks crisp on white can feel muddy on a tinted surface. When evaluating a combo, test it against the kinds of pages you actually ship: long articles, dense dashboards, pricing tables, and product cards all stress different parts of the palette.',
        heading1: 'Start with real content, not placeholders',
        paragraph2:
          'Short marketing headlines hide legibility issues that show up in paragraphs, captions, and UI labels. Map every foreground/background pair you rely on — primary on secondary, text on tinted panels, links on hover — and fix failures before they reach production.',
        blockquote:
          'The best palettes are the ones you never notice because everything just reads effortlessly.',
        heading2: 'Contrast is a system, not a checkbox',
        paragraph3:
          'Passing AA on body text against a white background does not guarantee your accent color works on buttons, badges, or navigation. HueType exists to make that pairing process fast: shuffle until something clicks, lock what you love, and preview the result on layouts that mirror real products — not just hero sections.',
        paragraph4:
          'Long-form reading is where font and color pairings earn their keep. Line length, line height, and paragraph rhythm all interact with background tint and text color in ways that short UI copy never exposes. If your combo works here, it will work almost everywhere else.',
      },
    },
  },
  ecommerce: {
    nav: {
      links: ['New in', 'Furniture', 'Lighting', 'Decor', 'Sale'],
      cart: 'Cart',
    },
    categories: ['All', 'Best sellers', 'Under $100', 'Workspace', 'Home'],
    hero: {
      tag: 'Spring collection',
      title: 'Elevate your everyday spaces',
      description: 'Curated furniture and home goods — free shipping on orders over $75.',
      cta: 'Shop the collection',
    },
    section: {
      title: 'Featured products',
      subtitle: 'Curated picks for your workspace and home.',
    },
    sort: {
      options: ['Featured', 'Price: low to high', 'Price: high to low', 'Best rated'],
    },
    products: [
      {
        name: 'Minimal Desk Lamp',
        price: '$89',
        compareAt: '$110',
        rating: 4.8,
        reviews: 124,
        tag: 'Bestseller',
      },
      {
        name: 'Ceramic Pour-Over Set',
        price: '$54',
        compareAt: null,
        rating: 4.6,
        reviews: 89,
        tag: null,
      },
      {
        name: 'Linen Throw Blanket',
        price: '$128',
        compareAt: '$149',
        rating: 4.9,
        reviews: 203,
        tag: 'New',
      },
      {
        name: 'Oak Monitor Stand',
        price: '$72',
        compareAt: null,
        rating: 4.7,
        reviews: 56,
        tag: null,
      },
    ],
    productCta: 'Add to cart',
    footer: {
      tagline: 'Thoughtful design for modern living.',
      shop: {
        title: 'Shop',
        links: ['New arrivals', 'Best sellers', 'Sale'],
      },
      help: {
        title: 'Help',
        links: ['Shipping', 'Returns', 'Contact'],
      },
      newsletter: {
        title: 'Newsletter',
        placeholder: 'Your email',
        subscribe: 'Subscribe',
      },
      copyright: '© 2026 {brand}. All rights reserved.',
    },
  },
  auth: {
    brand: {
      tagline: 'Design tokens that look as good in production as they do in preview.',
      copy: 'Test typography, contrast, and color roles on layouts you actually ship.',
    },
    tabs: {
      login: 'Log in',
      signup: 'Sign up',
    },
    form: {
      login: {
        title: 'Welcome back',
        subtitle: 'Log in to save combos and pick up where you left off.',
      },
      signup: {
        title: 'Create your account',
        subtitle: 'Sign up free — no credit card required.',
      },
      fields: {
        fullName: { label: 'Full name', placeholder: 'Alex Rivera' },
        email: { label: 'Email', placeholder: 'you@company.com' },
        password: { label: 'Password', placeholder: '••••••••' },
      },
      rememberMe: 'Remember me',
      submit: {
        login: 'Log in',
        signup: 'Create account',
      },
    },
    social: {
      divider: 'or continue with',
      google: 'Google',
      github: 'GitHub',
    },
  },
  chat: {
    conversations: [
      { id: 'palette', title: 'Palette suggestions', preview: 'Try a warmer accent on dark mode…', active: true },
      { id: 'wcag', title: 'WCAG review', preview: 'The secondary-on-background pair fails AA.' },
      { id: 'export', title: 'Export tokens', preview: 'Here is your Tailwind config…' },
    ],
    header: {
      title: 'Palette suggestions',
      model: 'GPT-4o · Design assistant',
    },
    messages: [
      {
        id: 1,
        role: 'user',
        text: 'Suggest a secondary color that pairs with #2563EB primary on a white background.',
      },
      {
        id: 2,
        role: 'assistant',
        text: 'A cool neutral like `#E8EEF7` works well for surfaces, with `#64748B` for supporting text. For buttons, try `#0EA5E9` as accent — it passes AA on white at 16px bold.',
        code: 'bg-secondary: #E8EEF7;',
      },
      {
        id: 3,
        role: 'user',
        text: 'What about dark mode?',
      },
      {
        id: 4,
        role: 'assistant',
        text: 'Shift the background to `#0F172A`, keep primary at `#3B82F6`, and use `#94A3B8` for muted copy. Re-check contrast on accent buttons — you may need a lighter accent fill.',
      },
    ],
    avatars: {
      user: 'You',
      assistant: 'AI',
    },
    input: {
      placeholder: 'Ask about contrast, tokens, or layout…',
      send: 'Send',
    },
  },
  onboarding: {
    progressLabel: 'Step {step} of {total}',
    steps: [
      {
        title: 'Welcome to HueType',
        copy: 'Pick a palette and font pairing, then preview it on real product layouts before you commit.',
      },
      {
        title: 'Choose your industry',
        copy: 'Filter presets by mood and industry so you start closer to your brand context.',
        chips: ['SaaS', 'Fintech', 'Wellness'],
      },
      {
        title: 'Preview on prototypes',
        copy: 'Switch between dashboards, auth pages, chat UIs, and more to stress-test your combo.',
      },
    ],
    nav: {
      back: 'Back',
      continue: 'Continue',
      getStarted: 'Get started',
    },
  },
  settings: {
    nav: {
      tabs: [
        { id: 'profile', label: 'Profile' },
        { id: 'preferences', label: 'Preferences' },
        { id: 'billing', label: 'Billing' },
      ],
    },
    header: {
      title: 'Account settings',
      subtitle: 'Manage your profile, preferences, and workspace.',
    },
    profile: {
      sectionTitle: 'Profile',
      fields: {
        displayName: { label: 'Display name', value: 'Alex Rivera' },
        email: { label: 'Email', value: 'alex@acme.co' },
      },
      save: 'Save changes',
    },
    preferences: {
      sectionTitle: 'Preferences',
      items: [
        { id: 'email', label: 'Email notifications', desc: 'Weekly digest and combo updates' },
        { id: 'scales', label: 'Show color scales', desc: 'Display 100–900 ramps in customize panel' },
        { id: 'contrast', label: 'Contrast warnings', desc: 'Highlight WCAG failures in preview' },
      ],
    },
    dangerZone: {
      title: 'Danger zone',
      copy: 'Permanently delete your saved presets and reset all customizations. This cannot be undone.',
      delete: 'Delete account',
    },
  },
  empty: {
    title: 'No presets saved yet',
    description:
      'Browse the workspace, shuffle until something clicks, then heart a combo to save it here.',
    cta: 'Browse presets',
    hintPrefix: 'Tip: press',
    hintSuffix: 'to shuffle unlocked roles',
  },
  notifications: {
    header: {
      title: 'Notifications',
      markAllRead: 'Mark all read',
    },
    filters: ['All', 'Unread', 'Mentions'],
    unreadBadge: '2',
    items: [
      {
        id: 1,
        unread: true,
        avatar: 'AR',
        title: 'Alex saved Modern SaaS Blue',
        body: 'Added to My Presets — contrast passes AA on all pairs.',
        time: '2m ago',
      },
      {
        id: 2,
        unread: true,
        avatar: 'SY',
        title: 'WCAG review flagged accent button',
        body: 'text-on-accent fails AA at normal weight. Consider a darker accent fill.',
        time: '18m ago',
      },
      {
        id: 3,
        unread: false,
        avatar: 'HT',
        title: 'Export ready — Tailwind config',
        body: 'Your token file includes 100–900 scales for all roles.',
        time: '1h ago',
      },
      {
        id: 4,
        unread: false,
        avatar: 'CM',
        title: 'New prototype: AI chat interface',
        body: 'Group 2 archetypes are live — test bubbles and code blocks.',
        time: '3h ago',
      },
      {
        id: 5,
        unread: false,
        avatar: 'DR',
        title: 'Weekly combo digest',
        body: '12 new presets match your SaaS + Trustworthy filters.',
        time: 'Yesterday',
      },
    ],
  },
};
