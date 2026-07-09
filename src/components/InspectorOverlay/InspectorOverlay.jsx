import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useBreakpoint } from '../../hooks';
import { getInspectableElements } from '../../data/inspectorRegistry';
import {
  clampPopupInFrame,
  getConnectorPoints,
  getConnectorPointsToLeftEdge,
  getDotPositionInFrame,
  getPopupPosition,
  getScrollableElements,
  isElementVisibleInFrame,
  layoutPopoversOnRight,
} from '../../utils/inspector';
import InspectorDockPanel from './InspectorDockPanel';
import InspectorPopup from './InspectorPopup';
import './InspectorOverlay.scss';

const HINT_STORAGE_KEY = 'huetype-inspector-hint-seen';
const DOT_HITBOX = 24;
const ALL_POPUP_WIDTH = 200;
const ALL_POPUP_DEFAULT_HEIGHT = 132;

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
  showAllPopovers = false,
  dockPopovers = false,
  dockPortalEl,
  onShowToast,
  onColorChange,
}) {
  const [activeId, setActiveId] = useState(null);
  const [highlightedId, setHighlightedId] = useState(null);
  const [expandedDockId, setExpandedDockId] = useState(null);
  const [dotPositions, setDotPositions] = useState([]);
  const [autoPopupPosition, setAutoPopupPosition] = useState(null);
  const [manualPopupPosition, setManualPopupPosition] = useState(null);
  const [connector, setConnector] = useState(null);
  const [allConnectors, setAllConnectors] = useState([]);
  const [dockConnectors, setDockConnectors] = useState([]);
  const [autoPlacements, setAutoPlacements] = useState([]);
  const [allManualPositions, setAllManualPositions] = useState({});
  const [flashingId, setFlashingId] = useState(null);
  const [showHint, setShowHint] = useState(() => !readHintSeen());
  const [isDraggingPopup, setIsDraggingPopup] = useState(false);
  const [draggingAllId, setDraggingAllId] = useState(null);
  const breakpoint = useBreakpoint();
  const isCompactPopup = previewMode === 'mobile' || breakpoint === 'mobile';
  const popupMeasureRef = useRef(null);
  const allPopupRefs = useRef(new Map());
  const allPopupHeights = useRef(new Map());
  const dockTriggerRefs = useRef(new Map());
  const measureRafRef = useRef(null);
  const dragStateRef = useRef(null);
  const bulkLayoutMode = showAllPopovers || dockPopovers;

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

  const registerAllPopupRef = useCallback((inspectId, node) => {
    if (node) {
      allPopupRefs.current.set(inspectId, node);
    } else {
      allPopupRefs.current.delete(inspectId);
      allPopupHeights.current.delete(inspectId);
    }
  }, []);

  const updateDockConnectors = useCallback(() => {
    const frame = frameRef.current;
    if (!frame || !dockPopovers || dotPositions.length === 0) {
      setDockConnectors([]);
      return;
    }

    const frameRect = frame.getBoundingClientRect();
    const nextConnectors = [];

    dotPositions.forEach((dot) => {
      const trigger = dockTriggerRefs.current.get(dot.entry.inspectId);
      if (!trigger) return;

      const triggerRect = trigger.getBoundingClientRect();
      const dotViewport = {
        x: frameRect.left + dot.x,
        y: frameRect.top + dot.y,
      };
      const line = getConnectorPointsToLeftEdge(dotViewport, triggerRect);
      nextConnectors.push({
        inspectId: dot.entry.inspectId,
        x1: line.x1,
        y1: line.y1,
        x2: line.x2,
        y2: line.y2,
      });
    });

    setDockConnectors(nextConnectors);
  }, [dockPopovers, dotPositions, frameRef]);

  const registerDockTriggerRef = useCallback((inspectId, node) => {
    if (node) {
      dockTriggerRefs.current.set(inspectId, node);
      if (dockPopovers) {
        window.requestAnimationFrame(() => updateDockConnectors());
      }
    } else {
      dockTriggerRefs.current.delete(inspectId);
    }
  }, [dockPopovers, updateDockConnectors]);

  const measureAllPopups = useCallback(() => {
    const frame = frameRef.current;
    if (!frame || !showAllPopovers || dotPositions.length === 0) {
      setAutoPlacements([]);
      return;
    }

    const frameRect = frame.getBoundingClientRect();

    dotPositions.forEach((dot) => {
      const el = allPopupRefs.current.get(dot.entry.inspectId);
      const nextHeight = el?.offsetHeight ?? ALL_POPUP_DEFAULT_HEIGHT;
      allPopupHeights.current.set(dot.entry.inspectId, nextHeight);
    });

    const layoutItems = dotPositions.map((dot) => ({
      inspectId: dot.entry.inspectId,
      dotY: dot.y,
      height: allPopupHeights.current.get(dot.entry.inspectId) ?? ALL_POPUP_DEFAULT_HEIGHT,
    }));

    const placements = layoutPopoversOnRight(layoutItems, {
      width: frameRect.width,
      height: frameRect.height,
    }, {
      popupWidth: ALL_POPUP_WIDTH,
      defaultHeight: ALL_POPUP_DEFAULT_HEIGHT,
    });

    setAutoPlacements(placements);
  }, [dotPositions, frameRef, showAllPopovers]);

  const effectivePlacements = useMemo(() => {
    const autoById = new Map(autoPlacements.map((p) => [p.inspectId, p]));
    return dotPositions.map((dot) => {
      const { inspectId } = dot.entry;
      const manual = allManualPositions[inspectId];
      const auto = autoById.get(inspectId);
      if (manual) {
        return {
          inspectId,
          top: manual.top,
          left: manual.left,
          width: manual.width ?? ALL_POPUP_WIDTH,
          height: auto?.height ?? ALL_POPUP_DEFAULT_HEIGHT,
        };
      }
      return auto ?? null;
    }).filter(Boolean);
  }, [autoPlacements, allManualPositions, dotPositions]);

  const updateAllConnectors = useCallback(() => {
    const frame = frameRef.current;
    if (!frame || !showAllPopovers || effectivePlacements.length === 0) {
      setAllConnectors([]);
      return;
    }

    const frameRect = frame.getBoundingClientRect();
    const placementById = new Map(effectivePlacements.map((p) => [p.inspectId, p]));
    const nextConnectors = [];

    dotPositions.forEach((dot) => {
      const placement = placementById.get(dot.entry.inspectId);
      if (!placement) return;

      const popupEl = allPopupRefs.current.get(dot.entry.inspectId);
      const popupHeight = popupEl?.offsetHeight ?? placement.height;

      const dotViewport = {
        x: frameRect.left + dot.x,
        y: frameRect.top + dot.y,
      };

      const popupRect = {
        top: frameRect.top + placement.top,
        left: frameRect.left + placement.left,
        width: placement.width,
        height: popupHeight,
        right: frameRect.left + placement.left + placement.width,
        bottom: frameRect.top + placement.top + popupHeight,
      };

      const line = getConnectorPoints(dotViewport, popupRect);
      nextConnectors.push({
        inspectId: dot.entry.inspectId,
        x1: line.x1 - frameRect.left,
        y1: line.y1 - frameRect.top,
        x2: line.x2 - frameRect.left,
        y2: line.y2 - frameRect.top,
      });
    });

    setAllConnectors(nextConnectors);
  }, [dotPositions, effectivePlacements, frameRef, showAllPopovers]);

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
    if (showAllPopovers) {
      setActiveId(null);
      setManualPopupPosition(null);
      setAutoPopupPosition(null);
      setConnector(null);
      setExpandedDockId(null);
      return;
    }
    if (dockPopovers) {
      setActiveId(null);
      setManualPopupPosition(null);
      setAutoPopupPosition(null);
      setConnector(null);
      setAllManualPositions({});
      setAutoPlacements([]);
      return;
    }
    setHighlightedId(null);
    setExpandedDockId(null);
    setAllManualPositions({});
    setAutoPlacements([]);
    setDockConnectors([]);
  }, [showAllPopovers, dockPopovers]);

  useEffect(() => {
    if (bulkLayoutMode || !activeId) return;
    const stillVisible = dotPositions.some((dot) => dot.entry.inspectId === activeId);
    if (!stillVisible) {
      setActiveId(null);
    }
  }, [activeId, dotPositions, bulkLayoutMode]);

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
    if (bulkLayoutMode) return;
    if (!activeDot) {
      setAutoPopupPosition(null);
      return;
    }
    if (manualPopupPosition) return;

    setAutoPopupPosition(computeAutoPopupPosition());
  }, [activeDot, bulkLayoutMode, computeAutoPopupPosition, manualPopupPosition, dotPositions]);

  useEffect(() => {
    if (bulkLayoutMode) return undefined;
    const popupEl = popupMeasureRef.current;
    if (!popupEl || !activeDot || manualPopupPosition) return undefined;

    const observer = new ResizeObserver(() => {
      setAutoPopupPosition(computeAutoPopupPosition());
    });
    observer.observe(popupEl);
    return () => observer.disconnect();
  }, [activeDot, bulkLayoutMode, computeAutoPopupPosition, manualPopupPosition]);

  useEffect(() => {
    if (bulkLayoutMode || !manualPopupPosition || !frameRef.current || !popupMeasureRef.current) {
      return undefined;
    }

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
  }, [bulkLayoutMode, frameRef, manualPopupPosition]);

  useLayoutEffect(() => {
    if (bulkLayoutMode) return;
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
  }, [activeDot, bulkLayoutMode, dockPopovers, frameRef, isDraggingPopup, popupPosition]);

  useLayoutEffect(() => {
    if (!dockPopovers) {
      setDockConnectors([]);
      return undefined;
    }

    updateDockConnectors();
    const delays = [50, 200, 450, 800];
    const timers = delays.map((delay) => window.setTimeout(updateDockConnectors, delay));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [dockPopovers, dotPositions, expandedDockId, updateDockConnectors]);

  useEffect(() => {
    if (!dockPopovers) return undefined;

    window.addEventListener('resize', updateDockConnectors);
    window.visualViewport?.addEventListener('resize', updateDockConnectors);
    return () => {
      window.removeEventListener('resize', updateDockConnectors);
      window.visualViewport?.removeEventListener('resize', updateDockConnectors);
    };
  }, [dockPopovers, updateDockConnectors]);

  useLayoutEffect(() => {
    if (!showAllPopovers) {
      setAutoPlacements([]);
      setAllConnectors([]);
      return;
    }

    measureAllPopups();
    const delays = [50, 200, 450, 800];
    const timers = delays.map((delay) => window.setTimeout(measureAllPopups, delay));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [showAllPopovers, dotPositions, measureAllPopups]);

  useLayoutEffect(() => {
    if (!showAllPopovers) return;
    updateAllConnectors();
  }, [showAllPopovers, effectivePlacements, dotPositions, updateAllConnectors, draggingAllId]);

  useEffect(() => {
    if (!showAllPopovers) return undefined;

    const observers = [];
    dotPositions.forEach((dot) => {
      const el = allPopupRefs.current.get(dot.entry.inspectId);
      if (!el) return;
      const observer = new ResizeObserver(() => {
        measureAllPopups();
        updateAllConnectors();
      });
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [showAllPopovers, dotPositions, effectivePlacements.length, measureAllPopups, updateAllConnectors]);

  const handleAllPopupDragStart = useCallback((inspectId, event) => {
    if (!showAllPopovers || event.button !== 0 || !frameRef.current) return;

    const frame = frameRef.current;
    const popupEl = allPopupRefs.current.get(inspectId);
    if (!popupEl) return;

    const placement = effectivePlacements.find((p) => p.inspectId === inspectId);
    if (!placement) return;

    event.preventDefault();
    event.stopPropagation();

    const pointerId = event.pointerId;
    const startX = event.clientX;
    const startY = event.clientY;
    const startTop = placement.top;
    const startLeft = placement.left;
    const popupWidth = placement.width ?? ALL_POPUP_WIDTH;

    setDraggingAllId(inspectId);
    setHighlightedId(inspectId);

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

      setAllManualPositions((prev) => ({
        ...prev,
        [inspectId]: {
          top: clamped.top,
          left: clamped.left,
          width: popupWidth,
        },
      }));
    };

    const onPointerUp = (upEvent) => {
      if (upEvent.pointerId !== pointerId) return;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      setDraggingAllId(null);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
  }, [effectivePlacements, frameRef, showAllPopovers]);

  const handlePopupDragStart = useCallback((event) => {
    if (bulkLayoutMode || event.button !== 0 || !popupPosition || !frameRef.current) return;

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
  }, [bulkLayoutMode, frameRef, popupPosition]);

  const handleDotClick = (inspectId) => {
    if (dockPopovers) {
      setHighlightedId((current) => (current === inspectId ? null : inspectId));
      setExpandedDockId(inspectId);
      return;
    }
    if (showAllPopovers) {
      setHighlightedId((current) => (current === inspectId ? null : inspectId));
      return;
    }
    setActiveId((current) => (current === inspectId ? null : inspectId));
  };

  const handleCopied = (inspectId) => {
    const id = inspectId ?? activeId;
    setFlashingId(id);
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

  const placementById = useMemo(
    () => new Map(effectivePlacements.map((p) => [p.inspectId, p])),
    [effectivePlacements],
  );

  const overlayPaletteStyle = {
    '--preview-accent': paletteColors.accent,
    '--inspector-accent': paletteColors.accent,
  };

  const dockPanel = dockPopovers && dockPortalEl
    ? createPortal(
      <InspectorDockPanel
        items={dotPositions.map(({ entry, element }) => ({ entry, element }))}
        paletteColors={paletteColors}
        highlightedId={highlightedId}
        expandedId={expandedDockId}
        registerTriggerRef={registerDockTriggerRef}
        onCopied={handleCopied}
        onApplyFix={handleApplyFix}
        onScroll={updateDockConnectors}
      />,
      dockPortalEl,
    )
    : null;

  return (
    <>
      {dockPanel}
      <div
        className={[
          'inspector-overlay',
          showAllPopovers ? 'inspector-overlay--show-all' : '',
          dockPopovers ? 'inspector-overlay--docked' : '',
        ].filter(Boolean).join(' ')}
        style={overlayPaletteStyle}
      >
        {dockPopovers ? (
          <svg className="inspector-overlay__connector inspector-overlay__connector--docked" aria-hidden="true">
            {dockConnectors.map((line) => {
              const length = Math.hypot(line.x2 - line.x1, line.y2 - line.y1);
              const isHighlighted = highlightedId === line.inspectId;
              return (
                <line
                  key={line.inspectId}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  className={[
                    'inspector-overlay__connector-line',
                    isHighlighted ? 'inspector-overlay__connector-line--highlighted' : '',
                  ].filter(Boolean).join(' ')}
                  strokeDasharray={length}
                  style={{ '--connector-length': `${length}px` }}
                />
              );
            })}
          </svg>
        ) : showAllPopovers ? (
          <svg className="inspector-overlay__connector" aria-hidden="true">
            {allConnectors.map((line) => {
              const length = Math.hypot(line.x2 - line.x1, line.y2 - line.y1);
              const isHighlighted = highlightedId === line.inspectId;
              return (
                <line
                  key={line.inspectId}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  className={[
                    'inspector-overlay__connector-line',
                    isHighlighted ? 'inspector-overlay__connector-line--highlighted' : '',
                  ].filter(Boolean).join(' ')}
                  strokeDasharray={length}
                  style={{ '--connector-length': `${length}px` }}
                />
              );
            })}
          </svg>
        ) : connector && (
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

      {showHint && !bulkLayoutMode && (
        <p className="inspector-overlay__hint" role="status">Click any dot to inspect styles</p>
      )}

      {showAllPopovers && (
        <p className="inspector-overlay__hint inspector-overlay__hint--all" role="status">
          All elements — drag a panel by its header, or click a dot to highlight
        </p>
      )}

      {dockPopovers && (
        <p className="inspector-overlay__hint inspector-overlay__hint--dock" role="status">
          Docked to side panel — click a dot to expand its accordion
        </p>
      )}

      {dotPositions.map((dot) => {
        const isActive = bulkLayoutMode
          ? highlightedId === dot.entry.inspectId
          : activeId === dot.entry.inspectId;
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

      {showAllPopovers && dotPositions.map((dot) => {
        const placement = placementById.get(dot.entry.inspectId);
        if (!placement) return null;

        const isHighlighted = highlightedId === dot.entry.inspectId;
        const isFlashing = flashingId === dot.entry.inspectId;
        const isDragging = draggingAllId === dot.entry.inspectId;

        return (
          <div
            key={`popup-${dot.entry.inspectId}`}
            ref={(node) => registerAllPopupRef(dot.entry.inspectId, node)}
            className={[
              'inspector-overlay__popup',
              'inspector-overlay__popup--all',
              isHighlighted ? 'inspector-overlay__popup--highlighted' : '',
              isFlashing ? 'inspector-overlay__popup--copied' : '',
              isDragging ? 'inspector-overlay__popup--dragging' : '',
            ].filter(Boolean).join(' ')}
            style={{
              top: `${placement.top}px`,
              left: `${placement.left}px`,
              width: `${placement.width}px`,
            }}
          >
            <InspectorPopup
              entry={dot.entry}
              element={dot.element}
              paletteColors={paletteColors}
              width={placement.width}
              isCompactPopup
              showAllMode
              isHighlighted={isHighlighted}
              isDragging={isDragging}
              onHeaderPointerDown={(event) => handleAllPopupDragStart(dot.entry.inspectId, event)}
              onCopied={() => handleCopied(dot.entry.inspectId)}
              onApplyFix={handleApplyFix}
            />
          </div>
        );
      })}

      {!showAllPopovers && !dockPopovers && activeDot && popupPosition && (
        <div
          ref={popupMeasureRef}
          className={[
            'inspector-overlay__popup',
            isDraggingPopup ? 'inspector-overlay__popup--dragging' : '',
          ].filter(Boolean).join(' ')}
          style={{
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
            isCompactPopup={isCompactPopup}
            onHeaderPointerDown={handlePopupDragStart}
            onClose={() => setActiveId(null)}
            onCopied={() => handleCopied()}
            onApplyFix={handleApplyFix}
          />
        </div>
      )}
      </div>
    </>
  );
}

export default InspectorOverlay;
