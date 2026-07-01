# Agent Prompt — Type Scale, Color Scale & WCAG Visualizer Components
### Feed this directly to your coding agent. Each section is self-contained.

---

## CONTEXT (read before building anything)

You are building three UI components for a design tool called [app name] — a palette + font pairing app. The user has already chosen a color combo and a font pair. These three components help them *understand* what they've chosen, not just see it. Every design decision should reinforce one principle: **show the information, don't make the user calculate it themselves.** Nothing should require the user to read a tooltip to understand what's happening.

The app's own chrome uses neutral grays (CSS variables: `--surface-base`, `--surface-raised`, `--border-subtle`, `--text-primary`, `--text-secondary`, `--accent`). The components you build are part of that chrome — they display the *user's chosen palette and fonts*, not the app's own brand colors.

---

## COMPONENT 1 — TYPE SCALE VISUALIZER

### What it is
A live, interactive display of the chosen font pair rendered at every step in a typographic scale. It should feel like a type specimen sheet — the kind a type foundry would ship — not a table of numbers.

### Layout

Render the scale as a vertical stack of rows, one per size step. Each row has three zones laid out horizontally:

```
[ SIZE LABEL ]  [ LIVE TEXT SAMPLE ]  [ METADATA ]
```

- **Size label** (left, fixed width ~80px): the step name first ("Display", "H1", "H2", "H3", "Body LG", "Body", "Small", "Caption", "Mono"), then the px value below it in a smaller caption. Both in the app's `--text-secondary` color, monospace font, so they read as labels not content.
- **Live text sample** (center, fills remaining width): actual text rendered in the user's chosen font at that size. Use real words — not "Lorem ipsum" and not "Aa". Use a rotating set of short phrases that show off the font's character (see copy guidelines below).
- **Metadata** (right, fixed width ~160px): line height, letter spacing, and suggested use — rendered as a small, quiet column of key: value pairs. Show only what's useful; hide this column on mobile (it collapses to a tap-to-expand behavior).

### Scale steps to render (default — user can switch ratio)

| Step | Size | Weight | Font role | Line height |
|---|---|---|---|---|
| Display | 60px | 700 | Heading font | 1.1 |
| H1 | 48px | 700 | Heading font | 1.15 |
| H2 | 36px | 600 | Heading font | 1.2 |
| H3 | 28px | 600 | Heading font | 1.25 |
| H4 | 22px | 600 | Heading font | 1.3 |
| Body LG | 18px | 400 | Body font | 1.6 |
| Body | 16px | 400 | Body font | 1.6 |
| Small | 14px | 400 | Body font | 1.5 |
| Caption | 12px | 500 | Body font | 1.4 |
| Mono | 13px | 400 | Mono font (fallback: body) | 1.5 |

**Scale ratio switcher:** render a small segmented control above the stack — "Minor Second (1.125) / Major Second (1.200) / Minor Third (1.250) / Perfect Fourth (1.333) / Golden Ratio (1.618)". When the user switches ratio, all px sizes re-derive from a 16px base and the stack updates live. Show the formula: `base × ratio^n` in a quiet caption beneath the control, so the user understands the math without needing to look it up.

### Copy for live text samples (rotate these per step, never use Lorem ipsum)
- Display: **"Build something beautiful"**
- H1: **"Your palette, your voice"**
- H2: **"Color tells the story"**
- H3: **"Chosen with intention"**
- H4: **"A system that holds together"**
- Body LG: **"The right typeface does more than deliver words — it sets the mood before a single sentence is read."**
- Body: **"Good typography is invisible. It guides without interrupting, informs without demanding attention."**
- Small: **"Use this size for supporting copy, labels, and secondary descriptions."**
- Caption: **"Caption text · 12px · Use for timestamps, tags, and helper text"**
- Mono: **`const palette = { primary: "#146EF5", accent: "#FF6B35" }`**

