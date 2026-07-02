import {
  SidebarSimpleIcon,
  SunIcon,
  MoonIcon,
  ShareNetworkIcon,
  HeartIcon,
} from '@phosphor-icons/react';
import Icon from '../Icon/Icon';
import { ICON_SIZE, ICON_SIZE_SM } from '../Icon/iconConfig';
import './SidebarHeader.scss';

function SidebarHeader({
  theme,
  onToggleTheme,
  onShare,
  onSave,
  isSaved,
  sidebarOpen,
  onToggleSidebar,
  isCompact = false,
}) {
  return (
    <div className="sidebar-header">
      <div className="sidebar-header__brand">
        <img src="/logo_light.svg" alt="HueType" className="sidebar-header__logo" />
        <span className="sidebar-header__name">HueType</span>
      </div>

      <div className="sidebar-header__actions">
        <button
          type="button"
          className="sidebar-header__action"
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          onClick={onToggleTheme}
        >
          <Icon icon={theme === 'light' ? SunIcon : MoonIcon} size={ICON_SIZE_SM} />
        </button>
        <button
          type="button"
          className="sidebar-header__action"
          aria-label="Share combo"
          onClick={onShare}
        >
          <Icon icon={ShareNetworkIcon} size={ICON_SIZE_SM} />
        </button>
        <button
          type="button"
          className={`sidebar-header__action ${isSaved ? 'sidebar-header__action--active' : ''}`}
          aria-label={isSaved ? 'Remove from saved' : 'Save combo'}
          onClick={onSave}
        >
          <Icon icon={HeartIcon} size={ICON_SIZE_SM} active={isSaved} />
        </button>
        <button
          type="button"
          className="sidebar-header__action sidebar-header__action--toggle"
          aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          aria-expanded={sidebarOpen}
          onClick={onToggleSidebar}
        >
          <Icon icon={SidebarSimpleIcon} size={ICON_SIZE} />
        </button>
      </div>
    </div>
  );
}

export default SidebarHeader;
