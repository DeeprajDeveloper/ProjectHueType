import { DesktopIcon, DeviceMobileCameraIcon } from '@phosphor-icons/react';
import ContrastBadge from '../ContrastBadge/ContrastBadge';
import { suggestFix } from '../../utils/contrast';
import SegmentControl from '../SegmentControl/SegmentControl';
import Accordion from '../Accordion/Accordion';
import MockupHero from './MockupHero';
import MockupNavbar from './MockupNavbar';
import MockupButtons from './MockupButtons';
import MockupCard from './MockupCard';
import MockupForm from './MockupForm';
import MockupControls from './MockupControls';
import MockupFooter from './MockupFooter';
import './LivePreview.scss';
import './MockupHero.scss';
import './MockupNavbar.scss';
import './MockupButtons.scss';
import './MockupCard.scss';
import './MockupForm.scss';
import './MockupControls.scss';
import './MockupFooter.scss';

function LivePreview({
  combo,
  contrastPairs,
  contrastStatus,
  fontsLoading,
  previewMode,
  onPreviewModeChange,
}) {
  const isMobile = previewMode === 'mobile';

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
            { value: 'mobile', label: 'Mobile', icon: DeviceMobileCameraIcon },
          ]}
          value={previewMode}
          onChange={onPreviewModeChange}
          ariaLabel="Preview device width"
        />
      </div>

      <div
        className={`live-preview__frame ${isMobile ? 'live-preview__frame--mobile' : ''} ${fontsLoading ? 'live-preview__frame--loading' : ''}`}
        style={previewStyle}
      >
        {fontsLoading && (
          <div className="live-preview__loading">Loading fonts…</div>
        )}
        <MockupNavbar isMobile={isMobile} />
        <MockupHero />
        <MockupButtons />
        <MockupCard />
        <MockupForm />
        <MockupControls />
        <MockupFooter />
      </div>
    </div>
  );
}

export default LivePreview;
