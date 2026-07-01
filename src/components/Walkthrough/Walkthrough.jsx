import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { X } from '@phosphor-icons/react';
import Icon from '../Icon/Icon';
import { ICON_SIZE } from '../Icon/iconConfig';
import './Walkthrough.scss';

const SPOTLIGHT_PADDING = 8;
const VIEWPORT_MARGIN = 16;
const POPOVER_GAP = 14;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
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

function computePopoverPosition(rect, placement, popoverSize) {
  if (!rect) {
    return {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    };
  }

  const { width: pw, height: ph } = popoverSize;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const placements = [placement, 'bottom', 'top', 'right', 'left'];
  const uniquePlacements = [...new Set(placements)];

  for (const side of uniquePlacements) {
    let top;
    let left;

    switch (side) {
      case 'top':
        top = rect.top - POPOVER_GAP - ph;
        left = rect.left + rect.width / 2 - pw / 2;
        break;
      case 'bottom':
        top = rect.bottom + POPOVER_GAP;
        left = rect.left + rect.width / 2 - pw / 2;
        break;
      case 'left':
        top = rect.top + rect.height / 2 - ph / 2;
        left = rect.left - POPOVER_GAP - pw;
        break;
      case 'right':
      default:
        top = rect.top + rect.height / 2 - ph / 2;
        left = rect.right + POPOVER_GAP;
        break;
    }

    top = clamp(top, VIEWPORT_MARGIN, vh - ph - VIEWPORT_MARGIN);
    left = clamp(left, VIEWPORT_MARGIN, vw - pw - VIEWPORT_MARGIN);

    const fitsVertically = top >= VIEWPORT_MARGIN && top + ph <= vh - VIEWPORT_MARGIN;
    const fitsHorizontally = left >= VIEWPORT_MARGIN && left + pw <= vw - VIEWPORT_MARGIN;

    if (fitsVertically && fitsHorizontally) {
      return { top: `${top}px`, left: `${left}px`, transform: 'none', placement: side };
    }
  }

  return {
    top: `${clamp(rect.bottom + POPOVER_GAP, VIEWPORT_MARGIN, vh - ph - VIEWPORT_MARGIN)}px`,
    left: `${clamp(rect.left, VIEWPORT_MARGIN, vw - pw - VIEWPORT_MARGIN)}px`,
    transform: 'none',
    placement: 'bottom',
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
  const popoverRef = useRef(null);
  const [spotlightRect, setSpotlightRect] = useState(null);
  const [popoverStyle, setPopoverStyle] = useState({});
  const [activePlacement, setActivePlacement] = useState(step?.placement || 'center');

  const measure = useCallback(() => {
    const rect = getTargetRect(step?.target);
    setSpotlightRect(rect);

    const popoverEl = popoverRef.current;
    if (!popoverEl) return;

    const popoverSize = {
      width: popoverEl.offsetWidth,
      height: popoverEl.offsetHeight,
    };

    const position = computePopoverPosition(rect, step?.placement || 'center', popoverSize);
    setPopoverStyle({
      top: position.top,
      left: position.left,
      transform: position.transform || 'none',
    });
    setActivePlacement(position.placement || step?.placement || 'center');
  }, [step]);

  useLayoutEffect(() => {
    const expanded = ensureTargetExpanded(step?.target);
    measure();

    const delays = expanded ? [50, 200, 400] : [350];
    const timers = delays.map((delay) => window.setTimeout(measure, delay));

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [measure, stepIndex, step?.target]);

  useEffect(() => {
    const handler = () => measure();
    window.addEventListener('resize', handler);
    window.addEventListener('scroll', handler, true);
    return () => {
      window.removeEventListener('resize', handler);
      window.removeEventListener('scroll', handler, true);
    };
  }, [measure]);

  useEffect(() => {
    if (!step?.target) return undefined;
    const el = document.querySelector(step.target);
    el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    const timer = window.setTimeout(measure, 400);
    return () => window.clearTimeout(timer);
  }, [step, measure]);

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

  const hasTarget = Boolean(step.target && spotlightRect);

  return (
    <div className="walkthrough" role="presentation">
      {hasTarget ? (
        <>
          <div className="walkthrough__overlay walkthrough__overlay--dimmed" aria-hidden="true" />
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
        </>
      ) : (
        <div className="walkthrough__overlay walkthrough__overlay--full" aria-hidden="true" />
      )}

      <div
        ref={popoverRef}
        className={`walkthrough__popover ${hasTarget ? `walkthrough__popover--${activePlacement}` : 'walkthrough__popover--center'}`}
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