### Interactive behaviors
- **Hover any row:** a subtle highlight (`--surface-raised` background) appears behind the full row, and the metadata column slides in if on desktop. No tooltip — everything is already in the row.
- **Click a row:** copies the CSS for that text style to clipboard (font-family, font-size, font-weight, line-height, letter-spacing). Show a brief "Copied" confirmation in the size label zone — not a toast, not a modal, just a 1-second text swap from "H2" to "Copied ✓".
- **Font role toggle:** above the stack, two small buttons — "Heading font" / "Body font". Clicking either scrolls the stack to that section and briefly highlights those rows.
- **Edit sample text (optional, v1.1):** a small edit icon at the top right of the component lets the user type their own copy, replacing all sample rows at once. Good for testing with real product copy.

### What NOT to do
- Do not render a table with columns for "font-family", "size", "weight" — that's a spec sheet, not a visualizer.
- Do not use "Lorem ipsum" or "The quick brown fox" — they waste the only chance to show the font doing real work.
- Do not show more than one metric (size) in the left label at font sizes below 16px — it becomes illegible and defeats the purpose.
- Do not add a border between every row — a subtle `--border-subtle` divider below every third row is enough; solid borders at every row fight with the type itself.

---

## COMPONENT 2 — COLOR SCALE VISUALIZER

### What it is
Not just a row of swatches. This shows each color in the user's palette rendered at **every lightness step** (50→900 in Tailwind-style increments), makes the relationship between steps visible, and shows each color *doing a job* — not just sitting in a box.

### Layout

Render as a vertical stack of **color role sections**, one per palette role (Background, Surface, Primary, Secondary, Accent, Text, Destructive). Each section has:

```
[ ROLE HEADER ]
[ STEP STRIP ]
[ USAGE DEMONSTRATION ]
```

**Role header** (full width, one line): role name left-aligned in `--text-primary`, the base hex right-aligned in `--text-secondary` monospace. A single thin `--border-subtle` line below.

