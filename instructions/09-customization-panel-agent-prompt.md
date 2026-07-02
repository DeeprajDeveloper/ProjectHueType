# Agent Prompt — Live Content Customization Panel
### Real-time text editing so users can preview combos with their own content

---

## WHAT THIS FEATURE IS

Users can currently browse palette + font combos and see them applied to a live preview mockup. But the preview always shows generic placeholder content ("Acme Co.", "The modern way to build beautiful products"). This feature lets users **replace that placeholder content with their own real content** so the preview reflects their actual product — making the palette/font evaluation decision genuinely meaningful rather than abstract.

This is not a CMS or data persistence feature. It's a **lightweight in-session content layer** — the user types their content, the preview updates in real time, and it lives in app state (or localStorage as a bonus). Nothing gets saved to a server.

---

## DATA MODEL

Two layers of content, kept strictly separate in state:

### Layer 1 — Brand Content (global, applies across all archetypes)

```typescript
interface BrandContent {
  companyName: string;          // default: "Acme Co."
  tagline: string;              // default: "Design better, ship faster"
  primaryCTA: string;           // default: "Get started free"
  secondaryCTA: string;         // default: "View demo"
  logoType: 'initials' | 'text' | 'placeholder';  // default: 'initials'
  logoInitials: string;         // default: auto-derived from companyName (first 2 chars)
  navLinks: string[];           // default: ["Features", "Pricing", "About", "Contact"]
}
```

### Layer 2 — Page Content (per-archetype, switches with the active archetype)

```typescript
interface PageContent {
  landingPage: {
    heroEyebrow: string;        // default: "Design better, ship faster"
    heroHeadline: string;       // default: "The modern way to build beautiful products"
    heroSubtext: string;        // default: "See your palette and typography come alive..."
    featureCards: Array<{
      title: string;
      description: string;
    }>;                         // default: 3 cards with placeholder content
    sectionHeadline: string;    // default: "Everything you need to evaluate a combo"
  };
  dashboard: {
    appName: string;            // default: "Dashboard"
    statCards: Array<{
      label: string;
      value: string;
    }>;                         // default: 4 stat cards
    tableTitle: string;         // default: "Recent activity"
    tableColumns: string[];     // default: ["Name", "Status", "Date", "Amount"]
  };
  aiChat: {
    assistantName: string;      // default: "Assistant"
    welcomeMessage: string;     // default: "How can I help you today?"
    samplePrompt: string;       // default: "Help me write a product description"
    sampleResponse: string;     // default: "Here's a compelling product description..."
  };
  blog: {
    publicationName: string;    // default: "The Journal"
    articleTitle: string;       // default: "The art of choosing the right typeface"
    authorName: string;         // default: "Sarah Chen"
    authorRole: string;         // default: "Senior Designer"
    readTime: string;           // default: "5 min read"
    articleBody: string;        // default: 2–3 paragraphs of placeholder copy
  };
  ecommerce: {
    storeName: string;          // default: "Shop"
    productName: string;        // default: "Premium Wireless Headphones"
    productPrice: string;       // default: "$299"
    productDescription: string; // default: "Experience sound like never before..."
    ctaLabel: string;           // default: "Add to cart"
  };
  auth: {
    formTitle: string;          // default: "Welcome back"
    formSubtitle: string;       // default: "Sign in to your account"
    ctaLabel: string;           // default: "Sign in"
    switchPrompt: string;       // default: "Don't have an account? Sign up"
  };
}
```

### State management

```typescript
// Single source of truth — lift this to the app's top-level state
const contentState = {
  brand: BrandContent,          // one object, always active
  pages: PageContent,           // all archetypes, indexed by key
  activeArchetype: keyof PageContent,  // drives which page fields show in the panel
  isDirty: boolean,             // true if any field differs from defaults
}
```

Pass `contentState.brand` and `contentState.pages[activeArchetype]` as props into every preview archetype component. The preview re-renders automatically when content state changes — no "apply" or "refresh" step.

---

## THE CUSTOMIZATION PANEL

### Location

A **collapsible right-side drawer** that slides in from the right edge of the preview canvas, overlapping slightly. It does NOT replace the existing right panel (the combo library) — it's a separate layer that only appears when the user opens it.

**Trigger:** A "Customize content" button in the top bar, between the WCAG badge and the frame toggle. Icon: `ti-text-resize` or `ti-pencil`. When active, the button gets a filled/accent state.

Alternatively, if the app has a right sidebar panel structure, this panel can live as a new nav section — "Content" — beneath "Customize" in the sidebar. Either approach is valid; choose whichever fits the existing layout better.

### Panel structure

