import { MOCKUP_COPY, DEFAULT_PREVIEW_LOGO, formatMockupCopy } from '../../data/mockupCopy';
import './MockupFooter.scss';

function MockupFooter({ logoText = DEFAULT_PREVIEW_LOGO }) {
  const copy = MOCKUP_COPY.marketing.footer;

  return (
    <footer className="mockup-footer">
      <div className="mockup-footer__top">
        <div className="mockup-footer__brand-block">
          <span className="mockup-footer__brand">{logoText}</span>
          <address className="mockup-footer__address">
            {copy.address.line1}<br />
            {copy.address.line2}<br />
            {copy.address.line3}
          </address>
        </div>

        <div className="mockup-footer__menus">
          {copy.menus.map((menu) => (
            <div key={menu.title} className="mockup-footer__menu">
              <h3 className="mockup-footer__menu-title">{menu.title}</h3>
              <ul className="mockup-footer__menu-list">
                {menu.links.map((link) => (
                  <li key={link}>
                    <a href="#preview">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mockup-footer__bottom">
        <span className="mockup-footer__copy">
          {formatMockupCopy(copy.copyright, { brand: logoText })}
        </span>
        <div className="mockup-footer__legal">
          <a href="#preview">{copy.legal.privacy}</a>
          <a href="#preview">{copy.legal.terms}</a>
          <a href="#preview">{copy.legal.cookies}</a>
        </div>
      </div>
    </footer>
  );
}

export default MockupFooter;
