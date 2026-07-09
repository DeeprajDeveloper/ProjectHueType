import { useEffect, useId, useRef } from 'react';
import { XIcon } from '@phosphor-icons/react';
import Icon from '../Icon/Icon';
import { ICON_SIZE_SM } from '../Icon/iconConfig';
import InspectorPopupContent from './InspectorPopupContent';
import './InspectorPopup.scss';

function InspectorPopup({
  entry,
  element,
  paletteColors,
  width,
  isCompactPopup = false,
  showAllMode = false,
  isHighlighted = false,
  isDragging = false,
  onHeaderPointerDown,
  onClose,
  onCopied,
  onApplyFix,
}) {
  const titleId = useId();
  const closeRef = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    if (showAllMode) return;
    closeRef.current?.focus();
  }, [showAllMode]);

  useEffect(() => {
    if (showAllMode || !onClose) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, showAllMode]);

  return (
    <div
      ref={popupRef}
      className={[
        'inspector-popup',
        isCompactPopup ? 'inspector-popup--compact' : '',
        showAllMode ? 'inspector-popup--all-mode' : '',
        isHighlighted ? 'inspector-popup--highlighted' : '',
        isDragging ? 'inspector-popup--dragging' : '',
      ].filter(Boolean).join(' ')}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      data-tour="inspector-popup"
      style={{
        width: width ? `${width}px` : undefined,
      }}
    >
      <header
        className="inspector-popup__header"
        onPointerDown={onHeaderPointerDown}
      >
        <h2 id={titleId} className="inspector-popup__title">{entry.name}</h2>
        {!showAllMode && onClose && (
          <button
            ref={closeRef}
            type="button"
            className="inspector-popup__close btn btn--secondary btn--sm"
            aria-label="Close inspector popup"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={onClose}
          >
            <Icon icon={XIcon} size={ICON_SIZE_SM} />
          </button>
        )}
      </header>

      <InspectorPopupContent
        entry={entry}
        element={element}
        paletteColors={paletteColors}
        isCompactPopup={isCompactPopup}
        onCopied={onCopied}
        onApplyFix={onApplyFix}
      />
    </div>
  );
}

export default InspectorPopup;
