import { useEffect, useMemo, useState } from 'react';
import { ArrowCounterClockwise, Check, Warning, XCircle } from '@phosphor-icons/react';
import Accordion from '../Accordion/Accordion';
import Icon from '../Icon/Icon';
import { ICON_SIZE_SM } from '../Icon/iconConfig';
import {
  contrastRatio,
  getContrastSummary,
  suggestFixes,
} from '../../utils/contrast';
import './ComboInfoPanel.scss';

const STATUS_BAR = {
  pass: {
    icon: Check,
    className: 'combo-info-panel__status--pass',
    message: 'All text combinations meet WCAG AA (4.5:1 minimum). This palette is safe to use.',
  },
  warn: {
    icon: Warning,
    className: 'combo-info-panel__status--warn',
    message: (summary) => `${summary.borderline} combination${summary.borderline === 1 ? '' : 's'} pass for large text only (3:1+) but not body text (4.5:1). See Review recommended below.`,
  },
  fail: {
    icon: XCircle,
    className: 'combo-info-panel__status--fail',
    message: (summary) => `${summary.failures} combination${summary.failures === 1 ? '' : 's'} fail WCAG AA. Fix the items in Needs immediate attention below.`,
  },
};

const CONTRAST_SECTIONS = [
  {
    key: 'fail',
    title: 'Needs immediate attention',
    hint: 'These combinations fail WCAG AA for body text and UI labels. Fix before shipping.',
    icon: XCircle,
    className: 'combo-info-panel__section--fail',
  },
  {
    key: 'warn',
    title: 'Review recommended',
    hint: 'Safe for headings and large UI text (18px+). Avoid for 16px body copy.',
    icon: Warning,
    className: 'combo-info-panel__section--warn',
  },
  {
    key: 'pass',
    title: 'Passing',
    hint: 'These combinations meet WCAG AA for body text (4.5:1 minimum).',
    icon: Check,
    className: 'combo-info-panel__section--pass',
  },
];

const CARD_STATUS = {
  fail: { label: 'Fails AA', className: 'combo-info-panel__card-status--fail' },
  warn: { label: 'Large text only', className: 'combo-info-panel__card-status--warn' },
  pass: { label: 'Passes AA', className: 'combo-info-panel__card-status--pass' },
};

const FIX_ROLE_MAP = {
  'text-on-background': { fg: 'text', bg: 'background' },
  'text-on-surface': { fg: 'text', bg: 'secondary' },
  'button-on-primary': { fg: 'primary', bg: 'primary' },
  'accent-on-background': { fg: 'accent', bg: 'background' },
  'primary-on-background': { fg: 'primary', bg: 'background' },
  'button-on-accent': { fg: 'accent', bg: 'accent' },
};

const ROLE_LABELS = {
  text: 'text',
  background: 'background',
  secondary: 'surface',
  primary: 'primary',
  accent: 'accent',
};

const AA_TARGET_RATIO = 4.5;

function normalizeHex(hex) {
  return hex?.toUpperCase() ?? '';
}

function isDarkColor(hex) {
  return contrastRatio('#FFFFFF', hex) >= 3;
}

function getPairFixOptions(pair) {
  if (pair.status !== 'fail' && pair.status !== 'warn') return [];

  const fixes = suggestFixes(pair.fg, pair.bg, AA_TARGET_RATIO);
  const roles = FIX_ROLE_MAP[pair.id];
  if (!roles) return [];

  const isButtonPair = pair.id.startsWith('button-on-');
  const options = [];

  if (isButtonPair) {
    const role = roles.bg;
    if (normalizeHex(fixes.lighterBackground) !== normalizeHex(pair.bg)) {
      options.push({
        id: `${pair.id}-adjust-${role}`,
        type: 'bg',
        role,
        hex: fixes.lighterBackground,
        label: `Adjust ${ROLE_LABELS[role] || role}`,
      });
    }
    return options;
  }

  if (normalizeHex(fixes.darkerText) !== normalizeHex(pair.fg)) {
    options.push({
      id: `${pair.id}-adjust-${roles.fg}`,
      type: 'fg',
      role: roles.fg,
      hex: fixes.darkerText,
      label: `Adjust ${ROLE_LABELS[roles.fg] || roles.fg}`,
    });
  }

  const canSuggestBackgroundFix = !(
    roles.bg === 'background'
    && isDarkColor(pair.bg)
    && !isDarkColor(fixes.lighterBackground)
  );

  if (canSuggestBackgroundFix && normalizeHex(fixes.lighterBackground) !== normalizeHex(pair.bg)) {
    options.push({
      id: `${pair.id}-adjust-${roles.bg}`,
      type: 'bg',
      role: roles.bg,
      hex: fixes.lighterBackground,
      label: `Adjust ${ROLE_LABELS[roles.bg] || roles.bg}`,
    });
  }

  return options;
}

function TierBadge({ label, pass, warn, fail }) {
  return (
    <span
      className={[
        'combo-info-panel__tier',
        pass ? 'combo-info-panel__tier--pass' : '',
        warn ? 'combo-info-panel__tier--warn' : '',
        fail ? 'combo-info-panel__tier--fail' : '',
      ].filter(Boolean).join(' ')}
    >
      {label}
    </span>
  );
}

