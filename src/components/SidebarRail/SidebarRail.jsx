import {
  SidebarSimpleIcon,
  PaletteIcon,
  BookmarkSimpleIcon,
  DropIcon,
  TextAaIcon,
  GearIcon,
  LayoutIcon,
  ShuffleIcon,
  SunIcon,
  MoonIcon,
  ShareNetworkIcon,
  HeartIcon,
  ExportIcon,
  BooksIcon,
  InfoIcon,
} from '@phosphor-icons/react';
import Icon from '../Icon/Icon';
import { ICON_SIZE } from '../Icon/iconConfig';
import './SidebarRail.scss';

const NAV_ITEMS = [
  { id: 'workspace', icon: PaletteIcon, label: 'My Workspace' },
  { id: 'saved', icon: BookmarkSimpleIcon, label: 'My Presets' },
  { id: 'colors', icon: DropIcon, label: 'Colors' },
  { id: 'fonts', icon: TextAaIcon, label: 'Fonts' },
  { id: 'preview-settings', icon: GearIcon, label: 'Preview settings' },
  { id: 'archetypes', icon: LayoutIcon, label: 'Prototypes' },
];

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
  onShuffle,
  onToggleTheme,
  onShare,
  onSave,
  isSaved,
  onExport,
  onOpenDesignSystem,
  theme,
  hasActiveFilters,
}) {
  const handleClick = (id) => {
    switch (id) {
      case 'expand':
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
        if (NAV_ITEMS.some((item) => item.id === id)) {
          onPanelChange(id);
        }
        break;
    }
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

  const isActive = (item) => {
    if (item.id === 'build-info') {
      return activePanel === 'build-info' && panelOpen;
    }
    return (
      NAV_ITEMS.some((nav) => nav.id === item.id && activePanel === nav.id && panelOpen) ||
      (item.id === 'save' && isSaved)
    );
  };

  const renderButton = (item, group) => (
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

  return (
    <nav className="sidebar-rail" aria-label="Sidebar shortcuts">
      <div className="sidebar-rail__group">
        <button
          type="button"
          className="sidebar-rail__btn"
          aria-label="Expand sidebar"
          onClick={() => handleClick('expand')}
        >
          <Icon icon={SidebarSimpleIcon} size={ICON_SIZE} />
          <span className="sidebar-rail__tooltip" role="tooltip">Expand sidebar</span>
        </button>
        {NAV_ITEMS.map((item) => renderButton(item, 'workspace'))}
        <button
          type="button"
          className="sidebar-rail__btn"
          aria-label="Shuffle Presets"
          onClick={() => handleClick('shuffle')}
        >
          <Icon icon={ShuffleIcon} size={ICON_SIZE} />
          <span className="sidebar-rail__tooltip" role="tooltip">Shuffle Presets</span>
        </button>
      </div>

      <div className="sidebar-rail__group sidebar-rail__group--app">
        {APP_ITEMS.map((item) => renderButton(item, 'app'))}
      </div>

      <div className="sidebar-rail__footer">
        <button
          type="button"
          className={`sidebar-rail__btn sidebar-rail__btn--app ${activePanel === 'build-info' && panelOpen ? 'sidebar-rail__btn--active' : ''}`}
          aria-label="Build Info"
          aria-pressed={activePanel === 'build-info' && panelOpen}
          onClick={() => onPanelChange('build-info')}
        >
          <Icon icon={InfoIcon} size={ICON_SIZE} />
          <span className="sidebar-rail__tooltip" role="tooltip">Build Info</span>
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
