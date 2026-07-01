# Agent Prompt — SVG Logo Creation
### Feed this to your coding agent. Three concept directions, full technical specs.

---

## WHAT THIS APP DOES (read first, it should inform every design decision)

This is a design tool that lets developers and designers pick **color palettes and font pairings that work cohesively together** — not two separate decisions, but one unified system. The logo must embody that core idea: color and type as inseparable, not side-by-side. The logo should feel like it belongs in the same design-tool space as Figma, Coolors, and Linear — confident, clean, modern, and distinctly NOT generic.

The working name is **Huetype** (placeholder — substitute the final name when decided, but the letterforms used in concepts 1 and 2 should work for any short name).

---

## DESIGN PRINCIPLES FOR THE LOGO

1. **The logo IS the concept.** Color meeting type is the product idea — the logo should make that relationship visible, not just name it.
2. **Works at every size.** Must be legible and recognizable at 16px favicon, 32px app icon, 48px navbar, and 200px+ marketing use. Design the icon mark so it holds up in isolation at small sizes.
3. **No gradients on the wordmark.** The color stripes/swatches are a structured palette reference, not a gradient wash — use discrete color steps, not smooth fades. This signals "palette" not "generic colorful brand."
4. **Minimal and precise.** No decorative elements that don't earn their place. Every shape is load-bearing.
5. **Two weights max in the wordmark.** Serif (700) for the "brand" half, sans-serif (300–400) for the "utility" half — this is itself a demonstration of the font-pairing concept.
6. **Dark mode ready.** The icon must work on both light and dark backgrounds. Use CSS variables for the app chrome colors; use hardcoded hex only for the palette swatches (the palette colors are intentional, not themed).

---

## PALETTE FOR THE LOGO'S COLOR SWATCHES

These specific colors are used inside the logo mark as the "color scale" demonstration. They are NOT the app's own brand colors — they are a snapshot of a real, well-balanced palette used to show what the tool does.

```
Swatch 1 (light warm):   #F0997B  — coral tint
Swatch 2 (mid warm):     #D85A30  — terracotta/coral
Swatch 3 (mid cool):     #534AB7  — violet
Swatch 4 (strong cool):  #146EF5  — electric blue
Swatch 5 (deep cool):    #0C447C  — deep navy
```

These five swatches should appear in order (light → dark, warm → cool) wherever the color scale is shown in the mark.

---

## CONCEPT 1 — COLOR-SCALE LETTERFORM MARK + WORDMARK

### Idea
A single bold serif letterform (the initial letter of the app name) is filled with horizontal color bands — the five palette swatches stacked inside the letter. The letter itself becomes a color scale. The wordmark sits beside it.

This concept is the most direct visual expression of the product idea: a typographic form filled with palette color. At small sizes the colored H still reads as a letter; at large sizes the individual color bands become distinct.

### SVG Construction Instructions

**Canvas:** `viewBox="0 0 320 96"` — landscape, logo lockup format.

