import { useState, useEffect, useRef, useCallback } from 'react';
import { useBreakpoint } from '../../hooks';
import {
  CaretRightIcon,
  DeviceRotateIcon,
  EyeIcon,
  EyeSlashIcon,
  ShuffleIcon,
  SidebarSimpleIcon,
  SquaresFourIcon,
} from '@phosphor-icons/react';
import ContrastBadge from '../ContrastBadge/ContrastBadge';
import Icon from '../Icon/Icon';
import { ICON_SIZE_SM } from '../Icon/iconConfig';
import InspectorOverlay from '../InspectorOverlay/InspectorOverlay';
import ArchetypeQuickSelect from '../ArchetypeQuickSelect/ArchetypeQuickSelect';
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
import MockupDocs from './MockupDocs';
import MockupKanban from './MockupKanban';
import MockupAnalytics from './MockupAnalytics';
import MockupProfile from './MockupProfile';
import MockupBilling from './MockupBilling';
import MockupSearch from './MockupSearch';
import MockupEmail from './MockupEmail';
import MockupMobileApp from './MockupMobileApp';
import MockupWaitlist from './MockupWaitlist';
import MockupError404 from './MockupError404';
import MockupCalendar from './MockupCalendar';
import MockupMediaPlayer from './MockupMediaPlayer';
import { isArchetypePreviewEmpty, getArchetypePreviewLabel, resolveArchetypeParts } from '../PreviewComponentsPanel/previewArchetypes';
import { getContrastStatusLabel } from '../../utils/contrast';
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
import './MockupDocs.scss';
import './MockupKanban.scss';
import './MockupAnalytics.scss';
import './MockupProfile.scss';
import './MockupBilling.scss';
import './MockupSearch.scss';
import './MockupEmail.scss';
import './MockupMobileApp.scss';
import './MockupWaitlist.scss';
import './MockupError404.scss';
import './MockupCalendar.scss';
import './MockupMediaPlayer.scss';

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

const MOBILE_PREVIEW_DISABLED_MESSAGE =
  'Desktop and tablet previews are unavailable on mobile view.';

export { MOBILE_PREVIEW_DISABLED_MESSAGE };

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
    case 'docs':
      return <MockupDocs parts={parts} logoText={brand} />;
    case 'kanban':
      return <MockupKanban parts={parts} />;
    case 'analytics':
      return <MockupAnalytics parts={parts} />;
    case 'profile':
      return <MockupProfile parts={parts} />;
    case 'billing':
      return <MockupBilling parts={parts} />;
    case 'search':
      return <MockupSearch parts={parts} />;
    case 'email':
      return <MockupEmail parts={parts} logoText={brand} />;
    case 'mobile-app':
      return <MockupMobileApp parts={parts} />;
    case 'waitlist':
      return <MockupWaitlist parts={parts} logoText={brand} />;
    case 'error404':
      return <MockupError404 parts={parts} />;
    case 'calendar':
      return <MockupCalendar parts={parts} />;
    case 'media-player':
      return <MockupMediaPlayer parts={parts} />;
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
  aaa: getContrastStatusLabel('aaa'),
  aa: getContrastStatusLabel('aa'),
  warn: getContrastStatusLabel('warn'),
  fail: getContrastStatusLabel('fail'),
};

const FRAME_OPTIONS = ['desktop', 'tablet', 'mobile'];

