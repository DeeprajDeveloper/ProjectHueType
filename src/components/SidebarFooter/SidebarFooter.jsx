import { useState, useEffect } from 'react';
import { CaretDownIcon, ChatCircleDotsIcon, QuestionIcon } from '@phosphor-icons/react';
import {
  SYSTEM_INFO_GROUP,
  SYSTEM_INFO_NAV_ITEMS,
  SYSTEM_INFO_STORAGE_KEY,
  isSystemInfoPanelActive,
} from '../../data/sidebarNavItems';
import { APP_VERSION } from '../../data/buildInfo';
import Icon from '../Icon/Icon';
import { ICON_SIZE_SM } from '../Icon/iconConfig';
import './SidebarFooter.scss';

const FOOTER_TOOLTIPS = {
  feedback: 'Report bugs or share ideas',
  help: 'Keyboard shortcuts',
  'system-info': 'Build info & feature catalog',
  'build-info': `v${APP_VERSION} · app overview`,
  'feature-catalog': 'Built & planned components',
};

function readSystemInfoOpen() {
  try {
    const stored = localStorage.getItem(SYSTEM_INFO_STORAGE_KEY);
    if (stored !== null) return stored === 'true';
  } catch {
    // ignore
  }
  return false;
}

function SidebarFooter({ activePanel, panelOpen, onPanelChange, onFeedback }) {
  const systemInfoActive = isSystemInfoPanelActive(activePanel, panelOpen);
  const [systemInfoOpen, setSystemInfoOpen] = useState(readSystemInfoOpen);

  useEffect(() => {
    if (systemInfoActive) {
      setSystemInfoOpen(true);
    }
  }, [systemInfoActive]);

  const handleSystemInfoToggle = () => {
    setSystemInfoOpen((open) => {
      const next = !open;
      try {
        localStorage.setItem(SYSTEM_INFO_STORAGE_KEY, String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const renderFooterButton = ({
    id,
    label,
    icon,
    isActive,
    onClick,
    nested = false,
    dataTour,
    ariaPressed,
  }) => (
    <li key={id} className={nested ? 'sidebar-footer__subitem' : undefined}>
      <button
        type="button"
        className={`sidebar-footer__btn ${nested ? 'sidebar-footer__btn--nested' : ''} ${isActive ? 'sidebar-footer__btn--active' : ''}`}
        onClick={onClick}
        aria-pressed={ariaPressed}
        data-tour={dataTour}
      >
        <Icon icon={icon} size={ICON_SIZE_SM} active={isActive} />
        <span className="sidebar-footer__label">{label}</span>
        
      </button>
    </li>
  );

  return (
    <footer className="sidebar-footer">
      <ul className="sidebar-footer__list">
        {renderFooterButton({
          id: 'feedback',
          label: 'Feedback',
          icon: ChatCircleDotsIcon,
          isActive: false,
          onClick: onFeedback,
          dataTour: 'feedback-footer',
        })}

        {renderFooterButton({
          id: 'help',
          label: 'Help',
          icon: QuestionIcon,
          isActive: activePanel === 'help' && panelOpen,
          onClick: () => onPanelChange('help'),
          dataTour: 'help-footer',
          ariaPressed: activePanel === 'help' && panelOpen,
        })}

        <li className={`sidebar-footer__group ${systemInfoOpen ? 'sidebar-footer__group--open' : ''}`}>
          <button
            type="button"
            className={`sidebar-footer__group-trigger ${systemInfoActive ? 'sidebar-footer__group-trigger--active' : ''}`}
            aria-expanded={systemInfoOpen}
            onClick={handleSystemInfoToggle}
            data-tour="system-info-footer"
          >
            <Icon icon={SYSTEM_INFO_GROUP.icon} size={ICON_SIZE_SM} active={systemInfoActive} />
            <span className="sidebar-footer__label">{SYSTEM_INFO_GROUP.label}</span>
            <span className="sidebar-footer__tooltip" role="tooltip">
              {FOOTER_TOOLTIPS['system-info']}
            </span>
            <span className={`sidebar-footer__chevron ${systemInfoOpen ? 'sidebar-footer__chevron--open' : ''}`} aria-hidden="true">
              <Icon icon={CaretDownIcon} size={ICON_SIZE_SM} />
            </span>
          </button>

          {systemInfoOpen && (
            <ul className="sidebar-footer__sublist">
              {SYSTEM_INFO_NAV_ITEMS.map((item) => renderFooterButton({
                id: item.id,
                label: item.label,
                icon: item.icon,
                isActive: activePanel === item.id && panelOpen,
                onClick: () => onPanelChange(item.id),
                nested: true,
                dataTour: item.id === 'build-info' ? 'build-info-footer' : 'feature-catalog-footer',
                ariaPressed: activePanel === item.id && panelOpen,
              }))}
            </ul>
          )}
        </li>
      </ul>
    </footer>
  );
}

export default SidebarFooter;
