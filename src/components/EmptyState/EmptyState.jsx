import { Palette } from '@phosphor-icons/react';
import Icon from '../Icon/Icon';
import { ICON_SIZE_LG } from '../Icon/iconConfig';
import './EmptyState.scss';

function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon" aria-hidden="true">
        <Icon icon={Palette} size={ICON_SIZE_LG} />
      </div>
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__description">{description}</p>
      {actionLabel && onAction && (
        <button type="button" className="btn btn--secondary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
