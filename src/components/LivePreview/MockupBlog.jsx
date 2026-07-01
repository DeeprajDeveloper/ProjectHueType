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
import { MOCKUP_COPY, DEFAULT_PREVIEW_LOGO } from '../../data/mockupCopy';

const ACTION_ICONS = [
  { id: 'clap', label: 'Clap', icon: HandsClappingIcon },
  { id: 'bookmark', label: 'Bookmark', icon: BookmarkIcon },
  { id: 'next', label: 'Next story', icon: ArrowRightIcon },
  { id: 'zoom', label: 'Adjust text size', icon: FileMagnifyingGlassIcon },
  { id: 'listen', label: 'Listen · read aloud', icon: HeadphonesIcon },
  { id: 'share', label: 'Share', icon: ShareIcon },
];

function MockupBlog({ parts = {}, logoText = DEFAULT_PREVIEW_LOGO }) {
  const copy = MOCKUP_COPY.blog;
  const show = (id) => parts[id] !== false;

  return (
    <div className="mockup-blog">
      {show('topNav') && (
        <header className="mockup-blog__nav">
          <span className="mockup-blog__logo">{logoText}</span>
          <nav className="mockup-blog__nav-links" aria-label="Article navigation">
            {copy.nav.links.map((link) => (
              <button key={link} type="button">{link}</button>
            ))}
          </nav>
          <div className="mockup-blog__nav-actions">
            <button type="button" className="mockup-blog__search" aria-label="Search">
              <Icon icon={MagnifyingGlassIcon} size={ICON_SIZE} />
            </button>
            <button type="button" className="mockup-blog__nav-signin">{copy.nav.signIn}</button>
          </div>
        </header>
      )}

      <div className="mockup-blog__layout">
        {show('authorRail') && (
          <aside className="mockup-blog__rail mockup-blog__rail--left" aria-label="Author">
            <div className="mockup-blog__author-sticky">
              <div className="mockup-blog__author-avatar" aria-hidden="true">{copy.author.initials}</div>
              <span className="mockup-blog__author-name">{copy.author.name}</span>
              <button type="button" className="mockup-blog__follow">{copy.author.follow}</button>
            </div>
          </aside>
        )}

        <article className="mockup-blog__article">
          {show('articleHeader') && (
            <header className="mockup-blog__header">
              <span className="mockup-blog__category">{copy.article.category}</span>
              <h1 className="mockup-blog__title">
                {copy.article.title}
              </h1>
              <p className="mockup-blog__meta">
                {copy.article.meta}
              </p>
            </header>
          )}

          {show('articleBody') && (
            <div className="mockup-blog__body">
              <p className="mockup-blog__lead">
                {copy.article.lead}
              </p>

              <p>
                {copy.article.body.paragraph1}
              </p>

              <h2>{copy.article.body.heading1}</h2>
              <p>
                {copy.article.body.paragraph2}
              </p>

              <blockquote>
                &ldquo;{copy.article.body.blockquote}&rdquo;
              </blockquote>

              <h2>{copy.article.body.heading2}</h2>
              <p>
                {copy.article.body.paragraph3}
              </p>

              <p>
                {copy.article.body.paragraph4}
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
