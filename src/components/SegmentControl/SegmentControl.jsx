import Icon from '../Icon/Icon';
import { ICON_SIZE_SM } from '../Icon/iconConfig';
import './SegmentControl.scss';

function SegmentControl({ options, value, onChange, ariaLabel }) {
  return (
    <div className="segment-control" role="group" aria-label={ariaLabel}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`segment-control__btn ${value === option.value ? 'segment-control__btn--active' : ''}`}
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.icon && (
            <Icon
              icon={option.icon}
              size={ICON_SIZE_SM}
              className="segment-control__icon"
              active={value === option.value}
            />
          )}
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default SegmentControl;
