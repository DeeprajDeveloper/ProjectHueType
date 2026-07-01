import './MockupBlog.scss';
import {
  HandsClappingIcon,
  BookmarkIcon,
  ArrowRightIcon,
  FileMagnifyingGlassIcon,
  HeadphonesIcon,
  ShareIcon,
  MagnifyingGlassIcon,
} from '@phosphor-icons/react';
import Icon from '../Icon/Icon';
import { ICON_SIZE } from '../Icon/iconConfig';

const ACTION_ICONS = [
  { id: 'clap', label: 'Clap', icon: HandsClappingIcon },
  { id: 'bookmark', label: 'Bookmark', icon: BookmarkIcon },
  { id: 'next', label: 'Next story', icon: ArrowRightIcon },
  { id: 'zoom', label: 'Adjust text size', icon: FileMagnifyingGlassIcon },
  { id: 'listen', label: 'Listen · read aloud', icon: HeadphonesIcon },
  { id: 'share', label: 'Share', icon: ShareIcon },
];

function MockupBlog({ parts = {}, logoText = 'Acme Co.' }) {
  const show = (id) => parts[id] !== false;

  return (
    <div className="mockup-blog">
      {show('topNav') && (
        <header className="mockup-blog__nav">
          <span className="mockup-blog__logo">{logoText}</span>
          <nav className="mockup-blog__nav-links" aria-label="Article navigation">
            <button type="button">Our story</button>
            <button type="button">Membership</button>
            <button type="button">Write</button>
          </nav>
          <div className="mockup-blog__nav-actions">
            <button type="button" className="mockup-blog__search" aria-label="Search">
              <Icon icon={MagnifyingGlassIcon} size={ICON_SIZE} />
            </button>
            <button type="button" className="mockup-blog__nav-signin">Sign in</button>
          </div>
        </header>
      )}

      <div className="mockup-blog__layout">
        {show('authorRail') && (
          <aside className="mockup-blog__rail mockup-blog__rail--left" aria-label="Author">
            <div className="mockup-blog__author-sticky">
              <div className="mockup-blog__author-avatar" aria-hidden="true">AR</div>
              <span className="mockup-blog__author-name">Alex Rivera</span>
              <button type="button" className="mockup-blog__follow">Follow</button>
            </div>
          </aside>
        )}

        <article className="mockup-blog__article">
          {show('articleHeader') && (
            <header className="mockup-blog__header">
              <span className="mockup-blog__category">Design systems</span>
              <h1 className="mockup-blog__title">
                Why typography and color should be chosen together
              </h1>
              <p className="mockup-blog__meta">
                8 min read · March 14, 2026
              </p>
            </header>
          )}

          {show('articleBody') && (
            <div className="mockup-blog__body">
              <p className="mockup-blog__lead">
                Most teams pick a color palette first, then hunt for fonts that &ldquo;feel right.&rdquo;
                The problem is that type and color interact in ways a swatch grid never reveals.
              </p>

              <p>
                Contrast ratios shift with weight, size, and background, and a font that looks crisp on white can
                feel muddy on a tinted surface. When evaluating a combo, test it against the kinds of pages you
                actually ship: long articles, dense dashboards, pricing tables, and product cards all stress
                different parts of the palette.
              </p>

              <h2>Start with real content, not placeholders</h2>
              <p>
                Short marketing headlines hide legibility issues that show up in paragraphs, captions,
                and UI labels. Map every foreground/background pair you rely on — primary on secondary,
                text on tinted panels, links on hover — and fix failures before they reach production.
              </p>

              <blockquote>
                &ldquo;The best palettes are the ones you never notice because everything just reads
                effortlessly.&rdquo;
              </blockquote>

              <h2>Contrast is a system, not a checkbox</h2>
              <p>
                Passing AA on body text against a white background does not guarantee your accent color
                works on buttons, badges, or navigation. HueType exists to make that pairing process fast:
                shuffle until something clicks, lock what you love, and preview the result on layouts that
                mirror real products — not just hero sections.
              </p>

              <p>
                Long-form reading is where font and color pairings earn their keep. Line length, line height,
                and paragraph rhythm all interact with background tint and text color in ways that short UI
                copy never exposes. If your combo works here, it will work almost everywhere else.
              </p>
            </div>
          )}
        </article>

        {show('actionRail') && (
          <aside className="mockup-blog__rail mockup-blog__rail--right" aria-label="Reading actions">
            <div className="mockup-blog__actions-sticky">
              {ACTION_ICONS.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  className="mockup-blog__action"
                  aria-label={action.label}
                  title={action.label}
                >
                  <Icon icon={action.icon} size={ICON_SIZE} />
                </button>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

export default MockupBlog;
