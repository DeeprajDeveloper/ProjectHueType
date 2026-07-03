import { useState } from 'react';
import { MOCKUP_COPY, DEFAULT_PREVIEW_LOGO } from '../../data/mockupCopy';
import './MockupEmail.scss';

function MockupEmail({ parts = {}, logoText = DEFAULT_PREVIEW_LOGO }) {
  const copy = MOCKUP_COPY.email;
  const show = (id) => parts[id] !== false;
  const brand = logoText.trim() || copy.header.brand;
  const [ctaClicked, setCtaClicked] = useState(false);
  const [activeLink, setActiveLink] = useState(null);

  return (
    <div className="mockup-email">
      <p className="mockup-email__preheader">{copy.preheader}</p>
      <div className="mockup-email__frame">
        {show('emailHeader') && (
          <header className="mockup-email__header">
            <span className="mockup-email__brand">{brand}</span>
            <span className="mockup-email__tagline">{copy.header.tagline}</span>
          </header>
        )}

        {show('heroBlock') && (
          <section className="mockup-email__hero">
            <h1 className="mockup-email__title">{copy.hero.title}</h1>
            <p className="mockup-email__body">{copy.hero.body}</p>
          </section>
        )}

        {show('contentBlocks') && (
          <div className="mockup-email__blocks">
            {copy.blocks.map((block) => (
              <section key={block.title} className="mockup-email__block">
                <h2 className="mockup-email__block-title">{block.title}</h2>
                <p className="mockup-email__block-body">{block.body}</p>
              </section>
            ))}
          </div>
        )}

        {show('ctaButton') && (
          <div className="mockup-email__cta-wrap">
            <button
              type="button"
              className={`mockup-email__cta ${ctaClicked ? 'mockup-email__cta--clicked' : ''}`}
              onClick={() => setCtaClicked(true)}
            >
              {ctaClicked ? 'Opening…' : copy.cta}
            </button>
          </div>
        )}

        {show('emailFooter') && (
          <footer className="mockup-email__footer">
            <p className="mockup-email__footer-address">{copy.footer.address}</p>
            <p className="mockup-email__footer-links">
              {copy.footer.links.map((link, i) => (
                <span key={link}>
                  {i > 0 && ' · '}
                  <button
                    type="button"
                    className={`mockup-email__footer-link ${activeLink === link ? 'mockup-email__footer-link--active' : ''}`}
                    onClick={() => setActiveLink(link)}
                  >
                    {link}
                  </button>
                </span>
              ))}
            </p>
            <p className="mockup-email__footer-legal">{copy.footer.legal}</p>
          </footer>
        )}
      </div>
    </div>
  );
}

export default MockupEmail;
