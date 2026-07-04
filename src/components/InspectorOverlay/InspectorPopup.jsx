import { useEffect, useId, useRef, useState } from 'react';
import { XIcon } from '@phosphor-icons/react';
import Icon from '../Icon/Icon';
import { ICON_SIZE_SM } from '../Icon/iconConfig';
import {
  buildCssSnippet,
  buildTailwindSnippet,
  extractElementStyles,
  getWcagAssessment,
} from '../../utils/inspector';
import './InspectorPopup.scss';

function StyleRow({ row, onCopyHex }) {
  if (row.swatch) {
    return (
      <div className="inspector-popup__row">
        <span className="inspector-popup__label">{row.label}</span>
        <span className="inspector-popup__value">
          <button
            type="button"
            className="inspector-popup__swatch"
            style={{ backgroundColor: row.swatch }}
            aria-label={`Color: ${row.value}`}
            onClick={() => onCopyHex(row.value)}
          />
          <span>{row.value}</span>
          {row.role && <span className="inspector-popup__role">{row.role}</span>}
        </span>
      </div>
    );
  }

  return (
    <div className="inspector-popup__row">
      <span className="inspector-popup__label">{row.label}</span>
      <span className="inspector-popup__value">{row.value}</span>
    </div>
  );
}

function WcagSection({ assessment, onFixClick }) {
  if (!assessment) return null;

  if (assessment.kind === 'decorative') {
    return (
      <section className="inspector-popup__wcag" aria-label="Accessibility">
        <h3 className="inspector-popup__wcag-title">Accessibility</h3>
        <p className="inspector-popup__wcag-note">{assessment.message}</p>
      </section>
    );
  }

  if (assessment.kind === 'non-text') {
    return (
      <section className="inspector-popup__wcag" aria-label="Accessibility">
        <h3 className="inspector-popup__wcag-title">Accessibility</h3>
        <p className="inspector-popup__wcag-ratio">{assessment.ratio.toFixed(2)} : 1</p>
        <div className="inspector-popup__badges">
          <span className={`inspector-popup__badge ${assessment.pass ? 'inspector-popup__badge--pass' : 'inspector-popup__badge--fail'}`}>
            {assessment.pass ? '✓' : '✗'} Non-text contrast
          </span>
          <span className="inspector-popup__wcag-criterion">({assessment.criterion})</span>
        </div>
        <p className="inspector-popup__wcag-note">{assessment.note}</p>
        <p className="inspector-popup__wcag-caption">Checked at this element&apos;s actual size and weight</p>
      </section>
    );
  }

  const { badges, ratio, note, fixes } = assessment;

  return (
    <section className="inspector-popup__wcag" aria-label="Accessibility">
      <h3 className="inspector-popup__wcag-title">Accessibility</h3>
      <p className="inspector-popup__wcag-ratio">{ratio.toFixed(2)} : 1</p>
      <div className="inspector-popup__badges">
        <span className={`inspector-popup__badge ${badges.aa ? 'inspector-popup__badge--pass' : 'inspector-popup__badge--fail'}`}>
          {badges.aa ? '✓' : '✗'} AA
        </span>
        <span className={`inspector-popup__badge ${badges.aaLarge ? 'inspector-popup__badge--pass' : 'inspector-popup__badge--muted'}`}>
          {badges.aaLarge ? '✓' : '✗'} AA Large
        </span>
        <span className={`inspector-popup__badge ${badges.aaa ? 'inspector-popup__badge--pass' : 'inspector-popup__badge--muted'}`}>
          {badges.aaa ? '✓' : '✗'} AAA
        </span>
      </div>
      <p className="inspector-popup__wcag-note">{note}</p>
      {!assessment.passAa && fixes && (
        <div className="inspector-popup__fixes">
          {fixes.darkerText && (
            <button type="button" className="inspector-popup__fix-chip" data-fix="text" onClick={onFixClick}>
              <span className="inspector-popup__swatch" style={{ backgroundColor: fixes.darkerText }} aria-hidden="true" />
              Darken text → {fixes.darkerText}
            </button>
          )}
          {fixes.lighterBg && (
            <button type="button" className="inspector-popup__fix-chip" data-fix="background" onClick={onFixClick}>
              <span className="inspector-popup__swatch" style={{ backgroundColor: fixes.lighterBg }} aria-hidden="true" />
              Lighten bg → {fixes.lighterBg}
            </button>
          )}
        </div>
      )}
      <p className="inspector-popup__wcag-caption">Checked at this element&apos;s actual size and weight</p>
    </section>
  );
}

