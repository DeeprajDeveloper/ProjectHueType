import { useState, useEffect, useMemo } from 'react';
import { CaretDownIcon, SidebarSimpleIcon } from '@phosphor-icons/react';
import Icon from '../Icon/Icon';
import { ICON_SIZE, ICON_SIZE_SM } from '../Icon/iconConfig';
import PresetsPanel from '../PresetsPanel/PresetsPanel';
import CustomizePanel from '../CustomizePanel/CustomizePanel';
import ComboInfoPanel from '../ComboInfoPanel/ComboInfoPanel';
import BuildInfoPanel from '../BuildInfoPanel/BuildInfoPanel';
import FeatureCatalogPanel from '../FeatureCatalogPanel/FeatureCatalogPanel';
import HelpPanel from '../HelpPanel/HelpPanel';
import ComponentToggle from '../PreviewComponentsPanel/ComponentToggle';
import { ARCHETYPE_PARTS, PREVIEW_ARCHETYPES, getAvailableArchetypeGroups, getArchetypeGroupId, getArchetypesForGroup, resolveArchetypeParts } from '../PreviewComponentsPanel/previewArchetypes';
import { getArchetypeBadge, getArchetypeGroupBadge } from '../../data/archetypeNav';
import LayoutSearchField from '../LayoutSearchField/LayoutSearchField';
import { searchLayouts } from '../../utils/layoutSearch';
import { getPreviewCopyFieldsForArchetype, groupPreviewCopyFields } from '../../data/previewCopyFields';
import { getPreviewCopyValue } from '../../utils/previewCopyUtils';
import './OptionsPanel.scss';

const PANEL_TITLES = {
  workspace: 'Theme Library & Presets',
  saved: 'My saved combos',
  colors: 'Colors Palette Visualizer',
  fonts: 'Fonts Visualizer',
  'preview-edit': 'Edit prototype',
  'preview-sections': 'Toggle prototype sections',
  archetypes: 'Prototype Library',
  info: 'Color & Contrast Info',
  'build-info': 'Build Info',
  'feature-catalog': 'Feature Catalog',
  help: 'Help',
};

function PreviewContentEditor({
  archetype,
  previewCopyOverrides,
  onPreviewCopyChange,
  onResetPreviewCopy,
}) {
  const fields = getPreviewCopyFieldsForArchetype(archetype);
  const groupedFields = useMemo(() => groupPreviewCopyFields(fields), [fields]);
  const hasOverrides = Boolean(previewCopyOverrides?.[archetype]);

  if (fields.length === 0) {
    return (
      <p className="options-panel__section-hint">
        Content editing is not available for this layout yet.
      </p>
    );
  }

  return (
    <div className="options-panel__content-editor">
      <p className="options-panel__section-hint">
        Edit text shown in the live preview. Changes are saved automatically.
      </p>

      {groupedFields.map((group) => (
        <div key={group.label} className="options-panel__content-group">
          <h4 className="options-panel__content-group-title">{group.label}</h4>
          {group.fields.map((field) => {
            const value = getPreviewCopyValue(previewCopyOverrides, archetype, field.path) ?? '';
            const inputId = `preview-copy-${archetype}-${field.path.replace(/\./g, '-')}`;

            return (
              <label key={field.path} className="options-panel__field" htmlFor={inputId}>
                <span className="options-panel__field-label">{field.label}</span>
                {field.multiline ? (
                  <textarea
                    id={inputId}
                    className="options-panel__textarea"
                    value={value}
                    onChange={(e) => onPreviewCopyChange(archetype, field.path, e.target.value)}
                    rows={3}
                  />
                ) : (
                  <input
                    id={inputId}
                    type="text"
                    className="options-panel__input"
                    value={value}
                    onChange={(e) => onPreviewCopyChange(archetype, field.path, e.target.value)}
                  />
                )}
              </label>
            );
          })}
        </div>
      ))}

      {hasOverrides && (
        <button
          type="button"
          className="options-panel__reset-content"
          onClick={() => onResetPreviewCopy(archetype)}
        >
          Reset content to defaults
        </button>
      )}
    </div>
  );
}

function PreviewEditContent({
  previewLogoText,
  onPreviewLogoTextChange,
  archetype,
  previewCopyOverrides,
  onPreviewCopyChange,
  onResetPreviewCopy,
}) {
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

      <div className="options-panel__parts-group">
        <h4 className="options-panel__parts-title">Preview content</h4>
        <PreviewContentEditor
          archetype={archetype}
          previewCopyOverrides={previewCopyOverrides}
          onPreviewCopyChange={onPreviewCopyChange}
          onResetPreviewCopy={onResetPreviewCopy}
        />
      </div>
    </div>
  );
}

function PreviewSectionsContent({
  archetype,
  archetypeParts,
  onToggleArchetypePart,
}) {
  const currentParts = ARCHETYPE_PARTS[archetype] || [];
  const archetypeLabel = PREVIEW_ARCHETYPES.find((a) => a.id === archetype)?.label;
  const resolvedParts = resolveArchetypeParts(archetype, archetypeParts[archetype]);

  if (currentParts.length === 0) {
    return (
      <p className="options-panel__section-hint">
        This layout does not have toggleable sections.
      </p>
    );
  }

  return (
    <div className="options-panel__preview-settings">
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
  );
}

