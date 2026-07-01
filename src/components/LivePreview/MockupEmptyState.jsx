import { FolderOpenIcon } from '@phosphor-icons/react';
import Icon from '../Icon/Icon';
import { ICON_SIZE } from '../Icon/iconConfig';
import { MOCKUP_COPY } from '../../data/mockupCopy';
import './MockupEmptyState.scss';

function MockupEmptyState({ parts = {} }) {
  const copy = MOCKUP_COPY.empty;
  const show = (id) => parts[id] !== false;

  return (
    <div className="mockup-empty">
      <div className="mockup-empty__content">
        {show('illustration') && (
          <div className="mockup-empty__icon" aria-hidden="true">
            <Icon icon={FolderOpenIcon} size={ICON_SIZE} />
          </div>
        )}

        {show('headline') && (
          <div className="mockup-empty__text">
            <h1 className="mockup-empty__title">{copy.title}</h1>
            <p className="mockup-empty__desc">
              {copy.description}
            </p>
          </div>
        )}

        {show('primaryCta') && (
          <button type="button" className="mockup-empty__cta">{copy.cta}</button>
        )}

        {show('secondaryHint') && (
          <p className="mockup-empty__hint">
            {copy.hintPrefix} <kbd>Space</kbd> {copy.hintSuffix}
          </p>
        )}
      </div>
    </div>
  );
}

export default MockupEmptyState;
