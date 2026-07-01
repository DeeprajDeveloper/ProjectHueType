import './MockupFooter.scss';

const FOOTER_MENUS = [
  {
    title: 'Product',
    links: ['Features', 'Pricing', 'Integrations', 'Changelog'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Blog', 'Press'],
  },
  {
    title: 'Support',
    links: ['Help center', 'Contact', 'Status', 'API docs'],
  },
];

function MockupFooter({ logoText = 'Acme Co.' }) {
  return (
    <footer className="mockup-footer">
      <div className="mockup-footer__top">
        <div className="mockup-footer__brand-block">
          <span className="mockup-footer__brand">{logoText}</span>
          <address className="mockup-footer__address">
            128 Market Street, Suite 400<br />
            San Francisco, CA 94105<br />
            United States
          </address>
        </div>

        <div className="mockup-footer__menus">
          {FOOTER_MENUS.map((menu) => (
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
        <span className="mockup-footer__copy">© 2026 Acme Co. All rights reserved.</span>
        <div className="mockup-footer__legal">
          <a href="#preview">Privacy</a>
          <a href="#preview">Terms</a>
          <a href="#preview">Cookies</a>
        </div>
      </div>
    </footer>
  );
}

export default MockupFooter;
