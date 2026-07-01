import { Shuffle } from '@phosphor-icons/react';
import Icon from '../Icon/Icon';
import { ICON_SIZE } from '../Icon/iconConfig';
import './LockRandomizeControls.scss';

function LockRandomizeControls({ locks, onShuffle, dataTour }) {
  const lockedCount = Object.values(locks).filter(Boolean).length;

  return (
    <div className="lock-controls" data-tour={dataTour}>
      <button type="button" className="lock-controls__shuffle btn btn--primary" onClick={onShuffle}>
        <Icon icon={Shuffle} size={ICON_SIZE} />
        Shuffle
        {lockedCount > 0 && (
          <span className="lock-controls__hint">({lockedCount} locked)</span>
        )}
      </button>
      <p className="lock-controls__tip">
        Lock roles you like, then shuffle the rest. Press <kbd>Space</kbd> anytime.
      </p>
    </div>
  );
}

export default LockRandomizeControls;
