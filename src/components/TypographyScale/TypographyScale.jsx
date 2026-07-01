import { useRef, useState } from 'react';
import SegmentControl from '../SegmentControl/SegmentControl';
import {
  TYPE_SPECIMEN_STEPS,
  TYPE_BASE_PX,
  TYPE_BASE_MIN_PX,
  TYPE_BASE_MAX_PX,
  SCALE_RATIO_OPTIONS,
  DEFAULT_SCALE_RATIO,
  getSpecimenSizePx,
  buildTypeStyleCss,
} from '../../utils/typographyScale';
import './TypographyScale.scss';

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function TypographyScale({
  fonts,
  basePx = TYPE_BASE_PX,
  scaleRatio = DEFAULT_SCALE_RATIO,
  onBasePxChange,
  onScaleRatioChange,
}) {
  const [copiedId, setCopiedId] = useState(null);
  const [activeRole, setActiveRole] = useState(null);
  const cardRefs = useRef({});

  const isCustomBase = basePx !== TYPE_BASE_PX;
  const isCustomRatio = scaleRatio !== DEFAULT_SCALE_RATIO;
  const selectedRatio = SCALE_RATIO_OPTIONS.find((o) => o.value === scaleRatio);

  const handleCopyRow = async (step) => {
    const css = buildTypeStyleCss(step, fonts, basePx, scaleRatio);
    const ok = await copyText(css);
    if (ok) {
      setCopiedId(step.id);
      setTimeout(() => setCopiedId(null), 1000);
    }
  };

  const scrollToRole = (role) => {
    setActiveRole(role);
    const firstMatch = TYPE_SPECIMEN_STEPS.find(
      (step) => step.role === role || (role === 'body' && step.role === 'mono'),
    );
    if (firstMatch) {
      cardRefs.current[firstMatch.id]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
    setTimeout(() => setActiveRole(null), 1200);
  };

  return (
    <div className="typography-scale">
      <div className="typography-scale__controls">
        <div className="typography-scale__ratio">
          <span className="typography-scale__control-label">Scale ratio</span>
          <SegmentControl
            options={SCALE_RATIO_OPTIONS.map((option) => ({
              value: option.value,
              label: option.label,
            }))}
            value={scaleRatio}
            onChange={onScaleRatioChange}
            ariaLabel="Type scale ratio"
          />
          <p className="typography-scale__formula">
            {basePx}px × {scaleRatio}
            <sup>n</sup>
            {selectedRatio ? ` · ${selectedRatio.fullLabel}` : ''}
          </p>
        </div>

        <div className="typography-scale__base">
          <label className="typography-scale__control-label" htmlFor="type-base-px">
            Base size
          </label>
          <div className="typography-scale__base-controls">
            <input
              id="type-base-px"
              type="number"
              className="typography-scale__base-input"
              value={basePx}
              min={TYPE_BASE_MIN_PX}
              max={TYPE_BASE_MAX_PX}
              step={1}
              onChange={(e) => onBasePxChange?.(e.target.value)}
              aria-label="Type scale base size in pixels"
            />
            <span className="typography-scale__base-unit">px</span>
            {(isCustomBase || isCustomRatio) && (
              <button
                type="button"
                className="typography-scale__base-reset"
                onClick={() => {
                  onBasePxChange?.(TYPE_BASE_PX);
                  onScaleRatioChange?.(DEFAULT_SCALE_RATIO);
                }}
                aria-label="Reset base size and ratio to default"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        <div className="typography-scale__role-toggle" role="group" aria-label="Jump to font role">
          <button
            type="button"
            className="typography-scale__role-btn"
            onClick={() => scrollToRole('heading')}
          >
            Heading font
          </button>
          <button
            type="button"
            className="typography-scale__role-btn"
            onClick={() => scrollToRole('body')}
          >
            Body font
          </button>
        </div>
      </div>

      <div className="typography-scale__stack">
        {TYPE_SPECIMEN_STEPS.map((step) => {
          const sizePx = getSpecimenSizePx(step, basePx, scaleRatio);
          const fontFamily = step.role === 'heading'
            ? fonts.heading.family
            : fonts.body.family;
          const isCopied = copiedId === step.id;
          const isHighlighted = activeRole && (
            step.role === activeRole || (activeRole === 'body' && step.role === 'mono')
          );
          const pillLabel = isCopied ? 'Copied ✓' : `${step.label} | ${sizePx}px`;

          return (
            <article
              key={step.id}
              ref={(el) => { cardRefs.current[step.id] = el; }}
              className={[
                'typography-scale__card',
                isHighlighted ? 'typography-scale__card--highlight' : '',
              ].filter(Boolean).join(' ')}
              role="button"
              tabIndex={0}
              onClick={() => handleCopyRow(step)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCopyRow(step);
                }
              }}
              aria-label={`Copy CSS for ${step.label}`}
            >
              <span className="typography-scale__pill">{pillLabel}</span>

              <p
                className="typography-scale__sample"
                style={{
                  fontFamily: `'${fontFamily}', ${step.role === 'mono' ? 'monospace' : 'sans-serif'}`,
                  fontWeight: step.weight,
                  fontSize: `${sizePx}px`,
                  lineHeight: step.lineHeight,
                  letterSpacing: step.letterSpacing,
                }}
              >
                {step.sample}
              </p>

              <dl className="typography-scale__meta">
                <div>
                  <dt>Line height</dt>
                  <dd>{step.lineHeight}</dd>
                </div>
                <div>
                  <dt>Tracking</dt>
                  <dd>{step.letterSpacing}</dd>
                </div>
                <div>
                  <dt>Use</dt>
                  <dd>{step.use}</dd>
                </div>
              </dl>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default TypographyScale;
