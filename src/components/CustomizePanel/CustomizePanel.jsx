import { useEffect, useState } from 'react';
import { Lock, LockOpen, ArrowCounterClockwise } from '@phosphor-icons/react';
import { COLOR_ROLES, FONT_ROLES, GOOGLE_FONTS } from '../../data/combos';
import { normalizeHexColor } from '../../utils/color';
import Accordion from '../Accordion/Accordion';
import ColorScaleStrip from '../ColorScaleStrip/ColorScaleStrip';
import TypographyScale from '../TypographyScale/TypographyScale';
import Icon from '../Icon/Icon';
import { ICON_SIZE_SM } from '../Icon/iconConfig';
import './CustomizePanel.scss';

function HexColorInput({ value, onChange, role }) {
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  const commit = (raw) => {
    const normalized = normalizeHexColor(raw);
    if (normalized) {
      onChange(normalized);
      setDraft(normalized);
      return true;
    }
    return false;
  };

  return (
    <input
      type="text"
      className="customize-panel__hex-input"
      value={draft}
      onChange={(e) => {
        const next = e.target.value;
        setDraft(next);
        commit(next);
      }}
      onBlur={() => {
        if (!commit(draft)) {
          setDraft(value);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.currentTarget.blur();
        }
      }}
      aria-label={`${role} hex value`}
      spellCheck={false}
    />
  );
}

function CustomizePanel({
  combo,
  originalCombo,
  locks,
  showColorScales,
  onToggleColorScales,
  typeBasePx,
  onTypeBasePxChange,
  onColorChange,
  onFontChange,
  onToggleLock,
  onResetRole,
  onCopyColor,
}) {
  const isColorChanged = (role) => combo.colors[role] !== originalCombo.colors[role];
  const isFontChanged = (role) => combo.fonts[role].family !== originalCombo.fonts[role].family;

  return (
    <div className="customize-panel">
      <Accordion title="Colors" stackId="colors" defaultOpen persistKey="colors" dataTour="customize">
        <div className="customize-panel__scales-toggle">
          <span className="customize-panel__scales-label">Color scales (100–900)</span>
          <button
            type="button"
            role="switch"
            className={`customize-panel__scales-switch ${showColorScales ? 'customize-panel__scales-switch--on' : ''}`}
            aria-checked={showColorScales}
            aria-label={showColorScales ? 'Hide color scales' : 'Show color scales'}
            onClick={onToggleColorScales}
          >
            <span className="customize-panel__scales-switch-thumb" />
          </button>
        </div>

        {COLOR_ROLES.map((role) => (
          <div key={role} className="customize-panel__color-group">
            <div className="customize-panel__color-selection">
              <div className="customize-panel__row">
                <label className="customize-panel__label" htmlFor={`color-${role}`}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </label>
                <div className="customize-panel__controls">
                  <input
                    id={`color-${role}`}
                    type="color"
                    className="customize-panel__color-input"
                    value={combo.colors[role]}
                    onChange={(e) => onColorChange(role, e.target.value)}
                    aria-label={`${role} color`}
                  />
                  <HexColorInput
                    value={combo.colors[role]}
                    onChange={(hex) => onColorChange(role, hex)}
                    role={role}
                  />
                  <button
                    type="button"
                    className={`customize-panel__lock ${locks[`color-${role}`] ? 'customize-panel__lock--locked' : ''}`}
                    aria-label={locks[`color-${role}`] ? `Unlock ${role} color` : `Lock ${role} color`}
                    aria-pressed={locks[`color-${role}`]}
                    onClick={() => onToggleLock(`color-${role}`)}
                  >
                    <Icon
                      icon={locks[`color-${role}`] ? Lock : LockOpen}
                      size={ICON_SIZE_SM}
                      weight={locks[`color-${role}`] ? 'fill' : 'regular'}
                    />
                  </button>
                  {isColorChanged(role) && (
                    <button
                      type="button"
                      className="customize-panel__reset"
                      onClick={() => onResetRole('color', role, originalCombo)}
                      aria-label={`Reset ${role} color`}
                    >
                      <Icon icon={ArrowCounterClockwise} size={ICON_SIZE_SM} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {showColorScales && (
              <div className="customize-panel__color-scale">
                <div className="customize-panel__color-scale-header">
                  <span className="customize-panel__color-scale-label">Scale</span>
                  <span className="customize-panel__color-scale-base">{combo.colors[role]}</span>
                </div>
                <ColorScaleStrip
                  baseHex={combo.colors[role]}
                  roleLabel={role}
                  onCopy={onCopyColor}
                />
              </div>
            )}
          </div>
        ))}
      </Accordion>

      <Accordion title="Fonts" stackId="fonts" defaultOpen persistKey="fonts">
        {FONT_ROLES.map((role) => (
          <div key={role} className="customize-panel__font-block">
            <div className="customize-panel__row">
              <label className="customize-panel__label" htmlFor={`font-${role}`}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </label>
              <div className="customize-panel__controls">
                <select
                  id={`font-${role}`}
                  className="customize-panel__font-select"
                  value={combo.fonts[role].family}
                  onChange={(e) => onFontChange(role, e.target.value)}
                  style={{ fontFamily: combo.fonts[role].family }}
                >
                  {GOOGLE_FONTS.map((font) => (
                    <option key={font} value={font} style={{ fontFamily: font }}>
                      {font}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className={`customize-panel__lock ${locks[`font-${role}`] ? 'customize-panel__lock--locked' : ''}`}
                  aria-label={locks[`font-${role}`] ? `Unlock ${role} font` : `Lock ${role} font`}
                  aria-pressed={locks[`font-${role}`]}
                  onClick={() => onToggleLock(`font-${role}`)}
                >
                  <Icon
                    icon={locks[`font-${role}`] ? Lock : LockOpen}
                    size={ICON_SIZE_SM}
                    weight={locks[`font-${role}`] ? 'fill' : 'regular'}
                  />
                </button>
                {isFontChanged(role) && (
                  <button
                    type="button"
                    className="customize-panel__reset"
                    onClick={() => onResetRole('font', role, originalCombo)}
                    aria-label={`Reset ${role} font`}
                  >
                    <Icon icon={ArrowCounterClockwise} size={ICON_SIZE_SM} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="customize-panel__type-scale">
          <h4 className="customize-panel__type-scale-title">Type scale</h4>
          <TypographyScale
            fonts={combo.fonts}
            basePx={typeBasePx}
            onBasePxChange={onTypeBasePxChange}
          />
        </div>
      </Accordion>
    </div>
  );
}

export default CustomizePanel;
