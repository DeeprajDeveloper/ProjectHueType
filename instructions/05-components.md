# Atomic / utility components (the reusable primitives other components are built from)

- Color swatch (the basic clickable color chip used in Combo Cards, Customize Panel, color picker)
- Font sample renderer (the "Aa" preview block used everywhere a font needs to be shown, not just named)
- Tag / chip (generic — reused for mood tags, "New," "Trending," filter chips)
- Dropdown / select (generic — used for font selection, sort order, export format)
- Combobox with search/autocomplete (specifically for searching ~1,800 fonts by name — a plain dropdown won't scale)
- Slider (manual fine-tuning of saturation/lightness/contrast, or a before/after comparison slider)
- Tooltip (hover hints on icons — lock, contrast badge, shuffle)
- Tabs (used inside Export Panel; reusable elsewhere)
- Segmented control (e.g. toggle Browse/Generate mode, or Light/Dark preview)
- Modal/dialog wrapper (generic shell — Export, Settings, and Share all sit inside this)
- Accordion (collapsible filter groups, FAQ section)
- Alert / inline banner (e.g. "Font failed to load — using fallback")
- Skeleton loader (library grid while combos load)
- Avatar / user menu (only relevant once accounts exist — v2)
- Context menu (right-click a combo card: duplicate, delete, export directly)
- Pagination or infinite-scroll loader (for the library grid)

# Feature-level components not yet in the design system doc

- Settings panel — default contrast threshold (AA vs AAA), default export format, app light/dark mode
- Share modal — distinct from Export: generates a shareable link, social preview image, optional embed code
- Onboarding tour / coach tooltips — first-run walkthrough pointing at Shuffle, Lock, and Export
- Keyboard shortcuts cheat-sheet modal — since spacebar-shuffle and other shortcuts need to be discoverable
- "What's new" popover/changelog — useful once you're iterating post-launch
- Popularity/usage indicator on Combo Card — small "saved by X people" signal, social proof for browsing
- Drag-to-reorder for the My Combos / saved list

# Additional Live Preview archetypes 

> this is the one I'd actually prioritize — right now the mockup components are all "marketing site" shaped: hero, navbar, card, form, footer. Plenty of your users will be building other kinds of pages

- Dashboard/app shell archetype — sidebar nav + data table + stat cards, to test a combo on a SaaS-style interior page, not just a landing page
- Pricing table mockup — tests how the palette/fonts handle a denser, comparison-heavy layout
- Blog/article layout mockup — tests long-form body text legibility, not just short marketing copy
- E-commerce product card mockup — image + price + CTA, a very common real-world use case