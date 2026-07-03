import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { X } from '@phosphor-icons/react';
import { useIsCompactLayout } from '../../hooks';
import Icon from '../Icon/Icon';
import { ICON_SIZE } from '../Icon/iconConfig';
import './Walkthrough.scss';

const SPOTLIGHT_PADDING = 8;
const VIEWPORT_MARGIN = 16;
const COMPACT_VIEWPORT_MARGIN = 12;
const POPOVER_GAP = 16;
const COMPACT_POPOVER_GAP = 10;
const MIN_TARGET_SIZE = 36;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getViewport() {
  const visualViewport = window.visualViewport;
  return {
    width: visualViewport?.width ?? window.innerWidth,
    height: visualViewport?.height ?? window.innerHeight,
    offsetTop: visualViewport?.offsetTop ?? 0,
    offsetLeft: visualViewport?.offsetLeft ?? 0,
  };
}

function getTargetRect(selector) {
  if (!selector) return null;
  const el = document.querySelector(selector);
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0) return null;
  return {
    top: rect.top - SPOTLIGHT_PADDING,
    left: rect.left - SPOTLIGHT_PADDING,
    width: rect.width + SPOTLIGHT_PADDING * 2,
    height: rect.height + SPOTLIGHT_PADDING * 2,
    bottom: rect.bottom + SPOTLIGHT_PADDING,
    right: rect.right + SPOTLIGHT_PADDING,
  };
}

function shouldUseCenterFallback(rect) {
  if (!rect) return true;

  const viewport = getViewport();
  const tooSmall = rect.width < MIN_TARGET_SIZE || rect.height < MIN_TARGET_SIZE;
  const offscreen = (
    rect.bottom < COMPACT_VIEWPORT_MARGIN
    || rect.top > viewport.height - COMPACT_VIEWPORT_MARGIN
    || rect.right < COMPACT_VIEWPORT_MARGIN
    || rect.left > viewport.width - COMPACT_VIEWPORT_MARGIN
  );

  return tooSmall || offscreen;
}

function ensureTargetExpanded(selector) {
  if (!selector) return false;
  const el = document.querySelector(selector);
  if (!el) return false;
  const trigger = el.querySelector('.accordion__trigger');
  if (trigger?.getAttribute('aria-expanded') === 'false') {
    trigger.click();
    return true;
  }
  return false;
}

function getPopoverRect(top, left, popoverSize) {
  return {
    top,
    left,
    width: popoverSize.width,
    height: popoverSize.height,
    right: left + popoverSize.width,
    bottom: top + popoverSize.height,
  };
}

function rectsOverlap(a, b, gap = 0) {
  return !(
    a.right + gap <= b.left
    || a.left >= b.right + gap
    || a.bottom + gap <= b.top
    || a.top >= b.bottom + gap
  );
}

function positionForSide(side, rect, popoverSize, isCompact) {
  const { width: pw, height: ph } = popoverSize;
  const viewport = getViewport();
  const margin = isCompact ? COMPACT_VIEWPORT_MARGIN : VIEWPORT_MARGIN;
  const gap = isCompact ? COMPACT_POPOVER_GAP : POPOVER_GAP;
  const tallTarget = rect.height > viewport.height * 0.55;

  let top;
  let left;

  switch (side) {
    case 'top':
      top = rect.top - gap - ph;
      left = rect.left + rect.width / 2 - pw / 2;
      break;
    case 'bottom':
      top = rect.bottom + gap;
      left = rect.left + rect.width / 2 - pw / 2;
      break;
    case 'left':
      top = tallTarget ? rect.top : rect.top + rect.height / 2 - ph / 2;
      left = rect.left - gap - pw;
      break;
    case 'right':
    default:
      top = tallTarget ? rect.top : rect.top + rect.height / 2 - ph / 2;
      left = rect.right + gap;
      break;
  }

  top = clamp(top, margin + viewport.offsetTop, viewport.offsetTop + viewport.height - ph - margin);
  left = clamp(left, margin + viewport.offsetLeft, viewport.offsetLeft + viewport.width - pw - margin);

  return {
    top: `${top}px`,
    left: `${left}px`,
    transform: 'none',
    placement: side,
    rect: getPopoverRect(top, left, popoverSize),
  };
}

function computePopoverPosition(rect, placement, popoverSize, isCompact, compactPlacement) {
  if (!rect || shouldUseCenterFallback(rect)) {
    return {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      placement: 'center',
      centerFallback: true,
    };
  }

  const basePreferred = placement && placement !== 'center' ? placement : 'right';
  const preferred = isCompact ? (compactPlacement || basePreferred) : basePreferred;
  const sides = isCompact
    ? [preferred, 'bottom', 'top', 'right', 'left']
    : [preferred, 'right', 'left', 'bottom', 'top'];
  const uniqueSides = [...new Set(sides)];

  let bestFallback = null;

  for (const side of uniqueSides) {
    const candidate = positionForSide(side, rect, popoverSize, isCompact);
    const viewport = getViewport();
    const margin = isCompact ? COMPACT_VIEWPORT_MARGIN : VIEWPORT_MARGIN;
    const fitsViewport = (
      candidate.rect.top >= margin + viewport.offsetTop
      && candidate.rect.left >= margin + viewport.offsetLeft
      && candidate.rect.bottom <= viewport.offsetTop + viewport.height - margin
      && candidate.rect.right <= viewport.offsetLeft + viewport.width - margin
    );

    if (!fitsViewport) continue;

    if (!rectsOverlap(candidate.rect, rect, isCompact ? COMPACT_POPOVER_GAP : POPOVER_GAP)) {
      return {
        top: candidate.top,
        left: candidate.left,
        transform: candidate.transform,
        placement: candidate.placement,
        centerFallback: false,
      };
    }

    if (!bestFallback) bestFallback = candidate;
  }

  if (bestFallback) {
    return {
      top: bestFallback.top,
      left: bestFallback.left,
      transform: bestFallback.transform,
      placement: bestFallback.placement,
      centerFallback: false,
    };
  }

  const bottom = positionForSide('bottom', rect, popoverSize, isCompact);
  return {
    top: bottom.top,
    left: bottom.left,
    transform: bottom.transform,
    placement: bottom.placement,
    centerFallback: false,
  };
}