function ContrastPairCard({ pair, comboColors, appliedFix, onApplyFix, onResetFix }) {
  const fixOptions = getPairFixOptions(pair);
  const cardStatus = CARD_STATUS[pair.status] || CARD_STATUS.pass;
  const hasAppliedFix = Boolean(appliedFix);

  return (
    <article
      className={[
        'combo-info-panel__card',
        `combo-info-panel__card--${pair.status}`,
      ].join(' ')}
      tabIndex={0}
    >
      <div className="combo-info-panel__card-header">
        <p className="combo-info-panel__card-label">{pair.description}</p>
        <span className={`combo-info-panel__card-status ${cardStatus.className}`}>
          {cardStatus.label}
        </span>
      </div>

      <div
        className="combo-info-panel__sample"
        style={{ backgroundColor: pair.bg, color: pair.fg }}
      >
        <p className="combo-info-panel__sample-body">The quick brown fox</p>
        <p className="combo-info-panel__sample-heading">Heading</p>
      </div>

      <div className="combo-info-panel__tiers">
        <span className="combo-info-panel__ratio">{pair.ratio}:1</span>
        <TierBadge
          label="AA"
          pass={pair.tiers.aa}
          warn={pair.status === 'warn'}
          fail={pair.status === 'fail'}
        />
        <TierBadge label="AA Large" pass={pair.tiers.aaLarge} />
        <TierBadge label="AAA" pass={pair.tiers.aaa} />
      </div>

      {pair.status === 'warn' && (
        <p className="combo-info-panel__card-note">
          Use for headings and large labels only — not 16px body text.
        </p>
      )}

      {(fixOptions.length > 0 || hasAppliedFix) && (
        <div className="combo-info-panel__fixes">
          {fixOptions.length > 0 ? (
            <p className="combo-info-panel__fixes-text">
              {pair.status === 'warn'
                ? 'Try a suggested fix to reach 4.5:1 for body text:'
                : 'Try a suggested fix to pass WCAG AA:'}
            </p>
          ) : (
            <p className="combo-info-panel__fixes-text combo-info-panel__fixes-text--applied">
              Fix applied — check the live preview to confirm.
            </p>
          )}
          <div className="combo-info-panel__fix-row">
            {fixOptions.length > 0 && (
              <div className="combo-info-panel__fix-chips">
                {fixOptions.map((option) => {
                  const isActive = normalizeHex(comboColors[option.role]) === normalizeHex(option.hex);

                  return (
                    <button
                      key={option.id}
                      type="button"
                      className={[
                        'combo-info-panel__fix-chip',
                        isActive ? 'combo-info-panel__fix-chip--active' : '',
                      ].filter(Boolean).join(' ')}
                      onClick={() => onApplyFix?.(pair, option)}
                      aria-label={`${option.label}: ${option.hex}`}
                      aria-pressed={isActive}
                    >
                      <span className="combo-info-panel__chip-label">{option.label}</span>
                      <span className="combo-info-panel__chip-swatch" style={{ background: option.hex }} />
                      <span className="combo-info-panel__chip-hex">{option.hex}</span>
                    </button>
                  );
                })}
              </div>
            )}
            {hasAppliedFix && (
              <button
                type="button"
                className="combo-info-panel__fix-reset btn btn--secondary btn--sm"
                onClick={() => onResetFix?.(pair.id)}
                aria-label={`Reset contrast fix for ${pair.description}`}
              >
                <Icon icon={ArrowCounterClockwise} size={ICON_SIZE_SM} />
                Reset
              </button>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

function ContrastNumberLine({ worstRatio }) {
  const position = Math.min(100, Math.max(0, ((worstRatio - 1) / 20) * 100));

  return (
    <div className="combo-info-panel__numberline" aria-hidden="true">
      <div className="combo-info-panel__numberline-track" />
      <span className="combo-info-panel__numberline-marker" style={{ left: '10%' }}>3:1</span>
      <span className="combo-info-panel__numberline-marker" style={{ left: '18%' }}>4.5:1</span>
      <span className="combo-info-panel__numberline-marker" style={{ left: '30%' }}>7:1</span>
      <span
        className="combo-info-panel__numberline-dot"
        style={{ left: `${position}%` }}
        title={`Worst pair: ${worstRatio}:1`}
      />
      <div className="combo-info-panel__numberline-labels">
        <span>1:1</span>
        <span>21:1</span>
      </div>
    </div>
  );
}

function ContrastSection({ section, pairs, comboColors, appliedFixes, onApplyFix, onResetFix }) {
  if (pairs.length === 0) return null;

  return (
    <section
      className={`combo-info-panel__section ${section.className}`}
      aria-label={section.title}
    >
      <header className="combo-info-panel__section-header">
        <div className="combo-info-panel__section-title-row">
          <Icon icon={section.icon} size={ICON_SIZE_SM} weight="bold" />
          <h3 className="combo-info-panel__section-title">{section.title}</h3>
          <span className="combo-info-panel__section-count">{pairs.length}</span>
        </div>
        <p className="combo-info-panel__section-hint">{section.hint}</p>
      </header>

      <div className="combo-info-panel__grid">
        {pairs.map((pair) => (
          <ContrastPairCard
            key={pair.id}
            pair={pair}
            comboColors={comboColors}
            appliedFix={appliedFixes[pair.id]}
            onApplyFix={onApplyFix}
            onResetFix={onResetFix}
          />
        ))}
      </div>
    </section>
  );
}

function ComboInfoPanel({ combo, contrastPairs, onColorChange, onShowToast }) {
  const [appliedFixes, setAppliedFixes] = useState({});
  const summary = useMemo(() => getContrastSummary(contrastPairs), [contrastPairs]);
  const groupedPairs = useMemo(() => ({
    fail: contrastPairs.filter((pair) => pair.status === 'fail'),
    warn: contrastPairs.filter((pair) => pair.status === 'warn'),
    pass: contrastPairs.filter((pair) => pair.status === 'pass'),
  }), [contrastPairs]);
  const statusConfig = STATUS_BAR[summary.state];
  const StatusIcon = statusConfig.icon;
  const statusMessage = typeof statusConfig.message === 'function'
    ? statusConfig.message(summary)
    : statusConfig.message;

  useEffect(() => {
    setAppliedFixes({});
  }, [combo.id]);

  const handleApplyFix = (pair, option) => {
    if (!onColorChange) return;

    const { role, hex, label } = option;
    if (normalizeHex(combo.colors[role]) === normalizeHex(hex)) return;

    setAppliedFixes((prev) => {
      const existing = prev[pair.id] || { pairLabel: pair.description, roles: {} };
      const roles = { ...existing.roles };

      if (!roles[role]) {
        roles[role] = { previousHex: combo.colors[role] };
      }

      return {
        ...prev,
        [pair.id]: { ...existing, roles },
      };
    });

    onColorChange(role, hex);
    onShowToast?.(`${label} applied — check the preview`);
  };

  const handleResetFix = (pairId) => {
    const fix = appliedFixes[pairId];
    if (!fix || !onColorChange) return;

    Object.entries(fix.roles).forEach(([role, { previousHex }]) => {
      onColorChange(role, previousHex);
    });

    setAppliedFixes((prev) => {
      const next = { ...prev };
      delete next[pairId];
      return next;
    });

    onShowToast?.(`Restored ${fix.pairLabel}`);
  };

  return (
    <div className="combo-info-panel">
      <Accordion title="About this combo" persistKey="info-about" defaultOpen={false} className="combo-info-panel__accordion">
        <div className="combo-info-panel__about">
          <h3 className="combo-info-panel__name">{combo.name}</h3>
          <p className="combo-info-panel__meta">
            Inspired by {combo.inspiredBy} · {combo.mood.join(', ')}
          </p>
          {combo.whyItWorks && (
            <p className="combo-info-panel__why">{combo.whyItWorks}</p>
          )}
        </div>
      </Accordion>

      <div className={`combo-info-panel__status ${statusConfig.className}`}>
        <Icon icon={StatusIcon} size={ICON_SIZE_SM} weight="bold" />
        <p>{statusMessage}</p>
      </div>

      <div className="combo-info-panel__sections" aria-live="polite" aria-label="Contrast check results">
        {CONTRAST_SECTIONS.map((section) => (
          <ContrastSection
            key={section.key}
            section={section}
            pairs={groupedPairs[section.key]}
            comboColors={combo.colors}
            appliedFixes={appliedFixes}
            onApplyFix={handleApplyFix}
            onResetFix={handleResetFix}
          />
        ))}
      </div>

      <Accordion title="What is WCAG?" persistKey="info-wcag" defaultOpen={false} className="combo-info-panel__accordion">
        <div className="combo-info-panel__explainer-body">
          <p>
            WCAG (Web Content Accessibility Guidelines) are the global standard
            for making websites readable by everyone — including people with
            low vision, color blindness, or aging eyesight.
          </p>
          <p>
            Contrast ratio measures how different your text color is from
            its background. The scale runs from 1:1 (invisible — same color)
            to 21:1 (maximum — black on white).
          </p>
          <p>Here&apos;s what the thresholds mean for you:</p>
          <dl className="combo-info-panel__thresholds">
            <div>
              <dt>AA (4.5:1)</dt>
              <dd>The legal minimum in many countries. Required for body text and UI labels. This is the floor, not the goal.</dd>
            </div>
            <div>
              <dt>AA Large (3:1)</dt>
              <dd>For text above 18px regular or 14px bold. Larger text is easier to read at lower contrast.</dd>
            </div>
            <div>
              <dt>AAA (7:1)</dt>
              <dd>The gold standard. Not required, but meaningful for text-heavy reading experiences.</dd>
            </div>
          </dl>
          <p>
            1 in 12 men and 1 in 200 women have some form of color vision
            deficiency. Passing AA means your design works for them too.
          </p>
          <ContrastNumberLine worstRatio={summary.worstRatio} />
        </div>
      </Accordion>
    </div>
  );
}

export default ComboInfoPanel;
