import ComboCard from '../ComboCard/ComboCard';
import EmptyState from '../EmptyState/EmptyState';
import './ComboLibrary.scss';

function ComboLibrary({
  combos,
  selectedId,
  savedIds,
  onSelect,
  onSave,
  isSavedView,
  hasActiveFilters,
  onClearFilters,
  embedded = false,
}) {
  if (combos.length === 0) {
    return (
      <EmptyState
        title={isSavedView ? 'No saved combos yet' : 'No combos match your filters'}
        description={
          isSavedView
            ? 'Browse combos and tap the heart to save your favorites.'
            : 'Try adjusting your filters or search terms.'
        }
        actionLabel={isSavedView ? undefined : 'Clear filters'}
        onAction={hasActiveFilters ? onClearFilters : undefined}
      />
    );
  }

  return (
    <div className={`combo-library ${embedded ? 'combo-library--embedded' : ''}`} role="listbox" aria-label="Combo library">
      {combos.map((combo) => (
        <ComboCard
          key={combo.id}
          combo={combo}
          isSelected={combo.id === selectedId}
          isSaved={savedIds.includes(combo.id)}
          onSelect={() => onSelect(combo)}
          onSave={() => onSave(combo)}
        />
      ))}
    </div>
  );
}

export default ComboLibrary;
