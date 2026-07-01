import {
  SidebarSimpleIcon,
  PaletteIcon,
  BookmarkSimpleIcon,
  SlidersHorizontalIcon,
  ShuffleIcon,
  SunIcon,
  MoonIcon,
  ShareNetworkIcon,
  HeartIcon,
  ExportIcon,
  BooksIcon,
  QuestionIcon,
} from '@phosphor-icons/react';
import Icon from '../Icon/Icon';
import { ICON_SIZE } from '../Icon/iconConfig';
import './SidebarRail.scss';

const WORKSPACE_ITEMS = [
  { id: 'expand', icon: SidebarSimpleIcon, label: 'Expand sidebar' },
  { id: 'workspace', icon: PaletteIcon, label: 'Workspace' },
  { id: 'saved', icon: BookmarkSimpleIcon, label: 'My Saved Presets' },
  { id: 'customize', icon: SlidersHorizontalIcon, label: 'Customize panel' },
  { id: 'shuffle', icon: ShuffleIcon, label: 'Shuffle Presets' },
];

const APP_ITEMS = [
  { id: 'theme', icon: null, label: 'Switch Light/Dark Mode' },
  { id: 'share', icon: ShareNetworkIcon, label: 'Share combo' },
  { id: 'save', icon: HeartIcon, label: 'Save combo' },
  { id: 'export', icon: ExportIcon, label: 'Export combo' },
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
  onOpenDesignSystem,
  onStartTour,
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
      return <Icon icon={theme === 'light' ? SunIcon : MoonIcon} size={ICON_SIZE} />;
    }
    if (item.id === 'save') {
      return <Icon icon={HeartIcon} size={ICON_SIZE} weight={isSaved ? 'fill' : 'regular'} />;
    }
    return <Icon icon={item.icon} size={ICON_SIZE} />;
  };

  const isActive = (item) => (
    (item.id === 'workspace' && activeView === 'workspace') ||
    (item.id === 'saved' && activeView === 'saved') ||
    (item.id === 'save' && isSaved)
  );

  const renderButton = (item, group) => (
    <button
      key={item.id}
      type="button"
      className={`sidebar-rail__btn ${group === 'app' ? 'sidebar-rail__btn--app' : ''} ${isActive(item) ? 'sidebar-rail__btn--active' : ''}`}
      aria-label={item.label}
      onClick={() => handleClick(item.id)}
    >
      {renderIcon(item)}
      <span className="sidebar-rail__tooltip" role="tooltip">{item.label}</span>
      {item.id === 'workspace' && hasActiveFilters && (
        <span className="sidebar-rail__dot" aria-label="Filters active" />
      )}
    </button>
  );

  return (
    <nav className="sidebar-rail" aria-label="Sidebar shortcuts">
      <div className="sidebar-rail__group">
        {WORKSPACE_ITEMS.map((item) => renderButton(item, 'workspace'))}
      </div>

      <div className="sidebar-rail__group sidebar-rail__group--app">
        {APP_ITEMS.map((item) => renderButton(item, 'app'))}
      </div>

      <div className="sidebar-rail__footer">
        <button
          type="button"
          className="sidebar-rail__btn sidebar-rail__btn--app"
          aria-label="Restart product tour"
          onClick={onStartTour}
        >
          <Icon icon={QuestionIcon} size={ICON_SIZE} />
          <span className="sidebar-rail__tooltip" role="tooltip">Product tour</span>
        </button>
        <button
          type="button"
          className="sidebar-rail__btn sidebar-rail__btn--app"
          aria-label="Design system catalog"
          onClick={onOpenDesignSystem}
        >
          <Icon icon={BooksIcon} size={ICON_SIZE} />
          <span className="sidebar-rail__tooltip" role="tooltip">Design system catalog</span>
        </button>
      </div>
    </nav>
  );
}

export default SidebarRail;