function InspectorPopup({
  entry,
  element,
  paletteColors,
  width,
  isDragging = false,
  onHeaderPointerDown,
  onClose,
  onCopied,
  onApplyFix,
}) {
  const titleId = useId();
  const closeRef = useRef(null);
  const popupRef = useRef(null);
  const [format, setFormat] = useState('css');
  const [copied, setCopied] = useState(false);
  const [swatchCopied, setSwatchCopied] = useState(null);

  const styles = extractElementStyles(element, paletteColors);
  const wcag = getWcagAssessment({ wcagType: entry.wcagType, styles });
  const code = format === 'css' ? buildCssSnippet(styles) : buildTailwindSnippet(styles);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      onCopied?.();
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  const handleCopyHex = async (hex) => {
    try {
      await navigator.clipboard.writeText(hex);
      setSwatchCopied(hex);
      window.setTimeout(() => setSwatchCopied(null), 1000);
    } catch {
      // ignore
    }
  };

  const handleFixClick = (event) => {
    const fixType = event.currentTarget.dataset.fix;
    const assessment = getWcagAssessment({ wcagType: entry.wcagType, styles });
    if (!assessment?.fixes) return;
    const hex = fixType === 'text' ? assessment.fixes.darkerText : assessment.fixes.lighterBg;
    const role = fixType === 'text' ? 'text' : 'background';
    if (hex) onApplyFix?.(role, hex);
  };

  return (
    <div
      ref={popupRef}
      className={[
        'inspector-popup',
        isDragging ? 'inspector-popup--dragging' : '',
      ].filter(Boolean).join(' ')}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      data-tour="inspector-popup"
      style={{
        width: width ? `${width}px` : undefined,
      }}
    >
      <header
        className="inspector-popup__header"
        onPointerDown={onHeaderPointerDown}
      >
        <h2 id={titleId} className="inspector-popup__title">{entry.name}</h2>
        <button
          ref={closeRef}
          type="button"
          className="inspector-popup__close btn btn--secondary btn--sm"
          aria-label="Close inspector popup"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={onClose}
        >
          <Icon icon={XIcon} size={ICON_SIZE_SM} />
        </button>
      </header>

      <div className="inspector-popup__rows">
        {styles.typography.map((row) => (
          <StyleRow key={row.label} row={row} onCopyHex={handleCopyHex} />
        ))}
        {styles.colors.length > 0 && <div className="inspector-popup__divider" aria-hidden="true" />}
        {styles.colors.map((row) => (
          <StyleRow key={row.label} row={row} onCopyHex={handleCopyHex} />
        ))}
      </div>

      {swatchCopied && (
        <p className="inspector-popup__swatch-toast" aria-live="polite">Copied {swatchCopied}</p>
      )}

      <WcagSection assessment={wcag} onFixClick={handleFixClick} />

      <div className="inspector-popup__format-tabs" role="tablist" aria-label="Export format">
        <button
          type="button"
          role="tab"
          aria-selected={format === 'css'}
          className={`inspector-popup__format-tab ${format === 'css' ? 'inspector-popup__format-tab--active' : ''}`}
          onClick={() => setFormat('css')}
        >
          CSS
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={format === 'tailwind'}
          className={`inspector-popup__format-tab ${format === 'tailwind' ? 'inspector-popup__format-tab--active' : ''}`}
          onClick={() => setFormat('tailwind')}
        >
          Tailwind
        </button>
      </div>

      <pre className="inspector-popup__code"><code>{code}</code></pre>

      <button
        type="button"
        className={`inspector-popup__copy-all btn btn--primary ${copied ? 'inspector-popup__copy-all--copied' : ''}`}
        onClick={handleCopyAll}
      >
        {copied ? '✓ Copied!' : 'Copy all styles'}
      </button>
    </div>
  );
}

export default InspectorPopup;
