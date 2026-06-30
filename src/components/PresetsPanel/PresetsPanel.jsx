import Accordion from '../Accordion/Accordion';
import FilterBar from '../FilterBar/FilterBar';
import ComboLibrary from '../ComboLibrary/ComboLibrary';
import './PresetsPanel.scss';

function PresetsPanel({
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
}) {
  const title = isSavedView ? 'Saved presets' : 'Presets';

  return (
    <div className="presets-panel">
      <Accordion title={title} defaultOpen persistKey={isSavedView ? 'saved-presets' : 'presets'}>
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
      </Accordion>
    </div>
  );
}

export default PresetsPanel;
