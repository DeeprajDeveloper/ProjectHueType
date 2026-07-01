# Group 1 - Currently added Archetypes

- Dashboard/app shell archetype — sidebar nav + data table + stat cards, to test a combo on a SaaS-style interior page, not just a landing page
- Pricing table mockup — tests how the palette/fonts handle a denser, comparison-heavy layout
- Blog/article layout mockup — tests long-form body text legibility, not just short marketing copy
- E-commerce product card mockup — image + price + CTA, a very common real-world use case

# Group 2 — High priority additions (every solo dev building a product will need these)

- Auth pages — Login and signup. These are typography stress tests — tiny forms, a lot riding on a small amount of text, easy to get wrong with aggressive palettes. Tests how a combo behaves at minimal chrome.
- AI chat interface — Your instinct is right, and it's timely. Conversation bubbles (user vs. assistant differentiation using color roles), a fixed input bar, typing indicators, markdown-rendered responses. Tests how your palette handles alternating surface colors and inline code blocks. Most new SaaS products have this now.
- Onboarding wizard / setup flow — Step progress bar, single focused form per step, illustration area. A soft, approachable palette matters more here than anywhere — people are forming their first impression of the product.
- Settings / account page — Tabbed layout, dense form fields, toggle rows, destructive action zone (danger color). Specifically tests the muted/secondary color roles that most mockups never exercise.
- Empty state — A deliberately sparse layout: illustration/icon, headline, single CTA. This is where a palette lives or dies when there's no content to fill it — a surprising number of combos fall apart here.
- Notifications / activity feed — Stacked list with timestamps, read/unread states, avatars. Tests small-text contrast and the accent color at high repetition.


# Group 3 — Strong secondary additions (cover a wider audience)

- Documentation / docs site — Sidebar nav + markdown content area + in-page headings. Tests a combo on long-form technical reading. Very different from a blog — more structured, more code blocks, smaller font sizes.
- Kanban / project board — Column layout with draggable cards and status colors. Tests how the palette handles multiple accent-color categories side by side (e.g. To Do / In Progress / Done with distinct but harmonious colors).
- Analytics / reports page — Charts, data tables, KPI cards, date-range selectors. Tests the palette on data-visualization surfaces — a notoriously hard context where many combos look fine on a hero section but fall apart when colors need to encode meaning in a chart.
- Profile / user page — Avatar, stats, activity grid (GitHub-style), bio, social links. Common in community and developer tools.
- Billing / upgrade page — Current plan summary, usage meters, upgrade CTA. Tests the danger/warning/success semantic color roles specifically.
- Search results / list view — A filterable, sortable list of items. Tests legibility of body copy at high density and the filter chip component at real scale.


# Group 4 — Niche but genuinely useful (differentiate you further)

- Email template — Not a web page, but a huge real-world use case. Constrained layout (600px max, no CSS grid, limited fonts). Tests how a palette renders in a very different medium — many devs pick their brand colors on the web and then realize they look different in email clients.
- Mobile app screen — 390px-wide, bottom nav bar, content cards stacked vertically. Tests the combo at phone scale, which has very different contrast and spacing needs than a desktop hero.
- Landing page — "waitlist" variant — Minimal: headline + email input + social proof. Tests a palette's ability to hold a page together with almost no content — a purity test.
- Error / 404 page — Another "barely any content" test, but emotionally different from empty state — needs to be reassuring rather than promotional.
- Calendar / scheduler — Dense grid layout, today highlight, event color blocks. Another multi-accent-color test.
- Media player / audio UI — Progress bar, album art, playback controls. Tests a combo on a very visual, interactive surface where accent color choice is especially prominent.