function LivePreview({
  combo,
  fontsLoading,
  previewMode,
  onPreviewModeChange,
  archetype,
  onArchetypeChange,
  onOpenArchetypes,
  chipBarArchetypeIds = [],
  onToggleChipBarArchetype,
  archetypeParts,
  previewLogoText = '',
  typeBasePx,
  typeScaleRatio,
  contrastStatus,
  onOpenContrast,
  onShuffle,
  onColorChange,
  lockedCount = 0,
  isCompact = false,
  onShowToast,
  dockPortalEl = null,
  onInspectorDockActiveChange,
}) {
  const breakpoint = useBreakpoint();
  const isMobileView = breakpoint === 'mobile';

  const handlePreviewModeChange = useCallback((mode) => {
    if (isMobileView && mode !== 'mobile') {
      onShowToast?.(MOBILE_PREVIEW_DISABLED_MESSAGE);
      return;
    }
    onPreviewModeChange(mode);
  }, [isMobileView, onPreviewModeChange, onShowToast]);
  const activeParts = resolveArchetypeParts(archetype, archetypeParts[archetype]);
  const previewEmpty = isArchetypePreviewEmpty(archetype, activeParts);
  const [frameScrollLocked, setFrameScrollLocked] = useState(false);
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [inspectorShowAll, setInspectorShowAll] = useState(false);
  const [inspectorDocked, setInspectorDocked] = useState(false);
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
    setInspectorOpen(false);
    setInspectorShowAll(false);
    setInspectorDocked(false);
    onInspectorDockActiveChange?.(false);
  }, [archetype, onInspectorDockActiveChange]);

  const toggleInspector = useCallback(() => {
    setInspectorOpen((open) => {
      if (open) {
        setInspectorShowAll(false);
        setInspectorDocked(false);
        onInspectorDockActiveChange?.(false);
      }
      return !open;
    });
  }, [onInspectorDockActiveChange]);

  const toggleInspectorShowAll = useCallback(() => {
    setInspectorShowAll((showAll) => {
      const next = !showAll;
      if (next) {
        setInspectorDocked(false);
        onInspectorDockActiveChange?.(false);
      }
      return next;
    });
  }, [onInspectorDockActiveChange]);

  const toggleInspectorDock = useCallback(() => {
    setInspectorDocked((docked) => {
      const next = !docked;
      if (next) {
        setInspectorShowAll(false);
      }
      onInspectorDockActiveChange?.(next);
      return next;
    });
  }, [onInspectorDockActiveChange]);

  useEffect(() => {
    const handler = (event) => {
      if (event.target instanceof HTMLElement) {
        const tag = event.target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || event.target.isContentEditable) {
          return;
        }
      }
      if (event.key === 'i' || event.key === 'I') {
        event.preventDefault();
        toggleInspector();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [toggleInspector]);

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

  const frameShellStyle = {
    ...(frameWidth != null ? { width: `${frameWidth}px` } : {}),
    ...(frameHeight != null ? { height: `${frameHeight}px` } : {}),
  };

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
    width: '100%',
    height: '100%',
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

  const dimensionsLabel = frameSize.width > 0 && frameSize.height > 0
    ? `${frameSize.width} × ${frameSize.height}px`
    : previewMode === 'desktop'
      ? 'Sizing to available width'
      : previewMode === 'mobile'
        ? '375px target width'
        : `${TABLET_SIZE[tabletOrientation].width} × ${TABLET_SIZE[tabletOrientation].height}px`;

  const wcagStatusLabel = WCAG_STATUS_LABELS[contrastStatus] || WCAG_STATUS_LABELS.aa;
  const wcagBadgeLabel = isMobileView
    ? ({
        aaa: 'AAA',
        aa: 'AA',
        warn: 'AA large',
        fail: 'Fail',
      }[contrastStatus] || 'AA')
    : wcagStatusLabel;

  return (
    <div className={`live-preview ${isCompact ? 'live-preview--compact' : ''}`}>
      <div className="live-preview__topbar" data-tour="preview-controls">
        <p className="live-preview__topbar-label">
          Live preview · <span className="live-preview__topbar-archetype">{archetypeLabel}</span>
        </p>
        <div className="live-preview__topbar-actions">
          <button
            type="button"
            className="live-preview__wcag"
            onClick={onOpenContrast}
            aria-label={`Open WCAG contrast details — ${wcagStatusLabel}`}
            title="View WCAG contrast details"
          >
            <span className="live-preview__wcag-status">
              <ContrastBadge
                status={contrastStatus}
                compact
                showTitle={false}
                label={wcagBadgeLabel}
              />
            </span>
            <span className="live-preview__wcag-action" aria-hidden="true">
              <span className="live-preview__wcag-action-text">Details</span>
              <Icon icon={CaretRightIcon} size={ICON_SIZE_SM} weight="bold" />
            </span>
          </button>
          <div className="live-preview__inspect-group">
            <button
              type="button"
              className={`live-preview__inspect ${inspectorOpen ? 'live-preview__inspect--active' : ''}`}
              data-tour="inspect"
              onClick={toggleInspector}
              aria-pressed={inspectorOpen}
              aria-label={inspectorOpen ? 'Turn off style inspector' : 'Turn on style inspector'}
              title="Inspect element styles (I)"
            >
              {!inspectorOpen
                ? <Icon icon={EyeSlashIcon} size={ICON_SIZE_SM} weight="fill" />
                : <Icon icon={EyeIcon} size={ICON_SIZE_SM} weight="fill" />}
              <span className="live-preview__inspect-label">Inspect</span>
            </button>
            {inspectorOpen && (
              <>
                <button
                  type="button"
                  className={`live-preview__inspect-all ${inspectorShowAll ? 'live-preview__inspect-all--active' : ''}`}
                  onClick={toggleInspectorShowAll}
                  aria-pressed={inspectorShowAll}
                  aria-label={inspectorShowAll ? 'Show one inspector panel at a time' : 'Show all inspector panels'}
                  title="Show all element panels on the right"
                >
                  <Icon icon={SquaresFourIcon} size={ICON_SIZE_SM} weight={inspectorShowAll ? 'fill' : 'regular'} />
                  <span className="live-preview__inspect-label">All</span>
                </button>
                <button
                  type="button"
                  className={`live-preview__inspect-dock ${inspectorDocked ? 'live-preview__inspect-dock--active' : ''}`}
                  onClick={toggleInspectorDock}
                  aria-pressed={inspectorDocked}
                  aria-label={inspectorDocked ? 'Undock inspector from side panel' : 'Dock inspector to side panel'}
                  title="Dock all elements to the right side panel"
                >
                  <Icon icon={SidebarSimpleIcon} size={ICON_SIZE_SM} weight={inspectorDocked ? 'fill' : 'regular'} />
                  <span className="live-preview__inspect-label">Dock</span>
                </button>
              </>
            )}
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
            </button>
          )}
          <div className="live-preview__frame-toggle" role="group" aria-label="Preview device width">
            {FRAME_OPTIONS.map((mode) => {
              const unavailable = isMobileView && mode !== 'mobile';
              return (
                <button
                  key={mode}
                  type="button"
                  className={[
                    'live-preview__frame-btn',
                    previewMode === mode ? 'live-preview__frame-btn--active' : '',
                    unavailable ? 'live-preview__frame-btn--unavailable' : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => handlePreviewModeChange(mode)}
                  aria-disabled={unavailable || undefined}
                  title={unavailable ? MOBILE_PREVIEW_DISABLED_MESSAGE : undefined}
                >
                  {DEVICE_LABELS[mode]}
                </button>
              );
            })}
          </div>
          {onShuffle && (
            <button
              type="button"
              className="live-preview__shuffle"
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
      </div>

      <p className="live-preview__meta" aria-live="polite">
        {archetypeLabel} · {deviceLabel} · {dimensionsLabel}
      </p>

      <div className={frameWrapClassName} ref={frameWrapRef} data-tour="live-preview">
        <div className="live-preview__frame-shell" style={frameShellStyle}>
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
                <p className="live-preview__empty-hint">Turn sections on in Preview → Options.</p>
              </div>
            ) : (
              renderArchetype(archetype, previewMode, activeParts, previewLogoText, setFrameScrollLocked)
            )}
          </div>
          {inspectorOpen && !previewEmpty && (
            <InspectorOverlay
              frameRef={frameRef}
              archetype={archetype}
              parts={activeParts}
              paletteColors={combo.colors}
              previewMode={previewMode}
              showAllPopovers={inspectorShowAll}
              dockPopovers={inspectorDocked}
              dockPortalEl={dockPortalEl}
              onShowToast={onShowToast}
              onColorChange={onColorChange}
            />
          )}
        </div>
      </div>

      <ArchetypeQuickSelect
        activeArchetype={archetype}
        chipBarArchetypeIds={chipBarArchetypeIds}
        onArchetypeChange={onArchetypeChange}
        onToggleChipBarArchetype={onToggleChipBarArchetype}
        onOpenArchetypes={onOpenArchetypes}
      />
    </div>
  );
}

export default LivePreview;
