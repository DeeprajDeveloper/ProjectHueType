import { useState, useEffect, useRef } from 'react';
import { CaretDownIcon, LayoutIcon, SlidersHorizontalIcon } from '@phosphor-icons/react';
import { getArchetypeBadge } from '../../data/archetypeNav';
import {
  WORKSPACE_NAV_ITEMS,
  CUSTOMIZE_NAV_ITEMS,
  PREVIEW_NAV_ITEMS,
  ARCHETYPE_NAV_META,
  readStoredLayoutsOpen,
  storeLayoutsOpen,
  resolvePanelId,
} from '../../data/sidebarNavItems';
import { PREVIEW_ARCHETYPES } from '../PreviewComponentsPanel/previewArchetypes';
import Icon from '../Icon/Icon';
import { ICON_SIZE_SM } from '../Icon/iconConfig';
import './SidebarNav.scss';

function SidebarNav({
  activePanel,
  panelOpen,
  onPanelChange,
  activeArchetype,
  onArchetypeChange,
  savedCount,
  presetCount,
  hasActiveFilters,
  collapsed = false,
  isCompact = false,
}) {
  const [layoutsOpen, setLayoutsOpen] = useState(readStoredLayoutsOpen);
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

    const attachTimer = window.setTimeout(() => {
      document.addEventListener('pointerdown', handlePointerDown);
    }, 0);

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(attachTimer);
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openMenuId]);

  const handleLayoutsToggle = () => {
    if (collapsed) {
      setOpenMenuId((id) => (id === 'layouts' ? null : 'layouts'));
      return;
    }

    setLayoutsOpen((open) => {
      const next = !open;
      storeLayoutsOpen(next);
      return next;
    });
  };

  const handleCustomizeToggle = () => {
    setOpenMenuId((id) => (id === 'customize' ? null : 'customize'));
  };

  const handleNavClick = (item) => {
    setOpenMenuId(null);
    onPanelChange(resolvePanelId(item.id));
  };

  const showLayoutsList = layoutsOpen || (isCompact && !collapsed);

  const isPanelActive = (panelId) => activePanel === panelId && panelOpen;

  const isCustomizeGroupActive = CUSTOMIZE_NAV_ITEMS.some(
    (item) => isPanelActive(resolvePanelId(item.id)),
  );

  const workspaceItems = collapsed
    ? WORKSPACE_NAV_ITEMS.filter((item) => item.id !== 'customizations')
    : WORKSPACE_NAV_ITEMS;

  const layoutCount = PREVIEW_ARCHETYPES.length;

  const renderNavItem = (item, { nested = false, count, badge, onClick, tooltip } = {}) => {
    const panelId = resolvePanelId(item.id);
    const isActive = isPanelActive(panelId);
    const showDot = item.id === 'workspace' && hasActiveFilters;

    return (
      <button
        key={item.id}
        type="button"
        className={[
          nested ? 'sidebar-nav__sub-item' : 'sidebar-nav__item',
          isActive ? (nested ? 'sidebar-nav__sub-item--active' : 'sidebar-nav__item--active') : '',
        ].filter(Boolean).join(' ')}
        onClick={onClick || (() => handleNavClick(item))}
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
        <span className="sidebar-nav__item-label">{item.label}</span>
        {count != null && count > 0 && (
          <span className="sidebar-nav__count">{count}</span>
        )}
        {badge && <span className="sidebar-nav__badge">{badge}</span>}
        {showDot && <span className="sidebar-nav__dot" aria-label="Filters active" />}
        {collapsed && (
          <span className="sidebar-nav__tooltip" role="tooltip">{tooltip || item.label}</span>
        )}
      </button>
    );
  };

  const renderArchetypeItem = (archetype, { inPopover = false } = {}) => {
    const meta = ARCHETYPE_NAV_META[archetype.id] || { navLabel: archetype.label, icon: null };
    const isActive = activeArchetype === archetype.id;
    const badge = getArchetypeBadge(archetype.id);

    const className = inPopover
      ? `sidebar-nav__popover-btn ${isActive ? 'sidebar-nav__popover-btn--active' : ''}`
      : `sidebar-nav__sub-item ${isActive ? 'sidebar-nav__sub-item--active' : ''}`;

    return (
      <button
        key={archetype.id}
        type="button"
        className={className}
        onClick={() => {
          setOpenMenuId(null);
          onArchetypeChange(archetype.id);
        }}
        aria-pressed={isActive}
        role={inPopover ? 'menuitem' : undefined}
      >
        {meta.icon && <Icon icon={meta.icon} size={ICON_SIZE_SM} active={isActive} />}
        <span className={inPopover ? 'sidebar-nav__popover-label' : 'sidebar-nav__item-label'}>
          {meta.navLabel}
        </span>
        {badge && <span className="sidebar-nav__badge">{badge}</span>}
      </button>
    );
  };

  const renderCollapsedPopover = (menuId, title, children) => {
    if (openMenuId !== menuId) return null;

    return (
      <div className="sidebar-nav__popover" role="menu" aria-label={title}>
        <p className="sidebar-nav__popover-title">{title}</p>
        <div className="sidebar-nav__popover-list">
          {children}
        </div>
      </div>
    );
  };

  const renderCustomizeSection = () => {
    if (collapsed) {
      return (
        <div className="sidebar-nav__section">
          <p className="sidebar-nav__group-label">Customize</p>
          <div
            className="sidebar-nav__submenu-wrap"
            ref={openMenuId === 'customize' ? menuRef : undefined}
          >
            <button
              type="button"
              className={[
                'sidebar-nav__item',
                isCustomizeGroupActive || openMenuId === 'customize' ? 'sidebar-nav__item--active' : '',
                openMenuId === 'customize' ? 'sidebar-nav__item--menu-open' : '',
              ].filter(Boolean).join(' ')}
              aria-label="Customize"
              aria-expanded={openMenuId === 'customize'}
              aria-haspopup="menu"
              onClick={handleCustomizeToggle}
            >
              <Icon icon={SlidersHorizontalIcon} size={ICON_SIZE_SM} active={isCustomizeGroupActive} />
              <span className="sidebar-nav__item-label">Customize</span>
              <span className="sidebar-nav__tooltip" role="tooltip">Customize</span>
            </button>
            {renderCollapsedPopover('customize', 'Customize', (
              CUSTOMIZE_NAV_ITEMS.map((item) => {
                const panelId = resolvePanelId(item.id);
                const isActive = isPanelActive(panelId);
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="menuitem"
                    className={`sidebar-nav__popover-btn ${isActive ? 'sidebar-nav__popover-btn--active' : ''}`}
                    onClick={() => handleNavClick(item)}
                    aria-pressed={isActive}
                  >
                    <Icon icon={item.icon} size={ICON_SIZE_SM} active={isActive} />
                    <span className="sidebar-nav__popover-label">{item.label}</span>
                  </button>
                );
              })
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="sidebar-nav__section">
        <p className="sidebar-nav__group-label">Customize</p>
        {CUSTOMIZE_NAV_ITEMS.map((item) => renderNavItem(item))}
      </div>
    );
  };

  const renderPreviewSection = () => (
    <div className="sidebar-nav__section">
      <p className="sidebar-nav__group-label">Preview</p>
      <div className="sidebar-nav__submenu-wrap" ref={openMenuId === 'layouts' ? menuRef : undefined}>
        <button
          type="button"
          className={[
            'sidebar-nav__item',
            collapsed ? '' : 'sidebar-nav__item--expandable',
            openMenuId === 'layouts' ? 'sidebar-nav__item--menu-open' : '',
            !collapsed && layoutsOpen ? 'sidebar-nav__item--active' : '',
          ].filter(Boolean).join(' ')}
          aria-expanded={collapsed ? openMenuId === 'layouts' : layoutsOpen}
          aria-haspopup={collapsed ? 'menu' : undefined}
          onClick={handleLayoutsToggle}
          data-tour="nav-prototypes"
          aria-label={collapsed ? `Layouts, ${layoutCount} layouts` : undefined}
        >
          <Icon icon={LayoutIcon} size={ICON_SIZE_SM} />
          <span className="sidebar-nav__item-label">Layouts</span>
          {!collapsed && (
            <span className="sidebar-nav__count" aria-label={`${layoutCount} layouts`}>
              {layoutCount}
            </span>
          )}
          {collapsed && (
            <span className="sidebar-nav__tooltip" role="tooltip">
              Layouts · {layoutCount}
            </span>
          )}
          {!collapsed && (
            <span className={`sidebar-nav__chevron ${layoutsOpen ? 'sidebar-nav__chevron--open' : ''}`} aria-hidden="true">
              <Icon icon={CaretDownIcon} size={ICON_SIZE_SM} />
            </span>
          )}
        </button>

        {collapsed ? (
          renderCollapsedPopover('layouts', `Layouts (${layoutCount})`, (
            PREVIEW_ARCHETYPES.map((archetype) => renderArchetypeItem(archetype, { inPopover: true }))
          ))
        ) : (
          showLayoutsList && (
            <div className="sidebar-nav__sublist">
              {PREVIEW_ARCHETYPES.map((archetype) => renderArchetypeItem(archetype))}
            </div>
          )
        )}
      </div>

      {PREVIEW_NAV_ITEMS.map((item) => renderNavItem(item))}
    </div>
  );

  return (
    <nav
      className={[
        'sidebar-nav',
        collapsed ? 'sidebar-nav--collapsed' : '',
        isCompact ? 'sidebar-nav--compact' : '',
      ].filter(Boolean).join(' ')}
      aria-label="Main navigation"
      data-tour="sidebar-nav"
    >
      <div className="sidebar-nav__section">
        <p className="sidebar-nav__group-label">Workspace</p>
        {workspaceItems.map((item) => renderNavItem(item, {
          count: item.id === 'workspace' ? presetCount : item.id === 'saved' ? savedCount : undefined,
        }))}
      </div>

      <div className="sidebar-nav__divider" aria-hidden="true" />

      {renderCustomizeSection()}

      <div className="sidebar-nav__divider" aria-hidden="true" />

      {renderPreviewSection()}
    </nav>
  );
}

export default SidebarNav;
