export const DEFAULT_PREVIEW_LOGO = 'HueType Co.';

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
        line1: '182 Fictional Street, Suite 400',
        line2: 'Sim City, CA 94105',
        line3: 'Imagine Land',
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
        subtitle: 'Mar 3 – Mar 9 · USD',
        yAxis: ['$100k', '$75k', '$50k', '$25k', '$0'],
        xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        values: [62, 78, 71, 84, 69, 91, 58],
        valueLabels: ['$62k', '$78k', '$71k', '$84k', '$69k', '$91k', '$58k'],
      },
      line: {
        title: 'Active users',
        subtitle: 'Daily average · last 30 days',
        summary: '11,204 avg',
        yAxis: ['12k', '9k', '6k', '3k', '0'],
        xAxis: ['Apr 1', 'Apr 8', 'Apr 15', 'Apr 22', 'Apr 29'],
      },
      doughnut: {
        title: 'Plan distribution',
        subtitle: 'By account tier',
        centerValue: '2,847',
        centerLabel: 'Accounts',
        legend: [
          { label: 'Pro', value: '45%', count: '1,281' },
          { label: 'Team', value: '30%', count: '854' },
          { label: 'Starter', value: '25%', count: '712' },
        ],
        segments: [45, 30, 25],
      },
      area: {
        title: 'Conversion rate',
        subtitle: 'Signup → paid · rolling 8 weeks',
        summary: '3.24% avg',
        yAxis: ['5%', '4%', '3%', '2%', '1%'],
        xAxis: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'],
      },
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
        title: 'New prototype: Documentation site',
        body: 'Group 3 archetypes are live — test docs, kanban, and analytics layouts.',
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
  docs: {
    nav: {
      sections: [
        {
          title: 'Getting started',
          links: [
            { id: 'intro', label: 'Introduction', active: true },
            { id: 'install', label: 'Installation' },
            { id: 'quickstart', label: 'Quick start' },
          ],
        },
        {
          title: 'Guides',
          links: [
            { id: 'tokens', label: 'Design tokens' },
            { id: 'contrast', label: 'WCAG contrast' },
            { id: 'export', label: 'Export formats' },
          ],
        },
        {
          title: 'API',
          links: [
            { id: 'colors', label: 'Color roles' },
            { id: 'fonts', label: 'Typography' },
          ],
        },
      ],
    },
    header: {
      breadcrumb: 'Getting started',
      title: 'Introduction',
      description: 'HueType helps you pair palettes and fonts, then stress-test them on realistic product layouts.',
    },
    toc: [
      'Overview',
      'Core concepts',
      'Color roles',
      'Next steps',
    ],
    content: {
      overview: 'HueType is a design-token playground for solo developers and small teams. Pick a preset, customize roles, and preview your combo on layouts you actually ship.',
      conceptsHeading: 'Core concepts',
      concepts: 'Every combo defines five color roles — primary, secondary, accent, background, and text — plus heading and body font pairings. The live preview applies these tokens via CSS custom properties.',
      rolesHeading: 'Color roles',
      roles: 'Primary anchors navigation and brand chrome. Secondary fills surfaces and borders. Accent drives CTAs and interactive highlights. Background and text set the reading layer.',
      nextHeading: 'Next steps',
      next: 'Install a preset, open the contrast panel, and switch between archetypes to see how your palette behaves on auth forms, dashboards, and docs.',
    },
    code: {
      label: 'CSS variables',
      snippet: ':root {\n  --color-primary: #2563EB;\n  --color-accent: #0EA5E9;\n  --font-heading: "Inter", sans-serif;\n}',
    },
  },
  kanban: {
    header: {
      title: 'Sprint board',
      subtitle: 'Q3 design system rollout',
      members: ['AR', 'SY', 'CM'],
    },
    columns: [
      {
        id: 'todo',
        title: 'To do',
        colorRole: 'secondary',
        cards: [
          { id: 1, title: 'Audit contrast on auth forms', tag: 'WCAG', assignee: 'AR' },
          { id: 2, title: 'Export Tailwind v4 config', tag: 'Dev', assignee: 'SY' },
        ],
      },
      {
        id: 'progress',
        title: 'In progress',
        colorRole: 'primary',
        cards: [
          { id: 3, title: 'Kanban archetype mockup', tag: 'Design', assignee: 'CM', active: true },
          { id: 4, title: 'Mobile sidebar polish', tag: 'UX', assignee: 'AR' },
        ],
      },
      {
        id: 'done',
        title: 'Done',
        colorRole: 'accent',
        cards: [
          { id: 5, title: 'Group 2 archetypes shipped', tag: 'Release', assignee: 'SY' },
        ],
      },
    ],
    addCard: 'Add card',
    addCardForm: {
      placeholder: 'What needs doing?',
      save: 'Add card',
      cancel: 'Cancel',
    },
    deleteCard: 'Delete card',
    cardMeta: {
      comments: '3',
      attachments: '1',
    },
  },
  analytics: {
    header: {
      title: 'Workspace usage report',
      subtitle: 'HueType analytics · Q1 2026 summary',
    },
    reportMeta: {
      id: 'RPT-2026-Q1-084',
      generated: 'Generated Mar 31, 2026 · 09:14 UTC',
      preparedFor: 'Acme Co. workspace',
    },
    dateRange: {
      label: 'Reporting period',
      value: 'Jan 1 – Mar 31, 2026',
      compare: 'Compared to Oct 1 – Dec 31, 2025',
    },
    executiveSummary: {
      title: 'Executive summary',
      body: 'Workspace activity grew 12.4% quarter-over-quarter. Combo saves and exports trended up, while contrast remediation requests increased as teams adopted stricter WCAG targets before launch.',
    },
    kpis: [
      { label: 'Active users', value: '2,847', change: '+12.4%', positive: true, note: 'vs prior quarter' },
      { label: 'Combos saved', value: '418', change: '+8.1%', positive: true, note: 'unique presets' },
      { label: 'Exports', value: '1,203', change: '-2.3%', positive: false, note: 'token downloads' },
      { label: 'Contrast fixes', value: '94', change: '+18.6%', positive: true, note: 'resolved issues' },
    ],
    charts: {
      trend: {
        title: '1. Activity trend',
        caption: 'Figure 1. Daily active users across the reporting period, with 7-day rolling average.',
        subtitle: 'Daily active users · Jan – Mar 2026',
        summary: 'Peak: 3,241 on Mar 12',
        yAxis: ['3.5k', '2.5k', '1.5k', '500', '0'],
        xAxis: ['Jan', 'Feb', 'W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'Mar'],
      },
      presets: {
        title: '2. Preset engagement',
        caption: 'Figure 2. Top preset views by week — color intensity reflects save rate.',
        subtitle: 'Views by preset · thousands',
        yAxis: ['5k', '4k', '3k', '2k', '1k', '0'],
        xAxis: ['SaaS Blue', 'Warm Ed.', 'Dark Fin.', 'Wellness', 'Editorial', 'Trust', 'Mint'],
        values: [82, 68, 61, 54, 48, 42, 36],
        valueLabels: ['4.2k', '2.9k', '2.1k', '1.9k', '1.6k', '1.4k', '1.1k'],
      },
      distribution: {
        title: '3. Export format mix',
        caption: 'Figure 3. Share of token exports by format for the quarter.',
        subtitle: 'Export destinations',
        centerValue: '1,203',
        centerLabel: 'Exports',
        legend: [
          { label: 'Tailwind', value: '38%', count: '457' },
          { label: 'CSS variables', value: '34%', count: '409' },
          { label: 'JSON tokens', value: '19%', count: '229' },
          { label: 'Other', value: '9%', count: '108' },
        ],
        segments: [38, 34, 19, 9],
      },
    },
    findings: {
      title: 'Key findings',
      items: [
        'Modern SaaS Blue drove 34% of all preset views and maintained AA contrast on every role pair.',
        'Export volume dipped 2.3% — likely seasonal — but Tailwind exports grew to 38% of total output.',
        'Contrast fix requests clustered around accent-on-background pairs in dark mode presets.',
      ],
    },
    table: {
      title: '4. Preset performance detail',
      caption: 'Table 1. Preset usage, saves, and contrast status for the reporting period.',
      columns: { preset: 'Preset', views: 'Views', saves: 'Saves', exports: 'Exports', contrast: 'Contrast' },
      rows: [
        { preset: 'Modern SaaS Blue', views: '4,218', saves: '312', exports: '186', contrast: 'AA' },
        { preset: 'Warm Editorial', views: '2,940', saves: '198', exports: '142', contrast: 'AAA' },
        { preset: 'Dark Fintech', views: '2,105', saves: '156', exports: '98', contrast: 'AA' },
        { preset: 'Soft Wellness', views: '1,872', saves: '134', exports: '76', contrast: 'Warn' },
        { preset: 'Trust Navy', views: '1,640', saves: '118', exports: '64', contrast: 'AA' },
        { preset: 'Mint Productivity', views: '1,402', saves: '96', exports: '51', contrast: 'AAA' },
      ],
      totals: { preset: 'Total', views: '14,177', saves: '1,014', exports: '617', contrast: '—' },
    },
    footer: 'This report reflects workspace activity only. Figures are illustrative for palette preview purposes.',
  },
  profile: {
    header: {
      name: 'Alex Rivera',
      handle: '@alexrivera',
      avatar: 'AR',
      location: 'Brooklyn, NY',
      joined: 'Joined March 2024',
      edit: 'Edit profile',
    },
    stats: [
      { label: 'Presets saved', value: '47' },
      { label: 'Combos exported', value: '128' },
      { label: 'Contributions', value: '312' },
    ],
    bio: {
      title: 'About',
      text: 'Design systems engineer building accessible color tools. I share preset combos and WCAG notes for indie SaaS teams.',
    },
    activity: {
      title: 'Recent activity',
      items: [
        { id: 1, type: 'save', label: 'Saved Modern SaaS Blue', time: '2 days ago' },
        { id: 2, type: 'export', label: 'Exported Tailwind tokens', time: '4 days ago' },
        { id: 3, type: 'fix', label: 'Fixed accent contrast on dark mode', time: '1 week ago' },
        { id: 4, type: 'share', label: 'Shared combo link', time: '2 weeks ago' },
        { id: 5, type: 'save', label: 'Saved Warm Editorial', time: '3 weeks ago' },
        { id: 6, type: 'export', label: 'Exported CSS variables', time: '1 month ago' },
      ],
    },
    social: {
      title: 'Links',
      items: [
        { label: 'GitHub', handle: 'alexrivera' },
        { label: 'Website', handle: 'alexrivera.dev' },
        { label: 'Twitter', handle: '@alexrivera' },
      ],
    },
  },
  billing: {
    currentPlan: {
      title: 'Current plan',
      name: 'Pro',
      price: '$19',
      period: '/month',
      renewal: 'Renews April 15, 2026',
      manage: 'Manage subscription',
    },
    usage: {
      title: 'Usage this period',
      items: [
        { label: 'Saved presets', used: 47, limit: 100, status: 'ok' },
        { label: 'Exports', used: 28, limit: 50, status: 'ok' },
        { label: 'Team seats', used: 3, limit: 5, status: 'ok' },
        { label: 'API calls', used: 9200, limit: 10000, status: 'warning' },
      ],
    },
    upgrade: {
      title: 'Upgrade options',
      plans: [
        {
          id: 'pro',
          name: 'Pro',
          price: '$19',
          period: '/mo',
          features: ['100 presets', '50 exports/mo', '5 seats'],
          current: true,
        },
        {
          id: 'team',
          name: 'Team',
          price: '$49',
          period: '/mo',
          features: ['Unlimited presets', '200 exports/mo', '15 seats'],
          recommended: true,
        },
        {
          id: 'enterprise',
          name: 'Enterprise',
          price: 'Custom',
          period: '',
          features: ['SSO', 'Audit logs', 'Dedicated support'],
        },
      ],
      cta: 'Upgrade to Team',
    },
    history: {
      title: 'Billing history',
      invoices: [
        { id: 'INV-1042', date: 'Mar 15, 2026', amount: '$19.00', status: 'Paid' },
        { id: 'INV-1031', date: 'Feb 15, 2026', amount: '$19.00', status: 'Paid' },
        { id: 'INV-1020', date: 'Jan 15, 2026', amount: '$19.00', status: 'Paid' },
      ],
    },
  },
  search: {
    header: {
      placeholder: 'Search presets, docs, and exports…',
      query: 'saas blue',
      resultCount: '24 results',
    },
    filters: ['All', 'Presets', 'Docs', 'Exports', 'WCAG'],
    sort: {
      label: 'Sort by',
      value: 'Relevance',
    },
    results: [
      {
        id: 1,
        title: 'Modern SaaS Blue',
        type: 'Preset',
        excerpt: 'Trustworthy blue primary with cool neutral secondary — passes AA on all role pairs.',
        meta: 'Updated 2 days ago · 4.2k views',
      },
      {
        id: 2,
        title: 'WCAG contrast on accent buttons',
        type: 'Doc',
        excerpt: 'How to check text-on-accent pairs and fix failures before export.',
        meta: 'Guide · 8 min read',
      },
      {
        id: 3,
        title: 'Tailwind export — Modern SaaS Blue',
        type: 'Export',
        excerpt: 'Generated config with 100–900 scales for primary, secondary, and accent roles.',
        meta: 'Exported Mar 10, 2026',
      },
      {
        id: 4,
        title: 'Dark mode SaaS palette',
        type: 'Preset',
        excerpt: 'Deep background with lifted surfaces — accent needs bold weight for AA compliance.',
        meta: 'Updated 1 week ago · 2.1k views',
      },
      {
        id: 5,
        title: 'Color roles reference',
        type: 'Doc',
        excerpt: 'Primary, secondary, accent, background, and text — when to use each role in product UI.',
        meta: 'API reference',
      },
    ],
  },
  email: {
    preheader: 'Your weekly palette digest is ready',
    header: {
      brand: 'HueType',
      tagline: 'Palette & typography previews',
    },
    hero: {
      title: 'Your combo passes AA on every pair',
      body: 'Modern SaaS Blue held contrast across auth forms, dashboards, and email — here is what changed this week.',
    },
    blocks: [
      { title: 'Top preset this week', body: 'Modern SaaS Blue — 4.2k views, 312 saves, AAA on body text.' },
      { title: 'Contrast tip', body: 'Accent buttons on dark backgrounds often need a lighter fill or bolder weight for AA.' },
    ],
    cta: 'Open your workspace',
    footer: {
      address: 'HueType · hello@huetype.dev',
      links: ['Manage preferences', 'Unsubscribe'],
      legal: '© 2026 HueType. All rights reserved.',
    },
  },
  'mobile-app': {
    statusTime: '9:41',
    screens: {
      home: {
        title: 'My presets',
        action: 'Filter',
        cards: [
          { id: 1, title: 'Modern SaaS Blue', meta: 'AA contrast · Saved 2d ago', tag: 'Active' },
          { id: 2, title: 'Warm Editorial', meta: 'AAA contrast · Exported', tag: null },
          { id: 3, title: 'Dark Fintech', meta: 'Accent warn · Draft', tag: 'Draft' },
        ],
      },
      browse: {
        title: 'Browse presets',
        action: 'Search',
        searchPlaceholder: 'Search presets…',
        filters: ['All', 'SaaS', 'Editorial', 'Dark'],
        presets: [
          { id: 'b1', title: 'Trust Navy', meta: 'SaaS · 1.6k views', mood: 'SaaS' },
          { id: 'b2', title: 'Mint Productivity', meta: 'Wellness · AAA', mood: 'Editorial' },
          { id: 'b3', title: 'Soft Wellness', meta: 'Light · AA warn', mood: 'Editorial' },
          { id: 'b4', title: 'Dark Fintech', meta: 'Dark · AA', mood: 'Dark' },
          { id: 'b5', title: 'Modern SaaS Blue', meta: 'SaaS · Popular', mood: 'SaaS' },
        ],
      },
      saved: {
        title: 'Saved',
        action: 'Sort',
        sortOptions: ['Recent', 'Name', 'Contrast'],
        items: [
          { id: 's1', title: 'Modern SaaS Blue', meta: 'Saved Mar 1 · AA', heart: true },
          { id: 's2', title: 'Warm Editorial', meta: 'Saved Feb 28 · AAA', heart: true },
          { id: 's3', title: 'Dark Fintech', meta: 'Saved Feb 20 · AA', heart: true },
        ],
      },
      profile: {
        title: 'Profile',
        user: { name: 'Alex Rivera', email: 'alex@acme.co', initials: 'AR' },
        stats: [
          { label: 'Saved', value: '12' },
          { label: 'Exported', value: '34' },
          { label: 'Shared', value: '8' },
        ],
        settings: [
          { id: 'notifications', label: 'Push notifications', on: true },
          { id: 'contrast', label: 'Contrast warnings', on: true },
          { id: 'digest', label: 'Weekly digest', on: false },
        ],
        signOut: 'Sign out',
      },
    },
    nav: [
      { id: 'home', label: 'Home' },
      { id: 'browse', label: 'Browse' },
      { id: 'saved', label: 'Saved' },
      { id: 'profile', label: 'Profile' },
    ],
  },
  waitlist: {
    brand: 'HueType',
    headline: 'Design tokens, previewed on real product UI',
    subhead: 'Join the waitlist for early access to palette stress-testing across 24 layout archetypes.',
    form: {
      placeholder: 'you@company.com',
      submit: 'Join waitlist',
      hint: 'No spam. Unsubscribe anytime.',
    },
    socialProof: {
      count: '2,400+',
      label: 'designers on the waitlist',
      avatars: ['AR', 'SY', 'CM', 'DR'],
    },
  },
  error404: {
    code: '404',
    title: 'This page wandered off the grid',
    body: 'The link may be broken or the page may have moved. Your saved combos and presets are safe — let us get you back on track.',
    primary: 'Back to workspace',
    links: ['Browse presets', 'Help center', 'Contact support'],
  },
  calendar: {
    header: {
      title: 'March 2026',
      today: 'Today',
      views: ['Month', 'Week'],
    },
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    todayDate: 3,
    events: [
      { day: 3, title: 'WCAG review', time: '10:00', color: 'accent' },
      { day: 3, title: 'Export tokens', time: '14:30', color: 'primary' },
      { day: 7, title: 'Preset launch', time: '09:00', color: 'primary' },
      { day: 12, title: 'Design critique', time: '11:00', color: 'secondary' },
      { day: 15, title: 'Team sync', time: '15:00', color: 'accent' },
      { day: 22, title: 'Q1 report', time: '10:00', color: 'secondary' },
      { day: 28, title: 'Mobile polish', time: '13:00', color: 'accent' },
    ],
    upcoming: {
      title: 'Upcoming',
      items: [
        { title: 'WCAG review', when: 'Today · 10:00 AM' },
        { title: 'Export tokens', when: 'Today · 2:30 PM' },
        { title: 'Preset launch', when: 'Mar 7 · 9:00 AM' },
      ],
    },
  },
  'media-player': {
    track: {
      title: 'Palette in Motion',
      artist: 'HueType Sessions',
      album: 'Design Systems Vol. 1',
    },
    progress: {
      totalSeconds: 228,
    },
  },
};
