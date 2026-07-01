import {
  TYPE_SCALE,
  TYPE_BASE_PX,
  TYPE_BASE_MIN_PX,
  TYPE_BASE_MAX_PX,
  getTypeSizePx,
  formatRatio,
} from '../../utils/typographyScale';
import './TypographyScale.scss';

function TypographyScale({ fonts, basePx = TYPE_BASE_PX, onBasePxChange }) {
  const isCustomBase = basePx !== TYPE_BASE_PX;

  return (
    <div className="typography-scale">
      <div className="typography-scale__base">
        <label className="typography-scale__base-label" htmlFor="type-base-px">
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
          {isCustomBase && (
            <button
              type="button"
              className="typography-scale__base-reset"
              onClick={() => onBasePxChange?.(TYPE_BASE_PX)}
              aria-label="Reset base size to default"
            >
              Reset
            </button>
          )}
        </div>
        <p className="typography-scale__base-hint">
          All steps below are calculated from this base.
        </p>
      </div>

      {TYPE_SCALE.map((step) => {
        const fontFamily = fonts[step.role].family;
        const fontWeight = step.role === 'heading'
          ? fonts.heading.weight
          : fonts.body.weight;
        const sizePx = getTypeSizePx(step.ratio, basePx);

        return (
          <div key={step.id} className="typography-scale__row">
            <div className="typography-scale__meta">
              <span className="typography-scale__label">{step.label}</span>
              <span className="typography-scale__ratio">{formatRatio(step.ratio)}</span>
              <span className="typography-scale__size">{sizePx}px</span>
            </div>
            <p
              className="typography-scale__sample"
              style={{
                fontFamily: `'${fontFamily}', sans-serif`,
                fontWeight,
                fontSize: `${sizePx}px`,
                lineHeight: step.ratio >= 1.5 ? 1.2 : 1.5,
              }}
            >
              {step.sample}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default TypographyScale;
