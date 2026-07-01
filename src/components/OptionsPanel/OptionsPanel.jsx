import { SidebarSimpleIcon } from '@phosphor-icons/react';
import Icon from '../Icon/Icon';
import { ICON_SIZE } from '../Icon/iconConfig';
import PresetsPanel from '../PresetsPanel/PresetsPanel';
import CustomizePanel from '../CustomizePanel/CustomizePanel';
import ComboInfoPanel from '../ComboInfoPanel/ComboInfoPanel';
import BuildInfoPanel from '../BuildInfoPanel/BuildInfoPanel';
import FeatureCatalogPanel from '../FeatureCatalogPanel/FeatureCatalogPanel';
import HelpPanel from '../HelpPanel/HelpPanel';
import ComponentToggle from '../PreviewComponentsPanel/ComponentToggle';
import { ARCHETYPE_PARTS, PREVIEW_ARCHETYPES, ARCHETYPE_GROUPS, getArchetypesForGroup, resolveArchetypeParts } from '../PreviewComponentsPanel/previewArchetypes';
import './OptionsPanel.scss';

const PANEL_TITLES = {
  workspace: 'My Workspace',
  saved: 'My Presets',
  colors: 'Colors',
  fonts: 'Fonts',
  'preview-settings': 'Preview settings',
  archetypes: 'Prototypes',
  info: 'WCAG contrast',
  'build-info': 'Build Info',
  'feature-catalog': 'Feature Catalog',
  help: 'Help',
};

