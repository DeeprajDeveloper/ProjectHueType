import { useState, useEffect, useRef, useCallback } from 'react';
import {
  DesktopIcon,
  DeviceTabletCameraIcon,
  DeviceMobileCameraIcon,
  DeviceRotateIcon,
  FlaskIcon,
  InfoIcon,
  ShuffleIcon,
} from '@phosphor-icons/react';
import SegmentControl from '../SegmentControl/SegmentControl';
import ContrastBadge from '../ContrastBadge/ContrastBadge';
import Icon from '../Icon/Icon';
import { ICON_SIZE_SM } from '../Icon/iconConfig';
import MockupMarketing from './MockupMarketing';
import MockupDashboard from './MockupDashboard';
import MockupPricing from './MockupPricing';
import MockupBlog from './MockupBlog';
import MockupEcommerce from './MockupEcommerce';
import MockupAuth from './MockupAuth';
import MockupChat from './MockupChat';
import MockupOnboarding from './MockupOnboarding';
import MockupSettings from './MockupSettings';
import MockupEmptyState from './MockupEmptyState';
import MockupNotifications from './MockupNotifications';
import { isArchetypePreviewEmpty, getArchetypePreviewLabel, resolveArchetypeParts } from '../PreviewComponentsPanel/previewArchetypes';
import { getPreviewTypeStyle } from '../../utils/typographyScale';
import './LivePreview.scss';
import './MockupMarketing.scss';
import './MockupHero.scss';
import './MockupNavbar.scss';
import './MockupFeatureCards.scss';
import './MockupTestimonials.scss';
import './MockupContactForm.scss';
import './MockupFooter.scss';
import './MockupAuthModal.scss';
import './MockupDashboard.scss';
import './MockupPricing.scss';
import './MockupBlog.scss';
import './MockupEcommerce.scss';
import './MockupAuth.scss';
import './MockupChat.scss';
import './MockupOnboarding.scss';
import './MockupSettings.scss';
import './MockupEmptyState.scss';
import './MockupNotifications.scss';

const TABLET_ORIENTATION_KEY = 'huetype-tablet-orientation';

const DEVICE_WIDTH = {
  desktop: Infinity,
  tablet: 768,
  mobile: 375,
};

const TABLET_SIZE = {
  portrait: { width: 768, height: 1024 },
  landscape: { width: 1024, height: 768 },
};

const DEVICE_LABELS = {
  desktop: 'Desktop',
  tablet: 'Tablet',
  mobile: 'Mobile',
};

function renderArchetype(archetype, previewMode, parts, logoText, onFrameScrollLock) {
  const brand = logoText.trim() || 'Acme Co.';
  switch (archetype) {
    case 'dashboard':
      return <MockupDashboard parts={parts} logoText={brand} onFrameScrollLock={onFrameScrollLock} />;
    case 'pricing':
      return <MockupPricing parts={parts} logoText={brand} />;
    case 'blog':
      return <MockupBlog parts={parts} logoText={brand} />;
    case 'ecommerce':
      return <MockupEcommerce parts={parts} logoText={brand} />;
    case 'auth':
      return <MockupAuth parts={parts} logoText={brand} />;
    case 'chat':
      return <MockupChat parts={parts} logoText={brand} />;
    case 'onboarding':
      return <MockupOnboarding parts={parts} logoText={brand} />;
    case 'settings':
      return <MockupSettings parts={parts} logoText={brand} />;
    case 'empty':
      return <MockupEmptyState parts={parts} />;
    case 'notifications':
      return <MockupNotifications parts={parts} />;
    case 'marketing':
    default:
      return (
        <MockupMarketing
          previewMode={previewMode}
          parts={parts}
          logoText={brand}
          onFrameScrollLock={onFrameScrollLock}
        />
      );
  }
}

const WCAG_STATUS_LABELS = {
  aaa: 'WCAG AAA',
  aa: 'WCAG AA',
  warn: 'WCAG AA large',
  fail: 'WCAG Fail',
};

