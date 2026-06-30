import './MockupBlog.scss';

function MockupBlog({ parts = {} }) {
  const show = (id) => parts[id] !== false;

  return (
    <article className="mockup-blog">
      {show('articleHeader') && (
        <header className="mockup-blog__header">
          <span className="mockup-blog__category">Design systems</span>
          <h1 className="mockup-blog__title">
            Why typography and color should be chosen together
          </h1>
          <p className="mockup-blog__meta">
            By Alex Rivera · March 14, 2026 · 8 min read
          </p>
        </header>
      )}

      {show('articleBody') && (
        <div className="mockup-blog__body">
          <p>
            Most teams pick a color palette first, then hunt for fonts that &ldquo;feel right.&rdquo;
            The problem is that type and color interact in ways a swatch grid never reveals — contrast
            ratios shift with weight, size, and background, and a font that looks crisp on white can
            feel muddy on a tinted surface.
          </p>

          <h2>Start with real content, not placeholders</h2>
          <p>
            Short marketing headlines hide legibility issues that show up in paragraphs, captions,
            and UI labels. When evaluating a combo, test it against the kinds of pages you actually
            ship: long articles, dense dashboards, pricing tables, and product cards all stress
            different parts of the palette.
          </p>

          <h2>Contrast is a system, not a checkbox</h2>
          <p>
            Passing AA on body text against a white background does not guarantee your accent color
            works on buttons, badges, or navigation. Map every foreground/background pair you rely on
            — primary on secondary, text on tinted panels, links on hover — and fix failures before
            they reach production.
          </p>

          <blockquote>
            &ldquo;The best palettes are the ones you never notice because everything just reads
            effortlessly.&rdquo;
          </blockquote>

          <p>
            HueType exists to make that pairing process fast: shuffle until something clicks, lock
            what you love, and preview the result on layouts that mirror real products — not just
            hero sections.
          </p>
        </div>
      )}
    </article>
  );
}

export default MockupBlog;
