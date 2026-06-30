import {
  SidebarSimple,
  SquaresFour,
  BookmarkSimple,
  SlidersHorizontal,
  Shuffle,
  Sun,
  Moon,
  ShareNetwork,
  Heart,
  DownloadSimple,
} from '@phosphor-icons/react';
import Icon from '../Icon/Icon';
import { ICON_SIZE } from '../Icon/iconConfig';
import './SidebarRail.scss';

const RAIL_ITEMS = [
  { id: 'expand', icon: SidebarSimple, label: 'Expand sidebar' },
  { id: 'workspace', icon: SquaresFour, label: 'Workspace' },
  { id: 'saved', icon: BookmarkSimple, label: 'Saved combos' },
  { id: 'customize', icon: SlidersHorizontal, label: 'Customize panel' },
  { id: 'shuffle', icon: Shuffle, label: 'Shuffle unlocked roles' },
  { id: 'theme', icon: null, label: 'Toggle theme' },
  { id: 'share', icon: ShareNetwork, label: 'Share combo' },
  { id: 'save', icon: Heart, label: 'Save combo' },
  { id: 'export', icon: DownloadSimple, label: 'Export combo' },
];

function SidebarRail({
  onExpand,
  activeView,
  onViewChange,
  onShuffle,
  onToggleTheme,
  onShare,
  onSave,
  isSaved,
  onExport,
  theme,
  hasActiveFilters,
}) {
  const handleClick = (id) => {
    switch (id) {
      case 'expand':
        onExpand();
        break;
      case 'workspace':
        onViewChange('workspace');
        onExpand();
        break;
      case 'saved':
        onViewChange('saved');
        onExpand();
        break;
      case 'customize':
        onExpand();
        break;
      case 'shuffle':
        onShuffle();
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
        break;
    }
  };

  const renderIcon = (item) => {
    if (item.id === 'theme') {
      return <Icon icon={theme === 'light' ? Sun : Moon} size={ICON_SIZE} />;
    }
    if (item.id === 'save') {
      return <Icon icon={Heart} size={ICON_SIZE} weight={isSaved ? 'fill' : 'regular'} />;
    }
    return <Icon icon={item.icon} size={ICON_SIZE} />;
  };

  return (
    <nav className="sidebar-rail" aria-label="Sidebar shortcuts">
      {RAIL_ITEMS.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`sidebar-rail__btn ${
            (item.id === 'workspace' && activeView === 'workspace') ||
            (item.id === 'saved' && activeView === 'saved') ||
            (item.id === 'save' && isSaved)
              ? 'sidebar-rail__btn--active'
              : ''
          }`}
          aria-label={item.label}
          onClick={() => handleClick(item.id)}
        >
          {renderIcon(item)}
          <span className="sidebar-rail__tooltip" role="tooltip">{item.label}</span>
          {item.id === 'workspace' && hasActiveFilters && (
            <span className="sidebar-rail__dot" aria-label="Filters active" />
          )}
        </button>
      ))}
    </nav>
  );
}

export default SidebarRail;
