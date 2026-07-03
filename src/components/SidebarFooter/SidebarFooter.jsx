import { FOOTER_LINK_ITEMS, FOOTER_NAV_ITEMS, ExportIcon } from '../../data/sidebarNavItems';
import { APP_COPYRIGHT_START_YEAR, APP_SITE_HOST, APP_SITE_URL, APP_VERSION } from '../../data/buildInfo';
import Icon from '../Icon/Icon';
import { ICON_SIZE_SM } from '../Icon/iconConfig';
import './SidebarFooter.scss';

function SidebarFooter({
  activePanel,
  panelOpen,
  onPanelChange,
  onExport,
  exportActive = false,
  onFeedback,
  collapsed = false,
}) {
  const currentYear = new Date().getFullYear();
  const copyrightYears = currentYear > APP_COPYRIGHT_START_YEAR
    ? `${APP_COPYRIGHT_START_YEAR}–${currentYear}`
    : String(APP_COPYRIGHT_START_YEAR);

  return (
    <footer className="sidebar-footer">
      <button
        type="button"
        className={`sidebar-footer__export ${exportActive ? 'sidebar-footer__export--active' : ''}`}
        onClick={onExport}
        aria-pressed={exportActive}
        data-tour="export-footer"
      >
        <Icon icon={ExportIcon} size={ICON_SIZE_SM} />
        <span className="sidebar-footer__export-label">Export</span>
        {collapsed && <span className="sidebar-footer__tooltip" role="tooltip">Export</span>}
      </button>

      <ul className="sidebar-footer__list">
        {FOOTER_NAV_ITEMS.map((item) => {
          if (item.action === 'feedback') {
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className="sidebar-footer__item"
                  onClick={onFeedback}
                  data-tour="feedback-footer"
                >
                  <Icon icon={item.icon} size={ICON_SIZE_SM} />
                  <span className="sidebar-footer__label">{item.label}</span>
                  {collapsed && <span className="sidebar-footer__tooltip" role="tooltip">{item.label}</span>}
                </button>
              </li>
            );
          }

          const isActive = activePanel === item.id && panelOpen;
          const label = item.showVersion ? `${item.label} · v${APP_VERSION}` : item.label;

          return (
            <li key={item.id}>
              <button
                type="button"
                className={`sidebar-footer__item ${isActive ? 'sidebar-footer__item--active' : ''}`}
                onClick={() => onPanelChange(item.id)}
                aria-pressed={isActive}
                data-tour={item.id === 'help' ? 'help-footer' : `${item.id}-footer`}
              >
                <Icon icon={item.icon} size={ICON_SIZE_SM} active={isActive} />
                <span className="sidebar-footer__label">{label}</span>
                {collapsed && <span className="sidebar-footer__tooltip" role="tooltip">{label}</span>}
              </button>
            </li>
          );
        })}
        {FOOTER_LINK_ITEMS.map((item) => (
          <li key={item.id}>
            <a
              href={item.href}
              className="sidebar-footer__item sidebar-footer__item--link"
              data-tour={`${item.id}-footer`}
            >
              <Icon icon={item.icon} size={ICON_SIZE_SM} />
              <span className="sidebar-footer__label">{item.label}</span>
              {collapsed && <span className="sidebar-footer__tooltip" role="tooltip">{item.label}</span>}
            </a>
          </li>
        ))}
      </ul>

      <p className="sidebar-footer__copyright">
        © {copyrightYears}{' '}
        <a href={APP_SITE_URL} className="sidebar-footer__copyright-link">
          {APP_SITE_HOST}
        </a>
      </p>
    </footer>
  );
}

export default SidebarFooter;
