# Design System Document — "Harmonize" (working name)
### Components & foundations needed to build the palette + font pairing app

---

## 1. Design Principles

1. **Show, don't list.** Every combo is judged on a realistic mockup, never just swatches + font names side by side.
2. **Accessible by default.** Contrast status is always visible, never hidden behind a separate "check" step.
3. **Reasoning over randomness.** Every suggestion can answer "why does this work," even briefly.
4. **Fast iteration.** Locking, swapping, and shuffling should feel as immediate as Coolors' spacebar-to-regenerate.
5. **Neutral chrome, loud content.** The app's own UI stays quiet (neutral grays/one accent) so the *combo being evaluated* is always the most visually prominent thing on screen.

---

## 2. Foundations

### 2.1 Color Tokens (the app's own UI — not the generated palettes)

| Token | Purpose | Example |
|---|---|---|
| `--surface-base` | Page background | near-white / near-black (light/dark mode) |
| `--surface-raised` | Cards, panels | one step lighter/darker than base |
| `--border-subtle` | Dividers, card outlines | low-contrast neutral |
| `--text-primary` | Body/headings in app chrome | high-contrast neutral |
| `--text-secondary` | Labels, captions | mid-contrast neutral |
| `--accent` | App's own CTA/links/active states (single accent, not the user's palette) | one brand hue |
| `--accent-contrast` | Text on accent | white or near-black depending on accent lightness |
| `--success` / `--warning` / `--danger` | Contrast pass / borderline / fail states | green / amber / red |

> Note: these are the **app's own chrome colors**, kept deliberately separate from whatever palette the user is currently previewing, so the UI doesn't visually fight with the content being evaluated.

### 2.2 Typography Scale (app chrome)

| Role | Size | Weight | Use |
|---|---|---|---|
| Display | 32–40px | 600–700 | Page-level headers ("Browse combos") |
| Heading | 20–24px | 600 | Section headers, combo card titles |
| Body | 14–16px | 400–500 | Descriptions, labels |
| Caption | 12–13px | 400–500 | Tags, metadata, hex codes |
| Mono | 13–14px | 400 | Hex codes, exported code snippets |

> The app's chrome typeface should be a single, quiet, highly legible sans (e.g. Inter) — it should never compete with the font pairings being previewed inside mockups.

### 2.3 Spacing, Radius, Shadow

- **Spacing scale:** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 (px), used consistently across cards, panels, and the preview canvas.
- **Radius:** small (6px) for chips/badges, medium (10–12px) for cards/buttons, large (16px) for the main preview frame.
- **Shadow:** one subtle elevation level for cards/dropdowns; one stronger elevation for modals (export panel, comparison view).

### 2.4 Breakpoints

- Mobile: <640px (single column, mockup preview collapses to mobile frame by default)
- Tablet: 640–1024px
- Desktop: >1024px (side-by-side: filter/library panel + live preview)

### 2.5 Iconography

- Lock/unlock (per-role locking)
- Shuffle/dice (randomize)
- Swap/refresh (single-role regenerate)
- Heart/bookmark (save/favorite)
- Copy (export)
- Share/link
- Check / alert-triangle / x-circle (contrast pass/warn/fail)
- Sun/moon (light/dark mode toggle)
- Grid/columns (comparison view)

---

## 3. Component Inventory

For each component: **purpose, anatomy, states/variants, accessibility notes.**

### 3.1 App Shell / Top Nav
- **Purpose:** Global navigation — Browse, My Combos (saved), Compare, Create/Random.
- **Anatomy:** Logo/wordmark, primary nav links, light/dark toggle, "New combo" primary button.
- **States:** default, active link, scrolled (condensed) variant.
- **A11y:** Skip-to-content link; nav is keyboard-navigable; active state has both color and underline (not color alone).

### 3.2 Combo Card
- **Purpose:** The primary browsing unit in the library grid — represents one palette+font combo.
- **Anatomy:** Color swatch strip (4–5 roles: primary/secondary/accent/background/text), heading-font sample word, body-font sample sentence, mood/industry tags, contrast badge, save (heart) icon, hover-to-preview affordance.
- **States:** default, hover (subtle lift + "Preview" CTA appears), selected/active, saved.
- **Variants:** grid card (compact) vs. list row (dense browsing).
- **A11y:** Card is a single focusable element (not nested interactive traps); save icon has accessible label ("Save combo"), not icon-only with no text alternative.

### 3.3 Filter & Search Bar
- **Purpose:** Narrow the library by mood/industry/style/color family.
- **Anatomy:** Text search input, tag-chip filter group (multi-select), sort dropdown (newest/popular/alphabetical).
- **States:** chip default / selected / disabled (no results).
- **A11y:** Chips behave as toggle buttons (`aria-pressed`), not plain divs; search input has a visible label even if visually minimal (not placeholder-only).

### 3.4 Mood/Category Selector
- **Purpose:** High-level entry point ("Trustworthy," "Playful," "Luxury," "Earthy," "Bold") — a friendlier on-ramp than raw filtering for new users.
- **Anatomy:** Horizontal scrollable row of illustrated/colored category tiles.
- **States:** default, hover, selected.

