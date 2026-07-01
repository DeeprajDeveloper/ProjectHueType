import Icon from '../Icon/Icon';
import { ICON_SIZE_SM } from '../Icon/iconConfig';
import './SegmentControl.scss';

function SegmentControl({ options, value, onChange, ariaLabel, iconsOnly = false }) {
  return (
    <div className={`segment-control ${iconsOnly ? 'segment-control--icons-only' : ''}`} role="group" aria-label={ariaLabel}>
      {options.map((option) => {
        const isActive = value === option.value;
        const isDisabled = Boolean(option.disabled);

        return (
          <button
            key={option.value}
            type="button"
            className={[
              'segment-control__btn',
              isActive ? 'segment-control__btn--active' : '',
              isDisabled ? 'segment-control__btn--disabled' : '',
            ].filter(Boolean).join(' ')}
            aria-pressed={isActive}
            aria-disabled={isDisabled || undefined}
            aria-label={iconsOnly ? option.label : undefined}
            title={isDisabled ? option.disabledTitle ?? option.label : iconsOnly ? option.label : undefined}
            onClick={() => onChange(option.value)}
          >
            {option.icon && (
              <Icon
                icon={option.icon}
                size={ICON_SIZE_SM}
                className="segment-control__icon"
                active={isActive && !isDisabled}
              />
            )}
            {!iconsOnly && option.label}
          </button>
        );
      })}
    </div>
  );
}

export default SegmentControl;
