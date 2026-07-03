import { Check, Warning, XCircle } from '@phosphor-icons/react';
import {
  getContrastStatusDescription,
  getContrastStatusLabel,
} from '../../utils/contrast';
import Icon from '../Icon/Icon';
import { ICON_SIZE_SM } from '../Icon/iconConfig';
import './ContrastBadge.scss';

const STATUS_VARIANTS = {
  aaa: 'pass',
  aa: 'pass',
  warn: 'warn',
  fail: 'fail',
};

const STATUS_ICONS = {
  aaa: Check,
  aa: Check,
  warn: Warning,
  fail: XCircle,
};

function ContrastBadge({ status, ratio, compact = false, descriptive = false, label }) {
  const variant = STATUS_VARIANTS[status] || STATUS_VARIANTS.aa;
  const IconComponent = STATUS_ICONS[status] || STATUS_ICONS.aa;
  const displayLabel = label || getContrastStatusLabel(status, { descriptive: descriptive || compact });
  const description = getContrastStatusDescription(status);
  const title = ratio
    ? `${description} Contrast ratio: ${ratio}:1`
    : description;

  return (
    <span
      className={`contrast-badge contrast-badge--${variant} ${compact ? 'contrast-badge--compact' : ''} ${descriptive || compact ? 'contrast-badge--descriptive' : ''}`}
      title={title}
    >
      <span className="contrast-badge__icon" aria-hidden="true">
        <Icon icon={IconComponent} size={ICON_SIZE_SM} weight="bold" />
      </span>
      <span className="contrast-badge__label">{displayLabel}</span>
      {ratio && !compact && (
        <span className="contrast-badge__ratio">{ratio}:1</span>
      )}
    </span>
  );
}

export default ContrastBadge;
