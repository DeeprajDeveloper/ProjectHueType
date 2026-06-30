import { useState } from 'react';
import './MockupNavbar.scss';

function MockupNavbar({ compactNav = false, onOpenAuth }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleAuth = (mode) => {
    setMenuOpen(false);
    onOpenAuth?.(mode);
  };

  return (
    <nav className="mockup-navbar" aria-label="Preview navigation">
      <span className="mockup-navbar__logo">Acme Co.</span>

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
                <a href="#preview" className="mockup-navbar__drawer-link" onClick={() => setMenuOpen(false)}>Product</a>
                <a href="#preview" className="mockup-navbar__drawer-link" onClick={() => setMenuOpen(false)}>Pricing</a>
                <a href="#preview" className="mockup-navbar__drawer-link" onClick={() => setMenuOpen(false)}>About</a>
                <a href="#preview" className="mockup-navbar__drawer-link" onClick={() => setMenuOpen(false)}>Contact</a>
                <div className="mockup-navbar__drawer-actions">
                  <button type="button" className="mockup-navbar__login" onClick={() => handleAuth('login')}>
                    Log in
                  </button>
                  <button type="button" className="mockup-navbar__cta" onClick={() => handleAuth('signup')}>
                    Sign up
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="mockup-navbar__links">
            <a href="#preview" className="mockup-navbar__link">Product</a>
            <a href="#preview" className="mockup-navbar__link">Pricing</a>
            <a href="#preview" className="mockup-navbar__link">About</a>
            <a href="#preview" className="mockup-navbar__link">Contact</a>
          </div>
          <div className="mockup-navbar__actions">
            <button type="button" className="mockup-navbar__login" onClick={() => handleAuth('login')}>
              Log in
            </button>
            <button type="button" className="mockup-navbar__cta" onClick={() => handleAuth('signup')}>
              Sign up
            </button>
          </div>
        </>
      )}
    </nav>
  );
}

export default MockupNavbar;
