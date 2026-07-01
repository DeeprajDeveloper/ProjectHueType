import { useState } from 'react';
import { Check } from '@phosphor-icons/react';
import { generateColorScale, isColorLight } from '../../utils/colorScale';
import Icon from '../Icon/Icon';
import './ColorScaleStrip.scss';

const STEPS = [100, 200, 300, 400, 500, 600, 700, 800, 900];

async function copyHex(hex) {
  try {
    await navigator.clipboard.writeText(hex);
    return true;
  } catch {
    return false;
  }
}

function ColorScaleStrip({ baseHex, roleLabel, onCopy, showHex = false }) {
  const [copiedStep, setCopiedStep] = useState(null);
  const scale = generateColorScale(baseHex);

  const handleCopy = async (step, hex) => {
    const ok = await copyHex(hex);
    if (ok) {
      setCopiedStep(step);
      onCopy?.(hex);
      setTimeout(() => setCopiedStep(null), 1200);
    }
  };

  if (showHex) {
    return (
      <div className="color-scale-strip color-scale-strip--detailed" aria-label={`${roleLabel} color scale`}>
        <ul className="color-scale-strip__list">
          {STEPS.map((step) => {
            const hex = scale[step];
            const isLight = isColorLight(hex);
            const isCopied = copiedStep === step;

            return (
              <li key={step}>
                <button
                  type="button"
                  className={`color-scale-strip__row ${isCopied ? 'color-scale-strip__row--copied' : ''}`}
                  title={`Click to copy ${hex}`}
                  aria-label={`${roleLabel} ${step}: ${hex}. Click to copy.`}
                  onClick={() => handleCopy(step, hex)}
                >
                  <span
                    className="color-scale-strip__swatch color-scale-strip__swatch--detailed"
                    style={{ backgroundColor: hex }}
                    aria-hidden="true"
                  >
                    <span
                      className={`color-scale-strip__step ${isLight ? 'color-scale-strip__step--dark' : ''}`}
                    >
                      {isCopied ? <Icon icon={Check} size={10} weight="bold" /> : step}
                    </span>
                  </span>
                  <span className="color-scale-strip__hex">{hex}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div className="color-scale-strip" aria-label={`${roleLabel} color scale`}>
      <div className="color-scale-strip__swatches">
        {STEPS.map((step) => {
          const hex = scale[step];
          const isLight = isColorLight(hex);
          const isCopied = copiedStep === step;

          return (
            <button
              key={step}
              type="button"
              className={`color-scale-strip__swatch ${isCopied ? 'color-scale-strip__swatch--copied' : ''}`}
              style={{ backgroundColor: hex }}
              title={`Click to copy ${hex}`}
              aria-label={`${roleLabel} ${step}: ${hex}. Click to copy.`}
              onClick={() => handleCopy(step, hex)}
            >
              <span
                className={`color-scale-strip__step ${isLight ? 'color-scale-strip__step--dark' : ''}`}
              >
                {isCopied ? <Icon icon={Check} size={10} weight="bold" /> : step}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ColorScaleStrip;