```
┌─────────────────────────────────────┐
│  Customize content          [×] [↺] │  ← header: title + close + reset-all
├─────────────────────────────────────┤
│  YOUR BRAND                [–]      │  ← collapsible section, open by default
│  Company name     [Acme Co.      ]  │
│  Tagline          [Design better ]  │
│  Primary CTA      [Get started   ]  │
│  Secondary CTA    [View demo     ]  │
│  Nav links        [+ Add link    ]  │
├─────────────────────────────────────┤
│  THIS PAGE — Landing page   [–]     │  ← switches with active archetype
│  Eyebrow text     [DESIGN BETTER ]  │
│  Hero headline    [The modern way]  │
│  Hero subtext     [See your palet]  │
│  ▸ Feature cards  (3 items)  [edit] │  ← expandable sub-group
│  Section headline [Everything you]  │
├─────────────────────────────────────┤
│  [Reset this page]  [Reset all]     │  ← footer actions
└─────────────────────────────────────┘
```

### Section: "Your brand" (always visible)

**Company name**
- Input type: single-line text
- Max length: 32 characters
- Side effect: auto-updates `logoInitials` to first 2 characters of first 2 words, unless user has manually set initials
- Character counter shown when within 8 chars of limit

**Tagline**
- Input type: single-line text
- Max length: 72 characters

**Primary CTA / Secondary CTA**
- Input type: single-line text
- Max length: 24 characters each
- Shown side by side in a 2-column layout

**Nav links**
- Rendered as a small editable list: each link is a text input with a drag handle (for reorder) and a delete icon
- "Add link" button appends a new empty input, focused immediately
- Min: 2 links, Max: 6 links
- On mobile preview mode: links collapse to a hamburger, so only the first 2–3 matter visually — add a quiet note: "Only first 3 links visible in mobile preview"

