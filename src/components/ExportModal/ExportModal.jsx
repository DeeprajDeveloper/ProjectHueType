import { useState } from 'react';
import { X } from '@phosphor-icons/react';
import { EXPORT_FORMATS } from '../../utils/export';
import Icon from '../Icon/Icon';
import { ICON_SIZE } from '../Icon/iconConfig';
import './ExportModal.scss';

function ExportModal({ combo, onClose, onCopy }) {
  const [activeTab, setActiveTab] = useState('css');
  const [copied, setCopied] = useState(false);

  const activeFormat = EXPORT_FORMATS.find((f) => f.id === activeTab);
  const content = activeFormat ? activeFormat.fn(combo) : '';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      onCopy();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable
    }
  };

  return (
    <div className="export-modal" role="dialog" aria-modal="true" aria-labelledby="export-title">
      <div className="export-modal__backdrop" onClick={onClose} aria-hidden="true" />
      <div className="export-modal__panel">
        <header className="export-modal__header">
          <h2 id="export-title" className="export-modal__title">Export — {combo.name}</h2>
          <button type="button" className="export-modal__close" onClick={onClose} aria-label="Close export panel">
            <Icon icon={X} size={ICON_SIZE} />
          </button>
        </header>

        <p className="export-modal__note">
          Includes 100–900 color scales for primary, secondary, accent, and neutral.
        </p>

        <div className="export-modal__tabs" role="tablist">
          {EXPORT_FORMATS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`export-modal__tab ${activeTab === tab.id ? 'export-modal__tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="export-modal__body">
          <div className="export-modal__code-frame">
            <pre className="export-modal__code" aria-label={`${activeTab} export code`}>
              <code>{content}</code>
            </pre>
          </div>
        </div>

        <footer className="export-modal__footer">
          <button type="button" className="btn btn--primary" onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy to clipboard'}
          </button>
        </footer>
      </div>
    </div>
  );
}

export default ExportModal;
