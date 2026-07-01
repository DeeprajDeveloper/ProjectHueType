import { MagnifyingGlass } from '@phosphor-icons/react';
import { MOODS, INDUSTRIES } from '../../data/combos';
import MultiSelectDropdown from '../MultiSelectDropdown/MultiSelectDropdown';
import SegmentControl from '../SegmentControl/SegmentControl';
import Icon from '../Icon/Icon';
import { ICON_SIZE_SM } from '../Icon/iconConfig';
import './FilterBar.scss';

const MODE_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

function FilterBar({
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
  embedded = false,
}) {
  if (isSavedView && !embedded) return null;

  return (
    <div className={`filter-bar ${embedded ? 'filter-bar--embedded' : ''}`}>
      <label className="filter-bar__search-label">
        <span className="sr-only">Search combos</span>
        <div className="filter-bar__search-wrap">
          <Icon icon={MagnifyingGlass} size={ICON_SIZE_SM} className="filter-bar__search-icon" />
          <input
            type="search"
            className="filter-bar__search"
            placeholder="Search by name, mood, industry…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </label>

      <div className="filter-bar__section">
        <span className="filter-bar__label">Mode</span>
        <SegmentControl
          options={MODE_OPTIONS}
          value={modeFilter}
          onChange={onModeFilterChange}
          ariaLabel="Light or dark mode filter"
        />
      </div>

      <div className="filter-bar__dropdown-row">
        <MultiSelectDropdown
          label="Mood"
          options={MOODS}
          selected={moodFilter}
          onToggle={onToggleMood}
          onClear={onClearMood}
        />

        <MultiSelectDropdown
          label="Industry"
          options={INDUSTRIES}
          selected={industryFilter}
          onToggle={onToggleIndustry}
          onClear={onClearIndustry}
        />
      </div>

      {hasActiveFilters && (
        <button type="button" className="filter-bar__clear" onClick={onClearFilters}>
          Clear all filters
        </button>
      )}
    </div>
  );
}

export default FilterBar;
