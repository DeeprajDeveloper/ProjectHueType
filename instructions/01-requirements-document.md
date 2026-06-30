# Requirements Document — "Harmonize" (working name)
### A tool for selecting color palettes and font pairs that work cohesively together

---

## 1. Problem Statement

Existing tools solve **half** the problem each:

- **Color tools** (Coolors, Colormind, Adobe Color, realtimecolors.com) generate or preview palettes on UI elements, but treat typography as an afterthought — a font list bolted on, not generated to match.
- **Font tools** (Fontjoy, Typotheque Font Combinator, Monotype Font Pairing Generator) generate font pairings using contrast/style rules, but have no concept of color.
- A small number of hybrid tools exist (Colors & Fonts, EnigmaEasel's AI Font Pairing Generator) but mostly let you pick a color *then* search a list of font pairs — they don't reason about *why* a given palette and a given font pairing belong together, and they preview text in isolated blocks rather than full page mockups.

The result: people either randomly pick a font hoping it works with their palette, or get a randomly generated font pairing that doesn't actually suit the mood of their colors. There's no tool that treats **color + type as one cohesive decision**, the way real brands (Stripe, Spotify, Airbnb, Mailchimp) clearly do.

## 2. Goals

- Let a user pick or generate a **palette + font pairing as a single unit**, not two separate decisions.
- Ground every suggestion in **why it works** (mood, contrast, industry fit) rather than pure randomness.
- Preview combos on **realistic page elements** (hero, nav, buttons, cards, forms) — not isolated swatches.
- Make every suggested combo **accessible by default** (WCAG contrast checked automatically).
- Make it trivial to **export** a chosen combo into code (CSS variables / Tailwind config / JSON).

## 3. Non-Goals (for v1)

- Not a full brand-identity tool (no logo design, no brand strategy).
- Not a replacement for Coolors/Adobe Color as a raw color-wheel tool — palettes here are curated/generated specifically *for pairing with type*, not general-purpose color exploration.
- No custom font upload/hosting in v1 — limited to Google Fonts (and a small curated list of free alternatives to popular paid fonts).
- No team/collaboration features in v1.

## 4. Target Users

| Persona | Need |
|---|---|
| **Indie hacker / solo founder** | Needs a "good enough," professional-looking palette + font combo fast, without hiring a designer. |
| **Freelance designer** | Wants quick, defensible starting points for client proposals — needs the "why" to justify choices to clients. |
| **Frontend dev building a side project** | Wants copy-paste CSS variables / Tailwind tokens, not design theory. |
| **Design student / hobbyist** | Wants to learn *why* certain pairings work by seeing real-world-grounded examples. |

## 5. Core User Stories

1. As a user, I can browse a gallery of pre-built palette+font combos, filterable by mood/industry (e.g. "Trustworthy/SaaS," "Playful/Community," "Luxury/Editorial").
2. As a user, I can generate a new combo at random (constrained to combos likely to work, not pure randomness) and lock individual colors or fonts I like while regenerating the rest.
3. As a user, I can see my chosen combo rendered on a realistic mockup (hero section, nav bar, buttons, card, form) instantly — not just colored squares and font samples in isolation.
4. As a user, I can see at a glance whether every text/background pairing in my combo passes WCAG AA/AAA contrast — and get an automatic fix-it suggestion if it doesn't.
5. As a user, I can swap a single color or font within a combo and see the rest adapt/stay locked.
6. As a user, I can save combos I like and come back to them later.
7. As a user, I can export a finished combo as CSS custom properties, a Tailwind config snippet, or JSON.
8. As a user, I can share a combo via a URL so someone else (or another tab) sees the exact same setup.
9. As a user, I can compare 2–3 combos side by side before deciding.

## 6. Functional Requirements

### MVP (v1)
- **FR1 — Curated combo library:** A seed set of real-world-grounded palette+font combos (see companion document), each tagged by mood/industry/style.
- **FR2 — Filter & search:** Filter combos by tag (mood, industry, light/dark, color family).
- **FR3 — Live mockup preview:** Render the selected combo across a small set of standard components (hero, navbar, button x2 variants, card, form, footer) — see Design System document.
- **FR4 — Contrast/accessibility check:** Every text/background pair in a combo is checked against WCAG AA/AAA automatically; failing pairs are flagged with a suggested adjusted shade.
- **FR5 — Constrained randomize:** "Shuffle" button regenerates a combo from the curated/generated pool rather than fully random RGB+font roulette; supports per-role locks (lock primary color, lock heading font, etc.).
- **FR6 — Manual override:** User can swap any single color role or font role and see the live preview update immediately, with a contrast warning if the swap breaks accessibility.
- **FR7 — Save/favorite:** Local (and later account-based) saving of combos.
- **FR8 — Export:** Copy-ready CSS variables, Tailwind config object, and raw JSON.
- **FR9 — Shareable URL:** Encode the current combo state in the URL so it's shareable/bookmarkable without an account.

### v1.1 (fast follow)
- **FR10 — Comparison view:** Side-by-side view of 2–3 saved/selected combos.
- **FR11 — "Why this works" explanation:** Short generated/curated rationale per combo (mood, contrast logic, industry fit) — addresses the "poetic association" problem by making the reasoning explicit instead of left to feel.
- **FR12 — Dark mode variant per combo:** Auto-derive a dark-mode-safe version of each light combo (and vice versa).

### v2 (future / stretch)
- **FR13 — Brand color or logo upload:** User provides one fixed brand color (or extracts one from a logo), tool suggests compatible palettes + font pairs around it.
- **FR14 — AI-scored matching:** Model-based scoring of *why* a font pairing suits a given palette (warmth/coolness, contrast level, formality), rather than only curated pairs.
- **FR15 — Figma/Tokens Studio export.**
- **FR16 — Accounts + cloud sync** of saved combos and projects.

## 7. Non-Functional Requirements

- **Accessibility:** The app's own UI must meet WCAG AA. All *generated/suggested* combos must default to AA-passing text contrast; AAA flagged as a bonus badge.
- **Performance:** Preview updates on color/font swap should feel instant (<150ms perceived latency) — no full page reload for a swap.
- **Font loading:** Use Google Fonts (and self-hosted free alternatives for proprietary-font lookalikes) loaded on demand, not all fonts upfront.
- **Responsiveness:** Full functionality on desktop; mockup preview should also be viewable in a mobile-width frame.
- **No login required for MVP:** Core value (browse, preview, export) must work with zero signup friction. Saving can be local storage initially, account-based later.
- **Browser support:** Latest two versions of Chrome, Firefox, Safari, Edge.

## 8. Success Metrics (how you'll know it's worth continuing)

- % of sessions that result in at least one export (CSS/Tailwind/JSON copy) — this is the real "did this solve their problem" signal.
- Time from landing to first combo selected (lower = better matching/browsing UX).
- Return-visit rate (do people come back to compare/finish a decision they started).
- Qualitative: do people use it for an actual project (ask in any feedback channel)?

## 9. Assumptions & Constraints

- Solo/side-project scope — assume one developer, limited time, AI-assisted build.
- Fonts limited to Google Fonts catalog + a documented "free alternative" mapping for well-known proprietary fonts (can't redistribute fonts like Cereal, Circular, GT Walsheim).
- Color/font "rules" encoded for MVP will be **curated, not fully AI-generated** — i.e., the seed library (companion document) *is* the matching logic for v1. AI-driven matching is v2+.

## 10. Out of Scope (explicitly, for v1)

- Logo design, brand strategy, brand naming.
- Print/packaging color (CMYK considerations).
- Custom font upload/hosting.
- Multi-user collaboration/teams.

## 11. Open Questions

- Should "mood/industry" tags be fixed categories or freeform/searchable tags? (Recommend: fixed categories for browse + freeform search for flexibility.)
- Should contrast-fix suggestions auto-apply or just flag-and-suggest? (Recommend: flag-and-suggest, never silently change the user's chosen color.)
- Local-storage-only saves vs. requiring an account from day one? (Recommend: local storage for MVP, account layer only if retention data justifies it.)
