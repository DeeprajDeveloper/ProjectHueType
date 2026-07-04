import { useState } from 'react';
import { MOCKUP_COPY, DEFAULT_PREVIEW_LOGO } from '../../data/mockupCopy';
import './MockupDocs.scss';

function MockupDocs({ parts = {}, logoText = DEFAULT_PREVIEW_LOGO }) {
  const [activeLink, setActiveLink] = useState('intro');
  const copy = MOCKUP_COPY.docs;
  const show = (id) => parts[id] !== false;

  return (
    <div className="mockup-docs">
      {show('sidebarNav') && (
        <aside className="mockup-docs__sidebar" aria-label="Documentation navigation">
          <span className="mockup-docs__logo">{logoText}</span>
          {copy.nav.sections.map((section) => (
            <div key={section.title} className="mockup-docs__nav-section">
              <h2 className="mockup-docs__nav-title">{section.title}</h2>
              <nav>
                {section.links.map((link, linkIndex) => (
                  <button
                    key={link.id}
                    type="button"
                    className={`mockup-docs__nav-link ${activeLink === link.id ? 'mockup-docs__nav-link--active' : ''}`}
                    onClick={() => setActiveLink(link.id)}
                    data-inspect={linkIndex === 0 && section === copy.nav.sections[0] ? 'docs-nav-link' : undefined}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>
          ))}
        </aside>
      )}

      <div className="mockup-docs__main">
        {show('pageHeader') && (
          <header className="mockup-docs__header">
            <p className="mockup-docs__breadcrumb">{copy.header.breadcrumb}</p>
            <h1 className="mockup-docs__title" data-inspect="docs-page-heading">{copy.header.title}</h1>
            <p className="mockup-docs__description">{copy.header.description}</p>
          </header>
        )}

        <div className="mockup-docs__layout">
          {show('contentArea') && (
            <article className="mockup-docs__content">
              <h2 id="overview">Overview</h2>
              <p data-inspect="docs-body-paragraph">{copy.content.overview}</p>

              <h2 id="concepts">{copy.content.conceptsHeading}</h2>
              <p>{copy.content.concepts}</p>

              {show('codeBlocks') && (
                <figure className="mockup-docs__code" data-inspect="docs-code-block">
                  <figcaption>{copy.code.label}</figcaption>
                  <pre><code>{copy.code.snippet}</code></pre>
                </figure>
              )}

              <h2 id="roles">{copy.content.rolesHeading}</h2>
              <p>{copy.content.roles}</p>

              <h2 id="next">{copy.content.nextHeading}</h2>
              <p>{copy.content.next}</p>
            </article>
          )}

          {show('tableOfContents') && (
            <aside className="mockup-docs__toc" aria-label="On this page">
              <h2 className="mockup-docs__toc-title">On this page</h2>
              <ol>
                {copy.toc.map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}>{item}</a>
                  </li>
                ))}
              </ol>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}

export default MockupDocs;