**Logo**
- Not a file upload in v1 — too complex for the side-project scope
- Instead: a segmented control — "Initials" (default) / "Text" / "Placeholder box"
  - Initials: renders a colored circle with auto-derived 2-letter initials (styled using the palette's primary color)
  - Text: renders the company name as the logo wordmark, in the heading font
  - Placeholder box: renders a gray rectangle (for users who want to focus on the palette without any logo context)

### Section: "This page — [Archetype name]"

This section's label and fields **change when the user switches archetypes**. Animate the transition with a 150ms fade so the swap feels intentional, not jarring.

Each archetype's fields are specified below. All are single-line text unless noted.

**Landing page fields:**
- Eyebrow text (the small uppercase label above the headline) — max 48 chars, shown in caps in the preview
- Hero headline — max 72 chars — use a textarea (2 rows), since headlines often span 2 lines
- Hero subtext — max 140 chars — textarea (3 rows)
- Feature cards (expandable sub-group, 3 cards, each with Title + Description)
- Section headline — max 72 chars

**Dashboard fields:**
- Stat card labels (4 fields: label only, values are decorative numbers) — each max 24 chars
- Table title — max 32 chars
- Table columns (4 fields) — each max 16 chars

**AI chat fields:**
- Assistant name — max 24 chars
- Welcome message — max 80 chars — textarea
- Sample user prompt — max 80 chars — textarea
- Sample response (first sentence only — keep it short, the preview renders the rest as placeholder lines) — max 120 chars — textarea

**Blog fields:**
- Publication name — max 32 chars
- Article title — max 80 chars — textarea (2 rows)
- Author name — max 32 chars
- Author role/title — max 48 chars

**E-commerce fields:**
- Product name — max 64 chars
- Price — max 12 chars (text, not a number input — "£299", "$29/mo", "Free" are all valid)
- Short product description — max 120 chars — textarea

**Auth page fields:**
- Form headline ("Welcome back") — max 32 chars
- Form subline ("Sign in to your account") — max 64 chars
- CTA button label — max 24 chars

### Field component design

Every field follows this structure:

```
Label                          [↺]   ← reset-to-default icon, only shown if field is dirty
┌────────────────────────────────┐
│ Field value                    │
└────────────────────────────────┘
  12 / 32                            ← character counter, only shown when focused
```

- **Label:** 11px, `var(--text-secondary)`, sentence case
- **Input:** standard text input, `var(--surface-2)` background, `0.5px solid var(--border)`, `border-radius: var(--radius)`, 13px font size. On focus: `border-color: var(--border-accent)`, no glow/shadow.
- **Dirty indicator:** when a field differs from its default, show a small filled dot (4px, `var(--fill-accent)`) to the left of the label — not the reset icon until hover. On hover of the label row, the dot swaps to a `↺` reset icon (tooltip: "Reset to default").
- **Character counter:** appears only on focus, right-aligned below the input in 11px `var(--text-muted)`. Turns `var(--text-warning)` when within 10% of max length. Turns `var(--text-danger)` and the input border turns danger-colored at the limit.
- **Textarea:** same styling as input, min-height based on specified rows, resizable vertically only (`resize: vertical`). Never horizontal resize.
- **Debounce:** update the preview state 200ms after the last keystroke — not on every character. This prevents the preview from re-rendering 50 times as someone types a headline.

### Reset behavior

**Reset individual field (↺ on hover):** resets that field to its default value, updates preview immediately.

**Reset this page:** resets all fields in the "This page" section to defaults. Show a brief inline confirmation before executing: a small banner replaces the button for 2 seconds — "Page content reset" — then returns to normal. No modal, no "are you sure."

**Reset all (↺ in panel header):** resets ALL content (brand + all page archetypes) to defaults. This one DOES warrant a confirmation — but not a modal. Instead, the button changes to "Confirm reset?" with a checkmark icon for 3 seconds. If the user clicks again within 3 seconds, reset executes. If they don't, it reverts. This is the "switch safety" pattern — two deliberate clicks, no interruption.

---

## HOW THE PREVIEW CONSUMES CONTENT

Every archetype component receives content via props, not by reading from a global store directly. This keeps the components portable and testable.

```typescript
// Example — landing page archetype component signature
interface LandingPagePreviewProps {
  brand: BrandContent;
  page: PageContent['landingPage'];
  palette: PaletteCombo;
  fontPair: FontPair;
  frame: 'desktop' | 'tablet' | 'mobile';
}
```

**Text elements in the preview that are editable must be clearly identifiable.** When the customization panel is open, add a subtle hover state to editable text elements in the preview — a `1px dashed var(--border-accent)` outline on hover, with a `ti-pencil` micro-icon appearing at the top-right corner of the hovered element. Clicking that element **focuses the corresponding field in the customization panel** (scroll it into view + briefly highlight the input with a 300ms accent border pulse). This creates a bidirectional link: panel → preview AND preview → panel.

This "click to edit" affordance should only be visible when the customization panel is open — not by default, as it would add visual noise to the preview during normal palette evaluation.

---

## PERSISTENCE (optional, implement after core is working)

Once the core feature works in-session, add localStorage persistence as a light enhancement:

```typescript
// On any content state change:
localStorage.setItem('huetype_content', JSON.stringify(contentState));

// On app load:
const saved = localStorage.getItem('huetype_content');
if (saved) {
  try {
    const parsed = JSON.parse(saved);
    // validate structure before applying
    setContentState(parsed);
  } catch {
    // corrupted data — ignore and use defaults
  }
}
```

Show a quiet "Content restored from last session" toast on load if saved content is found and applied. Include a "Clear" action on the toast so users can start fresh without hunting for a reset button.

---

## BUILD ORDER

1. **Data model first** — define `BrandContent` and `PageContent` interfaces and wire up state with defaults. No UI yet. Verify the preview components can consume props and re-render when state changes.
2. **Brand section** — build "Your brand" fields only (company name, tagline, CTAs, nav links). Test that the preview updates in real time across all archetypes.
3. **Landing page section** — add the "This page" section for the landing page archetype only. Verify the archetype switch clears/switches the page fields correctly.
4. **Remaining archetypes** — add page content fields for dashboard, AI chat, blog, e-commerce, auth.
5. **Panel polish** — dirty indicators, reset behavior, character counters, click-to-edit affordance in preview.
6. **LocalStorage persistence** — add last, after everything else is stable.

---

## WHAT NOT TO BUILD (explicitly out of scope for v1)

- No image/logo upload — initials/text/placeholder only
- No rich text editing — plain text only, the preview handles styling
- No content templates or presets ("fill with SaaS content", "fill with e-commerce content") — v2 idea, very good one, save it
- No multi-language / i18n support
- No sharing of content state via URL (the palette combo is shareable via URL per the requirements doc; content is session-only for now)
- No AI-assisted content generation ("suggest a headline for my palette") — excellent v2 idea, flag it

---

## EDGE CASES TO HANDLE

- **Empty fields:** if a user clears a field entirely, fall back to the default value in the preview — never render an empty headline or button. The field itself can be empty (cursor in an empty input is fine); the preview silently uses the default until content is provided.
- **Very long content:** cap rendering in the preview at the field's max length even if state somehow contains more. The preview should never break its layout because of content length.
- **Archetype switch with unsaved mental work:** if a user has typed custom content for the landing page, switches to dashboard, then switches back — their landing page content must still be there. All archetype content lives in state simultaneously; only the *panel display* switches, not the data.
- **Logo initials edge cases:** single-word company names use first 2 characters ("Stripe" → "St"). All-caps inputs ("ACME") use first 2 characters ("AC"). Numbers and special characters are allowed but the initials should strip non-alpha characters if they result in an unreadable 2-char combo.