**Step strip:** a horizontal row of 11 swatches for that color, from step 50 (near-white tint) to step 950 (near-black shade), with the base color highlighted (larger, with a subtle ring). Each swatch shows:
- Its hex value on hover (not permanently — it's too cluttered)
- Its step number (50, 100, 200 … 900, 950) below the swatch, always visible, in `--text-secondary` caption size
- A **contrast dot** on each swatch: a small ● rendered in either black or white depending on which passes WCAG AA against that swatch's background — gives an instant read on usable text colors at every step without any labels

**Usage demonstration:** directly below the step strip for each role, show **two small real-usage examples** using that color — not abstract shapes, actual UI fragments. For example:

| Role | Usage examples to render |
|---|---|
| Primary | A filled button ("Get started") + a nav link with underline |
| Accent | A badge/tag ("New") + an icon with label |
| Background | A card on that background with a heading and body text |
| Surface | A panel/sidebar slice with a list item |
| Text | A heading + body paragraph at 16px + a caption |
| Destructive | A danger button ("Delete") + an inline error message |

These are small (max 280px wide) — they are not full mockups. They exist to answer "where would I actually use this color?" without forcing the user to imagine it.

### Color step generation
Derive the 11 steps from the base hex using HSLuv (perceptually uniform) lightness interpolation:
- Steps 50–400: lighter tints (increase lightness toward white, reduce saturation slightly)
- Step 500: base color (or nearest)
- Steps 600–950: darker shades (decrease lightness toward black, slight saturation bump at 600–700, then flatten)

Show the derivation formula in a quiet collapsed "How are these generated?" accordion beneath the full component — one sentence: "Steps are derived from your base color using perceptually uniform lightness interpolation (HSLuv), so each step looks equally spaced to the human eye."

### Interactive behaviors
- **Click any swatch:** copies its hex to clipboard. Same "Copied ✓" micro-confirmation as Type Scale — swap the step number text for 1 second.
- **Hover a swatch:** shows hex + HSL + HSLuv values in a small floating label (not a full tooltip — just the values, no label text).
- **"Use as [role]" on hover (v1.1):** let the user drag or assign any step to a semantic role — e.g. promote a 700-step shade to become the primary instead of the 500.
- **Collapse/expand per role:** each role section has a collapse chevron in the header — so users who only care about one or two roles can reduce the visual noise.

### What NOT to do
- Do not render all roles as one giant swatch grid without grouping — it becomes impossible to understand which color belongs to which role.
- Do not label swatches with both hex AND rgb AND hsl permanently — pick hex as the default, offer others only on hover/click.
- Do not omit the usage examples — swatches without context are what every other tool already does; the usage examples are the differentiator.
- Do not use pure white (#FFFFFF) and pure black (#000000) as the step 50 and 950 endpoints — they're jarring and usually not how colors actually behave at their extremes.

---

## COMPONENT 3 — WCAG ACCESSIBILITY INFO PANEL

### What it is
A clear, scannable pass/fail overview of every text-on-background combination in the current combo. The key design challenge: WCAG is intimidating to non-designers — the panel must demystify it, not amplify the jargon.

### Layout

Three zones stacked vertically:

```
[ OVERALL STATUS BAR ]
[ CONTRAST PAIR GRID ]
[ WCAG EXPLAINER ]
```

---

**Zone 1 — Overall Status Bar**

A single full-width bar at the top. Three states:

- ✅ **All pairs pass AA** — green left border, icon + "All text combinations meet WCAG AA (4.5:1 minimum). This palette is safe to use." Background: very subtle green tint.
- ⚠️ **Some pairs borderline** — amber left border, icon + "2 of 7 combinations need attention. See details below." Background: subtle amber tint.
- ❌ **Failures present** — red left border, icon + "3 combinations fail WCAG AA. Using them for body text risks excluding users with low vision." Background: subtle red tint.

No jargon in this bar. No ratio numbers. Just a clear plain-English verdict.

---

**Zone 2 — Contrast Pair Grid**

A grid of **cards**, one per meaningful text/background combination in the palette. Each card shows:

```
┌──────────────────────────────┐
│  [TEXT SAMPLE ON BG COLOR]   │ ← actual text rendered in the combination
│                              │
│  Text role on Background     │ ← plain role names, not hex codes
│  "Body text on surface"      │
│                              │
│  4.87:1  ✓ AA  ✓ AA Large  ✗ AAA  │ ← ratio + tier badges
│                              │
│  [Fix suggestion if failing] │
└──────────────────────────────┘
```

**The text sample inside the card is the most important element** — render "The quick brown fox" at 16px (body size) AND "Heading" at 24px bold. Both in the actual foreground color on the actual background color. Let the user's eyes make the judgment before they read the ratio.

**Ratio + tier badges:**
- Show the numeric ratio (e.g. "4.87:1") in monospace, `--text-secondary`
- Three tier badges side by side: "AA" / "AA Large" / "AAA" — each a small pill, green if passing, gray if not. Do not use red for failing tiers — gray communicates "not achieved yet" rather than "danger," which is more accurate (failing AAA is not a crisis; failing AA is).
- Exception: if a pair fails **AA entirely**, that's the one place to use a red/danger badge and a fix suggestion.

**Fix suggestion (only shown on AA failures):**
A small inline area below the ratio badges: "Lighten background to [auto-derived hex] or darken text to [auto-derived hex] to reach 4.5:1." Show the suggested swaps as tiny color chips (click to apply). Do not show fix suggestions for pairs that already pass AA — it creates unnecessary anxiety.

**Pairs to check (derive these automatically from the palette roles):**
1. Text on Background
2. Text on Surface / Card
3. Primary (button text) on Primary (button background)
4. Accent text on Background
5. Text on Primary (e.g. white text on a colored button)
6. Secondary text on Background
7. Text on Accent background
8. Destructive text on Background (and white on Destructive)

---

**Zone 3 — WCAG Explainer**

A collapsible section (collapsed by default, labeled "What is WCAG?"). When opened, it shows a clear, jargon-minimal explanation. **Write it in second person, present tense, plain English:**

```
WCAG (Web Content Accessibility Guidelines) are the global standard
for making websites readable by everyone — including people with
low vision, color blindness, or aging eyesight.

Contrast ratio measures how different your text color is from
its background. The scale runs from 1:1 (invisible — same color)
to 21:1 (maximum — black on white).

Here's what the thresholds mean for you:

  AA (4.5:1)       The legal minimum in many countries.
                   Required for body text and UI labels.
                   This is the floor, not the goal.

  AA Large (3:1)   For text above 18px regular or 14px bold.
                   Larger text is easier to read at lower contrast.

  AAA (7:1)        The gold standard. Not required, but meaningful
                   for text-heavy reading experiences.

1 in 12 men and 1 in 200 women have some form of color vision
deficiency. Passing AA means your design works for them too.
```

Below the explainer text, add a small **contrast ratio number line** — a horizontal gradient bar from 1:1 to 21:1, with threshold markers at 3:1, 4.5:1, and 7:1 labeled. Plot the user's current worst-performing pair on this bar as a dot. This makes the ratio a felt number, not an abstract one.

---

### Interaction behaviors (all three zones)

- **Auto-update:** all three zones update in real time when the user changes any color or font in the palette. No "re-check" button. WCAG status should never be a separate step — it's always live.
- **Click a failing pair card:** the relevant swatch in the Color Scale component (above) pulses briefly with a highlight ring — connecting the abstract pair to the actual color role.
- **"Apply fix" on a fix suggestion:** clicking either suggested hex swap updates the palette role and immediately re-checks all pairs. Shows a toast: "Primary updated — all pairs now pass AA."
- **Keyboard navigation:** tab moves between pair cards; Enter expands the detail; fix suggestions are keyboard-reachable.

---

## SHARED DESIGN STYLE (applies to all three components)

### Visual language
- **Quiet chrome, loud content.** The component frames (headers, labels, borders) use `--surface-raised`, `--border-subtle`, `--text-secondary`. The content — type specimens, color swatches, contrast samples — uses the user's actual chosen colors. Never compete with the thing being evaluated.
- **No decorative icons.** Icons appear only where they communicate status (pass ✓ / warning ⚠ / fail ✗) or trigger an action (copy, collapse, edit). Decorative icons add noise in a component where the user is already processing a lot of visual information.
- **Monospace for all numbers.** Hex codes, px sizes, contrast ratios, line heights — all monospace, all `--text-secondary`. This signals "data" clearly and prevents number columns from shifting width.
- **Radius:** 8px on cards and swatches. 4px on badges and small chips. 0px on full-width bars (status bar, section dividers) — let those bleed edge to edge.
- **Transitions:** 120ms ease-out on hover states, swatch highlights, and badge color changes. 200ms ease-out on expand/collapse. Nothing longer — these are utility components, not hero moments.

### Typography (for component chrome only — not the type specimen)
- Labels, step numbers, role names: 12px / 500 / `--text-secondary` / 1.4 line height
- Metadata values (line height, letter spacing, contrast ratio): 13px / 400 / monospace / `--text-secondary`
- Section headers: 14px / 600 / `--text-primary`
- Explanatory body copy (WCAG explainer): 14px / 400 / `--text-primary` / 1.6 line height

### Spacing
- 24px padding inside each component frame
- 16px gap between rows in the type scale
- 8px gap between swatches in the color scale strip
- 12px gap between pair cards in the WCAG grid
- 32px gap between the three components when stacked on a page

### Responsive behavior
- **Type scale:** on mobile (<640px), collapse the metadata column; keep size label and live text sample. Tap a row to reveal metadata in an inline expand.
- **Color scale:** on mobile, make the step strip horizontally scrollable (not wrapping — wrapping breaks the visual relationship between steps). Cap swatch width at 32px on mobile.
- **WCAG grid:** on mobile, collapse from a 2-column grid to a single-column stack. The overall status bar always stays full width and pinned near the top.

### Accessibility of the components themselves
- All interactive elements (swatches, row clicks, collapse toggles) have visible focus rings (2px solid `--accent`, 2px offset).
- Pass/fail status is never communicated by color alone — always icon + text + color together.
- The WCAG explainer is always reachable by keyboard.
- The contrast ratio numbers in the pair cards must themselves pass AA against their card background — the irony of an accessibility panel that fails its own contrast check is not abstract.