**Step 1 — The letter mark:**
- Place a single large serif uppercase letter (e.g. "H") centered in a 96×96 bounding box at left.
- Font: Georgia or a similar geometric-slab serif. Font-size: 100px. Font-weight: 800. Letter in near-black (`var(--text-primary)`).
- Apply a `<clipPath>` using a `<text>` element to create the letter silhouette.
- Inside the clip area, stack five `<rect>` elements of equal height, each filled with one palette swatch color (top to bottom: #F0997B → #D85A30 → #534AB7 → #146EF5 → #0C447C).
- Each band rect: `width="100"`, `height="20"` (5 bands × 20px = 100px height), `x="-2"` to bleed slightly past the letter edges before clipping.
- Over the filled bands, redraw the letter outline with `fill="none"`, `stroke="var(--border-strong)"`, `stroke-width="1"`, `opacity="0.2"` — gives the letter a subtle crisp edge in dark mode.

**Step 2 — The wordmark:**
- Position at x=112, vertically centered in the 96px canvas.
- First part of name (e.g. "Hue"): `font-family="Georgia, 'Times New Roman', serif"`, `font-size="28px"`, `font-weight="700"`, `fill="var(--text-primary)"`.
- Second part (e.g. "type"): `font-family="var(--font-sans)"`, `font-size="28px"`, `font-weight="300"`, `fill="var(--text-primary)"`, `letter-spacing="1"`.
- Place both parts on the same baseline (y="58") — they are one word, two weights, one concept.
- The visual contrast between the bold serif "Hue" and the light sans "type" IS a demonstration of font pairing.

**Step 3 — Color dot row (optional small detail beneath the mark):**
- 5 small circles in a row beneath the letter, x positions centered under the letter, y at letter bottom + 10px.
- Radius: 4px each, 8px gap between centers.
- Fill: the five swatch colors in order.
- This detail drops out at small sizes (don't include in the icon-only version).

**Step 4 — Icon-only version (for favicons and app icons):**
- Take just the clipped letter on a square canvas: `viewBox="0 0 96 96"`.
- Add a rounded square background: `<rect width="96" height="96" rx="18" fill="var(--surface-1)" stroke="var(--border)" stroke-width="1"/>`.
- Center the letterform at x=4, y=4, with the clip + bands inside.
- At 32px display, the color bands inside the letterform should still be visibly distinct — test this.

### Sizing variants to output:
- `logo-full.svg` — full lockup (mark + wordmark), `viewBox="0 0 320 96"`
- `logo-icon.svg` — icon mark only, `viewBox="0 0 96 96"`
- `logo-icon-32.svg` — simplified icon for tiny sizes, `viewBox="0 0 32 32"` (reduce to 3 bands instead of 5 for legibility)

---

## CONCEPT 2 — SPLIT MARK (Palette chips → Letterform)

### Idea
The mark is split in two halves by a thin vertical line. The **left half** is a column of stacked color swatches (5 rectangular chips). The **right half** is a single bold serif letter. The split reads instantly as "color on the left, type on the right" — the two halves of the product — united in one container.

The wordmark sits beneath the mark, full-width, in the same mixed-weight style as Concept 1.

### SVG Construction Instructions

**Canvas:** `viewBox="0 0 280 160"` — squarer, room for mark + wordmark stacked.

**Step 1 — Containing square:**
- `<rect x="0" y="0" width="100" height="100" rx="16" fill="var(--surface-1)" stroke="var(--border)" stroke-width="1"/>`

**Step 2 — Left half: color chips:**
- 5 `<rect>` elements stacked vertically inside the left half of the square.
- Each chip: `width="40"`, `height="14"`, `rx="4"`, `x="8"`.
- Y positions: 10, 27, 44, 61, 78 (14px height + 3px gap).
- Fill: #F0997B, #D85A30, #534AB7, #146EF5, #0C447C top to bottom.

**Step 3 — Divider:**
- `<line x1="54" y1="8" x2="54" y2="92" stroke="var(--border-strong)" stroke-width="1" opacity="0.4"/>`

**Step 4 — Right half: letterform:**
- A single large serif uppercase letter, e.g. "T" (for "Type") or the first initial of the app name.
- Centered in the right half (x=54 to x=100 → center x=77).
- Font: Georgia, font-size="60px", font-weight="800", text-anchor="middle", x="77", y="72".
- Fill: `var(--text-primary)`.

**Step 5 — Wordmark:**
- Below the mark container, y starting at 116.
- Full app name in split serif/sans as described in Concept 1.
- `font-size="18px"` to stay proportionate with the squarer mark.

**Step 6 — Icon-only version:**
- The square from Step 1 alone, `viewBox="0 0 100 100"` — the chips + divider + letterform work as a complete icon without the wordmark.

---

## CONCEPT 3 — SQUARE ICON (Palette strip + "Aa") + WORDMARK

### Idea
A clean square icon, split in half. The left side is a column of 5 color swatches. The right side shows the letters "A" (serif, large, for heading font) and "a" (sans-serif, small, for body font) stacked — an instant visual shorthand for "font pairing." A thin vertical rule divides the two halves.

This concept communicates the most literally — palette swatches on one side, typography representation on the other. It is the safest and most immediately legible option, especially at small sizes.

### SVG Construction Instructions

**Canvas for icon:** `viewBox="0 0 80 80"` — square.

**Step 1 — Icon shell:**
```svg
<rect x="0" y="0" width="80" height="80" rx="16"
      fill="var(--surface-1)" stroke="var(--border)" stroke-width="1"/>
```

**Step 2 — Left half: color swatch stack:**
- 5 `<rect>` chips: `width="28"`, `height="11"`, `rx="3"`, `x="6"`.
- Y positions: 8, 22, 36, 50, 64.
- Fills: #F0997B, #D85A30, #534AB7, #146EF5, #0C447C.

**Step 3 — Center divider:**
```svg
<line x1="40" y1="6" x2="40" y2="74"
      stroke="var(--border-strong)" stroke-width="1" opacity="0.35"/>
```

**Step 4 — Right half: type specimen:**
- Large "A" (serif): `<text x="60" y="50" font-size="30" font-weight="700" font-family="Georgia, serif" fill="var(--text-primary)" text-anchor="middle">A</text>`
- Small "a" (sans): `<text x="60" y="68" font-size="14" font-weight="400" font-family="var(--font-sans)" fill="var(--text-secondary)" text-anchor="middle">aa</text>`
- The uppercase serif A = heading font role. The lowercase sans "aa" = body font role. Together they communicate "font pairing" in two characters.

**Step 5 — Wordmark lockup:**
Full canvas: `viewBox="0 0 280 80"`

- Icon at x=0, y=0, width=80, height=80.
- Wordmark beginning at x=96, y=center.
  - Serif half: `<text x="96" y="46" font-size="28" font-weight="700" font-family="Georgia, serif" fill="var(--text-primary)">Hue</text>`
  - Sans half: `<text x="141" y="46" font-size="28" font-weight="300" font-family="var(--font-sans)" fill="var(--text-primary)" letter-spacing="2">type</text>`
- Optional tagline: `<text x="96" y="64" font-size="10" font-weight="400" font-family="var(--font-sans)" fill="var(--text-secondary)" letter-spacing="2">COLOR + TYPE, COHESIVE</text>`

**Step 6 — Favicon (16×16 and 32×32):**
- At 32×32: render just the icon, `viewBox="0 0 32 32"`. Reduce to 3 swatches (drop swatches 2 and 4 to reduce visual noise). Simplify the "A" to just the serif uppercase, drop the "aa". Divider at x=16.
- At 16×16: solid color block (left half) + single "A" (right half). No detail — just the split.

---

## SHARED TECHNICAL REQUIREMENTS (all three concepts)

### Colors (hardcode these — they are palette colors, not themed)
```
#F0997B  swatch 1
#D85A30  swatch 2
#534AB7  swatch 3
#146EF5  swatch 4
#0C447C  swatch 5
```

### App chrome colors (use CSS variables — these adapt to light/dark mode)
```
var(--text-primary)      → letterform fill, wordmark text
var(--text-secondary)    → wordmark secondary part, tagline
var(--surface-1)         → icon background
var(--border)            → icon stroke, divider
var(--border-strong)     → divider (slightly stronger)
```

### Typography
- Serif (for the heading/display role): `Georgia, 'Times New Roman', serif` — universally available, no font load needed for the logo itself.
- Sans-serif (for the body role): `var(--font-sans)` — inherits the app's body font (Inter or equivalent).
- Never use a web font that requires an external load for the logo SVG — it must render immediately.

### Stroke widths
- Icon shell: 1px
- Divider line: 1px, opacity 0.35
- Letter outline (concept 1 only): 1px, opacity 0.2
- No strokes on the color swatches — fill only.

### Corner radius
- Icon shell: rx="16" (at 80px square). Scale proportionally: `rx = width × 0.20`.
- Color swatches: rx="3" at full size, rx="2" at 32px icon, rx="1" at 16px.
- Wordmark text: no border-radius — it's text.

### No effects
- No drop shadows
- No gradients on the swatches (flat fills only — this is intentional, it signals "palette step" not "gradient wash")
- No blur or glow
- No animation in the logo SVG itself (animation lives in the app chrome, not the brand mark)

### What to output
For each concept, produce:
1. `logo-[concept]-full.svg` — full lockup (icon + wordmark), wide format
2. `logo-[concept]-icon.svg` — icon mark only, square
3. `logo-[concept]-icon-32.svg` — simplified 32×32 icon for small sizes
4. `logo-[concept]-dark-preview.html` — a simple HTML file with a dark background to verify dark mode legibility

### Dark mode verification checklist (agent must verify before delivering)
- [ ] The color swatches are still vibrant and distinct on a #1a1a1a background
- [ ] The icon shell (var(--surface-1)) has a visible edge against dark background
- [ ] The wordmark text (var(--text-primary)) is legible in dark mode
- [ ] The divider line is visible but not harsh in dark mode
- [ ] The letterform in the mark is legible in dark mode

---

## WHICH CONCEPT TO BUILD FIRST

**Recommended build order:** Concept 3 first (it's the most legible at small sizes and the construction is most predictable), then Concept 1 (the clipPath technique is more complex but produces the most distinctive result), then Concept 2 (good middle ground, useful if Concept 1 or 3 feel too safe or too literal respectively).

Build all three — the goal is to have real options to compare, not to pick one from a description.