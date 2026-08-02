import { useState } from 'react';
import Accordion from '../Accordion/Accordion';
import AccordionStack from '../Accordion/AccordionStack';
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

function WcagContent({ assessment, onFixClick }) {
  if (!assessment) return null;

  if (assessment.kind === 'decorative') {
    return <p className="inspector-popup__wcag-note">{assessment.message}</p>;
  }

  if (assessment.kind === 'non-text') {
    return (
      <>
        <p className="inspector-popup__wcag-ratio">{assessment.ratio.toFixed(2)} : 1</p>
        <div className="inspector-popup__badges">
          <span className={`inspector-popup__badge ${assessment.pass ? 'inspector-popup__badge--pass' : 'inspector-popup__badge--fail'}`}>
            {assessment.pass ? '✓' : '✗'} Non-text contrast
          </span>
          <span className="inspector-popup__wcag-criterion">({assessment.criterion})</span>
        </div>
        <p className="inspector-popup__wcag-note">{assessment.note}</p>
        <p className="inspector-popup__wcag-caption">Checked at this element&apos;s actual size and weight</p>
      </>
    );
  }

  const { badges, ratio, note, fixes } = assessment;

  return (
    <>
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
    </>
  );
}

export function getWcagBadgeMeta(assessment) {
  if (!assessment) return null;
  if (assessment.kind === 'decorative') {
    return { label: 'N/A', tone: 'muted' };
  }
  if (assessment.kind === 'non-text') {
    return {
      label: assessment.pass ? '3:1 ✓' : '3:1 ✗',
      tone: assessment.pass ? 'pass' : 'fail',
    };
  }
  return {
    label: assessment.passAa ? 'AA ✓' : 'AA ✗',
    tone: assessment.passAa ? 'pass' : 'fail',
  };
}

function InspectorPopupContent({
  entry,
  element,
  paletteColors,
  isCompactPopup = false,
  onCopied,
  onApplyFix,
}) {
  const [format, setFormat] = useState('css');
  const [copied, setCopied] = useState(false);
  const [swatchCopied, setSwatchCopied] = useState(null);

  const styles = extractElementStyles(element, paletteColors);
  const wcag = getWcagAssessment({ wcagType: entry.wcagType, styles });
  const code = format === 'css' ? buildCssSnippet(styles) : buildTailwindSnippet(styles);
  const wcagBadge = getWcagBadgeMeta(wcag);

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
    <AccordionStack key={entry.inspectId} className="inspector-popup__stack">
      <Accordion
        title="Styles"
        stackId="styles"
        defaultOpen={!isCompactPopup}
        variant="chrome"
        className="inspector-popup__accordion"
      >
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
      </Accordion>

      {wcag && (
        <Accordion
          title="Accessibility"
          stackId="accessibility"
          defaultOpen={false}
          badge={wcagBadge ? (
            <span className={`inspector-popup__wcag-badge inspector-popup__wcag-badge--${wcagBadge.tone}`}>
              {wcagBadge.label}
            </span>
          ) : null}
          variant="chrome"
          className="inspector-popup__accordion"
        >
          <WcagContent assessment={wcag} onFixClick={handleFixClick} />
        </Accordion>
      )}

      <Accordion
        title="Export code"
        stackId="export"
        defaultOpen={false}
        badge={(
          <span className="inspector-popup__format-badge">
            {format === 'css' ? 'CSS' : 'Tailwind'}
          </span>
        )}
        variant="chrome"
        className="inspector-popup__accordion"
      >
        <div className="inspector-popup__export">
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
      </Accordion>
    </AccordionStack>
  );
}

export default InspectorPopupContent;