function LivePreview({
  combo,
  fontsLoading,
  previewMode,
  onPreviewModeChange,
  archetype,
  archetypeParts,
  previewLogoText = '',
  typeBasePx,
  typeScaleRatio,
  contrastStatus,
  onOpenInfo,
  infoActive = false,
  onShuffle,
  lockedCount = 0,
}) {
  const activeParts = resolveArchetypeParts(archetype, archetypeParts[archetype]);
  const previewEmpty = isArchetypePreviewEmpty(archetype, activeParts);
  const [frameScrollLocked, setFrameScrollLocked] = useState(false);
  const frameWrapRef = useRef(null);
  const frameRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [frameSize, setFrameSize] = useState({ width: 0, height: 0 });
  const [tabletOrientation, setTabletOrientationState] = useState(() => {
    try {
      return localStorage.getItem(TABLET_ORIENTATION_KEY) === 'landscape' ? 'landscape' : 'portrait';
    } catch {
      return 'portrait';
    }
  });

  const toggleTabletOrientation = useCallback(() => {
    setTabletOrientationState((prev) => {
      const next = prev === 'portrait' ? 'landscape' : 'portrait';
      try {
        localStorage.setItem(TABLET_ORIENTATION_KEY, next);
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  useEffect(() => {
    setFrameScrollLocked(false);
  }, [archetype]);

  useEffect(() => {
    const el = frameWrapRef.current;
    if (!el) return undefined;

    const observer = new ResizeObserver(([entry]) => {
      setContainerSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { width: containerWidth, height: containerHeight } = containerSize;
  const isTablet = previewMode === 'tablet';
  const isTabletLandscape = isTablet && tabletOrientation === 'landscape';

  let frameWidth = null;
  let frameHeight = null;

  if (containerWidth > 0) {
    if (isTablet) {
      const tabletSize = TABLET_SIZE[tabletOrientation];
      frameWidth = Math.min(containerWidth, tabletSize.width);
      frameHeight = Math.min(containerHeight, tabletSize.height);
    } else {
      const deviceCap = DEVICE_WIDTH[previewMode] ?? DEVICE_WIDTH.desktop;
      frameWidth = Math.min(containerWidth, deviceCap);
    }
  }

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return undefined;

    const observer = new ResizeObserver(([entry]) => {
      setFrameSize({
        width: Math.round(entry.contentRect.width),
        height: Math.round(entry.contentRect.height),
      });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [previewMode, tabletOrientation, containerWidth, containerHeight, archetype, frameWidth, frameHeight]);

  const previewStyle = {
    ...getPreviewTypeStyle(typeBasePx, typeScaleRatio),
    '--preview-primary': combo.colors.primary,
    '--preview-secondary': combo.colors.secondary,
    '--preview-accent': combo.colors.accent,
    '--preview-background': combo.colors.background,
    '--preview-text': combo.colors.text,
    '--preview-font-heading': combo.fonts.heading.family,
    '--preview-font-body': combo.fonts.body.family,
    '--preview-font-heading-weight': combo.fonts.heading.weight,
    '--preview-font-body-weight': combo.fonts.body.weight,
    ...(frameWidth != null ? { width: `${frameWidth}px` } : {}),
    ...(frameHeight != null ? { height: `${frameHeight}px` } : {}),
  };

  const frameClassName = [
    'live-preview__frame',
    `live-preview__frame--${previewMode}`,
    isTablet ? `live-preview__frame--tablet-${tabletOrientation}` : '',
    fontsLoading ? 'live-preview__frame--loading' : '',
    frameScrollLocked ? 'live-preview__frame--scroll-locked' : '',
  ].filter(Boolean).join(' ');

  const frameWrapClassName = [
    'live-preview__frame-wrap',
    isTablet ? 'live-preview__frame-wrap--tablet' : '',
  ].filter(Boolean).join(' ');

  const archetypeLabel = getArchetypePreviewLabel(archetype);
  const deviceLabel = isTablet
    ? `${DEVICE_LABELS.tablet} (${tabletOrientation === 'landscape' ? 'Landscape' : 'Portrait'})`
    : DEVICE_LABELS[previewMode] ?? DEVICE_LABELS.desktop;
  const previewHeading = `Live preview of '${archetypeLabel}' on ${deviceLabel}`;

  const dimensionsLabel = frameSize.width > 0 && frameSize.height > 0
    ? `${frameSize.width} ✕ ${frameSize.height}px`
    : previewMode === 'desktop'
      ? 'Sizing to available width'
      : previewMode === 'mobile'
        ? '375px target width'
        : `${TABLET_SIZE[tabletOrientation].width} ✕ ${TABLET_SIZE[tabletOrientation].height}px`;

  return (
    <div className="live-preview">
      <div className="live-preview__controls" data-tour="preview-controls">
        <div className="live-preview__controls-heading">
          <h2 className="live-preview__label">
            <Icon icon={FlaskIcon} size={ICON_SIZE_SM} />
            {previewHeading}
          </h2>
          <p className="live-preview__dimensions" aria-live="polite">
            Frame: {dimensionsLabel}
          </p>
        </div>
        <div className="live-preview__controls-actions">
          <div className="live-preview__status-tools">
            <ContrastBadge
              status={contrastStatus}
              compact
              label={WCAG_STATUS_LABELS[contrastStatus] || WCAG_STATUS_LABELS.aa}
            />
            <button
              type="button"
              className={`live-preview__info ${infoActive ? 'live-preview__info--active' : ''}`}
              onClick={onOpenInfo}
              aria-label={`View WCAG contrast for ${combo.name}`}
              aria-pressed={infoActive}
            >
              <Icon icon={InfoIcon} size={ICON_SIZE_SM} active={infoActive} />
              <span className="live-preview__info-tooltip" role="tooltip">{combo.name}</span>
            </button>
          </div>
          {isTablet && (
            <button
              type="button"
              className="live-preview__rotate"
              onClick={toggleTabletOrientation}
              aria-label={isTabletLandscape ? 'Rotate to portrait' : 'Rotate to landscape'}
              title={isTabletLandscape ? 'Portrait' : 'Landscape'}
            >
              <Icon icon={DeviceRotateIcon} size={ICON_SIZE_SM} />
              <span>{isTabletLandscape ? 'Portrait' : 'Landscape'}</span>
            </button>
          )}
          <SegmentControl
            options={[
              { value: 'desktop', label: 'Desktop', icon: DesktopIcon },
              { value: 'tablet', label: 'Tablet', icon: DeviceTabletCameraIcon },
              { value: 'mobile', label: 'Mobile', icon: DeviceMobileCameraIcon },
            ]}
            value={previewMode}
            onChange={onPreviewModeChange}
            ariaLabel="Preview device width"
          />
        </div>
      </div>

      <div className={frameWrapClassName} ref={frameWrapRef} data-tour="live-preview">
        <div
          ref={frameRef}
          className={frameClassName}
          style={previewStyle}
        >
          {fontsLoading && (
            <div className="live-preview__loading">Loading fonts…</div>
          )}
          {previewEmpty ? (
            <div className="live-preview__empty">
              <p>All preview parts are hidden.</p>
              <p className="live-preview__empty-hint">Turn sections on in Prototypes → Options.</p>
            </div>
          ) : (
            renderArchetype(archetype, previewMode, activeParts, previewLogoText, setFrameScrollLocked)
          )}
        </div>
      </div>

      {onShuffle && (
        <button
          type="button"
          className="live-preview__shuffle-fab"
          onClick={onShuffle}
          aria-label="Shuffle presets"
          data-tour="shuffle"
        >
          <Icon icon={ShuffleIcon} size={ICON_SIZE_SM} />
          {lockedCount > 0 && (
            <span className="live-preview__shuffle-badge" aria-label={`${lockedCount} roles locked`}>
              {lockedCount}
            </span>
          )}
          <span className="live-preview__shuffle-tooltip" role="tooltip">
            Shuffle presets (Space)
          </span>
        </button>
      )}
    </div>
  );
}

export default LivePreview;
