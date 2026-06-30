import { Check, Warning, XCircle } from '@phosphor-icons/react';
import Icon from '../Icon/Icon';
import { ICON_SIZE_SM } from '../Icon/iconConfig';
import './ContrastBadge.scss';

const STATUS_CONFIG = {
  aaa: { label: 'AAA', icon: Check, variant: 'pass' },
  aa: { label: 'AA', icon: Check, variant: 'pass' },
  warn: { label: 'AA large', icon: Warning, variant: 'warn' },
  fail: { label: 'Fail', icon: XCircle, variant: 'fail' },
};

function ContrastBadge({ status, ratio, compact = false, label }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.aa;

  return (
    <span
      className={`contrast-badge contrast-badge--${config.variant} ${compact ? 'contrast-badge--compact' : ''}`}
      title={ratio ? `Contrast ratio: ${ratio}:1` : undefined}
    >
      <span className="contrast-badge__icon" aria-hidden="true">
        <Icon icon={config.icon} size={ICON_SIZE_SM} weight="bold" />
      </span>
      <span className="contrast-badge__label">{label || config.label}</span>
      {ratio && !compact && (
        <span className="contrast-badge__ratio">{ratio}:1</span>
      )}
    </span>
  );
}

export default ContrastBadge;
