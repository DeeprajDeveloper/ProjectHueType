import { useState } from 'react';
import {
  ArrowLeftIcon,
  BracketsCurlyIcon,
  BracketsSquareIcon,
  BooksIcon,
  CirclesThreePlusIcon,
  CopyIcon,
  CubeIcon,
  DownloadSimpleIcon,
  ExportIcon,
  FigmaLogoIcon,
  FileCssIcon,
  WindIcon,
} from '@phosphor-icons/react';
import {
  EXPORT_FORMATS,
  downloadExportFile,
  getExportFilename,
} from '../../utils/export';
import Icon from '../Icon/Icon';
import { ICON_SIZE, ICON_SIZE_SM } from '../Icon/iconConfig';
import './ExportPanel.scss';

const FORMAT_ICONS = {
  css: BracketsCurlyIcon,
  scss: FileCssIcon,
  tailwind: WindIcon,
  json: BracketsSquareIcon,
  tokens: CirclesThreePlusIcon,
  'style-dictionary': BooksIcon,
  'css-modules': CubeIcon,
  figma: FigmaLogoIcon,
};

function ExportPanel({ combo, onClose, onCopy, onDownload }) {
  const [activeFormatId, setActiveFormatId] = useState('css');
  const [copied, setCopied] = useState(false);

  const activeFormat = EXPORT_FORMATS.find((format) => format.id === activeFormatId) || EXPORT_FORMATS[0];
  const content = activeFormat.fn(combo);
  const FormatIcon = FORMAT_ICONS[activeFormat.id] || ExportIcon;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable
    }
  };

  const handleDownload = () => {
    const filename = getExportFilename(combo, activeFormat);
    downloadExportFile(content, filename, activeFormat.mimeType);
    onDownload?.(filename);
  };

  return (
    <div className="export-panel" data-tour="export-panel">
      <header className="export-panel__header">
        <div className="export-panel__heading">
          <h2 className="export-panel__title">Export — {combo.name}</h2>
          <p className="export-panel__note">
            Includes 100–900 color scales for primary, secondary, accent, and neutral.
          </p>
        </div>
        <button
          type="button"
          className="export-panel__back btn btn--secondary btn--sm"
          onClick={onClose}
        >
          <Icon icon={ArrowLeftIcon} size={ICON_SIZE_SM} />
          Back to preview
        </button>
      </header>

      <div className="export-panel__layout">
        <nav className="export-panel__formats" aria-label="Export formats">
          {EXPORT_FORMATS.map((format) => {
            const IconComponent = FORMAT_ICONS[format.id] || ExportIcon;
            const isActive = format.id === activeFormatId;

            return (
              <button
                key={format.id}
                type="button"
                className={`export-panel__format ${isActive ? 'export-panel__format--active' : ''}`}
                aria-pressed={isActive}
                onClick={() => setActiveFormatId(format.id)}
              >
                <span className="export-panel__format-icon" aria-hidden="true">
                  <Icon icon={IconComponent} size={ICON_SIZE} active={isActive} />
                </span>
                <span className="export-panel__format-text">
                  <span className="export-panel__format-label">{format.label}</span>
                  <span className="export-panel__format-desc">{format.description}</span>
                </span>
                <span className="export-panel__format-ext">.{format.extension}</span>
              </button>
            );
          })}
        </nav>

        <section className="export-panel__preview" aria-label={`${activeFormat.label} export preview`}>
          <div className="export-panel__preview-header">
            <Icon icon={FormatIcon} size={ICON_SIZE_SM} />
            <span className="export-panel__preview-label">{activeFormat.label}</span>
            <span className="export-panel__preview-file">{getExportFilename(combo, activeFormat)}</span>
          </div>
          <div className="export-panel__code-frame">
            <pre className="export-panel__code">
              <code>{content}</code>
            </pre>
          </div>
          <div className="export-panel__actions">
            <button type="button" className="btn btn--secondary" onClick={handleCopy}>
              <Icon icon={CopyIcon} size={ICON_SIZE_SM} />
              {copied ? 'Copied!' : 'Copy to clipboard'}
            </button>
            <button type="button" className="btn btn--primary" onClick={handleDownload}>
              <Icon icon={DownloadSimpleIcon} size={ICON_SIZE_SM} />
              Download file
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ExportPanel;
