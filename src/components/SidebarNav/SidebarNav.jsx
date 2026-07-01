import { useState, useEffect } from 'react';
import { CaretDownIcon } from '@phosphor-icons/react';
import {
  TOP_NAV_ITEMS,
  PROTOTYPE_GROUP,
  PROTOTYPE_NAV_ITEMS,
  PROTOTYPES_STORAGE_KEY,
  isPrototypePanelActive,
} from '../../data/sidebarNavItems';
import Icon from '../Icon/Icon';
import { ICON_SIZE_SM } from '../Icon/iconConfig';
import './SidebarNav.scss';

function readPrototypesOpen() {
  try {
    const stored = localStorage.getItem(PROTOTYPES_STORAGE_KEY);
    if (stored !== null) return stored === 'true';
  } catch {
    // ignore
  }
  return false;
}

function SidebarNav({ activePanel, panelOpen, onPanelChange, savedCount, hasActiveFilters }) {
  const prototypePanelActive = isPrototypePanelActive(activePanel, panelOpen);
  const [prototypesOpen, setPrototypesOpen] = useState(readPrototypesOpen);

  useEffect(() => {
    if (prototypePanelActive) {
      setPrototypesOpen(true);
    }
  }, [prototypePanelActive]);

  const handlePrototypesToggle = () => {
    setPrototypesOpen((open) => {
      const next = !open;
      try {
        localStorage.setItem(PROTOTYPES_STORAGE_KEY, String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const renderNavButton = (item, { nested = false } = {}) => {
    const isActive = activePanel === item.id && panelOpen;
    const showBadge = item.id === 'saved' && savedCount > 0;
    const showDot = item.id === 'workspace' && hasActiveFilters;

    return (
      <li key={item.id} className={nested ? 'sidebar-nav__subitem' : undefined}>
        <button
          type="button"
          className={`sidebar-nav__btn ${nested ? 'sidebar-nav__btn--nested' : ''} ${isActive ? 'sidebar-nav__btn--active' : ''}`}
          onClick={() => onPanelChange(item.id)}
          aria-pressed={isActive}
          data-tour={
            item.id === 'workspace'
              ? 'nav-workspace'
              : item.id === 'colors'
                ? 'nav-customize'
                : item.id === 'fonts'
                  ? 'nav-fonts'
                  : undefined
          }
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
  };

  return (
    <nav className="sidebar-nav" aria-label="Options" data-tour="sidebar-nav">
      <ul className="sidebar-nav__list">
        {TOP_NAV_ITEMS.map((item) => renderNavButton(item))}

        <li className={`sidebar-nav__group ${prototypesOpen ? 'sidebar-nav__group--open' : ''}`}>
          <button
            type="button"
            className={`sidebar-nav__group-trigger ${prototypePanelActive ? 'sidebar-nav__group-trigger--active' : ''}`}
            aria-expanded={prototypesOpen}
            onClick={handlePrototypesToggle}
            data-tour="nav-prototypes"
          >
            <Icon icon={PROTOTYPE_GROUP.icon} size={ICON_SIZE_SM} active={prototypePanelActive} />
            <span className="sidebar-nav__label">{PROTOTYPE_GROUP.label}</span>
            <span className={`sidebar-nav__chevron ${prototypesOpen ? 'sidebar-nav__chevron--open' : ''}`} aria-hidden="true">
              <Icon icon={CaretDownIcon} size={ICON_SIZE_SM} />
            </span>
          </button>

          {prototypesOpen && (
            <ul className="sidebar-nav__sublist">
              {PROTOTYPE_NAV_ITEMS.map((item) => renderNavButton(item, { nested: true }))}
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default SidebarNav;
