import { useState } from 'react';
import { MOCKUP_COPY, DEFAULT_PREVIEW_LOGO } from '../../data/mockupCopy';
import './MockupNavbar.scss';

function MockupNavbar({ compactNav = false, onOpenAuth, logoText = DEFAULT_PREVIEW_LOGO }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const copy = MOCKUP_COPY.marketing.navbar;

  const handleAuth = (mode) => {
    setMenuOpen(false);
    onOpenAuth?.(mode);
  };

  return (
    <nav className="mockup-navbar" aria-label="Preview navigation">
      <span className="mockup-navbar__logo">{logoText}</span>

      {compactNav ? (
        <>
          <button
            type="button"
            className="mockup-navbar__hamburger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>

          {menuOpen && (
            <>
              <div
                className="mockup-navbar__overlay"
                aria-hidden="true"
                onClick={() => setMenuOpen(false)}
              />
              <div className="mockup-navbar__drawer">
                {copy.links.map((link) => (
                  <a
                    key={link}
                    href="#preview"
                    className="mockup-navbar__drawer-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link}
                  </a>
                ))}
                <div className="mockup-navbar__drawer-actions">
                  <button type="button" className="mockup-navbar__login" onClick={() => handleAuth('login')}>
                    {copy.login}
                  </button>
                  <button type="button" className="mockup-navbar__cta" onClick={() => handleAuth('signup')}>
                    {copy.signup}
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="mockup-navbar__links">
            {copy.links.map((link) => (
              <a key={link} href="#preview" className="mockup-navbar__link">{link}</a>
            ))}
          </div>
          <div className="mockup-navbar__actions">
            <button type="button" className="mockup-navbar__login" onClick={() => handleAuth('login')}>
              {copy.login}
            </button>
            <button type="button" className="mockup-navbar__cta" onClick={() => handleAuth('signup')}>
              {copy.signup}
            </button>
          </div>
        </>
      )}
    </nav>
  );
}

export default MockupNavbar;
