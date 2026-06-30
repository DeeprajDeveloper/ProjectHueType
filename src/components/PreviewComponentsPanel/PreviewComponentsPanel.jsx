import { SidebarSimpleIcon, SquaresFourIcon } from '@phosphor-icons/react';
import Accordion from '../Accordion/Accordion';
import Icon from '../Icon/Icon';
import { ICON_SIZE } from '../Icon/iconConfig';
import ComponentToggle from './ComponentToggle';
import { ARCHETYPE_PARTS, PREVIEW_ARCHETYPES } from './previewArchetypes';
import './PreviewComponentsPanel.scss';

function PreviewComponentsPanel({
  open,
  onToggleOpen,
  archetype,
  onArchetypeChange,
  archetypeParts,
  onToggleArchetypePart,
}) {
  const currentParts = ARCHETYPE_PARTS[archetype] || [];

  if (!open) {
    return (
      <aside className="preview-components-panel preview-components-panel--collapsed" aria-label="Preview components">
        <button
          type="button"
          className="preview-components-panel__expand"
          aria-label="Expand components panel"
          onClick={() => onToggleOpen(true)}
        >
          <Icon icon={SquaresFourIcon} size={ICON_SIZE} />
          <span className="preview-components-panel__expand-tooltip" role="tooltip">
            Components
          </span>
        </button>
      </aside>
    );
  }

  return (
    <aside className="preview-components-panel" aria-label="Preview components">
      <header className="preview-components-panel__header">
        <div className="preview-components-panel__header-text">
          <h2 className="preview-components-panel__title">Components</h2>
          <p className="preview-components-panel__subtitle">
            Choose layouts and toggle preview parts.
          </p>
        </div>
        <button
          type="button"
          className="preview-components-panel__collapse"
          aria-label="Collapse components panel"
          onClick={() => onToggleOpen(false)}
        >
          <Icon icon={SidebarSimpleIcon} size={ICON_SIZE} />
        </button>
      </header>

      <div className="preview-components-panel__body">
        <Accordion
          title="Live Preview archetypes"
          defaultOpen
          persistKey="preview-archetypes"
        >
          <fieldset className="preview-components-panel__archetypes">
            <legend className="preview-components-panel__legend">Preview layout</legend>
            {PREVIEW_ARCHETYPES.map((item) => {
              const selected = archetype === item.id;
              return (
                <label
                  key={item.id}
                  className={`preview-components-panel__option ${selected ? 'preview-components-panel__option--selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="preview-archetype"
                    value={item.id}
                    checked={selected}
                    onChange={() => onArchetypeChange(item.id)}
                    className="preview-components-panel__radio"
                  />
                  <span className="preview-components-panel__option-body">
                    <span className="preview-components-panel__option-label">{item.label}</span>
                    <span className="preview-components-panel__option-desc">{item.description}</span>
                  </span>
                </label>
              );
            })}
          </fieldset>
        </Accordion>

        <Accordion
          title="Preview parts"
          defaultOpen
          persistKey="preview-parts"
        >
          <p className="preview-components-panel__section-hint">
            Toggle sections visible in the <strong>{PREVIEW_ARCHETYPES.find((a) => a.id === archetype)?.label}</strong> preview.
          </p>
          <div className="preview-components-panel__toggles">
            {currentParts.map((part) => (
              <ComponentToggle
                key={part.id}
                label={part.label}
                checked={archetypeParts[archetype]?.[part.id] ?? true}
                onChange={() => onToggleArchetypePart(archetype, part.id)}
              />
            ))}
          </div>
        </Accordion>
      </div>
    </aside>
  );
}

export default PreviewComponentsPanel;
