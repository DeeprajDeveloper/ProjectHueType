import { useMemo, useState } from 'react';
import { CaretDown, CaretRight } from '@phosphor-icons/react';
import {
  SCALE_STEPS,
  generateColorScale,
  isColorLight,
  formatHsl,
  COLOR_ROLE_CONFIG,
} from '../../utils/colorScale';
import { contrastRatio } from '../../utils/contrast';
import Accordion from '../Accordion/Accordion';
import Icon from '../Icon/Icon';
import { ICON_SIZE_SM } from '../Icon/iconConfig';
import './ColorScaleVisualizer.scss';

const VISUALIZER_ROLES = ['background', 'secondary', 'primary', 'accent', 'text'];

async function copyHex(hex) {
  try {
    await navigator.clipboard.writeText(hex);
    return true;
  } catch {
    return false;
  }
}

function getContrastDotColor(hex) {
  const blackRatio = contrastRatio('#000000', hex);
  const whiteRatio = contrastRatio('#FFFFFF', hex);
  return blackRatio >= 4.5 && blackRatio >= whiteRatio ? '#000000' : '#FFFFFF';
}

function ColorScaleUsage({ role, hex, colors }) {
  const textOnBg = colors.text;
  const lightText = isColorLight(hex) ? colors.text : colors.background;

  switch (role) {
    case 'primary':
      return (
        <div className="color-scale-usage">
          <button type="button" className="color-scale-usage__btn" style={{ background: hex, color: lightText }}>
            Get started
          </button>
          <a href="#usage" className="color-scale-usage__link" style={{ color: hex }} onClick={(e) => e.preventDefault()}>
            Nav link
          </a>
        </div>
      );
    case 'accent':
      return (
        <div className="color-scale-usage">
          <span className="color-scale-usage__badge" style={{ background: hex, color: lightText }}>New</span>
          <span className="color-scale-usage__icon-label" style={{ color: hex }}>
            <span className="color-scale-usage__dot" style={{ background: hex }} aria-hidden="true" />
            Label
          </span>
        </div>
      );
    case 'background':
      return (
        <div className="color-scale-usage color-scale-usage--card" style={{ background: hex }}>
          <strong style={{ color: textOnBg }}>Card heading</strong>
          <p style={{ color: textOnBg }}>Body copy on this background.</p>
        </div>
      );
    case 'surface':
      return (
        <div className="color-scale-usage color-scale-usage--panel" style={{ background: hex }}>
          <div className="color-scale-usage__list-item" style={{ color: textOnBg }}>List item</div>
          <div className="color-scale-usage__list-item color-scale-usage__list-item--muted" style={{ color: textOnBg }}>
            Secondary row
          </div>
        </div>
      );
    case 'text':
      return (
        <div className="color-scale-usage color-scale-usage--text" style={{ background: colors.background }}>
          <strong style={{ color: hex, fontSize: '16px' }}>Heading</strong>
          <p style={{ color: hex, fontSize: '16px' }}>Body paragraph at 16px.</p>
          <span style={{ color: hex, fontSize: '12px' }}>Caption text</span>
        </div>
      );
    default:
      return null;
  }
}

function ColorScaleRole({
  role,
  baseHex,
  colors,
  onCopy,
  collapsed,
  onToggleCollapsed,
}) {
  const [copiedStep, setCopiedStep] = useState(null);
  const config = COLOR_ROLE_CONFIG[role] || { label: role, usage: role };
  const scale = generateColorScale(baseHex);

  const handleCopy = async (step, hex) => {
    const ok = await copyHex(hex);
    if (ok) {
      setCopiedStep(step);
      onCopy?.(hex);
      setTimeout(() => setCopiedStep(null), 1000);
    }
  };

  return (
    <section className={`color-scale-role ${collapsed ? 'color-scale-role--collapsed' : ''}`}>
      <header className="color-scale-role__header">
        <button
          type="button"
          className="color-scale-role__toggle"
          onClick={onToggleCollapsed}
          aria-expanded={!collapsed}
        >
          <Icon icon={collapsed ? CaretRight : CaretDown} size={ICON_SIZE_SM} />
          <span className="color-scale-role__name">{config.label}</span>
        </button>
        <span className="color-scale-role__hex">{baseHex}</span>
      </header>

      {!collapsed && (
        <>
          <div
            className="color-scale-role__strip"
            role="list"
            aria-label={`${config.label} color scale`}
          >
            {SCALE_STEPS.map((step) => {
              const hex = scale[step];
              const isBase = step === 500;
              const isCopied = copiedStep === step;
              const dotColor = getContrastDotColor(hex);

              return (
                <div key={step} className="color-scale-role__swatch-wrap" role="listitem">
                  <span className="color-scale-role__step-label">
                    {isCopied ? 'Copied ✓' : step}
                  </span>
                  <button
                    type="button"
                    className={[
                      'color-scale-role__swatch',
                      isBase ? 'color-scale-role__swatch--base' : '',
                    ].filter(Boolean).join(' ')}
                    style={{ backgroundColor: hex }}
                    aria-label={`${config.label} ${step}: ${hex}. Click to copy.`}
                    onClick={() => handleCopy(step, hex)}
                  >
                    <span
                      className="color-scale-role__contrast-dot"
                      style={{ color: dotColor }}
                      aria-hidden="true"
                    >
                      ●
                    </span>
                  </button>
                  <span className="color-scale-role__value-label">
                    <span className="color-scale-role__hex-inline">{hex}</span>
                    <span className="color-scale-role__hsl-inline">{formatHsl(hex)}</span>
                  </span>
                </div>
              );
            })}
          </div>

          <ColorScaleUsage role={config.usage} hex={baseHex} colors={colors} />
        </>
      )}
    </section>
  );
}

function ColorScaleVisualizer({ colors, onCopy }) {
  const [collapsedRoles, setCollapsedRoles] = useState({});

  const allCollapsed = useMemo(
    () => VISUALIZER_ROLES.every((role) => collapsedRoles[role]),
    [collapsedRoles],
  );

  const toggleAll = () => {
    if (allCollapsed) {
      setCollapsedRoles({});
      return;
    }
    setCollapsedRoles(Object.fromEntries(VISUALIZER_ROLES.map((role) => [role, true])));
  };

  const toggleRole = (role) => {
    setCollapsedRoles((prev) => ({
      ...prev,
      [role]: !prev[role],
    }));
  };

  return (
    <div className="color-scale-visualizer">
      <div className="color-scale-visualizer__toolbar">
        <button
          type="button"
          className="color-scale-visualizer__toolbar-btn btn btn--secondary btn--sm"
          onClick={toggleAll}
        >
          {allCollapsed ? 'Expand all' : 'Collapse all'}
        </button>
      </div>

      {VISUALIZER_ROLES.map((role) => (
        <ColorScaleRole
          key={role}
          role={role}
          baseHex={colors[role]}
          colors={colors}
          onCopy={onCopy}
          collapsed={Boolean(collapsedRoles[role])}
          onToggleCollapsed={() => toggleRole(role)}
        />
      ))}

      <Accordion title="How are these generated?" persistKey="color-scale-how" defaultOpen={false}>
        <p className="color-scale-visualizer__explainer-text">
          Steps are derived from your base color using perceptually uniform lightness
          interpolation (HSLuv), so each step looks equally spaced to the human eye.
        </p>
      </Accordion>
    </div>
  );
}

export default ColorScaleVisualizer;
