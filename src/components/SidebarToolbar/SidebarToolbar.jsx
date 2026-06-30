import { Sun, Moon, ShareNetwork, Heart } from '@phosphor-icons/react';
import IconButton from '../IconButton/IconButton';
import Icon from '../Icon/Icon';
import { ICON_SIZE } from '../Icon/iconConfig';
import './SidebarToolbar.scss';

function SidebarToolbar({
  theme,
  onToggleTheme,
  onShare,
  onSave,
  isSaved,
  onExport,
}) {
  return (
    <div className="sidebar-toolbar">
      <IconButton
        label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        onClick={onToggleTheme}
      >
        <Icon icon={theme === 'light' ? Sun : Moon} size={ICON_SIZE} />
      </IconButton>
      <IconButton label="Share combo" onClick={onShare}>
        <Icon icon={ShareNetwork} size={ICON_SIZE} />
      </IconButton>
      <IconButton
        label={isSaved ? 'Remove from saved' : 'Save combo'}
        onClick={onSave}
        active={isSaved}
      >
        <Icon icon={Heart} size={ICON_SIZE} weight={isSaved ? 'fill' : 'regular'} />
      </IconButton>
      <button type="button" className="btn btn--primary btn--sm sidebar-toolbar__export" onClick={onExport}>
        Export
      </button>
    </div>
  );
}

export default SidebarToolbar;