### 3.5 Live Preview Panel
- **Purpose:** The core "show, don't list" surface — renders the current combo across realistic mockup components.
- **Anatomy:** Device-width toggle (desktop/mobile), contains the Mockup Components (below) stacked in a scrollable frame, contrast-status summary pinned at top.
- **States:** loading (font swap in progress), updated (brief highlight flash on change), error (font failed to load — falls back to system font with a visible note).
- **A11y:** Preview is marked as a live region only for the contrast-status summary (so screen readers aren't flooded on every keystroke during manual tweaking).

#### Mockup Components rendered *inside* the Live Preview:
- **Hero block** — large heading + subtext + primary button, using the combo's background/primary/accent roles.
- **Navbar mockup** — logo placeholder + nav links + CTA button.
- **Buttons** — primary (filled, accent color) and secondary (outline/ghost) variants, default/hover/disabled states.
- **Card** — image placeholder + heading + body text + tag, to test secondary/background roles.
- **Form** — label + input + helper text + submit button, to test contrast on form elements specifically (a common failure point).
- **Footer strip** — to test the combo on a darker or inverted section if the combo defines one.

### 3.6 Contrast/Accessibility Badge
- **Purpose:** At-a-glance pass/fail per text-background pairing.
- **Anatomy:** Small pill: ✓ AAA / ✓ AA / ⚠ AA-large-text-only / ✕ Fail, with the numeric ratio on hover/tap.
- **States:** pass (success color), borderline (warning color), fail (danger color, with a "suggest fix" link).
- **A11y:** Status communicated via icon + text + color together — never color alone (this badge is itself a contrast-sensitive component and must follow its own rule).

### 3.7 Customize Panel
- **Purpose:** Manual override of individual roles within a combo.
- **Anatomy:** Per-role row (Primary / Secondary / Accent / Background / Text — and Heading Font / Body Font), each with a swatch-click-to-open color picker or a font dropdown with live-rendered font names (not just plain text labels).
- **States:** default, editing (picker open), changed-from-original (small "reset" affordance appears).
- **A11y:** Color picker supports direct hex input, not just visual picking (for precision and for users who can't easily distinguish similar hues).

### 3.8 Lock & Randomize Controls
- **Purpose:** Coolors-style "shuffle but keep what I like."
- **Anatomy:** Lock icon toggle on each role (color or font); a single "Shuffle" button that regenerates only unlocked roles.
- **States:** unlocked (default), locked (icon filled/highlighted).
- **A11y:** Keyboard shortcut (spacebar) for shuffle, documented in a visible hint, not hidden.

### 3.9 Export Panel (Modal)
- **Purpose:** Turn a finished combo into usable code.
- **Anatomy:** Tabs — CSS Variables / Tailwind Config / JSON — each in a syntax-highlighted code block with a single "Copy" button; a small live mini-preview stays visible alongside the code so the user isn't exporting blind.
- **States:** default, copied (brief confirmation), tab-switch.
- **A11y:** Code block is reachable and readable by screen reader (not an image); copy button announces success via a toast, not only a visual checkmark.

### 3.10 Save / Favorite Control
- **Purpose:** Bookmark a combo for later.
- **Anatomy:** Heart icon (card-level) + "Save" button (detail-level), toast confirmation on save.
- **States:** unsaved, saved (filled heart), removed.

### 3.11 Comparison View
- **Purpose:** Side-by-side evaluation of 2–3 combos before committing.
- **Anatomy:** Columns, each a mini version of the Live Preview Panel (hero + button only, to keep it scannable), with each column's contrast badge visible.
- **States:** 2-up, 3-up (max, to avoid overwhelming); remove-from-comparison per column.

### 3.12 Toast / Snackbar
- **Purpose:** Lightweight confirmation (saved, copied, shuffled with locks respected).
- **Anatomy:** Bottom-anchored, auto-dismiss after ~3s, single action max (e.g. "Undo").
- **A11y:** Announced via `aria-live="polite"`, not just visual.

### 3.13 Empty / Onboarding State
- **Purpose:** First-run experience when there's no saved combos yet, or a filter returns zero results.
- **Anatomy:** Friendly illustration/placeholder + one clear CTA ("Browse combos" or "Clear filters").

---

## 4. Interaction Patterns

- **Spacebar = shuffle unlocked roles** (mirrors the convention Coolors trained an entire user base on — don't fight it).
- **Click any swatch or font name = open inline editor**, not a separate page.
- **Hover combo card = live mini-preview**, not just a static image, so browsing itself is already "show don't list."
- **Drag-to-reorder** not needed for v1 (no multi-combo sequencing required yet).
- **Keyboard:** full tab-order through filters → cards → preview controls; Escape closes any open modal/picker.

## 5. Content & Voice Guidelines (brief)

- Contrast badge labels: factual, not alarmist ("Fails AA at this size" not "Bad contrast!").
- "Why this works" copy (v1.1 feature): one or two short, concrete sentences — name the mood and the mechanism (e.g., "Warm terracotta against a deep navy gives strong contrast while staying inviting rather than corporate"), not generic adjectives alone.
