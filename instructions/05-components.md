# Atomic / utility components (the reusable primitives other components are built from)

- Color swatch (the basic clickable color chip used in Combo Cards, Customize Panel, color picker) — **built**
- Font sample renderer (the "Aa" preview block used everywhere a font needs to be shown, not just named) — **built**
- Tag / chip (generic — reused for mood tags, "New," "Trending," filter chips, dashboard issue labels) — **built**
- Dropdown / select (single- and multi-select — fonts, sort order, export format, mood, industry filters) — **built**
- Combobox with search/autocomplete (specifically for searching ~1,800 fonts by name — a plain dropdown won't scale) — planned
- Slider (manual fine-tuning of saturation/lightness/contrast, or a before/after comparison slider) — planned
- Tooltip (hover labels on collapsed sidebar icon rails and preview panel controls) — **built**
- Tabs (Export modal, Design system catalog) — **built**
- Segmented control (light/dark filter; desktop / tablet / mobile preview frame) — **built**
- Modal/dialog wrapper (Export modal, Design system catalog) — **built**
- Accordion (collapsible filter groups, customize sections, preview info, preview parts panel) — **built**
- Toast notification (save, shuffle, copy, share feedback) — **built**
- Alert / inline banner (e.g. "Font failed to load — using fallback") — planned
- Skeleton loader (library grid while combos load) — planned
- Avatar / user menu (only relevant once accounts exist — v2) — planned
- Context menu (right-click a combo card: duplicate, delete, export directly) — planned
- Pagination or infinite-scroll loader (for the library grid) — planned

# Feature-level components

- Design system catalog — built vs planned inventory modal (left sidebar footer / collapsed rail) — **built**
- Preview components panel — archetype switcher + per-section toggles; collapsible right rail — **built**
- Collapsed sidebar rails — icon-only left/right rails with tooltips — **built**
- Settings panel — default contrast threshold (AA vs AAA), default export format, app light/dark mode — planned
- Share modal — distinct from Export: shareable link, social preview image, optional embed code (clipboard copy exists today) — planned
- Onboarding tour / coach tooltips — first-run walkthrough pointing at Shuffle, Lock, and Export — planned
- Keyboard shortcuts cheat-sheet modal — since spacebar-shuffle and other shortcuts need to be discoverable — planned
- "What's new" popover/changelog — useful once you're iterating post-launch — planned
- Popularity/usage indicator on Combo Card — small "saved by X people" signal, social proof for browsing — planned
- Drag-to-reorder for the My Combos / saved list — planned

# Live Preview archetypes & tooling

- Device frame preview — desktop, tablet (768px), mobile (375px) with animated width and container-query mockups — **built**
- Common Website Design — navbar, hero, feature cards, testimonials, contact form, footer, in-preview auth modal — **built**
- Corporate Dashboard — sidebar nav, search & notifications, stat cards, charts, issues tracker, data sheet, profile settings — **built**
- Pricing table — tier comparison with dense feature lists and CTAs — **built**
- Blog / article — long-form headings and body copy for readability — **built**
- E-commerce product — product cards with image placeholders, price, and buy buttons — **built**
- Preview parts toggles — per-archetype section visibility, persisted in local storage — **built**
