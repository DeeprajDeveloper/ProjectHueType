import Accordion from '../Accordion/Accordion';
import FilterBar from '../FilterBar/FilterBar';
import ComboLibrary from '../ComboLibrary/ComboLibrary';
import './PresetsPanel.scss';

function PresetsPanel({
  flat = false,
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
  isSavedView,
  combos,
  selectedId,
  savedIds,
  onSelect,
  onSave,
  onClearFiltersLibrary,
  onClearAllSaved,
  dataTour,
}) {
  const content = (
    <>
      {isSavedView && combos.length > 0 && onClearAllSaved && (
        <div className="presets-panel__actions">
          <button
            type="button"
            className="presets-panel__clear-all btn btn--secondary btn--sm"
            onClick={onClearAllSaved}
          >
            Remove all
          </button>
        </div>
      )}
      {!isSavedView && (
        <FilterBar
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
          isSavedView={isSavedView}
          embedded
        />
      )}
      <ComboLibrary
        combos={combos}
        selectedId={selectedId}
        savedIds={savedIds}
        onSelect={onSelect}
        onSave={onSave}
        isSavedView={isSavedView}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={onClearFiltersLibrary}
        embedded
      />
    </>
  );

  if (flat) {
    return (
      <div className="presets-panel presets-panel--flat" data-tour={dataTour}>
        {content}
      </div>
    );
  }

  const title = isSavedView ? 'Saved presets' : 'Presets';

  return (
    <div className="presets-panel">
      <Accordion
        title={title}
        stackId={isSavedView ? 'saved-presets' : 'presets'}
        defaultOpen
        persistKey={isSavedView ? 'saved-presets' : 'presets'}
        dataTour={dataTour}
      >
        {content}
      </Accordion>
    </div>
  );
}

export default PresetsPanel;
