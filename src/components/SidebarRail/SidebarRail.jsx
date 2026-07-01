import { useState, useRef, useEffect } from 'react';
import {
  SidebarSimpleIcon,
  SunIcon,
  MoonIcon,
  ShareNetworkIcon,
  HeartIcon,
  ExportIcon,
  BooksIcon,
  QuestionIcon,
  ChatCircleDotsIcon,
} from '@phosphor-icons/react';
import {
  TOP_NAV_ITEMS,
  PROTOTYPE_GROUP,
  SYSTEM_INFO_GROUP,
} from '../../data/sidebarNavItems';
import Icon from '../Icon/Icon';
import { ICON_SIZE, ICON_SIZE_SM } from '../Icon/iconConfig';
import './SidebarRail.scss';

const RAIL_NAV_ITEMS = [...TOP_NAV_ITEMS, PROTOTYPE_GROUP];

const APP_ITEMS = [
  { id: 'theme', icon: null, label: 'Switch Light/Dark Mode' },
  { id: 'share', icon: ShareNetworkIcon, label: 'Share combo' },
  { id: 'save', icon: HeartIcon, label: 'Save combo' },
  { id: 'export', icon: ExportIcon, label: 'Export combo' },
];

function SidebarRail({
  onExpand,
  activePanel,
  panelOpen,
  onPanelChange,
  onToggleTheme,
  onShare,
  onSave,
  isSaved,
  onExport,
  exportActive = false,
  theme,
  hasActiveFilters,
  isCompact = false,
  onFeedback,
}) {
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!openMenuId) return undefined;

    const handlePointerDown = (event) => {
      if (menuRef.current?.contains(event.target)) return;
      setOpenMenuId(null);
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpenMenuId(null);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openMenuId]);

  const handleNavClick = (id) => {
    setOpenMenuId(null);
    onPanelChange(id);
  };

  const handleClick = (id) => {
    switch (id) {
      case 'expand':
        onExpand();
        break;
      case 'theme':
        onToggleTheme();
        break;
      case 'share':
        onShare();
        break;
      case 'save':
        onSave();
        break;
      case 'export':
        onExport();
        break;
      default:
        if (TOP_NAV_ITEMS.some((item) => item.id === id)) {
          handleNavClick(id);
        }
        break;
    }
  };

  const isFlatNavActive = (item) => activePanel === item.id && panelOpen;

  const isGroupActive = (item) =>
    openMenuId === item.id ||
    item.children?.some((child) => activePanel === child.id && panelOpen);

  const isActive = (item) => {
    if (item.id === 'help') {
      return activePanel === 'help' && panelOpen;
    }
    if (item.children) {
      return isGroupActive(item);
    }
    return (
      isFlatNavActive(item) ||
      (item.id === 'save' && isSaved) ||
      (item.id === 'export' && exportActive)
    );
  };

  const renderIcon = (item) => {
    if (item.id === 'theme') {
      return <Icon icon={theme === 'light' ? SunIcon : MoonIcon} size={ICON_SIZE} />;
    }
    if (item.id === 'save') {
      return <Icon icon={HeartIcon} size={ICON_SIZE} active={isSaved} />;
    }
    if (item.icon) {
      return <Icon icon={item.icon} size={ICON_SIZE} active={isActive(item)} />;
    }
    return null;
  };

  const renderSubmenu = (item) => {
    const isOpen = openMenuId === item.id;
    const groupActive = isGroupActive(item);

    return (
      <div
        key={item.id}
        className="sidebar-rail__submenu"
        ref={isOpen ? menuRef : undefined}
      >
        <button
          type="button"
          className={`sidebar-rail__btn ${groupActive ? 'sidebar-rail__btn--active' : ''} ${isOpen ? 'sidebar-rail__btn--menu-open' : ''}`}
          aria-label={item.label}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          onClick={() => setOpenMenuId(isOpen ? null : item.id)}
        >
          <Icon icon={item.icon} size={ICON_SIZE} active={groupActive} />
          {!isOpen && (
            <span className="sidebar-rail__tooltip" role="tooltip">{item.label}</span>
          )}
        </button>

        {isOpen && (
          <div className="sidebar-rail__popover" role="menu" aria-label={item.label}>
            <p className="sidebar-rail__popover-title">{item.label}</p>
            <ul className="sidebar-rail__popover-list">
              {item.children.map((child) => {
                const childActive = activePanel === child.id && panelOpen;
                return (
                  <li key={child.id}>
                    <button
                      type="button"
                      role="menuitem"
                      className={`sidebar-rail__popover-btn ${childActive ? 'sidebar-rail__popover-btn--active' : ''}`}
                      aria-pressed={childActive}
                      onClick={() => handleNavClick(child.id)}
                    >
                      <Icon icon={child.icon} size={ICON_SIZE_SM} active={childActive} />
                      <span>{child.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const renderButton = (item, group) => {
    if (item.children) {
      return renderSubmenu(item);
    }

    return (
      <button
        key={item.id}
        type="button"
        className={`sidebar-rail__btn ${group === 'app' ? 'sidebar-rail__btn--app' : ''} ${isActive(item) ? 'sidebar-rail__btn--active' : ''}`}
        aria-label={item.label}
        onClick={() => handleClick(item.id)}
      >
        {item.id === 'expand' ? (
          <Icon icon={SidebarSimpleIcon} size={ICON_SIZE} />
        ) : (
          renderIcon(item)
        )}
        <span className="sidebar-rail__tooltip" role="tooltip">{item.label}</span>
        {item.id === 'workspace' && hasActiveFilters && (
          <span className="sidebar-rail__dot" aria-label="Filters active" />
        )}
      </button>
    );
  };

  return (
    <nav className="sidebar-rail" aria-label="Sidebar shortcuts">
      <div className="sidebar-rail__group">
        {isCompact ? (
          <div className="sidebar-rail__logo" aria-hidden="true">
            <img src="/logo_light.svg" alt="" />
          </div>
        ) : (
          <button
            type="button"
            className="sidebar-rail__btn"
            aria-label="Expand sidebar"
            onClick={() => handleClick('expand')}
          >
            <Icon icon={SidebarSimpleIcon} size={ICON_SIZE} />
            <span className="sidebar-rail__tooltip" role="tooltip">Expand sidebar</span>
          </button>
        )}
        {RAIL_NAV_ITEMS.map((item) => renderButton(item, 'workspace'))}
      </div>

      <div className="sidebar-rail__group sidebar-rail__group--app">
        {APP_ITEMS.map((item) => renderButton(item, 'app'))}
      </div>

      <div className="sidebar-rail__footer">
        <button
          type="button"
          className="sidebar-rail__btn sidebar-rail__btn--app"
          aria-label="Feedback"
          onClick={onFeedback}
        >
          <Icon icon={ChatCircleDotsIcon} size={ICON_SIZE} />
          <span className="sidebar-rail__tooltip" role="tooltip">Feedback</span>
        </button>
        <button
          type="button"
          className={`sidebar-rail__btn sidebar-rail__btn--app ${activePanel === 'help' && panelOpen ? 'sidebar-rail__btn--active' : ''}`}
          aria-label="Help"
          aria-pressed={activePanel === 'help' && panelOpen}
          onClick={() => onPanelChange('help')}
        >
          <Icon icon={QuestionIcon} size={ICON_SIZE} />
          <span className="sidebar-rail__tooltip" role="tooltip">Help</span>
        </button>
        {renderSubmenu(SYSTEM_INFO_GROUP)}
      </div>
    </nav>
  );
}

export default SidebarRail;
