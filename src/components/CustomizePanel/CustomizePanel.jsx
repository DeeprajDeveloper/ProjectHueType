import { useEffect, useRef, useState } from 'react';
import { Lock, LockOpen, ArrowCounterClockwise } from '@phosphor-icons/react';
import { COLOR_ROLES, FONT_ROLES, GOOGLE_FONTS } from '../../data/combos';
import { normalizeHexColor } from '../../utils/color';
import Accordion from '../Accordion/Accordion';
import ColorScaleVisualizer from '../ColorScaleVisualizer/ColorScaleVisualizer';
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

function ColorSelectors({
  combo,
  originalCombo,
  locks,
  onColorChange,
  onToggleLock,
  onResetRole,
  onResetAll,
  isColorChanged,
  hasAnyChanges,
  compact = false,
}) {
  return (
    <>
      {hasAnyChanges && !compact && (
        <div className="customize-panel__section-actions">
          <button
            type="button"
            className="customize-panel__reset-all btn btn--secondary btn--sm"
            onClick={onResetAll}
          >
            <Icon icon={ArrowCounterClockwise} size={ICON_SIZE_SM} />
            Reset all colors
          </button>
        </div>
      )}
      {COLOR_ROLES.map((role) => (
        <div key={role} className="customize-panel__row">
          <label
            className="customize-panel__label"
            htmlFor={compact ? undefined : `color-${role}`}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </label>
          <div className="customize-panel__controls">
            <input
              id={compact ? undefined : `color-${role}`}
              type="color"
              className="customize-panel__color-input"
              value={combo.colors[role]}
              onChange={(e) => onColorChange(role, e.target.value)}
              aria-label={`${role} color`}
            />
            {!compact && (
              <>
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
                    active={locks[`color-${role}`]}
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
              </>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

function ColorScalesGroup({ combo, onCopyColor }) {
  return (
    <div className="customize-panel__color-scales-group">
      <h4 className="customize-panel__group-title">Color scales</h4>
      <ColorScaleVisualizer
        colors={combo.colors}
        onCopy={onCopyColor}
      />
    </div>
  );
}

function FontsContent({
  combo,
  originalCombo,
  locks,
  typeBasePx,
  onTypeBasePxChange,
  typeScaleRatio,
  onTypeScaleRatioChange,
  onFontChange,
  onToggleLock,
  onResetRole,
  onResetAll,
  isFontChanged,
  hasAnyChanges,
}) {
  return (
    <>
      {hasAnyChanges && (
        <div className="customize-panel__section-actions">
          <button
            type="button"
            className="customize-panel__reset-all btn btn--secondary btn--sm"
            onClick={onResetAll}
          >
            <Icon icon={ArrowCounterClockwise} size={ICON_SIZE_SM} />
            Reset all fonts
          </button>
        </div>
      )}
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
                    active={locks[`font-${role}`]}
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
          scaleRatio={typeScaleRatio}
          onBasePxChange={onTypeBasePxChange}
          onScaleRatioChange={onTypeScaleRatioChange}
        />
      </div>
    </>
  );
}

function CustomizePanel({
  section = 'all',
  flat = false,
  combo,
  originalCombo,
  locks,
  showColorScales,
  onToggleColorScales,
  typeBasePx,
  onTypeBasePxChange,
  typeScaleRatio,
  onTypeScaleRatioChange,
  onColorChange,
  onFontChange,
  onToggleLock,
  onResetRole,
  onResetAllColors,
  onResetAllFonts,
  onCopyColor,
  dataTour,
}) {
  const baseline = originalCombo ?? combo;
  const isColorChanged = (role) => combo.colors[role] !== baseline.colors[role];
  const isFontChanged = (role) => combo.fonts[role].family !== baseline.fonts[role].family;
  const hasColorChanges = COLOR_ROLES.some(isColorChanged);
  const hasFontChanges = FONT_ROLES.some(isFontChanged);
  const showColors = section === 'all' || section === 'colors';
  const showFonts = section === 'all' || section === 'fonts';
  const scrollSentinelRef = useRef(null);
  const [selectorsCompact, setSelectorsCompact] = useState(false);

  useEffect(() => {
    if (!showColors) return undefined;

    const sentinel = scrollSentinelRef.current;
    if (!sentinel) return undefined;

    const scrollRoot = sentinel.closest('.options-panel__body--flat');
    if (!scrollRoot) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setSelectorsCompact(!entry.isIntersecting),
      { root: scrollRoot, threshold: 0 },
    );
    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [showColors, showColorScales]);

  const colorsContent = (
    <>
      <div className="customize-panel__colors-chrome">
        {/* <div
          className={[
            'customize-panel__color-selectors-sticky',
            selectorsCompact ? 'customize-panel__color-selectors-sticky--visible' : '',
          ].filter(Boolean).join(' ')}
          aria-hidden={!selectorsCompact}
        >
          <div className="customize-panel__color-selectors customize-panel__color-selectors--compact">
            <ColorSelectors
              combo={combo}
              originalCombo={baseline}
              locks={locks}
              onColorChange={onColorChange}
              onToggleLock={onToggleLock}
              onResetRole={onResetRole}
              onResetAll={onResetAllColors}
              isColorChanged={isColorChanged}
              hasAnyChanges={hasColorChanges}
              compact
            />
          </div>
        </div> */}

        <div className="customize-panel__color-selectors customize-panel__color-selectors--inflow">
          <ColorSelectors
            combo={combo}
            originalCombo={baseline}
            locks={locks}
            onColorChange={onColorChange}
            onToggleLock={onToggleLock}
            onResetRole={onResetRole}
            onResetAll={onResetAllColors}
            isColorChanged={isColorChanged}
            hasAnyChanges={hasColorChanges}
          />
        </div>

        <div ref={scrollSentinelRef} className="customize-panel__scroll-sentinel" aria-hidden="true" />
      </div>

      <div className="customize-panel__scales-toggle">
        <span className="customize-panel__scales-label">Color scales</span>
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

      {showColorScales && (
        <ColorScalesGroup
          combo={combo}
          onCopyColor={onCopyColor}
        />
      )}
    </>
  );

  const fontsContent = (
    <FontsContent
      combo={combo}
      originalCombo={baseline}
      locks={locks}
      typeBasePx={typeBasePx}
      onTypeBasePxChange={onTypeBasePxChange}
      typeScaleRatio={typeScaleRatio}
      onTypeScaleRatioChange={onTypeScaleRatioChange}
      onFontChange={onFontChange}
      onToggleLock={onToggleLock}
      onResetRole={onResetRole}
      onResetAll={onResetAllFonts}
      isFontChanged={isFontChanged}
      hasAnyChanges={hasFontChanges}
    />
  );

  if (flat) {
    return (
      <div className="customize-panel customize-panel--flat" data-tour={dataTour}>
        {showColors && colorsContent}
        {showFonts && fontsContent}
      </div>
    );
  }

  return (
    <div className="customize-panel">
      {showColors && (
        <Accordion title="Colors" stackId="colors" defaultOpen persistKey="colors" dataTour={dataTour}>
          {colorsContent}
        </Accordion>
      )}

      {showFonts && (
        <Accordion title="Fonts" stackId="fonts" defaultOpen persistKey="fonts">
          {fontsContent}
        </Accordion>
      )}
    </div>
  );
}

export default CustomizePanel;
