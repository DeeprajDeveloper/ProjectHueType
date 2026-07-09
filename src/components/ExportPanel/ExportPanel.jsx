import { useMemo, useState } from 'react';
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
  InfoIcon,
  WindIcon,
} from '@phosphor-icons/react';
import {
  EXPORT_COLOR_FORMATS,
  EXPORT_DEFAULTS,
  EXPORT_FORMATS,
  EXPORT_TYPE_UNITS,
  downloadExportFile,
  generateExportContent,
  getExportFilename,
} from '../../utils/export';
import { getTypeUnitExample } from '../../utils/typeFormat';
import { DEFAULT_SCALE_RATIO, TYPE_BASE_PX } from '../../utils/typographyScale';
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

function ExportPanel({
  combo,
  typeBasePx = TYPE_BASE_PX,
  typeScaleRatio = DEFAULT_SCALE_RATIO,
  onClose,
  onCopy,
  onDownload,
}) {
  const [activeFormatId, setActiveFormatId] = useState('css');
  const [colorFormat, setColorFormat] = useState(EXPORT_DEFAULTS.colorFormat);
  const [typeUnit, setTypeUnit] = useState(EXPORT_DEFAULTS.typeUnit);
  const [copied, setCopied] = useState(false);

  const exportOptions = useMemo(
    () => ({ colorFormat, typeUnit, typeBasePx, typeScaleRatio }),
    [colorFormat, typeUnit, typeBasePx, typeScaleRatio],
  );

  const activeFormat = EXPORT_FORMATS.find((format) => format.id === activeFormatId) || EXPORT_FORMATS[0];
  const content = useMemo(
    () => generateExportContent(combo, activeFormatId, exportOptions),
    [combo, activeFormatId, exportOptions],
  );
  const FormatIcon = FORMAT_ICONS[activeFormat.id] || ExportIcon;
  const activeColorFormat = EXPORT_COLOR_FORMATS.find((format) => format.id === colorFormat)
    || EXPORT_COLOR_FORMATS[0];
  const activeTypeUnit = EXPORT_TYPE_UNITS.find((unit) => unit.id === typeUnit)
    || EXPORT_TYPE_UNITS[0];
  const typeUnitExample = getTypeUnitExample(typeUnit, typeBasePx);

  const typeUnitNote = typeUnit === 'rem'
    ? 'rem values use a 16px root.'
    : typeUnit === 'em'
      ? 'em values are relative to the type base.'
      : null;

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
            Includes 50–950 color scales, type scale ({typeBasePx}px base, {typeScaleRatio} ratio), and fonts.
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

      <div className="export-panel__options" aria-label="Export options">
        <div className="export-panel__options-controls">
          <div className="export-panel__option">
            <span className="export-panel__option-label">Color format</span>
            <div className="export-panel__option-controls" role="group" aria-label="Color format">
              {EXPORT_COLOR_FORMATS.map((format) => {
                const isActive = format.id === colorFormat;
                return (
                  <button
                    key={format.id}
                    type="button"
                    className={`export-panel__option-btn ${isActive ? 'export-panel__option-btn--active' : ''}`}
                    aria-pressed={isActive}
                    title={format.example}
                    onClick={() => setColorFormat(format.id)}
                  >
                    {format.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="export-panel__option">
            <span className="export-panel__option-label">Type scale unit</span>
            <div className="export-panel__option-controls" role="group" aria-label="Type scale unit">
              {EXPORT_TYPE_UNITS.map((unit) => {
                const isActive = unit.id === typeUnit;
                return (
                  <button
                    key={unit.id}
                    type="button"
                    className={`export-panel__option-btn ${isActive ? 'export-panel__option-btn--active' : ''}`}
                    aria-pressed={isActive}
                    title={getTypeUnitExample(unit.id, typeBasePx)}
                    onClick={() => setTypeUnit(unit.id)}
                  >
                    {unit.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <aside className="export-panel__info-banner" aria-live="polite">
          <span className="export-panel__info-banner-icon" aria-hidden="true">
            <Icon icon={InfoIcon} size={ICON_SIZE_SM} weight="fill" />
          </span>
          <div className="export-panel__info-banner-content">
            <p className="export-panel__info-banner-line">
              <strong>Colors</strong>
              {' '}
              export as
              {' '}
              {activeColorFormat.label}
              {' '}
              —
              {' '}
              e.g.
              {' '}
              <code>{activeColorFormat.example}</code>
            </p>
            <p className="export-panel__info-banner-line">
              <strong>Type scale</strong>
              {' '}
              uses base
              {' '}
              {typeBasePx}px
              {' '}
              at ratio
              {' '}
              {typeScaleRatio}
              ;
              {' '}
              body size exports as
              {' '}
              <code>{typeUnitExample}</code>
              {typeUnitNote ? `. ${typeUnitNote}` : '.'}
              {' '}
              Change base and ratio in Customize → Fonts.
            </p>
          </div>
        </aside>
      </div>

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
            <span className="export-panel__preview-meta">
              {activeColorFormat.label} colors · {activeTypeUnit.label} type
            </span>
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