function Walkthrough({
  step,
  stepIndex,
  stepCount,
  onNext,
  onPrev,
  onSkip,
  isFirst,
  isLast,
}) {
  const isCompact = useIsCompactLayout();
  const popoverRef = useRef(null);
  const [spotlightRect, setSpotlightRect] = useState(null);
  const [popoverStyle, setPopoverStyle] = useState({});
  const [activePlacement, setActivePlacement] = useState(step?.placement || 'center');
  const [centerFallback, setCenterFallback] = useState(false);

  const measure = useCallback(() => {
    const targetSelector = isCompact && step?.compactTarget ? step.compactTarget : step?.target;
    const rect = getTargetRect(targetSelector);
    setSpotlightRect(rect);

    const popoverEl = popoverRef.current;
    if (!popoverEl) return;

    const popoverSize = {
      width: popoverEl.offsetWidth,
      height: popoverEl.offsetHeight,
    };

    const position = computePopoverPosition(
      rect,
      step?.placement || 'center',
      popoverSize,
      isCompact,
      step?.compactPlacement,
    );
    setPopoverStyle({
      top: position.top,
      left: position.left,
      transform: position.transform || 'none',
    });
    setActivePlacement(position.placement || step?.placement || 'center');
    setCenterFallback(Boolean(position.centerFallback));
  }, [step, isCompact]);

  useLayoutEffect(() => {
    const targetSelector = isCompact && step?.compactTarget ? step.compactTarget : step?.target;
    const expanded = ensureTargetExpanded(targetSelector);
    measure();

    const delays = expanded
      ? [50, 200, 400, 700]
      : targetSelector
        ? [100, 350, 600, 900]
        : [350];
    const timers = delays.map((delay) => window.setTimeout(measure, delay));

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [measure, stepIndex, step?.target, step?.compactTarget, isCompact]);

  useEffect(() => {
    const handler = () => measure();
    window.addEventListener('resize', handler);
    window.addEventListener('scroll', handler, true);
    window.visualViewport?.addEventListener('resize', handler);
    window.visualViewport?.addEventListener('scroll', handler);
    return () => {
      window.removeEventListener('resize', handler);
      window.removeEventListener('scroll', handler, true);
      window.visualViewport?.removeEventListener('resize', handler);
      window.visualViewport?.removeEventListener('scroll', handler);
    };
  }, [measure]);

  useEffect(() => {
    const targetSelector = isCompact && step?.compactTarget ? step.compactTarget : step?.target;
    if (!targetSelector) return undefined;
    const el = document.querySelector(targetSelector);
    el?.scrollIntoView({ block: isCompact ? 'center' : 'nearest', behavior: 'smooth' });
    const timer = window.setTimeout(measure, 400);
    return () => window.clearTimeout(timer);
  }, [step, measure, isCompact]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onSkip();
      if (e.key === 'ArrowRight' && !e.shiftKey) onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onNext, onPrev, onSkip]);

  if (!step) return null;

  const targetSelector = isCompact && step.compactTarget ? step.compactTarget : step.target;
  const hasTarget = Boolean(targetSelector && spotlightRect && !centerFallback);

  return (
    <div className={`walkthrough ${isCompact ? 'walkthrough--compact' : ''}`} role="presentation">
      {hasTarget ? (
        <div
          className="walkthrough__spotlight"
          style={{
            top: spotlightRect.top,
            left: spotlightRect.left,
            width: spotlightRect.width,
            height: spotlightRect.height,
          }}
          aria-hidden="true"
        />
      ) : (
        <div className="walkthrough__overlay walkthrough__overlay--full" aria-hidden="true" />
      )}

      <div
        ref={popoverRef}
        className={[
          'walkthrough__popover',
          hasTarget ? `walkthrough__popover--${activePlacement}` : 'walkthrough__popover--center',
          centerFallback ? 'walkthrough__popover--fallback' : '',
        ].filter(Boolean).join(' ')}
        role="dialog"
        aria-modal="true"
        aria-labelledby="walkthrough-title"
        aria-describedby="walkthrough-body"
        style={popoverStyle}
      >
        <header className="walkthrough__header">
          <p className="walkthrough__step" aria-live="polite">
            Step {stepIndex + 1} of {stepCount}
          </p>
          <button
            type="button"
            className="walkthrough__close"
            onClick={onSkip}
            aria-label="Close tour"
          >
            <Icon icon={X} size={ICON_SIZE} />
          </button>
        </header>

        <h2 id="walkthrough-title" className="walkthrough__title">
          {step.title}
        </h2>
        <p id="walkthrough-body" className="walkthrough__body">
          {step.content}
        </p>

        <footer className="walkthrough__footer">
          <button type="button" className="walkthrough__skip btn btn--secondary btn--sm" onClick={onSkip}>
            Skip tour
          </button>
          <div className="walkthrough__nav">
            {!isFirst && (
              <button type="button" className="btn btn--secondary btn--sm" onClick={onPrev}>
                Back
              </button>
            )}
            <button type="button" className="btn btn--primary btn--sm" onClick={onNext}>
              {isLast ? 'Get started' : 'Next'}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Walkthrough;
