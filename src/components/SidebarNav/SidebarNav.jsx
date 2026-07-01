import {
  PaletteIcon,
  BookmarkSimpleIcon,
  DropIcon,
  TextAaIcon,
  GearIcon,
  LayoutIcon,
} from '@phosphor-icons/react';
import Icon from '../Icon/Icon';
import { ICON_SIZE_SM } from '../Icon/iconConfig';
import './SidebarNav.scss';

const NAV_ITEMS = [
  { id: 'workspace', label: 'My Workspace', icon: PaletteIcon },
  { id: 'saved', label: 'My Presets', icon: BookmarkSimpleIcon },
  { id: 'colors', label: 'Colors', icon: DropIcon },
  { id: 'fonts', label: 'Fonts', icon: TextAaIcon },
  { id: 'preview-settings', label: 'Preview settings', icon: GearIcon },
  { id: 'archetypes', label: 'Prototypes', icon: LayoutIcon },
];

function SidebarNav({ activePanel, onPanelChange, savedCount, hasActiveFilters }) {
  return (
    <nav className="sidebar-nav" aria-label="Options">
      <ul className="sidebar-nav__list">
        {NAV_ITEMS.map((item) => {
          const isActive = activePanel === item.id;
          const showBadge = item.id === 'saved' && savedCount > 0;
          const showDot = item.id === 'workspace' && hasActiveFilters;

          return (
            <li key={item.id}>
              <button
                type="button"
                className={`sidebar-nav__btn ${isActive ? 'sidebar-nav__btn--active' : ''}`}
                onClick={() => onPanelChange(item.id)}
                data-tour={item.id === 'workspace' ? 'nav-workspace' : item.id === 'colors' ? 'nav-customize' : undefined}
              >
                <Icon icon={item.icon} size={ICON_SIZE_SM} active={isActive} />
                <span className="sidebar-nav__label">{item.label}</span>
                {showBadge && (
                  <span className="sidebar-nav__count" aria-label={`${savedCount} saved`}>
                    {savedCount}
                  </span>
                )}
                {showDot && (
                  <span className="sidebar-nav__dot" aria-label="Filters active" />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default SidebarNav;
