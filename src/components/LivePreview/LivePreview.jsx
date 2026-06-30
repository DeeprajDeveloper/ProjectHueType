import { useState, useEffect, useRef } from 'react';
import { DesktopIcon, DeviceTabletCameraIcon, DeviceMobileCameraIcon } from '@phosphor-icons/react';
import ContrastBadge from '../ContrastBadge/ContrastBadge';
import { suggestFix } from '../../utils/contrast';
import SegmentControl from '../SegmentControl/SegmentControl';
import Accordion from '../Accordion/Accordion';
import MockupMarketing from './MockupMarketing';
import MockupDashboard from './MockupDashboard';
import MockupPricing from './MockupPricing';
import MockupBlog from './MockupBlog';
import MockupEcommerce from './MockupEcommerce';
import { isArchetypePreviewEmpty } from '../PreviewComponentsPanel/previewArchetypes';
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

const DEVICE_MAX_WIDTH = {
  desktop: Infinity,
  tablet: 768,
  mobile: 375,
};

function renderArchetype(archetype, previewMode, parts, onFrameScrollLock) {
  switch (archetype) {
    case 'dashboard':
      return <MockupDashboard parts={parts} onFrameScrollLock={onFrameScrollLock} />;
    case 'pricing':
      return <MockupPricing parts={parts} />;
    case 'blog':
      return <MockupBlog parts={parts} />;
    case 'ecommerce':
      return <MockupEcommerce parts={parts} />;
    case 'marketing':
    default:
      return (
        <MockupMarketing
          previewMode={previewMode}
          parts={parts}
          onFrameScrollLock={onFrameScrollLock}
        />
      );
  }
}

function LivePreview({
  combo,
  contrastPairs,
  contrastStatus,
  fontsLoading,
  previewMode,
  onPreviewModeChange,
  archetype,
  archetypeParts,
}) {
  const activeParts = archetypeParts[archetype] || {};
  const previewEmpty = isArchetypePreviewEmpty(archetype, activeParts);
  const [frameScrollLocked, setFrameScrollLocked] = useState(false);
  const frameWrapRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    setFrameScrollLocked(false);
  }, [archetype]);

  useEffect(() => {
    const el = frameWrapRef.current;
    if (!el) return undefined;

    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const deviceCap = DEVICE_MAX_WIDTH[previewMode] ?? DEVICE_MAX_WIDTH.desktop;
  const frameWidth = containerWidth > 0
    ? Math.min(containerWidth, deviceCap)
    : null;

  const previewStyle = {
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
  };

  return (
    <div className="live-preview">
      <header className="live-preview__header">
        <Accordion
          variant="chrome"
          title={combo.name}
          badge={<ContrastBadge status={contrastStatus} compact />}
          defaultOpen={false}
          persistKey="preview-info"
        >
          <p className="live-preview__meta">
            Inspired by {combo.inspiredBy} · {combo.mood.join(', ')}
          </p>

          <div className="live-preview__contrast" aria-live="polite" aria-label="Contrast check results">
            {contrastPairs.map((pair) => (
              <div key={pair.id} className="live-preview__contrast-item">
                <ContrastBadge
                  status={pair.status === 'pass' ? (pair.level === 'AAA' ? 'aaa' : 'aa') : pair.status === 'warn' ? 'warn' : 'fail'}
                  ratio={pair.ratio}
                  label={pair.label}
                />
                {pair.status === 'fail' && (
                  <span className="live-preview__fix">
                    Suggest: {suggestFix(pair.fg, pair.bg)}
                  </span>
                )}
              </div>
            ))}
          </div>

          {combo.whyItWorks && (
            <p className="live-preview__why">{combo.whyItWorks}</p>
          )}
        </Accordion>
      </header>

      <div className="live-preview__controls">
        <h2 className="live-preview__label">Live preview</h2>
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

      <div className="live-preview__frame-wrap" ref={frameWrapRef}>
        <div
          className={`live-preview__frame live-preview__frame--${previewMode} ${fontsLoading ? 'live-preview__frame--loading' : ''} ${frameScrollLocked ? 'live-preview__frame--scroll-locked' : ''}`}
          style={previewStyle}
        >
          {fontsLoading && (
            <div className="live-preview__loading">Loading fonts…</div>
          )}
          {previewEmpty ? (
            <div className="live-preview__empty">
              <p>All preview parts are hidden.</p>
              <p className="live-preview__empty-hint">Turn sections on in the Components panel → Preview parts.</p>
            </div>
          ) : (
            renderArchetype(archetype, previewMode, activeParts, setFrameScrollLocked)
          )}
        </div>
      </div>
    </div>
  );
}

export default LivePreview;