function PreviewSettingsContent({
  previewLogoText,
  onPreviewLogoTextChange,
  archetype,
  archetypeParts,
  onToggleArchetypePart,
}) {
  const currentParts = ARCHETYPE_PARTS[archetype] || [];
  const archetypeLabel = PREVIEW_ARCHETYPES.find((a) => a.id === archetype)?.label;
  const resolvedParts = resolveArchetypeParts(archetype, archetypeParts[archetype]);

  return (
    <div className="options-panel__preview-settings">
      <label className="options-panel__field">
        <span className="options-panel__field-label">Logo text</span>
        <span className="options-panel__field-hint">
          Updates brand names in navbars, sidebars, and store headers.
        </span>
        <input
          type="text"
          className="options-panel__input"
          value={previewLogoText}
          onChange={(e) => onPreviewLogoTextChange(e.target.value)}
          placeholder="Acme Co."
          maxLength={48}
          aria-label="Preview logo text"
        />
      </label>

      {currentParts.length > 0 && (
        <div className="options-panel__parts-group">
          <h4 className="options-panel__parts-title">
            Preview parts — {archetypeLabel}
          </h4>
          <p className="options-panel__section-hint">
            Toggle sections visible in the <strong>{archetypeLabel}</strong> preview.
          </p>
          <div className="options-panel__toggles">
            {currentParts.map((part) => (
              <ComponentToggle
                key={part.id}
                label={part.label}
                checked={resolvedParts[part.id]}
                onChange={() => onToggleArchetypePart(archetype, part.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ArchetypesContent({ archetype, onArchetypeChange }) {
  return (
    <div className="options-panel__archetypes-view">
      {ARCHETYPE_GROUPS.map((group) => (
        <section key={group.id} className="options-panel__archetype-group">
          <h4 className="options-panel__group-label">{group.label}</h4>
          <p className="options-panel__group-desc">{group.description}</p>
          <fieldset className="options-panel__archetypes">
            <legend className="options-panel__legend">{group.label}</legend>
          {getArchetypesForGroup(group.id).map((item) => {
            const selected = archetype === item.id;
            return (
              <label
                key={item.id}
                className={`options-panel__option ${selected ? 'options-panel__option--selected' : ''}`}
              >
                <input
                  type="radio"
                  name="preview-archetype"
                  value={item.id}
                  checked={selected}
                  onChange={() => onArchetypeChange(item.id)}
                  className="options-panel__radio"
                />
                <span className="options-panel__option-body">
                  <span className="options-panel__option-label">{item.label}</span>
                  <span className="options-panel__option-desc">{item.description}</span>
                </span>
              </label>
            );
          })}
          </fieldset>
        </section>
      ))}
    </div>
  );
}

function OptionsPanel({
  open,
  onToggleOpen,
  activePanel,
  // Presets
  search,
  onSearchChange,
  moodFilter,
  industryFilter,
  modeFilter,
  onModeFilterChange,
  onToggleMood,
  onToggleIndustry,
  onClearMood,
  onClearIndustry,
  onClearFilters,
  hasActiveFilters,
  combos,
  selectedId,
  savedIds,
  onSelect,
  onSave,
  onClearFiltersLibrary,
  savedCount,
  // Customize
  combo,
  originalCombo,
  locks,
  showColorScales,
  onToggleColorScales,
  typeBasePx,
  onTypeBasePxChange,
  typeScaleRatio,
  onTypeScaleRatioChange,
  onColorChange,
  onFontChange,
  onToggleLock,
  onResetRole,
  onResetAllColors,
  onResetAllFonts,
  onClearAllSaved,
  onCopyColor,
  // Combo info
  contrastPairs,
  contrastStatus,
  onShowToast,
  // Preview
  archetype,
  onArchetypeChange,
  archetypeParts,
  onToggleArchetypePart,
  previewLogoText,
  onPreviewLogoTextChange,
  onStartTour,
}) {
  const panelId = activePanel === 'preview-parts' ? 'preview-settings' : activePanel;
  const title = PANEL_TITLES[panelId] || 'Options';

  if (!open) {
    return (
      <aside className="options-panel options-panel--collapsed" aria-label="Options panel">
        <button
          type="button"
          className="options-panel__expand"
          aria-label="Expand options panel"
          onClick={() => onToggleOpen(true)}
        >
          <Icon icon={SidebarSimpleIcon} size={ICON_SIZE} />
          <span className="options-panel__expand-tooltip" role="tooltip">
            Options
          </span>
        </button>
      </aside>
    );
  }

  const renderContent = () => {
    switch (panelId) {
      case 'workspace':
        return (
          <PresetsPanel
            flat
            search={search}
            onSearchChange={onSearchChange}
            moodFilter={moodFilter}
            industryFilter={industryFilter}
            modeFilter={modeFilter}
            onModeFilterChange={onModeFilterChange}
            onToggleMood={onToggleMood}
            onToggleIndustry={onToggleIndustry}
            onClearMood={onClearMood}
            onClearIndustry={onClearIndustry}
            onClearFilters={onClearFilters}
            hasActiveFilters={hasActiveFilters}
            isSavedView={false}
            combos={combos}
            selectedId={selectedId}
            savedIds={savedIds}
            onSelect={onSelect}
            onSave={onSave}
            onClearFiltersLibrary={onClearFiltersLibrary}
            dataTour="presets"
          />
        );

      case 'saved':
        return (
          <PresetsPanel
            flat
            search={search}
            onSearchChange={onSearchChange}
            moodFilter={moodFilter}
            industryFilter={industryFilter}
            modeFilter={modeFilter}
            onModeFilterChange={onModeFilterChange}
            onToggleMood={onToggleMood}
            onToggleIndustry={onToggleIndustry}
            onClearMood={onClearMood}
            onClearIndustry={onClearIndustry}
            onClearFilters={onClearFilters}
            hasActiveFilters={hasActiveFilters}
            isSavedView
            combos={combos}
            selectedId={selectedId}
            savedIds={savedIds}
            onSelect={onSelect}
            onSave={onSave}
            onClearFiltersLibrary={onClearFiltersLibrary}
            onClearAllSaved={onClearAllSaved}
          />
        );

      case 'colors':
        return (
          <CustomizePanel
            section="colors"
            flat
            combo={combo}
            originalCombo={originalCombo}
            locks={locks}
            showColorScales={showColorScales}
            onToggleColorScales={onToggleColorScales}
            typeBasePx={typeBasePx}
            onTypeBasePxChange={onTypeBasePxChange}
            typeScaleRatio={typeScaleRatio}
            onTypeScaleRatioChange={onTypeScaleRatioChange}
            onColorChange={onColorChange}
            onFontChange={onFontChange}
            onToggleLock={onToggleLock}
            onResetRole={onResetRole}
            onResetAllColors={onResetAllColors}
            onCopyColor={onCopyColor}
            dataTour="customize"
          />
        );

      case 'fonts':
        return (
          <CustomizePanel
            section="fonts"
            flat
            combo={combo}
            originalCombo={originalCombo}
            locks={locks}
            showColorScales={showColorScales}
            onToggleColorScales={onToggleColorScales}
            typeBasePx={typeBasePx}
            onTypeBasePxChange={onTypeBasePxChange}
            typeScaleRatio={typeScaleRatio}
            onTypeScaleRatioChange={onTypeScaleRatioChange}
            onColorChange={onColorChange}
            onFontChange={onFontChange}
            onToggleLock={onToggleLock}
            onResetRole={onResetRole}
            onResetAllFonts={onResetAllFonts}
            onCopyColor={onCopyColor}
          />
        );

      case 'preview-settings':
        return (
          <div className="options-panel__flat-content">
            <PreviewSettingsContent
              previewLogoText={previewLogoText}
              onPreviewLogoTextChange={onPreviewLogoTextChange}
              archetype={archetype}
              archetypeParts={archetypeParts}
              onToggleArchetypePart={onToggleArchetypePart}
            />
          </div>
        );

      case 'archetypes':
        return (
          <div className="options-panel__flat-content">
            <ArchetypesContent
              archetype={archetype}
              onArchetypeChange={onArchetypeChange}
            />
          </div>
        );

      case 'info':
        return (
          <ComboInfoPanel
            combo={combo}
            contrastPairs={contrastPairs}
            contrastStatus={contrastStatus}
            onColorChange={onColorChange}
            onShowToast={onShowToast}
          />
        );

      case 'build-info':
        return (
          <BuildInfoPanel onStartTour={onStartTour} />
        );

      case 'feature-catalog':
        return (
          <FeatureCatalogPanel />
        );

      case 'help':
        return (
          <HelpPanel />
        );

      default:
        return null;
    }
  };

  return (
    <aside className="options-panel" aria-label="Options panel" data-tour="components-panel">
      <header className="options-panel__header">
        <div className="options-panel__header-text">
          <h2 className="options-panel__title">{title}</h2>
          {panelId === 'saved' && savedCount > 0 && (
            <p className="options-panel__subtitle">{savedCount} saved combo{savedCount !== 1 ? 's' : ''}</p>
          )}
        </div>
        <button
          type="button"
          className="options-panel__collapse"
          aria-label="Collapse options panel"
          onClick={() => onToggleOpen(false)}
        >
          <Icon icon={SidebarSimpleIcon} size={ICON_SIZE} />
        </button>
      </header>

      <div className="options-panel__body options-panel__body--flat">
        {renderContent()}
      </div>
    </aside>
  );
}

export default OptionsPanel;
