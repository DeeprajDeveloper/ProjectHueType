# HueType

Pick color palettes and font pairings that work together — previewed on realistic page mockups, checked for accessibility, and ready to export.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## MVP features

- **Curated combo library** — 17 real-world-grounded palette + font pairings
- **Filter & search** — by mood, industry, and light/dark mode
- **Live mockup preview** — five archetypes (marketing site, dashboard, pricing, blog, e-commerce) with toggleable sections and desktop / tablet / mobile frames
- **WCAG contrast checks** — automatic pass/fail with fix suggestions
- **Shuffle with locks** — regenerate unlocked roles (press Space)
- **Manual override** — swap any color or font with live preview
- **Save favorites** — persisted in local storage
- **Export** — CSS variables, Tailwind config, JSON
- **Shareable URLs** — combo state encoded in the URL

## Project structure

```
src/
├── components/       # One folder per component (jsx + scss)
├── data/             # Seed combo library
├── hooks/            # Shared React hooks
├── styles/           # Global variables, mixins, reset
└── utils/            # Contrast, export, fonts, shuffle, URL state
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