function ArchetypesContent({ archetype, onArchetypeChange }) {
  const layoutGroups = getAvailableArchetypeGroups();
  const activeGroupId = getArchetypeGroupId(archetype);
  const [expandedGroup, setExpandedGroup] = useState(activeGroupId || layoutGroups[0]?.id || null);
  const [layoutSearchQuery, setLayoutSearchQuery] = useState('');
  const layoutSearch = useMemo(
    () => searchLayouts(layoutSearchQuery, layoutGroups),
    [layoutSearchQuery, layoutGroups],
  );

  useEffect(() => {
    if (activeGroupId) setExpandedGroup(activeGroupId);
  }, [activeGroupId]);

  return (
    <div className="options-panel__archetypes-view">
      <LayoutSearchField
        value={layoutSearchQuery}
        onChange={setLayoutSearchQuery}
        className="layout-search-field--panel"
        dataTour="layout-search-panel"
      />
      <p className="options-panel__section-hint">
        {layoutSearch.isSearching
          ? `${layoutSearch.flatResults.length} layout${layoutSearch.flatResults.length === 1 ? '' : 's'} found`
          : 'Expand a group, then pick a layout to preview. Groups mirror the sidebar Layouts menu.'}
      </p>
      {layoutSearch.isSearching ? (
        <div className="options-panel__search-results">
          {layoutSearch.flatResults.length > 0 ? (
            <fieldset className="options-panel__archetypes">
              <legend className="options-panel__legend">Search results</legend>
              {layoutSearch.flatResults.map(({ archetype: item, group }) => {
                const selected = archetype === item.id;
                const badge = getArchetypeBadge(item.id);
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
                      <span className="options-panel__option-label">
                        {item.label}
                        {badge && <span className="options-panel__badge">{badge}</span>}
                      </span>
                      <span className="options-panel__option-desc">{group.navLabel}</span>
                    </span>
                  </label>
                );
              })}
            </fieldset>
          ) : (
            <p className="options-panel__search-empty">No layouts match your search</p>
          )}
        </div>
      ) : (
        <div data-tour="layout-groups-panel">
          {layoutSearch.groups.map(({ group, archetypes: groupArchetypes }) => {
            const isExpanded = expandedGroup === group.id;
            const hasActiveArchetype = groupArchetypes.some((item) => item.id === archetype);

            return (
              <section
                key={group.id}
                className={`options-panel__archetype-group ${isExpanded ? 'options-panel__archetype-group--expanded' : ''}`}
              >
                <button
                  type="button"
                  className={[
                    'options-panel__group-trigger',
                    hasActiveArchetype ? 'options-panel__group-trigger--has-active' : '',
                  ].filter(Boolean).join(' ')}
                  aria-expanded={isExpanded}
                  onClick={() => setExpandedGroup((prev) => (prev === group.id ? null : group.id))}
                >
                  <span className="options-panel__group-trigger-text">
                    <span className="options-panel__group-label">
                      {group.navLabel}
                      {getArchetypeGroupBadge(group.id) && (
                        <span className="options-panel__badge">{getArchetypeGroupBadge(group.id)}</span>
                      )}
                    </span>
                    <span className="options-panel__group-desc">{group.description}</span>
                  </span>
                  <span className="options-panel__group-meta">
                    <span className="options-panel__group-count">{groupArchetypes.length}</span>
                    <span className={`options-panel__group-chevron ${isExpanded ? 'options-panel__group-chevron--open' : ''}`} aria-hidden="true">
                      <Icon icon={CaretDownIcon} size={ICON_SIZE_SM} />
                    </span>
                  </span>
                </button>

                {isExpanded && (
                  <fieldset className="options-panel__archetypes">
                    <legend className="options-panel__legend">{group.label}</legend>
                    {groupArchetypes.map((item) => {
                      const selected = archetype === item.id;
                      const badge = getArchetypeBadge(item.id);
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
                            <span className="options-panel__option-label">
                              {item.label}
                              {badge && <span className="options-panel__badge">{badge}</span>}
                            </span>
                            <span className="options-panel__option-desc">{item.description}</span>
                          </span>
                        </label>
                      );
                    })}
                  </fieldset>
                )}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

function OptionsPanel({
  open,
  onToggleOpen,
  isCompact = false,
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
  previewCopyOverrides,
  onPreviewCopyChange,
  onResetPreviewCopy,
  onStartTour,
}) {
  const panelId = (() => {
    if (activePanel === 'preview-settings') return 'preview-edit';
    if (activePanel === 'preview-parts') return 'preview-sections';
    return activePanel;
  })();
  const title = PANEL_TITLES[panelId] || 'Options';

  if (!open) {
    if (isCompact) return null;

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

      case 'preview-edit':
        return (
          <div className="options-panel__flat-content">
            <PreviewEditContent
              previewLogoText={previewLogoText}
              onPreviewLogoTextChange={onPreviewLogoTextChange}
              archetype={archetype}
              previewCopyOverrides={previewCopyOverrides}
              onPreviewCopyChange={onPreviewCopyChange}
              onResetPreviewCopy={onResetPreviewCopy}
            />
          </div>
        );

      case 'preview-sections':
        return (
          <div className="options-panel__flat-content">
            <PreviewSectionsContent
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
    <aside
      className={`options-panel ${isCompact ? 'options-panel--overlay' : ''}`}
      aria-label="Options panel"
      data-tour="components-panel"
    >
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
