import { useState, useRef, useEffect } from 'react';
import { PlusIcon, SlidersHorizontalIcon } from '@phosphor-icons/react';
import { ARCHETYPE_NAV_META } from '../../data/sidebarNavItems';
import { PREVIEW_ARCHETYPES } from '../PreviewComponentsPanel/previewArchetypes';
import { getArchetypeBadge } from '../../data/archetypeNav';
import Icon from '../Icon/Icon';
import { ICON_SIZE_SM } from '../Icon/iconConfig';
import './ArchetypeQuickSelect.scss';

const MAX_QUICK_SELECT = 8;

/** Opens the prototype library panel — hidden while sidebar layouts cover the same flow */
const SHOW_PROTOTYPE_LIBRARY_LINK = false;

function ArchetypeQuickSelect({
  activeArchetype,
  chipBarArchetypeIds,
  onArchetypeChange,
  onToggleChipBarArchetype,
  onOpenArchetypes,
}) {
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!customizeOpen) return undefined;

    const handlePointerDown = (event) => {
      if (panelRef.current?.contains(event.target)) return;
      setCustomizeOpen(false);
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setCustomizeOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [customizeOpen]);

  const visibleIds = chipBarArchetypeIds.filter((id) => ARCHETYPE_NAV_META[id]);
  const atMax = chipBarArchetypeIds.length >= MAX_QUICK_SELECT;
  const isEmpty = visibleIds.length === 0;

  const openCustomize = () => setCustomizeOpen(true);

  return (
    <div className="archetype-quick-select" data-tour="archetype-bar">
      <div className="archetype-quick-select__chips">
        {isEmpty ? (
          <button
            type="button"
            className="archetype-quick-select__chip archetype-quick-select__chip--empty"
            onClick={openCustomize}
          >
            No favorites — use customize to add layouts
          </button>
        ) : (
          visibleIds.map((id) => {
            const meta = ARCHETYPE_NAV_META[id];
            const isActive = activeArchetype === id;
            const badge = getArchetypeBadge(id);

            return (
              <button
                key={id}
                type="button"
                className={`archetype-quick-select__chip ${isActive ? 'archetype-quick-select__chip--active' : ''}`}
                onClick={() => onArchetypeChange?.(id)}
                aria-pressed={isActive}
              >
                {meta.icon && <Icon icon={meta.icon} size={ICON_SIZE_SM} active={isActive} />}
                <span>{meta.chipLabel}</span>
                {badge && <span className="archetype-quick-select__badge">{badge}</span>}
              </button>
            );
          })
        )}
        {SHOW_PROTOTYPE_LIBRARY_LINK && (
          <button
            type="button"
            className="archetype-quick-select__chip archetype-quick-select__chip--more"
            onClick={onOpenArchetypes}
            aria-label="More layouts"
          >
            <Icon icon={PlusIcon} size={ICON_SIZE_SM} />
            <span>More</span>
          </button>
        )}
      </div>

      <div className="archetype-quick-select__customize" ref={panelRef}>
        <button
          type="button"
          className={`archetype-quick-select__customize-btn ${customizeOpen ? 'archetype-quick-select__customize-btn--active' : ''}`}
          aria-expanded={customizeOpen}
          aria-haspopup="dialog"
          aria-label="Customize quick select layouts"
          onClick={() => setCustomizeOpen((open) => !open)}
        >
          <Icon icon={SlidersHorizontalIcon} size={ICON_SIZE_SM} />
        </button>

        {customizeOpen && (
          <div className="archetype-quick-select__panel" role="dialog" aria-label="Quick select layouts">
            <p className="archetype-quick-select__panel-title">Quick select layouts</p>
            <p className="archetype-quick-select__panel-hint">
              Choose up to {MAX_QUICK_SELECT} favorite layouts. Deselect all to clear the bar.
            </p>
            <ul className="archetype-quick-select__options">
              {PREVIEW_ARCHETYPES.map((archetype) => {
                const meta = ARCHETYPE_NAV_META[archetype.id];
                const checked = chipBarArchetypeIds.includes(archetype.id);
                const disabled = !checked && atMax;
                const badge = getArchetypeBadge(archetype.id);

                return (
                  <li key={archetype.id}>
                    <label className={`archetype-quick-select__option ${disabled ? 'archetype-quick-select__option--disabled' : ''}`}>
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={disabled}
                        onChange={() => onToggleChipBarArchetype(archetype.id)}
                      />
                      {meta?.icon && <Icon icon={meta.icon} size={ICON_SIZE_SM} />}
                      <span className="archetype-quick-select__option-label">{meta?.chipLabel || archetype.label}</span>
                      {badge && <span className="archetype-quick-select__badge">{badge}</span>}
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ArchetypeQuickSelect;

export { SHOW_PROTOTYPE_LIBRARY_LINK };
