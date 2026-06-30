import { useState } from 'react';
import './MockupNavbar.scss';

function MockupNavbar({ isMobile = false }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="mockup-navbar" aria-label="Preview navigation">
      <span className="mockup-navbar__logo">Brand</span>

      {isMobile ? (
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
                <a href="#preview" className="mockup-navbar__drawer-link" onClick={() => setMenuOpen(false)}>Features</a>
                <a href="#preview" className="mockup-navbar__drawer-link" onClick={() => setMenuOpen(false)}>Pricing</a>
                <a href="#preview" className="mockup-navbar__drawer-link" onClick={() => setMenuOpen(false)}>About</a>
                <button type="button" className="mockup-navbar__drawer-cta">Sign up</button>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="mockup-navbar__links">
            <a href="#preview" className="mockup-navbar__link">Features</a>
            <a href="#preview" className="mockup-navbar__link">Pricing</a>
            <a href="#preview" className="mockup-navbar__link">About</a>
          </div>
          <button type="button" className="mockup-navbar__cta">Sign up</button>
        </>
      )}
    </nav>
  );
}

export default MockupNavbar;
