import { TYPE_SCALE, getTypeSizePx, formatRatio } from '../../utils/typographyScale';
import './TypographyScale.scss';

function TypographyScale({ fonts }) {
  return (
    <div className="typography-scale">
      {TYPE_SCALE.map((step) => {
        const fontFamily = fonts[step.role].family;
        const fontWeight = step.role === 'heading'
          ? fonts.heading.weight
          : fonts.body.weight;
        const sizePx = getTypeSizePx(step.ratio);

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
