import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { getInspectableElements } from '../../data/inspectorRegistry';
import {
  clampPopupInFrame,
  getConnectorPoints,
  getDotPositionInFrame,
  getPopupPosition,
  getScrollableElements,
  isElementVisibleInFrame,
} from '../../utils/inspector';
import InspectorPopup from './InspectorPopup';
import './InspectorOverlay.scss';

const HINT_STORAGE_KEY = 'huetype-inspector-hint-seen';
const DOT_HITBOX = 24;

function readHintSeen() {
  try {
    return localStorage.getItem(HINT_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

function InspectorOverlay({
  frameRef,
  archetype,
  parts,
  paletteColors,
  previewMode,
  onShowToast,
  onColorChange,
}) {
  const [activeId, setActiveId] = useState(null);
  const [dotPositions, setDotPositions] = useState([]);
  const [autoPopupPosition, setAutoPopupPosition] = useState(null);
  const [manualPopupPosition, setManualPopupPosition] = useState(null);
  const [connector, setConnector] = useState(null);
  const [flashingId, setFlashingId] = useState(null);
  const [showHint, setShowHint] = useState(() => !readHintSeen());
  const [isDraggingPopup, setIsDraggingPopup] = useState(false);
  const popupMeasureRef = useRef(null);
  const measureRafRef = useRef(null);
  const dragStateRef = useRef(null);

  const entries = useMemo(
    () => getInspectableElements(archetype, parts),
    [archetype, parts],
  );

  const popupPosition = manualPopupPosition ?? autoPopupPosition;

  const measure = useCallback(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const frameRect = frame.getBoundingClientRect();
    const nextDots = [];

    entries.forEach((entry) => {
      const element = frame.querySelector(`[data-inspect="${entry.inspectId}"]`);
      if (!element || !isElementVisibleInFrame(element, frame)) return;

      const { x, y } = getDotPositionInFrame(element, frame, entry.anchor);
      nextDots.push({
        entry,
        element,
        x,
        y,
        frameRect,
      });
    });

    setDotPositions(nextDots);
  }, [entries, frameRef]);

  const scheduleMeasure = useCallback(() => {
    if (measureRafRef.current != null) return;
    measureRafRef.current = window.requestAnimationFrame(() => {
      measureRafRef.current = null;
      measure();
    });
  }, [measure]);

  useLayoutEffect(() => {
    measure();
    const delays = [100, 350, 700, 1200];
    const timers = delays.map((delay) => window.setTimeout(measure, delay));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [measure, archetype, previewMode, parts]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;

    const scrollTargets = getScrollableElements(frame);
    scrollTargets.forEach((target) => {
      target.addEventListener('scroll', scheduleMeasure, { passive: true });
    });
    window.addEventListener('resize', scheduleMeasure);
    window.visualViewport?.addEventListener('resize', scheduleMeasure);
    document.fonts?.ready?.then(scheduleMeasure);

    return () => {
      scrollTargets.forEach((target) => {
        target.removeEventListener('scroll', scheduleMeasure);
      });
      window.removeEventListener('resize', scheduleMeasure);
      window.visualViewport?.removeEventListener('resize', scheduleMeasure);
      if (measureRafRef.current != null) {
        window.cancelAnimationFrame(measureRafRef.current);
        measureRafRef.current = null;
      }
    };
  }, [scheduleMeasure, frameRef, archetype, parts]);

  useEffect(() => {
    if (!showHint) return undefined;
    const timer = window.setTimeout(() => {
      setShowHint(false);
      try {
        localStorage.setItem(HINT_STORAGE_KEY, 'true');
      } catch {
        // ignore
      }
    }, 4000);
    return () => window.clearTimeout(timer);
  }, [showHint]);

  useEffect(() => {
    if (!activeId) return;
    const stillVisible = dotPositions.some((dot) => dot.entry.inspectId === activeId);
    if (!stillVisible) {
      setActiveId(null);
    }
  }, [activeId, dotPositions]);

  useEffect(() => {
    setManualPopupPosition(null);
  }, [activeId]);

  const activeDot = dotPositions.find((dot) => dot.entry.inspectId === activeId);

  const computeAutoPopupPosition = useCallback(() => {
    if (!activeDot || !frameRef.current) return null;

    const frame = frameRef.current;
    const frameRect = frame.getBoundingClientRect();
    const popupEl = popupMeasureRef.current;
    const popupSize = popupEl
      ? { width: popupEl.offsetWidth, height: popupEl.offsetHeight }
      : { width: 280, height: 360 };

    const dotViewport = {
      x: frameRect.left + activeDot.x,
      y: frameRect.top + activeDot.y,
    };

    const position = getPopupPosition(
      dotViewport,
      popupSize,
      frameRect,
      previewMode === 'mobile',
    );

    return {
      top: position.top - frameRect.top,
      left: position.left - frameRect.left,
      width: position.width,
    };
  }, [activeDot, frameRef, previewMode]);

  useLayoutEffect(() => {
    if (!activeDot) {
      setAutoPopupPosition(null);
      return;
    }
    if (manualPopupPosition) return;

    setAutoPopupPosition(computeAutoPopupPosition());
  }, [activeDot, computeAutoPopupPosition, manualPopupPosition, dotPositions]);

  useEffect(() => {
    const popupEl = popupMeasureRef.current;
    if (!popupEl || !activeDot || manualPopupPosition) return undefined;

    const observer = new ResizeObserver(() => {
      setAutoPopupPosition(computeAutoPopupPosition());
    });
    observer.observe(popupEl);
    return () => observer.disconnect();
  }, [activeDot, computeAutoPopupPosition, manualPopupPosition]);

  useEffect(() => {
    if (!manualPopupPosition || !frameRef.current || !popupMeasureRef.current) return undefined;

    const frame = frameRef.current;
    const popupEl = popupMeasureRef.current;

    const reclamp = () => {
      const frameRect = frame.getBoundingClientRect();
      const clamped = clampPopupInFrame(
        manualPopupPosition.top,
        manualPopupPosition.left,
        {
          width: manualPopupPosition.width || popupEl.offsetWidth,
          height: popupEl.offsetHeight,
        },
        { width: frameRect.width, height: frameRect.height },
      );

      if (
        clamped.top !== manualPopupPosition.top
        || clamped.left !== manualPopupPosition.left
      ) {
        setManualPopupPosition({
          top: clamped.top,
          left: clamped.left,
          width: manualPopupPosition.width,
        });
      }
    };

    window.addEventListener('resize', reclamp);
    return () => window.removeEventListener('resize', reclamp);
  }, [frameRef, manualPopupPosition]);

  useLayoutEffect(() => {
    if (!activeDot || !popupPosition || !frameRef.current) {
      setConnector(null);
      return;
    }

    const frameRect = frameRef.current.getBoundingClientRect();
    const popupEl = popupMeasureRef.current;
    const popupSize = popupEl
      ? { width: popupEl.offsetWidth, height: popupEl.offsetHeight }
      : { width: popupPosition.width || 280, height: 360 };

    const dotViewport = {
      x: frameRect.left + activeDot.x,
      y: frameRect.top + activeDot.y,
    };

    const popupRect = {
      top: frameRect.top + popupPosition.top,
      left: frameRect.left + popupPosition.left,
      width: popupPosition.width || popupSize.width,
      height: popupSize.height,
      right: frameRect.left + popupPosition.left + (popupPosition.width || popupSize.width),
      bottom: frameRect.top + popupPosition.top + popupSize.height,
    };

    const line = getConnectorPoints(dotViewport, popupRect);
    setConnector({
      x1: line.x1 - frameRect.left,
      y1: line.y1 - frameRect.top,
      x2: line.x2 - frameRect.left,
      y2: line.y2 - frameRect.top,
    });
  }, [activeDot, popupPosition, frameRef, isDraggingPopup]);

  const handlePopupDragStart = useCallback((event) => {
    if (event.button !== 0 || !popupPosition || !frameRef.current) return;

    const frame = frameRef.current;
    const popupEl = popupMeasureRef.current;
    if (!popupEl) return;

    event.preventDefault();

    const pointerId = event.pointerId;
    const startX = event.clientX;
    const startY = event.clientY;
    const startTop = popupPosition.top;
    const startLeft = popupPosition.left;
    const popupWidth = popupPosition.width || popupEl.offsetWidth;

    dragStateRef.current = { pointerId, startX, startY, startTop, startLeft, popupWidth };
    setIsDraggingPopup(true);

    const onPointerMove = (moveEvent) => {
      if (moveEvent.pointerId !== pointerId) return;

      const frameRect = frame.getBoundingClientRect();
      const popupSize = {
        width: popupWidth,
        height: popupEl.offsetHeight,
      };
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      const clamped = clampPopupInFrame(
        startTop + dy,
        startLeft + dx,
        popupSize,
        { width: frameRect.width, height: frameRect.height },
      );

      setManualPopupPosition({
        top: clamped.top,
        left: clamped.left,
        width: popupWidth,
      });
    };

    const onPointerUp = (upEvent) => {
      if (upEvent.pointerId !== pointerId) return;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      dragStateRef.current = null;
      setIsDraggingPopup(false);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
  }, [frameRef, popupPosition]);

  const handleDotClick = (inspectId) => {
    setActiveId((current) => (current === inspectId ? null : inspectId));
  };

  const handleCopied = () => {
    setFlashingId(activeId);
    onShowToast?.('Styles copied — paste into your CSS');
    window.setTimeout(() => setFlashingId(null), 600);
  };

  const handleApplyFix = (role, hex) => {
    onColorChange?.(role, hex);
    onShowToast?.(`${role === 'text' ? 'Text color' : 'Background color'} updated — now passing AA`);
    window.setTimeout(measure, 50);
  };

  const connectorLength = connector
    ? Math.hypot(connector.x2 - connector.x1, connector.y2 - connector.y1)
    : 0;

  const overlayPaletteStyle = {
    '--preview-accent': paletteColors.accent,
    '--inspector-accent': paletteColors.accent,
  };

  return (
    <div className="inspector-overlay" style={overlayPaletteStyle}>
      {connector && (
        <svg className="inspector-overlay__connector" aria-hidden="true">
          <line
            key={`${connector.x1}-${connector.y1}-${connector.x2}-${connector.y2}`}
            x1={connector.x1}
            y1={connector.y1}
            x2={connector.x2}
            y2={connector.y2}
            className="inspector-overlay__connector-line"
            style={{ '--connector-length': `${connectorLength}px` }}
          />
        </svg>
      )}

      {showHint && (
        <p className="inspector-overlay__hint" role="status">Click any dot to inspect styles</p>
      )}

      {dotPositions.map((dot) => {
        const isActive = activeId === dot.entry.inspectId;
        const isFlashing = flashingId === dot.entry.inspectId;
        return (
          <button
            key={dot.entry.inspectId}
            type="button"
            className={[
              'inspector-overlay__dot',
              isActive ? 'inspector-overlay__dot--active' : '',
              isFlashing ? 'inspector-overlay__dot--copied' : '',
            ].filter(Boolean).join(' ')}
            style={{
              left: `${dot.x - DOT_HITBOX / 2}px`,
              top: `${dot.y - DOT_HITBOX / 2}px`,
              '--inspector-accent': paletteColors.accent,
            }}
            aria-label={`Inspect ${dot.entry.name} styles`}
            aria-pressed={isActive}
            onClick={() => handleDotClick(dot.entry.inspectId)}
          />
        );
      })}

      {activeDot && popupPosition && (
        <div
          ref={popupMeasureRef}
          className={[
            'inspector-overlay__popup',
            isDraggingPopup ? 'inspector-overlay__popup--dragging' : '',
          ].filter(Boolean).join(' ')}
          style={{
            position: 'absolute',
            top: `${popupPosition.top}px`,
            left: `${popupPosition.left}px`,
            width: popupPosition.width ? `${popupPosition.width}px` : undefined,
          }}
        >
          <InspectorPopup
            entry={activeDot.entry}
            element={activeDot.element}
            paletteColors={paletteColors}
            width={popupPosition.width}
            isDragging={isDraggingPopup}
            onHeaderPointerDown={handlePopupDragStart}
            onClose={() => setActiveId(null)}
            onCopied={handleCopied}
            onApplyFix={handleApplyFix}
          />
        </div>
      )}
    </div>
  );
}

export default InspectorOverlay;
