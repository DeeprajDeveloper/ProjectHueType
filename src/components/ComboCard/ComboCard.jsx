import { Heart } from '@phosphor-icons/react';
import ContrastBadge from '../ContrastBadge/ContrastBadge';
import Icon from '../Icon/Icon';
import { ICON_SIZE } from '../Icon/iconConfig';
import { checkComboContrast, getOverallContrastStatus } from '../../utils/contrast';
import './ComboCard.scss';

function ComboCard({ combo, isSelected, isSaved, onSelect, onSave }) {
  const contrastStatus = getOverallContrastStatus(checkComboContrast(combo.colors));
  const colorRoles = ['primary', 'secondary', 'accent', 'background', 'text'];

  return (
    <div
      className={`combo-card ${isSelected ? 'combo-card--selected' : ''}`}
      role="option"
      aria-selected={isSelected}
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      <div className="combo-card__swatches" aria-hidden="true">
        {colorRoles.map((role) => (
          <span
            key={role}
            className="combo-card__swatch"
            style={{ backgroundColor: combo.colors[role] }}
            title={role}
          />
        ))}
      </div>

      <div className="combo-card__content">
        <div className="combo-card__header">
          <h3 className="combo-card__name">{combo.name}</h3>
          <button
            type="button"
            className={`combo-card__save ${isSaved ? 'combo-card__save--saved' : ''}`}
            aria-label={isSaved ? 'Remove from saved' : 'Save combo'}
            onClick={(e) => {
              e.stopPropagation();
              onSave();
            }}
          >
            <Icon icon={Heart} size={ICON_SIZE} active={isSaved} />
          </button>
        </div>

        <p className="combo-card__fonts">
          <span style={{ fontFamily: combo.fonts.heading.family, fontWeight: 600 }}>
            {combo.fonts.heading.family}
          </span>
          {' + '}
          <span style={{ fontFamily: combo.fonts.body.family }}>
            {combo.fonts.body.family}
          </span>
        </p>

        <div className="combo-card__tags">
          {combo.mood.slice(0, 2).map((m) => (
            <span key={m} className="combo-card__tag">{m}</span>
          ))}
          <ContrastBadge status={contrastStatus} compact />
        </div>
      </div>
    </div>
  );
}

export default ComboCard;
